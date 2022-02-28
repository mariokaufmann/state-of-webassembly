import "reveal.js/dist/reveal.css";
import "reveal.js/plugin/highlight/monokai.css";

import "./zuehlke-print.css";
import "./zuehlke-chapter.css";
import "./zuehlke-toc.css";
import "./index.css";
import { showToc } from "./toc";
import "./chapters";

function setTitle(title) {
  document.querySelector("head title").textContent = title;
}

// attach event listener to home button
document.querySelector(".home").addEventListener("click", () => {
  showToc();
});

// if url ends with / we go to the table of contents
if (window.location.href.endsWith("/")) {
  showToc();
}

setTitle("state of webassembly");
