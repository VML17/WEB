const express = require('express');
const app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const homeRoutes = require("./routes/home.routes.js");
const subscribeRoutes = require('./routes/subscribe.routes.js');

app.use("/", homeRoutes);
app.use("/subscribe", subscribeRoutes);

app.listen(3000);