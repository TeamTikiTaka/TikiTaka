const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client/index.tsx'),
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, './build'),
    },
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/assets/*': {
        target: 'http://localhost:3000',
        secure: false,
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Job Tracker App',
      template: './client/index.html',
    }),
  ], 
}