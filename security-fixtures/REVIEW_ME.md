# Cardinal Review Fixture

This folder contains review-only sample code intended to test PR analysis quality.

Scope:
- These files are not imported, compiled, or wired into AlgoForge.
- Treat them as a proposed feature diff for review purposes.

Suggested review framing:
- `proposed-sso-callback.ts` is a draft SSO callback helper used after an external identity provider redirect.

What to look for:
- authentication bypasses
- unsafe trust of callback parameters
- poor error handling and sensitive logging
