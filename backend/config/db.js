require('dotenv').config();
const { Sequelize } = require('sequelize');

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.error("❌ Помилка: змінні середовища не завантажені!");
    process.exit(1);
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  logging: false // Вимкнемо логи для чистоти
});

sequelize.authenticate()
  .then(() => console.log('✅ База даних підключена...'))
  .catch(err => {
    console.error('❌ Помилка підключення:', err);
    process.exit(1);
  });

module.exports = sequelize;
