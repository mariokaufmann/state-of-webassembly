#![deny(clippy::all)]

use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;

mod bindings;
mod preprocessing;
mod processing;

#[wasm_bindgen]
pub fn process_with_wasm(text: &str) -> JsValue {
    console_error_panic_hook::set_once();
    JsValue::from_serde(&processing::process(text)).unwrap()
}
