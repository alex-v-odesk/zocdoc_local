var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');

var zocdocView = function (options, datas) {

  this.hasBeenPlayed = false;

  PageView.call(this, options, datas);

}

_.extend(zocdocView, PageView);
_.extend(zocdocView.prototype, PageView.prototype);

zocdocView.prototype.initDOM = function () {

  PageView.prototype.initDOM.call(this);

}

zocdocView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha:0});

  PageView.prototype.setupDOM.call(this);

}

zocdocView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

zocdocView.prototype.initTLShow = function() {

  this.TL.show = new TimelineMax({paused:true, onComplete:this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0.3, {autoAlpha:1 ,  ease : Expo.easeInOut}, 0);

}

zocdocView.prototype.onShown = function (){

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

zocdocView.prototype.initTLHide = function() {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$el, 0.3, {autoAlpha:0 ,  ease : Expo.easeInOut}, 0);

}

zocdocView.prototype.onHidden = function (){

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

zocdocView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

zocdocView.prototype.onUpdate = function () {

}

zocdocView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = zocdocView;
