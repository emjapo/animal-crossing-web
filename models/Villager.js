const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');


const Villager = sequelize.define('villager', {
    user: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    money: {
        type: Sequelize.INTEGER,
        allowNull : false
    }
});


module.exports = Villager;