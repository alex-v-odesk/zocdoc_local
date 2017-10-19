var Blob = require('canvas/blob');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var Tools = require('app/tools/tools');
var BaseView = require('app/abstract/baseView');
var BezierEasing = require('BezierEasing');

var ClientsCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.canAnimate = false;

  BaseView.call(this, options, datas);

}

_.extend(ClientsCanvasView, BaseView);
_.extend(ClientsCanvasView.prototype, BaseView.prototype);

ClientsCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.mainBlob = this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob;
  this.viewBlob = this.options.mainCanvasView.aCanvasAnimViews.start;
  this.$canvas = this.options.mainView.$canvas;

  BaseView.prototype.init.call(this);

}

ClientsCanvasView.prototype.initTLShow = function () {


}

ClientsCanvasView.prototype.animate = function () {

}


ClientsCanvasView.prototype.initAnimInUp = function () {

  //this.mainBlob.path.fillColor = "#f1f1f9";
  var sBlob = this.mainBlob.getScale({w: CV.viewport.width * 4}, this.mainBlob.path);
  this.mainBlob.path.scale(sBlob);

  this.mainBlob.path.visible = true;
  this.mainBlob.path.opacity = 1;
  this.mainBlob.path.position.y = CV.viewport.height / 2;
  this.mainBlob.path.position.x = CV.viewport.width / 2;

}

ClientsCanvasView.prototype.initAnimInDown = function () {

  //this.mainBlob.path.fillColor = "#f1f1f9";
  var sBlob = this.mainBlob.getScale({w: CV.viewport.width * 4}, this.mainBlob.path);
  this.mainBlob.path.scale(sBlob);

  this.mainBlob.path.visible = true;
  this.mainBlob.path.opacity = 1;
  this.mainBlob.path.position.y = CV.viewport.height / 2;
  this.mainBlob.path.position.x = CV.viewport.width / 2;

}

// has to be setup just when we are about to show
var _initTLShow = function() {

  var target = {
    height: this.mainBlob.path.bounds._height,
    color: Tools.rgbToHex(this.mainBlob.path.fillColor.red * 255, this.mainBlob.path.fillColor.green * 255, this.mainBlob.path.fillColor.blue * 255)
  };

  var targetY = {
    y: CV.viewport.height / 2
  };
  var s;

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.set(this.$canvas, { zIndex: 20})
              .call((function(){
                // this.mainBlob.path.fillColor = "#f1f1f9";
                this.isAnimating = true;
              }).bind(this))
              .to(target, 1.2, {
                height: CV.viewport.height * .6,
                color: "#f1f1f9",
                ease: Power4.easeOut,
                onUpdate: (function () {
                  s = this.mainBlob.getScale({h: target.height}, this.mainBlob.path);
                  this.mainBlob.path.scale(s);
                  this.mainBlob.path.fillColor = target.color;
                  // this.mainBlob.path.opacity = 1;
                  // this.mainBlob.path.fillColor = "#f1f1f9"; // useless
                }).bind(this)
              })
              .to(targetY, 1, {
                y: CV.scrollYDirection == 'DOWN' ? CV.viewport.height * 1.3 : -CV.viewport.height * .6,
                ease: Expo.easeOut,
                onUpdate: (function () {
                  this.mainBlob.path.position.y = targetY.y;
                }).bind(this)
              }, 0.1)
}

ClientsCanvasView.prototype.show = function () {

  if (CV.scrollYDirection == "UP") this.initAnimInUp();
  else this.initAnimInDown();

  _initTLShow.call(this);

  // if (this.mainCanvasView.oldCanvasAnimView.name === 'startCanvas') {
  //   ///console.log('ClientsCanvasView: this.mainBlob.path.opacity = 0;');
  //   this.mainCanvasView.oldCanvasAnimView.mainBlob.path.opacity = 0;
  // }

  this.TL.show.play(0);

  // this.isAnimating = true;
  //
  // this.mainBlob.path.fillColor = "#f1f1f9";
  // // TweenMax.set(this.$canvas, {zIndex: 20, delay: .15}); // already set
  //
  // var target = {
  //   height: this.mainBlob.path.bounds._height,
  // };
  // var s;
  //
  // TweenMax.to(target, 1.5, {
  //   height: CV.viewport.height * .6,
  //   ease: Expo.easeOut,
  //   onUpdate: (function () {
  //
  //     s = this.mainBlob.getScale({h: target.height}, this.mainBlob.path);
  //     this.mainBlob.path.scale(s);
  //     // this.mainBlob.path.fillColor = "#f1f1f9"; // useless
  //
  //   }).bind(this),
  //   onComplete: (function () {
  //
  //     this.isAnimating = false;
  //     this.trigger(EVENT.CANVAS_SHOWN);
  //
  //   }).bind(this),
  //   delay: .15
  // });
  //
  // var targetY = {
  //   y: CV.viewport.height / 2
  // };
  //
  // TweenMax.to(targetY, 1.5, {
  //   y: CV.scrollYDirection == 'DOWN' ? CV.viewport.height * 1.3 : -CV.viewport.height * .6,
  //   ease: Expo.easeOut,
  //   onUpdate: (function () {
  //
  //     this.mainBlob.path.position.y = targetY.y;
  //
  //   }).bind(this),
  //   delay: .1
  // });

}

ClientsCanvasView.prototype.hide = function () {

  this.isAnimating = true;

  TweenMax.set(this.$canvas, {zIndex: 20});
  var target = {
    height: this.mainBlob.path.bounds._height,
  };
  var s;

  TweenMax.to(target, 1.2, {
    height: CV.viewport.height * 4,
    ease: Expo.easeOut,
    onUpdate: (function () {

      s = this.mainBlob.getScale({h: target.height}, this.mainBlob.path);
      this.mainBlob.path.scale(s);

    }).bind(this),
    onComplete: (function () {

      this.isAnimating = false;
      this.trigger(EVENT.CANVAS_HIDDEN);

    }).bind(this)
  });

  this.mainBlob.path.position.y = CV.scrollYDirection == 'UP' ? CV.viewport.height * 1.3 : -CV.viewport.height * .6;

  var targetY = {
    y: this.mainBlob.path.position.y
  };

  TweenMax.to(targetY, 1.2, {
    y: CV.viewport.height / 2,
    ease: Expo.easeOut,
    onUpdate: (function () {

      this.mainBlob.path.position.y = targetY.y;

    }).bind(this)
  });

}

ClientsCanvasView.prototype.onShown = function () {

  this.isAnimating = false;
  this.trigger(EVENT.CANVAS_SHOWN);

  BaseView.prototype.onShown.call(this);
}

ClientsCanvasView.prototype.onResize = function () {

}

module.exports = ClientsCanvasView;
