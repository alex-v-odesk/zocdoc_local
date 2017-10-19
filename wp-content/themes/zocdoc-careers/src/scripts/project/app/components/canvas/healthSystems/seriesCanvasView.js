var AbstractCanvasView = require('app/abstract/abstractCanvasView');
var Blob = require('canvas/blob');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var SeriesCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.currentView = options.currentView;

  this.index = 0;
  this.canAnimate = false;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(SeriesCanvasView, AbstractCanvasView);
_.extend(SeriesCanvasView.prototype, AbstractCanvasView.prototype);

SeriesCanvasView.prototype.init = function () {

  this.mainBlob = this.mainCanvasView.aCanvasAnimViews.start.mainBlob;

  this.blobs = [];
  this.scope = this;

  this.paper = this.options.mainCanvasView.paper;
  this.$canvas = this.mainView.$canvas;
  this.$svg = this.mainView.$svgFace;
  this.$el = this.mainView.$el;

  this.dataVideos = this.$canvas.getAttribute('data-src-serie');
  this.ctaContent = this.$canvas.getAttribute('data-src-serie-cta');
  this.dataVideos = this.dataVideos.split(';');

  _.each(this.dataVideos, (function (data, i) {

    data = data.split('$');
    this.dataVideos[i] = data;

  }).bind(this));

  this.dataVideos.splice(this.dataVideos.length - 1, 1);

  this.blobs = [];

  this.wBlob = 175;
  this.hBlob = 200;
  this.sizeFirstContainerBlob = 3 * this.wBlob;
  this.sizeSecondContainerBlob = 2 * this.wBlob;
  this.xFirstContainerBlob = (CV.viewport.width - this.sizeFirstContainerBlob) / 2;
  this.xSecondContainerBlob = (CV.viewport.width - this.sizeSecondContainerBlob) / 2;
  this.realWBlob;
  this.realHBlob;
  var xBlob;
  var yBlob;
  var yDOM;
  var xDOM;
  this.itemsPosition = [];

  this.bgRectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(this.paper.view.size.width + 10, this.paper.view.size.height + 10));
  this.rectanglePath = new paper.Path.Rectangle(this.bgRectangle);

  this.rectanglePath.selected = false;

  _.each(this.dataVideos, (function (data, i) {

    xBlob = i < 3 ? 'this.scope.xFirstContainerBlob +' + i + ' * this.scope.wBlob + this.scope.wBlob/2' : 'this.scope.xSecondContainerBlob +' + (i - 3) + ' * this.scope.wBlob + this.scope.wBlob/2';
    yBlob = i < 3 ? CV.viewport.height / 2 + 100 : 'this.paper.view.size.height / 2 + 80 + this.scope.hBlob';
    yDOM = i < 3 ? CV.viewport.height / 2 - this.hBlob / 2 + 150 : CV.viewport.height / 2 - this.hBlob / 2 + this.hBlob + 100;
    xDOM = i < 3 ? this.xFirstContainerBlob + i * this.wBlob : this.xSecondContainerBlob + (i - 3) * this.wBlob;

    if (CV.isMobile || CV.viewport.width < 920) {

      xBlob = i % 2 ? CV.viewport.width * .25 : CV.viewport.width * .75;

    }

    this.blobs.push(
        new Blob({
          index: i,
          scope: this,
          canvasView: this.mainCanvasView,
          path: 'M347,23c21.4-87.2,102.1-147.3,198.7-184.3C643-198.6,756.5-212.5,842-207c100.9,6.5,152.9,74.5,177,160.2c23.4,82.9,20.7,182.5,11,258.8c-12.4,98-78.9,137.8-167.9,151.9c-82.5,13.1-184.4,4.1-280.2-1.1c-98.4-5.4-175.1-62.6-214.5-142C338.6,162.8,329.8,93,347,23z',
          position: {
            x: xBlob,
            y: yBlob
          },
          canHover: true,
          size: {
            w: CV.isMobile ? CV.viewport.width * .25 : 125
          },
          orbit: {
            h: 5 * i / 10,
            w: 5 * i / 10
          },
          multipleContent: {
            title: data[0],
            subtitle: data[1],
            color: "#052449"
          }
        })
    );

    this.realWBlob = this.blobs[i].path.bounds._width;
    this.realHBlob = this.blobs[i].path.bounds._height;

    this.itemsPosition.push({
      name: 'blob' + i,
      i: i,
      y: eval(yBlob),
      x: eval(xBlob),
      w: this.realWBlob + 40,
      h: this.realHBlob + 40
    });

    this.blobs[i].canAnimate = true;
    this.blobs[i].path.visible = false;

    TweenMax.set(this.currentView.$episodes[i], {
      left: this.blobs[i].path.bounds._x - 20,
      top: this.blobs[i].path.bounds._y - 10,
      height: this.blobs[i].path.bounds._height + 20,
      width: this.blobs[i].path.bounds._width + 40
    });

  }).bind(this));


  var wVideoBlob = CV.isMobile ? 'CV.viewport.width * .75' : 'CV.viewport.width * .5';

  this.videoBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    path: 'M131.5,150.4c-21.9-0.1-67.8,6.7-99.1-3.7c-18.2-6.1-31.5-18-32.3-40.4c0,0-0.9-29.9,24-50c13-10.5,33.2-18.3,64.2-17.8c36,0.9,63.5-0.6,82.1,5.9c19,6.6,28.9,21.5,29.3,55.7c1,23.4-5.9,35.3-16.9,41.6C169.6,149.1,150.4,148.7,131.5,150.4z',
    position: {
      x: 'CV.viewport.width / 2',
      y: 'CV.viewport.height / 2'
    },
    canHover: true,
    size: {
      w: wVideoBlob
    },
    orbit: {
      h: 10,
      w: 10
    }
  });

  if (!CV.isMobile) {
    this.videoBlob.path.bounds.width = CV.viewport.width * .35;
    this.videoBlob.path.position.x = CV.viewport.width / 2;
    this.videoBlob.path.position.y = CV.viewport.height / 2;
  }

  //--------0 multi blob in the same mask
  this.compoundPath = new paper.CompoundPath({
    children: [this.rectanglePath, this.videoBlob.path, this.blobs[0].path, this.blobs[1].path, this.blobs[2].path, this.blobs[3].path, this.blobs[4].path],
    fillColor: 'white'
  });

  _.each(this.blobs, (function (blob, i) {

    blob.generateContent();

  }).bind(this));

  //--------0 CTA
  this.title = new paper.PointText();
  this.title.justification = 'center';
  this.title.style = {
    fontFamily: 'sharp-sans-bold',
    fontSize: 18,
    fillColor: '#042349'
  };

  this.title.content = this.ctaContent;

  this.arrowRaster = new this.paper.Raster({
    source: 'http://' + window.location.host + '/wp-content/themes/zocdoc-careers/assets/svg/arrow.svg'
  });

  this.crossRaster = new this.paper.Raster({
    source: 'http://' + window.location.host + '/wp-content/themes/zocdoc-careers/assets/svg/cross.svg'
  });

  this.arrowRaster.position.y = this.title.position.y;
  this.arrowRaster.position.x = this.title.position.x + this.title.bounds.width / 2 + 15;

  this.arrowRaster.scale(.7);
  this.crossRaster.visible = false;

  this.ctaGroup = new paper.Group([
    this.title,
    this.arrowRaster,
    this.crossRaster
  ]);

  this.ctaGroup.visible = false;
  this.ctaGroup.opacity = 0;
  this.ctaGroup.position = new paper.Point(CV.viewport.width / 2, this.videoBlob.path.bounds._y + this.videoBlob.path.bounds._height + 40);

  this.isVisisble = false;
  this.compoundPath.visible = false;

  this.itemsPosition.push({
    name: 'ctaGroup',
    y: this.ctaGroup.bounds._y,
    x: this.ctaGroup.bounds._x,
    w: this.ctaGroup.bounds._width,
    h: this.ctaGroup.bounds._height
  });

  this.itemsPosition.push({
    name: 'video',
    isBig: false,
    y: this.videoBlob.path.bounds._y,
    x: this.videoBlob.path.bounds._x,
    w: this.videoBlob.path.bounds._x + this.videoBlob.path.bounds._width,
    h: this.videoBlob.path.bounds._y + this.videoBlob.path.bounds._height
  });

  AbstractCanvasView.prototype.init.call(this);

}

SeriesCanvasView.prototype.setPositionMainVideo = function () {

  TweenMax.set(this.currentView.$mainVideo, {
    top: this.videoBlob.path.bounds._y - 20,
    left: -20,
    height: this.videoBlob.path.bounds._height + 40,
    width: this.videoBlob.path.bounds._width + 40
  });

  this.crossRaster.position.y = this.title.position.y - 5;
  this.crossRaster.position.x = this.title.position.x + this.title.bounds.width / 2 + 15;

  if (this.ctaGroup)this.ctaGroup.position = new paper.Point(CV.viewport.width / 2, this.videoBlob.path.bounds._y + this.videoBlob.path.bounds._height + 40);

  this.itemsPosition[this.itemsPosition.length - 1] = {
    name: 'video',
    isBig: this.itemsPosition[this.itemsPosition.length - 1].isBig,
    y: this.videoBlob.path.bounds._y,
    x: this.videoBlob.path.bounds._x,
    w: this.videoBlob.path.bounds._x + this.videoBlob.path.bounds._width,
    h: this.videoBlob.path.bounds._y + this.videoBlob.path.bounds._height
  };

  this.itemsPosition[this.itemsPosition.length - 2] = {
    name: 'ctaGroup',
    y: this.ctaGroup.bounds._y,
    x: this.ctaGroup.bounds._x,
    w: this.ctaGroup.bounds._width,
    h: this.ctaGroup.bounds._height
  };

}

SeriesCanvasView.prototype.managerBlobs = function () {

  this.isVisisble = !this.isVisisble ? true : false;

  _.each(this.blobs, (function (blob) {

    blob.path.visible = this.isVisisble;
    blob.title.visible = this.isVisisble;
    blob.subtitle.visible = this.isVisisble;

  }).bind(this));

}

SeriesCanvasView.prototype.show = function () {

  this.mainBlob.path.visible = false;
  this.compoundPath.visible = true;
  this.videoBlob.canAnimate = true;

  this.ctaGroup.visible = true;
  this.videoBlob.path.visible = true;
  this.rectanglePath.visible = true;

  this.videoBlob.path.position.y = CV.viewport.height / 2;
  this.videoBlob.path.position.x = CV.viewport.width / 2;

  _.each(this.blobs, (function (blob, i) {

    blob.generateSettingsPoints();
    blob.path.visible = false;
    if (i == this.blobs.length - 1) this.canAnimate = true;

  }).bind(this));

  TweenMax.set(this.$canvas, {zIndex: 15, background: 'none', x: 0, y: 0});

  this.ctaGroup.position.y = this.ctaGroup.position.y + 100;

  var target = {
    opacity: 0,
    y: this.ctaGroup.position.y
  };

  TweenMax.to(target, .5, {
    opacity: 1,
    y: this.videoBlob.path.bounds._y + this.videoBlob.path.bounds._height + 50,
    ease: Expo.easeOut,
    delay: .1,
    onUpdate: (function () {

      this.ctaGroup.opacity = target.opacity;
      this.ctaGroup.position.y = target.y;

    }).bind(this),
    onComplete: (function () {

      this.itemsPosition[this.itemsPosition.length - 2] = {
        name: 'ctaGroup',
        y: this.ctaGroup.bounds._y,
        x: this.ctaGroup.bounds._x,
        w: this.ctaGroup.bounds._width,
        h: this.ctaGroup.bounds._height
      };

        this.trigger(EVENT.CANVAS_SHOWN);
      this.canAnimate = true;

    }).bind(this)
  });

}

SeriesCanvasView.prototype.hide = function () {

  if (!this.currentView.isMainVideo)this.managerBlobs();

  this.ctaGroup.visible = false;
  this.ctaGroup.opacity = 0;
  this.videoBlob.path.visible = false;
  this.rectanglePath.visible = false;

  _.each(this.blobs, (function (blob) {
    blob.path.visible = false;
  }).bind(this));

  this.trigger(EVENT.CANVAS_HIDDEN);

  this.mainBlob.path.visible = true;
  this.compoundPath.visible = false;

}

SeriesCanvasView.prototype.animate = function (e) {

  if (this.canAnimate) {

    this.videoBlob.animate(e);

    _.each(this.blobs, (function (blob) {

      if (blob.paper)blob.animate(e);

    }).bind(this));

  }

}

SeriesCanvasView.prototype.mouseMove = function (e) {

  if (!this.isShown) return;
  var item = this.isItem(e.point);
  document.body.style.cursor = item || item == 0 ? "pointer" : "default";

}

SeriesCanvasView.prototype.mouseDown = function (e) {

  if (this.options.currentView.isMainVideo) {

    if (e.point.y > this.videoBlob.path.position.y + this.videoBlob.path.bounds.height / 2) {
      this.currentView.manageBlock();
    }
    else {

      this.currentView.managePlayer();
      this.setSizeBlobVideo();

    }
  }
  else {

    var item = this.isItem(e.point);

    if (item == 'video') {
      this.currentView.managePlayer();
      this.setSizeBlobVideo();
    }
    else if (item == 'ctaGroup') this.currentView.manageBlock();
    else if (item) this.currentView.switchMovie(this.currentItem.i);

  }


}

SeriesCanvasView.prototype.setSizeBlobVideo = function () {

  if (!CV.isMobile) return;

  this.itemsPosition[this.itemsPosition.length - 1].isBig = this.itemsPosition[this.itemsPosition.length - 1].isBig ? false : true;
  this.videoBlob.canAnimate = false;

  this.crossRaster.visible = this.crossRaster.visible ? false : true;
  this.arrowRaster.visible = this.arrowRaster.visible ? false : true;

  var target = {
    width: this.videoBlob.path.bounds._width
  }

  TweenMax.to(target, .5, {
    width: this.itemsPosition[this.itemsPosition.length - 1].isBig ? this.options.currentView.isMainVideo ? CV.viewport.width * .5 : CV.viewport.width * .3 : this.options.currentView.isMainVideo ? CV.viewport.width * .35 : 350,
    ease: Expo.easeOut,
    onUpdate: (function () {

      this.videoBlob.path.bounds.width = target.width;
      this.videoBlob.path.position.x = CV.viewport.width / 2;
      this.setPositionMainVideo();

    }).bind(this),
    onComplete: (function () {

      if (!this.itemsPosition[this.itemsPosition.length - 1].isBig)this.videoBlob.canAnimate = true;

    }).bind(this)
  });

}

SeriesCanvasView.prototype.isItem = function (p) {

  var itemName = null;
  var yItem;
  var xItem;
  var wItem;
  var hItem;

  _.each(this.itemsPosition, (function (item, i) {

    yItem = eval(item.y);
    xItem = eval(item.x);
    wItem = item.w / 2;
    hItem = item.h / 2;


    if (p && p.y > yItem - hItem && p.y < yItem + hItem && p.x > xItem - wItem && p.x < xItem + wItem && !itemName) {

      this.currentItem = item;
      itemName = item.name;

      return itemName;

    }

    return itemName;

  }).bind(this));

  return itemName;

}

SeriesCanvasView.prototype.onResize = function () {

  this.xFirstContainerBlob = (CV.viewport.width - this.sizeFirstContainerBlob) / 2;
  this.xSecondContainerBlob = (CV.viewport.width - this.sizeSecondContainerBlob) / 2;

  this.videoBlob.canAnimate = false;
  this.videoBlob.path.position.x = CV.viewport.width / 2;
  this.videoBlob.generateSettingsPoints();
  var xBlob;
  var yBlob;

  _.each(this.blobs, (function (blob, i) {

    blob.canAnimate = true;
    xBlob = i < 3 ? this.xFirstContainerBlob + i * this.wBlob + this.wBlob / 2 : this.xSecondContainerBlob + (i - 3) * this.wBlob + this.wBlob / 2;
    blob.generateSettingsPoints();

  }).bind(this));

  this.ctaGroup.position.x = CV.viewport.width / 2;

  AbstractCanvasView.prototype.onResize.call(this);

}

module.exports = SeriesCanvasView;
