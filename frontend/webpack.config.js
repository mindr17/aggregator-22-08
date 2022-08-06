const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const config = (env) => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: 'development',
    // entry: {
    //   index: './src/index.ts',
    // },
    module: {
      rules: [
        // {
        //   test: /\.s[ac]ss$/i,
        //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // },
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: "style-loader" },  // to inject the result into the DOM as a style block
            { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
            { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
            { loader: "sass-loader" },  // to convert SASS to CSS
          ],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          loader: "swc-loader",
        },
        {
          test: /\.(json)$/,
          type: 'asset/source',
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp|ico|xml)$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: true,
        chunks: ['index'],
        filename: 'index.html',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    output: {
      filename: '[name].[contenthash].bundle.js',
      assetModuleFilename: '[path]/[name][ext]',
      chunkFilename: '[id].[chunkhash].js',
      path: path.resolve(__dirname, 'dist/'),
      publicPath: 'auto',
      clean: true,
    },
  };
};

module.exports = config;
