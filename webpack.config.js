var path = require("path");
var webpack = require("webpack");
var entry=require('./entry');
module.exports = {
  entry: {
    'renderer': './src/renderer.js'
  },
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts', 'bundle'),
    filename: '[name]-bundle.js',
    publicPath: '/assets/bundle/'
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'js')
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.woff$/,
      loader: 'url-loader?prefix=font/&limit=5000'
    }, ]
  },
  resolve: {
    root: [path.join(__dirname, "vendor/assets/components")],
    alias: {
      ap: path.join(__dirname, 'fe', 'ap'),
      shared: path.join(__dirname, 'fe', 'ap', 'shared'),

    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('development')
       }
     })
  ]
};
