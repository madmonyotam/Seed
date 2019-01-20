const path = require('path');
const webpack = require('webpack');
const dependencies = Object.keys(require('./package.json').dependencies);
module.exports = {
    context: process.cwd(),
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css', '.scss'],
        modules: [__dirname, 'node_modules'],
        // exclude: ["font-awesome"]
    },

    entry: {
        library: dependencies
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './output/build'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, './output/build/[name].json')
        })
    ],
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                use: {
                        loader: "babel-loader"
                    }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']

            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                use: {
                    loader: 'imports-loader?define=>false&this=>window'
                }
            },
            {
                test: /.png$/,
                use: {
                    loader: "url-loader?mimetype=image/png"
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: "url-loader?limit=10000&minetype=application/font-woff"
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ["file-loader"]
            }
        ]
    },
    node: {
        fs: "empty"
    }
};