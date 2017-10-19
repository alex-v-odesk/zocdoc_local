var Blob = require('canvas/blob');
var BaseView = require('app/abstract/baseView');
var EVENT = require('./../../../../events/events');
var CV = require('app/config/currentValues');
var Tools = require('./../../../../tools/tools');

var ValueCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;

  this.$valuesContainers = null;
  this.canvasHeight = 0;
  this.canvasWidth = 0;
  this.blockConfig = [];
  this.descriptions = [];

  this.isShown = false;

  this.blobs = [];
  this.itemsPosition = [];

  BaseView.call(this, options, datas);

}

_.extend(ValueCanvasView, BaseView);
_.extend(ValueCanvasView.prototype, BaseView.prototype);

ValueCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;

  BaseView.prototype.init.call(this);

}

ValueCanvasView.prototype.onDOMInit = function () {

  this.buildBlobs();

  BaseView.prototype.onDOMInit.call(this);
}

ValueCanvasView.prototype.buildBlobs = function () {

  this.bgRectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(this.paper.view.size.width + 10, this.paper.view.size.height + 10));
  this.rectanglePath = new paper.Path.Rectangle(this.bgRectangle);

  this.paths = [
    'M71.4,39.9c26.3-0.3,73.5-6.5,104.9,3.9c18.2,6.1,21.6,18.5,22.4,41c0,0,7,36.1-16.9,58.6c-12.2,11.5-43.3,7.8-74.3,7.2c-36-0.9-48.3,4.8-85.9-2.6c-22.9-4.5-19.9-27.2-20.4-61.4c-1-23.4,6.3-33.7,17.4-40C31.8,39.2,52.5,41.6,71.4,39.9z',
    'M131.5,150.4c-21.9-0.1-67.8,6.7-99.1-3.7c-18.2-6.1-31.5-18-32.3-40.4c0,0-0.9-29.9,24-50c13-10.5,33.2-18.3,64.2-17.8c36,0.9,63.5-0.6,82.1,5.9c19,6.6,28.9,21.5,29.3,55.7c1,23.4-5.9,35.3-16.9,41.6C169.6,149.1,150.4,148.7,131.5,150.4z',
    'M131.3,147.6c-21.9-0.1-74.1,9.6-105.4-0.8c-18.2-6.1-25-18.1-25.8-40.5c0,0-2.1-32.1,22.8-52.2c13-10.5,34.6-12.6,65.6-12c36,0.9,65.7-2.2,84.4,4.3c19,6.6,26.4,19.6,26.9,53.8c1,23.4-5.6,37.3-16.7,43.5C169.9,151.1,150.2,145.9,131.3,147.6z',
    'M70.5,41c26.3-0.3,74.5-7.7,105.8,2.7c18.2,6.1,21.6,18.5,22.4,41c0,0,7,36.1-16.9,58.6c-12.2,11.5-67.2,10.1-98.3,9.5c-36-0.9-48.6,0.4-67.1-6.6c-14.3-5.4-14.7-20.8-15.1-55c-1-23.4,6.1-36.2,17.2-42.4C31.7,41.3,51.5,42.7,70.5,41z',
    'M131.5,150.4c-21.9-0.1-76.6,7.5-107.9-2.9c-18.2-6.1-21.6-18.5-22.4-41c0,0-0.7-37.5,24.2-57.6c13-10.5,59.9-11.1,91-10.5c36,0.9,48.6-0.4,67.1,6.6c14.3,5.4,14.7,20.8,15.1,55c1,23.4-6.1,36.2-17.2,42.4C168.2,149.9,150.4,148.7,131.5,150.4z',
    'M133,151.8c-21.9-0.1-72.2,6.5-103.5-3.9C11.2,141.8,0.8,128.7,0,106.2c0,0-3.5-31.5,21.4-51.6c13-10.5,35.8-16.7,66.8-16.2c36,0.9,65.5-1.3,84.2,5.1c19,6.6,26.8,22.2,27.3,56.5c1,23.4-5.9,35.3-16.9,41.6C169.6,149.1,151.9,150.1,133,151.8z',
    'M131.5,150.4c-21.9-0.1-67.8,6.7-99.1-3.7c-18.2-6.1-31.5-18-32.3-40.4c0,0-0.9-29.9,24-50c13-10.5,33.2-18.3,64.2-17.8c36,0.9,63.5-0.6,82.1,5.9c19,6.6,28.9,21.5,29.3,55.7c1,23.4-5.9,35.3-16.9,41.6C169.6,149.1,150.4,148.7,131.5,150.4z'
  ];

  var xBlob = 0;
  var yBlob = 0;
  var blockConfig = null;

  var maxBlobWidth = (CV.breakpoint === 'default') ? window.innerWidth * .25 : window.innerWidth * .65;

  _.each(this.$valuesContainers, (function (valueBlock, i) {

    blockConfig = valueBlock.getBoundingClientRect();

    xBlob = blockConfig.left;
    yBlob = blockConfig.top;
    var regex = /<br[^>]*>/gi;

    this.blobs.push(
        new Blob({
          index: i,
          scope: this,
          canvasView: this.mainCanvasView,
          path: this.paths[i],
          position: {
            x: xBlob,
            y: yBlob
          },
          canHover: true,
          size: {
            w: maxBlobWidth,
            maxW: 'window.innerWidth * 0.8'
          },
          orbit: {
            h: 2,
            w: 2
          },
          multipleContent: {
            title: this.descriptions[i].replace(regex, "\n"),
            subtitle: null,
            color: "#052449"
          }
        })
    );

    if (!CV.isMobile)this.blobs[i].path.bounds.width = CV.viewport.width * .2;
    else this.blobs[i].path.bounds.height = 200;

    this.blobs[i].path.position.x = blockConfig.left + blockConfig.width / 2;
    this.blobs[i].path.position.y = blockConfig.top + this.blobs[i].path.bounds._height / 2;

    this.itemsPosition.push({
      name: 'blob' + i,
      i: i,
      isBig: false,
      y: this.blobs[i].path.position.y,
      x: this.blobs[i].path.position.x,
      w: this.blobs[i].path.bounds._width,
      h: this.blobs[i].path.bounds._height
    });

  }).bind(this));

  this.compoundPath = new paper.CompoundPath({
    children: [this.rectanglePath, this.blobs[0].path, this.blobs[1].path, this.blobs[2].path, this.blobs[3].path, this.blobs[4].path, this.blobs[5].path, this.blobs[6].path],
    fillColor: '#7ce2f7'
  });

  _.each(this.blobs, (function (blob) {

    blob.generateContent(22, 70);
    blob.title.opacity = 0;

  }).bind(this));

  this.compoundPath.visible = false;
  this.compoundPath.opacity = 0;

  //this.compoundPath.selected = true;

}

ValueCanvasView.prototype.initTL = function () {

  this.initTLShow();

  BaseView.prototype.initTL.call(this);
}

ValueCanvasView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  var blobTarget = {
    opacity: 0
  };

  this.TL.show.to(blobTarget, .5, {
    opacity: 1,
    onUpdate: (function () {

      this.compoundPath.opacity = blobTarget.opacity;

    }).bind(this),
    onUpdateParams: ["{self}"]
  }, 0.1)

}

ValueCanvasView.prototype.bindEvents = function () {
}

ValueCanvasView.prototype.mouseMove = function (e) {

  var item = this.isItem(e.point);
  var cursor = item || item == 0 ? "pointer" : "default";
  TweenMax.set(this.options.mainCanvasView.options.el, {cursor: cursor});

}

ValueCanvasView.prototype.mouseDown = function (e) {

  var item = this.isItem(e.point);

  if (!item && item != 0 || !this.isShown) return;

  if (!this.currentItem.isBig) {

    this.currentItem.isBig = true;
    this.blobs[this.currentItem.i].canAnimate = false;

    var target = {
      width: this.blobs[this.currentItem.i].path.bounds._width,
      x: this.blobs[this.currentItem.i].path.position.x
    }

    TweenMax.to(target, .5, {
      width: CV.viewport.width * .27,
      x: this.blobs[this.currentItem.i].path.position.x - CV.viewport.width * .005,
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.blobs[this.currentItem.i].path.bounds.width = target.width;
        this.blobs[this.currentItem.i].path.position.x = target.x;

      }).bind(this)
    });
  }
  else {

    this.currentItem.isBig = false;
    this.blobs[this.currentItem.i].canAnimate = false;

    var target = {
      width: this.blobs[this.currentItem.i].path.bounds._width,
      x: this.blobs[this.currentItem.i].path.position.x
    }

    TweenMax.to(target, .5, {
      width: CV.viewport.width * .2,
      x: this.blobs[this.currentItem.i].path.position.x + CV.viewport.width * .005,
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.blobs[this.currentItem.i].path.bounds.width = target.width;
        this.blobs[this.currentItem.i].path.position.x = target.x;

      }).bind(this),
      onComplete: (function () {

        this.blobs[this.currentItem.i].canAnimate = true;

      }).bind(this)
    });

  }

  this.trigger(EVENT.CANVAS_MASK_OVERLAY_CLICKED, {index: item});

}

ValueCanvasView.prototype.isItem = function (p) {

  var itemIndex = null;
  var yItem;
  var xItem;
  var wItem;
  var hItem;

  _.each(this.itemsPosition, (function (item, i) {

    yItem = item.y;
    xItem = item.x;
    wItem = item.w / 2;
    hItem = item.h / 2;

    if (p.y > yItem - hItem && p.y < yItem + hItem && p.x > xItem - wItem && p.x < xItem + wItem) {

      this.currentItem = item;
      itemIndex = i;

    }

  }).bind(this));

  return itemIndex;

}

ValueCanvasView.prototype.show = function () {

  this.compoundPath.visible = true;

  TweenMax.set(this.mainCanvasView.options.el, {zIndex: 0});

  TweenMax.set(this.mainCanvasView.options.el, {position: 'absolute', height: this.canvasHeight});

  this.onResize();
  //this.paper.view.setViewSize(CV.viewport.width, this.canvasHeight);

  this.rectanglePath.bounds.width = CV.viewport.width;
  this.rectanglePath.bounds.height = this.canvasHeight;

  _.each(this.blobs, (function (blob, i) {

    blob.generateSettingsPoints();
    if (i == this.blobs.length - 1) this.canAnimate = true;

  }).bind(this));

  var target = {
    opacity: 0
  }

  TweenMax.to(target, .3, {
    opacity: 1,
    delay: .65,
    ease: Expo.easeOut,
    onUpdate: (function () {

      _.each(this.blobs, (function (blob) {

        blob.title.opacity = target.opacity;

      }).bind(this))

    }).bind(this)
  })

  if (this.TL.show) this.TL.show.play(0);
}

ValueCanvasView.prototype.onShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);

  this.isShown = true;

  if (this.TL.hide) this.TL.hide = {};
  this.initTLHide();
}

ValueCanvasView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({
    paused: true, onComplete: (function () {

      this.onHidden();
      //this.paper.view.setViewSize(CV.viewport.width, CV.viewport.height);

    }).bind(this)
  });

  var blobTarget = {
    opacity: 1
  };

  this.TL.hide.to(blobTarget, 0.5, {
    opacity: 0,
    onUpdate: (function () {

      this.compoundPath.opacity = blobTarget.opacity;

    }).bind(this),
    onUpdateParams: ["{self}"]
  }, 0.1)
}

ValueCanvasView.prototype.hide = function () {

  _.each(this.blobs, (function (blob, i) {

    blob.title.opacity = 0;
    if (i == this.blobs.length - 1) this.canAnimate = false;

  }).bind(this));

  var target = {
    opacity: 1
  }

  TweenMax.to(target, {
    opacity: 0,
    onUpdate: (function () {

      _.each(this.blobs, (function (blob) {

        blob.title.opacity = target.opacity;

      }).bind(this))

    })
  })

  if (this.TL.hide) this.TL.hide.play(0);
}

ValueCanvasView.prototype.onHidden = function () {

  this.isShown = false;
  this.compoundPath.visible = false;

  TweenMax.set(this.mainCanvasView.options.el, {position: 'fixed', height: '100%'});
  //this.paper.view.setViewSize(CV.viewport.width, CV.viewport.height);

  this.rectanglePath.bounds.width = CV.viewport.width;
  this.rectanglePath.bounds.height = this.canvasHeight;

  this.trigger(EVENT.CANVAS_HIDDEN);

  if (this.TL.show) this.TL.show = {};
  this.initTLShow();

}

ValueCanvasView.prototype.animate = function (e) {

  // if (this.canAnimate && !CV.isScrolling && !CV.isMobile) {
  //
  //   _.each(this.blobs, (function (blob) {
  //
  //     if (blob.paper)blob.animate(e);
  //
  //   }).bind(this));
  //
  // }
  //
  // console.log(this.paper.view.size)

}

ValueCanvasView.prototype.onResize = function () {

  if (!this.blobs[0] || CV.isMobile || !this.isShown) return;

  //this.paper.view.setViewSize(CV.viewport.width, this.canvasHeight);

  this.compoundPath.children[0].bounds.width = CV.viewport.width;
  this.compoundPath.children[0].bounds.height = this.canvasHeight;

  var maxBlobWidth = (CV.breakpoint === 'default') ? window.innerWidth * .19 : window.innerWidth * .65;

  var xBlob = 0;
  var yBlob = 0;
  var blockConfig;

  this.itemsPosition = [];

  _.each(this.$valuesContainers, (function (valueBlock, i) {

    blockConfig = valueBlock.getBoundingClientRect();
    this.blobs[i].canAnimate = false;

    xBlob = blockConfig.left;
    yBlob = blockConfig.top;

    var scale = this.blobs[i].getScale({w: maxBlobWidth}, this.blobs[i].path);
    this.blobs[i].path.scale(scale);

    this.blobs[i].path.position.x = blockConfig.left + blockConfig.width / 2;
    this.blobs[i].path.position.y = blockConfig.top + this.blobs[i].path.bounds._height / 2;

    this.blobs[i].title.position.x = this.blobs[i].path.bounds._x + this.blobs[i].path.bounds._width / 2;
    this.blobs[i].title.position.y = this.blobs[i].path.bounds._y + this.blobs[i].path.bounds._height + 70;

    this.itemsPosition.push({
      name: 'blob' + i,
      i: i,
      isBig: false,
      y: this.blobs[i].path.position.y,
      x: this.blobs[i].path.position.x,
      w: this.blobs[i].path.bounds._width,
      h: this.blobs[i].path.bounds._height
    });

    this.blobs[i].generateSettingsPoints();

    this.blobs[i].onResize();

  }).bind(this));

  BaseView.prototype.onResize.call(this);

}

module.exports = ValueCanvasView;
