pub fn resolve_jwt_secret(configured: Option<String>) -> String {
    configured.unwrap_or_else(|| "dev-secret".to_string())
}

