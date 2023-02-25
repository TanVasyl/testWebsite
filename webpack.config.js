const HTMLWebPlug = require('html-webpack-plugin');
const {CleanWebPlug, CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config()
const Dotenv = require('dotenv-webpack')

const config = {
   
    entry: {
        app: './src/index.tsx',
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    devServer: {
        port: 3000,
        historyApiFallback: true

    },
    devtool: 'inline-source-map',
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                },
              },
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebPlug({
            template: './src/index.html'
        }),
        new Dotenv({
            path: "./.env",
            safe:true
        })
        
    ]
};

module.exports = config;