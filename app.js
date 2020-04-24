const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const sequelize = require('./utils/sequelize');

const IndexRouter = require('./routes/index.js');
const AnimalRouter = require('./routes/animals.js');
const MuseumRouter = require('./routes/museum.js');
const NooksRouter = require('./routes/nooks.js');
const PocketRouter = require('./routes/pockets.js');

const Villager = require('./models/Villager');
const Item = require('./models/Item');
const House = require('./models/House');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

app.use(express.urlencoded({ extended: false }));

var sequelize = new Sequelize(
    "database",
    "username",
    "password", {
        "dialect": "sqlite",
        "storage": "./session.sqlite"
});

app.use(session({
    secret: "BaSwanA274bdxE",
    store: new SequelizeStore({
        db : sequelize
    }),
    resave: false,
    saveUninitialized: false
}));

app.use('/', express.static('public'));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use('/', IndexRouter);
app.use('/', AnimalRouter);
app.use('/', MuseumRouter);
app.use('/', NooksRouter);
app.use('/', PocketRouter);

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