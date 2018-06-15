const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path');
const webpack = require('webpack');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  });

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader"
            }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                      },
                      {
                        loader: "css-loader",
                        // options: {
                        //   modules: true,
                        //   importLoaders: 1,
                        //   localIdentName: "[name]_[local]_[hash:base64]",
                        //   sourceMap: true,
                        //   minimize: true
                        // }
                      },
                      {
                          loader: "sass-loader"
                      }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true
    },
    plugins: [htmlPlugin,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true,
    target: "electron-renderer",
    externals:['fs', 'net', 'tls']
}
