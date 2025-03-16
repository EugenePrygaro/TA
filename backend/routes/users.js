const express = require("express");
const User = require("../models/User"); // Імпортуємо модель User

const router = express.Router();

// Отримання всіх користувачів
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); // Отримуємо всіх користувачів
    res.json(users);
  } catch (err) {
    console.error("Помилка отримання користувачів:", err);
    res.status(500).json({ error: "Помилка отримання користувачів" });
  }
});


// 📌 Створити нового користувача
router.post('/', async (req, res) => {
    try {
        const { nickname, email, password } = req.body;
        const newUser = await User.create({ nickname, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Помилка створення користувача' });
    }
});

// 📌 Отримати користувача за ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Користувач не знайдений' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Помилка отримання користувача' });
    }
});


// 📌 Видалити користувача
router.delete('/:id', async (req, res) => { 
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Користувач не знайдений' });
        }

        await user.destroy();
        res.json({ message: 'Користувача видалено' });
    } catch (error) {
        console.error("Помилка видалення користувача:", error);
        res.status(500).json({ error: 'Помилка видалення користувача' });
    }
});

module.exports = router;