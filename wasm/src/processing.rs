use std::cmp::Ordering;
use std::collections::{HashMap, HashSet};

use regex::Regex;
use serde::{Deserialize, Serialize};

use crate::bindings::{log_to_screen_wasm, WordWithImportance};
use crate::preprocessing::process_raw_word;

#[derive(Serialize, Deserialize)]
struct RawRow {
    description: String,
}

struct Row {
    words: Vec<String>,
}

struct CorpusWordStatistics {
    total_count: u32,
    document_appearances: HashSet<u32>,
    inverse_document_frequency: Option<f64>,
}

type CorpusWordMap = HashMap<String, CorpusWordStatistics>;

struct DocumentWordStatistics {
    total_count: u32,
    tf_idf: Option<f64>,
}

type DocumentWordMap = HashMap<String, DocumentWordStatistics>;

fn build_up_row_corpus_statistics(word_map: &mut CorpusWordMap, document_index: u32, row: &Row) {
    for word in &row.words {
        match word_map.get_mut(word) {
            Some(value) => {
                value.total_count += 1;
                value.document_appearances.insert(document_index);
            }
            None => {
                word_map.insert(
                    word.clone(),
                    CorpusWordStatistics {
                        total_count: 1,
                        document_appearances: HashSet::from([document_index]),
                        inverse_document_frequency: None,
                    },
                );
            }
        }
    }
}

fn calculate_inverse_document_frequencies(
    total_number_of_documents: u32,
    word_map: &mut CorpusWordMap,
) {
    for value in word_map.values_mut() {
        let appearance_fraction =
            (total_number_of_documents as f64) / (value.document_appearances.len() as f64);
        value.inverse_document_frequency = Some(appearance_fraction.ln());
    }
}

fn process_raw_row(regex: &Regex, raw_row: RawRow) -> Row {
    let words: Vec<String> = raw_row
        .description
        .split(' ')
        .filter_map(process_raw_word)
        .collect();

    // let words: Vec<String> = raw_row
    //     .description
    //     .split(' ')
    //     .filter_map(|word| {
    //         if let Some(found_match) = regex.find(word) {
    //             return Some(String::from(found_match.as_str()));
    //         }
    //         None
    //     })
    //     .collect();

    Row { words }
}

fn build_up_row_document_statistics(word_map: &mut DocumentWordMap, row: &Row) {
    for word in &row.words {
        match word_map.get_mut(word) {
            Some(value) => {
                value.total_count += 1;
            }
            None => {
                word_map.insert(
                    word.clone(),
                    DocumentWordStatistics {
                        total_count: 1,
                        tf_idf: None,
                    },
                );
            }
        }
    }
}

fn calculate_tf_idf(word_map: &mut DocumentWordMap, corpus_map: &CorpusWordMap) {
    for (key, value) in word_map {
        let term_frequency = ((1 + value.total_count) as f64).ln();
        match corpus_map.get(key) {
            Some(corpus_entry) => match corpus_entry.inverse_document_frequency {
                Some(idf) => {
                    value.tf_idf = Some(term_frequency * idf);
                }
                None => {
                    log_to_screen_wasm("Entry did not have IDF even though it was supposed to.")
                }
            },
            None => log_to_screen_wasm(
                "Corpus did not have entry for word even though it was supposed to.",
            ),
        }
    }
}

pub fn process(text: &str, start_time: f64) -> Vec<WordWithImportance> {
    log_to_screen_wasm("parsing data");
    let mut raw_rows: Vec<RawRow> = serde_json::from_str(text).unwrap();
    log_time("parsed data", start_time);

    log_to_screen_wasm("starting preprocessing");
    let regex = Regex::new(r"\p{L}+").unwrap();
    for row in &mut raw_rows {
        row.description.make_ascii_lowercase();
    }
    let rows: Vec<Row> = raw_rows
        .into_iter()
        .map(|raw_row| process_raw_row(&regex, raw_row))
        .collect();
    log_time("preprocessed rows", start_time);

    log_to_screen_wasm("building up statistics");
    let mut corpus_word_map = CorpusWordMap::new();
    for (index, row) in rows.iter().enumerate() {
        build_up_row_corpus_statistics(&mut corpus_word_map, index as u32, row);
    }
    calculate_inverse_document_frequencies(rows.len() as u32, &mut corpus_word_map);
    log_time("built up statistics", start_time);

    calculate_sample(1, 10_000, &rows, &corpus_word_map, start_time)
}

fn calculate_sample(
    sample_index: usize,
    start_index: usize,
    rows: &[Row],
    corpus_word_map: &CorpusWordMap,
    start_time: f64,
) -> Vec<WordWithImportance> {
    log_to_screen_wasm(&format!(
        "building up term frequencies for document sample {}.",
        sample_index
    ));
    let sample_size = 1000;
    let mut document_word_map = DocumentWordMap::new();
    let document_rows = &rows[start_index..start_index + sample_size];
    for row in document_rows {
        build_up_row_document_statistics(&mut document_word_map, row);
    }
    calculate_tf_idf(&mut document_word_map, corpus_word_map);
    log_time("built up TFIDF map", start_time);

    let top_word_count = 100;
    let mut most_relevant_words: Vec<(&String, &DocumentWordStatistics)> =
        document_word_map.iter().collect();
    // TODO unwrap or and proper float comparison
    most_relevant_words.sort_unstable_by(|entry1, entry2| {
        let idf1 = entry1.1.tf_idf.unwrap();
        let idf2 = entry2.1.tf_idf.unwrap();
        if idf2 - idf1 > 0.0 {
            Ordering::Greater
        } else {
            Ordering::Less
        }
    });

    let top_words: Vec<WordWithImportance> = most_relevant_words[..top_word_count]
        .iter()
        .map(|entry| WordWithImportance::new(entry.0.clone(), entry.1.tf_idf.unwrap()))
        .collect();

    top_words
}

fn log_time(step: &str, start_time: f64) {
    log_to_screen_wasm(&format!(
        "{} after {}ms.",
        step,
        js_sys::Date::now() - start_time
    ));
}
