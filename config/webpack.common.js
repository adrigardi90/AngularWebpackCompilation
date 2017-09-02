const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ROOT = require('./webpack.helper.js').root;

module.exports = {

    entry: {
        'polyfills': './src/polyfills.ts'
    },
    output: {
        path: ROOT + '/compiled/',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    module: {
        rules: [

            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                use: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },

            {
                test: /favicon.ico$/,
                use: 'file-loader?name=/[name].[ext]'
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

             //Rules for scss components files
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
                test: /\.html$/,
                use: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },

    plugins: [

        new CleanWebpackPlugin(
            [
                './compiled/dist',
                './compiled/assets',
                './compiled'
            ],
            { root: ROOT }
        ),

        //Common chunk modules
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'src/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './src/images/*.*', to: 'assets/', flatten: true }
        ])
    ]
};

