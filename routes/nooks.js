const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('../models/Villager');
const Item = require('../models/Item');
const House = require('../models/House');


router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('nooksCranny/index');
    }
    else {
        res.redirect('/login');
    }
});

router.get('/sell', (req, res) => {
    if (req.session.user) {
        Villager.findByPk(req.session.user)
            .then((villager) => {
                villager.getItems()
                    .then((items) => {
                        res.render('nooksCranny/sell', { villager: villager, items : items });
                    })
            }).catch((err) => {
                console.log(err);
            });
    }
    else {
        res.redirect('/login');
    }
});

router.post('/sell', (req, res) => {
    let user = req.session.user;
    let sold = req.body.sold;
    Villager.findByPk(user)
    .then((villager) => {
        Item.findByPk(sold)
        .then((item) => {
            let value = item.price;
            villager.money = villager.money + value;
            villager.save()
            .then(() => {
                item.destroy()
                .then(() => {
                    req.session.pocketCount = req.session.pocketCount - 1;
                    res.redirect('/nooksCranny/');
                })
            })
        })
    }).catch((err) => {
        console.log(err);
    }) 
});

router.get('/pay', (req, res) => {
    if (req.session.user) {
        Villager.findByPk(req.session.user)
        .then((villager) => {
            villager.getHouse()
            .then((house) => {
                res.render('nooksCranny/pay', {villager : villager, house : house});
            })
        }).catch((err) => {
            console.log(err);
        });
    }
    else {
        res.redirect('/login');
    }
});

router.post('/pay', (req, res) => {
    let bells = parseInt(req.body.bells);
    let user = req.session.user;
    Villager.findByPk(user)
        .then((villager) => {
            villager.getHouse()
                .then((house) => {
                    let value = house.price;
                    villager.money = villager.money - bells;
                    villager.save()
                        .then(() => {
                            house.price = house.price - bells;
                            house.save()
                                .then(() => {
                                    res.redirect('/nooksCranny/');
                                })
                        })
                })
        }).catch((err) => {
            console.log(err);
        }) 
});

module.exports = router;