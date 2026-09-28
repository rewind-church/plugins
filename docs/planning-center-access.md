# What Rewind accesses in Planning Center

Read this before choosing **Connect Planning Center** in Rewind. See the [setup guide](planning-center-setup.md) for the current setup steps and limitations.

## The access requested

Rewind requests Planning Center's **services** OAuth scope. It does not request the People scope. Planning Center's authorization screen and your account's Services permissions determine the grant you approve; a Services scope is not a promise that the token is technically restricted to your selected service types.

Your selections in Rewind tell its plan importer which service types to read. Turn on **Read these plans automatically each night** to allow those automatic reads; turn it off to stop new automatic plan reads. Connecting alone does not enable importing, replace your church's existing notes source, or authorize automatic podcast transcription. Imported notes remain when reading is stopped.

## What is read

- Service type names and their note categories, so your church can choose the relevant services.
- Plans in the selected service types, including their title, series title, service dates, and source link.
- Plan notes, from which Rewind selects the categories mapped to Big Idea, Scripture, Points, Questions, and Next Steps.
- Plan items, descriptions, and item notes when your mapping uses those instead of plan notes.
- Scheduled team member names and position labels only when your church configures a speaker-position mapping. Rewind keeps the mapped speaker's name; it does not import the roster or email addresses into the sermon record. The default setup makes no team-member request.

The importer stores the mapped church-authored notes and source references in your church's Rewind archive. It uses them as source material for the sermon companion; it does not relabel your church's words as AI-written text. Review and publication controls still apply.

## What is written to Planning Center

The currently available integration reads plans and notes. Rewind does not currently publish notes, change plan titles, or create plans in Planning Center. A future write-back feature will need its own explicit Studio action; connecting is not permission for an unattended write-back workflow.

Rewind does not send your sermon transcripts, private member notes or questions, or Studio drafts to Planning Center as part of this connector.

## Storage and removal

Rewind stores the connection's access and refresh tokens encrypted. Imported notes remain scoped to your church. Your service selections and mapping are retained when a connection is removed, so reconnecting does not require entering them again.

Choose **Disconnect** in **Studio → Settings → Connections** to clear Rewind's stored tokens and stop using that connection. Rewind also attempts upstream revocation. To independently remove the grant, revoke Rewind in your Planning Center account's integrations settings. Disconnecting does not delete notes already imported into Rewind.

See Rewind's [privacy policy](https://rewind.church/legal/privacy), [trust and data information](https://rewind.church/trust), and [AI explanation](https://rewind.church/legal/ai). For access or deletion questions, [contact Rewind](https://rewind.church/contact?topic=support).
