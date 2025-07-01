const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const route = require('./routes/route')

app.use(session({
    secret: 'tajna',
    resave: false,
    saveUninitialized: true,
    rolling: true, // produžava sesiju pri svakom zahtjevu
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 * 10 }
}));

app.use('/', route);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})