var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var marketView = function (options, datas) {

  this.hasBeenPlayed = false;
  this.steps = CV.isMobile ? 1 : 2;
  this.currentStep = -1;

  PageView.call(this, options, datas);

}

_.extend(marketView, PageView);
_.extend(marketView.prototype, PageView.prototype);

marketView.prototype.initDOM = function () {

  this.$topLeft = this.$el.find('.top-left');
  this.$topRight = this.$el.find('.top-right');

  this.$bottomLeft = this.$el.find('.bottom-left');
  this.$bottomRight = this.$el.find('.bottom-right');

  this.$bottomSLeft = this.$el.find('.bottom-left-second');
  this.$bottomSRight = this.$el.find('.bottom-right-second');

  if (CV.isMobile) {
    this.els = [
      this.$topLeft,
      this.$topRight,
      this.$bottomLeft,
      this.$bottomRight,
      this.$bottomSLeft,
      this.$bottomSRight
    ];

    TweenMax.set(this.els, {rotation: -30})
  }

  this.$titles = this.$el.find('h2');
  this.$texts = this.$el.find('p');
  this.$button = this.$el.find('button');
  this.$contentBlocks = this.$el.find('.content');

  if (CV.isMobile) {
    this.stepsAnimation = [
      this.step.bind(this)
    ];
  }
  else {
    this.stepsAnimation = [
      this.firstStep.bind(this),
      this.secondStep.bind(this),
      this.thirdStep.bind(this)
    ];
  }

  PageView.prototype.initDOM.call(this);

}

marketView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {y: "100%", display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

marketView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

marketView.prototype.initTLShow = function () {
}

marketView.prototype.initTLHide = function () {
}

marketView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;
  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  TweenMax.set(this.options.mainView.$canvas, {zIndex: 2});

  PageView.prototype.onShown.call(this);

}

marketView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

marketView.prototype.show = function () {

  this.isAnimating = true;
  this.stepIsActive = false;

  if (CV.isMobile) {

    TweenMax.set(this.$el, {display: 'flex'});
    TweenMax.fromTo(this.$el, .7, {y: "100%"}, {y: "0%", display: 'flex', ease: Expo.easeOut});

    TweenMax.set(this.$titles[1], {y: 100, opacity: 0});
    TweenMax.set(this.$texts[1], {y: 100, opacity: 0});
    TweenMax.set(this.$button, {y: 100, opacity: 0});

    $(this.$bottomSLeft).removeAttr('style');
    $(this.$bottomSRight).removeAttr('style');
    TweenMax.fromTo(this.$topLeft, .8, {top: "-60%"}, {
      top: "2.5%",
      rotate: "-30deg",
      ease: Expo.easeOut,
      delay: .1
    });

    TweenMax.fromTo(this.$topRight, .9, {top: "-70%"}, {
      top: "4%",
      rotate: "-30deg",
      delay: .15,
      ease: Expo.easeOut
    });

    TweenMax.fromTo(this.$bottomLeft, 1.4, {top: "130%"}, {
      top: "85%",
      delay: .25,
      ease: Expo.easeOut
    });

    TweenMax.fromTo(this.$bottomRight, 1.3, {top: "100%"}, {
      top: "75%",
      delay: .2,
      ease: Expo.easeOut,
      onComplete: (function () {

        this.onShown();
        this.isAnimating = false;

      }).bind(this)
    });

    TweenMax.to(this.$button[0], .5, {y: 0, opacity: 1, display: 'block', ease: Expo.easeOut});

    TweenMax.fromTo(this.$titles[0], .5, {y: 100, opacity: 0}, {
      y: 0,
      opacity: 1,
      display: 'block',
      delay: .2,
      ease: Expo.easeOut
    });

    TweenMax.fromTo(this.$texts[0], .5, {y: 100, opacity: 0}, {
      y: 0,
      opacity: 1,
      display: 'block',
      delay: .25,
      ease: Expo.easeOut
    });

  }
  else {

    TweenMax.fromTo(this.$el, .15, {y: "100%", display: 'flex'}, {y: "0%", display: 'flex', ease: Expo.easeOut});

    TweenMax.set([this.$titles, this.$texts, this.$button], {y: 100, opacity: 0, display: "none"});
    $(this.$bottomSRight).removeAttr('style');
    $(this.$bottomSLeft).removeAttr('style');

    TweenMax.fromTo(this.$topLeft, .9, {top: "100%", left: "-5%"}, {
      top: "42%",
      ease: Expo.easeOut
    });

    TweenMax.fromTo(this.$topRight, .7, {top: "100%"}, {
      top: "10%",
      delay: .1,
      ease: Expo.easeOut,
      onComplete: (function () {

        this.onShown();
        this.isAnimating = false;

      }).bind(this)
    });
  }

}

marketView.prototype.hide = function () {

  this.onHidden();
  if (CV.scrollYDirection == 'DOWN') {
    TweenMax.to(this.$el, .7, {y: "100%", display: 'none', ease: Expo.easeOut});
  }
  else {
    TweenMax.to(this.$el, .7, {y: "-100%", ease: Expo.easeOut});
  }

}

marketView.prototype.manageSteps = function (i, callback) {

  this.stepsAnimation[i](callback, i);

}

marketView.prototype.firstStep = function (callback, i) {

  if (this.isAnimating) return;
  this.isAnimating = true;

  if (!this.isFirstStep) {

    TweenMax.to(this.$topLeft, .8, {
      top: "-28%",
      ease: Expo.easeOut,
      delay: .1
    });

    TweenMax.to(this.$topRight, 1, {
      top: "-29.5%",
      delay: .2,
      ease: Expo.easeOut
    });

    TweenMax.fromTo(this.$bottomLeft, 1.4, {top: "100%"}, {
      top: "72%",
      delay: .4,
      ease: Expo.easeOut
    });

    TweenMax.fromTo(this.$bottomRight, 1.3, {top: "100%"}, {
      top: "68%",
      delay: .3,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$titles[0], .5, {
      y: 0,
      opacity: 1,
      delay: .4,
      display: "block",
      ease: Expo.easeOut
    });

    TweenMax.to(this.$texts[0], .5, {
      y: 0,
      opacity: 1,
      delay: .45,
      display: "block",
      ease: Expo.easeOut
    });

    TweenMax.to(this.$button[0], .5, {
      y: 0,
      opacity: 1,
      ease: Expo.easeOut,
      display: "block",
      zIndex: 30,
      delay: .5,
      onComplete: (function () {

        callback();
        this.isFirstStep = true;
        this.isSecondStep = false;
        this.isThirdStep = false;
        this.isAnimating = false;

      }).bind(this)
    });

  }
  else {

    TweenMax.to(this.$bottomLeft, 1.4, {
      top: "100%",
      ease: Expo.easeOut
    });

    TweenMax.to(this.$bottomRight, 1.3, {
      top: "100%",
      ease: Expo.easeOut
    });

    TweenMax.to(this.$titles[0], .5, {
      y: 100,
      opacity: 0,
      display: "none",
      delay: .1,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$texts[0], .5, {
      y: 100,
      opacity: 0,
      display: "none",
      delay: .05,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$button[0], .5, {
      y: 100,
      opacity: 0,
      display: "none",
      zIndex: 0,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$topLeft, .8, {
      top: "42%",
      ease: Expo.easeOut,
      delay: .1
    });

    TweenMax.to(this.$topRight, .9, {
      top: "10%",
      delay: .15,
      ease: Expo.easeOut,
      onComplete: (function () {

        callback();
        this.isFirstStep = false;
        this.isSecondStep = false;
        this.isThirdStep = false;

        this.isAnimating = false;

      }).bind(this)
    });

  }

}

marketView.prototype.secondStep = function (callback, i) {

  if (this.isAnimating) return;
  this.isAnimating = true;

  if (!this.isSecondStep) {

    TweenMax.to(this.$topLeft, .8, {top: "-100%", ease: Expo.easeOut, delay: .1});
    TweenMax.to(this.$topRight, .8, {top: "-100%", ease: Expo.easeOut, delay: .1});


    if (CV.isMobile) {

      TweenMax.to(this.$bottomLeft, .8, {top: "5%", ease: Expo.easeOut, delay: .1});
      TweenMax.to(this.$bottomRight, .8, {top: "2%", ease: Expo.easeOut, delay: .1});

      TweenMax.to(this.$bottomSLeft, .8, {top: "75%", ease: Expo.easeOut, delay: .3});
      TweenMax.to(this.$bottomSRight, .8, {top: "83%", ease: Expo.easeOut, delay: .35});

    }
    else {

      TweenMax.to(this.$bottomLeft, .6, {top: "-29%", ease: Expo.easeOut, delay: .2});
      TweenMax.to(this.$bottomRight, .9, {top: "-39%", ease: Expo.easeOut, delay: .1});

      TweenMax.to(this.$bottomSLeft, .7, {top: "70%", ease: Expo.easeOut, delay: .3});
      TweenMax.to(this.$bottomSRight, .8, {top: "75%", ease: Expo.easeOut, delay: .45});

    }

    TweenMax.to(this.$titles[0], .4, {y: -100, opacity: 0, display: "none", ease: Expo.easeOut});
    TweenMax.to(this.$texts[0], .4, {y: -100, opacity: 0, display: "none", ease: Expo.easeOut, delay: .05});
    TweenMax.to(this.$button[0], .4, {y: -100, opacity: 0, display: "none", zIndex: 0, ease: Expo.easeOut, delay: .1});

    TweenMax.fromTo(this.$titles[1], .5, {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: "block",
          delay: .6,
          ease: Expo.easeOut
        }
    );

    TweenMax.fromTo(this.$texts[1], .5, {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: "block",
          delay: .65,
          ease: Expo.easeOut
        }
    );

    TweenMax.fromTo(this.$button[1], .5, {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: "block",
          delay: .7,
          zIndex: 30,
          ease: Expo.easeOut,
          onComplete: (function () {

            if (callback)callback();

            this.isFirstStep = false;
            this.isSecondStep = true;
            this.isThirdStep = false;

            this.isAnimating = false;

          }).bind(this)
        }
    );
  }
  else {

    if (CV.isMobile) {

      TweenMax.to(this.$bottomLeft, .8, {top: "5%", ease: Expo.easeOut, delay: .1});
      TweenMax.to(this.$bottomRight, .8, {top: "2%", ease: Expo.easeOut, delay: .1});

      TweenMax.to(this.$bottomSLeft, .8, {top: "75%", ease: Expo.easeOut, delay: .3});
      TweenMax.to(this.$bottomSRight, .8, {top: "83%", ease: Expo.easeOut, delay: .35});

    }
    else {

      TweenMax.to(this.$topLeft, .7, {
        top: "-28%",
        ease: Expo.easeOut,
        delay: .15
      });

      TweenMax.to(this.$topRight, .9, {
        top: "-29.5%",
        delay: .35,
        ease: Expo.easeOut
      });

      TweenMax.to(this.$bottomLeft, .8, {top: "75%", ease: Expo.easeOut, delay: .1});
      TweenMax.to(this.$bottomRight, 1, {top: "68%", ease: Expo.easeOut, delay: .25});

      TweenMax.to(this.$bottomSLeft, .7, {top: "100%", ease: Expo.easeOut, delay: .1});
      TweenMax.to(this.$bottomSRight, .9, {top: "100%", ease: Expo.easeOut});

    }

    TweenMax.to(this.$titles[1], .5, {
      y: 100,
      opacity: 0,
      display: "none",
      ease: Expo.easeOut,
      delay: .1
    });

    TweenMax.to(this.$texts[1], .5, {
      y: 100,
      opacity: 0,
      display: "none",
      delay: .05,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$button[1], .5, {
      y: 100,
      opacity: 0,
      zIndex: 0,
      display: "none",
      ease: Expo.easeOut
    });

    TweenMax.to(this.$titles[0], .5, {
      y: 0,
      opacity: 1,
      display: "block",
      delay: .5,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$texts[0], .5, {
      y: 0,
      opacity: 1,
      display: "block",
      delay: .45,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$button[0], .5, {
      y: 0,
      opacity: 1,
      display: "block",
      zIndex: 30,
      ease: Expo.easeOut,
      delay: .4,
      onComplete: (function () {

        callback();
        this.isFirstStep = true;
        this.isSecondStep = false;
        this.isThirdStep = false;

        this.isAnimating = false;

      }).bind(this)
    });

  }

}

marketView.prototype.thirdStep = function (callback, i) {

  if (this.isAnimating) return;
  this.isAnimating = true;

  if (!this.isThirdStep) {

    TweenMax.to(this.$bottomLeft, .6, {top: "-100%", ease: Expo.easeOut, delay: .25});
    TweenMax.to(this.$bottomRight, .9, {top: "-100%", ease: Expo.easeOut, delay: .1});

    TweenMax.to(this.$bottomSLeft, 1, {top: "-20%", ease: Expo.easeOut});
    TweenMax.fromTo(this.$topLeft, .7, {top: "100%", left: "35%"}, {top: "70%", ease: Expo.easeOut});
    TweenMax.to(this.$bottomSRight, .8, {top: "10%", ease: Expo.easeOut, delay: .1});

    TweenMax.to(this.$titles[1], .4, {
      y: -100,
      opacity: 0,
      display: "none",
      ease: Expo.easeOut
    });

    TweenMax.to(this.$texts[1], .4, {
      y: -100,
      opacity: 0,
      display: "none",
      ease: Expo.easeOut,
      delay: .05
    });

    TweenMax.to(this.$button[1], .4, {
      y: -100,
      opacity: 0,
      display: "none",
      zIndex: 0,
      ease: Expo.easeOut,
      delay: .1,
      onComplete: (function () {

        if (callback)callback();

        this.isFirstStep = false;
        this.isSecondStep = false;
        this.isThirdStep = true;

        this.isAnimating = false;

      }).bind(this)
    });

  }
  else {

    TweenMax.to(this.$bottomLeft, .6, {top: "-29%", ease: Expo.easeOut, delay: .2});
    TweenMax.to(this.$bottomRight, .8, {top: "-39%", ease: Expo.easeOut, delay: .1});

    TweenMax.to(this.$bottomSLeft, .9, {top: "70%", ease: Expo.easeOut});
    TweenMax.to(this.$bottomSRight, .55, {top: "75%", ease: Expo.easeOut});

    TweenMax.to(this.$topLeft, 1.1, {top: "100%", ease: Expo.easeOut});

    TweenMax.to(this.$titles[1], .4, {
      y: 0,
      opacity: 1,
      display: "block",
      delay: .2,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$texts[1], .4, {
      y: 0,
      opacity: 1,
      display: "block",
      ease: Expo.easeOut,
      delay: .25
    });

    TweenMax.to(this.$button[1], .4, {
      y: 0,
      opacity: 1,
      display: "block",
      zIndex: 30,
      ease: Expo.easeOut,
      delay: .3,
      onComplete: (function () {

        if (callback)callback();

        this.isFirstStep = false;
        this.isSecondStep = true;
        this.isThirdStep = false;

        TweenMax.set(this.$topLeft, {top: "-100%", left: "-5%", ease: Expo.easeOut});

        this.isAnimating = false;

      }).bind(this)
    });

  }

}

marketView.prototype.step = function (callback) {

  if (this.isAnimating) return;
  this.isAnimating = true;

  if (!this.stepIsActive) {

    TweenMax.to(this.$topLeft, .8, {top: "-100%", ease: Expo.easeOut, delay: .1});
    TweenMax.to(this.$topRight, .8, {top: "-100%", ease: Expo.easeOut, delay: .1});


    if (CV.isMobile) {

      TweenMax.to(this.$bottomLeft, .8, {top: "5%", ease: Expo.easeOut, delay: .1});
      TweenMax.to(this.$bottomRight, .8, {top: "2%", ease: Expo.easeOut, delay: .1});

      TweenMax.to(this.$bottomSLeft, .8, {top: "75%", ease: Expo.easeOut, delay: .3});
      TweenMax.to(this.$bottomSRight, .8, {top: "83%", ease: Expo.easeOut, delay: .35});

    }
    else {

      TweenMax.to(this.$bottomLeft, .8, {top: "-29%", ease: Expo.easeOut, delay: .1});
      TweenMax.to(this.$bottomRight, .8, {top: "-39%", ease: Expo.easeOut, delay: .1});

      TweenMax.to(this.$bottomSLeft, .8, {top: "70%", ease: Expo.easeOut, delay: .3});
      TweenMax.to(this.$bottomSRight, .8, {top: "75%", ease: Expo.easeOut, delay: .35});

    }

    TweenMax.to(this.$titles[0], .4, {y: -100, opacity: 0, display: 'none', ease: Expo.easeOut});
    TweenMax.to(this.$texts[0], .4, {y: -100, opacity: 0, display: 'none', ease: Expo.easeOut, delay: .05});
    TweenMax.to(this.$button[0], .4, {y: -100, opacity: 0, display: 'none', ease: Expo.easeOut, delay: .1});

    TweenMax.fromTo(this.$titles[1], .5, {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: 'block',
          delay: .6,
          ease: Expo.easeOut
        }
    );

    TweenMax.fromTo(this.$texts[1], .5, {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: 'block',
          delay: .65,
          ease: Expo.easeOut
        }
    );

    TweenMax.fromTo(this.$button[1], .5, {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: 'block',
          delay: .7,
          ease: Expo.easeOut,
          onComplete: (function () {

            if (callback)callback();
            this.stepIsActive = true;
            this.isAnimating = false;

          }).bind(this)
        }
    );

  }
  else {

    TweenMax.to(this.$bottomSLeft, .8, {top: "130%", ease: Expo.easeOut});
    TweenMax.to(this.$bottomSRight, .8, {top: "140%", ease: Expo.easeOut, delay: .05});

    TweenMax.to(this.$topLeft, 1.1, {top: "-28%", ease: Expo.easeOut, delay: .3});
    TweenMax.to(this.$topRight, 1.2, {top: "-29.5%", ease: Expo.easeOut, delay: .35});

    TweenMax.to(this.$bottomLeft, 1, {top: "75%", ease: Expo.easeOut, delay: .1});
    TweenMax.to(this.$bottomRight, .9, {top: "68%", ease: Expo.easeOut, delay: .15});

    TweenMax.to(this.$titles[1], .4, {y: 100, opacity: 0, display: 'none', ease: Expo.easeOut, delay: .1});
    TweenMax.to(this.$texts[1], .4, {y: 100, opacity: 0, display: 'none', ease: Expo.easeOut, delay: .05});
    TweenMax.to(this.$button[1], .4, {y: 100, opacity: 0, display: 'none', ease: Expo.easeOut});

    TweenMax.fromTo(this.$titles[0], .5, {
          y: -100,
          opacity: 0
        },
        {
          y: 0,
          display: 'block',
          opacity: 1,
          delay: .6,
          ease: Expo.easeOut
        }
    );

    TweenMax.fromTo(this.$button[0], .5, {
          y: -100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: 'block',
          delay: .7,
          ease: Expo.easeOut
        }
    );

    TweenMax.fromTo(this.$texts[0], .5, {
          y: -100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          display: 'block',
          delay: .65,
          ease: Expo.easeOut,
          onComplete: (function () {

            if (callback)callback();
            this.stepIsActive = false;
            this.isAnimating = false;

          }).bind(this)
        }
    );
  }

}

marketView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

marketView.prototype.onUpdate = function () {

}

marketView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = marketView;
