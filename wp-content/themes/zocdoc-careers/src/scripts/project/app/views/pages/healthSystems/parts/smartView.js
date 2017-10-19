var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
var SmartCanvasView = require('canvas/healthSystems/smartCanvasView');

var smartView = function (options, datas) {

  this.hasBeenPlayed = false;
  this.id = 'smart';

  PageView.call(this, options, datas);

}

_.extend(smartView, PageView);
_.extend(smartView.prototype, PageView.prototype);

smartView.prototype.init = function () {

  this.options.mainCanvasView.register(this.id, new SmartCanvasView({mainCanvasView: this.options.mainCanvasView}, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.smart, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.smart, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  PageView.prototype.init.call(this);

}

smartView.prototype.initDOM = function () {

  this.$canvas = this.options.mainView.$canvas;
  PageView.prototype.initDOM.call(this);

}

smartView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

smartView.prototype.onDOMInit = function () {

  this.$bgImg = this.$el.find('.bg-image');
  this.$subTitle = this.$el.find('h3');
  this.$title = this.$el.find('h2');
  this.$text = this.$el.find('.text');

  this.$els = [
    this.$subTitle,
    this.$title,
    this.$text
  ];

  PageView.prototype.onDOMInit.call(this);

}

smartView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true});
  this.TL.show.to(this.$el, 0.3, {autoAlpha: 1, display: 'flex', ease: Expo.easeInOut}, 0);

}

smartView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});
  this.TL.hide.to(this.$el, 0.3, {autoAlpha: 0, display: 'none', ease: Expo.easeInOut}, 0);

}

smartView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;
  this.trigger(EVENT.BLOCK_SHOWN);

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
}

smartView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

var _onCanvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);
}

smartView.prototype.show = function () {

  this.options.mainCanvasView.aCanvasAnimViews.smart.initCanvas();
  this.options.mainCanvasView.showCanvas(this.id);

  if (CV.scrollYDirection == 'DOWN') {

    TweenMax.to(this.$el, 0.2, {autoAlpha: 1, display: 'flex', ease: Expo.easeInOut}, 0);
    TweenMax.fromTo(this.$bgImg, .5, {y: "10%", scale: .8}, {y: "0%", scale: 1, ease: Expo.easeOut, onComplete: this.onShown.bind(this)});
    TweenMax.staggerFromTo(this.$els, .5, {y: -100, opacity: 0}, {
      y: 0,
      opacity: 1,
      ease: Expo.easeOut,
      delay: .1,
    }, .05);

  } else {

    TweenMax.to(this.$el, 0.2, {autoAlpha: 1, display: 'flex', ease: Expo.easeInOut}, 0);
    TweenMax.fromTo(this.$bgImg, .5, {y: "10%", scale: .8}, {y: "0%", scale: 1, ease: Expo.easeOut, onComplete: this.onShown.bind(this)});
    TweenMax.staggerFromTo(this.$els, .5, {y: 100, opacity: 0}, {
      y: 0,
      opacity: 1,
      ease: Expo.easeOut,
      delay: .1,
    }, .05);
  }

}

smartView.prototype.hide = function () {

  if (CV.scrollYDirection == 'DOWN') {

    TweenMax.fromTo(this.$bgImg, .5, {y: "0%", scale: 1}, {y: "10%", scale: 0.8, ease: Expo.easeOut, onComplete: this.onHidden.bind(this)});
    TweenMax.staggerTo(this.$els, .5, {y: 100, opacity: 1, ease: Expo.easeOut}, .05);
    TweenMax.to(this.$el, 0.3, {autoAlpha: 0, display: 'none', ease: Expo.easeInOut}, 0.2);

  }
  else {

    TweenMax.fromTo(this.$bgImg, .5, {y: "0%", scale: 1}, {y: "0%", scale: 1, ease: Expo.easeOut, onComplete: this.onHidden.bind(this)});
    TweenMax.staggerTo(this.$els, .5, {y: -100, opacity: 0, ease: Expo.easeOut}, .05);
    TweenMax.to(this.$el, .3, {autoAlpha: 0, display: 'none', ease: Expo.easeInOut}, 0.2);

  }

  this.options.mainCanvasView.hideCanvas(this.id);

}

smartView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

smartView.prototype.onUpdate = function () {
}

smartView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = smartView;
