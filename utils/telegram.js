// utils/telegram.js
// Работа с Telegram API, использует dotenv для переменных окружения



const axios = require('axios');

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

/**
 * Отправка сообщения в Telegram.
 * @param {string} text - текст сообщения.
 */
async function sendMessage(text) {
  try {

    if (!process.env.TOKEN || !process.env.CHAT_ID) {
      throw new Error('Не заданы переменные окружения TOKEN или CHAT_ID');
    }

    const response = await axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      parse_mode: 'html', // Можно изменить на 'Markdown', если нужно
      text: text,
    });
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:');
    throw error;
  }
}

module.exports = { sendMessage };
