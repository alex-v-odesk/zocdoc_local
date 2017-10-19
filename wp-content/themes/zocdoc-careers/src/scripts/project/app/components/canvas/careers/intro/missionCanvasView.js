var Blob = require('canvas/blob');
var BaseView = require('app/abstract/baseView');
var BezierEasing = require('BezierEasing');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var MissionCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.canAnimate = false;

  this.hideDirection = null;

  BaseView.call(this, options, datas);

}

_.extend(MissionCanvasView, BaseView);
_.extend(MissionCanvasView.prototype, BaseView.prototype);

MissionCanvasView.prototype.init = function () {

  if (CV.breakpoint === 'default') {
    this.blobMaxSize = window.innerWidth * 2.5;
  }else{
    this.blobMaxSize = window.innerHeight * 2.5;
  }


  this.mainBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    bgColor: '#F1F1F9',
    position: {
      x: 'this.paper.view.size.width / 2',
      y: 'this.paper.view.size.height'
    },
    size: {
      w: 'window.innerWidth * 0.2',
      maxW: 'window.innerWidth * 1.2'
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    orbit: {
      h: 2,
      w: 2
    }
  });

  this.mainBlob.path.visible = false;
  this.mainBlob.rectanglePath.visible = false;

  //Prevent blob from animating
  this.mainBlob.canAnimate = false;

  //this.mainBlob.path.selected = true;

  BaseView.prototype.init.call(this);

}

MissionCanvasView.prototype.initTL = function () {

  this.initTLShow();

  BaseView.prototype.initTL.call(this);
}

MissionCanvasView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});
  // MAINBLOB

  this.resetBlob();

  var mainBlobTarget = {
    width: this.mainBlob.path.bounds._width,
    y: this.mainBlob.path.position.y
  };

  // this.TL.show.to(mainBlobTarget, 0.5, {
  //   y: CV.viewport.height,
  //   onUpdate: (function () {
  //
  //     // var scale = this.mainBlob.getScale({w: mainBlobTarget.width}, this.mainBlob.path);
  //     // this.mainBlob.path.scale(scale);
  //
  //     this.mainBlob.path.position.y = mainBlobTarget.y;
  //
  //   }).bind(this),
  //   onUpdateParams: ["{self}"],
  //   ease: Power4.easeInOut
  // }, 0);

  this.TL.show.to(mainBlobTarget, 0.8, {
    width: this.blobMaxSize,
    y: CV.viewport.height,
    onUpdate: (function () {

      var scale = this.mainBlob.getScale({w: mainBlobTarget.width}, this.mainBlob.path);
      this.mainBlob.path.scale(scale);

      //this.mainBlob.path.position.y = mainBlobTarget.y;

    }).bind(this),
    onUpdateParams: ["{self}"],
    ease: Power2.easeInOut
  }, 0);

}

MissionCanvasView.prototype.show = function () {

  if (this.TL.show) this.killTL('show');
  this.initTLShow();

  TweenMax.set(this.mainCanvasView.options.el, {zIndex: 30});

  this.mainBlob.path.visible = true;
  this.mainBlob.rectanglePath.visible = true;

  //this.mainBlob.canAnimate = false;

  if (this.TL.show) this.TL.show.play(0);

}

MissionCanvasView.prototype.onShown = function () {

  TweenMax.set(this.mainCanvasView.options.el, {zIndex: 0});

  this.mainBlob.generateSettingsPoints();

  this.trigger(EVENT.CANVAS_SHOWN);

  // if (this.TL.hide) this.TL.hide = {};
  // this.initTLHide();

  //this.mainBlob.canAnimate = true;

}

MissionCanvasView.prototype.initTLHide = function () {

  //this.mainBlob.canAnimate = true;

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  var mainBlobTarget = {
    width: this.mainBlob.path.bounds._width,
    y: this.mainBlob.path.position.y
  };

  this.TL.hide.to(mainBlobTarget, 0.9, {
    width: window.innerWidth * 0.4,
    onUpdate: (function () {

      var scale = this.mainBlob.getScale({w: mainBlobTarget.width}, this.mainBlob.path);
      this.mainBlob.path.scale(scale);

    }).bind(this),
    onUpdateParams: ["{self}"],
    ease: Sine.easeOut
  }, 0)
  .to(mainBlobTarget, 1.1, {
    y: 0 - this.mainBlob.path.bounds._height,
    onUpdate: (function () {
      this.mainBlob.path.position.y = mainBlobTarget.y;

    }).bind(this),
    onUpdateParams: ["{self}"],
    ease: Sine.easeInOut
  }, "-=0.6");

}

MissionCanvasView.prototype.hide = function () {

  if (this.TL.hide) this.killTL('hide');
  this.initTLHide();

  TweenMax.set(this.mainCanvasView.options.el, {zIndex: 30});

  if (CV.scrollYDirection === 'DOWN') {
    this.hideDirection = 0 - this.mainBlob.path.bounds._height;
  }else{
    this.hideDirection = CV.viewport.height + this.mainBlob.path.bounds._height;
  }

  //this.mainBlob.canAnimate = false;

  if (this.TL.hide) this.TL.hide.play(0);

}

MissionCanvasView.prototype.onHidden = function () {

  TweenMax.set(this.mainCanvasView.options.el, {zIndex: 0});

  this.resetBlob();

  this.mainBlob.path.visible = false;
  this.mainBlob.rectanglePath.visible = false;

  this.trigger(EVENT.CANVAS_HIDDEN);

  this.mainBlob.generateSettingsPoints();

  // if (this.TL.show) this.TL.show = {};
  // this.initTLShow();

}

MissionCanvasView.prototype.resetBlob = function () {

  this.mainBlob.path.position.y = CV.viewport.height;

  var scale = this.mainBlob.getScale({w: CV.viewport.width * .2}, this.mainBlob.path);
  this.mainBlob.path.scale(scale);

}

MissionCanvasView.prototype.animate = function () {

  //this.mainBlob.animate(e);

}

MissionCanvasView.prototype.onResize = function () {

  this.mainBlob.rectanglePath.bounds.width = CV.viewport.width + 20;
  this.mainBlob.rectanglePath.bounds.height = CV.viewport.height + 20;

  this.mainBlob.rectanglePath.position.x = CV.viewport.width / 2;
  this.mainBlob.rectanglePath.position.y = CV.viewport.height / 2;

  this.mainBlob.path.position.x = CV.viewport.width / 2;
  // this.mainBlob.path.position.y = CV.viewport.height / 2;
  //
  var scale = this.mainBlob.getScale({w:this.blobMaxSize}, this.mainBlob.path);
  this.mainBlob.path.scale(scale);

  this.mainBlob.onResize();
}

module.exports = MissionCanvasView;
