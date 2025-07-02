const express = require('express');
const router = express.Router();
let path = require('path');


const homeRouter = require('./routes/home.routes');
const booksRouter = require('./routes/books.routes');
const authorsRouter = require('./routes/authors.routes');

const app = express();
app.use (express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);


app.listen(3000);