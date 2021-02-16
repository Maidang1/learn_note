const path = require('path');
const base = require('./webpack.base');
const { merge } = require('webpack-merge');

module.exports = merge(base, {
  target: 'node',
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
});
