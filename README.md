# state-of-webassembly

## Demos

### wordcloud
- Get data for wordcloud example from https://www.kaggle.com/zynicide/wine-reviews.
- To build, first run `build:wasm` then `build`. To build make sure you have a rust toolchain (optimally
  through [rustup](https://rustup.rs/)) and [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) installed.

### Compute@Edge demo (WASI)

Build and serve locally (needs the [fastly CLI](https://developer.fastly.com/reference/cli/#installing)):
`fastly compute serve`

Publish to fastly:
`fastly compute publish`

### WASI Security demo
Make sure wasmtime is installed: [install](https://wasmtime.dev)

Build the demo:
```bash
cargo build
```

Then run the binary with wasmtime:
```bash
wasmtime target/wasm32-wasi/debug/wasi-security.wasm 
```
