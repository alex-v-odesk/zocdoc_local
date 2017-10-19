var Blob = require('canvas/blob');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var BaseView = require('app/abstract/baseView');
var BezierEasing = require('BezierEasing');

var SmartCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.canAnimate = false;

  BaseView.call(this, options, datas);

}

_.extend(SmartCanvasView, BaseView);
_.extend(SmartCanvasView.prototype, BaseView.prototype);

SmartCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.mainBlob = this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob;
  this.viewBlob = this.options.mainCanvasView.aCanvasAnimViews.start;
  this.$canvas = $('#main-canvas');

  BaseView.prototype.init.call(this);

}

SmartCanvasView.prototype.initTLShow = function () {

}

SmartCanvasView.prototype.animate = function () {

}

SmartCanvasView.prototype.show = function () {

  this.isAnimating = true;
  if (CV.scrollYDirection == 'DOWN') {

    var sBlob = this.mainBlob.getScale({w: 450}, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);

    var target = {
      width: this.mainBlob.path.bounds._width,
    };
    var s;

    TweenMax.to(target, 1, {
      width: CV.viewport.width * 4,
      height: CV.viewport.height * 4,
      ease: Expo.easeOut,
      onUpdate: (function () {

        s = this.mainBlob.getScale({w: target.width, h: target.height}, this.mainBlob.path);
        this.mainBlob.path.scale(s);

      }).bind(this),
      onComplete: (function () {

        this.isAnimating = false;
        this.trigger(EVENT.CANVAS_SHOWN);

      }).bind(this),
      delay: .05
    });

    this.mainBlob.path.position.y = -250;
    var targetY = {
      y: -250
    };

    TweenMax.to(targetY, 1, {
      y: CV.viewport.height / 2,
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.mainBlob.path.position.y = targetY.y;

      }).bind(this)
    });

  } else {
    this.trigger(EVENT.CANVAS_SHOWN);
  }
}

SmartCanvasView.prototype.initCanvas = function () {


  var sBlob = this.mainBlob.getScale({w: CV.viewport.width * 4, h: CV.viewport.height * 4}, this.mainBlob.path);
  this.mainBlob.path.scale(sBlob);
  this.mainBlob.path.position.y = CV.viewport.height / 2;
  this.mainBlob.path.fillColor = "#F1F1F9";

}

SmartCanvasView.prototype.hide = function () {

  if (CV.scrollYDirection == 'UP') {

    TweenMax.set(this.$canvas, {background: "#d5b5fb"});

    var target = {
      width: this.mainBlob.path.bounds._width,
    };

    var s;

    TweenMax.to(target, .9, {
      width: 450,
      ease: Expo.easeOut,
      delay: .05,
      onUpdate: (function () {

        s = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
        this.mainBlob.path.scale(s);

      }).bind(this)
    });

    this.mainBlob.path.position.y = CV.viewport.height / 2;

    var targetY = {
      y: CV.viewport.height / 2
    };

    TweenMax.to(targetY, .9, {
      y: -250,
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.mainBlob.path.position.y = targetY.y;

      }).bind(this),
      delay: .1,
      onComplete: (function () {

        this.isAnimating = false;
        this.trigger(EVENT.CANVAS_HIDDEN);

      }).bind(this)
    });

  }else{
    this.trigger(EVENT.CANVAS_HIDDEN);
  }

}

SmartCanvasView.prototype.onResize = function () {

}

module.exports = SmartCanvasView;
