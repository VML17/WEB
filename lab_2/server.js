const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const router = express.Router();
const app = express();
const homeRoutes = require('./routes/home.routes');
const cartRoutes = require('./routes/cart.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    store: new FileStore({
        reapInterval : 60 * 60, // 1 sat
    }),
    secret: 'Spijuniro golubiro 123',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 dan
}));

app.get('/', (req, res) => {
    res.redirect('/home/getCategories');
});
// app.get('/home', (req, res) => {
//     res.redirect('/home/getCategories');
// });

app.use('/home', homeRoutes);
app.use('/cart', cartRoutes);

app.use((req, res) => {
    res.status(404).send('Are you guessing?');
});

app.listen(3000);