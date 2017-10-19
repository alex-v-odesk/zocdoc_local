'use strict';

var EVENT = require('./../events/events'),
    CareersView = require('./../views/pages/careers/intro/careersView'),
    JobDetailView = require('./../views/pages/careers/detail/jobDetailView'),
    CareersListView = require('./../views/pages/careers/list/careersListView'),
    BlogView = require('./../views/pages/blog/blogView'),
    BlogPostView = require('./../views/pages/blog/blogPostView'),
    BlogTopicView = require('./../views/pages/blog/blogTopicView'),
    FourOFourView = require('./../views/pages/fourOFour/fourOFourView'),
    HealthSystemsView = require('./../views/pages/healthSystems/healthSystemsView'),
    CV = require('./../config/currentValues');

var PageManager = function (options) {

  this.mainAppView = options.mainView;
  /*
   * Instance of Page
   * @type {abstract/controller}
   */

  this.currentPage = null;

  /*
   * Instance of Page
   * @type {abstract/controller}
   */
  this.oldPage = null;

  /*
   * object as an associative array
   * @type {Object}
   */
  this.pages = {};

  _.extend(this, Backbone.Events);

}


/*
 * Handles the initialization
 */
PageManager.prototype.init = function () {

  _initPages.call(this);

}

/*
 * Entry point to change pages
 * @param {Object} page of the page to navigate to.
 */
PageManager.prototype.navigateTo = function (page, params, category, theme) {

  var el = null;

  if (this.oldPage == null && this.currentPage == null) {

    el = document.getElementsByClassName('page-wrapper')[0];

    if (el.id == '404') {
      page = '404';
      params = null;
    } else if (el.id == 'legacy') {
      page = 'legacy';
      params = 'legacy';
    }
  }

  var newPage = this.getCurrentPage(page, params, category, theme);

  //CV.isAnimating = true;

  if (this.currentPage) this.oldPage = this.currentPage;

  CV.currentPage = newPage.id;

  // remove if the legacy page needs a view
  if (newPage.id === 'legacy') return;

  this.currentPage = new newPage.view({
    slug: params,
    mainAppView: this.mainAppView,
    el: this.currentPage ? null : el,
    category: !category ? null : category,
    theme: !theme ? null : theme
  }, {});

  if (CV.firstTime) CV.mainView.firstInit();

  this.listenToOnce(this.currentPage, EVENT.PAGE_RENDERED, _onPageRendered.bind(this));
  this.currentPage.initializeRender();

}

PageManager.prototype.getCurrentPage = function (page, params, category, theme) {

  if (page == null) page = 'index';

  switch (params) {

    case 'careers':
      return (params && category && !theme) ? {id: 'job-detail', view: JobDetailView} : {
        id: 'careers',
        view: CareersView
      };
      break;

    case 'careers-list':
      return {id: 'careers-list', view: CareersListView};
      break;

    case 'healthsystems':
      return {id: 'healthsystems', view: HealthSystemsView};
      break;

    case 'blog':
      if (params && category && theme) {
        return {id: 'blog-post', view: BlogPostView};
      } else if (params && category) {
        return {id: 'blog-topic', view: BlogTopicView};
      } else {
        return {id: 'blog', view: BlogView};
      }
      break;

    case 'legacy':
      return {id: 'legacy', view:null};
    break;

    case '404':
    default:
      return {id: 'four-o-four', view: FourOFourView};
  }

}

PageManager.prototype.onError = function () {

  Backbone.history.navigate('404', {trigger: false});
  this.navigateTo('404');

}

var _onPageRendered = function () {

  //JS rendered here
  if (!this.oldPage) this.trigger(EVENT.PAGE_RENDERED);

  this.listenToOnce(this.currentPage, EVENT.INIT, _onPageReady.bind(this));
  this.currentPage.init();

  document.body.setAttribute("data-currentpage", CV.currentPage);
  document.documentElement.setAttribute("data-currentpage", CV.currentPage);

}

var _onPageReady = function () {

  this.stopListening(this.currentPage, EVENT.INIT);

  if (this.oldPage) {

    this.trigger(EVENT.HIDE_PAGE)
    this.listenToOnce(this.oldPage, EVENT.HIDDEN, _onPageHidden.bind(this));
    this.oldPage.hide();

  } else {

    //first page
    //direct Show
    this.trigger(EVENT.SHOW_PAGE)
    this.listenToOnce(this.currentPage, EVENT.SHOWN, _onPageShown.bind(this));
    this.currentPage.show(true);
  }

}

var _onPageHidden = function () {

  this.listenToOnce(this.currentPage, EVENT.SHOWN, _onPageShown.bind(this));

  // dispose now!
  if (this.oldPage) {
    _removeOldPage.call(this);
  }

  //here we hide old page so it's not direct
  //we appended the new page on the DOM
  setTimeout((function () {

    this.trigger(EVENT.SHOW_PAGE)
    this.currentPage.show(false);

  }).bind(this), 0)

}


var _onPageShown = function () {

  this.listenTo(this.currentPage, EVENT.RELAYOUT, _onRelayout.bind(this));

  CV.isAnimating = false;
  CV.firstTime = false;

  this.trigger(EVENT.PAGE_SHOWN);

}

var _onRelayout = function () {
  this.trigger(EVENT.RELAYOUT);
}

var _removeOldPage = function () {

  if (this.oldPage) {

    this.stopListening(this.oldPage, EVENT.HIDDEN);
    this.stopListening(this.oldPage, EVENT.SHOWN);
    this.stopListening(this.oldPage, EVENT.RELAYOUT);

    this.oldPage.dispose();
  }

  this.oldPage = null;

}

module.exports = PageManager;
