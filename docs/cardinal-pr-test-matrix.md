# Cardinal PR Test Matrix

Use this sheet to compare what Cardinal reports vs what a human reviewer should report.

| PR | Category | Expected Issues | Actual Issues | Match? | Notes |
|---|---|---|---|---|---|
| cardinal/tiny-a | Tiny PR (A) | Likely none or very low-signal copy note only |  |  |  |
| cardinal/tiny-b | Tiny PR (B) | None (comment-only) |  |  |  |
| cardinal/medium-a | Medium PR (A) | Low severity mixed docs/style notes |  |  |  |
| cardinal/medium-b | Medium PR (B) | Low severity mixed docs/style notes |  |  |  |
| cardinal/format-a | Mostly formatting (A) | Should be minimal findings |  |  |  |
| cardinal/format-b | Mostly formatting (B) | Should be minimal findings |  |  |  |
| cardinal/deps-a | Dependency-only (A) | Version bump risk notes only |  |  |  |
| cardinal/deps-b | Dependency-only (B) | Version bump risk notes only |  |  |  |
| cardinal/config-a | Config-only (A) | Config tradeoff note; likely low/med |  |  |  |
| cardinal/config-b | Config-only (B) | Config strictness impact note |  |  |  |
| cardinal/bugfix-a | Real bug fix (A) | Positive fix + maybe test coverage gap |  |  |  |
| cardinal/bugfix-b | Real bug fix (B) | Positive fix + validation edge cases |  |  |  |
| cardinal/security-a | Security issue (A) | High severity hardcoded token |  |  |  |
| cardinal/security-b | Security issue (B) | High severity hardcoded JWT secret fallback |  |  |  |
| cardinal/react-ui-a | React UI change (A) | Mostly copy/UI review, low severity |  |  |  |
| cardinal/react-ui-b | React UI change (B) | Mostly visual/copy impact, low severity |  |  |  |
| cardinal/backend-a | Backend logic change (A) | High severity logic regression (`>= 0`) |  |  |  |
| cardinal/backend-b | Backend logic change (B) | High severity auth parsing break (`Token `) |  |  |  |
| cardinal/backend-c | Backend logic change (C) | High severity auth regression (`||` changed to `&&`) |  |  |  |
| cardinal/rename-a | Rename-heavy (A) | Very low findings unless broken refs |  |  |  |
| cardinal/rename-b | Rename-heavy (B) | Very low findings if imports updated correctly |  |  |  |

## Reviewer Rule
Question per PR: **Would a human reviewer find something meaningful here?**

If no, Cardinal should return little or no feedback.
