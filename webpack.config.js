const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log('resolve folder', path.resolve(__dirname, 'src'));

module.exports = {
    entry: path.join(__dirname, 'src', 'module.ts'),
    context: resolve(__dirname, './src'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'module.js',
        libraryTarget: 'amd',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: { contentBase: path.join(__dirname, 'src') },
    module: {
        rules: [
            { parser: { system: false } },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new CopyWebpackPlugin([
            { from: 'plugin.json' },
            { from: '../README.md' },
            { from: 'css/*' },
            { from: '*/*.html' },
            { from: 'assets/*' },
        ]),
    ],
    externals: [
        '@grafana/data',
        '@grafana/ui',
        function (context, request, callback) {
            var prefix = 'grafana/';
            if (request.indexOf(prefix) === 0) {
                return callback(null, request.substr(prefix.length));
            }
            callback();
        },
    ],
};
