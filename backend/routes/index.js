const express = require('express');
const router = express.Router();

// Додаємо маршрути
const authRoutes = require('./auth'); 
const userRoutes = require('./users'); 
const tourRoutes = require('./tour'); 

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tour', tourRoutes);
module.exports = router;
