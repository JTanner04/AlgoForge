# Cardinal Review Fixture

This folder contains review-only sample code intended to test PR analysis quality.

Scope:
- These files are not imported, compiled, or wired into AlgoForge.
- Treat them as a proposed feature diff for review purposes.

Suggested review framing:
- `proposed-download-token.ts` is a draft server action for generating shareable report download links.

What to look for:
- leakage of secrets or bearer tokens
- trust of client-supplied destinations or identifiers
- weak authorization around report access
