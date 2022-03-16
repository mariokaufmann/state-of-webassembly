import{$ as h,R as p,a as g,b as f}from"./vendor.89915203.js";const w=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerpolicy&&(e.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?e.credentials="include":n.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(n){if(n.ep)return;n.ep=!0;const e=a(n);fetch(n.href,e)}};w();function c(){document.querySelector(".toc").classList.remove("toc-hidden")}function m(){document.querySelector(".toc").classList.add("toc-hidden")}var b=`<header>
    <h1>State of WebAssembly</h1>
    <h2>
        <span class="nowrap">Patrick Walther & Mario Kaufmann</span>
    </h2>
</header>
<section>
        <h2>01 WebAssembly Basics</h2>
        <ul>
            <li>What is WebAssembly?</li>
            <li>Format & Data types</li>
            <li>Minimal module (.wat)</li>
        </ul>
</section>
<section>
        <h2>02 Expand browser capabilities</h2>
        <ul>
            <li>use cases</li>
            <li>demo</li>
            <li>general workflow</li>
        </ul>
</section>
<section>
        <h2>03 Improve performance with wasm</h2>
        <ul>
            <li>word cloud example</li>
            <li>considerations</li>
        </ul>
</section>
<section>
        <h2>04 wasm features</h2>
        <ul>
            <li>wasm MVP</li>
            <li>wasm-feature-detect</li>
        </ul>
</section>
<section>
    <h2>05 WASI</h2>
    <ul>
        <li>interface with system</li>
        <li>proposals</li>
        <li>use cases</li>
    </ul>
</section>
<section>
    <h2>06 summary</h2>
    <ul>
      <li>WASM inside of the browser</li>
      <li>WASM outside of the browser</li>
    </ul>
</section>`,y=`<section class="deck-slide">
    <h1>WebAssembly Basics</h1>
</section>

<section>
    <img alt="WebAssembly logo" src="assets/img/Web_Assembly_Logo.svg" width="10%" />
    <h2>WebAssembly = wasm</h2>
</section>

<section>
    <section>
        <h2>Browser Support?</h2>
        <img alt="wasm browser support" src="assets/img/wasm-support.png" />
    </section>
    <section>
        <h2>Node.js</h2>
        <p>
            Support since v8.0 (2017)
        </p>
    </section>
</section>

<section>
    <section>
        <h2>What is wasm?</h2>
        <p>WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.</p>
    </section>
    <section>
        <h2>But what does that actually mean?</h2>
        <ul>
            <li class="fragment">Compile anything to the web</li>
            <li class="fragment">Create npm packages out of any third party library</li>
            <li class="fragment">Pick the right tool for the task (e.g. math)</li>
        </ul>
    </section>
    <section>
        <h2>What languages can be compiled to wasm?</h2>
        <ul>
            <li class="fragment">
                <a href="https://github.com/appcypher/awesome-wasm-langs" target="_blank">
                    List of wasm languages
                </a>
            </li>
            <li class="fragment">Support is growing!</li>
        </ul>
    </section>
    <section>
        <h2>Track proposals</h2>
        <p>
            <a href="https://github.com/WebAssembly/proposals" target="_blank">Github Repository</a>
        </p>
    </section>
</section>

<section>
    <section>
        <h2>Interface</h2>
    </section>
    <section>
        <h2>Memory</h2>
        <ul>
            <li>Only flat linear memory support</li>
            <li class="fragment">No Garbage Collection except custom written</li>
            <li class="fragment">Work in progress (Phase 2)</li>
        </ul>
    </section>
    <section>
        <h2>Types</h2>
        <img alt="wasm interface types" src="assets/img/wasm-types.png">
    </section>
    <section>
        <h2>How do we exchange other types?</h2>
        <ul>
            <li class="fragment">
                Other types we have to pass the reference and read it directly from memory
            </li>
            <li class="fragment">
                Compilers add "glue code"
            </li>
            <li class="fragment">We'll see that later</li>
        </ul>
    </section>
    <section>
        <h2>DOM</h2>
        <ul>
            <li>No DOM access from within wasm</li>
            <li class="fragment">DOM API proposed for future version</li>
        </ul>
    </section>
    <section>
        <h2>GPU</h2>
        <ul>
            <li>No GPU access</li>
            <li>Not planned right now</li>
            <li>Follow the W3C <a href="https://github.com/gpuweb/gpuweb" target="_blank">gpuweb proposal</a></li>
        </ul>
    </section>
</section>


<section>
    <h2>Minimal Example</h2>
    <p>
        <a href="https://localhost:28443" target="_blank">WebAssembly Studio</a>
    </p>
</section>

<section>
    <section>
        <h2>Compilation example</h2>
    </section>
    <section>
        <h2>C</h2>
        <pre>
            <code class="hljs c" data-trim contenteditable data-noescape>
                int factorial(int n) {
                  if (n == 0)
                    return 1;
                  else
                    return n * factorial(n - 1);
                }
            </code>
            </pre>
    </section>
    <section>
        <h2>Intermediate format</h2>
        <pre>
            <code class="hljs" data-trim contenteditable data-noescape>
                get_local 0
                i64.eqz
                if (result i64)
                    i64.const 1
                else
                    get_local 0
                    get_local 0
                    i64.const 1
                    i64.sub
                    call 0
                    i64.mul
                end
            </code>
            </pre>
    </section>
    <section>
        <h2>wasm binary format</h2>
        <pre>
            <code class="hljs" data-trim contenteditable data-noescape>
                20 00
                50
                04 7E
                42 01
                05
                20 00
                20 00
                42 01
                7D
                10 00
                7E
                0B
            </code>
            </pre>
    </section>
    <section>
        <h2>Text representation (s-expr)</h2>
        <pre>
            <code class="hljs scheme" data-trim contenteditable data-noescape>
                (module
                  (import "math" "exp" (func $exp (param f64) (result f64)))
                  (func (export "doubleExp") (param $0 f64) (result f64)
                    (f64.mul
                      (call $exp
                        (get_local $0)
                      )
                      (f64.const 2)
                    )
                  )
                )
            </code>
            </pre>
    </section>
</section>

<section>
    <section>
        <h2>What is coming?</h2>
    </section>
    <section>
        <h2>Garbage Collection</h2>
        <ul>
            <li>Currently not supported</li>
            <li>Languages with GC compile it themselves</li>
            <li>Bad for binary size and efficiency</li>
        </ul>
    </section>
    <section>
        <h2>Host bindings</h2>
        <ul>
            <li>Currently we have a very limited interface</li>
            <li>Add sharing of JS/DOM objects</li>
            <li>Create, call, manipulate and pass objects</li>
        </ul>
    </section>
    <section>
        <h2>Exception Handling</h2>
        <ul>
            <li>Support is in progress!</li>
            <li>Fairly challenging proposal</li>
        </ul>
    </section>
    <section>
        <h2>Reference Types</h2>
        <ul>
            <li>Currently minimal set of types</li>
            <li>Serialize more complex types to memory</li>
            <li>New "anyref" type that allows references to JS objects</li>
        </ul>
    </section>
    <section>
        <h2>WASI</h2>
        <ul>
            <li>WebAssembly System Interface</li>
            <li>Outside of the Browser</li>
            <li>Includes I/O</li>
        </ul>
    </section>
    <section>
        <h2>And so much more...</h2>
    </section>
</section>

<section>
    <h2>Resources</h2>
    <ul>
        <li>
            <a href="https://github.com/webassembly" target="_blank">
                WebAssembly on Github
            </a>
        </li>
        <li>
            <a href="https://github.com/WebAssembly/proposals" target="_blank">
                WebAssembly Proposals
            </a>
        </li>
        <li>
            <a href="https://github.com/wasdk/WebAssemblyStudio" target="_blank">
                WebAssembly Studio
            </a>
        </li>
        <li>
            <a href="https://github.com/appcypher/awesome-wasm-langs" target="_blank">
                List of wasm languages
            </a>
        </li>
    </ul>
</section>
`,v=`<section class="deck-slide">
    <h1>Expand browser capabilities</h1>
</section>
<section>
    <section>
        <h2>Use Cases</h2>
    </section>
    <section>
        <h2>"Typical" Desktop Applications</h2>
        <ul>
            <li>Image/Video Editing</li>
            <li>CAD</li>
            <li>Our customers fat clients...</li>
        </ul>
    </section>
    <section>
        <h2>"Real time" Applications</h2>
        <ul>
            <li>Image recognition</li>
            <li>Voice recognition</li>
            <li>VR/AR</li>
        </ul>
    </section>
    <section>
        <h2>CPU intensive things</h2>
        <ul>
            <li>Streaming</li>
            <li>Compression/Decompression</li>
            <li>Platform Simulation</li>
        </ul>
    </section>
    <section>
        <h2>Gaming</h2>
        <ul>
            <li>"Casual" games</li>
            <li>Currently no GPU heavy gaming</li>
        </ul>
    </section>
</section>
<section>
    <section>
        <h2>Demos</h2>
    </section>
    <section>
        <h2>Google Earth</h2>
        <p>
            <a href="http://earth.google.com/" target="_blank">Link</a>
        </p>
    </section>
    <section>
        <h2>Squoosh</h2>
        <p>
            <a href="https://squoosh.app/" target="_blank">Link</a>
        </p>
        <aside class="notes">
            As soon as you import a picture wasm modules get loaded
        </aside>
    </section>
    <section>
        <h2>Figma</h2>
        <p>
            <a href="https://www.figma.com" target="_blank">Link</a>
        </p>
        <aside class="notes">
            We could show a default account here
        </aside>
    </section>
    <section>
        <h2>Stackblitz</h2>
        <p>
            <a href="https://stackblitz.com/" target="_blank">Link</a>
        </p>
        <aside class="notes">
            Show in Google Chrome. Mention WebContainers here.
        </aside>
    </section>
    <section>
        <h2>ffmpeg.js</h2>
        <p>
            <a href="https://ffmpegwasm.netlify.app/#demo" target="_blank"></a>
        </p>
        <aside class="notes">
            Show how a video can be uploaded and converted in-browser.
        </aside>
    </section>
</section>
`,k=`<section class="deck-slide">
    <h1>Improve performance with wasm</h1>
</section>
<section>
    <p>WebAssembly aims to execute at near-native speed</p>
    <p>How can we make use of that?</p>
</section>
<section>
    <h2>No silver bullet</h2>
    <ul>
        <li>JS engines are heavily optimized</li>
        <li>WebAssembly will only be faster for certain workloads</li>
        <li>Always measure!</li>
    </ul>
</section>
<section>
    <h2>Showcase app</h2>
    <p>Take set of 150k wine reviews from Twitter and generate a word cloud from a subset of the reviews with
        the most relevant words</p>
    <img alt="word cloud wine reviews (wines from South America)"
         src="assets/img/word-cloud/wordcloud_south_america.png" width="50%"/>
</section>
<section>
    <h2>Why do it in the browser?</h2>
    <ul>
        <li>No server-side processing power needed</li>
        <li>Potentially sensitive data sets need not be uploaded to the server</li>
    </ul>
</section>
<section>
    <h3>Dataset</h3>
    <h4>Review for Quinta dos Avidagos 2011 Avidagos Red</h4>
    <ul>
        <li>Points: 87</li>
        <li>Description: This is ripe and fruity, a wine that is smooth while still structured. Firm tannins are filled
            out with juicy red berry fruits and freshened with acidity. It's already drinkable, although it will
            certainly be better from 2016.
        </li>
        <li>Variety: Portuguese Red</li>
        <li>Province: Douro</li>
        <li>Country: Portugal</li>
    </ul>
</section>
<section>
    <h2>What are the most relevant words?</h2>
    <p>We don't want the most frequent but the most relevant words</p>
    <p>For our example we use TF-IDF</p>
</section>
<section>
    <h2>TF-IDF</h2>
    <h3>Term frequency - inverse document frequency</h3>
    <ul>
        <li>Corpus: set of all reviews</li>
        <li>Document: (in our case) a subset of all reviews</li>
    </ul>
    <ul>
        <li>Term frequency: measure for how often a word appears in a document</li>
        <li>Inverse document frequency: measure for how rare a word is within the corpus</li>
    </ul>
</section>
<section>
    <h2>TF-IDF</h2>
    <p>TF-IDF value for a word = TF * IDF</p>
    <small>Frequency of the word offset by how rare it is</small>
    <p>In our case a good measure to filter out common words like 'is', 'the', 'wine', etc.</p>
</section>
<section>
    <a href="http://localhost:3000/demo/wordcloud/?js=true" target="_blank">
        <h2>Demo</h2>
    </a>
</section>
<section>
    <h2>Time needed for generating word cloud</h2>
    <ul>
        <li>Safari: 4.0-4.5s</li>
        <li>Firefox: 3.5-4.0s</li>
        <li>Chrome: 2.5-3.0s</li>
    </ul>
    <small>Specific example, not representative of general browser performance differences</small>
</section>
<section>
    <p>Let's try to speed it up!</p>
</section>
<section>
    <h2>Goal</h2>
    <p>Create a WebAssembly module that can generate exactly the same word cloud</p>
</section>
<section>
    <h2>Approach</h2>
    <p>Use</p>
    <ul>
        <li>Rust as implementation language</li>
        <li>wasm-bindgen for generating glue code between JS and wasm</li>
        <li>web-sys and js-sys crates for bindings into JS</li>
        <li>wasm-pack for bundling up module and glue code</li>
    </ul>
</section>
<section>
    <h2>js-sys & web-sys crates</h2>
    <p>Bind to Web API & JS functions from Rust</p>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            fn log_time(step: &str, start_time: f64) {
                let end_time = web_sys::window().unwrap()
                    .performance().unwrap().now();
                log_to_screen_wasm(&format!("{} after {}ms.", step,
                    end_time - start_time));
            }
        </code>
</section>
<section>
    <h2>Processing function</h2>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            #[wasm_bindgen]
            pub fn process_with_wasm(text: &str) {
                processing::process(text)
            }
        </code>
    </pre>
    <ul>
        <li>#[wasm_bindgen] annotation for glue code generation</li>
        <li>Data (&str) is automatically encoded/decoded by wasm-bindgen</li>
    </ul>
    <small></small>
</section>
<section>
    <h2>Word cloud function</h2>
    <small>Returns the most relevant words with an importance score</small>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            #[wasm_bindgen]
            pub fn analyze_sample_with_wasm(min_price: u16,
                max_price: u16,
                countries: JsValue
            ) -> JsValue {
                let countries: Vec&lt;String&gt; = countries.into_serde()
                .unwrap();
                JsValue::from_serde(&processing::analyze_sample(
                    min_price, max_price, &countries,
                ))
                .unwrap()
            }
        </code>
    </pre>
</section>
<section>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            #[wasm_bindgen]
            pub fn analyze_sample_with_wasm(min_price: u16,
                max_price: u16,
                countries: JsValue
            ) -> JsValue { ... }
        </code>
    </pre>
    <p>Non-primitive values (objects/structs, lists of objects) can be passed as JSValue through JSON marshalling</p>
</section>
<section>
    <h2>Implementation process</h2>
    <ul>
        <li>Implement processing logic in Rust</li>
        <li>Make sure that Rust and JS return the same words for the same dataset</li>
        <li>Profile Rust implementation and find performance bottlenecks</li>
    </ul>
    <small>More on profiling wasm code later</small>
</section>
<section>
    <a href="http://localhost:3000/demo/wordcloud/" target="_blank">
        <h2>Demo</h2>
    </a>
</section>
<section>
    <h2>Time needed for generating word cloud (wasm)</h2>
    <ul>
        <li>Safari: 1.5-2.0s</li>
        <li>Firefox: 1.5-2.0s</li>
        <li>Chrome: 8.0-8.5s (!)</li>
    </ul>
    <p>What is happening in Chrome?</p>
</section>
<section>
    <section>
        <p>How to profile our code?</p>
    </section>
    <section>
        <p>Use dev tools (performance tab)</p>
        <img src="assets/img/word-cloud/profiling1.png"/>
    </section>
    <section>
        <p>Use dev tools (performance tab)</p>
        <img src="assets/img/word-cloud/profiling1.png"/>
        <p class="tip">
            wasm runs slower when dev tools are open - except when profiling in performance tab!
        </p>
    </section>
    <section>
        <p>Find relevant function call</p>
        <img src="assets/img/word-cloud/profiling2.png"/>
    </section>
    <section>
        <p>Not very readable unfortunately</p>
        <img src="assets/img/word-cloud/profiling3.png"/>
    </section>
    <section>
        <p>Include debug symbols and disable <br/>optimizations in the wasm build</p>
        <pre>
        <code class="hljs toml" data-trim contenteditable data-noescape>
            [profile.release]
            opt-level = 3
            lto = true
            debug = true
            [package.metadata.wasm-pack.profile.release]
            wasm-opt = false
            [package.metadata.wasm-pack.profile.release.wasm-bindgen]
            debug-js-glue = true
            demangle-name-section = true
            dwarf-debug-info = true
        </code>
    </pre>
        <small>These options are input language (and toolchain) specific</small>
    </section>
    <section>
        <p>Include debug symbols and disable optimizations in the wasm build</p>
        <pre>
        <code class="hljs toml" data-trim contenteditable data-noescape>
            [profile.release]
            opt-level = 3
            lto = true
            debug = true
            [package.metadata.wasm-pack.profile.release]
            wasm-opt = false
            [package.metadata.wasm-pack.profile.release.wasm-bindgen]
            debug-js-glue = true
            demangle-name-section = true
            dwarf-debug-info = true
        </code>
    </pre>
        <p class="tip">A build like this will both be larger and slower typically</p>
    </section>
</section>
<section>
    <p>Now we have a readable profiling session!</p>
    <img src="assets/img/word-cloud/profiling_alloc.png"/>
</section>
<section>
    <p>Zooming in, memory allocations seem to dominate</p>
    <img src="assets/img/word-cloud/profiling_alloc.png"/>
</section>
<section>
    <p>working in low level languages makes it possible to control when memory is allocated to some extent</p>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            let corpus_word_map = HashMap::with_capacity(100_000);
        </code>
    </pre>
    <small>Making sure that the hash map does not need to grow when inserting the elements</small>
</section>
<section>
    <h2>Chrome updated result</h2>
    <ul>
        <li>A bit faster in Chrome (7.5s), but not substantially</li>
        <li>Still much slower than the JS implementation</li>
        <li>Not possible to easily optimize all allocations (data cleaning, words of unknown length, algorithm memory
            efficiency)
        </li>
    </ul>
</section>
<section>
    <p>Let's use another tool - chrome://tracing</p>
    <img src="assets/img/word-cloud/tracing.png" alt="Chrome tracing tools"/>
</section>
<section>
    <h2>Chrome tracing tools</h2>
    <ul>
        <li>Trace low-level Chrome events</li>
        <li>among many other things, v8.wasm events</li>
    </ul>
</section>
<section>
    <h2>Tracing session</h2>
    <ul>
        <li>Start recording wasm events</li>
        <li>Process dataset again</li>
        <li>Analyze wasm events</li>
    </ul>
</section>
<section>
    <img src="assets/img/word-cloud/tracing_results.png"/>
    <p>Large number of wasm.GrowMemory operations</p>
</section>
<section>
    <h2>Reminder: WebAssembly memory</h2>
    <ul>
        <li>wasm memory is a linear buffer</li>
        <li>Every time it is grown the memory potentially needs to be relocated</li>
    </ul>
</section>
<section>
    <p>let's try to minimize the number of grow operations</p>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            pub fn process(text: &str, start_time: f64) {
                let buffer: Vec&lt;u8&gt; = Vec::with_capacity(200_000_000);
                drop(buffer);
                ...
            }
        </code>
    </pre>
    <small>
        Preallocate memory and drop it immediately again, therefore making sure that we have one big wasm grow
        operation.
        In a real application how much memory is allocated wouldn't be constant
    </small>
</section>
<section>
    <p>Success!</p>
    <img src="assets/img/word-cloud/chrome_preallocation.png"/>
</section>
<section>
    <h2>Time needed for generating word cloud (wasm + preallocation)</h2>
    <ul>
        <li>Safari: 1.5-2.0s</li>
        <li>Firefox: 1.5-2.0s</li>
        <li><b>Chrome: 1.5-2.0s</b></li>
    </ul>
</section>
<section>
    <h2>Side note: debugging</h2>
    <ul>
        <li>Debugging not very mature yet</li>
        <li>With wasm-bindgen, direct debugging is not yet supported</li>
        <li>DWARF debugging symbols get stripped from binary</li>
        <li>It can work for certain combinations of toolchains and languages (e.g. C + emscripten)</li>
    </ul>
</section>
<section>
    <h2>Summary</h2>
    <ul>
        <li>For certain workloads, one can improve performance with wasm</li>
        <li>Minimize allocations and growing memory, minimize calls across marshalling boundary</li>
        <li>always measure!</li>
    </ul>
</section>

<section>
    <h2>Resources</h2>
    <ul>
        <li>
            <a href="https://www.kaggle.com/zynicide/wine-reviews" target="_blank">
                Demo dataset
            </a>
        </li>
        <li>
            <a href="https://jmotif.github.io/sax-vsm_site/morea/algorithm/TFIDF.html" target="_blank">
                TF-IDF
            </a>
        </li>
        <li>
            <a href="https://github.com/rustwasm/wasm-bindgen" target="_blank">
                wasm-bindgen
            </a>
        </li>
        <li>
            <a href="https://github.com/rustwasm/wasm-pack" target="_blank">
                wasm-pack
            </a>
        </li>
        <li>
            <a href="https://github.com/rustwasm/wasm-bindgen/issues/2389" target="_blank">
                wasm-bindgen and debugging
            </a>
        </li>
    </ul>
</section>
`,_=`<section class="deck-slide">
  <h1>wasm features</h1>
</section>
<section>
  <h2>WebAssembly MVP</h2>
  <ul>
    <li>In 2017 an MVP of WebAssembly was implemented by browser vendors</li>
    <li>Since then new features are added through a standardization process</li>
  </ul>
</section>
<section>
  <section>
    <h2>Standardized features</h2>
    <img alt="Wasm standardized features" src="assets/img/wasm_features_standardized.png" />
  </section>
  <section>
    <h2>SIMD</h2>
    <p>SIMD stands for Single Instruction, Multiple Data. SIMD instructions are a special class of instructions that
      exploit data parallelism in applications by simultaneously performing the same operation on multiple data
      elements</p>
    <a href="https://v8.dev/features/simd" target="_blank">https://v8.dev/features/simd</a>
  </section>
  <section>
    <h2>Reference types</h2>
    <p>Get JS values by reference</p>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            #[wasm_bindgen]
            pub fn takes_js_value(a: &JsValue) {
              // ...
            }
        </code>
    </pre>
  </section>
  <section>
    <h2>Reference types</h2>
    <p>Glue code without proposal</p>
    <pre>
        <code class="hljs js" data-trim contenteditable data-noescape>
            const heap = new Array(32).fill(undefined);
            heap.push(undefined, null, true, false);
            let stack_pointer = 32;
            function addBorrowedObject(obj) {
                if (stack_pointer == 1)
                    throw new Error('out of js stack');
                heap[--stack_pointer] = obj;
                return stack_pointer;
            }
            export function takes_js_value(a) {
                try {
                    wasm.takes_js_value(addBorrowedObject(a));
                } finally {
                    heap[stack_pointer++] = undefined;
                }
            }
        </code>
    </pre>
  </section>
  <section>
    <h2>Reference types</h2>
    <p>Glue code with proposal</p>
    <pre>
        <code class="hljs js" data-trim contenteditable data-noescape>
            export function takes_js_value(a) {
                wasm.takes_js_value(a);
            }
        </code>
    </pre>
    <a href="https://rustwasm.github.io/wasm-bindgen/reference/reference-types.html" target="_blank">
      https://rustwasm.github.io/wasm-bindgen/reference/reference-types.html</a>
  </section>
</section>
<section>
  <h2>In-progress features</h2>
  <img alt="Wasm standardized features" src="assets/img/wasm_features_in-progress.png" />
</section>
<section>
  <h2>Detect WebAssembly features</h2>
  <ul>
    <li>With the <a href="https://wasm-feature-detect.surma.technology/">wasm-feature-detect</a> library it is possible to
      detect which features a browser supports</li>
    <li>Different wasm binaries have to be loaded for each feature combination</li>
  </ul>
</section>
`,S=`<section class="deck-slide">
    <h1>WASI</h1>
</section>
<section>
    <h2>Wasm outside of browser</h2>
    <p>Introduction: "Wasm is designed as a portable compilation target"</p>
    <p>This means that WebAssembly can be run outside of the browser</p>
</section>
<section>
    <h2>Generalized runtime</h2>
    <ul>
        <li>Generalized runtime for many input languages</li>
        <li>In idea similar to Java ("write once run anywhere")</li>
        <li>but: native support for many input languages and capability-based security</li>
    </ul>
</section>
<section>
    <h2>Wasm runtimes</h2>
    <ul>
        <li><a href="https://wasmtime.dev" target="_blank">wasmtime</a></li>
        <img src="assets/img/wasmtime.png" width="20%"/>
        <li><a href="https://wasmer.io" target="_blank">wasmer</a></li>
        <img src="assets/img/wasmer.png" width="40%"/>
    </ul>
</section>
<section>
    <h2>Wasm security</h2>
    <ul>
        <li>Wasm has a strict security model</li>
        <li>Wasm modules run in a sandboxed environment isolated from the host</li>
    </ul>
    <a href="https://webassembly.org/docs/security/">More details about Wasm security</a>
    <p></p>
</section>
<section>
    <p>What does this mean for execution outside of the browser?</p>
    <p>by default no access to:</p>
    <ul>
        <li>file system</li>
        <li>network</li>
        <li>system calls</li>
    </ul>
</section>
<section>
    <h2>WASI</h2>
    <q>WASI is a modular system interface for WebAssembly</q>
</section>
<section>
    <pre>
        <code class="hljs txt" data-trim contenteditable data-noescape>
            Hello from the text file!
        </code><small>input.txt</small>
    </pre>
    <pre>
        <code class="hljs rust" data-trim contenteditable data-noescape>
            fn main() {
                let text = std::fs::read_to_string("input.txt")
                    .expect("Could not read file");
                println!("{}", text);
            }
        </code><small>main.rs</small>
    </pre>
</section>
<section>
    <pre>
        <code class="hljs bash" data-trim contenteditable data-noescape>
            > wasmtime wasi-security.wasm
            thread 'main' panicked at
                'Could not read file: Custom { kind: Uncategorized,
                 error: "failed to find a pre-opened file descriptor
                 through which \\"input.txt\\" could be opened" }',
                 src\\main.rs:3:10
            note: run with \`RUST_BACKTRACE=1\` environment variable
            to display a backtrace
            Error: failed to run main module
                \`target/wasm32-wasi/debug/wasi-security.wasm\`
        </code>
    </pre>
</section>
<section>
    <ul>
        <li>WASI follows a capability-based security approach</li>
        <li>Possible to finely tune what a module has access to</li>
    </ul>
</section>
<section>
    <p>Give the module access to the working directory (--dir .)</p>
    <pre>
        <code class="hljs bash" data-trim contenteditable data-noescape>
            > wasmtime wasi-security.wasm --dir .
            Hello from the text file!
        </code>
    </pre>
</section>
<section>
    <h2>WASI proposals</h2>
    <ul>
        <li>WASI APIs are developed as proposals</li>
        <li>Currently no proposal has reached stage 5 (standardized) yet</li>
        <li>Runtimes implement some APIs anyway already</li>
    </ul>
</section>
<section>
    <section>
        <h2>WASI use cases</h2>
        <p>What are examples of Wasm outside of the browser (with WASI)?</p>
    </section>
    <section>
        <h2>fastly Compute@Edge</h2>
        <img src="assets/img/fastly.png" class="badge-container" width="10%"/>
        <ul>
            <li>Run a WASI workload on fastly's Compute@Edge platform</li>
            <li>example: use the same word cloud code and deploy it serverless to the cloud</li>
        </ul>
        <aside class="notes">
            If there is enough time we can show the sample here
            https://github.com/CurrySoftware/rust-stemmers
            https://github.com/snowballstem/snowball
            https://manage.fastly.com/compute/services/2H1IhwStWxemRvkd4Dk8gM
            curl https://rapidly-funny-man.edgecompute.app/api/stemming -H "Content-Type: application/json" --data '["reading", "horses", "blue", "read"]'
        </aside>
    </section>
    <section>
        <h2>Krustlet - kubelet</h2>
        <img src="assets/img/krustlet.svg" class="badge-container" width="20%"/>
        <ul>
            <li>Enables a Kubernetes node to run WASI workloads</li>
            <li>The cluster can then run Wasm modules in addition to containers</li>
        </ul>
    </section>
    <section>
        <h2>Krustlet - kubelet</h2>
        <img src="assets/img/krustlet.svg" class="badge-container" width="20%"/>
        <img src="assets/img/docker_wasm_quote.png"/>
    </section>
    <section>
        <h2>Plugin for Flight Simulator</h2>
        <img src="assets/img/msfs_logo.png" width="20%"/>
        <p>
            The 2020-released new Flight Simulator by Microsoft uses a Wasm-based plugin mechanism instead of loading
            dynamic shared libraries (.dll)
        </p>
    </section>
</section>
`,W=`<section class="deck-slide">
    <h1>Summary</h1>
</section>
<section>
    <h2>Wasm inside of the browser</h2>
    <ul>
        <li>Stable support in major browsers</li>
        <li>New features are steadily coming</li>
        <li>Reuse code or gain performance - but always measure!</li>
    </ul>
</section>
<section>
    <h2>Wasm outside of the browser</h2>
    <ul>
        <li>Usage is growing</li>
        <li>Standards and runtimes are a moving target</li>
        <li>Many exciting use cases</li>
    </ul>
</section>`;function A(){const t=new h(document.querySelector(".reveal"),{history:!0,plugins:[p,g,f]});return t.initialize().then(()=>(t.getPlugin("highlight").hljs.highlightAll(),t))}const I=[y,v,k,_,S,W];function x(t){document.querySelector(".toc").innerHTML=`<div>${t}</div>`}function C(t){const s=document.querySelectorAll(".toc section"),a=document.querySelectorAll(".reveal .slides > section.deck-slide"),o=document.querySelectorAll(".reveal .slides > section");s.forEach((n,e)=>{const i=a[e];if(!a){console.error(`Could not find deck slide for chapter ${e+1}`);return}o.forEach((d,u)=>{i===d&&n.addEventListener("click",()=>{m(),t.slide(u,0,0)})})})}const j=I.join("");document.querySelector(".slides-container").innerHTML=`<div class="reveal"><div class="slides">${j}</div></div>`;x(b);const[r,l]=location.hash.split("/").slice(1);(async()=>{const t=await A();r&&(t.slide(r,l!=null?l:0),m()),C(t)})();function T(t){document.querySelector("head title").textContent=t}document.querySelector(".home").addEventListener("click",()=>{c()});window.location.href.endsWith("/")&&c();T("State of WebAssembly");
