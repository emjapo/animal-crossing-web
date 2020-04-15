const Sequelize = require('sequelize');
const sequelize = new Sequelize('my_porte2_default', 'my.porte2', '$00wnw1zr', { host: 'localhost', dialect: 'mysql' });

module.exports = sequelize;