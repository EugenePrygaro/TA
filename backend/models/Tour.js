const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tour = sequelize.define('Tour', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  direction: {type: DataTypes.STRING, allowNull: false},
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Tour;