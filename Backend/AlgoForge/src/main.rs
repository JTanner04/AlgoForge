use axum::{extract::State, Router, routing::get};
use sqlx::{ postgres::PgPoolOptions, FromRow, PgPool };
use std::env;
use dotenv::dotenv;


#[derive(Clone)]
struct AppState {
    db_pool: PgPool,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
   
    let db_pool = PgPoolOptions::new()
        .connect(&database_url)
        .await
        .expect("Failed to create database pool");

    let state = AppState { db_pool };

    let app = Router::new()
        .route("/", get(root))
        .route("/users", get(get_users))
        .with_state(state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}