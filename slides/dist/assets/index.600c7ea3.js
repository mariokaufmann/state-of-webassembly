import{$ as h,R as p,a as g,b as f}from"./vendor.89915203.js";const w=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerpolicy&&(e.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?e.credentials="include":n.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(n){if(n.ep)return;n.ep=!0;const e=i(n);fetch(n.href,e)}};w();function c(){document.querySelector(".toc").classList.remove("toc-hidden")}function d(){document.querySelector(".toc").classList.add("toc-hidden")}var b=`<header>\r
    <h1>State of WebAssembly</h1>\r
    <h2>\r
        <span class="nowrap">Patrick Walther & Mario Kaufmann</span>\r
    </h2>\r
</header>\r
<section>\r
        <h2>01 WebAssembly Basics</h2>\r
        <ul>\r
            <li>What is WebAssembly?</li>\r
            <li>Format & Data types</li>\r
            <li>Minimal module (.wat)</li>\r
        </ul>\r
</section>\r
<section>\r
        <h2>02 Expand browser capabilities</h2>\r
        <ul>\r
            <li>use cases</li>\r
            <li>demo</li>\r
            <li>general workflow</li>\r
        </ul>\r
</section>\r
<section>\r
        <h2>03 Improve performance with wasm</h2>\r
        <ul>\r
            <li>word cloud example</li>\r
            <li>considerations</li>\r
        </ul>\r
</section>\r
<section>\r
        <h2>04 wasm features</h2>\r
        <ul>\r
            <li>wasm MVP</li>\r
            <li>wasm-feature-detect</li>\r
        </ul>\r
</section>\r
<section>\r
    <h2>05 WASI</h2>\r
    <ul>\r
        <li>interface with system</li>\r
        <li>proposals</li>\r
        <li>use cases</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>06 summary</h2>\r
    <ul>\r
      <li>WASM inside of the browser</li>\r
      <li>WASM outside of the browser</li>\r
    </ul>\r
</section>`,y=`<section class="deck-slide">\r
    <h1>WebAssembly Basics</h1>\r
</section>\r
\r
<section>\r
    <img alt="WebAssembly logo" src="/assets/img/Web_Assembly_Logo.svg" width="10%" />\r
    <h2>WebAssembly = wasm</h2>\r
</section>\r
\r
<section>\r
    <section>\r
        <h2>Browser Support?</h2>\r
        <img alt="wasm browser support" src="/assets/img/wasm-support.png" />\r
    </section>\r
    <section>\r
        <h2>Node.js</h2>\r
        <p>\r
            Support since v8.0 (2017)\r
        </p>\r
    </section>\r
</section>\r
\r
<section>\r
    <section>\r
        <h2>What is wasm?</h2>\r
        <p>WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.</p>\r
    </section>\r
    <section>\r
        <h2>But what does that actually mean?</h2>\r
        <ul>\r
            <li class="fragment">Compile anything to the web</li>\r
            <li class="fragment">Create npm packages out of any third party library</li>\r
            <li class="fragment">Pick the right tool for the task (e.g. math)</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>What languages can be compiled to wasm?</h2>\r
        <ul>\r
            <li class="fragment">\r
                <a href="https://github.com/appcypher/awesome-wasm-langs" target="_blank">\r
                    List of wasm languages\r
                </a>\r
            </li>\r
            <li class="fragment">Support is growing!</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>Track proposals</h2>\r
        <p>\r
            <a href="https://github.com/WebAssembly/proposals" target="_blank">Github Repository</a>\r
        </p>\r
    </section>\r
</section>\r
\r
<section>\r
    <section>\r
        <h2>Interface</h2>\r
    </section>\r
    <section>\r
        <h2>Memory</h2>\r
        <ul>\r
            <li>Only flat linear memory support</li>\r
            <li class="fragment">No Garbage Collection except custom written</li>\r
            <li class="fragment">Work in progress (Phase 2)</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>Types</h2>\r
        <img alt="wasm interface types" src="/assets/img/wasm-types.png">\r
    </section>\r
    <section>\r
        <h2>How do we exchange other types?</h2>\r
        <ul>\r
            <li class="fragment">\r
                Other types we have to pass the reference and read it directly from memory\r
            </li>\r
            <li class="fragment">\r
                Compilers add "glue code"\r
            </li>\r
            <li class="fragment">We'll see that later</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>DOM</h2>\r
        <ul>\r
            <li>No DOM access from within wasm</li>\r
            <li class="fragment">DOM API proposed for future version</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>GPU</h2>\r
        <ul>\r
            <li>No GPU access</li>\r
            <li>Not planned right now</li>\r
            <li>Follow the W3C <a href="https://github.com/gpuweb/gpuweb" target="_blank">gpuweb proposal</a></li>\r
        </ul>\r
    </section>\r
</section>\r
\r
\r
<section>\r
    <h2>Minimal Example</h2>\r
    <p>\r
        <a href="https://localhost:28443" target="_blank">WebAssembly Studio</a>\r
    </p>\r
</section>\r
\r
<section>\r
    <section>\r
        <h2>Compilation example</h2>\r
    </section>\r
    <section>\r
        <h2>C</h2>\r
        <pre>\r
            <code class="hljs c" data-trim contenteditable data-noescape>\r
                int factorial(int n) {\r
                  if (n == 0)\r
                    return 1;\r
                  else\r
                    return n * factorial(n - 1);\r
                }\r
            </code>\r
            </pre>\r
    </section>\r
    <section>\r
        <h2>Intermediate format</h2>\r
        <pre>\r
            <code class="hljs" data-trim contenteditable data-noescape>\r
                get_local 0\r
                i64.eqz\r
                if (result i64)\r
                    i64.const 1\r
                else\r
                    get_local 0\r
                    get_local 0\r
                    i64.const 1\r
                    i64.sub\r
                    call 0\r
                    i64.mul\r
                end\r
            </code>\r
            </pre>\r
    </section>\r
    <section>\r
        <h2>wasm binary format</h2>\r
        <pre>\r
            <code class="hljs" data-trim contenteditable data-noescape>\r
                20 00\r
                50\r
                04 7E\r
                42 01\r
                05\r
                20 00\r
                20 00\r
                42 01\r
                7D\r
                10 00\r
                7E\r
                0B\r
            </code>\r
            </pre>\r
    </section>\r
    <section>\r
        <h2>Text representation (s-expr)</h2>\r
        <pre>\r
            <code class="hljs scheme" data-trim contenteditable data-noescape>\r
                (module\r
                  (import "math" "exp" (func $exp (param f64) (result f64)))\r
                  (func (export "doubleExp") (param $0 f64) (result f64)\r
                    (f64.mul\r
                      (call $exp\r
                        (get_local $0)\r
                      )\r
                      (f64.const 2)\r
                    )\r
                  )\r
                )\r
            </code>\r
            </pre>\r
    </section>\r
</section>\r
\r
<section>\r
    <section>\r
        <h2>What is coming?</h2>\r
    </section>\r
    <section>\r
        <h2>Garbage Collection</h2>\r
        <ul>\r
            <li>Currently not supported</li>\r
            <li>Languages with GC compile it themselves</li>\r
            <li>Bad for binary size and efficiency</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>Host bindings</h2>\r
        <ul>\r
            <li>Currently we have a very limited interface</li>\r
            <li>Add sharing of JS/DOM objects</li>\r
            <li>Create, call, manipulate and pass objects</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>Exception Handling</h2>\r
        <ul>\r
            <li>Support is in progress!</li>\r
            <li>Fairly challenging proposal</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>Reference Types</h2>\r
        <ul>\r
            <li>Currently minimal set of types</li>\r
            <li>Serialize more complex types to memory</li>\r
            <li>New "anyref" type that allows references to JS objects</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>WASI</h2>\r
        <ul>\r
            <li>WebAssembly System Interface</li>\r
            <li>Outside of the Browser</li>\r
            <li>Includes I/O</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>And so much more...</h2>\r
    </section>\r
</section>\r
\r
<section>\r
    <h2>Resources</h2>\r
    <ul>\r
        <li>\r
            <a href="https://github.com/webassembly" target="_blank">\r
                WebAssembly on Github\r
            </a>\r
        </li>\r
        <li>\r
            <a href="https://github.com/WebAssembly/proposals" target="_blank">\r
                WebAssembly Proposals\r
            </a>\r
        </li>\r
        <li>\r
            <a href="https://github.com/wasdk/WebAssemblyStudio" target="_blank">\r
                WebAssembly Studio\r
            </a>\r
        </li>\r
        <li>\r
            <a href="https://github.com/appcypher/awesome-wasm-langs" target="_blank">\r
                List of wasm languages\r
            </a>\r
        </li>\r
    </ul>\r
</section>\r
`,v=`<section class="deck-slide">\r
    <h1>Expand browser capabilities</h1>\r
</section>\r
<section>\r
    <section>\r
        <h2>Use Cases</h2>\r
    </section>\r
    <section>\r
        <h2>"Typical" Desktop Applications</h2>\r
        <ul>\r
            <li>Image/Video Editing</li>\r
            <li>CAD</li>\r
            <li>Our customers fat clients...</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>"Real time" Applications</h2>\r
        <ul>\r
            <li>Image recognition</li>\r
            <li>Voice recognition</li>\r
            <li>VR/AR</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>CPU intensive things</h2>\r
        <ul>\r
            <li>Streaming</li>\r
            <li>Compression/Decompression</li>\r
            <li>Platform Simulation</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>Gaming</h2>\r
        <ul>\r
            <li>"Casual" games</li>\r
            <li>Currently no GPU heavy gaming</li>\r
        </ul>\r
    </section>\r
</section>\r
<section>\r
    <section>\r
        <h2>Demos</h2>\r
    </section>\r
    <section>\r
        <h2>Google Earth</h2>\r
        <p>\r
            <a href="http://earth.google.com/" target="_blank">Link</a>\r
        </p>\r
    </section>\r
    <section>\r
        <h2>Squoosh</h2>\r
        <p>\r
            <a href="https://squoosh.app/" target="_blank">Link</a>\r
        </p>\r
        <aside class="notes">\r
            As soon as you import a picture wasm modules get loaded\r
        </aside>\r
    </section>\r
    <section>\r
        <h2>Figma</h2>\r
        <p>\r
            <a href="https://www.figma.com" target="_blank">Link</a>\r
        </p>\r
        <aside class="notes">\r
            We could show a default account here\r
        </aside>\r
    </section>\r
    <section>\r
        <h2>Stackblitz</h2>\r
        <p>\r
            <a href="https://stackblitz.com/" target="_blank">Link</a>\r
        </p>\r
        <aside class="notes">\r
            Show in Google Chrome. Mention WebContainers here.\r
        </aside>\r
    </section>\r
    <section>\r
        <h2>ffmpeg.js</h2>\r
        <p>\r
            <a href="https://ffmpegwasm.netlify.app/#demo" target="_blank"></a>\r
        </p>\r
        <aside class="notes">\r
            Show how a video can be uploaded and converted in-browser.\r
        </aside>\r
    </section>\r
</section>\r
`,k=`<section class="deck-slide">\r
    <h1>Improve performance with wasm</h1>\r
</section>\r
<section>\r
    <p>WebAssembly aims to execute at near-native speed</p>\r
    <p>How can we make use of that?</p>\r
</section>\r
<section>\r
    <h2>No silver bullet</h2>\r
    <ul>\r
        <li>JS engines are heavily optimized</li>\r
        <li>WebAssembly will only be faster for certain workloads</li>\r
        <li>Always measure!</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>Showcase app</h2>\r
    <p>Take set of 150k wine reviews from Twitter and generate a word cloud from a subset of the reviews with\r
        the most relevant words</p>\r
    <img alt="word cloud wine reviews (wines from South America)" src="/assets/img/word-cloud/wordcloud_south_america.png" width="50%"/>\r
</section>\r
<section>\r
    <h2>Why do it in the browser?</h2>\r
    <ul>\r
        <li>No server-side processing power needed</li>\r
        <li>Potentially sensitive data sets need not be uploaded to the server</li>\r
    </ul>\r
</section>\r
<section>\r
    <h3>Dataset</h3>\r
    <h4>Review for Quinta dos Avidagos 2011 Avidagos Red</h4>\r
    <ul>\r
        <li>Points: 87</li>\r
        <li>Description: This is ripe and fruity, a wine that is smooth while still structured. Firm tannins are filled out with juicy red berry fruits and freshened with acidity. It's  already drinkable, although it will certainly be better from 2016.</li>\r
        <li>Variety: Portuguese Red</li>\r
        <li>Province: Douro</li>\r
        <li>Country: Portugal</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>What are the most relevant words?</h2>\r
    <p>We don't want the most frequent but the most relevant words</p>\r
    <p>For our example we use TF-IDF</p>\r
</section>\r
<section>\r
    <h2>TF-IDF</h2>\r
    <h3>Term frequency - inverse document frequency</h3>\r
    <ul>\r
        <li>Corpus: set of all reviews</li>\r
        <li>Document: (in our case) a subset of all reviews</li>\r
    </ul>\r
    <ul>\r
        <li>Term frequency: measure for how often a word appears in a document</li>\r
        <li>Inverse document frequency: measure for how rare a word is within the corpus</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>TF-IDF</h2>\r
    <p>TF-IDF value for a word = TF * IDF</p>\r
    <small>Frequency of the word offset by how rare it is</small>\r
    <p>In our case a good measure to filter out common words like 'is', 'the', 'wine', etc.</p>\r
</section>\r
<section>\r
    <a href="http://localhost:3000/demo/wordcloud/?js=true" target="_blank">\r
        <h2>Demo</h2>\r
    </a>\r
</section>\r
<section>\r
    <h2>Time needed for generating word cloud</h2>\r
    <ul>\r
        <li>Safari: 4.0-4.5s</li>\r
        <li>Firefox: 3.5-4.0s</li>\r
        <li>Chrome: 2.5-3.0s</li>\r
    </ul>\r
    <small>Specific example, not representative of general browser performance differences</small>\r
</section>\r
<section>\r
    <p>Let's try to speed it up!</p>\r
</section>\r
<section>\r
    <h2>Goal</h2>\r
    <p>Create a WebAssembly module that can generate exactly the same word cloud</p>\r
</section>\r
<section>\r
    <h2>Approach</h2>\r
    <p>Use</p>\r
    <ul>\r
        <li>Rust as implementation language</li>\r
        <li>wasm-bindgen for generating glue code between JS and wasm</li>\r
        <li>web-sys and js-sys crates for bindings into JS</li>\r
        <li>wasm-pack for bundling up module and glue code</li>\r
    </ul>\r
</section>\r
<section>\r
    <p>Processing function</p>\r
    <pre>\r
        <code class="hljs rust" data-trim contenteditable data-noescape>\r
            #[wasm_bindgen]\r
            pub fn process_with_wasm(text: &str) {\r
                processing::process(text)\r
            }\r
        </code>\r
    </pre>\r
    <ul>\r
        <li>#[wasm_bindgen] annotation for glue code generation</li>\r
        <li>Data (&str) is automatically encoded/decoded by wasm-bindgen</li>\r
    </ul>\r
    <small></small>\r
</section>\r
<section>\r
    <p>Word cloud function</p>\r
    <small>Returns the most relevant words with an importance score</small>\r
    <pre>\r
        <code class="hljs rust" data-trim contenteditable data-noescape>\r
            #[wasm_bindgen]\r
            pub fn analyze_sample_with_wasm(min_price: u16,\r
                max_price: u16,\r
                countries: JsValue\r
            ) -> JsValue {\r
                let countries: Vec&lt;String&gt; = countries.into_serde()\r
                .unwrap();\r
                JsValue::from_serde(&processing::analyze_sample(\r
                    min_price, max_price, &countries,\r
                ))\r
                .unwrap()\r
            }\r
        </code>\r
    </pre>\r
</section>\r
<section>\r
    <pre>\r
        <code class="hljs rust" data-trim contenteditable data-noescape>\r
            #[wasm_bindgen]\r
            pub fn analyze_sample_with_wasm(min_price: u16,\r
                max_price: u16,\r
                countries: JsValue\r
            ) -> JsValue { ... }\r
        </code>\r
    </pre>\r
    <p>Non-primitive values (objects/structs, lists of objects) can be passed as JSValue through JSON marshalling</p>\r
</section>\r
<section>\r
    <h2>Implementation process</h2>\r
    <ul>\r
        <li>Implement processing logic in Rust</li>\r
        <li>Make sure that Rust and JS return the same words for the same dataset</li>\r
        <li>Profile Rust implementation and find performance bottlenecks</li>\r
    </ul>\r
    <small>More on profiling wasm code later</small>\r
</section>\r
<section>\r
    <a href="http://localhost:3000/demo/wordcloud/" target="_blank">\r
        <h2>Demo</h2>\r
    </a>\r
</section>\r
<section>\r
    <h2>Time needed for generating word cloud (wasm)</h2>\r
    <ul>\r
        <li>Safari: 1.5-2.0s</li>\r
        <li>Firefox: 1.5-2.0s</li>\r
        <li>Chrome: 8.0-8.5s (!)</li>\r
    </ul>\r
    <p>What is happening in Chrome?</p>\r
</section>\r
<section>\r
    <section>\r
        <p>How to profile our code?</p>\r
    </section>\r
    <section>\r
        <p>Use dev tools (performance tab)</p>\r
        <img src="/assets/img/word-cloud/profiling1.png" />\r
    </section>\r
    <section>\r
        <p>Use dev tools (performance tab)</p>\r
        <img src="/assets/img/word-cloud/profiling1.png" />\r
        <p class="tip">\r
            wasm runs slower when dev tools are open - except when profiling in performance tab!\r
        </p>\r
    </section>\r
    <section>\r
        <p>Find relevant function call</p>\r
        <img src="/assets/img/word-cloud/profiling2.png" />\r
    </section>\r
    <section>\r
        <p>Not very readable unfortunately</p>\r
        <img src="/assets/img/word-cloud/profiling3.png" />\r
    </section>\r
    <section>\r
        <p>Include debug symbols and disable optimizations in the wasm build</p>\r
        <pre>\r
        <code class="hljs toml" data-trim contenteditable data-noescape>\r
            [profile.release]\r
            opt-level = 3\r
            lto = true\r
            debug = true\r
            [package.metadata.wasm-pack.profile.release]\r
            wasm-opt = false\r
            [package.metadata.wasm-pack.profile.release.wasm-bindgen]\r
            debug-js-glue = true\r
            demangle-name-section = true\r
            dwarf-debug-info = true\r
        </code>\r
    </pre>\r
        <small>These options are input language (and toolchain) specific</small>\r
    </section>\r
    <section>\r
        <p>Include debug symbols and disable optimizations in the wasm build</p>\r
        <pre>\r
        <code class="hljs toml" data-trim contenteditable data-noescape>\r
            [profile.release]\r
            opt-level = 3\r
            lto = true\r
            debug = true\r
            [package.metadata.wasm-pack.profile.release]\r
            wasm-opt = false\r
            [package.metadata.wasm-pack.profile.release.wasm-bindgen]\r
            debug-js-glue = true\r
            demangle-name-section = true\r
            dwarf-debug-info = true\r
        </code>\r
    </pre>\r
        <p class="tip">A build like this will both be larger and slower typically</p>\r
    </section>\r
</section>\r
<section>\r
    <p>Now we have a readable profiling session!</p>\r
    <img src="/assets/img/word-cloud/profiling_alloc.png" />\r
</section>\r
<section>\r
    <p>Zooming in, memory allocations seem to dominate</p>\r
    <img src="/assets/img/word-cloud/profiling_alloc.png" />\r
</section>\r
<section>\r
    <p>working in low level languages makes it possible to control when memory is allocated to some extent</p>\r
    <pre>\r
        <code class="hljs rust" data-trim contenteditable data-noescape>\r
            let corpus_word_map = HashMap::with_capacity(100_000);\r
        </code>\r
    </pre>\r
    <small>Making sure that the hash map does not need to grow when inserting the elements</small>\r
</section>\r
<section>\r
    <ul>\r
        <li>Result: a bit faster in Chrome, but not substantially</li>\r
        <li>Not possible to easily optimize all allocations (we don't know the dataset in advance)</li>\r
    </ul>\r
</section>\r
<section>\r
    <p>Let's use another tool - chrome://tracing</p>\r
    <img src="/assets/img/word-cloud/tracing.png"  alt="Chrome tracing tools"/>\r
</section>\r
<section>\r
    <h2>Chrome tracing tools</h2>\r
    <ul>\r
        <li>Trace low-level Chrome events</li>\r
        <li>among many other things, v8.wasm events</li>\r
    </ul>\r
</section>\r
<section>\r
    <img src="/assets/img/word-cloud/tracing_results.png" />\r
    <p>Large number of wasm.GrowMemory operations</p>\r
</section>\r
<section>\r
    <h2>WebAssembly memory</h2>\r
    <ul>\r
        <li>wasm memory is a linear buffer</li>\r
        <li>Every time it is grown the memory potentially needs to be relocated</li>\r
    </ul>\r
</section>\r
<section>\r
    <p>let's try to minimize the number of grow operations</p>\r
    <pre>\r
        <code class="hljs rust" data-trim contenteditable data-noescape>\r
            pub fn process(text: &str, start_time: f64) {\r
                let buffer: Vec&lt;u8&gt; = Vec::with_capacity(200_000_000);\r
                drop(buffer);\r
                ...\r
            }\r
        </code>\r
    </pre>\r
    <small>In a real application this number wouldn't be constant</small>\r
</section>\r
<section>\r
    <p>Success!</p>\r
    <img src="/assets/img/word-cloud/chrome_preallocation.png" />\r
</section>\r
<section>\r
    <h2>Time needed for generating word cloud (wasm + preallocation)</h2>\r
    <ul>\r
        <li>Safari: 1.5-2.0s</li>\r
        <li>Firefox: 1.5-2.0s</li>\r
        <li>Chrome: 1.5-2.0s</li>\r
    </ul>\r
    <small>Safari and Firefox roughly the same, Chrome now also in the same area.</small>\r
</section>\r
<section>\r
    <h2>Side note: debugging</h2>\r
    <ul>\r
        <li>Debugging not very mature yet</li>\r
        <li>With wasm-bindgen, direct debugging is not yet supported</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>Summary</h2>\r
    <ul>\r
        <li>For certain workloads, one can improve performance with wasm</li>\r
        <li>Minimize allocations and growing memory, minimize calls across marshalling boundary</li>\r
        <li>always measure!</li>\r
    </ul>\r
</section>\r
\r
<section>\r
    <h2>Resources</h2>\r
    <ul>\r
        <li>\r
            <a href="https://www.kaggle.com/zynicide/wine-reviews" target="_blank">\r
                Demo dataset\r
            </a>\r
        </li>\r
        <li>\r
            <a href="https://jmotif.github.io/sax-vsm_site/morea/algorithm/TFIDF.html" target="_blank">\r
                TF-IDF\r
            </a>\r
        </li>\r
        <li>\r
            <a href="https://github.com/rustwasm/wasm-bindgen" target="_blank">\r
                wasm-bindgen\r
            </a>\r
        </li>\r
        <li>\r
            <a href="https://github.com/rustwasm/wasm-pack" target="_blank">\r
                wasm-pack\r
            </a>\r
        </li>\r
        <li>\r
            <a href="https://github.com/rustwasm/wasm-bindgen/issues/2389" target="_blank">\r
                wasm-bindgen and debugging\r
            </a>\r
        </li>\r
    </ul>\r
</section>\r
`,_=`<section class="deck-slide">\r
  <h1>wasm features</h1>\r
</section>\r
<section>\r
  <h2>WebAssembly MVP</h2>\r
  <ul>\r
    <li>In 2017 an MVP of WebAssembly was implemented by browser vendors</li>\r
    <li>Since then new features are added through a standardization process</li>\r
  </ul>\r
</section>\r
<section>\r
  <section>\r
    <h2>Standardized features</h2>\r
    <img alt="Wasm standardized features" src="/assets/img/wasm_features_standardized.png" />\r
  </section>\r
  <section>\r
    <h2>SIMD</h2>\r
    <p>SIMD stands for Single Instruction, Multiple Data. SIMD instructions are a special class of instructions that\r
      exploit data parallelism in applications by simultaneously performing the same operation on multiple data\r
      elements</p>\r
    <a href="https://v8.dev/features/simd" target="_blank">https://v8.dev/features/simd</a>\r
  </section>\r
  <section>\r
    <h2>Reference types</h2>\r
    <p>Get JS values by reference</p>\r
    <pre>\r
        <code class="hljs rust" data-trim contenteditable data-noescape>\r
            #[wasm_bindgen]\r
            pub fn takes_js_value(a: &JsValue) {\r
              // ...\r
            }\r
        </code>\r
    </pre>\r
  </section>\r
  <section>\r
    <h2>Reference types</h2>\r
    <p>Glue code without proposal</p>\r
    <pre>\r
        <code class="hljs js" data-trim contenteditable data-noescape>\r
            const heap = new Array(32).fill(undefined);\r
            heap.push(undefined, null, true, false);\r
            let stack_pointer = 32;\r
            function addBorrowedObject(obj) {\r
                if (stack_pointer == 1)\r
                    throw new Error('out of js stack');\r
                heap[--stack_pointer] = obj;\r
                return stack_pointer;\r
            }\r
            export function takes_js_value(a) {\r
                try {\r
                    wasm.takes_js_value(addBorrowedObject(a));\r
                } finally {\r
                    heap[stack_pointer++] = undefined;\r
                }\r
            }\r
        </code>\r
    </pre>\r
  </section>\r
  <section>\r
    <h2>Reference types</h2>\r
    <p>Glue code with proposal</p>\r
    <pre>\r
        <code class="hljs js" data-trim contenteditable data-noescape>\r
            export function takes_js_value(a) {\r
                wasm.takes_js_value(a);\r
            }\r
        </code>\r
    </pre>\r
    <a href="https://rustwasm.github.io/wasm-bindgen/reference/reference-types.html" target="_blank">\r
      https://rustwasm.github.io/wasm-bindgen/reference/reference-types.html</a>\r
  </section>\r
</section>\r
<section>\r
  <h2>In-progress features</h2>\r
  <img alt="Wasm standardized features" src="/assets/img/wasm_features_in-progress.png" />\r
</section>\r
<section>\r
  <h2>Detect WebAssembly features</h2>\r
  <ul>\r
    <li>With the <a href="https://wasm-feature-detect.surma.technology/">wasm-feature-detect</a> library it is possible to\r
      detect which features a browser supports</li>\r
    <li>Different wasm binaries have to be loaded for each feature combination</li>\r
  </ul>\r
</section>\r
`,S=`<section class="deck-slide">\r
    <h1>WASI</h1>\r
</section>\r
<section>\r
    <h2>Wasm outside of browser</h2>\r
    <p>Introduction: "Wasm is designed as a portable compilation target"</p>\r
    <p>This means that WebAssembly can be run outside of the browser</p>\r
</section>\r
<section>\r
    <h2>Generalized runtime</h2>\r
    <ul>\r
        <li>Generalized runtime for many input languages</li>\r
        <li>In idea similar to Java ("write once run anywhere")</li>\r
        <li>but: native support for many input languages and capability-based security</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>Wasm runtimes</h2>\r
    <ul>\r
        <li><a href="https://wasmtime.dev">wasmtime</a></li>\r
        <li><a href="https://wasmer.io">wasmer</a></li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>Wasm security</h2>\r
    <ul>\r
        <li>Wasm has a strict security model</li>\r
        <li>Wasm modules run in a sandboxed environment isolated from the host</li>\r
    </ul>\r
    <a href="https://webassembly.org/docs/security/">More details about Wasm security</a>\r
    <p></p>\r
</section>\r
<section>\r
    <p>What does this mean for execution outside of the browser?</p>\r
    <p>by default no access to:</p>\r
    <ul>\r
        <li>file system</li>\r
        <li>network</li>\r
        <li>system calls</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>WASI</h2>\r
    <q>WASI is a modular system interface for WebAssembly</q>\r
</section>\r
<section>\r
    <pre>\r
        <code class="hljs rust" data-trim contenteditable data-noescape>\r
            #[wasm_bindgen]\r
            fn main() {\r
                let text = std::fs::read_to_string("input.txt")\r
                    .expect("Could not read file");\r
                println!("{}", text);\r
            }\r
        </code>\r
    </pre>\r
</section>\r
<section>\r
    <pre>\r
        <code class="hljs bash" data-trim contenteditable data-noescape>\r
            \u276F wasmtime wasi-security.wasm\r
            thread 'main' panicked at\r
                'Could not read file: Custom { kind: Uncategorized,\r
                 error: "failed to find a pre-opened file descriptor\r
                 through which \\"input.txt\\" could be opened" }',\r
                 src\\main.rs:3:10\r
            note: run with \`RUST_BACKTRACE=1\` environment variable\r
            to display a backtrace\r
            Error: failed to run main module\r
                \`target/wasm32-wasi/debug/wasi-security.wasm\`\r
        </code>\r
    </pre>\r
</section>\r
<section>\r
    <ul>\r
        <li>WASI follows a capability-based security approach</li>\r
        <li>Possible to finely tune what a module has access to</li>\r
    </ul>\r
</section>\r
<section>\r
    <p>Give the module access to the working directory (--dir .)</p>\r
    <pre>\r
        <code class="hljs bash" data-trim contenteditable data-noescape>\r
            \u276F wasmtime wasi-security.wasm --dir .\r
            Hello from the text file!\r
        </code>\r
    </pre>\r
</section>\r
<section>\r
    <h2>WASI proposals</h2>\r
    <ul>\r
        <li>WASI APIs are developed as proposals</li>\r
        <li>Currently no proposal has reached stage 5 (standardized) yet</li>\r
        <li>Runtimes implement some APIs anyway already</li>\r
    </ul>\r
</section>\r
<section>\r
    <section>\r
        <h2>WASI use cases</h2>\r
        <p>What are examples of Wasm outside of the browser (with WASI)?</p>\r
    </section>\r
    <section>\r
        <h2>fastly Compute@Edge</h2>\r
        <img src="/assets/img/fastly.png" class="badge-container" width="10%"/>\r
        <ul>\r
            <li>Run a WASI workload on fastly's Compute@Edge platform</li>\r
            <li>example: use the same word cloud code and deploy it serverless to the cloud</li>\r
        </ul>\r
        <aside class="notes">\r
            If there is enough time we can show the sample heere\r
        </aside>\r
    </section>\r
    <section>\r
        <h2>Krustlet - kubelet</h2>\r
        <img src="/assets/img/krustlet.svg" class="badge-container" width="20%"/>\r
        <ul>\r
            <li>Enables a Kubernetes node to run WASI workloads</li>\r
            <li>The cluster can then run Wasm modules in addition to containers</li>\r
        </ul>\r
    </section>\r
    <section>\r
        <h2>Krustlet - kubelet</h2>\r
        <img src="/assets/img/krustlet.svg" class="badge-container" width="20%"/>\r
        <img src="/assets/img/docker_wasm_quote.png" />\r
    </section>\r
    <section>\r
        <h2>Plugin for Flight Simulator</h2>\r
        <img src="/assets/img/msfs_logo.png" width="20%"/>\r
        <p>\r
            The 2020-released new Flight Simulator by Microsoft uses a Wasm-based plugin mechanism instead of loading\r
            dynamic shared libraries (.dll)\r
        </p>\r
    </section>\r
</section>`,W=`<section class="deck-slide">\r
    <h1>Summary</h1>\r
</section>\r
<section>\r
    <h2>Wasm inside of the browser</h2>\r
    <ul>\r
        <li>Stable support in major browsers</li>\r
        <li>New features are steadily coming</li>\r
        <li>Reuse code or gain performance - but always measure!</li>\r
    </ul>\r
</section>\r
<section>\r
    <h2>Wasm outside of the browser</h2>\r
    <ul>\r
        <li>Usage is growing</li>\r
        <li>Standards and runtimes are a moving target</li>\r
        <li>Many exciting use cases</li>\r
    </ul>\r
</section>`;function A(){const r=new h(document.querySelector(".reveal"),{history:!0,plugins:[p,g,f]});return r.initialize().then(()=>(r.getPlugin("highlight").hljs.highlightAll(),r))}const I=[y,v,k,_,S,W];function x(r){document.querySelector(".toc").innerHTML=`<div>${r}</div>`}function C(r){const t=document.querySelectorAll(".toc section"),i=document.querySelectorAll(".reveal .slides > section.deck-slide"),a=document.querySelectorAll(".reveal .slides > section");t.forEach((n,e)=>{const s=i[e];if(!i){console.error(`Could not find deck slide for chapter ${e+1}`);return}a.forEach((u,m)=>{s===u&&n.addEventListener("click",()=>{d(),r.slide(m,0,0)})})})}const j=I.join("");document.querySelector(".slides-container").innerHTML=`<div class="reveal"><div class="slides">${j}</div></div>`;x(b);const[l,o]=location.hash.split("/").slice(1);(async()=>{const r=await A();l&&(r.slide(l,o!=null?o:0),d()),C(r)})();function T(r){document.querySelector("head title").textContent=r}document.querySelector(".home").addEventListener("click",()=>{c()});window.location.href.endsWith("/")&&c();T("State of WebAssembly");
