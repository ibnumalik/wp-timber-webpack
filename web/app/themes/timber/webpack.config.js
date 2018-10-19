const path = require('path');
const proxyUrl = 'bedrock.local';

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [
    './static/scripts/app.js',
    './static/styles/app.scss'
  ],

  output: {
    filename: 'dist/app.[hash].js',
    path: path.resolve(__dirname)
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/app.[hash].css'
    }),

    new CleanWebpackPlugin(['dist'], { watch: true }),

    new ManifestPlugin({
      fileName: path.resolve(__dirname, 'static/manifest.json')
    }),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3300,
      proxy: proxyUrl
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};