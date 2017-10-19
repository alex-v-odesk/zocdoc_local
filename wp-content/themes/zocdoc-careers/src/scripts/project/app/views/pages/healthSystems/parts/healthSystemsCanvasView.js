 var AbstractCanvasView = require('abstract/abstractCanvasView');
var EVENT = require('app/events/events');

var healthSystemsCanvasView = function (options, datas) {

  this.paper = null;
  this.aCanvasAnimViews = {};

  this.currentCanvasAnimView = null;
  this.oldCanvasAnimView = null;
  this.isCanvasHidden = false;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(healthSystemsCanvasView, AbstractCanvasView);
_.extend(healthSystemsCanvasView.prototype, AbstractCanvasView.prototype);

healthSystemsCanvasView.prototype.init = function () {

  this.paper = new paper.PaperScope();
  this.paper.setup(this.options.el);

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  AbstractCanvasView.prototype.init.call(this);
}

healthSystemsCanvasView.prototype.register = function(id, canvasAnimView) {

  this.aCanvasAnimViews[id] = canvasAnimView;
  this.aCanvasAnimViews[id].init();

  if (canvasAnimView) this.listenTo(canvasAnimView, EVENT.CANVAS_SHOWN, _canvasShown.bind(this));
  if (canvasAnimView) this.listenTo(canvasAnimView, EVENT.CANVAS_HIDDEN, _canvasHidden.bind(this));

}

healthSystemsCanvasView.prototype.showCanvas = function(id) {
  this.isCanvasHidden = false;
  this.currentCanvasAnimView = this.aCanvasAnimViews[id];
  this.currentCanvasAnimView.show();

}

var _canvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);
  console.log("_canvasShown");

}

healthSystemsCanvasView.prototype.hideCanvas = function(id) {
  this.isCanvasHidden = true;
  this.oldCanvasAnimView = this.currentCanvasAnimView;
  if(this.oldCanvasAnimView.hide)this.oldCanvasAnimView.hide();

}

var _canvasHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);
  console.log("_canvasHidden");

}

healthSystemsCanvasView.prototype.bindEvents = function () {

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

healthSystemsCanvasView.prototype.mouseDown = function (e) {

  if (this.currentCanvasAnimView && this.currentCanvasAnimView.mouseDown) this.currentCanvasAnimView.mouseDown(e);

}

healthSystemsCanvasView.prototype.mouseMove = function (e) {

  if (this.currentCanvasAnimView && this.currentCanvasAnimView.mouseMove) this.currentCanvasAnimView.mouseMove(e);

}

healthSystemsCanvasView.prototype.animate = function (e) {

  if (this.currentCanvasAnimView ) {this.currentCanvasAnimView.animate(e);console.log('animating')};

  AbstractCanvasView.prototype.animate.call(this);
}

healthSystemsCanvasView.prototype.onResize = function () {

  _.each(this.aCanvasAnimViews, (function (canvasAnimView) {

    canvasAnimView.onResize();

  }).bind(this));

  AbstractCanvasView.prototype.onResize.call(this);
}

healthSystemsCanvasView.prototype.killTL = function(name) {

  if( !this.TL[name])return;

  var tl = this.TL[name];

  tl.stop();
  tl.kill();
  tl.clear();
  tl = null;

  this.TL[name] = null;

}

healthSystemsCanvasView.prototype.destroyTL = function() {

  for(var name in this.TL ) {
    this.killTL(name);
  };

  this.TL = {};
}

healthSystemsCanvasView.prototype.dispose = function() {

  this.destroyTL();

}

module.exports = healthSystemsCanvasView;
