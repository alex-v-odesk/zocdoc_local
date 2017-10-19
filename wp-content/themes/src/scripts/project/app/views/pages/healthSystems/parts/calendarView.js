var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
var Tools = require('app/tools/tools');
var CalendarCanvasView = require('canvas/healthSystems/calendarCanvasView');

var calendarView = function (options, datas) {

  this.hasBeenPlayed = false;
  this.id = 'calendar';
  this.steps = 2;
  this.currentStep = -1;

  PageView.call(this, options, datas);

}

_.extend(calendarView, PageView);
_.extend(calendarView.prototype, PageView.prototype);

calendarView.prototype.init = function () {

  this.options.mainCanvasView.register(this.id, new CalendarCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.calendar, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.calendar, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  this.stepsAnimation = [
    this.firstStep.bind(this),
    this.secondStep.bind(this),
    this.thirdStep.bind(this)
  ];

  this.mainBlob = this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob;

  PageView.prototype.init.call(this);

}

calendarView.prototype.initDOM = function () {

  this.$titles = this.$el.find('h3');
  PageView.prototype.initDOM.call(this);

}

calendarView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});
  PageView.prototype.setupDOM.call(this);

}

calendarView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

calendarView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0.3, {autoAlpha: 1, display: 'flex', ease: Expo.easeInOut}, 0);

}

calendarView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.options.mainCanvasView.aCanvasAnimViews.calendar.isAnimating = false;
  this.options.mainCanvasView.aCanvasAnimViews.start.isAnimating = false;

  this.trigger(EVENT.BLOCK_SHOWN);
  //console.log('calendarView.prototype.onShown');

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
  this.options.mainCanvasView.aCanvasAnimViews.calendar.isShown = true;
}

calendarView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true});

  this.TL.hide.to(this.$el, .5, {autoAlpha: 0, display: 'none', delay: .1, ease: Expo.easeInOut}, 0);

}

calendarView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  //console.log('calendarView.prototype.onHidden');

  this.options.mainCanvasView.aCanvasAnimViews.calendar.isAnimating = false;

  PageView.prototype.onHidden.call(this);

}

var _onCanvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);
  this.options.mainCanvasView.aCanvasAnimViews.calendar.isShown = false;
}

calendarView.prototype.reset = function () {
  _.each(this.$titles, (function (el) {
    TweenMax.set(el, {y: 0, opacity: 0});
  }))
}

calendarView.prototype.show = function () {

  //this.mainBlob.path.fillColor = "#fa6876";

  TweenMax.set(this.options.mainView.$canvas, {zIndex: 2});
  this.reset();
  this.currentStep = -1;
  this.options.mainCanvasView.aCanvasAnimViews.calendar.currentStep = this.currentStep;

  this.TL.show.play(0);
  TweenMax.fromTo(this.$titles[0], .5, {opacity: 0, y: 100}, {opacity: 1, y: 0, ease: Expo.easeOut});

  this.isFirstStep = false;
  this.isSecondStep = false;
  this.isThirdStep = false;

  this.options.mainCanvasView.showCanvas(this.id);

}

calendarView.prototype.hide = function () {

  this.TL.hide.play(0);

  this.options.mainCanvasView.hideCanvas(this.id);

  if (CV.scrollYDirection == "DOWN") {
    TweenMax.to(this.$titles[0], .5, {
      y: 200,
      opacity: 0,
      ease: Expo.easeOut,
      delay: .05,
      onComplete: this.onHidden.bind(this)
    });
  }
  else {

    this.onHidden();

    TweenMax.set(this.options.mainView.$canvas, {zIndex: 20, delay: .1});

    TweenMax.to(this.$titles[this.$titles.length - 1], .3, {
      y: -150,
      opacity: 0,
      ease: Power4.easeOut
    });
  }


}

calendarView.prototype.manageSteps = function (i, callback) {

  this.stepsAnimation[i](callback, i);

}

calendarView.prototype.firstStep = function (callback, i) {

  //console.log("FIRST STEP");

  if (this.isFirstStep) {

    var delay = 0;

    this.options.mainCanvasView.currentCanvasAnimView.manageStep(1, 'FirstStep', i, null, (function () {
      callback();

      this.isFirstStep = false;
      this.isSecondStep = false;
      this.isThirdStep = false;

    }).bind(this));

    var rasters = this.options.mainCanvasView.currentCanvasAnimView.rastersSecondStep;
    if (rasters[0].visible)rasters[0].visible = false;


    TweenMax.to(this.$titles[1], .5, {opacity: 0, y: -50, ease: Expo.easeOut, delay: delay});
    TweenMax.fromTo(this.$titles[0], .5, {opacity: 0, y: 50}, {
      opacity: 1,
      y: 0,
      ease: Expo.easeOut,
      delay: delay + .05
    });

  }
  else {

    var delay = 2.5;

    this.options.mainCanvasView.currentCanvasAnimView.manageStep(-1, 'FirstStep', i, null, (function () {

      callback();

      this.isFirstStep = true;
      this.isSecondStep = false;
      this.isThirdStep = false;

    }).bind(this));

    TweenMax.to(this.$titles[0], .5, {
      opacity: 0,
      y: 50,
      ease: Expo.easeOut,
      delay: delay
    });
    TweenMax.fromTo(this.$titles[1], .5, {opacity: 0, y: -50}, {
      opacity: 1,
      y: 0,
      ease: Expo.easeOut,
      delay: delay + .05
    });
  }

}

calendarView.prototype.secondStep = function (callback, i) {

  //console.log("SECOND STEP");

  if (this.options.mainCanvasView.aCanvasAnimViews.start.isAnimating) return;

  if (this.isSecondStep) {

    //console.log("this.isSecondStep = ", this.isSecondStep);

    var delay = .5;

    this.options.mainCanvasView.currentCanvasAnimView.manageStep(1, 'SecondStep', i, null, (function () {

      callback();
      this.isFirstStep = true;
      this.isSecondStep = false;
      this.isThirdStep = false;

    }).bind(this));

    var rasters = this.options.mainCanvasView.currentCanvasAnimView.rastersThirdStep;

    if (rasters[0].visible)rasters[0].visible = false;

    var color = {
      r: 193,
      g: 142,
      b: 252
    };

    var nextColor;

    TweenMax.to(color, 1, {
      r: 250,
      g: 104,
      b: 118,
      ease: Expo.easeOut,
      onUpdate: (function () {

        nextColor = Tools.rgbToHex(color.r, color.g, color.b);
        this.mainBlob.path.fillColor = nextColor;

      }).bind(this),
      delay: 0
    });

    TweenMax.to(this.$titles[2], .5, {opacity: 0, y: -50, ease: Expo.easeOut, delay: delay});
    TweenMax.fromTo(this.$titles[1], .5, {opacity: 0, y: 50}, {
      opacity: 1,
      y: 0,
      ease: Expo.easeOut,
      delay: delay + .05
    });

  }
  else {

    //console.log("this.isSecondStep = ", this.isSecondStep);

    var color = {
      r: 250,
      g: 104,
      b: 118
    };

    var nextColor;

    TweenMax.to(color, 1, {
      r: 193,
      g: 142,
      b: 252,
      ease: Expo.easeOut,
      onUpdate: (function () {

        nextColor = Tools.rgbToHex(color.r, color.g, color.b);
        this.mainBlob.path.fillColor = nextColor;

      }).bind(this),
      delay: 0
    });

    var delay = .6;
    this.options.mainCanvasView.currentCanvasAnimView.manageStep(-1, 'SecondStep', i, null, (function () {

      callback();

      //this.options.mainView.goToNextSection();

      this.isFirstStep = false;
      this.isSecondStep = true;
      this.isThirdStep = false;

    }).bind(this));

    var rasters = this.options.mainCanvasView.currentCanvasAnimView.rastersFirstStep;
    if (rasters[rasters.length - 1].visible)rasters[rasters.length - 1].visible = false;

    TweenMax.to(this.$titles[1], .5, {opacity: 0, y: 50, ease: Expo.easeOut, delay: delay});
    TweenMax.fromTo(this.$titles[2], .5, {opacity: 0, y: -50}, {
      opacity: 1,
      y: 0,
      ease: Expo.easeOut,
      delay: delay + .05
    });
  }

}

calendarView.prototype.thirdStep = function (callback, i) {

  //console.log("THIRD STEP");

  if (this.options.mainCanvasView.aCanvasAnimViews.start.isAnimating) return;

  if (this.isThirdStep) {
    var rasters = this.options.mainCanvasView.currentCanvasAnimView.rastersThirdStep;
    if (rasters[rasters.length - 1].visible)rasters[rasters.length - 1].visible = false;

    var delay = .9;
    this.options.mainCanvasView.currentCanvasAnimView.manageStep(1, 'ThirdStep', i, null, (function () {

      callback();
      this.isFirstStep = false;
      this.isSecondStep = true;
      this.isThirdStep = false;

      //this.options.mainView.goToPreviousSection();

    }).bind(this));

    TweenMax.to(this.$titles[3], .5, {opacity: 0, y: -50, ease: Expo.easeOut, delay: delay});
    TweenMax.fromTo(this.$titles[2], .5, {opacity: 0, y: 50}, {
      opacity: 1,
      y: 0,
      ease: Expo.easeOut,
      delay: delay + .05
    });

  }
  else {

    var delay = 0.5;

    this.options.mainCanvasView.currentCanvasAnimView.manageStep(-1, 'ThirdStep', i, null, (function () {
      callback();

      this.isFirstStep = false;
      this.isSecondStep = false;
      this.isThirdStep = true;

    }).bind(this));

    var rasters = this.options.mainCanvasView.currentCanvasAnimView.rastersSecondStep;
    if (rasters[rasters.length - 1].visible)rasters[rasters.length - 1].visible = false;

    TweenMax.to(this.$titles[2], .5, {opacity: 0, y: 50, ease: Expo.easeOut, delay: delay});
    TweenMax.fromTo(this.$titles[3], .5, {opacity: 0, y: -50}, {
      opacity: 1,
      y: 0,
      ease: Expo.easeOut,
      delay: delay + .05
    });
  }

}

calendarView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

calendarView.prototype.onUpdate = function () {

}

calendarView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = calendarView;
