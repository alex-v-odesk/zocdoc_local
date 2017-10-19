var Blob = require('canvas/blob');
var AbstractCanvasView = require('abstract/abstractCanvasView');
var CV = require('app/config/currentValues');

var BlogHeaderCanvasView = function (options, datas) {

  this.paper = null;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(BlogHeaderCanvasView, AbstractCanvasView);
_.extend(BlogHeaderCanvasView.prototype, AbstractCanvasView.prototype);

BlogHeaderCanvasView.prototype.init = function () {

  this.paper = new paper.PaperScope();
  this.paper.setup(this.options.el);

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  this.mainBlob = new Blob({
    type: 0,
    scope: this,
    canvasView: this,
    path: 'M591.481,316.679C549.8,204.355,494.894,128.885,376.64,172.764c-94.6,35.1-203.841,139.532-172.583,223.773C266.575,565.025,401.8,530.625,472.729,504.306,590.98,460.429,633.159,429,591.481,316.679Z',
    color: '#ffffff',
    position: {
      x: (CV.breakpoint === 'sml') ? CV.viewport.width / 2 : CV.viewport.width * .15 + 130,
      y: (CV.breakpoint === 'sml') ? CV.viewport.height * .35 : 320
    },
    size: {
      w: 450
    },
    typeID: 'blogHomeHeaderBlob'
  });

  this.mainBlob.canAnimate = true;

  AbstractCanvasView.prototype.init.call(this);

}

BlogHeaderCanvasView.prototype.bindEvents = function () {

  AbstractCanvasView.prototype.bindEvents.call(this);
}

BlogHeaderCanvasView.prototype.animate = function (e) {

  this.mainBlob.animate(e);

  AbstractCanvasView.prototype.animate.call(this, e);

}

BlogHeaderCanvasView.prototype.onResize = function () {

  this.mainBlob.path.position.x = (CV.breakpoint === 'sml') ? CV.viewport.width /2 : CV.viewport.width * .12 + this.mainBlob.path.bounds._width / 3;
  this.mainBlob.path.position.y = (CV.breakpoint === 'sml') ? 270 : 320;

  console.log(CV.viewport.width, this.mainBlob.path.position.x);

  this.mainBlob.onResize();

  AbstractCanvasView.prototype.onResize.call(this);
}

BlogHeaderCanvasView.prototype.mouseMove = function (e) {

  AbstractCanvasView.prototype.mouseMove.call(this, e);

}


module.exports = BlogHeaderCanvasView;
