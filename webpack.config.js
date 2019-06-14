const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const htmlWebpackConfig = new htmlWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    target: "web",
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: __dirname + '/dist',
        filename: "bundle.[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    "plugins": [
                      "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devServer: {
        host: '0.0.0.0', // Required for docker
        publicPath: '/assets/',
        contentBase: path.resolve(__dirname, "./dev"),
        watchContentBase: true,
        compress: true,
        port: 3000
    },
    plugins: [ LodashModuleReplacementPlugin, htmlWebpackConfig ],
    optimization: {
      minimizer: [new uglifyJsPlugin({
        include: /\/src/,
        test: /\.js(\?.*)?$/i,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })]
    }
};