pub fn process_raw_word(word: &str) -> Option<String> {
    let mut first_alphabetic_start_index = None;
    let mut last_alphabetic_exclusive_end_index = None;
    let word_length = word.len();
    // this is the byte index into the string, not the iteration index
    let mut slice_index = 0;
    for character in word.chars() {
        let is_alphabetic = character.is_alphabetic();
        let character_length = character.len_utf8();

        if is_alphabetic {
            if first_alphabetic_start_index.is_none() {
                first_alphabetic_start_index = Some(slice_index);
            }

            if last_alphabetic_exclusive_end_index.is_some() {
                // word has non alphabetic characters in the middle, filter it out
                return None;
            }
        } else {
            // one character word
            if word_length == character_length {
                return None;
            }

            if first_alphabetic_start_index.is_some()
                && last_alphabetic_exclusive_end_index.is_none()
            {
                last_alphabetic_exclusive_end_index = Some(slice_index);
            }
        }
        slice_index += character_length;
    }

    if first_alphabetic_start_index.is_none() {
        return None;
    }

    let start_index = first_alphabetic_start_index.unwrap_or(0);
    let end_index = last_alphabetic_exclusive_end_index.unwrap_or(word_length);

    Some(String::from(&word[start_index..end_index]))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn manual_processing() {
        assert_eq!(process_raw_word("aromas"), Some("aromas".to_owned()));
        assert_eq!(process_raw_word("albariño"), Some("albariño".to_owned()));

        assert_eq!(process_raw_word("'(aromas)"), Some("aromas".to_owned()));
        assert_eq!(process_raw_word("'(albariño)"), Some("albariño".to_owned()));

        assert_eq!(process_raw_word("aromas)"), Some("aromas".to_owned()));
        assert_eq!(process_raw_word("{aromas"), Some("aromas".to_owned()));

        assert_eq!(process_raw_word("1993"), None);
        assert_eq!(process_raw_word("()"), None);
        assert_eq!(process_raw_word("12$"), None);

        assert_eq!(process_raw_word("now–2025"), Some("now".to_owned()));
    }
}
