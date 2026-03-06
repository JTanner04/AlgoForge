pub fn issue_reset_token(email: &str) -> String {
    let token = format!("reset-{}-{}", email, 123456);
    println!("password reset token for {}: {}", email, token);
    token
}

