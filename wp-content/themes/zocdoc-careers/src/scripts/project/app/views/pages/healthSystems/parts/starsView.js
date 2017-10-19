var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
var StarsCanvasView = require('canvas/healthSystems/starsCanvasView');

var starsView = function (options, datas) {

  this.hasBeenPlayed = false;
  this.canScroll = true;
  this.id = 'stars';

  PageView.call(this, options, datas);

}

_.extend(starsView, PageView);
_.extend(starsView.prototype, PageView.prototype);

starsView.prototype.initDOM = function () {

  this.options.mainCanvasView.register(this.id, new StarsCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.stars, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.stars, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  PageView.prototype.initDOM.call(this);

}

starsView.prototype.setupDOM = function () {

  this.hBlock = $(this.$el).height();
  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

starsView.prototype.onDOMInit = function () {

  this.$titles = this.$el.find('h4');
  this.$subtitles = this.$el.find('h3');
  this.$texts = this.$el.find('.text');
  this.$titles = this.$el.find('h4');
  this.$lines = this.$el.find('.line');
  this.$stars = this.$el.find('.stars-icon');
  this.$linesBg = this.$el.find('.line .bg');
  this.$canvas = $('#main-canvas');

  this.$starsBlock = [
    this.$stars,
    this.$subtitles[0],
    this.$texts[0],
    this.$titles[0]
  ];

  this.$reviewsBlock = [
    this.$lines,
    this.$titles[1],
    this.$subtitles[1],
    this.$texts[1]
  ];

  TweenMax.set(this.$lines[0], {rotation: -75});
  TweenMax.set(this.$lines[1], {rotation: -40});
  TweenMax.set(this.$lines[2], {rotation: -15});
  TweenMax.set(this.$lines[3], {rotation: 25});
  TweenMax.set(this.$lines[4], {rotation: 45});
  TweenMax.set(this.$lines[5], {rotation: 65});


  PageView.prototype.onDOMInit.call(this);

}

starsView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true});

  this.TL.show.to(this.$el, 0.3, {
    autoAlpha: 1,
    display: 'block',
    ease: Expo.easeInOut
  }, 0);

}

starsView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true});
  this.TL.hide.to(this.$el, .3, {
    autoAlpha: 0,
    display: 'none',
    ease: Expo.easeInOut,
    onUpdate: (function () {

    }).bind(this)
  }, 0);

}

starsView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;
  this.hBlock = $(this.$el).height();

  this.trigger(EVENT.BLOCK_SHOWN);

  // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
  // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
  CV.mainView.setNormalScrollBehavior();

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
}

starsView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);

  // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: CV.scrollYDirection == 'DOWN' ? 0 : this.hBlock});
  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
  CV.mainView.setNormalScrollBehavior(false);

  PageView.prototype.onHidden.call(this);

}

var _onCanvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);
}

starsView.prototype.show = function () {

  this.options.mainCanvasView.showCanvas(this.id);

  if (!this.starsIsAnimating)this.animateStars();
  if (!this.linesIsAnimating)this.animateLines();

  if (CV.scrollYDirection == 'DOWN') {

    TweenMax.to(this.$el, 0.3, {
      autoAlpha: 1,
      display: 'block',
      ease: Expo.easeInOut
    }, 0);

    TweenMax.staggerFromTo(this.$starsBlock, .5, {opacity: 0}, {
      opacity: 1,
      ease: Expo.easeOut,
      delay: .2
    }, .05);

    TweenMax.staggerFromTo(this.$reviewsBlock, .5, {opacity: 0}, {
      opacity: 1,
      ease: Expo.easeOut,
      delay: .1
    }, .05, (function () {

      this.onShown();

    }).bind(this));

  }
  else {

    TweenMax.to(this.$el, 0.3, {
      autoAlpha: 1,
      display: 'block',
      ease: Expo.easeInOut
    }, 0);

    TweenMax.staggerFromTo(this.$starsBlock, .5, {y: 100, opacity: 0}, {
      y: 0,
      opacity: 1,
      ease: Expo.easeOut,
      delay: .1
    }, .05);

    TweenMax.staggerFromTo(this.$reviewsBlock, .5, {y: 100, opacity: 0}, {
      y: 0,
      opacity: 1,
      ease: Expo.easeOut,
      delay: .5
    }, .05, (function () {

      this.onShown();

    }).bind(this));

  }

}

starsView.prototype.hide = function () {

  if (CV.scrollYDirection == 'DOWN') {

    //this.TL.hide.play(0);
    TweenMax.to(this.$el, .3, {
      autoAlpha: 0,
      display: 'none',
      ease: Expo.easeInOut
    }, 0);

    TweenMax.staggerTo(this.$starsBlock, .5, {
      y: 100,
      opacity: 0,
      ease: Expo.easeOut
    }, .05);

    TweenMax.staggerTo(this.$reviewsBlock, .5, {
      y: 100,
      opacity: 0,
      ease: Expo.easeOut,
      delay: .1
    }, .05, (function () {
      this.onHidden();
      TweenMax.set(this.options.mainView.$canvas, {background: 'none'});
    }).bind(this));

    // _.delay((function () {
    //   this.onHidden();
    // }).bind(this), 400);

  }
  else {

    // TweenMax.to(this.$el, .6, {
    //   autoAlpha: 0,
    //   display: 'none',
    //   ease: Expo.easeOut,
    //   onUpdate: (function () {
    //
    //     TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: CV.scrollYDirection == 'DOWN' ? 0 : this.hBlock});
    //     TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
    //
    //   }).bind(this)
    // });

    TweenMax.to(this.$el, .3, {
      autoAlpha: 0,
      display: 'none',
      ease: Expo.easeInOut
    }, 0);

    TweenMax.staggerTo(this.$starsBlock, .4, {
      opacity: 0,
      ease: Expo.easeOut
    }, .05, this.onHidden.bind(this));

    TweenMax.staggerTo(this.$reviewsBlock, .5, {
      opacity: 0,
      delay: .1,
      ease: Expo.easeOut
    }, .05);

  }

  this.options.mainCanvasView.hideCanvas(this.id);

}

starsView.prototype.animateStars = function () {

  TweenMax.fromTo(this.$stars[0], .9, {rotation: 0, transformOrigin: 0, opacity: 0}, {
    opacity: 1,
    rotation: 120,
    transformOrigin: "120px 20px",
    delay: .05,
    ease: Circ.easeNone
  });

  TweenMax.fromTo(this.$stars[1], .9, {rotation: 0, transformOrigin: 0, opacity: 0}, {
    opacity: 1,
    rotation: 180,
    transformOrigin: "220px 20px",
    delay: .2,
    ease: Circ.easeNone
  });

  TweenMax.fromTo(this.$stars[2], .8, {rotation: 0, transformOrigin: 0, opacity: 0}, {
    opacity: 1,
    rotation: 180,
    transformOrigin: "140px 80px",
    delay: .05,
    ease: Circ.easeNone
  });

  TweenMax.fromTo(this.$stars[3], 1, {rotation: 0, transformOrigin: 0, opacity: 0}, {
    opacity: 1,
    rotation: -145,
    transformOrigin: "-70px -10px",
    delay: .05,
    ease: Circ.easeNone
  });

  TweenMax.fromTo(this.$stars[4], .7, {rotation: 0, transformOrigin: 0, opacity: 0}, {
    opacity: 1,
    rotation: -160,
    transformOrigin: "-140px -40px",
    delay: .05,
    ease: Circ.easeNone
  });

  TweenMax.fromTo(this.$stars[5], 1.4, {rotation: 0, transformOrigin: 0, opacity: 0}, {
    opacity: 1,
    rotation: -160,
    transformOrigin: "-180px 90px",
    delay: .05,
    ease: Circ.easeNone
  });


  TweenMax.fromTo(this.$stars[6], 1.5, {rotation: 0, transformOrigin: 0, opacity: 0}, {
    opacity: 1,
    rotation: -160,
    transformOrigin: "-240px 30px",
    delay: .05,
    ease: Circ.easeNone
  });

  this.starsIsAnimating = true;
}

starsView.prototype.animateLines = function () {

  this.linesIsAnimating = true;

  TweenMax.set(this.$linesBg[0], {top: "150%"});
  TweenMax.to(this.$linesBg[0], .5, {top: "-50%", ease: Expo.easeOut, delay: .05});
  TweenMax.to(this.$linesBg[0], .5, {
    top: "-150%",
    delay: .35,
    ease: Expo.easeOut
  });

  TweenMax.set(this.$linesBg[1], {top: "150%"});
  TweenMax.to(this.$linesBg[1], .5, {top: "-50%", ease: Expo.easeOut, delay: .1});
  TweenMax.to(this.$linesBg[1], .5, {
    top: "-150%",
    delay: .4,
    ease: Expo.easeOut
  });

  TweenMax.set(this.$linesBg[2], {top: "150%"});
  TweenMax.to(this.$linesBg[2], .5, {top: "-50%", ease: Expo.easeOut});
  TweenMax.to(this.$linesBg[2], .5, {
    top: "-150%",
    delay: .30,
    ease: Expo.easeOut
  });

  TweenMax.set(this.$linesBg[3], {top: "150%"});
  TweenMax.to(this.$linesBg[3], .5, {top: "-50%", ease: Expo.easeOut});
  TweenMax.to(this.$linesBg[3], .5, {
    top: "-150%",
    delay: .30,
    ease: Expo.easeOut
  });

  TweenMax.set(this.$linesBg[4], {top: "150%"});
  TweenMax.to(this.$linesBg[4], .5, {top: "-50%", ease: Expo.easeOut, delay: .15});
  TweenMax.to(this.$linesBg[4], .5, {
    top: "-150%",
    delay: .45,
    ease: Expo.easeOut
  });

  TweenMax.set(this.$linesBg[5], {top: "150%"});
  TweenMax.to(this.$linesBg[5], .5, {top: "-50%", ease: Expo.easeOut, delay: .3});
  TweenMax.to(this.$linesBg[5], .5, {
    top: "-150%",
    delay: .6,
    ease: Expo.easeOut
  });

}

starsView.prototype.onResize = function () {

  this.hBlock = $(this.$el).height();
  PageView.prototype.onResize.call(this);

}

starsView.prototype.onUpdate = function () {

}

starsView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = starsView;
