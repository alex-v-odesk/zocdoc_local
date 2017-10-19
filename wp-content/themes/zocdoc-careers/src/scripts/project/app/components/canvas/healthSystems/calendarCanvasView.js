var Blob = require('canvas/blob');
var CV = require('app/config/currentValues');
var BaseView = require('app/abstract/baseView');
var Tools = require('app/tools/tools');
var EVENT = require('app/events/events');
var BezierEasing = require('BezierEasing');

var CalendarCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;

  this.indexFirstStep = 0;
  this.indexSecondStep = 0;
  this.indexThirdStep = 0;
  this.currentStep = -1;
  this.rasters = [];
  this.rastersObj = [];
  this.hImg = 915;
  this.scale = (CV.viewport.height * .5) / this.hImg;
  this.callbackEnd = null;
  this.name = 'calendarCanvas';

  BaseView.call(this, options, datas);

}

_.extend(CalendarCanvasView, BaseView);
_.extend(CalendarCanvasView.prototype, BaseView.prototype);

CalendarCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.mainBlob = this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob;
  this.$canvas = this.options.mainView.$canvas;

  this.rastersFirstStep = [];
  this.generateImages(this.options.mainView.loader.assetsImages[0], this.rastersFirstStep, 0);

  this.rastersSecondStep = [];
  this.generateImages(this.options.mainView.loader.assetsImages[1], this.rastersSecondStep, 0);

  this.rastersThirdStep = [];
  this.generateImages(this.options.mainView.loader.assetsImages[2], this.rastersThirdStep, 0);

  BaseView.prototype.init.call(this);

}

CalendarCanvasView.prototype.animate = function () {

  if (this.mainView.currentStepIndex < 1 && !this.isTransition) {

    if (this.mainBlob.path.bounds._width != CV.viewport.width * 3 || this.mainBlob.path.position.y != CV.viewport.height / 2 || this.mainBlob.path.position.x != CV.viewport.width / 2) {

      var s = this.mainBlob.getScale({w: CV.viewport.width * 3}, this.mainBlob.path);
      this.mainBlob.path.scale(s);

      this.mainBlob.path.position.y = CV.viewport.height / 2;
      this.mainBlob.path.position.x = CV.viewport.width / 2;

    }

    //if (this.mainView.currentStepIndex < 1 && this.mainBlob.path.fillColor._components[1].toFixed(2) != "0.40" && this.mainBlob.path.fillColor._components[0].toFixed(2) != "0.98") this.mainBlob.path.fillColor = "#fa6876";

  }

}

CalendarCanvasView.prototype.generateImages = function (assets, rasters, y) {

  var raster;
  var yImg = CV.viewport.height / 2 + (this.hImg * this.scale) / 2;
  var xImg = CV.viewport.width / 2;

  this.rasters.push(_.each(assets, (function (image, i) {

    raster = new paper.Raster(image);
    if (!this.isResize)raster.visible = false;
    raster.scale(this.scale);
    raster.position = new paper.Point(xImg, yImg);
    rasters.push(raster);

  }).bind(this)));

  this.rastersObj.push(rasters);

}

CalendarCanvasView.prototype.reset = function () {

  _.each(this.rastersObj, (function (rasters) {

    _.each(rasters, (function (raster) {

      raster.visible = false;

    }).bind(this));

  }).bind(this));


}

CalendarCanvasView.prototype.show = function () {

  // if (this.mainCanvasView.oldCanvasAnimView.name !== 'startCanvas') {
  //   console.log('CalendarCanvasView: this.mainBlob.path.opacity = 0;');
  //   this.mainCanvasView.oldCanvasAnimView.mainBlob.path.opacity = 0;
  // }

  this.mainBlob.path.fillColor = '#fa6876';

  document.body.style.cursor = "default";

  this.indexFirstStep = 0;
  this.indexSecondStep = 0;
  this.indexThirdStep = 0;

  this.rastersThirdStep[this.rastersThirdStep.length - 1].visible = false;
  this.rastersThirdStep[this.rastersThirdStep.length - 1].opacity = 1;
  this.rastersThirdStep[this.rastersThirdStep.length - 1].position.y = CV.viewport.height / 2 + (this.hImg * this.scale) / 2;

  this.rastersFirstStep[0] = new paper.Raster(this.options.mainView.loader.assetsImages[0][0]);

  this.rastersFirstStep[0].scale((CV.viewport.height * .5) / 915);
  this.rastersFirstStep[0].visible = true;
  this.rastersFirstStep[0].opacity = 0;

  this.rastersFirstStep[0].position.x = CV.viewport.width / 2;
  this.rastersFirstStep[0].position.y = CV.viewport.height / 2 + (this.hImg * this.scale) / 2 + 100;

  var target = {
    opacity: 0,
    y: this.rastersFirstStep[0].position.y,
    color: Tools.rgbToHex(this.mainBlob.path.fillColor.red * 255, this.mainBlob.path.fillColor.green * 255, this.mainBlob.path.fillColor.blue * 255)
  };

  TweenMax.to(target, .5, {
    opacity: 1,
    y: this.rastersFirstStep[0].position.y - 100,
    ease: Expo.easeOut,
    onUpdate: (function () {

      this.rastersFirstStep[0].opacity = target.opacity;
      this.rastersFirstStep[0].position.y = target.y;
      this.mainBlob.path.opacity = 1;
      this.mainBlob.path.fillColor = target.color;
      //if (this.mainView.currentStepIndex < 1 && this.mainBlob.path.fillColor._components[1].toFixed(2) != "0.40" && this.mainBlob.path.fillColor._components[0].toFixed(2) != "0.98") this.mainBlob.path.fillColor = "#fa6876";

    }).bind(this),
    onComplete: (function () {

      this.trigger(EVENT.CANVAS_SHOWN);
      this.options.mainView.goToNextSection();
      this.canAnimate = true;
      this.isTransition = false;
      //if (this.mainView.currentStepIndex < 1 && this.mainBlob.path.fillColor._components[1].toFixed(2) != "0.40" && this.mainBlob.path.fillColor._components[0].toFixed(2) != "0.98") this.mainBlob.path.fillColor = "#fa6876";

    }).bind(this)
  });

  if (CV.scrollYDirection == "DOWN") {

    this.options.mainCanvasView.aCanvasAnimViews.start.isAnimating = true;
    this.options.mainCanvasView.aCanvasAnimViews.start.canAnimate = false;
    this.mainBlob.path.position.y = -400;

    var targetBlob = {
      x: this.mainBlob.path.position.x,
      y: -250
    };

    TweenMax.to(targetBlob, .6, {
      x: CV.viewport.width / 2,
      y: CV.viewport.height / 2,
      onUpdate: (function () {

        //if (this.mainView.currentStepIndex < 1 && this.mainBlob.path.fillColor._components[1].toFixed(2) != "0.40" && this.mainBlob.path.fillColor._components[0].toFixed(2) != "0.98") this.mainBlob.path.fillColor = "#fa6876";
        this.mainBlob.path.position.x = targetBlob.x;
        this.mainBlob.path.position.y = targetBlob.y;

      }).bind(this),
      ease: Cubic.easeOut
    });

    var targetSBlob = {
      width: this.mainBlob.path.bounds.width,
      height: this.mainBlob.path.bounds.height
    };
    var sBlob;

    TweenMax.to(targetSBlob, .6, {
      width: CV.viewport.width * 4,
      height: CV.viewport.height * 4,
      onUpdate: (function () {

        sBlob = this.mainBlob.getScale({w: targetSBlob.width, h: targetSBlob.height}, this.mainBlob.path);
        this.mainBlob.path.scale(sBlob);

      }).bind(this),
      onComplete: (function () {

        this.mainBlob.path.position = this.paper.view.center;

        this.mainBlob.generateSettingsPoints();

        this.options.mainCanvasView.aCanvasAnimViews.start.isAnimating = false;
        this.options.mainCanvasView.aCanvasAnimViews.start.canAnimate = true;
        this.isTransition = false;

        this.trigger(EVENT.CANVAS_SHOWN);

      }).bind(this),
      ease: Cubic.easeOut
    });
  }

}

CalendarCanvasView.prototype.hide = function () {

  this.rastersFirstStep[0].visible = false;
  this.rastersSecondStep[0].visible = false;
  this.rastersThirdStep[0].visible = false;
  this.rastersFirstStep[this.rastersFirstStep.length - 1].visible = false;
  this.rastersSecondStep[this.rastersSecondStep.length - 1].visible = false;
  this.rastersThirdStep[this.rastersThirdStep.length - 1].visible = false;

  this.isAnimating = true;
  this.isTransition = true

  if (CV.scrollYDirection == 'DOWN') {

    var target = {
      opacity: 1,
      y: this.paper.view.size.height / 2
    };

    TweenMax.to(target, .5, {
      opacity: 0,
      y: CV.viewport.height / 2 + 100,
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.rastersFirstStep[0].opacity = target.opacity;
        this.rastersFirstStep[0].position.y = target.y;

      }).bind(this),
      onComplete: (function () {

        this.rastersFirstStep[0].opacity = 0;
        this.reset();
        this.trigger(EVENT.CANVAS_HIDDEN);

      }).bind(this)
    });

    // this.options.mainCanvasView.aCanvasAnimViews.start.isAnimating = true;
    // this.options.mainCanvasView.aCanvasAnimViews.start.canAnimate = false;
    //
    // var targetBlob = {
    //   width: this.mainBlob.path.bounds.width,
    //   x: this.mainBlob.path.position.x,
    //   y: this.mainBlob.path.position.y
    // };
    // var s;
    //
    // this.mainBlob.path.position = this.paper.view.center;
    // var wBlob;
    // if (CV.viewport.width > 1500) {
    //   wBlob = 450;
    // }
    // else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
    //   wBlob = 350;
    // }
    // else {
    //   wBlob = 250;
    // }
    //
    // TweenMax.to(targetBlob, .6, {
    //   width: wBlob,
    //   x: CV.viewport.width / 2,
    //   y: CV.viewport.height / 2,
    //   onUpdate: (function () {
    //
    //     s = this.mainBlob.getScale({w: targetBlob.width}, this.mainBlob.path);
    //     this.mainBlob.path.scale(s);
    //
    //     this.mainBlob.path.position.x = targetBlob.x;
    //     this.mainBlob.path.position.y = targetBlob.y;
    //
    //     //this.mainBlob.path.rotate(-1);
    //
    //   }).bind(this),
    //   onComplete: (function () {
    //
    //     this.mainBlob.path.position = this.paper.view.center;
    //
    //     this.mainBlob.generateSettingsPoints();
    //
    //     this.options.mainCanvasView.aCanvasAnimViews.start.isAnimating = false;
    //     this.options.mainCanvasView.aCanvasAnimViews.start.canAnimate = true;
    //
    //     this.trigger(EVENT.CANVAS_HIDDEN);
    //
    //   }).bind(this),
    //   ease: Cubic.easeOut
    // });
  }
  else {

    this.mainBlob.canAnimate = false;
    var rasterBlock = this.rastersThirdStep[this.rastersThirdStep.length - 1];

    var raster = {
      opacity: 1
    };

    TweenMax.to(raster, .2, {
      opacity: 0,
      delay: .15,
      ease: Expo.easeOut,
      onUpdate: (function () {

        rasterBlock.opacity = raster.opacity;

      }).bind(this)
    });

    var rasterY = {
      y: 0
    };

    TweenMax.to(rasterY, .3, {
      y: 200,
      ease: Expo.easeOut,
      delay: .15,
      onUpdate: (function () {

        rasterBlock.position.y = CV.viewport.height / 2 - rasterY.y;

      }).bind(this)
    });

    var target = {
      width: this.mainBlob.path.bounds._width,
    };
    var s;
    TweenMax.to(target, 1.5, {
      width: CV.viewport.width * .7,
      ease: Expo.easeOut,
      delay: .15,
      onUpdate: (function () {

        s = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
        this.mainBlob.path.scale(s);

      }).bind(this),
      onComplete: (function () {

        this.mainBlob.generateSettingsPoints();
        this.isTransition = false;

      }).bind(this)
    });

    var targetY = {
      y: this.mainBlob.path.position.y
    };

    TweenMax.to(targetY, 2, {
      y: -this.mainBlob.path.bounds._height,
      ease: Power4.easeInt,
      delay: .15,
      onUpdate: (function () {

        this.mainBlob.path.position.y = targetY.y;

        return;
        this.rastersFirstStep[this.indexFirstStep].visibile = false;
        this.rastersSecondStep[this.indexSecondStep].visibile = false;
        this.rastersThirdStep[this.indexThirdStep].visibile = false;

        this.reset();

      }).bind(this)
    });

    setTimeout((function () {
      this.trigger(EVENT.CANVAS_HIDDEN);
    }).bind(this), 250)
  }

}

CalendarCanvasView.prototype.manageStep = function (state, target, i, color, callback) {

  this.rasterStep = this["rasters" + target];

  this["index" + target] = this["index" + target] - state;
  this.indexStep = this["index" + target];

  if (this.rasterStep[this.indexStep])this.rasterStep[this.indexStep].visible = true;
  if (this.rasterStep[this.indexStep + state]) this.rasterStep[this.indexStep + state].visible = false;

  if (color) this.mainBlob.path.fillColor = color;

  if (this.indexStep < this.rasterStep.length - 1 && this.indexStep > 0) {
    setTimeout(
        (function () {
          this.manageStep(state, target, i, color, callback);
        }).bind(this), 25);
  }
  else {

    if (CV.scrollYDirection == "DOWN" && i == 0)this.mainView.goToPreviousSection();
    callback();

  }

}

CalendarCanvasView.prototype.onResize = function () {


  this.mainBlob.onResize();

  this.hImg = this.scale * this.hImg;
  this.scale = (CV.viewport.height * .5) / this.hImg;
  var yImg = CV.viewport.height / 2 + (this.hImg * this.scale) / 2;
  var xImg = CV.viewport.width / 2;

  _.each(this.rastersFirstStep, (function (raster) {

    raster.position.y = yImg;
    raster.position.x = xImg;
    raster.scale(this.scale);

  }).bind(this));

  _.each(this.rastersSecondStep, (function (raster) {

    raster.position.y = yImg;
    raster.position.x = xImg;
    raster.scale(this.scale);

  }).bind(this));

  _.each(this.rastersThirdStep, (function (raster) {

    raster.position.y = yImg;
    raster.position.x = xImg;
    raster.scale(this.scale);

  }).bind(this));

  if (this.isShown) {

    var s = this.mainBlob.getScale({w: CV.viewport.height * 3}, this.mainBlob.path);
    this.mainBlob.path.scale(s);

  }


}

module.exports = CalendarCanvasView;
