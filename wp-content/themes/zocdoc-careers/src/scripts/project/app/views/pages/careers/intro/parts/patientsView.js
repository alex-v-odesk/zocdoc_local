var PageView = require('abstract/pageView');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var BezierEasing = require('BezierEasing');

var PatientsView = function (options, datas) {

  //--------0 Prototype
  this.canUpdate = true;
  this.currentFirstRound = -1;
  this.currentSecondRound = -1;
  this.currentThirdRound = -1;

  this.currentPop = 0;

  if (CV.breakpoint === 'default') {
    this.canScroll = false;
  } else {
    this.canScroll = true;
  }

  PageView.call(this, options, datas);

}

_.extend(PatientsView, PageView);
_.extend(PatientsView.prototype, PageView.prototype);

PatientsView.prototype.initDOM = function () {

  //--------0 DOM init
  this.$title = this.$el.find('h2');

  this.$roundsAnimateFirst = this.$el.find('.typing-0 .round-animate');
  this.$roundsAnimateSecond = this.$el.find('.typing-1 .round-animate');
  this.$roundsAnimateThird = this.$el.find('.typing-2 .round-animate');

  this.$title = this.$el.find('h2');

  this.$blocks = this.$el.find('.patient-block');
  this.$blocksContent = this.$el.find('.content-block');
  this.$blockPatients = this.$el.find('.patients-content');
  this.$roundsBlocks = this.$el.find('.round-animate');
  this.$quotes = this.$el.find('.quote');
  this.$imgs = this.$el.find('.img');
  this.$texts = this.$el.find('.text');

  this.$imgsProfiles = this.$el.find('.type img');
  this.$jobsProfiles = this.$el.find('.type p .job');
  this.$namesProfiles = this.$el.find('.type p .name');


  // this.animateRounds(this.$roundsAnimateFirst, this.currentFirstRound);
  // this.animateRounds(this.$roundsAnimateSecond, this.currentSecondRound);
  // this.animateRounds(this.$roundsAnimateThird, this.currentFirstRound);

  //if (CV.isMobile) this.animatePops();

  PageView.prototype.initDOM.call(this);

}

PatientsView.prototype.setupDOM = function () {

  this.hBlock = $(this.$el).height();

  TweenMax.set(this.$title, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  $(this.$el).removeClass('hidden');

  PageView.prototype.setupDOM.call(this);

}


PatientsView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

PatientsView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true});

  this.TL.show.to(this.$el, 0, {
    autoAlpha: 1,
    display: 'flex',
    ease: Expo.easeInOut,
  }, 0).to(this.$title, 0.5, {autoAlpha: 1, y: 0, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0.1);

}

PatientsView.prototype.show = function () {

  setTimeout((function () {

    this.animatePops();

    if (CV.breakpoint === 'sml') {
      // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
      // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
      CV.mainView.setNormalScrollBehavior();
    }

  }).bind(this), 700);

  this.TL.show.play(0);

}


PatientsView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;



  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

PatientsView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$title, 0.3, {autoAlpha: 0, y: -20, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0)
      .to(this.$el, .2, {
        autoAlpha: 0,
        display: 'none',
        ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))
      }, .05);

}

PatientsView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
  CV.mainView.setNormalScrollBehavior(false);

  TweenMax.set(this.$title, {autoAlpha: 0, y: 20});
  TweenMax.set(this.$el, {autoAlpha: 0});
  this.resetPopBlocks();

  PageView.prototype.onHidden.call(this);

}

PatientsView.prototype.onResize = function () {

  this.hBlock = $(this.$el).height();

  if (CV.breakpoint === 'default') {

    var height = $(this.$quotes[this.currentPop]).height() > 290 ? $(this.$quotes[this.currentPop]).height() : 290;
    var width = 290;
    this.canScroll = false;

  } else {

    var height = 'auto';
    var width = 'auto';
    this.canScroll = true;
  }

  for (var i = 0; i < this.$quotes.length; i++) {

    TweenMax.set(this.$quotes[i], {
      width: width,
      height: height,
    });
  }

  PageView.prototype.onResize.call(this);

}

PatientsView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

PatientsView.prototype.animateRounds = function (el, round) {

  // var previousRound = round;
  // round = round + 1 < el.length ? round + 1 : 0;
  // TweenMax.to(el[round], .3, {y: -3});
  //
  // var middleRound = round + 1 < el.length ? round + 1 : 0;
  // TweenMax.to(el[middleRound], .3, {y: 0});
  //
  // var nextRound = middleRound + 1 < el.length ? middleRound + 1 : 0;
  // TweenMax.to(el[nextRound], .3, {y: 3});
  //
  // TweenMax.set(el[round], {
  //   background: '#dcd8d8',
  //   delay: .6,
  //   onComplete: (function () {
  //     $(el[previousRound]).removeAttr('style');
  //     this.animateRounds(el, round);
  //   }).bind(this)
  // });

}

PatientsView.prototype.resetPopBlocks = function () {

  this.currentPop = 0;
  clearTimeout(this.timeOut);
  if (this.quoteAnimation)this.quoteAnimation.kill();
  if (this.imageAnimation)this.imageAnimation.kill();
  if (this.textAnimation)this.textAnimation.kill();
  if (this.imgProfileAnimation)this.imgProfileAnimation.kill();
  if (this.nameProfileAnimation)this.nameProfileAnimation.kill();
  if (this.jobProfileAnimation)this.jobProfileAnimation.kill();

  $(this.$quotes).removeAttr('style');
  $(this.$namesProfiles).removeAttr('style');
  $(this.$jobsProfiles).removeAttr('style');
  $(this.$imgsProfiles).removeAttr('style');

}

PatientsView.prototype.animatePops = function () {

  if (this.currentPop == this.$blocks.length)this.resetPopBlocks();

  var delay = 0;
  var duration = 0.4;

  TweenMax.set(this.$quotes[this.currentPop], {opacity: 1, delay: delay});

  this.timeOut = setTimeout((function () {
    this.currentPop += 1;
    if (this.$blocks.length > this.currentPop) {
      this.animatePops();
    } else {
      this.onShown();
    }
  }).bind(this), 500);

  if (CV.breakpoint === 'default') {

    var height = $(this.$quotes[this.currentPop]).height() > 290 ? $(this.$quotes[this.currentPop]).height() : 290;
    var width = 290;
  } else {
    var height = 'auto';
    var width = 'auto';
  }

  this.quoteAnimation = TweenMax.fromTo(this.$quotes[this.currentPop], duration, {width: 0, height: 0}, {
    width: width,
    height: height,
    ease: Expo.easeOut,
    delay: delay
  });

  this.imageAnimation = TweenMax.fromTo(this.$imgs[this.currentPop], duration, {opacity: 0, scale: .1}, {
    opacity: 1,
    scale: 1,
    ease: Expo.easeOut,
    delay: delay + .1
  });

  this.textAnimation = TweenMax.fromTo(this.$texts[this.currentPop], duration, {opacity: 0, x: -50}, {
    opacity: 1,
    x: 0,
    ease: Expo.easeOut,
    delay: delay + .15
  });

  this.imgProfileAnimation = TweenMax.fromTo(this.$imgsProfiles[this.currentPop], duration, {opacity: 0, scale: .1}, {
    opacity: 1,
    scale: 1,
    ease: Expo.easeOut,
    delay: delay + .2
  });

  this.nameProfileAnimation = TweenMax.fromTo(this.$namesProfiles[this.currentPop], duration, {opacity: 0, x: -30}, {
    opacity: 1,
    x: 0,
    ease: Expo.easeOut,
    delay: delay + .2
  });

  this.jobProfileAnimation = TweenMax.fromTo(this.$jobsProfiles[this.currentPop], duration, {opacity: 0, left: -30}, {
    opacity: 1,
    left: 0,
    ease: Expo.easeOut,
    delay: delay + .25
  });


}

module.exports = PatientsView;
