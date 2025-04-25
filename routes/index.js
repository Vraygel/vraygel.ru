// Файл: routes/index.js
// Изменения: Создание файла для маршрутов главной страницы.

const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
