const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        use: [{ loader: 'babel-loader' }, { loader: 'astroturf/loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  stats: isProduction ? 'normal' : 'errors-only',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    stats: 'errors-only',
  },
};
