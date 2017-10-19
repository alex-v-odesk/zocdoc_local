var Blob = require('canvas/blob');
var AbstractCanvasView = require('abstract/abstractCanvasView');

var DetailHeaderCanvasView = function (options, datas) {

  this.blobColor = options.blobColor ? options.blobColor : '#05215a';

  console.log(this.blobColor);

  this.paper = null;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(DetailHeaderCanvasView, AbstractCanvasView);
_.extend(DetailHeaderCanvasView.prototype, AbstractCanvasView.prototype);

DetailHeaderCanvasView.prototype.init = function () {

  this.paper = new paper.PaperScope();
  this.paper.setup(this.options.el);

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  this.mainBlob = new Blob({
    type: 0,
    scope: this,
    canvasView: this,
    path: 'M369,580.5C189.4,599.1,11,547,11,322.5C11,98,193.4,8.5,371.5,8.5S757,119.7,757,293.5C757,467.3,548.6,561.9,369,580.5z',
    color: this.blobColor,
    position: {
      x: 'this.paper.view.size.width / 2',
      y: '(this.paper.view.size.height / 2) - (this.paper.view.size.height / 2 * 0.2)'
    },
    size: {
      w: 'window.innerWidth * 1.2',
      maxW: 800
    },
    mouseForce : .4,
    orbit: {
      h: 4,
      w: 4
    },
    canHover:false
  });

  AbstractCanvasView.prototype.init.call(this);

}

DetailHeaderCanvasView.prototype.bindEvents = function () {

  this.tool.onMouseMove = (function (e) {

    this.mousePoint = e.lastPoint;

  }).bind(this);

  this.tool.onMouseDown = (function (e) {

  }).bind(this);

  this.paper.view.onFrame = (function (e) {

    this.animate(e);

  }).bind(this);


  AbstractCanvasView.prototype.bindEvents.call(this);
}

DetailHeaderCanvasView.prototype.triggerBlob = function (blobColor) {

  this.mainBlob.triggerBlob(blobColor);
}

DetailHeaderCanvasView.prototype.animate = function (e) {

  this.mainBlob.animate(e);

  AbstractCanvasView.prototype.animate.call(this, e);

}

DetailHeaderCanvasView.prototype.onResize = function () {

  AbstractCanvasView.prototype.onResize.call(this);
}

DetailHeaderCanvasView.prototype.mouseMove = function (e) {

  AbstractCanvasView.prototype.mouseMove.call(this, e);

}


module.exports = DetailHeaderCanvasView;
