var path = require('path');
var webpack = require('webpack');
var getConfig = require('hjs-webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path     = require('path'),
    join     = path.join,
    resolve  = path.resolve;

var NODE_ENV = process.env.NODE_ENV;
var isDev    = (NODE_ENV === 'development');
var root     = resolve(__dirname);
var src      = join(root, 'src');
var dest     = join(root, 'dist');

var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        title: 'eSpeakers Test',
        publicPath: isDev ? 'http://localhost:3000/' : '',
        meta: {
          'name': 'eSpeakers',
          'description': 'eSpeakers test'
        },
        head: '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />',
      })
    }
  }
});

config.resolve.modulesDirectories = ['src', 'node_modules'];

module.exports = config;
