var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'renderer': './src/renderer.js'
  },
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: '[name]-bundle.js',
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
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src']
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
