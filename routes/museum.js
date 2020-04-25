const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = ('./utils/sequelize');
const Villager = require('./models/Villager');
const Item = require('./models/Item');
const House = require('./models/House');

// to be added in a later update during the summer to continue practicing

router.get('/', (req, res) => {

});

router.get('/collection', (req, res) => {
    
})