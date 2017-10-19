var PageView = require('abstract/pageView');
var IntroCanvasView = require('canvas/careers/intro/introCanvasView');
var BezierEasing = require('BezierEasing');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');

var IntroView = function (options, datas) {

  this.hasBeenPlayed = false;

  this.$title = null;
  this.$description = null;

  this.$headerNavigation = null;

  this.isShown = false;

  this.id = 'intro';

  this.events = {
    'click': 'onClickContent',
    'click .arrow': 'onArrowClicked'
  };

  PageView.call(this, options, datas);

}

_.extend(IntroView, PageView);
_.extend(IntroView.prototype, PageView.prototype);

IntroView.prototype.init = function () {

  this.options.mainCanvasView.register(this.id, new IntroCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.intro, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.intro, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.intro, EVENT.LOADER_COMPLETE, _onLoaderComplete.bind(this));

  PageView.prototype.init.call(this);

}

var _onLoaderComplete = function () {

  this.trigger(EVENT.LOADER_COMPLETE);

}

IntroView.prototype.animateZee = function () {

  this.options.mainCanvasView.aCanvasAnimViews.intro.generateImages(this.options.mainView.loader.assetsImages[0], this.options.mainCanvasView.aCanvasAnimViews.intro.rastersLoader, 0, (function () {
    this.options.mainCanvasView.aCanvasAnimViews.intro.manageStep(-1, 'Loader', 0, (function () {

      this.options.mainCanvasView.aCanvasAnimViews.intro.hideZee();
      this.show();

    }).bind(this));
  }).bind(this));


}

IntroView.prototype.onClickContent = function (e) {

  this.options.mainCanvasView.aCanvasAnimViews.intro.mouseDown({x: e.clientX, y: e.clientY});

}

IntroView.prototype.onArrowClicked = function () {

  this.options.mainView.goToNextSection();

}

IntroView.prototype.initDOM = function () {

  this.$title = this.$el.find('h2');
  this.$description = this.$el.find('p');
  this.$arrowCTA = this.$el.find('.arrow');

  this.$headerNavigation = $('.page-header .navigation');

  this.animateArrow();

  PageView.prototype.initDOM.call(this);

}

IntroView.prototype.setupDOM = function () {

  TweenMax.set(this.$title, {autoAlpha: 0, y: 40});
  TweenMax.set(this.$description, {autoAlpha: 0, y: 40});
  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  $(this.$el).removeClass('hidden');

  PageView.prototype.setupDOM.call(this);

}

IntroView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

IntroView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0, {autoAlpha: 1, display: 'flex'}, 0);
  this.TL.show.to(this.$title, 0.5, {autoAlpha: 1, y: 0, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0.4);
  this.TL.show.to(this.$description, 0.5, {
    autoAlpha: 1,
    y: 0,
    ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))
  }, 0.45);

}

IntroView.prototype.show = function () {

  if (!this.isLoaded || !this.TL || !this.TL.show) return;

  TweenMax.set(this.$el, {zIndex: 30});

  this.TL.show.play(0);

  this.options.mainCanvasView.showCanvas(this.id);

  if (CV.breakpoint === 'default') {

    this.menuIsFixed = false;
    TweenMax.to(this.$headerNavigation, .4, {y: 0, ease: Expo.easeOut});

  }

}

IntroView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.options.mainCanvasView.aCanvasAnimViews.intro.canAnimate = true;

  this.trigger(EVENT.BLOCK_SHOWN);

  this.isShown = true;

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);

}

IntroView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$title, 0.5, {autoAlpha: 0, y: -100, ease: Cubic.easeIn}, .1);
  this.TL.hide.to(this.$description, 0.5, {autoAlpha: 0, y: -80, ease: Cubic.easeIn}, .15);
  this.TL.hide.to(this.$el, 0.5, {autoAlpha: 0, display: 'none', ease: Cubic.easeIn}, .2);

}

IntroView.prototype.hide = function () {

  if (CV.breakpoint === 'default') {
    this.menuIsFixed = true;
    TweenMax.to(this.$headerNavigation, .4, {y: -64, ease: Expo.easeOut});
  }

  this.TL.hide.play(0);

  this.options.mainCanvasView.hideCanvas(this.id);
  this.options.mainCanvasView.aCanvasAnimViews.intro.canAnimate = false;

}

IntroView.prototype.onHidden = function () {

  TweenMax.set(this.$el, {zIndex: 0});

  this.isShown = false;

  this.trigger(EVENT.BLOCK_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

var _onCanvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);
}

IntroView.prototype.onResize = function () {

  if (CV.breakpoint === 'default' && !this.menuIsFixed && !this.isShown) {
    this.menuIsFixed = true;
    TweenMax.set(this.$headerNavigation, {y: -64});
  } else if (CV.breakpoint === 'sml') {
    this.menuIsFixed = false;
    TweenMax.set(this.$headerNavigation, {y: 0});
  }

  // if (CV.breakpoint === 'sml') {
  //   TweenLite.set(this.$headerNavigation, {clearProps: "all"});
  // } else {
  //   TweenLite.set(this.$headerNavigation, {y: -64});
  // }

  PageView.prototype.onResize.call(this);

}

IntroView.prototype.onUpdate = function () {

}

IntroView.prototype.animateArrow = function () {

  TweenMax.fromTo(this.$arrowCTA, .6, {y: 0}, {
    y: 5,
    ease: Power4.easeNone,
    repeat: -1,
    yoyo: true
  });

}

IntroView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = IntroView;
