import { process_with_wasm } from "../../wasm-pkg";
import { processWithJS } from "./processing";
import { drawCloud } from "./cloud";

export async function dropHandler(ev: DragEvent, origin: "Js" | "Wasm") {
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
          let resultWords;
          const startTime = Date.now();
          if (origin === "Js") {
            resultWords = processWithJS(text, startTime);
          } else if (origin === "Wasm") {
            resultWords = process_with_wasm(text, startTime);
          }
          drawCloud(resultWords, origin);
        }
      }
    }
  }
}

export function dragOver(ev: DragEvent) {
  ev.preventDefault();
}
