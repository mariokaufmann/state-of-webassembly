/**
 * documentation on algorithm: http://tfidf.com/
 * in our case:
 * - corpus(=all documents): all descriptions of all rows
 * - document: a subset of all rows and their descriptions
 *
 * We use a logarithmically scaled term frequency to account for the fact that our
 * documents (i.e. the concatenated descriptions of our sample reviews) are rather large.
 * https://jmotif.github.io/sax-vsm_site/morea/algorithm/TFIDF.html
 * cited here: https://en.wikipedia.org/wiki/Tf%E2%80%93id
 */
import { WordWithImportance } from "./bindings";
import { clearScreenLogJs, logToScreenJs } from "../bindings";
import { denyList } from "./data";

interface RawRow {
  description: string;
  country: string;
  price: number;
}

interface Row {
  words: string[];
  country: string;
  price: number;
}

interface CorpusWordStatistics {
  totalCount: number;
  documentsAppearances?: Set<number>;
  inverseDocumentFrequency?: number;
}

interface CorpusWordMap {
  [key: string]: CorpusWordStatistics;
}

interface DocumentWordStatistics {
  totalCount: number;
  tfIdf?: number;
}

interface DocumentWordMap {
  [key: string]: DocumentWordStatistics;
}

interface LoadedData {
  corpusWordMap: CorpusWordMap;
  rows: Row[];
}

let loadedData: LoadedData | null = null;

function buildUpRowCorpusStatistics(
  wordMap: CorpusWordMap,
  documentIndex: number,
  row: Row
) {
  row.words.forEach((word) => {
    const entry = wordMap[word];
    if (entry) {
      entry.totalCount = entry.totalCount + 1;
      entry.documentsAppearances?.add(documentIndex);
    } else {
      wordMap[word] = {
        totalCount: 1,
        documentsAppearances: new Set([documentIndex]),
      };
    }
  });
}

function calculateInverseDocumentFrequencies(
  totalNumberOfDocuments: number,
  wordMap: CorpusWordMap
) {
  for (const value of Object.values(wordMap)) {
    if (value.documentsAppearances) {
      value.inverseDocumentFrequency = Math.log(
        totalNumberOfDocuments / value.documentsAppearances.size
      );
      // we don't need the set anymore
      value.documentsAppearances = undefined;
    }
  }
}

function wordShouldBeUsed(word: string | undefined): boolean {
  if (word) {
    return word.length > 1 && !denyList.includes(word);
  }
  return false;
}

function processRawRow(rawRow: RawRow): Row {
  const wordRegex = /\p{L}+/u;
  rawRow.description = rawRow.description.toLowerCase();
  const words = rawRow.description
    .split(" ")
    .map((word) => {
      let matches = word.toLowerCase().match(wordRegex);
      if (!matches) {
        return undefined;
      }
      return matches[0];
    })
    .filter(wordShouldBeUsed);
  return {
    words: words as string[],
    country: rawRow.country,
    price: rawRow.price,
  };
}

function buildUpRowDocumentStatistics(wordMap: DocumentWordMap, row: Row) {
  row.words.forEach((word) => {
    const entry = wordMap[word];
    if (entry) {
      entry.totalCount = entry.totalCount + 1;
    } else {
      wordMap[word] = {
        totalCount: 1,
      };
    }
  });
}

function calculateTFIDF(wordMap: DocumentWordMap, corpusMap: CorpusWordMap) {
  for (const [key, value] of Object.entries(wordMap)) {
    const termFrequency = Math.log(1 + value.totalCount);
    const corpusEntry = corpusMap[key];
    if (corpusEntry && corpusEntry.inverseDocumentFrequency) {
      value.tfIdf = termFrequency * corpusEntry.inverseDocumentFrequency;
    } else {
      console.error(
        `Did not find word ${key} in corpus word map with valid inverse document frequency.`
      );
    }
  }
}

export function processWithJS(text: string, startTime: number) {
  logToScreenJs("parsing data");
  const rawRows = JSON.parse(text) as RawRow[];
  logTime("parsed data", startTime);

  logToScreenJs("starting preprocessing");
  const rows = rawRows.map(processRawRow);
  logTime("preprocessed rows", startTime);

  logToScreenJs("building up statistics");
  const corpusWordMap = {};
  loadedData = { corpusWordMap, rows };
  rows.forEach((row: Row, index) =>
    buildUpRowCorpusStatistics(corpusWordMap, index, row)
  );
  calculateInverseDocumentFrequencies(rows.length, corpusWordMap);
  logTime("built up statistics", startTime);
}

export function analyzeSampleWithJs(
  minPrice: number,
  maxPrice: number,
  countries: string[],
  startTime: number
): WordWithImportance[] {
  if (!loadedData) {
    throw new Error("No data was loaded!");
  }
  clearScreenLogJs();

  const corpusWordMap = loadedData.corpusWordMap;
  const rows = loadedData.rows;

  logToScreenJs("building up term frequencies for review sample.");
  const documentRows = rows.filter((row) =>
    rowMatchesFilter(row, minPrice, maxPrice, countries)
  );
  logToScreenJs(`found ${documentRows.length} reviews.`);
  let documentWordMap: DocumentWordMap = {};
  documentRows.forEach((row: Row) =>
    buildUpRowDocumentStatistics(documentWordMap, row)
  );
  calculateTFIDF(documentWordMap, corpusWordMap);
  logTime("built up TFIDF map", startTime);
  const topWordCount = 100;
  const mostRelevantWords = Object.entries(documentWordMap)
    // @ts-ignore
    .sort(([, value1], [, value2]) => value2.tfIdf - value1.tfIdf)
    .slice(0, topWordCount);

  return mostRelevantWords.map(([word, statistics]) => ({
    word: word,
    tf_idf: statistics.tfIdf ?? 0.0,
  }));
}

function rowMatchesFilter(
  row: Row,
  minPrice: number,
  maxPrice: number,
  countries: string[]
): boolean {
  return (
    row.price >= minPrice &&
    row.price <= maxPrice &&
    countries.includes(row.country)
  );
}

function logTime(step: string, startTime: number) {
  const duration = performance.now() - startTime;
  logToScreenJs(`${step} after ${duration.toFixed(2)}ms.`);
}
