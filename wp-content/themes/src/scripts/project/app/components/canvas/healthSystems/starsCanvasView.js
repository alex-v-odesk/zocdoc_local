var Blob = require('canvas/blob');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var Tools = require('app/tools/tools');
var BaseView = require('app/abstract/baseView');
var BezierEasing = require('BezierEasing');

var StarsCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.canAnimate = false;

  BaseView.call(this, options, datas);

}

_.extend(StarsCanvasView, BaseView);
_.extend(StarsCanvasView.prototype, BaseView.prototype);

StarsCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.mainBlob = this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob;
  this.viewBlob = this.options.mainCanvasView.aCanvasAnimViews.start;
  this.$canvas = this.options.mainView.$canvas;

  BaseView.prototype.init.call(this);

}

StarsCanvasView.prototype.initTLShow = function () {


}

StarsCanvasView.prototype.animate = function () {

}

StarsCanvasView.prototype.show = function () {

  this.isAnimating = true;

  if (CV.scrollYDirection == 'DOWN') {

    //TweenMax.set(this.$canvas, {background: "#F1F1F9"});


    // var sBlob = this.mainBlob.getScale({w: 450}, this.mainBlob.path);
    // this.mainBlob.path.scale(sBlob);

    var target = {
      width: this.mainBlob.path.bounds._width,
      y : this.mainBlob.path.position.y,
      color: Tools.rgbToHex(this.mainBlob.path.fillColor.red * 255, this.mainBlob.path.fillColor.green * 255, this.mainBlob.path.fillColor.blue * 255)
    };
    var s;

    TweenMax.to(target, 2, {
      width: CV.viewport.width * 2,
      y: CV.viewport.height / 2,
      color : "#d5b5fb",
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.mainBlob.path.fillColor = target.color;

        s = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
        this.mainBlob.path.scale(s);

        this.mainBlob.path.position.y = target.y;

      }).bind(this),
      onComplete: (function () {

        this.isAnimating = false;
        this.trigger(EVENT.CANVAS_SHOWN);

      }).bind(this),
      delay: .05
    });

    // this.mainBlob.path.position.y = -250;
    // var targetY = {
    //   y: -250
    // };

    // TweenMax.to(targetY, 2, {
    //   y: CV.viewport.height / 2,
    //   ease: Expo.easeOut,
    //   onUpdate: (function () {
    //
    //     this.mainBlob.path.position.y = targetY.y;
    //
    //   }).bind(this)
    // });

  } else {
    console.log("StarsCanvasView.prototype.show -> UP");
    this.trigger(EVENT.CANVAS_SHOWN);
  }
}

StarsCanvasView.prototype.hide = function () {

  if (CV.scrollYDirection == 'UP') {

    var sBlob = this.mainBlob.getScale({
      w: CV.viewport.width * 4,
      h: CV.viewport.height * 4
    }, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);
    this.mainBlob.path.position.y = CV.viewport.height / 2;
    this.mainBlob.path.fillColor = "#d5b5fb";
    TweenMax.set(this.$canvas, {background: "#F1F1F9"});

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

  } else {
    this.trigger(EVENT.CANVAS_HIDDEN);
  }

}

StarsCanvasView.prototype.onResize = function () {

}

module.exports = StarsCanvasView;
