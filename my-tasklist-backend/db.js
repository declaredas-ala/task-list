
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(name, username, password, {
  host,
  dialect : 'mysql',
});

module.exports = sequelize;