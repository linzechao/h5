// Basic
const path = require('path'),
    SRC = path.resolve(__dirname, 'src'),
    DIST = path.resolve(__dirname, 'dist');

// Webpack
let webpack = require('webpack'),
    htmlWebpackPlugin = require('html-webpack-plugin'),

    // Tools
    readSync = require(path.resolve(SRC, 'lib/readDir'));

// Path
const TEMPLATE = readSync.read(path.resolve(SRC, 'template')),
    ENTRY = readSync.read(path.resolve(SRC, 'script/js')),
    PAGES = [];

// Rerder
for (let key in TEMPLATE) {
    PAGES.push(new htmlWebpackPlugin({
        filename: TEMPLATE[key].split('template/')[1],
        template: TEMPLATE[key],
        inject: 'head',
        chunks: ['common', key],
    }));
}

// Config
module.exports = {
    entry: ENTRY,

    output: {
        path: path.resolve(__dirname, DIST),
        // publicPath: '/assets/',
        filename: 'js/[name].js',
    },

    // 模块
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name]-[hash:5].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                // 包含范围
                include: [
                    SRC,
                    DIST
                ],
                // 忽略范围
                exclude: path.resolve(__dirname, 'node_modules'),
                // 解析该标准下的语法
                query: {
                    presets: ['env']
                }
            }
        ]
    },

    // 插件
    plugins: [
        new webpack.BannerPlugin('@author: MR.Super!')
    ].concat(PAGES),

    // 设置引入路径
    resolve: {
        alias: {
            src: SRC,
            view: 'src/view',
            js: 'src/script/js',
            scss: 'src/style/scss',
            components: 'src/components',
            images: 'src/assets/images',
            fonts: 'src/assets/fonts'
        }
    }
};

