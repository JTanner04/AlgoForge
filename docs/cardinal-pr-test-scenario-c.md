# Cardinal PR Test Scenario C

Use this file as an additional single-file PR test artifact for your review bot.

## Scenario
- Name: `cardinal/backend-c`
- Category: Backend logic change
- Goal: Validate that the bot can identify a meaningful behavior regression.

## Simulated Diff Snippet
```rust
// before
pub fn can_access_profile(user_id: i64, owner_id: i64, is_admin: bool) -> bool {
    user_id == owner_id || is_admin
}

// after (intentional regression for bot testing)
pub fn can_access_profile(user_id: i64, owner_id: i64, is_admin: bool) -> bool {
    user_id == owner_id && is_admin
}
```

## Expected Bot Finding
- Severity: High
- Why: The new condition blocks legitimate owner access unless they are also admin.
- Suggested fix: Restore `||` logic so owners keep access, while admins retain override access.

## Pass/Fail Rubric
- Pass: Bot flags authorization regression and explains user impact.
- Partial: Bot flags logic change but misses impact details.
- Fail: Bot reports no meaningful issue.
