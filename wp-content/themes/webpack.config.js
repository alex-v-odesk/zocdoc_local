var path = require('path');
var webpack = require('webpack');
var appEntryPoint = './src/scripts/project/main.js';
var includePath = path.join(__dirname, 'src/scripts');
//var nodeModulesPath = path.join(__dirname, 'node_modules');
var outputPath = __dirname + '/js/';
//var vendorPath = path.join(__dirname, '/vendors');
var devTool = 'source-map';

var PROD = JSON.parse(process.env.ENV_PROD || 0);

// variables shared
var env = {
  prod: PROD
};

var plugins = [
  // Avoid publishing files when compilation failed
  new webpack.NoErrorsPlugin()
];

var filename = 'bundle.js';

if (PROD) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: true,
      compress: {
        drop_console: true
      },
      output: {
        comments: false
      }
    })
  );

  outputPath = __dirname + '/js/';

  filename = 'bundle.min.js';

  devTool = null;

  console.log('\n ---- WEBPACK ----\n \n running in production \n');

} else {

  console.log('\n ---- WEBPACK ---- \n \n running in development \n');

}

console.log(' running webpack in ' + __dirname);
console.log(' filename: ' + filename);
console.log(' devTool: ' + devTool);
console.log(' include path ' + includePath);
console.log(' outputPath path ' + outputPath + '\n');

var entryPoints = appEntryPoint;

plugins.push(new webpack.DefinePlugin({
  ENV: JSON.stringify(env)
}));


//This plugin makes a module available as variable in every module.
plugins.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  _: 'underscore',
  lethargy:'Lethargy',
  Backbone: 'backbone',
  gsap: 'gsap',
  paper: 'paper',
}));


module.exports = {

  /*
   http://webpack.github.io/docs/configuration.html

   ENTRY
   If you pass a string: The string is resolved to a module which is loaded upon startup.
   If you pass an array: All modules are loaded upon startup. The last one is exported.
   If you pass an object: Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.
   */
  node: {
    fs: 'empty'
  },
  // context: './src/js',
  // context: includePath,

  entry: entryPoints,

  // if multiple outputs, use [name] and it will use the name of the entry point, and loop through them
  output: {
    path: outputPath,
    filename: filename,
    publicPath: 'assets/js/'
  },

  plugins: plugins,

  // make 'zepto' resolve to your local copy of the library
  // i. e. through the resolve.alias option
  // will be included in the bundle, no need to add and load vendor
  resolve: {
    alias: {
      'jquery': includePath + '/vendors/zepto',
      'zepto': 'jquery',
      'Detectizr': includePath + '/vendors/detectizr',
      'Lethargy': includePath + '/vendors/lethargy',
      'ScrollTo': __dirname + '/node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin',
      'BezierEasing': __dirname + '/node_modules/bezier-easing/dist/bezier-easing.min',
      'canvas': __dirname + '/src/scripts/project/app/components/canvas',
      'abstract': __dirname + '/src/scripts/project/app/abstract',
      'config': __dirname + '/src/scripts/project/app/abstract',
      'app': __dirname + '/src/scripts/project/app',
      'lazy': includePath + '/vendors/lazyLoad'
    }
  },

  module: {
    loaders: [
      {test: /zepto\.js$/, loader: 'exports?Zepto; delete window.$; delete window.Zepto;'},
      {test: /detectizr\.js$/, loader: 'imports?this=>window!exports?window.Detectizr;'},
    ]
  },

  stats: {
    // Nice colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: devTool

};
