#![deny(clippy::all)]

use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;

mod bindings;
mod preprocessing;
mod processing;

#[wasm_bindgen]
pub fn process_with_wasm(text: &str, start_time: f64) {
    console_error_panic_hook::set_once();
    processing::process(text, start_time)
}

#[wasm_bindgen]
pub fn analyze_sample_with_wasm(
    min_price: u16,
    max_price: u16,
    countries: JsValue,
    start_time: f64,
) -> JsValue {
    let countries: Vec<String> = countries.into_serde().unwrap();
    JsValue::from_serde(&processing::analyze_sample(
        min_price, max_price, &countries, start_time,
    ))
    .unwrap()
}
