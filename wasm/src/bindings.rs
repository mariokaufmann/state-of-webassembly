use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

#[wasm_bindgen(raw_module = "../src/bindings")]
extern "C" {
    pub fn log_to_screen_wasm(text: &str);
    pub fn clear_screen_log_wasm();
}

#[derive(Serialize, Deserialize)]
pub struct WordWithImportance {
    word: String,
    tf_idf: f64,
}

impl WordWithImportance {
    pub fn new(word: String, tf_idf: f64) -> WordWithImportance {
        WordWithImportance { word, tf_idf }
    }
}
