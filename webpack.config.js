require('dotenv/config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const DEBUG = process.env.DEBUG !== '0';

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'dev' : 'production'),
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.ejs'),
    filename: path.join(__dirname, 'dist', 'views', 'index.hbs'),
  }),
];

if (!DEBUG) {
  plugins.push(new webpack.HashedModuleIdsPlugin());
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = [
  {
    name: 'client',
    context: __dirname,
    entry: [
      ...(DEBUG ? ['webpack-hot-middleware/client?reload=true'] : []),
      './src/client',
    ],
    output: {
      filename: `js/[name].${DEBUG ? '' : '[contenthash].'}js`,
      path: path.join(__dirname, 'dist'),
      publicPath: '/static/',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: 'entry',
                  corejs: 2,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      ],
    },
    devtool: DEBUG ? 'eval-source-map' : 'nosources-source-map',
    optimization: DEBUG
      ? {}
      : {
          splitChunks: {
            chunks: 'all',
          },
          runtimeChunk: true,
        },
    mode: DEBUG ? 'development' : 'production',
    plugins,
  },
  {
    name: 'server',
    context: __dirname,
    target: 'node',
    entry: './src/app-middleware',
    output: {
      filename: 'server.js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/static/',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx'],
    },
    externals: [nodeExternals()],

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    node: 'current',
                  },
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      ],
    },
    devtool: DEBUG ? 'eval' : 'source-map',
    mode: DEBUG ? 'development' : 'production',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'dev' : 'production'),
      }),
    ],
  },
];
