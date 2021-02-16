const path = require('path');
const nodeExternal = require('webpack-node-externals');
const base = require('./webpack.base');
const { merge } = require('webpack-merge');

module.exports = merge(base, {
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  externals: [nodeExternal()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
});
