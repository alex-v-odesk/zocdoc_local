'use strict';

var EVENT = require('./../events/events');
var MainView = require('./../views/mainView');

var Router = function () {

  this.routes = {
    ':page/:params/:category/:theme/': 'default',
    ':page/:params/:category/': 'default',
    ':page/:params/': 'default',
    '': 'default'
  };

  this.history = [];

  this.mainView = MainView;

  Backbone.Router.call(this);

};

_.extend(Router, Backbone.Router);
_.extend(Router.prototype, Backbone.Router.prototype);

Router.prototype.init = function () {

  this.listenToOnce(this.mainView, EVENT.INIT, _onMainViewInit.bind(this))
  this.mainView.init();

}

var _onMainViewInit = function () {

  Backbone.history.start({
    pushState: true
  });

}

Router.prototype.default = function (page_, params_, category_, theme_) {

  var page = page_ ? page_ : null;
  var params = params_ ? params_ : null;
  var category = category_ ? category_ : null;
  var theme = theme_ ? theme_ : null;

  this.mainView.pageManager.navigateTo(page, params, category, theme);

  this.history.push(page);

}


Router.prototype.current_page = function () {

  return _.last(this.history);

}

Router.prototype.back = function () {

  Backbone.history.navigate(this.previous_page(), {trigger: false});

}

Router.prototype.previous_page = function () {

  if (this.history.length <= 1) return null
  else return this.history[this.history.length - 2];

}


module.exports = new Router();
