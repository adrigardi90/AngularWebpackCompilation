const path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ROOT = require('./webpack.helper.js').root;

module.exports = {

  devtool: 'inline-source-map',

   resolve: {
     extensions: ['.ts', '.js'],
     modules: [
       path.join(__dirname, '..', 'src'),
       path.join(__dirname, '..', 'node_modules')
     ]
   },

  module: {

    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader', 
          'angular2-template-loader', 
          'source-map-loader'
        ]
      },

      // Rule to coverage reporter ts files with istanbul
      {
        test: /\.ts/,
        include: path.join(ROOT 'src', 'app'),
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        },
        enforce: 'post',
        exclude: /(tests|node_modules|\.spec\.ts$)/ // We do not want to get coverage of test files
      },

      {
        test: /\.html$/,
        loader: 'html-loader'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },

      {
        test: /\.scss$/,
        include: [
          path.join(ROOT, 'src/app/scss'), 
          path.join(ROOT, 'src/styles/')
        ],
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },

      {
        test: /\.scss$/,
        exclude: [
          path.join(ROOT, 'src/app/scss'),
          path.join(ROOT, 'src/styles/')
          ],
        use: [
          'raw-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.css$/,
        exclude: path.join(ROOT, 'src/app'),
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        include: path.join(ROOT, 'src/app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [

    new CleanWebpackPlugin(
        [
            './coverage'
        ],
        { root: ROOT }
    ),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(ROOT, './src'), // location of your src
      {} // a map of your routes
    )
  ]

};
