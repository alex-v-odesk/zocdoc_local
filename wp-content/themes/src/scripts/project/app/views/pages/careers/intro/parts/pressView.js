var PageView = require('app/abstract/pageView');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');

var PressView = function (options, datas) {

  //--------0 Prototype
  PageView.call(this, options, datas);

}

_.extend(PressView, PageView);
_.extend(PressView.prototype, PageView.prototype);

PressView.prototype.initDOM = function () {

  PageView.prototype.initDOM.call(this);

}

PressView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

PressView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

PressView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0.3, {autoAlpha: 1, ease: Expo.easeInOut}, 0);

}

PressView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);

  PageView.prototype.onShown.call(this);

}

PressView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$el, 0.3, {autoAlpha: 0, ease: Expo.easeInOut}, 0);

}

PressView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

PressView.prototype.onUpdate = function () {

  PageView.prototype.onUpdate.call(this);

}

PressView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

PressView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = PressView;
