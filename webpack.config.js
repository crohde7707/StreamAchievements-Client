const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

const clientConfig = {
    target: "web",
    entry: {
      app: ["./src/index"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: '/',
        filename: "bundle.[hash].js"
    },
    devServer: {
        host: '0.0.0.0', // Required for docker
        publicPath: '/assets/',
        contentBase: path.resolve(__dirname, "./dev"),
        watchContentBase: true,
        compress: true,
        port: 3000
    },
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

module.exports = clientConfig;