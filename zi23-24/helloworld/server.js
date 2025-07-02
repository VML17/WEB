const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

const homeRoutes = require("./routes/home.routes");
const movieRoutes = require("./routes/movie.routes");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));

app.use('/', homeRoutes);
app.use('/movies', movieRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})