var CV = require('app/config/currentValues');
var Config = require('app/config/config');
var EVENT = require('app/events/events');
var Tools = require('app/tools/tools');
var BaseView = require('app/abstract/baseView');
require('ScrollTo');

var HeaderView = function (options, datas) {

  this.canUpdate = true;

  this.indexMenu = 0;
  this.isFirstLoad = true;

  this.currentMenuIndex = 0;

  this.managerMenu = this.managerMenu.bind(this);

  this.events = {
    'click .back-btn': 'backJobList',
    'click .anchors li': 'managerMenu',
    'click .dropdown-cta': 'onDropDownClicked',
    'click .btn-search': (function () {

      if (this.options.mainView.pageManager.currentPage.managerSearchField)this.options.mainView.pageManager.currentPage.managerSearchField();

    }).bind(this)
  };

  BaseView.call(this, options, datas);

};

_.extend(HeaderView, BaseView);
_.extend(HeaderView.prototype, BaseView.prototype);

HeaderView.prototype.initDOM = function () {

  BaseView.prototype.initDOM.call(this);

}

HeaderView.prototype.setupDOM = function () {

}

HeaderView.prototype.onDOMInit = function () {

  if(window.location.href.indexOf('careers-list') === -1)TweenMax.set(window, {scrollTo: 0});

  this.$menu = this.$el.find('.content-menu');
  this.$links = this.$el.find('.content-menu li');
  this.$navigation = this.$el.find('.navigation');
  this.$topicsDropdown = this.$el.find('.topics-bar');
  this.$topicsBar = this.$el.find('.topics-bar ul');
  this.$contentNavigation = this.$el.find('.content-navigation');
  this.$contentLinks = this.$el.find('.content-navigation');
  this.$articleTitle = this.$el.find('.article-title');
  this.$articleTitleContent = this.$el.find('.article-title span');

  this.haveMenu = this.$links[0] ? true : false;

  this.targets = [];

  _.each(this.$links, (function (el) {

    this.targets.push($(el).attr('data-id'));

  }).bind(this));

  this.targetMenu = this.targets[this.indexMenu];

  $(this.$links[this.indexMenu]).addClass('active');

  if (this.haveMenu)this.initMenuItems();

  BaseView.prototype.onDOMInit.call(this);

}

HeaderView.prototype.initTL = function () {

}

HeaderView.prototype.show = function () {

}

HeaderView.prototype.hide = function () {

}

HeaderView.prototype.onDropDownClicked = function () {

  $(this.$topicsDropdown).toggleClass('active');
  $(this.$el).toggleClass('border');

}

HeaderView.prototype.bindEvents = function () {

  BaseView.prototype.bindEvents.call(this);

}

HeaderView.prototype.onResize = function () {

  if (this.canResize) this.initMenuItems();

}

HeaderView.prototype.initMenuItems = function () {

  this.menuBuilding = true;
  this.menuWidth = CV.viewport.width / 2;
  this.itemsMenu = [];
  var w;

  _.each(this.$links, (function (el) {

    w = $(el).width();

    if (!$(el).attr('data-id')) return;

    this.menuWidth += w;

    this.itemsMenu.push({
      el: el,
      hash: $(el).attr('data-id'),
      width: w,
      offsetTop: document.querySelector("." + $(el).attr('data-id')).offsetTop,
      scroll: this.menuWidth - w / 2 - CV.viewport.width / 2
    });

  }).bind(this));

  if (!this.itemsMenu[0]) return;

  this.mobileNavOffset = CV.viewport.width / 2 - 15;

  this.menuWidth = this.menuWidth - this.itemsMenu[this.itemsMenu.length - 1].width / 2 - 15;

}


HeaderView.prototype.backJobList = function (e) {

  e.preventDefault();

  var dep = $('#job-detail').attr('data-anchor');

  if (!dep) return;

  dep = dep.toLowerCase().replace(/ & /g, "-");
  dep = dep.toLowerCase().replace(/ /g, "-");
  window.location.href = 'http://' + window.location.hostname + '/about/careers-list/';

  localStorage.setItem('dept', dep);


}

HeaderView.prototype.managerMenu = function (e) {

  if (CV.currentPage != 'careers' && CV.currentPage != 'healthsystems' || this.options.mainView.pageManager.currentPage.blockIsAnimating || this.options.mainView.pageManager.currentPage.showIsAnimating || this.options.mainView.pageManager.currentPage.stepIsAnimating || CV.blockIsAnimating) return;

  var index = e.currentTarget ? $(e.currentTarget).attr('data-index') : e;
  this.targetMenu = e.currentTarget ? $(e.currentTarget).attr('data-id') : e;

  if (this.currentMenuIndex === parseInt(index) || CV.overlayActive) return;

  this.currentMenuIndex = parseInt(index);

  this.updatedMenuItems(index);

  this.trigger(EVENT.MENU_ITEM_CLICKED, {index: parseInt(index), target: this.targetMenu});

}

HeaderView.prototype.updatedMenuItems = function (index) {

  $(this.$links[this.indexMenu]).removeClass('active');
  this.indexMenu = parseInt(index);
  this.currentMenuIndex = parseInt(index);
  this.targetMenu = $(this.$links[index]).attr('data-id');
  $(this.$links[this.indexMenu]).addClass('active');

  if (CV.isMobile) {

    TweenMax.to(this.$contentNavigation, .7, {
      scrollTo: {x: this.itemsMenu[this.indexMenu].scroll},
      ease: Expo.easeInOut
    });
  }

}

module.exports = HeaderView;
