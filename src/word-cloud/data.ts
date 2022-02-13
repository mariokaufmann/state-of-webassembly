export const countryDatasets: { [key in string]: string[] } = {
  Asia: ["Armenia", "China", "India", "Israel", "Lebanon", "Turkey"],
  Africa: ["Egypt", "Morocco", "South Africa"],
  Europe: [
    "Austria",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "England",
    "France",
    "Germany",
    "Georgia",
    "Greece",
    "Hungary",
    "Italy",
    "Luxembourg",
    "Macedonia",
    "Moldova",
    "Portugal",
    "Romania",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Switzerland",
    "Ukraine",
  ],
  NorthAmerica: ["Canada", "US"],
  SouthAmerica: ["Argentina", "Brazil", "Chile", "Mexico", "Peru", "Uruguay"],
  Oceania: ["Australia", "New Zealand"],
  Switzerland: ["Switzerland"],
};

/**
 * A list of words that we filter since they are not very interesting for demo purposes
 * (even though they are relevant in the TF-IDF sense).
 */
export const denyList = ["walla", "half"];
