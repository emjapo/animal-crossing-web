const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('../models/Villager');
const Item = require('../models/Item');
const House = require('../models/House');


//displays pockets
router.get('/', (req, res) => {
    if (req.session.user) {
        Villager.findByPk(req.session.user)
        .then((villager) => {
            villager.getItems()
            .then((items)=>{
                res.render('pocket/index', {items : items});
            })
        })
        .catch((err) => {
            console.log("did not find page", err);
        })
    }
    else {
        res.redirect('/login');
    }
});

router.get('/full', (req, res) => {
    if (req.session.user) {
        res.render('pocket/full');
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;