mod auth;
mod handlers;

use axum::{
    routing::{get, post},
    Router,
};
use handlers::AppState;
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::{Any, CorsLayer};


#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let jwt_secret = std::env::var("JWT_SECRET")
        .expect("JWT_SECRET must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to database");

    let state = AppState {
        db: pool,
        jwt_secret,
    };

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/", get(|| async { "AlgoForge API is running!" }))
        .route("/api/signup", post(handlers::signup))
        .route("/api/login", post(handlers::login))
        .route("/api/profile", get(handlers::profile))
        .layer(cors)
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    println!("🚀 Server running on http://localhost:3001");
    axum::serve(listener, app).await.unwrap();
}

// Reviewer test: medium variant A backend note.
