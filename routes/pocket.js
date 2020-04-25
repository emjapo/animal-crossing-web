const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('./models/Villager');
const Item = require('./models/Item');
const House = require('./models/House');

//counts items in pocket and displays the appropiate page
router.post('/add', (req, res) => {
    req.session.pocketCount = req.session.pocketCount + 1 || 1;
    if (req.session.pocketCount == 10) {
        res.redirect('/pocket/full');
    }
    else {
        //get item from form and add to pocket

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
    Villager.findByPk(req.session.user)
    .then((villager) => {
        villager.getItems()
        .then((items)=>{
            res.render('/pocket/index', {items : items});
        })
    })
    .catch((err) => {
        console.log("did not find page", err);
    })
});

router.get('/full', (req, res) => {
    res.render('pocket/full');
})