// is used from wasm
export function log_to_screen_wasm(text: string) {
  logToScreen(text, "Wasm");
}

export function logToScreenJs(text: string) {
  logToScreen(text, "Js");
}

function logToScreen(text: string, origin: string) {
  const logContainer = document.querySelector<HTMLDivElement>(
    "#logContainer" + origin
  );
  if (logContainer) {
    const p = document.createElement("p");
    p.innerHTML = text;
    logContainer.append(p);
  }
}
