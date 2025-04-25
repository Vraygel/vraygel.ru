// Файл: webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // Или 'production' для продакшена
  entry: './public/js/script.js', // Точка входа вашего приложения
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'public/js'), // Путь для выходного файла
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    swiper: {
      commonjs: 'swiper',
      commonjs2: 'swiper',
      root: 'Swiper',
    },
  },
};
