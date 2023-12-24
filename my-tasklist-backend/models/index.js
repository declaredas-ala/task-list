// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../db');
const TaskModel = require('./task');

const Task = TaskModel(sequelize);

module.exports = {
  Task,
  sequelize,
};
