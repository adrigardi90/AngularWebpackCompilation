const path = require('path');
const webpack = require('webpack');
const ngToolsWebpack = require('@ngtools/webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ROOT = require('./webpack.helper.js').root;

console.log('<- - -  PRODUCTION MODE - - ->');

module.exports = merge(common, {

    entry: {
        'app': './src/main-aot.ts' // AoT compilation
    },

    output: {
        filename: 'dist/[name].[hash].bundle.js',
        chunkFilename: 'dist/[id].[hash].chunk.js'
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
            }
        ],
    },

    plugins: [

        // AoT plugin.
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig-aot.json'
        }),

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

        //Styles pluging
        new ExtractTextPlugin('[name].[contenthash].css'),

    ]
});

