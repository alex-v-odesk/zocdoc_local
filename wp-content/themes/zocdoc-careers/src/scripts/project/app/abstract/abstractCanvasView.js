var BaseView = require('./baseView');
var CV = require('./../config/currentValues');

var AbstractCanvasView = function (options, datas) {

  this.options = options;

}

_.extend(AbstractCanvasView, BaseView);
_.extend(AbstractCanvasView.prototype, BaseView.prototype);

AbstractCanvasView.prototype.init = function () {

  //--------0 Global var

  this.bindEvents();

  //\\BaseView.prototype.init.call(this);

}

//AbstractCanvasView.prototype.onDOMInit = function () {

  //BaseView.prototype.onDOMInit.call(this);

//}

AbstractCanvasView.prototype.bindEvents = function () {

  //BaseView.prototype.bindEvents.call(this);

}

AbstractCanvasView.prototype.onResize = function () {

  //BaseView.prototype.onResize.call(this);

}

AbstractCanvasView.prototype.animate = function () {

}

AbstractCanvasView.prototype.dispose = function () {

  //BaseView.prototype.dispose.call(this);

}

module.exports = AbstractCanvasView;
