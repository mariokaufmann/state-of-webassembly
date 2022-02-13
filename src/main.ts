import "./style.css";
import init from "../wasm-pkg";
import { countryDatasets } from "./word-cloud/data";
import {
  dragOver,
  drawCloudFromSample,
  dropHandler,
} from "./word-cloud/handler";

function query<E extends Element>(id: string): E {
  const element = document.querySelector<E>(`#${id}`);
  if (!element) {
    throw new Error("Could not find expected element: " + id);
  }
  return element;
}

// query elements
const dropZone = query<HTMLDivElement>("dropZone");
const minimumPriceInput = query<HTMLInputElement>("minimumPriceRangeInput");
const minimumPriceDisplay = query<HTMLParagraphElement>("minimumPrice");
const maximumPriceInput = query<HTMLInputElement>("maximumPriceRangeInput");
const maximumPriceDisplay = query<HTMLParagraphElement>("maximumPrice");
const countriesContainer = query<HTMLDivElement>("countriesContainer");

let selectedDatasetKey: string | undefined;

function onFilterModified() {
  const minPrice = Number(minimumPriceInput.value);
  const maxPrice = Number(maximumPriceInput.value);

  if (!selectedDatasetKey) {
    return;
  }
  const countries = countryDatasets[selectedDatasetKey];

  drawCloudFromSample(minPrice, maxPrice, countries);
}

Object.keys(countryDatasets).forEach((key) => {
  const button = document.createElement("button");
  button.textContent = key;
  countriesContainer.append(button);
  button.onclick = () => {
    selectedDatasetKey = key;
    onFilterModified();
  };
});

dropZone.ondrop = (event) => dropHandler(event);
dropZone.ondragover = dragOver;

minimumPriceInput.onchange = (evt) => {
  const target = evt.target as HTMLInputElement;
  if (target) {
    minimumPriceDisplay.innerHTML = target.value;
  }
  onFilterModified();
};
maximumPriceInput.onchange = (evt) => {
  const target = evt.target as HTMLInputElement;
  if (target) {
    maximumPriceDisplay.innerHTML = target.value;
  }
  onFilterModified();
};

// load WASM module
init().then(() => console.log("wasm module loaded successfully."));
