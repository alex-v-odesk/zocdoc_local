var AbstractCanvasView = require('abstract/abstractCanvasView');
var EVENT = require('app/events/events');

var careersCanvasView = function (options, datas) {

  this.paper = null;
  this.aCanvasAnimViews = {};

  this.currentCanvasAnimView = null;
  this.oldCanvasAnimView = null;
  this.isCanvasHidden = false;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(careersCanvasView, AbstractCanvasView);
_.extend(careersCanvasView.prototype, AbstractCanvasView.prototype);

careersCanvasView.prototype.init = function () {

  this.paper = new paper.PaperScope();
  this.paper.setup(this.options.el);
  this.paper.autoUpdate = false;

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  AbstractCanvasView.prototype.init.call(this);
}

careersCanvasView.prototype.register = function (id, canvasAnimView) {

  this.aCanvasAnimViews[id] = canvasAnimView;
  this.aCanvasAnimViews[id].init();

  if (canvasAnimView) this.listenTo(canvasAnimView, EVENT.CANVAS_SHOWN, _canvasShown.bind(this));
  if (canvasAnimView) this.listenTo(canvasAnimView, EVENT.CANVAS_HIDDEN, _canvasHidden.bind(this));
  if (canvasAnimView) this.listenTo(canvasAnimView, EVENT.LOADER_COMPLETE, _onLoaderComplete.bind(this));

}

var _onLoaderComplete = function () {

  this.trigger(EVENT.LOADER_COMPLETE);

}

careersCanvasView.prototype.showCanvas = function (id) {
  this.isCanvasHidden = false;
  this.currentCanvasAnimView = this.aCanvasAnimViews[id];
  this.currentCanvasAnimView.show();

}

var _canvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);

}

careersCanvasView.prototype.hideCanvas = function (id) {
  this.isCanvasHidden = true;
  //this.oldCanvasAnimView = this.currentCanvasAnimView;
  this.oldCanvasAnimView = this.aCanvasAnimViews[id];
  if (this.oldCanvasAnimView) this.oldCanvasAnimView.hide();

}

var _canvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);

}

careersCanvasView.prototype.bindEvents = function () {

  this.tool.onMouseMove = (function (e) {

    this.mousePoint = e.lastPoint;
    this.mouseMove(e);

  }).bind(this);

  this.paper.view.onMouseDown = (function (e) {

    this.mouseDown(e);

  }).bind(this);

  this.paper.view.onFrame = (function (e) {
    if(!this.isCanvasHidden){
      this.animate(e);
    }

  }).bind(this);


  AbstractCanvasView.prototype.bindEvents.call(this);
}

careersCanvasView.prototype.mouseDown = function (e) {

  if (this.currentCanvasAnimView && this.currentCanvasAnimView.mouseDown) this.currentCanvasAnimView.mouseDown(e);
  if (this.oldCanvasAnimView && this.oldCanvasAnimView.mouseDown) this.oldCanvasAnimView.mouseDown(e);

}

careersCanvasView.prototype.mouseMove = function (e) {

  if (this.currentCanvasAnimView && this.currentCanvasAnimView.mouseMove) this.currentCanvasAnimView.mouseMove(e);
  if (this.oldCanvasAnimView && this.oldCanvasAnimView.mouseMove) this.oldCanvasAnimView.mouseMove(e);

}

careersCanvasView.prototype.animate = function (e) {

  if (this.currentCanvasAnimView ) {this.currentCanvasAnimView.animate(e);};
  if (this.oldCanvasAnimView ) {this.oldCanvasAnimView.animate(e)};

  AbstractCanvasView.prototype.animate.call(this);
}

careersCanvasView.prototype.onResize = function () {

  //if (this.currentCanvasAnimView) this.currentCanvasAnimView.onResize();

  _.each(this.aCanvasAnimViews, (function (canvasAnimView) {

    canvasAnimView.onResize();

  }).bind(this));

  AbstractCanvasView.prototype.onResize.call(this);

}

careersCanvasView.prototype.killTL = function (name) {

  if (!this.TL[name])return;

  var tl = this.TL[name];

  tl.stop();
  tl.kill();
  tl.clear();
  tl = null;

  this.TL[name] = null;

}

careersCanvasView.prototype.destroyTL = function () {

  for (var name in this.TL) {
    this.killTL(name);
  }
  ;

  this.TL = {};
}

careersCanvasView.prototype.dispose = function () {

  this.destroyTL();

}

module.exports = careersCanvasView;
