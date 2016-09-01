var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// for postcss
var autoprefixer = require('autoprefixer');
var stylelint = require('stylelint');
var postcssReporter = require('postcss-reporter');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  cache: true,
  entry: {
    app: [
      path.join(src, 'index.js'),
      path.join(src, 'base.css')
    ]
  },
  output: {
    path: dist,
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    preLoaders:[
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders:[
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css!postcss' }
    ]
  },
  eslint: {
    failOnError: true
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ]
      }),
      stylelint,
      postcssReporter
    ];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    inline: true,
    proxy: {
      '/api/comments': {
          target: 'http://localhost:3000'
      }
    }
  }
};
