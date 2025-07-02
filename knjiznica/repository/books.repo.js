
const Author = require('./../models/author.model');
const Book = require('./../models/book.model');

class BooksRepository {
    constructor() {
        this.seedRepo();
    }

    getAuthor(id) {
        for (let author of this.authors) {
            if (author.id == id) {
                return author;
            }
        }
        return null;
    }

    addAuthor(firstName, lastName, DOB, gender) {
        let newId = this.authors.length + 1;
        let newAuthor = new Author(newId, firstName, lastName, DOB, gender);
        this.authors.push(newAuthor);
        return newAuthor;
    }
    getLanguages(abrev) {
        for (let lang of this.languages) {
            if (lang.abrev == abrev) {
                return lang;
            }
        }
        return 'unknown';
    }

    
    addBook(title, author, language, publisher, ISBN) {
        this.books.push(new Book(title, author, language, publisher, ISBN));
    }

    
    seedRepo() {
        this.seedAuthors();
        this.seedLanguages();
        this.seedBooks();
    }

    seedBooks(){
        this.books = [];
        this.books.push(
            new Book('Code Coplete', this.getAuthor(1), 'English', 'Microsoft Press', '0735619670'),
            new Book('The Bell Jar', this.getAuthor(2), 'English', 'Harper Perennial Modern Classics', '0060837020'),
        );
    }

    seedAuthors() {
        this.authors = [];
        this.authors.push(
            new Author(1, 'Steve', 'McConnell', new Date('1965-07-31'), 'm'),
            new Author(2, 'Sylvia', 'Plath', new Date('1932-10-27'), 'f')
        );
    }

    seedLanguages() {
        this.languages = [{abrev: 'en', langName: 'English'},
                          {abrev: 'fr', langName: 'French'},
                          {abrev: 'de', langName: 'German'},
                          {abrev: 'es', langName: 'Spanish'},
                          {abrev: 'hr', langName: 'Croatian'},];
    }
};

const repoInstance = new BooksRepository();

module.exports = repoInstance;