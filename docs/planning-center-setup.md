# Set up Planning Center for Rewind

Connect Planning Center Services so Rewind can use the message notes your church already writes. Connecting does not grant access to your Rewind archive to Planning Center, and does not enable podcast transcription.

## Before you connect

You need permission to manage your church's settings in Rewind and a Planning Center account that can read the Services plans you want to use. Read [what Rewind accesses](planning-center-access.md) before approving the connection.

If Rewind already reads your church's notes from a website or another source, [contact Rewind](https://rewind.church/contact?topic=support) before changing that source. Connecting Planning Center does not replace an existing notes source.

## Prepare your message notes

The default setup reads five **plan-note categories** on your weekend service type. Create these categories in Planning Center Services and fill them in on the relevant plan:

| Category | What to put in it |
| --- | --- |
| Big Idea | Your message's central idea, in your church's own words. |
| Scripture | The scripture references used in the message. |
| Points | The message's points, in order. |
| Questions | Your church's discussion questions. |
| Next Steps | The application or next steps you want people to take. |

Rewind reads these category names without regard to capitalization. It preserves the church-authored wording rather than rewriting it. Missing categories are reported; Rewind does not invent your church's notes.

If you keep notes on an item such as Message, or use different category names, contact Rewind to arrange a mapping. The current Connections page selects service types; it does not provide a custom mapping editor. Rewind does not guess a speaker from a team position: reading a scheduled speaker requires a position mapping chosen for your church.

## Connect and select services

1. Open your church's Rewind space and choose **Studio → Settings → Connections**.
2. In **Planning Center**, choose **Connect Planning Center**.
3. Review Planning Center's authorization screen and approve it only if you want Rewind to use that account's Services data.
4. Return to Rewind. The card should show **Connected**.
5. Under **Which services should Rewind read?**, select only the service types whose message plans you want to use. Selections save as you change them.
6. Turn on **Read these plans automatically each night**. Choose at least one service type first.

If the account or service list cannot be loaded, use the retry or reconnect control shown on the card. Rewind keeps your saved selections when loading fails.

## Confirm the first import

Turning on automatic reading selects Planning Center as your primary notes source if you have not configured another one. If your church already reads notes from another source, Rewind keeps that source and explains the conflict; [contact Rewind](https://rewind.church/contact?topic=support) before changing it.

After the next nightly import, check that the correct message, date, Big Idea, points, questions, and next steps reached Rewind. A saved setting confirms your choice; checking the imported notes confirms that your plan and categories are usable. Review the notes beside the sermon before publishing member-facing material; an ambiguous match needs a person to resolve it.

To stop new automatic plan reads, turn off **Read these plans automatically each night**. Rewind keeps your selections, mapping, and already imported notes. Removing your last selected service type also turns automatic reading off. Reconnecting after a disconnect requires turning it on again.

The current integration reads Planning Center plans. Publishing notes or creating plans in Planning Center from Rewind is not available yet.

## Disconnect

Choose **Disconnect** on the Planning Center card. Rewind clears its stored connection tokens and attempts to revoke the grant at Planning Center. You can also revoke Rewind in your Planning Center account's integrations settings. Imported notes are not deleted by disconnecting; your service selections and mapping are retained for a later reconnect.
