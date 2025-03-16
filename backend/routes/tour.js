const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour'); // Модель туру

// 📌 Отримати всі тури
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.findAll();
        res.json(tours);
    } catch (error) {
        res.status(500).json({ error: 'Помилка отримання турів' });
    }
});

// 📌 Створити новий тур
router.post('/', async (req, res) => {
    try {
        const { title, direction, description, price } = req.body;
        const newTour = await Tour.create({ title, direction, description, price });
        res.status(201).json(newTour);
    } catch (error) {
        res.status(500).json({ error: 'Помилка створення туру' });
    }
});

// 📌 Отримати тур за ID
router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findByPk(req.params.id);
        if (!tour) return res.status(404).json({ error: 'Тур не знайдено' });
        res.json(tour);
    } catch (error) {
        res.status(500).json({ error: 'Помилка отримання туру' });
    }
});


// 📌 Видалити тур
router.delete('/:id', async (req, res) => {
    try {
        const tour = await Tour.findByPk(req.params.id);
        if (!tour) return res.status(404).json({ error: 'Тур не знайдено' });

        await tour.destroy();
        res.json({ message: 'Тур видалено' });
    } catch (error) {
        res.status(500).json({ error: 'Помилка видалення туру' });
    }
});

module.exports = router;
