const sequelize = require('../config/db');
const User = require('./User');
const Tour = require('./Tour');

sequelize.sync({ force: false })  
  .then(() => console.log('Tables created'))
  .catch(err => console.log('Error:', err));

module.exports = { User, Tour };