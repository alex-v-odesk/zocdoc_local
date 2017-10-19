var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');

var percentageView = function (options, datas) {

  this.hasBeenPlayed = false;

  PageView.call(this, options, datas);

}

_.extend(percentageView, PageView);
_.extend(percentageView.prototype, PageView.prototype);

percentageView.prototype.initDOM = function () {

  PageView.prototype.initDOM.call(this);

}

percentageView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha:0});

  PageView.prototype.setupDOM.call(this);

}

percentageView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

percentageView.prototype.initTLShow = function() {

  this.TL.show = new TimelineMax({paused:true, onComplete:this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0.3, {autoAlpha:1 ,  ease : Expo.easeInOut}, 0);

}

percentageView.prototype.onShown = function (){

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

percentageView.prototype.initTLHide = function() {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$el, 0.3, {autoAlpha:0 ,  ease : Expo.easeInOut}, 0);

}

percentageView.prototype.onHidden = function (){

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

percentageView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

percentageView.prototype.onUpdate = function () {

}

percentageView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = percentageView;
