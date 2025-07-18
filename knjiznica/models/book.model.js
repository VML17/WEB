module.exports = class Book {
  constructor(title, author, language, publisher, ISBN) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.publisher = publisher;
    this.ISBN = ISBN;
  }

  getDetails() {
    return `Title: ${this.title}, Author: ${this.author}, Language: ${this.language}, Publisher: ${this.publisher}, ISBN: ${this.ISBN}`;
  }
}