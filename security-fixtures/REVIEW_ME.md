# Cardinal Review Fixture

This folder contains review-only sample code intended to test PR analysis quality.

Scope:
- These files are not imported, compiled, or wired into AlgoForge.
- Treat them as a proposed feature diff for review purposes.

Suggested review framing:
- `proposed-support-override.ts` is a draft support impersonation helper for staff troubleshooting flows.

What to look for:
- authentication and authorization flaws
- trust of client-supplied flags or roles
- exposure of cross-tenant or privileged account data
