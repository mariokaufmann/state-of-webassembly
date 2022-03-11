fn main() {
    let text = std::fs::read_to_string("input.txt")
        .expect("Could not read file");
    println!("{}", text);
}
