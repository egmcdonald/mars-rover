const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_DIR = path.join(__dirname, 'src');

module.exports = (env, argv) => ({
  entry: path.join(SOURCE_DIR, 'bootstrap.js'),
  output: {
    path: path.join(SOURCE_DIR, 'dist'),
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    historyApiFallback: true,
    port: 9001
  }
});
