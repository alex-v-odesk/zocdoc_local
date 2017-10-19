var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var loyaltyView = function (options, datas) {

  this.hasBeenPlayed = false;

  PageView.call(this, options, datas);

}

_.extend(loyaltyView, PageView);
_.extend(loyaltyView.prototype, PageView.prototype);

loyaltyView.prototype.initDOM = function () {

  this.$bgImg = this.$el.find('.bg-image');
  this.$title = this.$el.find('h2');
  this.$heartImg = this.$el.find('.heart img');
  this.$heartTitle = this.$el.find('.heart .number');
  this.$subTitle = this.$el.find('h3');
  this.$text = this.$el.find('.text');

  this.$els = [
    this.$title,
    this.$heartImg,
    this.$heartTitle,
    this.$subTitle,
    this.$text
  ];

  PageView.prototype.initDOM.call(this);

}

loyaltyView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

loyaltyView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

loyaltyView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true});
  this.TL.show.to(this.$el, 0.3, {autoAlpha: 1, display: 'flex', ease: Expo.easeInOut}, 0);

}

loyaltyView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true});

  this.TL.hide.to(this.$el, 0.3, {autoAlpha: 0, display: 'none', ease: Expo.easeInOut}, 0);

}

loyaltyView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

loyaltyView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

loyaltyView.prototype.show = function () {

  //this.TL.show.play(0);

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

loyaltyView.prototype.hide = function () {

  // _.delay((function () {
  //   this.onHidden();
  // }).bind(this), 150);

  //this.TL.hide.play(0);

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

}

loyaltyView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

loyaltyView.prototype.onUpdate = function () {

}

loyaltyView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = loyaltyView;
