const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const sequelize = require('./utils/sequelize');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Tag = require('./models/Tag');

app.use(express.urlencoded({ extended: false }));

const IndexRouter = require('./routes/index.js');


app.use('/', express.static('public'));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use('/', IndexRouter);


sequelize.authenticate()
    .then(() => {
        console.log("Authenticated");
        app.listen(port);
    }).then(() => {
        sequelize.sync()
            .then(() => {
                console.log("synced");
            })
            .catch((error) => {
                console.log("not synced");
            })
    })
    .catch((err) => {
        console.log("could not authenticate:", err);
    });