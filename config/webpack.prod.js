const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = path.resolve(__dirname, '..');

console.log('<- - -  PRODUCTION MODE - - ->');

module.exports = {

    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main-aot.ts' // AoT compilation
    },

    output: {
        path: ROOT + '/compiled/',
        filename: 'dist/[name].[hash].bundle.js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(ROOT, 'compiled/')
    },

    module: {
        rules: [

            {
                test: /\.ts$/,
                use: '@ngtools/webpack'
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

            // Rules for generic scss 
            {
                test: /\.scss$/,
                //scss files
                include: [
                    path.join(ROOT, 'src/app/scss'), 
                    path.join(ROOT, 'src/styles/')
                ],

                // join styles in one css separate file
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader", // use style-loader in development
                    use: [
                        'css-loader?sourceMap', //css 
                        'sass-loader?sourceMap' //sass to Css
                    ]
                })
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

        // AoT plugin.
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig-aot.json'
        }),

        new CleanWebpackPlugin(
            [
                './compiled/dist',
                './compiled/assets',
                './compiled'
            ],
            { root: ROOT }
        ),

        new webpack.NoEmitOnErrorsPlugin(),

        //Tree Shaking
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),

        //Common chunk modules
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'src/index.html'
        }),

        //Styles pluging
        new ExtractTextPlugin('[name].[contenthash].css'),

        new CopyWebpackPlugin([
            { from: './src/images/*.*', to: 'assets/', flatten: true }
        ])
    ]
};

