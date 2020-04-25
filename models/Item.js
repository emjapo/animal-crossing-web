const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Villager = require('./Villager');

const Item = sequelize.define('item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.String,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    canDonate : {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
});

Villager.belongsToMany(Item, {through : 'Pockets'});
Item.belongsToMany(Villager, {through : 'Pockets'});

module.exports = Item;