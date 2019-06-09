const path = require('path');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
    target: "web",
    entry: {
      app: ["./client/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: '/',
        filename: "bundle-front.js"
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
    devtool: 'inline-source-map',
};

const serverConfig = {
  target: "node",
  entry: {
    app: ["./server/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "./serverDist"),
    filename: "bundle-back.js"
  },
  externals: [nodeExternals()],
};

module.exports = [ serverConfig, clientConfig ];