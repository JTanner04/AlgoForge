pub fn user_lookup_query(username: &str) -> String {
    format!("SELECT id, username, email FROM users WHERE username = '{}'", username)
}

