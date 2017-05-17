const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],

  resolve: {
      extensions: ['.js', '.css', '.jsx']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {test: /\.(js|jsx)$/, exclude: /node_modules/,
         use: {
           loader: 'babel-loader',
           options: {
              presets: ['es2015', 'react'],
              plugins: [require('babel-plugin-transform-class-properties')]
            }
          }
        },
      {test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
