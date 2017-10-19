var PageView = require('app/abstract/pageView');
var CV = require('app/config/currentValues');
var Config = require('app/config/config');
var EVENT = require('app/events/events');
var Loader = require('app/tools/loader');
//--------0 Views
var IntroView = require('./parts/introView');
var MissionView = require('./parts/storyView');
var ValuesView = require('./parts/valuesView');
var PatientsView = require('./parts/patientsView');
var PerksView = require('./parts/perksView');
var JoinView = require('./parts/joinView');
var CultureView = require('./parts/cultureView');
var PressView = require('./parts/pressView');
//--------0 Canvas
var CareersCanvasView = require('./parts/careersCanvasView');

var CareersView = function (options, datas) {

  //--------0 Prototype
  this.canUpdate = true;

  this.ease = 0;
  this.articles = [];

  this.views = {
    intro: IntroView,
    mission: MissionView,
    values: ValuesView,
    patients: PatientsView,
    culture: CultureView,
    press: PressView,
    perks: PerksView,
    join: JoinView
  };

  this.mainCanvasView = null;

  CV.blockIsAnimating = true;
  this.currentBlockIndex = 0;
  this.currentStepIndex = -1;

  this.isViewShown = false;
  this.isCanvasShown = false;
  this.bothAreShown = false;

  this.currentTimestamp = null;
  this.startY = null;
  this.lastDeltaY = null;
  this.isDragging = null;

  this.menuClick = false;
  this.isLoaded = false;

  this.blockScroll = true;

  this.assetsAreLoaded = this.assetsAreLoaded.bind(this);

  PageView.call(this, options, datas);

}

_.extend(CareersView, PageView);
_.extend(CareersView.prototype, PageView.prototype);

CareersView.prototype.initDOM = function () {

  this.$html = $('html');
  this.$body = $('body');
  this.$bodyHtml = $('body, html');
  this.$footer = $('#page-footer');
  this.$overlay = $('.overlay-bg');
  this.$articles = this.$el.find('article');
  this.$canvas = this.$el.find('#main-canvas')[0];

  PageView.prototype.initDOM.call(this);

}

CareersView.prototype.onDOMInit = function () {

  // TweenMax.set(this.$bodyHtml, {scrollTo: 0});
  // TweenMax.set(this.$html, {overflowY: 'hidden'});
  CV.mainView.setNormalScrollBehavior(false);

  this.mainCanvasView = new CareersCanvasView({el: this.$canvas}, null);
  this.mainCanvasView.init();

  var name;
  var currentView;
  var $el;
  var bdr;

  // --------0 Init dynamically the different subView with the DOM class name
  _.each(this.$articles, (function (el, i) {

    $el = $(el);
    name = $(el).attr('class').split(' ')[0];
    bdr = $el[0].getBoundingClientRect();

    currentView = new this.views[name]({el: el, mainCanvasView: this.mainCanvasView, mainView: this}, null);
    currentView.init();

    this.listenTo(currentView, EVENT.BLOCK_SHOWN, _onPageShown.bind(this));
    this.listenTo(currentView, EVENT.BLOCK_HIDDEN, _onPageHidden.bind(this));
    this.listenTo(currentView, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
    this.listenTo(currentView, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));
    this.listenTo(currentView, EVENT.STORY_OVERLAY_SHOWN, _onStoryOverlayShown.bind(this));
    this.listenTo(currentView, EVENT.STORY_OVERLAY_HIDDEN, _onStoryOverlayHidden.bind(this));
    this.listenToOnce(currentView, EVENT.LOADER_COMPLETE, _onLoaderComplete.bind(this));

    this.articles[i] = {
      class: currentView,
      height: $el.height(),
      bdr: bdr,
      top: bdr.top
    };

  }).bind(this));

  this.initLoader();

  PageView.prototype.onDOMInit.call(this);

}

CareersView.prototype.initLoader = function () {

  this.loader = new Loader([
    {
      path: 'sprites-zeeface',
      name: 'Zsmile_',
      format: '.png',
      first: 39,
      end: 95
    }
  ], this.assetsAreLoaded.bind(this));

}

CareersView.prototype.assetsAreLoaded = function () {

  if (!this.articles[0]) return;

  TweenMax.to(this.$overlay, .1, {
    autoAlpha: 0,
    display: 'none',
    ease: Expo.easeOut,
    onComplete: (function () {

      this.articles[0].class.isLoaded = true;
      this.articles[0].class.animateZee();

    }).bind(this)
  });

}

var _onStoryOverlayShown = function () {

  this.blockScroll = true;
  CV.overlayActive = true;

}

var _onStoryOverlayHidden = function () {

  this.blockScroll = false;
  CV.overlayActive = false;

}

var _onLoaderComplete = function () {

  _showPage.call(this);

  this.blockScroll = false;

}

CareersView.prototype.onMenuClicked = function (index) {

  if ((this.stepIsAnimating || CV.blockIsAnimating || this.blockScroll) && this.currentBlockIndex != 1) return;

  this.menuIndex = index;

  this.menuClick = true;

  _hidePage.call(this)

}

var _showPage = function () {

  if (CV.blockIsAnimating || this.showIsAnimating) return;

  CV.blockIsAnimating = true;
  this.showIsAnimating = true;

  this.articles[this.currentBlockIndex].class.show();

}

var _onPageShown = function () {

  this.currentStepIndex = -1;
  this.stepIsAnimating = false;
  this.isViewShown = true;
  this.showIsAnimating = false;

  //console.log("_onPageShown this.isViewShown = true;");

  if (this.isViewShown && this.isCanvasShown) {

    this.bothAreShown = true;
    CV.blockIsAnimating = false;
    //console.log("_onPageShown this.bothAreShown = true;");

  }

  this.trigger(EVENT.CAREER_BLOCK_UPDATED, {index: this.currentBlockIndex});

}

var _onCanvasShown = function () {

  this.isCanvasShown = true;

  //console.log("_onCanvasShown this.isCanvasShown = true;");

  if (this.isViewShown && this.isCanvasShown) {
    //console.log("_onCanvasShown this.bothAreShown = true;");
    this.bothAreShown = true;
    CV.blockIsAnimating = false;

  }

}

var _hidePage = function () {

  CV.blockIsAnimating = true;
  this.articles[this.currentBlockIndex].class.hide();

}

var _onPageHidden = function () {

  this.isViewShown = false;

  //console.log("_onPageHidden this.isViewShown = false;");

  if (!this.isViewShown && !this.isCanvasShown) {

    //console.log("_onPageHidden this.bothAreShown = false;");

    this.bothAreShown = false;
    CV.blockIsAnimating = false;
    this.updateBlockIndex();
  }

}

var _onCanvasHidden = function () {

  this.isCanvasShown = false;

  //console.log("_onPageHidden this.isCanvasShown = false;");

  if (!this.isViewShown && !this.isCanvasShown) {

    //console.log("_onCanvasHidden this.bothAreShown = false;");

    this.bothAreShown = false;
    CV.blockIsAnimating = false;
    this.updateBlockIndex();
  }

}

CareersView.prototype.onShown = function () {

  PageView.prototype.onShown.call(this);

}

CareersView.prototype.onScroll = function () {

  if (!this.articles[this.currentBlockIndex] || this.blockScroll || !this.bothAreShown) return;

  // if (this.articles[this.currentBlockIndex].class.canScroll && CV.scrollYDirection === 'UP')
  //   console.log('CV.scrollY + CV.viewport.height < this.articles[this.currentBlockIndex].class.hBlock - 10', CV.scrollY, CV.viewport.height, CV.scrollY + CV.viewport.height, "<", this.articles[this.currentBlockIndex].class.hBlock - 10);

  if (Math.abs(CV.scrollDeltaY) < 50 && !CV.isMobile && Detectizr.browser.name != "firefox" && Detectizr.browser.name != "safari"
      || this.articles[this.currentBlockIndex].class.canScroll && CV.scrollYDirection === 'UP' && CV.scrollY + CV.viewport.height < this.articles[this.currentBlockIndex].class.hBlock - 10
      || this.articles[this.currentBlockIndex].class.canScroll && CV.scrollYDirection === 'DOWN' && CV.scrollY > 50
      || this.currentBlockIndex === 0 && CV.scrollYDirection === 'DOWN'
      || this.currentBlockIndex > this.articles.length - 2 && CV.scrollYDirection === 'UP'
      || CV.blockIsAnimating
      || this.showIsAnimating
      || this.stepIsAnimating
  ) {
    return;
  }
  else if (this.articles[this.currentBlockIndex].class.steps && this.currentStepIndex <= this.articles[this.currentBlockIndex].class.steps) {
    //console.log("updating steps");
    this.updateStepIndex();
    return;

  }

  this.currentScrollDirection = CV.scrollYDirection;
  //console.log("hiding the page");
  _hidePage.call(this);

}

CareersView.prototype.onTouchStart = function () {

  CV.scrollYDirection = null;
  this.currentTimestamp = Date.now();
  this.startY = CV.touch.startY;

  if (this.articles[this.currentBlockIndex].class.id === 'culture') this.articles[this.currentBlockIndex].class.onTouchStart();

}

CareersView.prototype.onTouchMove = function () {

  this.lastDeltaY = this.startY - (CV.touch.startY - CV.touch.deltaY);
  CV.scrollYDirection = this.lastDeltaY < 0 ? 'DOWN' : 'UP';
  this.isDragging = true;

  if (this.articles[this.currentBlockIndex].class.id === 'culture') this.articles[this.currentBlockIndex].class.onTouchMove();

}

CareersView.prototype.onTouchEnd = function () {

  this.isDragging = false;

  this.startY = 0;

  var diffTime = Date.now() - this.currentTimestamp;
  var diffDistance = Math.abs(this.lastDeltaY);

  if (diffTime > 75 && diffDistance > 75) {

    this.onScroll();

    diffTime = 0;
    diffDistance = 0;
  }

  this.lastDeltaY = 0;

  if (this.articles[this.currentBlockIndex].class.id === 'culture') this.articles[this.currentBlockIndex].class.onTouchEnd();

}

CareersView.prototype.onKeyDown = function (e) {

  if (e.keyCode === 38 || e.keyCode === 40) {

    CV.scrollYDirection = e.keyCode === 38 ? 'DOWN' : 'UP';
    this.onScroll();

  }

}

CareersView.prototype.updateStepIndex = function () {

  if (this.stepIsAnimating || CV.blockIsAnimating) return;
  this.stepIsAnimating = true;

  var scrollIndex = CV.scrollYDirection === 'DOWN' ? 0 : 1;

  if (this.articles[this.currentBlockIndex].class.stepsAnimation[this.currentStepIndex + scrollIndex] && this.currentStepIndex + scrollIndex <= this.articles[this.currentBlockIndex].class.steps) {

    var nextStep = this.currentStepIndex + scrollIndex;

    //if (this.currentStepIndex == -1) this.currentStepIndex = 0;

    if (nextStep != -1) {
      this.articles[this.currentBlockIndex].class.manageSteps(nextStep, (function () {

        if (scrollIndex == 0) this.currentStepIndex -= 1;
        else this.currentStepIndex = nextStep;

        this.articles[this.currentBlockIndex].class.currentStep = this.currentStepIndex;

        this.stepIsAnimating = false;

      }).bind(this));
    }
    else {

      this.currentScrollDirection = CV.scrollYDirection;
      this.stepIsAnimating = false;
      _hidePage.call(this);
    }

  }
  else {

    this.currentScrollDirection = CV.scrollYDirection;
    this.stepIsAnimating = false;
    _hidePage.call(this);

  }
  ;

}

CareersView.prototype.updateBlockIndex = function () {

  if (CV.blockIsAnimating || this.showIsAnimating) return;

  if (!this.menuClick) {

    this.currentBlockIndex = this.currentScrollDirection === 'DOWN' ? this.currentBlockIndex - 1 : this.currentBlockIndex + 1;

  }
  else {

    this.currentBlockIndex = this.menuIndex;
    this.menuClick = false;

  }


  _showPage.call(this);

}

CareersView.prototype.goToNextSection = function () {

  CV.scrollDeltaY = 60;
  CV.scrollY = 60;
  CV.scrollYDirection = 'UP';
  this.onScroll();

}

CareersView.prototype.onResize = function () {

  if (this.articles[this.currentBlockIndex].height <= CV.viewport.height && this.articles[this.currentBlockIndex].class.canScroll)
    this.articles[this.currentBlockIndex].height = this.articles[this.currentBlockIndex].class.hBlock;

  if (this.mainCanvasView) this.mainCanvasView.onResize();

  _.each(this.articles, function (view) {

    view.class.onResize();

  });

  PageView.prototype.onResize.call(this);

}

CareersView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

CareersView.prototype.onUpdate = function () {

  if (!this.articles || !this.articles[this.currentBlockIndex]) return;

  if (this.articles[this.currentBlockIndex].class.onUpdate) this.articles[this.currentBlockIndex].class.onUpdate()

}

module.exports = CareersView;
