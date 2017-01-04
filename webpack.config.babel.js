import webpack from './node_modules/webpack';
import nodeExternals from './node_modules/webpack-node-externals';
import ExtractTextPlugin from './node_modules/extract-text-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
] : [];
const clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false }),
]) : [];

const commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

module.exports = [
  {
    entry: './src/server.js',
    output: {
      path: './dist',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
        },
      ].concat(commonLoaders),
    },
  },
  {
    entry: './src/browser.js',
    output: {
      path: './dist/assets',
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: clientLoaders.concat([
      new ExtractTextPlugin('index.css', {
        allChunks: true,
      }),
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
        /*
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass'),
        },
        */
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
  },
];
