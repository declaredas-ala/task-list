// my-tasklist-backend/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mytasklistdb', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;
