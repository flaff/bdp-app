/**
 * Base webpack config used across other specific configs
 */
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const {
  dependencies: externals
} = require('./app/package.json');

module.exports = {
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['react-hot-loader/webpack', 'ts-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    },
        // { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
      alias: {
        '@components': path.resolve(__dirname, 'app/components'),
        '@state': path.resolve(__dirname, 'app/state'),
        '@api': path.resolve(__dirname, 'app/api'),
      }
  },

  plugins: [
      new CopyWebpackPlugin([
          {
              from: 'node_modules/monaco-editor/min/vs',
              to: 'vs',
          }
      ])
  ],

  externals: Object.keys(externals || {
      nodegit: 'commonjs nodegit'
      // 'monaco-editor': 'commonjs monaco-editor'
  })
};
