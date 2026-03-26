# Cardinal Review Fixture

This folder contains review-only sample code intended to test PR analysis quality.

Scope:
- These files are not imported, compiled, or wired into AlgoForge.
- Treat them as a proposed feature diff for review purposes.

Suggested review framing:
- `proposed-profile-preview.rs` is a draft backend endpoint for profile preview and support access.
- `proposed-user-export.ts` is a draft server action for a classroom roster export flow.

What to look for:
- authentication and authorization flaws
- exposure of sensitive user data
- trust of client-supplied identifiers or flags

