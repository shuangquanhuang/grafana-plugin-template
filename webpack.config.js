const webpack = require('webpack');
const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join(__dirname, 'src', isDevelopment ? 'index.js' : 'module.ts'),
  context: resolve(__dirname, './src'),
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDevelopment ? 'index.js' : 'module.js',
    libraryTarget: isDevelopment ? 'umd' : 'amd',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    http2: true,
    clientLogLevel: 'info',
    hot: isDevelopment,
  },
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|mp3|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    isDevelopment &&
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
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
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
  performance: {
    hints: false,
  },
};
