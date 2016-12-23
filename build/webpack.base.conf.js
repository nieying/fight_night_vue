var path = require('path'),
    config = require('../config'),
    webpack = require("webpack");

var projectRoot = path.resolve(__dirname, '../');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        vendor: ['vue', 'vue-router', 'vuex', 'fastclick', 'app-utils'],
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'asset': path.resolve(__dirname, '../src/asset'),
            'components': path.resolve(__dirname, '../src/components'),
            // 'vue': 'vue/dist/vue.js',
            // 'vue-resource':'vue-resource/dist/vue-resource.js',
            'app-utils': path.resolve(__dirname, '../src/common/utils')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10240'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader', 'css-loader?sourceMap!sass-loader!cssnext-loader')
            },
            {
                test: /\.css$/,
                loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions'
            }
        ]
    }
};
