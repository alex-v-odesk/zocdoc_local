'use strict';

var EVENT = require('app/events/events');
var pageManager = require('app/controller/pageManager');
var CV = require('app/config/currentValues');
var CONFIG = require('app/config/config');
var HeaderView = require('./main/views/headerView');
var Tools = require('app/tools/tools');
var Lethargy = require('Lethargy').Lethargy;
var FooterView = require('./main/views/footerView');

/**
 * MainView: Handles the main view logic - window/document event
 * @extend {abstract/view/DOM/DOMview}
 * @constructor
 */
var MainView = function (options, datas) {

  this.el = document.body;

  this.$el = $(this.el);

  this.idView = 'mainpage';

  this.$bodyHtml = $('body,html');

  this.$html = $('html');

  this.navColor = null;

  this.lethargy = null;

  this.hasOrientationChange = false;

  /*
   * Instance of Transition Gradient View
   */
  this.transitionGradientView = null;

  /*
   * Instance of Btn Menu View
   * @type {page/main/views/menu/btnMenuView}
   */
  this.headerView = null;

  /*
   * Instance of Global Footer View
   * @type {page/main/views/menu/btnMenuView}
   */
  this.footerView = null;

  /**
   * Meta viewport element
   * @type {element}
   * @private
   */
  this.metaViewport = null;

  /**
   * Main container
   * @type {jQuery element}
   * @private
   */
  this.$container = null;

  /**
   * html element
   * @type {jQuery element}
   * @private
   */
  this.$html = null;

  /**
   * body element
   * @type {jQuery element}
   * @private
   */
  this.$body = null;

  /**
   * body element
   * @type {jQuery element}
   * @private
   */
  this.$overlayMobile = null;

  /**
   * block the mouse event from anywhere
   * @type {boolean}
   */
  this.blockMouseEvent = false;

  /**
   * Usefull for touchMove: should we block the scroll or not?
   * @type {boolean}
   */
  this.canMove = true;

  /**
   * Usefull for touchMove: should we block the scroll or not?
   * @type {boolean}
   */
  this.itsSettled = false;

  /**
   * Reference to the RAF function
   * @type {function}
   */
  this.RAFFnc = null;

  this.pageManager = null;

  this.handlers = {};
  this.ticketScroll = false;

  /**
   * Is using the normal scroll behavior?
   * @type {boolean}
   */
  this.isNormalScroll = false;

  // I commented this out because the page dissapears when you hit the back button on safari.
  // the problem is caused by the back-forward cache

  // 1

  // reference
  CV.mainView=  this;

  Backbone.View.call(this, options, datas);

};

_.extend(MainView, Backbone.View);
_.extend(MainView.prototype, Backbone.View.prototype);


/**
 * @override
 */
MainView.prototype.initialize = function () {

  _onResize.call(this);

  this.bindMainEvents();

}

MainView.prototype.init = function () {

  this.$el.addClass(CV.isMobile ? 'isMobile' : 'isTablet');

  this.pageManager = new pageManager({mainView: this});

  this.$hide = $('.hide-content');
  this.$hideImg = $('.hide-content img');

  if (CV.isMobile) {
    TweenMax.fromTo(this.$hideImg, 1, {scale: 1}, {scale: 1.2, ease: Expo.easeOut, repeat: -1, yoyo: true});
  }

  this.listenTo(this.pageManager, EVENT.PAGE_RENDERED, _appendPage.bind(this));
  this.listenTo(this.pageManager, EVENT.SHOW_PAGE, _onShowPage.bind(this));
  this.listenTo(this.pageManager, EVENT.PAGE_SHOWN, _onPageShown.bind(this));
  this.listenTo(this.pageManager, EVENT.HIDE_PAGE, _onHidePage.bind(this));

  this.handlers.onUpdate = _onUpdate.bind(this);


  this.headerView = new HeaderView({el: this.$el.find('header')[0], mainView: this});
  this.headerView.init();
  this.listenTo(this.headerView, EVENT.MENU_ITEM_CLICKED, _onMenuItemClicked.bind(this));

  this.listenTo(this.pageManager, EVENT.RELAYOUT, _onRelayout.bind(this));

  this.footerView = new FooterView({el: this.$el.find('#footer')[0]});
  this.footerView.init();


  _onResize.call(this);
  _onUpdate.call(this);

  this.trigger(EVENT.INIT);

}

MainView.prototype.setNormalScrollBehavior = function (normalScrollBehavior_) {
  this.isNormalScroll = normalScrollBehavior_ !== undefined ? normalScrollBehavior_ : true;
  this.isNormalScroll ? this.$el.addClass('normalScrollBehavior') : this.$el.removeClass('normalScrollBehavior');
  TweenMax.set(this.$bodyHtml, {scrollTo: 0});
  TweenMax.set(this.$container, {scrollTo: 0});
}

// Init after we have a current view for the first time
MainView.prototype.firstInit = function() {
  if (this.hasOrientationChange) _onOrientationChange.call(this, true);
}

var _onShowPage = function () {

  if (this.footerView) {
    this.footerView.onResize();
    this.footerView.show();
  }

  if (this.headerView) {
    this.headerView.onResize();
    this.headerView.show();
  }

  if (this.pageManager && this.pageManager.currentPage && this.pageManager.currentPage.options.slug === 'careers') this.listenTo(this.pageManager.currentPage, EVENT.CAREER_BLOCK_UPDATED, _onBlockUpdated.bind(this));

}

var _onPageShown = function () {

}

var _onHidePage = function () {

  if (this.footerView) this.footerView.hide();
  if (this.headerView) this.headerView.hide();

}

var _onRelayout = function () {

}

/**
 * Bind all the main window/document event here.
 */
MainView.prototype.bindMainEvents = function () {

  this.$html = $('html');
  this.$container = $('#container');
  this.$body = $('body');

  window.addEventListener("resize", _onResize.bind(this), false);
  document.addEventListener("keydown", $.proxy(_onKeyDown, this), false);

  // For weird device which has orientationchange and no resize
  if("onorientationchange" in window && !"resize" in window) {
    window.addEventListener("orientationchange", $.proxy(_onOrientationChange, this), false);
    this.hasOrientationChange = true;
  } else {
    window.addEventListener("resize",  _onResize.bind(this), false);
  }

  // Just in case
  if (Detectizr.device.type === "mobile" && !this.hasOrientationChange) {
    window.addEventListener("orientationchange", $.proxy(_onOrientationChange, this), false);
    this.hasOrientationChange = true;
  }

  //this.lethargy = new Lethargy(25, 120, 0.05);
  this.lethargy = new Lethargy(15, 50, 0.05);



  $(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll', $.proxy(_onScroll, this));

  this.$body[0].addEventListener("touchstart", $.proxy(_onTouchStart, this), false);
  this.$body[0].addEventListener("touchmove", $.proxy(_onTouchMove, this), false);
  this.$body[0].addEventListener("touchend", $.proxy(_onTouchEnd, this), false);

}

MainView.prototype.setCurrentPage = function () {

}

MainView.prototype.calculateScrollY = function () {

  if (this.$container !== null) CV.scrollY = -this.$container[0].getBoundingClientRect().top;
  else CV.scrollY = window.scrollY || window.pageYOffset;
  //console.log('calculateScrollY', CV.scrollY);
}

var _onMenuItemClicked = function (e) {

  if (this.pageManager && this.pageManager.currentPage && (this.pageManager.currentPage.options.slug === 'careers' || this.pageManager.currentPage.options.slug === 'healthsystems') && this.pageManager.currentPage.onMenuClicked) this.pageManager.currentPage.onMenuClicked(e.index, e.target);

}

var _onBlockUpdated = function (e) {

  if (this.pageManager && this.pageManager.currentPage && (this.pageManager.currentPage.options.slug === 'careers' || this.pageManager.currentPage.options.slug === 'healthsystems') && this.pageManager.currentPage.onMenuClicked) this.headerView.updatedMenuItems(e.index, e.target);
}

/**
 * On Orientation change
 */
var _onOrientationChange = function(force_) {
  // console.log('_onOrientationChange', e, window.innerHeight < window.innerWidth);
  var force = force_ !== undefined ? force_ : false;
  this.isLandscape = window.innerHeight < window.innerWidth;

  if (window.screen && window.screen.orientation !== undefined) this.isLandscape = (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90)

  _addLandscapeOverlay.call(this);
  if (!force) _onResize.call(this);
}

/**
 * add landscape overlay
 */
var _addLandscapeOverlay = function() {

   // only on mobile
   if (Detectizr.device.type !== "mobile") return;

   if (this.pageManager.currentPage && (this.pageManager.currentPage.options.slug === 'careers' || this.pageManager.currentPage.options.slug === 'healthsystems')) {
     this.isLandscape ? TweenMax.to(this.$hide, .1, {autoAlpha: 1, display: 'flex', ease: Expo.easeOut}) : TweenMax.to(this.$hide, .1, {autoAlpha: 0, display: 'none', ease: Expo.easeOut});
   }

}

var _onScroll = function (e) {

  if (CV.blockIsAnimating) return;

  //console.log("_onScroll - CV.blockIsAnimating", CV.blockIsAnimating);

  this.ticketScroll = true;
  CV.isScrolling = true;

  var lastDeltaY = e.wheelDeltaY;

  CV.scrollDeltaY = lastDeltaY;

  if (this.lethargy.check(e) !== false) {

    if (this.lethargy.check(e) === -1) {
      CV.scrollYDirection = 'UP';
    }else if (this.lethargy.check(e) === 1) {
      CV.scrollYDirection = 'DOWN';
    }

    // console.log(CV.scrollDeltaY);

    if (this.pageManager && this.pageManager.currentPage && this.pageManager.currentPage.onScroll) this.pageManager.currentPage.onScroll();
  }

  //CV.scrollYDirection = lastDeltaY <= 0 ? 'UP' : 'DOWN';

}

var _onUpdate = function () {

  // if ( CV.isTouching)
  // console.log('CV.isTouching', -this.$container[0].getBoundingClientRect().top);

  if (this.ticketScroll || CV.isTouching) {
    this.calculateScrollY();
  } else {
    CV.isScrolling = false;
  }

  this.ticketScroll = false;

  if (this.pageManager && this.pageManager.currentPage) this.pageManager.currentPage.update();

  this.headerView.onUpdate();
  this.footerView.onUpdate();

  // if (this.pageManager.currentPage && (this.pageManager.currentPage.options.slug === 'careers' || this.pageManager.currentPage.options.slug === 'healthsystems')) {
  //
  //   if (CV.isMobile && window.matchMedia("(orientation: landscape)").matches) {
  //
  //     TweenMax.to(this.$hide, .1, {autoAlpha: 1, display: 'flex', ease: Expo.easeOut});
  //     this.isLandscape = true;
  //
  //   }
  //   else if (this.isLandscape) {
  //
  //     TweenMax.to(this.$hide, .1, {autoAlpha: 0, display: 'none', ease: Expo.easeOut});
  //     this.isLandscape = false;
  //
  //   }
  //
  // }

  window.requestAnimationFrame(this.handlers.onUpdate);

}

var _onTouchStart = function (e) {

  CV.touch.x = CV.touch.startX = e.touches[0].clientX;
  CV.touch.y = CV.touch.startY = e.touches[0].clientY;

  CV.touch.deltaX = 0;
  CV.touch.deltaY = 0;

  CV.isTouching = true;

  this.ticketScroll = true;

  // this.startY = CV.touch.startY;

  this.calculateScrollY();

  if (this.pageManager && this.pageManager.currentPage && this.pageManager.currentPage.onTouchStart) this.pageManager.currentPage.onTouchStart();

}

var _onTouchMove = function (e) {

  if (this.pageManager && this.pageManager.currentPage && this.pageManager.currentPage.articles && !this.pageManager.currentPage.articles[this.pageManager.currentPage.currentBlockIndex].class.canScroll
      && (CV.currentPage == 'careers' || CV.currentPage == 'healthsystems') && e.touches[0].clientY > 80 && !this.isNormalScroll) {
          e.preventDefault();
      }

  // this.ticketScroll = true;



  CV.touch.x = e.touches[0].clientX;
  CV.touch.y = e.touches[0].clientY;

  CV.touch.deltaX = CV.touch.x - CV.touch.startX;
  CV.touch.deltaY = CV.touch.y - CV.touch.startY;

  // console.log('CV.touch.y', CV.touch.y, 'CV.touch.deltaY', CV.touch.deltaY);

  CV.scrollY -= CV.touch.deltaY;

  // Don't forget to reset!
  CV.touch.startX = CV.touch.x;
  CV.touch.startY = CV.touch.y;

  // CV.dragY = this.startY - (CV.touch.startY - CV.touch.deltaY);

  // if (this.$container !== null) CV.scrollY = -this.$container[0].getBoundingClientRect().top;
  // else CV.scrollY = window.scrollY || window.pageYOffset;

  if (this.pageManager && this.pageManager.currentPage && this.pageManager.currentPage.onTouchMove) this.pageManager.currentPage.onTouchMove(e);

}

var _onTouchEnd = function (e) {

  //CV.scrollY = e.pageY;
  CV.isTouching = false;
  this.ticketScroll = false;

  CV.touch.startX = 0;
  CV.touch.startY = 0;

  // this.startY = 0;

  if (this.pageManager && this.pageManager.currentPage && this.pageManager.currentPage.onTouchEnd) this.pageManager.currentPage.onTouchEnd();

}

var _onResize = function () {

  CV.viewport.width = CV.viewport.wrapperWidth = $(document).width();
  CV.viewport.height = $(window).height();

  CV.breakpoint = CV.viewport.width <= 922 ? "sml" : "default";
  // there is also a 1280 breakpoint now.

  if (CV.viewport.width >= 1600)CV.viewport.wrapperWidth = 1600;

  this.calculateScrollY();

  if (this.pageManager && this.pageManager.currentPage) this.pageManager.currentPage.onResize();

  if (this.headerView) this.headerView.onResize();
  if (this.footerView) this.footerView.onResize();

}

var _onKeyDown = function (e) {

  CV.keyCode = e.keyCode;

  if (this.pageManager && this.pageManager.currentPage) this.pageManager.currentPage.onKeyDown(e);

}

var _appendPage = function () {

  // this.$container.append(this.pageManager.currentPage.el);
  this.$el.addClass('show');

}


module.exports = new MainView();
