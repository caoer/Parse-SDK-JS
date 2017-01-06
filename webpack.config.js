var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  entry: {
    'parse-rn': path.join(__dirname, 'lib/react-native/Parse.js')
  },
  externals: [
    
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: /src/,
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  }
};