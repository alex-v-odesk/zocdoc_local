var Blob = require('canvas/blob');
var BaseView = require('app/abstract/baseView');
var BezierEasing = require('BezierEasing');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var JoinCanvasView = function (options, datas) {

  //----------0 Main Blob
  this.imgURL = options.imgURL;

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;

  this.canAnimate = false;

  BaseView.call(this, options, datas);

}

_.extend(JoinCanvasView, BaseView);
_.extend(JoinCanvasView.prototype, BaseView.prototype);

JoinCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.itemsPosition = [];

  this.maxOverlayBlobWidth = CV.breakpoint === 'default' ? window.innerWidth * 2 : window.innerHeight * 2;

  var maxMainBlobWidth = (CV.breakpoint === 'default') ? 700 : window.innerWidth * 1.2;

  if (CV.viewport.width > 1500) {
    var maxJoinBlobWidth = 200;
  }
  else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
    var maxJoinBlobWidth = 175;
  }
  else {
    var maxJoinBlobWidth = 150;
  }

  this.mainBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    bgColor: '#fa6876',
    position: {
      x: 'window.innerWidth * .5',
      y: 'window.innerHeight * .5'
    },
    size: {
      w: maxMainBlobWidth,
      maxW: maxMainBlobWidth
    },
    orbit: {
      h: 2,
      w: 2
    },
    divide: 2,
    multiply: 0.2
  });

  this.joinBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    color: '#fef25c',
    position: {
      x: 'window.innerWidth / 2 + this.scope.mainBlob.path.bounds._width / 3',
      y: 'window.innerHeight / 2 + this.scope.mainBlob.path.bounds._height / 2 - 20'
    },
    size: {
      w: 'window.innerWidth * .4',
      maxW: maxJoinBlobWidth
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    orbit: {
      h: 0,
      w: 0
    },
    text: {
      content: 'Join us',
      color: '#0b215a',
      position: {
        x: 'this.scope.joinBlob.position._x',
        y: 'this.scope.joinBlob.position._y'
      }
    },
    divide: 2,
    multiply: 0.2,
    canHover: true,
    canClick: true,
    goTo: '/about/careers-list'
  });

  this.overlayBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    color: '#f1f1f9',
    position: {
      x: CV.viewport.width / 2,
      y: CV.viewport.height / 2
    },
    size: {
      w: this.maxOverlayBlobWidth,
      maxW: this.maxOverlayBlobWidth
    }
  });

  this.mainBlob.path.visible = false;
  this.overlayBlob.path.visible = false;
  this.overlayBlob.path.opacity = 0;

  this.mainBlob.rectanglePath.opacity = 0;

  this.joinBlob.path.opacity = 0;
  this.joinBlob.text.opacity = 0;

  //this.overlayBlob.path.selected = true;

  // Prevent blob from animating
  this.mainBlob.canAnimate = false;
  this.joinBlob.canAnimate = false;

  BaseView.prototype.init.call(this);

}

JoinCanvasView.prototype.initTL = function () {

  this.initTLShow();

  BaseView.prototype.initTL.call(this);
}

JoinCanvasView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  var mainBlobTarget = {
    opacity: this.mainBlob.path.opacity
  };

  var joinBlobTarget = {
    opacity: this.joinBlob.path.opacity
  };

  var joinBlobTextTarget = {
    opacity: this.joinBlob.path.opacity,
  }

  var overlayBlobTarget = {
    y: this.overlayBlob.path.position.y,
    w: this.overlayBlob.path.bounds.width
  };

  this.TL.show.to(overlayBlobTarget, 1, {
    y: -this.overlayBlob.path.bounds.height / 2 - CV.viewport.height / 2,
    w: CV.viewport.width * .4,
    onUpdate: (function () {

      this.overlayBlob.path.position.y = overlayBlobTarget.y;
      var scale = this.overlayBlob.getScale({w: overlayBlobTarget.w}, this.overlayBlob.path);
      this.overlayBlob.path.scale(scale);

    }).bind(this),
    ease: Cubic.easeOut
  }, 0)

      .to(mainBlobTarget, 0.6, {
        opacity: 1,
        onUpdate: (function () {

          this.mainBlob.path.opacity = mainBlobTarget.opacity;
          this.mainBlob.rectanglePath.opacity = mainBlobTarget.opacity;

        }).bind(this),
        ease: Elastic.easeOut.config(0.7, 0.7),
      }, 0)

      .to(joinBlobTarget, 0.6, {
        opacity: 1,
        onUpdate: (function () {

          this.joinBlob.path.opacity = joinBlobTarget.opacity;

        }).bind(this),
        ease: Expo.easeOut,
      }, 0)
      .to(joinBlobTextTarget, 0.6, {
        opacity: 1,
        onUpdate: (function () {

          this.joinBlob.text.opacity = joinBlobTextTarget.opacity;
          TweenMax.set(this.mainCanvasView.options.el, {y: -CV.scrollY});

        }).bind(this),
      }, 0);
}

JoinCanvasView.prototype.show = function () {

  this.onResize();

  this.isShown = false;
  TweenMax.set(this.mainCanvasView.options.el, {zIndex: 1, y: 0});

  this.mainBlob.path.visible = true;
  this.mainBlob.path.opacity = 1;

  this.overlayBlob.path.visible = true;
  this.overlayBlob.path.opacity = 1;

  this.mainBlob.canAnimate = false;
  this.joinBlob.canAnimate = false;
  this.canAnimate = false;

  // MAINBLOB
  this.joinBlob.path.visible = true;
  this.joinBlob.path.opacity = 0;
  this.joinBlob.text.opacity = 0;

  // this.joinBlob.path.position.y = CV.viewport.height / 2 + this.mainBlob.path.bounds._height / 2;
  // this.joinBlob.text.position.y = this.joinBlob.path.position.y;

  if (this.TL.show) this.TL.show.play(0);

}

JoinCanvasView.prototype.onShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);

  this.isShown = true;

  if (this.TL.hide) this.TL.hide = {};

  this.initTLHide();

  this.mainBlob.canAnimate = true;
  this.joinBlob.canAnimate = true;
  this.canAnimate = true;

  this.itemsPosition.push({
    name: 'joinBlob',
    i: 0,
    y: this.joinBlob.path.position.y,
    x: this.joinBlob.path.position.x,
    w: this.joinBlob.path.bounds._width,
    h: this.joinBlob.path.bounds._height
  });

  this.onResize();

}

JoinCanvasView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  var overlayBlobTarget = {
    y: this.overlayBlob.path.position.y,
    w: this.overlayBlob.path.bounds.width
  };

  this.TL.hide.to(overlayBlobTarget, 1, {
    y: CV.viewport.height / 2,
    w: this.maxOverlayBlobWidth,
    onUpdate: (function () {

      this.overlayBlob.path.position.y = overlayBlobTarget.y;
      this.overlayBlob.path.position.x = CV.viewport.width / 2;

      var scale = this.overlayBlob.getScale({w: overlayBlobTarget.w}, this.overlayBlob.path);
      this.overlayBlob.path.scale(scale);

    }).bind(this),
    ease: Expo.easeOut,
  }, 0)

}

JoinCanvasView.prototype.hide = function () {

  TweenMax.set(this.mainCanvasView.options.el, {y: 0});

  this.mainBlob.canAnimate = false;
  this.joinBlob.canAnimate = false;
  this.canAnimate = false;

  if (this.TL.hide) this.TL.hide.play(0);
}

JoinCanvasView.prototype.onHidden = function () {

  this.mainBlob.path.opacity = 0;
  // this.mainBlob.raster.opacity = 0;
  // this.mainBlob.rectangle.opacity = 0;
  this.mainBlob.rectanglePath.opacity = 0;
  this.joinBlob.text.opacity = 0;

  this.mainBlob.path.visible = false;
  this.joinBlob.path.visible = false;
  this.overlayBlob.path.visible = false;

  this.mainBlob.generateSettingsPoints();
  this.joinBlob.generateSettingsPoints();

  this.isShown = false;

  this.trigger(EVENT.CANVAS_HIDDEN);

}

JoinCanvasView.prototype.mouseMove = function (e) {

  if (!this.isShown) return;
  var item = this.isItem(e.point);

  document.body.style.cursor = item || item == 0 ? "pointer" : "default";
}

JoinCanvasView.prototype.mouseDown = function (points) {

  var item = this.isItem(points);
  if (!item && item != 0 || !this.isShown) return;
  if (this.itemsPosition[item].name == 'joinBlob') location.href = 'http://' + window.location.hostname + '/about/careers-list';

}

JoinCanvasView.prototype.isItem = function (p) {

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

JoinCanvasView.prototype.animate = function (e) {

  //if (this.mainBlob.rectanglePath.bounds.width != CV.viewport.width + 20 || this.mainBlob.rectanglePath.bounds.width < 200) this.onResize()
  // console.log('CV.scrollY', CV.scrollY, 'CV.touch.deltaY', CV.touch.deltaY);
  if (this.canAnimate && !CV.isMobile && !CV.isTablet) TweenMax.set(this.mainCanvasView.options.el, {y: -CV.scrollY, force3D:true});

  //if (this.canAnimate || CV.scrollYDirection == "UP" && !this.canAnimate)TweenMax.set(this.mainCanvasView.options.el, {y: -CV.scrollY, force3D:true});
  if (this.canAnimate && !CV.isMobile && !CV.isTablet) this.mainBlob.animate(e);
  if (this.canAnimate && !CV.isMobile && !CV.isTablet) this.joinBlob.animate(e);

}

JoinCanvasView.prototype.onResize = function () {

  this.mainBlob.rectanglePath.bounds.width = CV.viewport.width + 20;
  this.mainBlob.rectanglePath.bounds.height = CV.viewport.height + 20;

  this.mainBlob.rectanglePath.position.x = CV.viewport.width / 2;
  this.mainBlob.rectanglePath.position.y = CV.viewport.height / 2;

  this.mainBlob.path.position.x = CV.viewport.width / 2;
  this.mainBlob.path.position.y = CV.isMobile ? CV.viewport.height / 2 - 40 : CV.viewport.height / 2;

  var s;
  if (CV.isMobile && window.matchMedia("(orientation: landscape)").matches) {
    s = this.mainBlob.getScale({h: 'window.innerHeight * .7'}, this.mainBlob.path);
  }
  else {
    s = this.mainBlob.getScale({w: 'window.innerWidth * .9', maxW: 700}, this.mainBlob.path);
  }

  this.mainBlob.path.scale(s);

  this.joinBlob.path.position.x = CV.breakpoint === 'sml' ? CV.viewport.width / 2 : CV.viewport.width / 2 + this.mainBlob.path.bounds._width / 3;
  this.joinBlob.path.position.y = CV.breakpoint === 'sml' ? CV.viewport.height / 2 + this.mainBlob.path.bounds._height / 2 : CV.viewport.height / 2 + this.mainBlob.path.bounds._height / 2;

  this.itemsPosition[0] = {
    name: 'joinBlob',
    i: 0,
    x: this.joinBlob.path.position.x,
    y: this.joinBlob.path.position.y,
    w: this.joinBlob.path.bounds._width,
    h: this.joinBlob.path.bounds._height
  };

  this.joinBlob.text.position.x = this.joinBlob.path.position._x;
  this.joinBlob.text.position.y = this.joinBlob.path.position._y;

  this.mainBlob.onResize();
  this.joinBlob.onResize();

}

module.exports = JoinCanvasView;
