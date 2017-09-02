const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ROOT = require('./webpack.helper.js').root;

console.log('<- - -  DEVELOPMENT MODE - - ->');

module.exports = merge(common, {

    devtool: 'source-map',

    performance: {
        hints: false
    },

    entry: {
        'app': './src/main.ts'
    },

    output: {
        filename: 'dist/[name].bundle.js',
        chunkFilename: 'dist/[id].chunk.js'
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(ROOT, '/compiled/'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    module: {
        rules: [

            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular-router-loader', //to allow lazy loading modules
                    'angular2-template-loader',
                    'source-map-loader',
                    'tslint-loader'
                ]
            },

            {
                test: /\.scss$/,
                include: [
                    path.join(ROOT, 'src/app/scss'), 
                    path.join(ROOT, 'src/styles/')
                ],
                // Add stles to head html
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "sass-loader" // Sass to CSS
                    }
                ]
            }
        ],
    },

    plugins: []

});

