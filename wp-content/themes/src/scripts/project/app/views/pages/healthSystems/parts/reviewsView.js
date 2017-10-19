var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');

var reviewsView = function (options, datas) {

  this.hasBeenPlayed = false;

  PageView.call(this, options, datas);

}

_.extend(reviewsView, PageView);
_.extend(reviewsView.prototype, PageView.prototype);

reviewsView.prototype.initDOM = function () {

  PageView.prototype.initDOM.call(this);

}

reviewsView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha:0});

  PageView.prototype.setupDOM.call(this);

}

reviewsView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

reviewsView.prototype.initTLShow = function() {

  this.TL.show = new TimelineMax({paused:true, onComplete:this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0.3, {autoAlpha:1 ,  ease : Expo.easeInOut}, 0);

}

reviewsView.prototype.onShown = function (){

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

reviewsView.prototype.initTLHide = function() {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$el, 0.3, {autoAlpha:0 ,  ease : Expo.easeInOut}, 0);

}

reviewsView.prototype.onHidden = function (){

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

reviewsView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

reviewsView.prototype.onUpdate = function () {

}

reviewsView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = reviewsView;
