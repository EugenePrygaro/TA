require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // База даних
const routes = require('./routes'); // Основні маршрути

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Маршрути
app.use('/api', routes);
app.get("/api/message", (req, res) => {
  res.json({ message: "Привіт із бекенду!" });
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ База даних підключена...');
    
    await sequelize.sync(); // Створюємо таблиці, якщо їх немає
    console.log('✅ Таблиці синхронізовані...');

    app.listen(PORT, () => console.log(`✅ Сервер запущено на порті ${PORT}`));
  } catch (error) {
    console.error('❌ Помилка запуску сервера:', error);
    process.exit(1);
  }
};

startServer();
