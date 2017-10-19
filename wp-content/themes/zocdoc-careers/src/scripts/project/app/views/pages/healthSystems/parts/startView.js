var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
var StartCanvasView = require('canvas/healthSystems/startCanvasView');

var startView = function (options, datas) {

  this.hasBeenPlayed = false;
  this.id = 'start';

  this.events = {
    'click .scroll-cta': (function () {

      options.mainView.goToNextSection();

    }).bind(this)
  };

  PageView.call(this, options, datas);

}

_.extend(startView, PageView);
_.extend(startView.prototype, PageView.prototype);

startView.prototype.init = function () {

  this.options.mainCanvasView.register(this.id, new StartCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.start, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.start, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  PageView.prototype.init.call(this);

}

startView.prototype.initDOM = function () {

  this.$title = this.$el.find('h1');
  this.$textCTA = this.$el.find('.scroll-cta p');
  this.$arrowCTA = this.$el.find('.arrow');
  this.$headerNavigation = $('.page-header .navigation');

  PageView.prototype.initDOM.call(this);

}

startView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

startView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

startView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0.3, {autoAlpha: 1, display: 'flex', ease: Expo.easeInOut}, 0);

  this.TL.show.fromTo(this.$title, .6, {
    opacity: 0,
    y: 20
  },
  {
    y: 0,
    opacity: 1,
    ease: Expo.easeOut
  }, 0.25);

  this.TL.show.fromTo(this.$textCTA, .6, {
    opacity: 0,
    y: 20
  },
  {
    y: 0,
    opacity: 1,
    ease: Expo.easeOut
  }, 0.30);

  this.TL.show.fromTo(this.$arrowCTA, .6, {
    opacity: 0,
    y: 20
  },
  {
    y: 0,
    opacity: 1,
    ease: Expo.easeOut
  }, 0.35);

}

startView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.isShown = true;

  this.animateArrow();
  this.startIsAnimate = false;

  this.options.mainCanvasView.aCanvasAnimViews.start.isShown = true;

  this.trigger(EVENT.BLOCK_SHOWN);

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
}

startView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$el, .3, {autoAlpha: 0, display: 'none', ease: Expo.easeInOut}, 0);

  this.TL.hide.to(this.$title, .6, {
    opacity: 0,
    y: -20,
    ease: Expo.easeOut
  }, 0.2);

  this.TL.hide.to(this.$textCTA, .6, {
    opacity: 0,
    y: -20,
    ease: Expo.easeOut
  }, 0.25);

  this.TL.hide.to(this.$arrowCTA, .6, {
    opacity: 0,
    y: -20,
    ease: Expo.easeOut
  }, 0.3);

}

startView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);

  TweenMax.set(this.options.mainView.$canvas, {background: 'none'});

  this.isShown = false;
  this.options.mainCanvasView.aCanvasAnimViews.start.isShown = false;

  PageView.prototype.onHidden.call(this);

}

var _onCanvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);
}

startView.prototype.animateZee = function () {

  this.options.mainCanvasView.aCanvasAnimViews.start.generateImages(this.options.mainView.loader.assetsImages[3], this.options.mainCanvasView.aCanvasAnimViews.start.rastersLoader, 0, (function () {

    this.options.mainCanvasView.aCanvasAnimViews.start.manageStep(-1, 'Loader', 0, (function () {

      this.options.mainCanvasView.aCanvasAnimViews.start.hideZee((function () {

        this.show();

      }).bind(this));


    }).bind(this));

  }).bind(this));

}

startView.prototype.show = function () {

  if (!this.isLoaded || !this.TL || !this.TL.show || this.isShown || this.startIsAnimate) return;

  this.startIsAnimate = true;

  TweenMax.set(this.options.mainView.$canvas, {background: '#f1f1f9'});

  this.TL.show.play(0);


  if (CV.breakpoint === 'default' && this.menuIsFixed) {
    this.menuIsFixed = false;
    TweenMax.to(this.$headerNavigation, .4, {y: 0, ease: Expo.easeOut});

  }

  this.options.mainCanvasView.showCanvas(this.id);

}

startView.prototype.hide = function () {

  if (CV.breakpoint === 'default' && !this.menuIsFixed) {
    this.menuIsFixed = true;
    TweenMax.to(this.$headerNavigation, .4, {y: -64, ease: Expo.easeOut});
  }

  this.TL.hide.play(0);

  this.options.mainCanvasView.hideCanvas(this.id);

}

startView.prototype.animateArrow = function () {

  TweenMax.fromTo(this.$arrowCTA, .6, {y: 0}, {
    y: 5,
    ease: Power4.easeNone,
    repeat: -1,
    yoyo: true
  });

}

startView.prototype.onResize = function () {

  if (CV.breakpoint === 'default' && !this.menuIsFixed && !this.isShown) {
    this.menuIsFixed = true;
    TweenMax.set(this.$headerNavigation, {y: -64});
  } else if (CV.breakpoint === 'sml') {
    this.menuIsFixed = false;
    TweenMax.set(this.$headerNavigation, {y: 0});
  }

  PageView.prototype.onResize.call(this);

}

startView.prototype.onUpdate = function () {

}

startView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = startView;
