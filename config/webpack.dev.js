const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = path.resolve(__dirname, '..');

console.log('<- - -  DEVELOPMENT MODE - - ->');

module.exports = {

    devtool: 'source-map',

    performance: {
        hints: false
    },

    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
    },

    output: {
        path: ROOT + '/compiled/',
        filename: 'dist/[name].bundle.js',
        chunkFilename: 'dist/[id].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
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
            },

           {
                test: /\.scss$/,
                exclude: [path.join(ROOT, 'src/app/scss'),
                        path.join(ROOT, 'src/styles/')],
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

        new webpack.optimize.CommonsChunkPlugin({ 
            name: ['vendor', 'polyfills'] 
        }),

        new CleanWebpackPlugin(
            [
                './compiled/dist',
                './compiled/assets',
                './compiled'
            ],
            { root: ROOT }
        ),

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

