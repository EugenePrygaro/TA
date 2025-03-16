const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = "35242"; // 🔒 Замініть на безпечний секретний ключ

// 📌 Реєстрація користувача
router.post("/register", async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    // Перевірка наявності користувача
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Користувач уже існує" });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = await User.create({
      nickname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Користувача створено", user: newUser });
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    res.status(500).json({ message: "Помилка сервера", error: error.message });
  }
});

// 📌 Авторизація користувача
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Отримано запит на логін:", { email, password });

    // Перевіряємо, чи існує користувач
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ Користувач не знайдений!");
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    console.log("✅ Користувач знайдений:", user.email);

    // Перевіряємо пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Паролі не співпадають!");
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    console.log("🛠 Генеруємо токен...");
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h", // Термін дії токена
    });

    console.log("📌 Успішний логін! Відправляємо дані на фронт...");

    // Відправляємо відповідь з `token` та `user`
    res.json({
      message: "Авторизація успішна",
      token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname, // Додаємо нікнейм
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });

  } catch (error) {
    console.error("❌ Помилка авторизації:", error);
    res.status(500).json({ message: "Помилка сервера", error: error.message });
  }
});


module.exports = router;
