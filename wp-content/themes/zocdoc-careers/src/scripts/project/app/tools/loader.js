var Config = require('app/config/config');
var CV = require('app/config/currentValues');
var Tools = require('app/tools/tools');
var EVENT = require('app/events/events');

var Loader = function (assets, callback) {

  this.assetsImages = [];
  this.loadedAssets = 0;
  this.assetsAreLoaded = false;
  this.steps = [];

  this.assetsManager(assets, callback);


  Backbone.View.call(this);

}

_.extend(Loader, Backbone.View);
_.extend(Loader.prototype, Backbone.View.prototype);

//--------0 Default blob is an blob with color, gradient, text or image mask
Loader.prototype.assetsManager = function (assets, callback) {

  var perc = [];
  var img;

  _.each(assets, (function (step, i) {
    for (var i = step.first; i <= step.end; i++) {

      img = new Image;
      img.src = Config.folderPath + 'assets/images/' + step.path + '/' + step.name + i + step.format;
      this.steps.push(img.src);

      img.onload = (function () {

        this.loadedAssets++;
        perc = ( this.loadedAssets / assets.length ) * 100;
        if (perc == 100) {
          this.assetsAreLoaded = true;
          this.steps = [];
          if(callback)callback();
        }

      }).bind(this);

      img.onerror = (function () {

        console.log(img.src + "------------- ASSET LOAD ERROR")

      }).bind(this);

      if (i == step.end) {
        this.assetsImages.push(this.steps);
        this.steps = [];
      }
    }
  }).bind(this));

}

module.exports = Loader;