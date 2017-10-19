var PageView = require('abstract/pageView');
var JoinCanvasView = require('canvas/careers/intro/joinCanvasView');
var BezierEasing = require('BezierEasing');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');

var JoinView = function (options, datas) {

  this.canScroll = true;

  this.id = 'join';

  this.imgURL = null;

  this.$title = null;
  this.$description = null;

  this.events = {
    'click .main-content': 'onClickContent'
  };

  PageView.call(this, options, datas);

}

_.extend(JoinView, PageView);
_.extend(JoinView.prototype, PageView.prototype);


JoinView.prototype.initDOM = function () {

  this.imgURL = this.$el[0].dataset.src;

  this.options.mainCanvasView.register(this.id, new JoinCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView,
    imgURL: this.imgURL
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.join, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.join, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  this.$content = this.$el.find('.join-content');
  this.$title = this.$el.find('.join-content h2');
  this.$description = this.$el.find('.join-content p');
  this.$description = this.$el.find('.join-content p');
  this.$cover = this.$el.find('.main-content .cover');
  this.$layer = this.$el.find('.main-content .layer');

  this.$footerContainer = this.$el.find('.footer-container')[0];
  $(this.$footerContainer).append(this.options.mainView.$footer);

  this.hBlock = $(this.$el).height() + $(this.options.mainView.$footer).height();
  this.wBlock = $(this.$el).width();

  PageView.prototype.initDOM.call(this);
}

JoinView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, y: 20, display: 'none'});
  TweenMax.set(this.$title, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$description, {autoAlpha: 0});

  $(this.$el).removeClass('hidden');

  PageView.prototype.setupDOM.call(this);

}

JoinView.prototype.onClickContent = function (e) {

  this.options.mainCanvasView.aCanvasAnimViews.join.mouseDown({x: e.clientX, y: e.clientY});

}

JoinView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

JoinView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0, {
    autoAlpha: 1,
    display: 'flex',
    x: 0,
    y: 0
  }, 0)
      .fromTo(this.$cover, 1.2, {opacity: 0, scale: 1.2}, {
        opacity: 1,
        scale: 1,
        ease: Expo.easeOut
      }, .1)
      .fromTo(this.$layer, 1.2, {opacity: 0}, {
        opacity: 1,
        ease: Expo.easeOut
      }, .1)
      .fromTo(this.$title, .6, {autoAlpha: 0, y: 100}, {
        autoAlpha: 1,
        y: 0,
        ease: Expo.easeOut
      }, .4)
      .fromTo(this.$description, .5, {autoAlpha: 0, y: 75}, {
        autoAlpha: 1,
        y: 0,
        ease: Expo.easeOut
      }, .6);

}

JoinView.prototype.show = function () {

  CV.mainView.calculateScrollY();
  //TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
  TweenMax.set(this.options.mainView.$canvas, {zIndex: 10, delay: .1});
  TweenMax.set(this.options.mainCanvasView.options.el, {y: 0});

  if (this.TL.show) this.TL.show.play(0);

  if (!CV.isMobile && !CV.isTablet) {
    this.options.mainCanvasView.showCanvas(this.id);
  } else {
    TweenMax.set($('#page-footer'), {display: 'block'});
    CV.mainView.setNormalScrollBehavior();
    this.trigger(EVENT.CANVAS_SHOWN);
  }


  PageView.prototype.show.call(this);

}

JoinView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.isShown = true;

  if (!CV.isMobile && !CV.isTablet) {
    _.delay((function () {
      TweenMax.set($('#page-footer'), {display: 'block'});
      // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
      CV.mainView.setNormalScrollBehavior();
    }).bind(this), 350);
  }

  this.trigger(EVENT.BLOCK_SHOWN);

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
}

JoinView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true});

  this.TL.hide.to(this.$title, 0.5, {autoAlpha: 0, y: -40, ease: Expo.easeOut}, 0.1)
      .to(this.$description, 0.5, {
        autoAlpha: 0,
        y: -40,
        ease: Expo.easeOut,
        onComplete: this.onHidden.bind(this)
      }, 0.15)
      .to(this.$el, 0.5, {
        autoAlpha: 0,
        display: 'none'
      }, 0);

}

JoinView.prototype.hide = function () {

  if (this.TL.hide) this.TL.hide.play(0);

  if (!CV.isMobile && !CV.isTablet) {
    this.options.mainCanvasView.hideCanvas(this.id);
  } else {
    this.trigger(EVENT.CANVAS_HIDDEN);
  }

  PageView.prototype.hide.call(this);

}

JoinView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);

  this.isShown = false;

  // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
  CV.mainView.setNormalScrollBehavior(false);
  TweenMax.set($('#page-footer'), {display: 'none'});

  TweenMax.set(this.options.mainView.$canvas, {zIndex: 1});

  PageView.prototype.onHidden.call(this);

}

var _onCanvasHidden = function () {

  console.log("_onCanvasHidden");

  this.trigger(EVENT.CANVAS_HIDDEN);
}

JoinView.prototype.onResize = function () {

  this.hBlock = $(this.$el).height() + $(this.options.mainView.$footer).height();

  PageView.prototype.onResize.call(this);

}

JoinView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = JoinView;
