const path = require('path');

module.exports = {
  entry: {
    app: './js/local_storage.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/local_storage.js',
  },
};
