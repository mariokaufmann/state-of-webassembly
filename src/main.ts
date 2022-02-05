import "./style.css";
import init from "../wasm-pkg";
import { dragOver, dropHandler } from "./word-cloud/drag-drop-handler";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Web assembly demo</h1>
`;
const dropZoneJs = document.querySelector<HTMLDivElement>("#dropZoneJs");
const dropZoneWasm = document.querySelector<HTMLDivElement>("#dropZoneWasm");
if (dropZoneJs && dropZoneWasm) {
  dropZoneJs.ondrop = (event) => dropHandler(event, "Js");
  dropZoneJs.ondragover = dragOver;

  dropZoneWasm.ondrop = (event) => dropHandler(event, "Wasm");
  dropZoneWasm.ondragover = dragOver;
}

init().then(() => console.log("wasm module loaded successfully."));
