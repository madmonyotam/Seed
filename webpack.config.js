const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const Jarvis = require("webpack-jarvis");
const sourceFolder = path.join(__dirname, 'source');
const entry = path.resolve(__dirname, 'source/App.jsx');
const VERSION = 1;

const publicPath = '/output/';
const outputPath = path.join(__dirname, 'output');
const buildPath = path.join(outputPath, 'build');

module.exports = function (env) {
    let vars = env || {
        "version": VERSION,
        "hot": false
    };
    console.info("Building SimpleCore Template application. Version:", vars.version);
    let config = {
        entry: entry,
        output: {
            path: buildPath,
            filename: '[name].bundle.js?v=[chunkhash:4]',
            publicPath: publicPath

        },
        optimization: {
            splitChunks: {
                chunks: "async",
                minSize: 5000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            }
        },

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
        resolve: {
            modules: [
                "node_modules",
                "node_modules.modified",
                sourceFolder // treat the 'source' directory like node_modules
            ],
            alias: {
                "ag-grid-root": __dirname + "/node_modules/ag-grid",
                "resources": __dirname + "/resources"
            }
        },

        watchOptions: {
            ignored: /node_modules/
        },

        plugins: [
            new HtmlWebPackPlugin({
                title: "SimpleSwitch",
                rootUri: "/",
                version: vars.version,
                minify: true,
                cache: true,
                showErrors: true,
                filename: path.resolve(__dirname, './index.html'),
                inject: false,
                template: path.resolve(__dirname, './index.ejs'), // Load a custom template (ejs by default see the FAQ for details)
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./output/build/library.json')
            })
        ]
    }

    if(vars.hot) {
        config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
        config.devServer = {
            hot: true,
            contentBase: __dirname,  // match the output path
            publicPath: publicPath,   // match the output `publicPath`
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            // clientLogLevel: 'none'
        };

        config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    }
    return config;
};
