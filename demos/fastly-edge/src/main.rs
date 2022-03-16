use std::ops::Deref;
use fastly::http::{header, Method, StatusCode};
use fastly::{mime, Error, Request, Response};
use rust_stemmers::{Algorithm, Stemmer};

#[fastly::main]
fn main(req: Request) -> Result<Response, Error> {
    // Filter request methods...
    match req.get_method() {
        // Allow GET and HEAD requests.
        &Method::GET | &Method::HEAD | &Method::POST => (),

        // Deny anything else.
        _ => {
            return Ok(Response::from_status(StatusCode::METHOD_NOT_ALLOWED)
                .with_header(header::ALLOW, "GET, HEAD, POST")
                .with_body_text_plain("This method is not allowed\n"));
        }
    };

    match req.get_path() {
        "/" => {
            // Send a default synthetic response.
            Ok(Response::from_status(StatusCode::OK)
                .with_content_type(mime::TEXT_HTML_UTF_8)
                .with_body(include_str!("index.html")))
        }
        "/api/stemming" => {
            let mut stemming_request = req;
            let en_stemmer = Stemmer::create(Algorithm::English);
            let body = stemming_request.take_body();
            let body_text = body.into_string();
            let words: Vec<String> = serde_json::from_str(&body_text)?;
            let mut stemmed_words: Vec<String> = words
                .into_iter()
                .map(|mut word| {
                    word.make_ascii_lowercase();
                    en_stemmer.stem(&word).to_string()
                })
                .collect();
            stemmed_words.sort();
            stemmed_words.dedup();
            let serialized_body = serde_json::to_string(&stemmed_words)?;
            Ok(Response::from_status(StatusCode::OK)
                .with_content_type(mime::APPLICATION_JSON)
                .with_body_text_plain(&serialized_body))
        }

        // Catch all other requests and return a 404.
        _ => Ok(Response::from_status(StatusCode::NOT_FOUND)
            .with_body_text_plain("The page you requested could not be found\n")),
    }
}
