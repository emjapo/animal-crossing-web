const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('./models/Villager');
const Item = require('./models/Item');
const House = require('./models/House');

router.get('/', (req, res) => {
    if (req.session.user) {
        Villager.findByPk(req.session.user)
        .then((villager) => {
            villager.getHouse()
            .then((house) => {
                res.render('index', {villager : villager, house : house});
            })
        })
    }
    else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    let user = req.body.username;
    let password = req.body.password;
    Villager.findOne({ where: { user: user}})
    .then((villager) => {
        if (villager.password == password) {
            req.session.user = user;
            res.redirect('/');
        } else {
            console.log("Wrong password");
            res.redirect('/login');
        }
    }).catch((err) => {
        console.log("user could not be found");
        res.redirect('/login');
    })
});

router.get('/newAccount', (req, res) => {
    res.render('newAccount');
});

module.exports = router;