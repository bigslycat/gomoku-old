'use strict';

const webpack = require('webpack');
const PolyfillServicePlugin = require('polyfill-service-webpack');

const babel = {
  loader: 'babel',
  query: {
    presets: [
      'latest',
      'stage-0',
      'react',
    ],
    plugins: [
      'transform-class-properties',
      'transform-react-jsx',
    ],
    env: { BABEL_DISABLE_CACHE: 1 },
  },
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const options = {
  output: { filename: 'app.js' },
  resolve: { extensions: ['', '.js', '.jsx'] },
  module: { loaders: [babel] },
  target: 'web',
  plugins: [

    new PolyfillServicePlugin({
      minify: true,
      callback: 'onPolyfillsLoaded',
      defaultFeatures: {},
      flags: [],
      libVersion: '>0.0.0',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),

    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),

  ],
  devtool: '#source-map',
};

switch (process.env.NODE_ENV) {
  case 'production': {
    options.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }));
    break;
  }

  // no default
}

module.exports = options;
