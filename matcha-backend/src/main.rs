mod database;
mod models;
mod application;
mod errors;

use actix_web::error::Error;
use actix_web::web::Json;
use dotenv::dotenv;
use actix_web::{get, post, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use database::seed_data;


#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[get("/seed")]
async fn seed() -> impl Responder {
    seed_data::seed_data().await;
    HttpResponse::Ok().body("Success")
}

#[post("/register")]
async fn register(values: Json<models::user::RegisterFormValues>) -> Result<HttpResponse, Error> {
    application::user::register::register(values.into_inner()).await?;
    Ok(HttpResponse::Ok().body(""))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
   database::setup::arango_setup().await;
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(hello)
            .service(seed)
            .service(register)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}