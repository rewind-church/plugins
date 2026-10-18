#!/usr/bin/env node
// Static plugin validation only. Never connects to MCP or starts a model session.
// Mirrored into rewind-church/plugins/scripts/verify-public-plugin.mjs.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, lstatSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRepo = existsSync(path.join(root, ".claude-plugin/marketplace.json"));
const pluginName = publicRepo ? "rewind" : "rewind-plugin";
const pluginRoot = path.join(root, pluginName);
const minimum = [2, 1, 281];
const temp = mkdtempSync(path.join(os.tmpdir(), "rewind-plugin-validation-"));
const env = Object.fromEntries(["PATH", "TMPDIR", "LANG", "LC_ALL", "SYSTEMROOT"].filter((key) => process.env[key]).map((key) => [key, process.env[key]]));
Object.assign(env, {
  HOME: temp,
  CLAUDE_CONFIG_DIR: path.join(temp, "config"),
  DISABLE_AUTOUPDATER: "1",
  CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
  DISABLE_TELEMETRY: "1",
  DISABLE_ERROR_REPORTING: "1",
  REWIND_MCP_URL: "https://fictional-church.invalid/api/mcp/mcp",
});
const cli = path.join(root, "node_modules/.bin/claude");
const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
function run(args) {
  const result = spawnSync(cli, args, { cwd: temp, env, encoding: "utf8", timeout: 30_000, maxBuffer: 4 * 1024 * 1024 });
  if (result.error || result.signal || result.status == null) throw result.error ?? new Error(`Validator did not complete: ${result.signal}`);
  return result;
}
function validate(target) {
  const result = run(["plugin", "validate", target, "--strict", "--json"]);
  const report = JSON.parse(result.stdout);
  assert.equal(report.strict, true, "validator must acknowledge strict mode");
  assert.equal(typeof report.success, "boolean", "validator must return a structured verdict");
  return { status: result.status, report };
}
function files(dir, prefix = "") {
  return readdirSync(dir).sort().flatMap((name) => {
    const relative = path.posix.join(prefix, name);
    const full = path.join(dir, name);
    assert.ok(!lstatSync(full).isSymbolicLink(), "installed files cannot be symlinks");
    return statSync(full).isDirectory() ? files(full, relative) : [relative];
  });
}
try {
  assert.ok(existsSync(cli), "Run npm ci first; the validator is a pinned dev dependency");
  const versionResult = run(["--version"]);
  assert.equal(versionResult.status, 0);
  const version = /^(\d+)\.(\d+)\.(\d+)/.exec(versionResult.stdout)?.slice(1).map(Number);
  assert.ok(version, "Unrecognized Claude Code version");
  assert.ok(version.some((value, i) => value > minimum[i] && version.slice(0, i).every((v, j) => v === minimum[j])) || version.every((v, i) => v === minimum[i]), "Claude Code >=2.1.281 is required for extended MCP checks");
  assert.equal(version.join("."), readJson(path.join(root, "package.json")).devDependencies["@anthropic-ai/claude-code"], "use the repository's exact pinned validator");

  const manifest = readJson(path.join(pluginRoot, ".claude-plugin/plugin.json"));
  const mcp = readJson(path.join(pluginRoot, ".mcp.json"));
  assert.deepEqual(Object.keys(mcp.mcpServers), ["rewind"]);
  assert.deepEqual(mcp.mcpServers.rewind, { type: "http", url: "${REWIND_MCP_URL}?profile=app" }, "default plugin must discover OAuth without a token or Authorization header");
  assert.equal(readdirSync(path.join(pluginRoot, "skills")).length, 5);
  assert.equal(readdirSync(path.join(pluginRoot, "commands")).filter((name) => name.endsWith(".md")).length, 2);
  assert.match(readFileSync(path.join(pluginRoot, "LICENSE"), "utf8"), /MIT License/);
  if (publicRepo) {
    const marketplace = readJson(path.join(root, ".claude-plugin/marketplace.json"));
    assert.equal(marketplace.metadata.version, manifest.version);
    assert.equal(marketplace.plugins.length, 1);
    assert.equal(marketplace.plugins[0].name, manifest.name);
    assert.equal(marketplace.plugins[0].source, "./rewind");
    assert.equal(readFileSync(path.join(pluginRoot, "LICENSE"), "utf8"), readFileSync(path.join(root, "LICENSE"), "utf8"));
  }
  const mirrorIndex = process.argv.indexOf("--mirror");
  if (mirrorIndex !== -1) {
    const mirror = process.argv[mirrorIndex + 1];
    assert.ok(mirror, "--mirror requires the other installed plugin directory");
    assert.deepEqual(files(pluginRoot), files(mirror), "installed file inventories must match");
    for (const file of files(pluginRoot)) assert.deepEqual(readFileSync(path.join(pluginRoot, file)), readFileSync(path.join(mirror, file)), `plugin mirror drift: ${file}`);
  }

  const fixtureRoot = path.join(temp, "package");
  cpSync(pluginRoot, path.join(fixtureRoot, pluginName), { recursive: true });
  if (publicRepo) cpSync(path.join(root, ".claude-plugin"), path.join(fixtureRoot, ".claude-plugin"), { recursive: true });
  const targets = [pluginName, `${pluginName}/skills`, `${pluginName}/commands`];
  if (publicRepo) targets.unshift(".");
  for (const target of targets) {
    const { status, report } = validate(path.join(fixtureRoot, target));
    assert.equal(status, 0, `${target}: ${JSON.stringify(report)}`);
    assert.equal(report.success, true, `${target}: validator refused the package`);
  }

  // A version banner alone cannot prove the extended checks ran. Each known
  // unsafe config must fail for the intended MCP diagnostic, not a CLI error.
  const controls = [
    ["unknown server type", { type: "unknown", url: "https://example.invalid/mcp" }, /unknown server type/i],
    ["relative remote URL", { type: "http", url: "/api/mcp" }, /absolute URL/i],
    ["undeclared user_config", { type: "http", url: "https://example.invalid/${user_config.UNDECLARED}" }, /user_config.*UNDECLARED|UNDECLARED.*user_config/i],
    ["non-loopback HTTP", { type: "http", url: "http://example.invalid/mcp" }, /unencrypted|non-loopback|plain.*HTTP|http:\/\//i],
    ["literal Authorization", { type: "http", url: "https://example.invalid/mcp", headers: { Authorization: "Bearer sk-fictional-validator-control-0123456789abcdef" } }, /literal.*credential|credential.*literal/i],
  ];
  for (const [name, server, diagnostic] of controls) {
    const control = path.join(temp, "negative-control");
    rmSync(control, { recursive: true, force: true });
    cpSync(pluginRoot, control, { recursive: true });
    writeFileSync(path.join(control, ".mcp.json"), JSON.stringify({ mcpServers: { rewind: server } }));
    const { status, report } = validate(control);
    assert.equal(status, 1, `${name}: expected validation refusal (exit 1)`);
    assert.equal(report.success, false, `${name}: unsafe config was accepted`);
    const diagnostics = (report.contents ?? []).filter((item) => item.type === "mcp").flatMap((item) => [...(item.errors ?? []), ...(item.warnings ?? [])]);
    assert.ok(diagnostics.some((item) => diagnostic.test(item.message)), `${name}: missing intended MCP diagnostic`);
  }
  console.log(`✓ Claude Code ${version.join(".")}: ${targets.length} strict package checks and all ${controls.length} extended MCP negative controls passed${mirrorIndex !== -1 ? "; installed mirrors match" : ""}. Static validation only.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  rmSync(temp, { recursive: true, force: true });
}
