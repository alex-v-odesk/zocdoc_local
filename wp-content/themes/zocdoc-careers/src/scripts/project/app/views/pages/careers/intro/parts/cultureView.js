var PageView = require('abstract/pageView');
var CarouselView = require('app/components/carousel/carouselView');
var CultureCanvasView = require('canvas/careers/intro/cultureCanvasView');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var BezierEasing = require('BezierEasing');

var CultureView = function (options, datas) {

  //--------0 Prototype
  this.canUpdate = true;

  this.$carouselEl = null;
  this.carousel = null;

  this.id = 'culture';

  this.isPressSectionActive = false;

  this.steps = 1;
  this.currentStep = -1;
  this.isFirstStep = true;

  PageView.call(this, options, datas);

}

_.extend(CultureView, PageView);
_.extend(CultureView.prototype, PageView.prototype);

CultureView.prototype.init = function () {

  this.options.mainCanvasView.register(this.id, new CultureCanvasView({mainCanvasView: this.options.mainCanvasView}, null));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.culture, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.culture, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  this.stepsAnimation = [
    this.firstStep.bind(this)
  ];

  PageView.prototype.init.call(this);

}

CultureView.prototype.initDOM = function () {

  this.$carouselEl = this.$el.find('.culture-carousel');
  this.$carouselElImg = this.$el.find('.carousel-items-container');
  this.$carouselElText = this.$el.find('.content-carousel');
  this.$cultureCanvas = this.$el.find('#culture-canvas');
  this.$imagesContainer = this.$el.find('.image-container');

  //--------0 set Title
  this.$carouselElPress = this.$el.find('.press');

  //--------0 set Press
  this.$carouselElTitle = this.$el.find('.overlay-content-container');
  this.hContentTitle = $(this.$carouselElTitle).height();
  this.topContentTitle = CV.viewport.height / 2 - this.hContentTitle / 2;

  PageView.prototype.initDOM.call(this);

}

CultureView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});
  TweenMax.set(this.$carouselElPress, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$carouselElTitle, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$carouselElText, {autoAlpha: 0, y: 20});

  $(this.$el).removeClass('hidden');

  PageView.prototype.setupDOM.call(this);

}

CultureView.prototype.onDOMInit = function () {

  this.carousel = new CarouselView({el: this.$carouselEl, hasTimer: true}, null);
  this.carousel.init();

  PageView.prototype.onDOMInit.call(this);

}

CultureView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  if (CV.breakpoint === 'default') {
    var opacityDuration = 0
  } else {
    var opacityDuration = 0.5;
  }

  this.TL.show.to(this.$el, opacityDuration, {
        autoAlpha: 1,
        display: 'flex',
        ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))
      }, 0.1)
      .to(this.$carouselElTitle, 0.5, {
        autoAlpha: 1,
        y: 0,
        zIndex: 10,
        ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))
      }, 0.3)
      .to(this.$carouselElText, 0.5, {
        autoAlpha: 1,
        y: 0,
        ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))
      }, 0.5);
}

CultureView.prototype.show = function () {

  this.TL.show.play(0);

  if (CV.breakpoint === 'default') this.options.mainCanvasView.showCanvas(this.id);

}

CultureView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);

  if (CV.breakpoint === 'sml') this.trigger(EVENT.CANVAS_SHOWN);

  if (this.isFirstStep) {
    this.carousel.startTimer();
  }

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
}

CultureView.prototype.initTLHide = function () {

  if (CV.breakpoint === 'default') {
    var opacityDelay = 2.1;
  } else {
    var opacityDelay = 0;
  }

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});
  this.TL.hide.to(this.$el, 0.3, {autoAlpha: 0, ease: Expo.easeInOut}, opacityDelay);

}

CultureView.prototype.hide = function () {

  if (CV.breakpoint === 'default') {
    this.options.mainCanvasView.hideCanvas(this.id);
  }else{
    this.TL.hide.play(0);
  }

}

CultureView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  if (CV.breakpoint === 'sml') this.trigger(EVENT.CANVAS_HIDDEN);

  this.carousel.stopTimer();

  this.resetBlock();
  this.currentStep = -1;
  this.isFirstStep = true;

  PageView.prototype.onHidden.call(this);

}

CultureView.prototype.resetBlock = function () {

  TweenMax.set(this.$carouselElPress, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$carouselElTitle, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$carouselElText, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$imagesContainer[this.carousel.currentIndex], {opacity:0.5});

}

var _onCanvasHidden = function () {

  this.onHidden();
  this.trigger(EVENT.CANVAS_HIDDEN);
}

CultureView.prototype.onTouchStart = function () {

  this.currentSwipeDirection = null;

  this.currentTimestamp = Date.now();

  this.startX = CV.touch.startX;
  this.startY = CV.touch.startY;
}

CultureView.prototype.onTouchMove = function () {

  this.lastDeltaX = this.startX - (CV.touch.startX - CV.touch.deltaX);
  this.lastDeltaY = this.startY - (CV.touch.startY - CV.touch.deltaY);

  if (this.currentSwipeDirection == null)

    this.currentSwipeDirection = _getCurrentSwipeDirection.call(this);

    if (this.currentSwipeDirection == 'x') {

      if (this.lastDeltaX < 0) {

        this.direction = 'LEFT';

      } else {

        this.direction = 'RIGHT';

      }

    } else {

      this.direction = null;
    }

    this.isDragging = true;

}

CultureView.prototype.onTouchEnd = function () {

  this.isDragging = false;

  this.startX = 0;
  this.startY = 0;

  if (this.currentSwipeDirection === null || this.direction === null ) return;

  var diffTime = Date.now() - this.currentTimestamp;

  if (diffTime > 150) {

    if (this.direction === 'LEFT') {

      this.carousel.goToPrevItem();

    }else if (this.direction === 'RIGHT') {

      this.carousel.goToNextItem();
    }
  }

}

var _getCurrentSwipeDirection = function() {

  if (Math.abs(this.lastDeltaX) > Math.abs(this.lastDeltaY)) {
    return "x";
  } else if(Math.abs(this.lastDeltaX) < Math.abs(this.lastDeltaY)) {
    return "y";
  }

  return null;

}

CultureView.prototype.manageSteps = function (i, callback) {

  this.stepsAnimation[i](callback, i);

}

CultureView.prototype.firstStep = function (callback) {

  if (this.isAnimating) return;
  this.isAnimating = true;

  if (this.isFirstStep) {

      this.carousel.stopTimer();
      TweenMax.to(this.$imagesContainer[this.carousel.currentIndex], .3, {
        opacity: .15,
        ease: Power4.easeNone
      });

      TweenMax.to(this.$carouselElTitle, .5, {
        autoAlpha: 0,
        y: -20,
        ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25)),
        delay: 0.1
      });
      TweenMax.to(this.$carouselElText, .5, {
        autoAlpha: 0,
        y: -20,
        ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25)),
        delay: 0.1
      });
      TweenMax.to(this.$carouselElPress, .5, {
        autoAlpha: 1, y: 0, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25)), delay: 0.1, onComplete: (function () {
          callback();
          this.isFirstStep = false;
          this.isAnimating = false;
        }).bind(this)
      });

  } else {

    this.carousel.startTimer();

    TweenMax.to(this.$imagesContainer[this.carousel.currentIndex], .3, {
      opacity: .5,
      ease: Power4.easeNone
    });

    TweenMax.to(this.$carouselElPress, .5, {
      autoAlpha: 0,
      y: -20,
      ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25)),
      delay: 0.1
    });

    TweenMax.to(this.$carouselElTitle, .5, {
      autoAlpha: 0,
      y: -20,
      ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25)),
      delay: 0.1
    });
    TweenMax.to(this.$carouselElText, .5, {
      autoAlpha: 1, y: 0, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25)), delay: 0.1, onComplete: (function () {
        callback();
        this.isFirstStep = true;
        this.isAnimating = false;
      }).bind(this)
    });

  }

}


CultureView.prototype.onResize = function () {
  
  this.hContentPress = $(this.$carouselElPress).height();
  this.topContentPress = CV.viewport.height / 2 - this.hContentPress / 2 + 40;

  TweenMax.set(this.$carouselElPress, {
    position: 'absolute',
    top: this.topContentPress
  });

  PageView.prototype.onResize.call(this);

}

CultureView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = CultureView;
