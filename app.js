// Requiring module
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 443;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Подключение маршрутов
app.use('/', indexRouter);
app.use('/api', apiRouter); // Подключение маршрута api



// Обслуживание статических файлов из папки list-products
app.use('/list-products', express.static(path.join(__dirname, 'public', 'portfolio', 'list-products')));

// Маршрут для перехода на страницу list-products
app.get('/list-products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portfolio', 'list-products', 'index.html'));
});

// Обработка ошибок 404
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});




// Обработка ошибок 404
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
