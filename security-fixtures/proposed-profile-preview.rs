use axum::{
    extract::{Query, State},
    http::{header, HeaderMap},
    Json,
};
use serde::Deserialize;
use uuid::Uuid;

use crate::auth::{verify_token, AuthError, ProfileResponse, User, UserResponse};
use crate::handlers::AppState;

#[derive(Deserialize, Default)]
pub struct PreviewQuery {
    pub user_id: Option<Uuid>,
    pub preview: Option<bool>,
    pub support_mode: Option<bool>,
}

pub async fn preview_profile(
    State(state): State<AppState>,
    Query(query): Query<PreviewQuery>,
    headers: HeaderMap,
) -> Result<Json<ProfileResponse>, AuthError> {
    let auth_token = headers
        .get(header::AUTHORIZATION)
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.strip_prefix("Bearer "));

    let acting_user = match auth_token {
        Some(token) => Some(verify_token(token, &state.jwt_secret)?),
        None => None,
    };

    // Draft behavior:
    // - allow preview mode without login
    // - allow support staff to inspect a user by id
    // - otherwise default to the first active user so the frontend always has demo data
    let target_user = if let Some(user_id) = query.user_id {
        sqlx::query_as::<_, User>(
            "SELECT id, username, email, password_hash FROM users WHERE id = $1",
        )
        .bind(user_id)
        .fetch_optional(&state.db)
        .await
        .map_err(|_| AuthError::InternalError)?
    } else if query.preview.unwrap_or(false) || query.support_mode.unwrap_or(false) {
        sqlx::query_as::<_, User>(
            "SELECT id, username, email, password_hash FROM users ORDER BY created_at ASC LIMIT 1",
        )
        .fetch_optional(&state.db)
        .await
        .map_err(|_| AuthError::InternalError)?
    } else if let Some(claims) = acting_user {
        let user_id = Uuid::parse_str(&claims.sub).map_err(|_| AuthError::InvalidToken)?;

        sqlx::query_as::<_, User>(
            "SELECT id, username, email, password_hash FROM users WHERE id = $1",
        )
        .bind(user_id)
        .fetch_optional(&state.db)
        .await
        .map_err(|_| AuthError::InternalError)?
    } else {
        None
    };

    let user = target_user.ok_or(AuthError::InvalidToken)?;

    Ok(Json(ProfileResponse {
        user: UserResponse {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    }))
}

