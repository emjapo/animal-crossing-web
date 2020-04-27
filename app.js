const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const sequelize = require('./utils/sequelize');

const IndexRouter = require('./routes/index.js');
const AnimalRouter = require('./routes/animals.js');
// const NooksRouter = require('./routes/nooks.js');
const PocketRouter = require('./routes/pockets.js');

const Villager = require('./models/Villager.js');
const Item = require('./models/Item.js');
const House = require('./models/House');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

app.use(express.urlencoded({ extended: false }));

var sequel = new Sequelize(
    "database",
    "username",
    "password", {
        "dialect": "sqlite",
        "storage": "./session.sqlite"
});

app.use(session({
    secret: "BaSwanA274bdxE",
    store: new SequelizeStore({
        db : sequel
    }),
    resave: false,
    saveUninitialized: false
}));

app.use('/', express.static('public'));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use('/', IndexRouter);
app.use('/', AnimalRouter);
// app.use('/museum', MuseumRouter);
app.use('/nooksCranny', NooksRouter);
app.use('/pocket', PocketRouter);

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