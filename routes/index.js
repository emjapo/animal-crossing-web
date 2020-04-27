const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('../models/Villager');
const Item = require('../models/Item');
const House = require('../models/House');

router.get('/', (req, res) => {
    if (req.session.user) {
        Villager.findByPk(req.session.user)
        .then((villager) => {
            villager.getHouse()
            .then((house) => {
                res.render('index', {villager : villager, house : house});
            })
        }).catch((err) => {
            console.log(err);
        });
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

router.post('/newAccount', (req, res) => {
    Villager.create({
        user: req.body.username,
        password: req.body.password,
        name: req.body.name,
        image: req.body.image,
        money: 0
    }).then((villager) => {
        House.create({
            image: req.body.house,
            price: 180000
        }).then((house) => {
            villager.setHouse(house);
        })
    }) .then(() => {
        res.redirect('/login');
    }).catch((err) => {
        console.log('Error saving account', err);
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;