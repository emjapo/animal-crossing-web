const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Villager = require('./Villager');

const House = sequelize.define('house', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

House.belongsTo(Villager);
Villager.hasOne(House);

module.exports = House;
