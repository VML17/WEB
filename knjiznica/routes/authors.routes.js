const express = require('express');
const router = express.Router();
const repo = require('./../repository/books.repo');
const db = require('./../repository/books.repo.db.commands');
const Author = require('./../models/author.model'); // Assuming you have an Author model defined


router.get('/', async (req, res) => {
    let authors = await db.getAuthors();
    authors = authors.map(auth => {
        return new Author(auth.authorid, auth.authorfirstname, auth.authorlastname, new Date(auth.authordob.toISOString()), auth.gender);
    });
    res.render('authors', {
        title: 'Authors',
        authors: authors
    });
});

router.get('/author/:id', (req, res) => {
    let authorId = parseInt(req.params.id);
    console.log(`Author ID: ${authorId}`);
    // let author;
    // for (let book of repo.books) {
    //     if (book.author.id === authorId) {
    //         author = book.author;
    //         break;
    //     }
    // }
    // if (author){
    //     res.render('author', {
    //         title: `Info for ${author}`,
    //         author: author
    //     });
    // }else {
    //     res.status(404).send("Are you guessing? Author not found.");
    // }

    db.getAuthor(authorId)
        .then(author => {
            if (author) {
                console.log("auhtor dob: " + author.authordob.toISOString());
                const temp = new Author (author.authorid, author.authorfirstname, author.authorlastname, new Date (author.authordob.toISOString()), author.gender);
                res.render('author', {
                    title: `Info for ${author.authordirstname} ${author.authorlastname}`,
                    author: temp

                });
            }
            else {
                res.status(404).send("Are you guessing? Author not found.");
            }
        }
        )
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal server error");
        }); 

});

router.get('/add', (req, res) => {
    res.render('addAuthor', {
        title: 'Add Author',
        error: null,
    });
});

router.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let dob = new Date(req.body.DOB); 
        let gender = req.body.gender;

        // let newAuthor = repo.addAuthor(firstName, lastName, dob, gender); 
        await db.addAuthor(firstName, lastName, dob, gender);
        res.redirect('/authors/');

    }catch (err) {
        res.render('addAuthor', {
            title: 'Add Author',
            error: err.message,
        });
    }
});


module.exports = router;