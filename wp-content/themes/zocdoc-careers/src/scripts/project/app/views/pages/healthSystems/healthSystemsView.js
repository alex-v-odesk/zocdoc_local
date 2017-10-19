var PageView = require('app/abstract/pageView');
var CV = require('app/config/currentValues');
var Config = require('app/config/config');
var EVENT = require('app/events/events');
var Loader = require('app/tools/loader');
var ScrollTo = require('ScrollTo');

//--------0 Views
var StartView = require('./parts/startView');
var MarketView = require('./parts/marketView');
var IntroView = require('./parts/introView');
var CalendarView = require('./parts/calendarView');
var PatientView = require('./parts/patientView');
var PercentageView = require('./parts/percentageView');
var LoyaltyView = require('./parts/loyaltyView');
var SmartView = require('./parts/smartView');
var StarsView = require('./parts/starsView');
var SeriesView = require('./parts/seriesView');
var ContactView = require('./parts/contactView');
var ClientsView = require('./parts/clientsView');

//--------0 Canvas
var HSCanvasView = require('./parts/healthSystemsCanvasView');

var HealthSystemsView = function (options, datas) {

  //--------0 Prototype
  this.canUpdate = true;

  this.ease = 0;
  this.articles = [];

  this.views = {
    start: StartView,
    calendar: CalendarView,
    patient: PatientView,
    clients: ClientsView,
    market: MarketView,
    intro: IntroView,
    percentage: PercentageView,
    loyalty: LoyaltyView,
    smart: SmartView,
    stars: StarsView,
    series: SeriesView,
    contact: ContactView
  };

  CV.blockIsAnimating = true;
  this.showIsAnimating = false;
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
  this.isIframeInit = false;
  this.blockScroll = false;

  this.assetsAreLoaded = this.assetsAreLoaded.bind(this);

  // TODO : debug
  window.healthPage = this;

  PageView.call(this, options, datas);

}

_.extend(HealthSystemsView, PageView);
_.extend(HealthSystemsView.prototype, PageView.prototype);

HealthSystemsView.prototype.initDOM = function () {

  this.$body = $('body');
  this.$html = $('html');
  this.$bodyHtml = $('body,html');
  this.$footer = $('#page-footer');
  this.$articles = this.$el.find('article');
  this.$overlay = $('.overlay-bg');
  this.$svgFace = this.$el.find('.zeeface-svg');
  this.$canvas = this.$el.find('#main-canvas')[0];
  this.$iFrameContainer = this.$el.find('.iframe-container .wrapper');
  this.$pardotOverlay = this.$el.find('.pardot-overlay');
  this.$btnOverlayClose = this.$iFrameContainer.find('.btn-close');
  this.$btnContact = this.$el.find('.hs-btn-contact');
  this.$btnContactHeader = $('.hs-header-btn-contact');

  for (var i = 0; i < this.$btnContact.length; i++) {
    this.$btnContact[i].addEventListener('click', $.proxy(this.showPardotOverlay, this), false);
  }
  this.$btnContactHeader[0].addEventListener('click', $.proxy(this.showPardotOverlay, this), false);
  this.$btnOverlayClose[0].addEventListener('click', $.proxy(this.hidePardotOverlay, this), false);

  TweenMax.to(window, .1, {scrollTo: 0});

  PageView.prototype.initDOM.call(this);

}

HealthSystemsView.prototype.onDOMInit = function () {

  this.initLoader();

  // TweenMax.set(window, {scrollTo: 0});
  // TweenMax.set(this.$html, {overflowY: 'hidden'});

  CV.mainView.setNormalScrollBehavior(false);

  if (!Config.isDevMode)TweenMax.set(this.$el.find(".loader"), {display: 'block'});

  this.mainCanvasView = new HSCanvasView({el: this.$canvas}, null);
  this.mainCanvasView.init();
  var name;
  var currentView;
  var $el;
  var bdr;
  var hBlock;
  var hContent = 0;

  // --------0 Init dynamically the different subView with the DOM class name
  _.each(this.$articles, (function (el, i) {

    $el = $(el);
    name = $el.attr('class').split(' ')[0];
    bdr = $el[0].getBoundingClientRect();
    hBlock = $el.height();

    currentView = new this.views[name]({el: el, mainCanvasView: this.mainCanvasView, mainView: this}, null);
    currentView.init();

    if (currentView.canScroll) {

      hContent = 0;

      _.each($("." + name + " .scroll-content"), (function (el) {

        hContent += $(el).height();

      }).bind(this));

      hBlock = hContent;

    }

    this.listenTo(currentView, EVENT.BLOCK_SHOWN, _onPageShown.bind(this));
    this.listenTo(currentView, EVENT.BLOCK_HIDDEN, _onPageHidden.bind(this));
    this.listenTo(currentView, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
    this.listenTo(currentView, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

    this.articles[i] = {
      name: name,
      class: currentView,
      height: hBlock,
      bdr: bdr,
      top: bdr.top
    };

  }).bind(this));

  this.createIframe();

  PageView.prototype.onDOMInit.call(this);

}

HealthSystemsView.prototype.createIframe = function () {

  var form = 'http://pardot.zocdoc.com/l/45052/2016-10-25/8bh21p';
  var params = window.location.search;
  var iframe = document.createElement('iframe');

  iframe.setAttribute('src', form + params);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', 500);
  iframe.setAttribute('type', 'text/html');
  iframe.setAttribute('frameborder', 0);
  iframe.setAttribute('allowTransparency', 'true');
  iframe.style.border = '0';
  $(this.$iFrameContainer).append(iframe);
  this.isIframeInit = true;

}

HealthSystemsView.prototype.showPardotOverlay = function () {

  if (!this.isIframeInit) return;

  CV.overlayActive = true;
  this.blockScroll = true;
  $(this.$pardotOverlay).addClass('active');

}

HealthSystemsView.prototype.hidePardotOverlay = function () {

  if (!this.isIframeInit) return;

  CV.overlayActive = false;
  this.blockScroll = false;
  $(this.$pardotOverlay).removeClass('active');

}

HealthSystemsView.prototype.initLoader = function () {

  this.loader = new Loader([
    {
      path: 'sprites-calendar-0',
      name: 'calendar_',
      format: '.png',
      first: 0,
      end: 77
    },
    {
      path: 'sprites-calendar-1',
      name: 'calendar_',
      format: '.png',
      first: 113,
      end: 146
    },
    {
      path: 'sprites-calendar-2',
      name: 'calendar_',
      format: '.png',
      first: 187,
      end: 229
    },
    {
      path: 'sprites-zeeface',
      name: 'Zsmile_',
      format: '.png',
      first: 39,
      end: 95
    }
  ], this.assetsAreLoaded.bind(this));

}

HealthSystemsView.prototype.assetsAreLoaded =   function (perc) {

  if (!this.articles[0]) return;

  /*
   * edit here to clear the callstack before hiding the background overlay.
   * added a bit of timeout time just to make sure there is no flicker between bg to canvas.
   * give this a 10 millisecond head start.
   */
  this.articles[0].class.isLoaded = true;
  this.articles[0].class.animateZee();
  CV.scrollYDirection = "UP";

  setTimeout(function () {

    this.$overlay.css({
      "display": "none",
      "visibility": "none",
      "opacity": 0,
    });

  }.bind(this), 10);

}

HealthSystemsView.prototype.onMenuClicked = function (index, target) {

  if (this.stepIsAnimating || CV.blockIsAnimating || this.menuClick) return;

  _.each(this.articles, (function (article, i) {

    if (target == article.name) this.menuIndex = i;

  }).bind(this));

  if (this.menuIndex == this.currentMenuIndex) return;

  this.currentMenuIndex = this.menuIndex;
  this.menuClick = true;
  _hidePage.call(this);

}

HealthSystemsView.prototype.updateMenu = function () {

  if (this.stepIsAnimating || CV.blockIsAnimating || this.menuClick) return;

  var targetI;
  _.each(this.articles, (function (article, i) {

    if (this.options.mainAppView.headerView.targetMenu == article.name) targetI = i;

  }).bind(this));


  if (targetI >= this.currentBlockIndex && this.options.mainAppView.headerView.indexMenu > 0) {

    this.currentMenuIndex = this.options.mainAppView.headerView.indexMenu - 1;
    this.options.mainAppView.headerView.updatedMenuItems(this.options.mainAppView.headerView.indexMenu - 1);

  }
  else {
    _.each(this.options.mainAppView.headerView.targets, (function (target, i) {
      if (target == this.articles[this.currentBlockIndex].name) {

        this.currentMenuIndex = i;
        this.options.mainAppView.headerView.updatedMenuItems(i);
        return;

      }

    }).bind(this));
  }

}

HealthSystemsView.prototype.onTouchStart = function () {

  CV.scrollYDirection = null;

  this.currentTimestamp = Date.now();

  this.startY = CV.touch.startY;

}

HealthSystemsView.prototype.onTouchMove = function (e) {

  this.lastDeltaY = this.startY - (CV.touch.startY - CV.touch.deltaY);

  CV.scrollYDirection = this.lastDeltaY < 0 ? 'DOWN' : 'UP';

  this.isDragging = true;

}

HealthSystemsView.prototype.onTouchEnd = function () {

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

}

HealthSystemsView.prototype.onKeyDown = function (e) {

  if (e.keyCode === 38 || e.keyCode === 40) {

    CV.scrollYDirection = e.keyCode === 38 ? 'DOWN' : 'UP';
    this.onScroll();

  }

}

HealthSystemsView.prototype.onScroll = function () {

  if (!this.articles[this.currentBlockIndex] || CV.blockIsAnimating || !this.bothAreShown || this.blockScroll) return;

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

    this.updateStepIndex();
    return;

  }

  this.currentScrollDirection = CV.scrollYDirection;

  _hidePage.call(this);

}

HealthSystemsView.prototype.updateStepIndex = function () {


  if (this.stepIsAnimating || CV.blockIsAnimating) return;

  this.stepIsAnimating = true;
  CV.blockIsAnimating = true;

  var scrollIndex = CV.scrollYDirection === 'DOWN' ? 0 : 1;

  if (this.articles[this.currentBlockIndex].class.stepsAnimation[this.currentStepIndex + scrollIndex] && this.currentStepIndex + scrollIndex <= this.articles[this.currentBlockIndex].class.steps) {
    //console.log("updateStepIndex 0")
    var nextStep = this.currentStepIndex + scrollIndex;

    if (nextStep != -1) {
      this.articles[this.currentBlockIndex].class.manageSteps(nextStep, (function () {

        if (scrollIndex == 0) this.currentStepIndex -= 1;
        else this.currentStepIndex = nextStep;

        this.articles[this.currentBlockIndex].class.currentStep = this.currentStepIndex;

        this.stepIsAnimating = false;
        CV.blockIsAnimating = false;

        if (CV.scrollYDirection == "DOWN" && this.currentStepIndex == -1) {
          _hidePage.call(this);
        }

      }).bind(this));
    }
    else {
      //console.log("updateStepIndex 1")
      this.currentScrollDirection = CV.scrollYDirection;
      this.stepIsAnimating = false;
      CV.blockIsAnimating = false;
      this.currentStepIndex = -1;
      _hidePage.call(this);
    }

  }
  else {
    //console.log("updateStepIndex 2")
    this.currentScrollDirection = CV.scrollYDirection;
    this.stepIsAnimating = false;
    CV.blockIsAnimating = false;
    this.currentStepIndex = -1;
    _hidePage.call(this);

  }
  ;

}


var _hidePage = function () {

  CV.blockIsAnimating = true;
  this.articles[this.currentBlockIndex].class.hide();

}

var _onPageHidden = function () {

  this.isViewShown = false;

  if (!this.isViewShown && !this.isCanvasShown) {

    //console.log("_onPageHidden this.bothAreShown = false;");
    //console.log("_onPageHidden updateBlockIndex");
    this.bothAreShown = false;
    CV.blockIsAnimating = false;
    this.updateBlockIndex();
  }

}

var _onCanvasHidden = function () {

  this.isCanvasShown = false;

  if (!this.isViewShown && !this.isCanvasShown && !this.isAnimating) {

    //console.log("_onCanvasHidden updateBlockIndex");
    this.bothAreShown = false;
    CV.blockIsAnimating = false;
    this.updateBlockIndex();
  }

}

HealthSystemsView.prototype.updateBlockIndex = function () {

  if (CV.blockIsAnimating || this.showIsAnimating || this.stepIsAnimating) return;

  if (!this.menuClick) {

    this.currentBlockIndex = CV.scrollYDirection === 'DOWN' ? this.currentBlockIndex - 1 : this.currentBlockIndex + 1;

    if (this.currentBlockIndex < 0) {
      // this happens on happy/glitchy/fast scroll.
      this.currentBlockIndex = 0;
    }

    if (this.currentBlockIndex == this.articles.length) this.currentBlockIndex = this.articles.length - 2;
    this.updateMenu();

  }
  else {

    this.currentBlockIndex = this.menuIndex;
  }

  _showPage.call(this);

}

var _showPage = function () {

  if (CV.blockIsAnimating || this.showIsAnimating || this.stepIsAnimating) return;

  CV.blockIsAnimating = true;

  this.showIsAnimating = true;

  this.onMenuClicked();

  this.articles[this.currentBlockIndex].class.show();

}

var _onPageShown = function () {

  this.currentStepIndex = -1;
  this.stepIsAnimating = false;
  this.isViewShown = true;
  CV.blockIsAnimating = false;
  this.showIsAnimating = false;
  this.menuClick = false;

  //console.log("_onPageShown this.isViewShown = true;");

  if (this.isViewShown && this.isCanvasShown) {

    this.bothAreShown = true;
    //console.log("_onPageShown");

  }

}

var _onCanvasShown = function () {

  this.isCanvasShown = true;

  //console.log("_onCanvasShown this.isCanvasShown = true;");

  if (this.isViewShown && this.isCanvasShown) {
    //console.log("_onCanvasShown");
    this.bothAreShown = true;
    CV.blockIsAnimating = false;
  }

}

HealthSystemsView.prototype.goToNextSection = function () {

  if (CV.blockIsAnimating || this.showIsAnimating || this.stepIsAnimating) return;

  CV.scrollDeltaY = 60;
  CV.scrollY = 60;
  CV.scrollYDirection = 'UP';
  this.onScroll();

}

HealthSystemsView.prototype.goToPreviousSection = function () {

  if (CV.blockIsAnimating || this.showIsAnimating || this.stepIsAnimating) return;

  CV.scrollDeltaY = 60;
  CV.scrollY = 60;
  CV.scrollYDirection = 'DOWN';
  this.onScroll();

}

HealthSystemsView.prototype.onResize = function () {

  if (CV.isMobile) return

  if (this.mainCanvasView) this.mainCanvasView.onResize();

  _.each(this.articles, function (view) {

    view.class.onResize();

  });

  PageView.prototype.onResize.call(this);

}

HealthSystemsView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

HealthSystemsView.prototype.onUpdate = function () {

  if (!this.articles || !this.articles[this.currentBlockIndex] || !CV.isScrolling) return;

  if (this.articles[this.currentBlockIndex].class.canUpdate) this.articles[this.currentBlockIndex].class.onUpdate();

}

module.exports = HealthSystemsView;
