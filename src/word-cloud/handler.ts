import { analyzeSampleWithJs, processWithJS } from "./processing";
import { drawCloud } from "./cloud";
import {
  analyze_sample_with_wasm,
  process_with_wasm,
} from "../../wasm-pkg/wordcloud_combined";

export async function dropHandler(ev: DragEvent) {
  console.log("file dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer) {
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === "file") {
        const file = ev.dataTransfer.items[i].getAsFile();
        if (file) {
          const text = await file.text();
          console.log(origin);
          const startTimeJs = Date.now();
          console.log("processing with JS");
          processWithJS(text, startTimeJs);
          console.log("done.");
          const startTimeWasm = Date.now();
          console.log("processing with WASM");
          process_with_wasm(text, startTimeWasm);
          console.log("done.");
        }
      }
    }
  }
}

export function drawCloudFromSample(
  minPrice: number,
  maxPrice: number,
  countries: string[]
) {
  // analyze with JS
  const resultWordsJs = analyzeSampleWithJs(
    minPrice,
    maxPrice,
    countries,
    performance.now()
  );
  drawCloud(resultWordsJs, "Js");

  // analyze with WASM
  const resultWordsWasm = analyze_sample_with_wasm(
    minPrice,
    maxPrice,
    countries,
    performance.now()
  );
  drawCloud(resultWordsWasm, "Wasm");
}

export function dragOver(ev: DragEvent) {
  ev.preventDefault();
}
