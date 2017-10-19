var Blob = require('canvas/blob');
var BaseView = require('app/abstract/baseView');
var EVENT = require('app/events/events');
var Tools = require('app/tools/tools');
var CV = require('app/config/currentValues');

var StartCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.isAnimating = false;
  this.indexLoader = 0;
  this.rasters = [];
  this.isShown = false;
  this.name = 'startCanvas';

  this.scale = CV.isMobile ? 640 / CV.viewport.height * .3 : 640 / CV.viewport.height * .7;

  BaseView.call(this, options, datas);

}

_.extend(StartCanvasView, BaseView);
_.extend(StartCanvasView.prototype, BaseView.prototype);

StartCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.itemsPosition = [];

  this.mainBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    color: '#fa6876',
    position: {
      x: 'CV.viewport.width / 2',
      y: 'CV.viewport.height / 2'
    },
    size: {
      w: 'CV.viewport.width * 4',
      maxW: 'CV.viewport.height * 4'
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    orbit: {
      h: 2,
      w: 2
    },
    rotate: 135
  });

  this.rastersLoader = [];

  BaseView.prototype.init.call(this);

}

StartCanvasView.prototype.initTL = function () {

  this.initTLShow();

  BaseView.prototype.initTL.call(this);
}

StartCanvasView.prototype.initTLShow = function () {

    this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

    //this.mainBlob.path.fillColor = '#fa6876';
    //this.mainBlob.canAnimate = false;

    //var s;

    //this.mainBlob.path.fillColor = this.mainBlob.blobColor;

    // this.mainBlob.path.visible = true;
    // this.mainBlob.path.opacity = 1;
    //
    // this.mainBlob.path.position.y = CV.viewport.height / 2;
    // this.mainBlob.path.position.x = CV.viewport.width / 2;
    //
    // s = this.mainBlob.getScale({w: CV.viewport.width * 4, h: CV.viewport.height * 4}, this.mainBlob.path);
    // this.mainBlob.path.scale(s);

    var target = {
      width: this.mainBlob.path.bounds._width,
      x: this.mainBlob.path.position.x,
      y: this.mainBlob.path.position.y,
      color: Tools.rgbToHex(this.mainBlob.path.fillColor.red * 255, this.mainBlob.path.fillColor.green * 255, this.mainBlob.path.fillColor.blue * 255),
      opacity: this.mainBlob.path.opacity
    };

    if (CV.viewport.width > 1500) {
      var wBlob = 450;
    } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var wBlob = 350;
    } else {
      var wBlob = 250;
    }

    this.TL.show.to(target, 0.8, {
      width: wBlob,
      x : CV.viewport.width / 2,
      y : CV.viewport.height / 2,
      color: "#fa6876",
      opacity: 1,
      onUpdate: (function () {

        var s = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
        this.mainBlob.path.scale(s);

        this.mainBlob.path.fillColor = target.color;
        this.mainBlob.path.position.y = target.y;
        this.mainBlob.path.position.x = target.x;
        this.mainBlob.path.opacity = target.opacity;


      }).bind(this),
      ease: Power4.easeOut
    }, 0);


}

StartCanvasView.prototype.show = function () {

  if (this.TL.show) this.killTL('show');
  this.initTLShow();

  this.mainBlob.canAnimate = false;

  TweenMax.set(this.mainView.$canvas, {zIndex: 2});

  if (this.isAnimating) return;
  //this.isAnimating = true;

  if (this.TL.show) this.TL.show.play(0);

  // if (CV.scrollYDirection == "UP" || this.mainCanvasView.oldCanvasAnimView.id == "contact") {
  //
  //   this.isAnimating = true;
  //
  //   if (this.TL.show) this.TL.show.play(0);
  //
  // }
  // else {
  //   this.trigger(EVENT.CANVAS_SHOWN);
  // }

}

StartCanvasView.prototype.onShown = function () {

  this.mainBlob.generateSettingsPoints();
  this.canAnimate = true;
  this.mainBlob.canAnimate = true;
  this.isAnimating = false;
  this.isShown = true;
  this.trigger(EVENT.CANVAS_SHOWN);

  // if (this.TL.hide) this.killTL('hide');
  // this.initTLHide();

}

StartCanvasView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  var target = {
    width: this.mainBlob.path.bounds._width,
  };

  this.TL.hide.to(target, .7, {
    width: CV.viewport.width * 4,
    ease: Power4.easeInOut,

    onUpdate: (function () {

      var scale = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
      this.mainBlob.path.scale(scale);

      //this.mainBlob.path.rotate(1);

    }).bind(this)
  });

}

StartCanvasView.prototype.hide = function () {

  if (this.TL.hide) this.killTL('hide');
  this.initTLHide();

  if (this.isAnimating) return;

  this.mainBlob.canAnimate = false;

  if (this.TL.hide) this.TL.hide.play(0);

}

StartCanvasView.prototype.onHidden = function () {

  this.mainBlob.generateSettingsPoints();
  this.isShown = false;

  this.trigger(EVENT.CANVAS_HIDDEN);

}

StartCanvasView.prototype.onResize = function () {

  if (!this.isShown) return;

  this.mainBlob.onResize();

  if (CV.viewport.width > 1500) {
    var wBlob = this.mainBlob.getScale({w: 450}, this.mainBlob.path);
  }
  else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
    var wBlob = this.mainBlob.getScale({w: 350}, this.mainBlob.path);
  }
  else {
    var wBlob = this.mainBlob.getScale({w: 250}, this.mainBlob.path);
  }

  this.mainBlob.path.scale(wBlob);

  this.mainBlob.path.position.x = CV.viewport.width / 2;
  this.mainBlob.path.position.y = CV.viewport.height / 2;

}

StartCanvasView.prototype.hideZee = function (callback) {

  var rasterTarget = {
    opacity: 1,
    width: 640 / CV.viewport.height / 2
  }

  TweenMax.to(rasterTarget, .3, {
    opacity: 0,
    width: 320 / window.innerHeight / 2,
    delay: 0.1,
    onUpdate: (function () {

      this.rastersLoader[this.rastersLoader.length - 1].opacity = rasterTarget.opacity;

    }).bind(this),
    onComplete: (function () {

      callback();

    }).bind(this)
  });

}

StartCanvasView.prototype.manageStep = function (state, target, i, callback) {

  this.rasterStep = this["rasters" + target];

  this["index" + target] = this["index" + target] - state;
  this.indexStep = this["index" + target];

  this.rasterStep[this.indexStep].visible = true;

  if (this.rasterStep[this.indexStep + state]) this.rasterStep[this.indexStep + state].visible = false;

  if (this.indexStep < this.rasterStep.length - 1 && this.indexStep > 0) {
    setTimeout(
        (function () {
          this.manageStep(state, target, i, callback);
        }).bind(this), 25);
  }
  else {
    callback();
  }

}

StartCanvasView.prototype.generateImages = function (assets, rasters, y, callback) {

  var raster;
  // var start = Date.now();
  // var cpt = 0;
  // console.log('generateImge: start');
  this.rasters.push(_.each(assets, (function (image) {

    raster = new paper.Raster(image);
    raster.visible = false;
    raster.position = new paper.Point(this.paper.view.size.width / 2, this.paper.view.size.height / 2 + y);
    raster.scale(this.scale);
    rasters.push(raster);

    // cpt++;
    // if (cpt === assets.length - 1) {
    //   console.log('generateImge: end each loop', Date.now() - start);
    // }

  }).bind(this)));

  // console.log("this.rasters",this.rasters);
  //
  // console.log('generateImge: callback', Date.now() - start);
  callback();

}

StartCanvasView.prototype.animate = function (e) {

  if (this.canAnimate)this.mainBlob.animate(e);

}

module.exports = StartCanvasView;
