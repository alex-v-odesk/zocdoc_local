var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var IntroCanvasView = require('canvas/healthSystems/introCanvasView');
var CV = require('app/config/currentValues');
require('ScrollTo');

var introView = function (options, datas) {

  this.hasBeenPlayed = false;
  this.id = 'intro';
  this.canScroll = true;
  this.canUpdate = true;

  PageView.call(this, options, datas);

}

_.extend(introView, PageView);
_.extend(introView.prototype, PageView.prototype);

introView.prototype.init = function () {

  this.options.mainCanvasView.register(this.id, new IntroCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.intro, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.intro, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  PageView.prototype.init.call(this);
}

introView.prototype.initDOM = function () {

  PageView.prototype.initDOM.call(this);

}

introView.prototype.setupDOM = function () {

  PageView.prototype.setupDOM.call(this);

}

introView.prototype.onDOMInit = function () {

  this.$canvas = $('#main-canvas');
  this.$cashs = this.$el.find('.cash');
  this.$typing = this.$el.find('.type');
  this.$border = this.$el.find('.border');
  this.$title = this.$el.find('.title-blob');
  this.$search = this.$el.find('.search');
  this.$percentage = this.$el.find('.percentage');
  this.$arrowCTA = this.$el.find('.arrow');

  //this.hBlock = CV.isMobile ? $(this.$title).height() + $(this.$search).height() + $(this.$percentage).height() + 200 : $(this.$title).height() + $(this.$search).height() + $(this.$percentage).height();
  this.hBlock = $(this.$el).height();
  this.wBlock = $(this.$el).width();

  this.lBorder = 67.5;
  this.wTypes = [];
  this.currentIndexTyping = 0;

  _.each(this.$typing, (function (el) {
    this.wTypes.push($(el).width());
  }).bind(this));

  TweenMax.set(this.$el, {y: "100%", display: 'none'});
  this.animateArrow();

  PageView.prototype.onDOMInit.call(this);

}

introView.prototype.typing = function () {

  this.currentIndexTyping = this.currentIndexTyping < 0 ? 0 : this.currentIndexTyping;
  this.lBorder += this.wTypes[this.currentIndexTyping];

  TweenMax.set(this.$border, {
    left: this.lBorder,
    delay: .4
  });

  TweenMax.set(this.$typing[this.currentIndexTyping], {
    opacity: 1,
    delay: .4,
    onComplete: (function () {
      this.currentIndexTyping++;
      if (this.currentIndexTyping <= this.wTypes.length - 1)this.typing();
      else {
        _.delay((function () {
          this.cleanTyping();
        }).bind(this), 2500);
      }
    }).bind(this)
  });

}

introView.prototype.cleanTyping = function () {

  this.currentIndexTyping = this.currentIndexTyping > this.wTypes.length - 1 ? this.wTypes.length - 1 : this.currentIndexTyping;
  this.lBorder -= this.wTypes[this.currentIndexTyping];

  TweenMax.set(this.$border, {
    left: this.lBorder,
    delay: .4
  });

  TweenMax.set(this.$typing[this.currentIndexTyping], {
    opacity: 0,
    delay: .4,
    onComplete: (function () {
      this.currentIndexTyping--;
      if (this.currentIndexTyping >= 0)this.cleanTyping();
      else {
        _.delay((function () {
          this.typing();
        }).bind(this), 2500);
      }
    }).bind(this)
  });

}

introView.prototype.border = function () {

  TweenMax.set(this.$border, {
    opacity: 1,
    delay: .5
  });

  TweenMax.to(this.$border, .1, {
    opacity: 0,
    delay: 1,
    onComplete: this.border.bind(this)
  });

}

introView.prototype.initTLShow = function () {
}

introView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$el, .3, {autoAlpha: 0, ease: Expo.easeInOut}, 0);

}

introView.prototype.onShown = function () {

  //this.hBlock = CV.isMobile ? $(this.$title).height() + $(this.$search).height() + $(this.$percentage).height() + 200 : $(this.$title).height() + $(this.$search).height() + $(this.$percentage).height();
  this.hBlock = $(this.$el).height();

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;
  this.trigger(EVENT.BLOCK_SHOWN);

  _.delay((function () {
    // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
    // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
    CV.mainView.setNormalScrollBehavior();
  }).bind(this), 0);

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
}

introView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.options.mainCanvasView.aCanvasAnimViews.intro.canAnimate = false;

  CV.mainView.setNormalScrollBehavior(false);

  // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});

  PageView.prototype.onHidden.call(this);

}

introView.prototype.show = function () {

  this.options.mainCanvasView.aCanvasAnimViews.intro.initCanvas();
  this.options.mainCanvasView.showCanvas(this.id);
  this.options.mainCanvasView.aCanvasAnimViews.intro.canAnimate = false;

  // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});

  CV.mainView.setNormalScrollBehavior(false);

  if (CV.scrollYDirection == 'DOWN') {

    $(this.$canvas).removeAttr('style');
    TweenMax.fromTo(this.$el, .7, {y: "-100%"}, {
      y: "0%",
      display: 'flex',
      ease: Expo.easeOut,
      onComplete: (function () {

        //TweenMax.set(this.$canvas, {background: "#4ed5f5"});
        this.onShown();

      }).bind(this)
    });

  }
  else {

    //TweenMax.set(this.$canvas, {background: "#4ed5f5"});

    TweenMax.fromTo(this.$el, .7, {y: "100%"}, {
      y: "0%",
      display: 'flex',
      ease: Expo.easeOut,
      onComplete: (function () {

        this.onShown();

      }).bind(this)
    });
  }

}

introView.prototype.hide = function () {

  this.options.mainCanvasView.aCanvasAnimViews.intro.canAnimate = false;

  if (CV.scrollYDirection == 'DOWN') {


    TweenMax.to(this.$el, .7, {
      y: "100%",
      display: 'none',
      ease: Expo.easeOut,
      onComplete: (function () {

        //$(this.$canvas).removeAttr('style');
        this.onHidden();

      }).bind(this)
    });

  }
  else {

    TweenMax.to(this.$el, .7, {
      y: "-100%",
      display: 'none',
      ease: Expo.easeOut,
      onComplete: (function () {

        //$(this.$canvas).removeAttr('style');
        this.onHidden();

      }).bind(this)
    });
  }

  this.options.mainCanvasView.hideCanvas(this.id);

}


var _onCanvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);
}

introView.prototype.onResize = function () {

  //this.hBlock = CV.isMobile ? $(this.$title).height() + $(this.$search).height() + $(this.$percentage).height() + 200 : $(this.$title).height() + $(this.$search).height() + $(this.$percentage).height();
  this.hBlock = $(this.$el).height();

  PageView.prototype.onResize.call(this);

}

introView.prototype.onUpdate = function () {

  this.percentage = (CV.scrollY + CV.viewport.height) / this.hBlock;

  if (CV.isScrolling || CV.isTouch) {

    TweenMax.to(this.$cashs[0], .08, {y: this.percentage * -110, ease: Linear.easeNone});
    TweenMax.to(this.$cashs[1], .08, {y: this.percentage * -60, ease: Linear.easeNone});
    TweenMax.to(this.$cashs[2], .05, {y: this.percentage * -120, ease: Linear.easeNone});
    TweenMax.to(this.$cashs[3], .05, {y: this.percentage * 75, ease: Linear.easeNone});
    TweenMax.to(this.$cashs[4], .05, {y: this.percentage * -70, ease: Linear.easeNone});
    TweenMax.to(this.$cashs[5], .12, {y: this.percentage * -90, ease: Linear.easeNone});
    TweenMax.to(this.$cashs[6], .05, {y: this.percentage * -80, ease: Linear.easeNone});

  }

  if (!this.isTyped && (CV.isScrolling || CV.isTouch) && this.percentage > .7) {
    this.isTyped = true;
    this.border();
    this.typing();
  }

}

introView.prototype.animateArrow = function () {

  TweenMax.fromTo(this.$arrowCTA, .6, {y: 0}, {
    y: 5,
    ease: Power4.easeNone,
    repeat: -1,
    yoyo: true
  });

}

introView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = introView;
