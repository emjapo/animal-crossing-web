const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('../models/Villager');
const Item = require('../models/Item');
const House = require('../models/House');


router.get('/river', (req, res) => {
    if (req.session.user) {
        res.render('river');
    }
    else {
        res.redirect('/login');
    }
});

router.post('/river', (req, res) => {
    req.session.pocketCount = req.session.pocketCount + 1 || 1;
    if (req.session.pocketCount == 10) {
        res.redirect('/pocket/full');
    }
    else {
        let randNum = Math.floor((Math.random() * 10));
        switch(randNum) {
            case 0:
            case 1:
            case 2:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Black Bass", image: "images/fish.png", price: "400", canDonate: "1" })
                        .then((fish) => {
                            villager.addItem([fish])
                        })
                })
                    .catch((err) => {
                        console.log("error saving fish 1");
                    });
                break;
            case 3:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Guppy", image: "images/fish.png", price: "1300", canDonate: "1" })
                        .then((fish) => {
                            villager.addItem([fish])
                        })
                })
                    .catch((err) => {
                        console.log("error saving fish 2");
                    });
                break;
            case 4:
            case 5:
            case 6:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Horse Mackerel", image: "images/fish.png", price: "150", canDonate: "1" })
                        .then((fish) => {
                            villager.addItem([fish])
                        })
                })
                    .catch((err) => {
                        console.log("error saving fish 3");
                    });
                break;
            case 7:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Red Snapper", image: "images/fish.png", price: "3000", canDonate: "1" })
                        .then((fish) => {
                            villager.addItem([fish])
                        })
                })
                    .catch((err) => {
                        console.log("error saving fish 4");
                    });
                break;
            case 8:
            case 9:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Carp", image: "images/fish.png", price: "300", canDonate: "1" })
                        .then((fish) => {
                            villager.addItem([fish])
                        })
                })
                    .catch((err) => {
                        console.log("error saving fish 5");
                    });
                break;
        }
        res.redirect('/pocket');
    }
});

router.get('/garden', (req, res) => {
    if (req.session.user) {
        res.render('garden');
    }
    else {
        res.redirect('/login');
    }
});

router.post('/garden', (req, res) => {
    req.session.pocketCount = req.session.pocketCount + 1 || 1;
    if (req.session.pocketCount == 10) {
        res.redirect('/pocket/full');
    }
    else {
        let randNum = Math.floor((Math.random() * 10));
        switch (randNum) {
            case 0:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Peacock Butterfly", image: "images/bug.png", price: "2500", canDonate: "1" })
                        .then((bug) => {
                            villager.addItem([bug])
                        })
                })
                    .catch((err) => {
                        console.log("error saving bug 1");
                    });
                break;
            case 1:
            case 2:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Long Locust", image: "images/bug.png", price: "200", canDonate: "1" })
                        .then((bug) => {
                            villager.addItem([bug])
                        })
                })
                    .catch((err) => {
                        console.log("error saving bug 2");
                    });
                break;
            case 3:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Tarantula", image: "images/bug.png", price: "8000", canDonate: "1" })
                        .then((bug) => {
                            villager.addItem([bug])
                        })
                })
                    .catch((err) => {
                        console.log("error saving bug 3");
                    });
                break;
            case 4:
            case 5:
            case 6:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Ladybug", image: "images/bug.png", price: "200", canDonate: "1" })
                        .then((bug) => {
                            villager.addItem([bug])
                        })
                })
                    .catch((err) => {
                        console.log("error saving bug 4");
                    });
                break;
            case 7:
            case 8:
            case 9:
                Villager.findByPk(req.session.user).then((villager) => {
                    Item.create({ name: "Honeybee", image: "images/bug.png", price: "200", canDonate: "1" })
                        .then((bug) => {
                            villager.addItem([bug])
                        })
                })
                    .catch((err) => {
                        console.log("error saving bug 5");
                    });
                break;
        }
        res.redirect('/pocket');
    }
});

module.exports = router;