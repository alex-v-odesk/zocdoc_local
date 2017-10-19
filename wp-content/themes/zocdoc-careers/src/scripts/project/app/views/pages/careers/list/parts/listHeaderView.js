var BaseView = require('abstract/baseView');
var ListHeaderCanvasView = require('canvas/careers/list/listHeaderCanvasView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var ListHeaderView = function (options, datas) {

  //--------0 Prototype
  this.canUpdate = true;

  this.$canvasElement = null;
  this.canvasMask = null;

  this.events = {
    'click': 'onClickContent'
  };

  BaseView.call(this, options, datas);

}

_.extend(ListHeaderView, BaseView);
_.extend(ListHeaderView.prototype, BaseView.prototype);

ListHeaderView.prototype.initDOM = function () {

  this.$canvasElement = this.$el.find('.canvas');
  this.$cover = this.$el.find('.cover');
  this.$layer = this.$el.find('.layer');
  this.$content = this.$el.find('.content');

  BaseView.prototype.initDOM.call(this);
}

ListHeaderView.prototype.onDOMInit = function () {

  this.canvasMask = new ListHeaderCanvasView({el: this.$canvasElement[0], mainView: this.options.mainView}, null);
  this.canvasMask.init();

  this.listenTo(this.canvasMask, EVENT.JOIN_BLOB_CLICKED, $.proxy(_onExploreClicked, this));

  TweenMax.to(this.$content, .4, {opacity: 1, ease: Expo.easeOut, delay: .1});
  TweenMax.to(this.$cover, .4, {opacity: 1, ease: Expo.easeOut, delay: .15});
  TweenMax.to(this.$layer, .4, {opacity: 1, ease: Expo.easeOut, delay: .2});
  TweenMax.to(this.$canvasElement, .4, {opacity: 1, ease: Expo.easeOut, delay: .2});

  BaseView.prototype.onDOMInit.call(this);

}

ListHeaderView.prototype.onClickContent = function (e) {

  this.canvasMask.mouseDown({x: e.clientX, y: e.clientY});

}

var _onExploreClicked = function (e) {

  TweenMax.to(window, .8, {
    scrollTo: CV.viewport.height,
    ease: Expo.easeInOut,
    onUpdate: (function () {

      this.options.mainView.onUpdate();
      this.options.mainView.isScrollTo = true;

    }).bind(this),
    onComplete: (function () {

      this.options.mainView.isScrollTo = false;

    }).bind(this)
  });

}

ListHeaderView.prototype.onResize = function () {

  if (this.canvasMask) {
    this.canvasMask.onResize();
  }

  BaseView.prototype.onResize.call(this);

}

ListHeaderView.prototype.dispose = function () {

  BaseView.prototype.dispose.call(this);

}

module.exports = ListHeaderView;
