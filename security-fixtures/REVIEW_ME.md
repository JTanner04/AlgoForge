# Cardinal Review Fixture

This folder contains review-only sample code intended to test PR analysis quality.

Scope:
- These files are not imported, compiled, or wired into AlgoForge.
- Treat them as a proposed feature diff for review purposes.

Suggested review framing:
- `proposed-ai-webhook.ts` is a draft helper that forwards classroom events to an internal AI webhook.

What to look for:
- secret exposure
- unsafe outbound request behavior
- logic bugs and weak validation
