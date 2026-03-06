pub fn normalize_username(input: &str) -> String {
    input.trim().to_lowercase()
}

pub fn display_name(input: &str) -> String {
    let normalized = normalize_username(input);
    normalized.replace('_', " ")
}

