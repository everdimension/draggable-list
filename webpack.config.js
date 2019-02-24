const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
// const isDevelopment = ENV === 'development';
const isProduction = ENV === 'production';

const buildNameSuffix = isProduction ? '.[hash]' : '';

module.exports = {
  mode: ENV,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `app.bundle${buildNameSuffix}.js`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        /**
         * linaria/loader extracts *styled css* part from ts/js files
         * into separate `.css` files, then this rule describes
         * how to handle these `.css` files.
         */
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false, // linaria/loader already creates scoped rules
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        /** Handle css imports from libs (from node_modules) */
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: `styles${buildNameSuffix}.css`,
      }),
    isProduction && new CopyPlugin([{ from: 'public' }]),
  ],
  stats: isProduction ? 'normal' : 'errors-only',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    stats: 'errors-only',
  },
};
