use axum::{
    extract::State,
    http::{header, HeaderMap},
    Json,
};
use sqlx::PgPool;
use uuid::Uuid;

use crate::auth::{
    hash_password, verify_password, create_token,
    verify_token, AuthError, AuthResponse, LoginRequest, ProfileResponse, SignupRequest, User,
    UserResponse,
};

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    pub jwt_secret: String,
}

pub async fn signup(
    State(state): State<AppState>, 
    Json(payload): Json<SignupRequest>
) -> Result<Json<AuthResponse>, AuthError> {
    let existing_user = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM users WHERE email = $1"
    )
    .bind(&payload.email)
    .fetch_one(&state.db)
    .await
    .map_err(|_| AuthError::InternalError)?;

    if existing_user > 0 {
        return Err(AuthError::UserAlreadyExists);
    }

    let password_hash = hash_password(&payload.password)?;
    let user_id = Uuid::new_v4();

    sqlx::query(
        "INSERT INTO users (id, username, email, password_hash) VALUES ($1, $2, $3, $4)"
    )
    .bind(&user_id)
    .bind(&payload.username)
    .bind(&payload.email)
    .bind(&password_hash)
    .execute(&state.db)
    .await
    .map_err(|_| AuthError::InternalError)?;

    let token = create_token(&user_id, &payload.email, &state.jwt_secret)?;

    Ok(Json(AuthResponse {
        token,
        user: UserResponse {
            id: user_id,
            username: payload.username,
            email: payload.email,
        },
    }))
}

pub async fn login(
    State(state): State<AppState>, 
    Json(payload): Json<LoginRequest>,
) -> Result<Json<AuthResponse>, AuthError> {
    // Find user by USERNAME (not email)
    let user = sqlx::query_as::<_, User>(
        "SELECT id, username, email, password_hash FROM users WHERE username = $1"
    )
    .bind(&payload.username)       // Changed from email to username
    .fetch_optional(&state.db)
    .await
    .map_err(|_| AuthError::InternalError)?
    .ok_or(AuthError::InvalidCredentials)?;

    // Verify password matches
    let is_valid = verify_password(&payload.password, &user.password_hash)?;
    
    if !is_valid {
        return Err(AuthError::InvalidCredentials);
    }

    // Create token (still uses email for the token claims)
    let token = create_token(&user.id, &user.email, &state.jwt_secret)?;

    // Return response
    Ok(Json(AuthResponse {
        token,
        user: UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    }))
}

pub async fn profile(
    State(state): State<AppState>,
    headers: HeaderMap,
) -> Result<Json<ProfileResponse>, AuthError> {
    let auth_header = headers
        .get(header::AUTHORIZATION)
        .and_then(|value| value.to_str().ok())
        .ok_or(AuthError::InvalidToken)?;

    let token = auth_header
        .strip_prefix("Token ")
        .ok_or(AuthError::InvalidToken)?;

    let claims = verify_token(token, &state.jwt_secret)?;
    let user_id = Uuid::parse_str(&claims.sub).map_err(|_| AuthError::InvalidToken)?;

    let user = sqlx::query_as::<_, User>(
        "SELECT id, username, email, password_hash FROM users WHERE id = $1",
    )
    .bind(user_id)
    .fetch_optional(&state.db)
    .await
    .map_err(|_| AuthError::InternalError)?
    .ok_or(AuthError::InvalidToken)?;

    Ok(Json(ProfileResponse {
        user: UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    }))
}
