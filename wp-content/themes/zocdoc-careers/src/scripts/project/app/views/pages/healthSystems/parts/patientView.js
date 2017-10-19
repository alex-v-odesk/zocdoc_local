var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var patientView = function (options, datas) {

  this.hasBeenPlayed = false;

  this.steps = 1;
  this.currentStep = -1;

  this.isFirstStep = true;

  PageView.call(this, options, datas);

}

_.extend(patientView, PageView);
_.extend(patientView.prototype, PageView.prototype);

patientView.prototype.initDOM = function () {

  PageView.prototype.initDOM.call(this);

  this.$client = this.$el.find('.client');
  this.$doctor = this.$el.find('.doctor');
  this.$titles = this.$el.find('h2');
  this.$iconsFirst = this.$el.find('.icon-patient-first');
  this.$button = this.$el.find('button');

}

patientView.prototype.init = function () {

  this.stepsAnimation = [
    this.step.bind(this)
  ];

  PageView.prototype.init.call(this);

}

patientView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

patientView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

patientView.prototype.initTLShow = function () {

}

patientView.prototype.initTLHide = function () {


}

patientView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  TweenMax.set(this.options.mainView.$canvas, {zIndex: 2});

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob.path.fillColor = "#f1f1f9";

  PageView.prototype.onShown.call(this);

}

patientView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  this.reset();
  this.currentStep = -1;
  this.isFirstStep = true;

}

patientView.prototype.reset = function () {

  _.each(this.$titles, (function (el) {
    TweenMax.set(el, {y: 0, x: 0, opacity: 0});
  }));

  $(this.$button).removeAttr('style');

  _.each(this.$iconsFirst, (function (el) {
    TweenMax.set(el, {y: 0, opacity: 0});
  }))

  TweenMax.set(this.$client, {y: "0%", x: "0%", opacity: 0});
  TweenMax.set(this.$doctor, {y: "0%", x: "0%", opacity: 0});

}

patientView.prototype.show = function () {

  TweenMax.to(this.$el, 0.3, {y: "0%", x: "0%", opacity: 1, display: 'flex', ease: Expo.easeInOut});

  TweenMax.fromTo(this.$iconsFirst[0], .4, {
        rotation: -50,
        scale: .1,
        y: 25,
        opacity: 0
      },
      {
        rotation: 0,
        scale: 1,
        y: 0,
        opacity: 1,
        ease: Power4.easeOut,
        transformOrigin: 'center',
        delay: .2
      }
  );

  TweenMax.fromTo(this.$iconsFirst[1], .4, {
        rotation: 50,
        scale: .1,
        y: 25,
        opacity: 0
      },
      {
        rotation: 0,
        scale: 1,
        transformOrigin: 'center',
        y: 0,
        opacity: 1,
        ease: Power4.easeOut,
        delay: .25
      }
  );

  TweenMax.fromTo(this.$iconsFirst[2], .4, {
        rotation: 70,
        scale: .1,
        y: 25,
        opacity: 0
      },
      {
        rotation: 0,
        scale: 1,
        transformOrigin: 'center',
        y: 0,
        opacity: 1,
        ease: Power4.easeOut,
        delay: .3
      }
  );

  TweenMax.set(this.$titles[0], {opacity: 1});
  TweenMax.set(this.$titles[1], {opacity: 0});

  TweenMax.fromTo(this.$titles[0], .7, {
        y: 250
      },
      {
        y: 0,
        ease: Expo.easeOut
      }
  );

  TweenMax.fromTo(this.$client, .6, {
        y: "20%",
        opacity: 1
      },
      {
        y: "0%",
        ease: Power4.easeOut
      }
  );

  TweenMax.fromTo(this.$doctor, .6, {
        y: "20%",
        scale: 1,
        opacity: 1
      },
      {
        y: "0%",
        ease: Power4.easeOut
      }
  );

  _.delay((function () {
    this.onShown();
  }).bind(this), 1000);

}

patientView.prototype.hide = function () {

  TweenMax.to(this.$doctor, .5, {
        y: "-15%",
        scale: .9,
        ease: Power4.easeOut
      }
  );

  TweenMax.to(this.$titles[1], .5, {
    opacity: 0,
    y: -100,
    ease: Expo.easeOut
  });

  TweenMax.to(this.$button, .5, {
    y: -100,
    opacity: 0,
    delay: .1,
    ease: Expo.easeOut
  });

  if (CV.scrollYDirection == "DOWN") {

    TweenMax.to(this.$el, .5, {
      opacity: 0,
      display: 'none',
      ease: Expo.easeInOut
    });

  }
  else {

    TweenMax.set(this.$el, {
      display: 'none',
      ease: Expo.easeInOut,
      delay: .8
    });


  }

  setTimeout(this.onHidden.bind(this), 50);

}

patientView.prototype.manageSteps = function (i, callback) {

  this.stepsAnimation[i](callback, i);

}

patientView.prototype.step = function (callback) {

  if (this.isAnimating) return;
  this.isAnimating = true;

  if (this.isFirstStep) {

    TweenMax.to(this.$iconsFirst[0], .4, {
          rotation: -50,
          scale: .1,
          y: 25,
          opacity: 0,
          ease: Power4.easeOut,
          transformOrigin: 'center'
        }
    );

    TweenMax.to(this.$iconsFirst[1], .4, {
          rotation: 50,
          scale: .1,
          y: 25,
          opacity: 0,
          transformOrigin: 'center',
          ease: Power4.easeOut,
          delay: .05
        }
    );

    TweenMax.to(this.$iconsFirst[2], .4, {
          rotation: 70,
          scale: .1,
          y: 25,
          transformOrigin: 'center',
          opacity: 0,
          ease: Power4.easeOut,
          delay: .1
        }
    );

    TweenMax.to(this.$client, .45, {
      x: -150,
      y: 150,
      opacity: 0,
      ease: Expo.easeOut
    });

    if (CV.isMobile) {
      TweenMax.to(this.$doctor, .6, {
        right: CV.viewport.width / 2 - $(this.$doctor).width() / 2,
        scale: 1.3,
        delay: .1,
        ease: Expo.easeOut
      });
    }
    else {
      TweenMax.to(this.$doctor, .6, {
        x: -150,
        scale: 1.3,
        delay: .1,
        ease: Expo.easeOut
      });
    }

    TweenMax.to(this.$titles[0], .3, {
          x: -100,
          opacity: 0,
          delay: .05,
          ease: Expo.easeOut
        }
    );

    TweenMax.fromTo(this.$titles[1], .5, {
          y: 0,
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          delay: .15,
          ease: Expo.easeOut,
          onComplete: (function () {
            callback();
            this.isFirstStep = false;
            this.isAnimating = false;
          }).bind(this)
        }
    );

    TweenMax.fromTo(this.$button, .3, {x: 100, y: 0, opacity: 0}, {
          x: 0,
          opacity: 1,
          delay: .15,
          ease: Expo.easeOut
        }
    );

  }
  else {

    TweenMax.fromTo(this.$iconsFirst[0], .4, {
          rotation: -50,
          scale: .1,
          y: 25,
          opacity: 0
        },
        {
          rotation: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          ease: Power4.easeOut,
          transformOrigin: 'center',
          delay: .1
        }
    );

    TweenMax.fromTo(this.$iconsFirst[1], .4, {
          rotation: 50,
          scale: .1,
          y: 25,
          opacity: 0
        },
        {
          rotation: 0,
          scale: 1,
          transformOrigin: 'center',
          y: 0,
          opacity: 1,
          ease: Power4.easeOut,
          delay: .15
        }
    );

    TweenMax.fromTo(this.$iconsFirst[2], .4, {
          rotation: 70,
          scale: .1,
          y: 25,
          opacity: 0
        },
        {
          rotation: 0,
          scale: 1,
          transformOrigin: 'center',
          y: 0,
          opacity: 1,
          ease: Power4.easeOut,
          delay: .2
        }
    );

    TweenMax.to(this.$client, .6, {
      y: 0,
      x: 0,
      opacity: 1,
      ease: Expo.easeOut
    });

    if (CV.isMobile) {
      TweenMax.to(this.$doctor, .6, {
        right: '20px',
        scale: 1,
        ease: Expo.easeOut
      });
    }
    else {
      TweenMax.to(this.$doctor, .6, {
        x: "0%",
        scale: 1,
        ease: Expo.easeOut
      });
    }

    TweenMax.to(this.$titles[0], .5, {
          opacity: 1,
          x: 0,
          ease: Expo.easeOut,
          delay: .1,
          onComplete: (function () {
            callback();
            this.isFirstStep = true;
            this.isAnimating = false;
          }).bind(this)
        }
    );

    TweenMax.to(this.$button, .3, {
          x: 100,
          opacity: 0,
          ease: Expo.easeOut
        }
    );

    TweenMax.to(this.$titles[1], .2, {
          opacity: 0,
          ease: Expo.easeOut
        }
    );

  }

}

patientView.prototype.onUpdate = function () {

}

patientView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

patientView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = patientView;
