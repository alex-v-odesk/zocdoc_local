var Blob = require('canvas/blob');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var BaseView = require('app/abstract/baseView');
var BezierEasing = require('BezierEasing');

var ContactCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.canAnimate = false;

  this.id = 'contact';

  BaseView.call(this, options, datas);

}

_.extend(ContactCanvasView, BaseView);
_.extend(ContactCanvasView.prototype, BaseView.prototype);

ContactCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.mainBlob = this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob;
  this.viewBlob = this.options.mainCanvasView.aCanvasAnimViews.start;
  this.$canvas = this.options.mainView.$canvas;

  BaseView.prototype.init.call(this);

}

ContactCanvasView.prototype.initTLShow = function () {


}

ContactCanvasView.prototype.animate = function () {

}


ContactCanvasView.prototype.initAnimInUp = function () {

  this.mainBlob.path.fillColor = "#42d6f8";

  var sBlob = this.mainBlob.getScale({w: CV.viewport.width * .6}, this.mainBlob.path);
  this.mainBlob.path.scale(sBlob);

  this.mainBlob.path.visible = true;
  this.mainBlob.path.opacity = 1;
  this.mainBlob.path.position.y = CV.viewport.height * 2;
  this.mainBlob.path.position.x = CV.viewport.width / 2;

}

ContactCanvasView.prototype.show = function () {

  this.isAnimating = true;

  this.mainBlob.path.fillColor = "#42d6f8";
  TweenMax.set(this.$canvas, {zIndex: 20});

  var target = {
    width: this.mainBlob.path.bounds._width,
  };
  var s;

  TweenMax.to(target, 2, {
    width: CV.viewport.width * 2,
    ease: Expo.easeOut,
    onUpdate: (function () {

      s = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
      this.mainBlob.path.scale(s);

    }).bind(this),
    onComplete: (function () {

      this.isAnimating = false;
      this.mainBlob.path.visible = false;
      this.trigger(EVENT.CANVAS_SHOWN);

    }).bind(this)
  });

  var targetY = {
    y: CV.viewport.height * 1.5
  };

  TweenMax.to(targetY, 2, {
    y: CV.viewport.height / 2,
    ease: Expo.easeOut,
    onUpdate: (function () {

      this.mainBlob.path.position.y = targetY.y;

    }).bind(this)
  });

}

ContactCanvasView.prototype.hide = function () {

  var sBlob = this.mainBlob.getScale({w: CV.viewport.width * .6}, this.mainBlob.path);
  this.mainBlob.path.scale(sBlob);

  this.mainBlob.path.visible = true;
  this.mainBlob.path.opacity = 1;
  this.mainBlob.path.position.y = -CV.viewport.height * .6;
  this.mainBlob.path.position.x = CV.viewport.width / 2;

  this.isAnimating = true;

  this.mainBlob.path.fillColor = "white";


  TweenMax.set(this.$canvas, {zIndex: 20});
  var target = {
    height: this.mainBlob.path.bounds._height,
  };
  var s;

  TweenMax.to(target, 2, {
    height: CV.viewport.height * 3,
    ease: Expo.easeOut,
    onUpdate: (function () {

      s = this.mainBlob.getScale({h: target.height}, this.mainBlob.path);
      this.mainBlob.path.scale(s);

    }).bind(this),
    onComplete: (function () {

      this.isAnimating = false;

    }).bind(this)
  });

  var targetY = {
    y: this.mainBlob.path.position.y
  };

  TweenMax.to(targetY, 1, {
    y: CV.viewport.height / 2,
    ease: Expo.easeOut,
    onUpdate: (function () {

      this.mainBlob.path.position.y = targetY.y;

    }).bind(this)
  });

  setTimeout((function () {
      this.trigger(EVENT.CANVAS_HIDDEN);
  }).bind(this), 500);

}

ContactCanvasView.prototype.onResize = function () {

}

module.exports = ContactCanvasView;
