var Blob = require('canvas/blob');
var EVENT = require('app/events/events');

var DetailVideoCanvasView = function (options, datas) {

  this.currentView = options.currentView;
  this.imgURL = options.el.dataset.src;

  this.paper = null;

}

DetailVideoCanvasView.prototype.init = function () {

  this.paper = new paper.PaperScope();

  this.paper.setup(this.currentView.$canvasMaskEl[0]);

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  this.mainBlob = new Blob({
    scope: this,
    paper: this.paper,
    canvasView: this,
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    color: '#c594fb',
    bgColor: 'white',
    position: {
      x: 'this.paper.view.size.width /2',
      y: 'this.paper.view.size.height /2'
    },
    size: {
      w: 'this.paper.view.size.width * .75',
      maxW: 300
    },
    orbit: {
      h: 2,
      w: 2
    },
    canHover: true
  });

  this.mainBlob.canAnimate = true;
  this.bindEvents();

}

DetailVideoCanvasView.prototype.bindEvents = function () {

  this.tool.onMouseMove = (function (e) {

    this.mousePoint = e.lastPoint;

  }).bind(this);


  this.paper.view.onFrame = (function (e) {

    this.animate(e);

  }).bind(this);

  this.mainBlob.compoundPath.onClick = (function () {

    this.currentView.videoPlayer.togglePlay();

  }).bind(this);

}


DetailVideoCanvasView.prototype.animate = function (e) {

  this.mainBlob.animate(e);

}

DetailVideoCanvasView.prototype.onResize = function () {

  this.mainBlob.onResize();

}

DetailVideoCanvasView.prototype.mouseMove = function (e) {

}


module.exports = DetailVideoCanvasView;
