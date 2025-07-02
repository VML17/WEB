const express = require('express');
const router = express.Router();
const BooksRepository = require('./../repository/books.repo');
const { title } = require('process');
const { error } = require('console');


router.get('/', (req, res) => {
    res.render('books', {
        title: 'Books',
        books: BooksRepository.books
    });
});

router.get('/add', (req, res) => {
    
    let model = {
        title: 'Add Book',
        authorsSelect: {
            name: 'author',
            list: BooksRepository.authors.map(author => ({
                value: author.id,
                name: author.toString()
            }))
        },
        languagesSelect: {
            name: 'language',
            list: BooksRepository.languages.map(lang => ({
                value: lang.abrev,
                name: lang.langName
            }))
        },
        error: null,
    }
    res.render('addBook', model);
});

router.post('/add', (req, res) => {
    console.log(req.body);

    try {
        let title = req.body.title;
        let authorId = parseInt(req.body.author);
        let language = req.body.language;
        let publisher = req.body.publisher;
        let ISBN = req.body.ISBN;

        let author = BooksRepository.getAuthor(authorId);
        if (!author) {
            throw new Error("Author not found");
        }

        BooksRepository.addBook(title, author, language, publisher, ISBN);
        res.redirect('/books/');

    }catch (err){
        console.log(err.message);
        let model = {
            title: 'Add Book',
            authorsSelect: {
                name: 'author',
                list: BooksRepository.authors.map(author => ({
                    value: author.id,
                    name: author.toString()
                }))
            },
            languagesSelect: {
                name: 'language',
                list: BooksRepository.languages.map(lang => ({
                    value: lang.abrev,
                    name: lang.langName
                }))
            },
            error: err.message,
        };
    res.render('addBook', model);
    }
});

module.exports = router;