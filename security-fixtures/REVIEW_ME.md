# Cardinal Review Fixture

This folder contains review-only sample code intended to test PR analysis quality.

Scope:
- These files are not imported, compiled, or wired into AlgoForge.
- Treat them as a proposed feature diff for review purposes.

Suggested review framing:
- `proposed-reset-link.ts` is a draft password reset helper for support and account recovery flows.

What to look for:
- sensitive token exposure
- authorization and account-takeover risks
- logic bugs and weak error handling
