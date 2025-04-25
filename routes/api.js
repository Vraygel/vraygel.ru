// Файл: routes/api.js

const express = require('express');
const { sendMessage } = require('../utils/telegram');

const router = express.Router();

router.post('/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const text = `Новое сообщение c сайта Raygel.ru\n\n Отправитель: ${name}\n Email: ${email}\n\n Сообщение:\n${message}`;
    await sendMessage(text);
    res.status(200).send('Сообщение отправлено');
  } catch (error) {
    console.error('Ошибка при обработке запроса /api/send-message:');
    res.status(500).send('Ошибка отправки сообщения');
  }
});

module.exports = router;

