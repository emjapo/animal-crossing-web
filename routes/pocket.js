const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('./models/Villager');
const Item = require('./models/Item');
const House = require('./models/House');

//counts items in pocket and displays the appropiate page
router.post('/add', (req, res) => {
    req.session.pageC = req.session.pageCount + 1 || 1;
    req.session.articleCount = req.session.articleCount + 1 || 1;
    if (req.session.articleCount == 4) {
        res.redirect('/subscribe');
    }
    else {
        const id = req.params.id;
        Article.findByPk(id)
            .then((article) => {
                res.render('article', { article: article });
            })
            .catch((err) => {
                console.log("Was not able to find article", err);
            });
    }
});

//displays pockets
router.get('/', (req, res) => {

})