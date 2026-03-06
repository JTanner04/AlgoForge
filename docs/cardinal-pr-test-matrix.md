# Cardinal PR Test Matrix

Use this sheet to compare what Cardinal reports vs what a human reviewer should report.

| PR | Category | Expected Issues | Actual Issues | Match? | Notes |
|---|---|---|---|---|---|
| cardinal/security-c | Security issue | High severity hardcoded JWT fallback secret |  |  |  |
| cardinal/backend-d | Backend data access | High severity SQL injection risk from interpolated query |  |  |  |
| cardinal/authz-a | Authorization | High severity missing admin authorization check |  |  |  |
| cardinal/frontend-xss-a | Frontend rendering | High severity unescaped user input (XSS risk) |  |  |  |
| cardinal/security-d | Credential/reset flow | High severity plaintext password reset token storage/logging |  |  |  |
| cardinal/perf-db-a | Database performance | Medium/High N+1 query pattern on list endpoint |  |  |  |
| cardinal/async-race-a | Async correctness | High severity missing `await` on critical DB write |  |  |  |
| cardinal/priv-esc-a | Request handling | High severity unsafe object merge from `req.body` |  |  |  |
| cardinal/integration-tls-a | External API client | High severity TLS/certificate verification disabled |  |  |  |
| cardinal/refactor-clean-a | Large refactor baseline | Low/no issues; only high-signal comments if any |  |  |  |

## Reviewer Rule
Question per PR: **Would a human reviewer find something meaningful here?**

If no, Cardinal should return little or no feedback.
