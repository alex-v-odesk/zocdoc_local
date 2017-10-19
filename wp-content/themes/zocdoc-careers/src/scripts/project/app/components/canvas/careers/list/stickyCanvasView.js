var Blob = require('canvas/blob');
var AbstractCanvasView = require('abstract/abstractCanvasView');
var CV = require('./../../../../config/currentValues');

var StickyCanvasView = function (options, datas) {

  this.blobColor = options.blobColor ? options.blobColor : '#05215a';

  this.paper = null;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(StickyCanvasView, AbstractCanvasView);
_.extend(StickyCanvasView.prototype, AbstractCanvasView.prototype);

StickyCanvasView.prototype.init = function () {


  this.paper = new paper.PaperScope();
  this.paper.setup(this.options.el);

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  var blobY = CV.breakpoint === 'default' ? -30 : '(this.paper.view.size.height / 2) - (this.paper.view.size.height / 2 * 0.8)';

  this.mainBlob = new Blob({
    type: 0,
    scope: this,
    canvasView: this,
    path: 'M369,580.5C189.4,599.1,11,547,11,322.5C11,98,193.4,8.5,371.5,8.5S757,119.7,757,293.5C757,467.3,548.6,561.9,369,580.5z',
    color: this.blobColor,
    position: {
      x: CV.isTablet && CV.viewport.width > 760 && CV.viewport.height > 950 || (CV.viewport.width > 700 && CV.viewport.height > 700 && CV.viewport.height < 1000) ? 'this.paper.view.size.width / 2 - 40' : 'this.paper.view.size.width / 2 - 20',
      y: CV.isTablet && CV.viewport.width > 760 && CV.viewport.height > 950 || (CV.viewport.width > 700 && CV.viewport.height > 700 && CV.viewport.height < 1000) ? -120 : blobY
    },
    size: {
      w: 'window.innerWidth',
      maxW: !CV.isTablet && CV.viewport.width > 760 && CV.viewport.height > 950 ? 500 : 700
    },
    mouseForce: .4,
    orbit: {
      h: 2,
      w: 2
    },
    canHover: false,
    typeID: 'careerStickyBlob'
  });

  this.mainBlob.canAnimate = true;
  this.onResize()

  AbstractCanvasView.prototype.init.call(this);

}

StickyCanvasView.prototype.bindEvents = function () {

  this.tool.onMouseMove = (function (e) {

    this.mousePoint = e.lastPoint;

  }).bind(this);

  this.paper.view.onFrame = (function (e) {

    this.animate(e);

  }).bind(this);


  AbstractCanvasView.prototype.bindEvents.call(this);
}

StickyCanvasView.prototype.triggerBlob = function (blobColor) {

  this.mainBlob.triggerBlob(blobColor);
}

StickyCanvasView.prototype.animate = function (e) {

  this.mainBlob.animate(e);

  AbstractCanvasView.prototype.animate.call(this, e);

}

StickyCanvasView.prototype.onResize = function () {

  if (!CV.isTablet && CV.viewport.width > 760 && CV.viewport.width < 1020 && CV.viewport.height > 950 || (CV.viewport.width > 700 && CV.viewport.height > 700 && CV.viewport.height < 1000)) {

    this.mainBlob.path.position.x = CV.viewport.width < 900 ? CV.viewport.width / 2 - 75 : this.paper.view.size.width / 2 - 20;
    this.mainBlob.path.position.y = CV.viewport.width < 900 ? -120 : -80;

    var s = this.mainBlob.getScale({w: 700}, this.mainBlob.path);
    this.mainBlob.path.scale(s);

    this.mainBlob.generateSettingsPoints();
    return;
  }

  if (CV.isTablet && CV.viewport.width > 760 && CV.viewport.height > 950 || (CV.viewport.width > 700 && CV.viewport.height > 700 && CV.viewport.height < 1000)) {

    this.mainBlob.path.position.x = this.paper.view.size.width / 2 - 120;
    this.mainBlob.path.position.y = -this.mainBlob.path.bounds._height / 2 - 110;

    var s = this.mainBlob.getScale({w: CV.viewport.width}, this.mainBlob.path);
    this.mainBlob.path.scale(s);

    this.mainBlob.generateSettingsPoints();

    return;
  }

  if (!CV.isMobile && CV.viewport.width < 920 && -35 < this.mainBlob.path.position.y && this.mainBlob.path.position.y < -25) {

    this.mainBlob.canAnimate = false;
    this.mainBlob.path.position.y = -80;
    this.mainBlob.generateSettingsPoints();

  }
  else if (-85 < this.mainBlob.path.position.y && this.mainBlob.path.position.y < -75 && !CV.isMobile && CV.viewport.width > 920) {

    // this.mainBlob.canAnimate = false;
    // this.mainBlob.path.position.y = -30;
    // this.mainBlob.generateSettingsPoints();

  }

  AbstractCanvasView.prototype.onResize.call(this);

}

StickyCanvasView.prototype.mouseMove = function (e) {

  AbstractCanvasView.prototype.mouseMove.call(this, e);

}


module.exports = StickyCanvasView;
