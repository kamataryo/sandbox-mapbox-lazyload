/**
 * Webpack Configuration
 * @type {file}
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { NODE_ENV } = process.env
const __DEV__ = NODE_ENV === 'development'

// entries
const devEntries = [
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint
  'webpack-dev-server/client?http://0.0.0.0:4000',
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  'webpack/hot/only-dev-server',
]

const appEntries = ['./sample/index.js']

module.exports = {
  mode: __DEV__ ? 'development' : 'production',
  entry: __DEV__
    ? {
      app: appEntries,
      dev: devEntries,
    }
    : {
      app: appEntries,
    },

  output: {
    path: path.join(__dirname, '../docs/'),
    publicPath: './',
    filename: '[name]-[hash].bundle.js',
  },

  devtool: __DEV__ ? 'source-map' : void 0,

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.json'],
  },
  performance: {
    maxEntrypointSize: 2 * 1024 * 1024, // 2Mb
    maxAssetSize: 2 * 1024 * 1024, // 2Mb
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    // copy HTML
    new HtmlWebpackPlugin({ template: './sample/index.html' }),
  ],

  devServer: {
    contentBase: path.join(__dirname, '../docs/'),
    compress: true,
    host: 'localhost',
    port: 3000,
  },
}
