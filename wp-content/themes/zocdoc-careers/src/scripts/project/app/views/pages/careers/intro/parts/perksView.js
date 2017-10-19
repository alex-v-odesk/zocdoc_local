var PageView = require('app/abstract/pageView');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var BezierEasing = require('BezierEasing');

var PerksView = function (options, datas) {

  //--------0 Prototype

  PageView.call(this, options, datas);

  this.$title = this.$el.find('h2');
  this.$subtitle = this.$el.find('h3');
  // this.$perksImg = this.$el.find('.perk-block');
  // this.$perksText = this.$el.find('.perk-block');
  this.$perksBlock = this.$el.find('.perk-block');

  this.canScroll = true;

}

_.extend(PerksView, PageView);
_.extend(PerksView.prototype, PageView.prototype);

PerksView.prototype.initDOM = function () {

  PageView.prototype.initDOM.call(this);
}

PerksView.prototype.setupDOM = function () {

  this.hBlock = $(this.$el).height();

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});
  TweenMax.set(this.$title, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$subtitle, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$perksBlock, {autoAlpha: 0, y: 100});

  $(this.$el).removeClass('hidden');

  PageView.prototype.setupDOM.call(this);

}

PerksView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

PerksView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0, {
    autoAlpha: 1,
    display: 'block'
    }, 0)
    .to(this.$title, 0.3, {autoAlpha: 1, y: 0, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0)
    .to(this.$subtitle, 0.3, {autoAlpha: 1, y: 0, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0.1)
    .staggerTo(this.$perksBlock, .6, {autoAlpha: 1, y: 0, delay: 0.2, ease: Expo.easeOut}, 0.05);

}

PerksView.prototype.show = function () {

  //TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});

  if (this.TL.show) this.TL.show.play(0);

  PageView.prototype.show.call(this);
}

PerksView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});

  //TweenMax.set(this.options.mainCanvasView.options.el, {zIndex:0});

  CV.mainView.setNormalScrollBehavior();

  this.hBlock = $(this.$el).height();

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

PerksView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$title, 0.3, {autoAlpha: 0, y: -20, ease: Expo.easeOut}, 0)
    .to(this.$subtitle, 0.3, {autoAlpha: 0, y: -20, ease: Expo.easeOut}, 0)
    .to(this.$perksBlock, .6, {autoAlpha: 0, y: -200, ease: Power4.easeIn}, 0)
    .to(this.$el, 0, { autoAlpha: 0, display: 'none' }, 1);

}

PerksView.prototype.hide = function () {

  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
  CV.mainView.setNormalScrollBehavior(false);

  if (this.TL.hide) this.TL.hide.play(0);

  // TweenMax.to(this.$title, .4, {autoAlpha: 0, y: -20, ease: Expo.easeOut});
  // TweenMax.to(this.$subtitle, .4, {autoAlpha: 0, y: -20, ease: Expo.easeOut});
  // TweenMax.to(this.$perksBlock, .6, {autoAlpha: 0, y: -200, ease: Power4.easeIn});
  //
  // TweenMax.to(this.$el, .5, {
  //   autoAlpha: 0,
  //   display: 'none',
  //   ease: Expo.easeOut,
  //   delay: .1,
  //   onComplete: (function () {
  //
  //     this.reset();
  //
  //
  //   }).bind(this)
  // });

  //this.onHidden();

}

PerksView.prototype.reset = function () {

  TweenMax.set(this.$el, {autoAlpha: 0});
  TweenMax.set(this.$title, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$subtitle, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$perksBlock, {autoAlpha: 0, y: 40});

}

PerksView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});

  PageView.prototype.onHidden.call(this);

}

PerksView.prototype.onResize = function () {

  this.hBlock = $(this.$el).height();

  PageView.prototype.onResize.call(this);

}

PerksView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = PerksView;
