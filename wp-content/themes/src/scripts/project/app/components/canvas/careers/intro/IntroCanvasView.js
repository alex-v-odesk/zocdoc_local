var Blob = require('canvas/blob');
var BaseView = require('app/abstract/baseView');
var BezierEasing = require('BezierEasing');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var IntroCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.indexLoader = 0;
  this.rasters = [];
  this.isInit = false;
  this.canAnimate = false;

  this.scale = CV.isMobile ? 640 / CV.viewport.height * .3 : 640 / CV.viewport.height * .7;

  BaseView.call(this, options, datas);

}

_.extend(IntroCanvasView, BaseView);
_.extend(IntroCanvasView.prototype, BaseView.prototype);

IntroCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.itemsPosition = [];

  // if (CV.viewport.width > 1500) {
  //   var maxControlBlobWidth = (CV.breakpoint === 'default') ? 800 : window.innerWidth * 1.4;
  // } else {
  //   var maxControlBlobWidth = (CV.breakpoint === 'default') ? 550 : window.innerWidth * 1.4;
  // }

  if (CV.viewport.width > 1500) {
      var maxControlBlobWidth = 800;
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var maxControlBlobWidth = 550;
  } else {
      var maxControlBlobWidth = 475;
  }

  if (CV.viewport.width > 1500) {
      var maxJoinBlobWidth = 200;
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var maxJoinBlobWidth = 175;
  } else {
      var maxJoinBlobWidth = 150;
  }

  this.mainBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    color: '#d5b5fb',
    position: {
      x: 'window.innerWidth / 2',
      y: 'CV.isMobile ? window.innerHeight / 2 - 20 : window.innerHeight / 2'
    },
    size: {
      w: 'window.innerWidth * 4',
      maxW: 'window.innerWidth * 4'
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    orbit: {
      h: 2,
      w: 2
    },
    divide: 2,
    multiply: 0.2
  });

  this.controlBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    position: {
      x: 'window.innerWidth / 2',
      y: 'window.innerHeight / 2'
    },
    size: {
      w: maxControlBlobWidth,
      maxW: maxControlBlobWidth
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    orbit: {
      h: 0,
      w: 0
    }
  });

  this.joinBlob = new Blob({
    scope: this,
    canvasView: this.mainCanvasView,
    color: '#fef25c',
    position: {
      x: 'window.innerWidth / 2 + this.scope.controlBlob.path.bounds._width / 3',
      y: 'window.innerHeight / 2 + this.scope.controlBlob.path.bounds._height / 2'
    },
    size: {
      w: '40',
      maxW: maxJoinBlobWidth
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    orbit: {
      h: 2,
      w: 2
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

  this.joinBlob.path.opacity = 0;
  this.joinBlob.text.opacity = 0;

  this.controlBlob.path.visible = false;

  //this.mainBlob.path.selected = true;
  // this.controlBlob.path.selected = true;
  // this.joinBlob.path.selected = true;

  this.rastersLoader = [];

  BaseView.prototype.init.call(this);

}

IntroCanvasView.prototype.initTL = function () {

  this.initTLShow();

  BaseView.prototype.initTL.call(this);
}

IntroCanvasView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  _resetJoinBlob.call(this);

  var mainBlobTarget = {
    width: this.mainBlob.path.bounds._width,
    y: this.mainBlob.path.position.y
  };

  var joinBlobTarget = {
    width: this.joinBlob.path.bounds._width,
    y: this.joinBlob.path.position.y,
    opacity: this.joinBlob.path.opacity
  };

  var joinBlobTextTarget = {
    opacity: 0
  }

  if (CV.viewport.width > 1500) {
      var maxMainBlobWidth = 800;
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var maxMainBlobWidth = 550;
  } else {
      var maxMainBlobWidth = 450;
  }

  if (CV.viewport.width > 1500) {
      var maxJoinBlobWidth = 200;
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var maxJoinBlobWidth = 175;
  } else {
      var maxJoinBlobWidth = 150;
  }
  //var maxJoinBlobWidth = (CV.breakpoint === 'default') ? 200 : 150;

  this.TL.show.to(mainBlobTarget, 1, {
    width: maxMainBlobWidth,
    y: (CV.breakpoint === 'sml') ? CV.viewport.height / 2 - 80 : CV.viewport.height / 2,
    onUpdate: (function () {

      var scale = this.mainBlob.getScale({w: mainBlobTarget.width}, this.mainBlob.path);
      this.mainBlob.path.scale(scale);

      this.mainBlob.path.position.y = mainBlobTarget.y;

    }).bind(this),
    onUpdateParams: ["{self}"],
    ease: Elastic.easeOut.config(1, 1.2)
  }, 0)

      .to(joinBlobTarget, 0.6, {
        width: maxJoinBlobWidth,
        y: this.joinBlob.path.position.y,
        opacity: 1,
        y: CV.isMobile ? CV.viewport.height / 2 + this.controlBlob.path.bounds._height / 2 - 70 : CV.viewport.height / 2 + this.controlBlob.path.bounds._height / 2 - 20,
        onUpdate: (function () {

          var scale = this.joinBlob.getScale({w: joinBlobTarget.width}, this.joinBlob.path);
          this.joinBlob.path.scale(scale);

          this.joinBlob.path.position.y = joinBlobTarget.y;
          this.joinBlob.text.position.y = joinBlobTarget.y;
          this.joinBlob.path.opacity = joinBlobTarget.opacity;

        }).bind(this),
        onUpdateParams: ["{self}"],
        ease: Elastic.easeOut.config(1, 0.75)
      }, 0.8)

      .to(joinBlobTextTarget, 0.6, {
        opacity: 1,
        onUpdate: (function () {

          this.joinBlob.text.opacity = joinBlobTextTarget.opacity;

        }).bind(this),
        onUpdateParams: ["{self}"],
      }, 0.9);

}

var _resetJoinBlob = function () {

  var scale = this.joinBlob.getScale({w: 40}, this.joinBlob.path);
  this.joinBlob.path.scale(scale);
  this.joinBlob.path.opacity = 0;
  this.joinBlob.path.visible = true;
  this.joinBlob.path.position.x = (CV.breakpoint === 'default') ? CV.viewport.width / 2 + this.controlBlob.path.bounds._width / 3 + 40 : CV.viewport.width / 2;
  this.joinBlob.path.position.y = CV.viewport.height / 2 + this.controlBlob.path.bounds._height / 2 + 60;

}

IntroCanvasView.prototype.show = function () {

  //if (this.mainCanvasView.paper.view.size.height > CV.viewport.height)this.paper.view.setViewSize(CV.viewport.width, CV.viewport.height);

  if (this.TL.show) this.killTL('show');
  this.initTLShow();

  TweenMax.set(this.mainCanvasView.options.el, {zIndex: 0});

  this.mainBlob.path.visible = true;

  this.mainBlob.canAnimate = false;
  this.joinBlob.canAnimate = false;
  this.canAnimate = false;

  setTimeout((function () {

    var rectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(500, 500));
    var shape = new paper.Shape.Rectangle(rectangle);

    this.mainBlob.path.toShape(shape)

  }).bind(this), 600)

  if (this.TL.show) this.TL.show.play(0);

}

IntroCanvasView.prototype.onShown = function () {

  this.mainBlob.generateSettingsPoints();
  this.joinBlob.generateSettingsPoints();

  this.mainBlob.canAnimate = true;
  this.joinBlob.canAnimate = true;
  this.canAnimate = true;

  this.isShown = true;

  this.itemsPosition.push({
    name: 'joinBlob',
    i: 0,
    y: this.joinBlob.path.position.y,
    x: this.joinBlob.path.position.x,
    w: this.joinBlob.path.bounds._width,
    h: this.joinBlob.path.bounds._height
  });

  this.trigger(EVENT.CANVAS_SHOWN);

}

IntroCanvasView.prototype.initTLHide = function () {

  this.mainBlob.canAnimate = true;
  this.joinBlob.canAnimate = true;

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  var mainBlobTarget = {
    width: this.mainBlob.path.bounds._width,
    height: this.mainBlob.path.bounds._height,
    y: this.mainBlob.path.position.y
  };

  var joinBlobTarget = {
    width: this.joinBlob.path.bounds._width,
    y: this.joinBlob.path.position.y
  };

  var joinBlobTextTarget = {
    opacity: 1
  }

  this.TL.hide.to(mainBlobTarget, 0.8, {
    width: 100,
    height: this.mainBlob.path.bounds._height + 500,
    y: 0 - this.mainBlob.path.bounds._height,
    onUpdate: (function () {

      var scale = this.mainBlob.getScale({w: mainBlobTarget.width}, this.mainBlob.path);
      this.mainBlob.path.scale(scale);

      //this.mainBlob.path.bounds.height = mainBlobTarget.height;

      this.mainBlob.path.position.y = mainBlobTarget.y;

    }).bind(this),
    onUpdateParams: ["{self}"],
    ease: Power4.easeIn,
    onComplete: (function () {

      this.mainBlob.path.visible = false;

    }).bind(this)
  }, 0.15)

      .to(joinBlobTarget, 0.8, {
        width: 100,
        y: 0 - this.joinBlob.path.bounds._width,
        onUpdate: (function () {

          var scale = this.joinBlob.getScale({w: joinBlobTarget.width}, this.joinBlob.path);
          this.joinBlob.path.scale(scale);

          this.joinBlob.path.position.y = joinBlobTarget.y;

        }).bind(this),
        onUpdateParams: ["{self}"],
        ease: Power4.easeIn
      }, 0.1)

      .to(joinBlobTextTarget, 0.3, {
        opacity: 0,
        onUpdate: (function () {

          this.joinBlob.text.opacity = joinBlobTextTarget.opacity;

        }).bind(this),
        onUpdateParams: ["{self}"]
      }, 0);

}

IntroCanvasView.prototype.manageStep = function (state, target, i, callback) {

  this.rasterStep = this["rasters" + target];

  this["index" + target] = this["index" + target] - state;
  this.indexStep = this["index" + target];

  this.rasterStep[this.indexStep].visible = true;
  if (this.rasterStep[this.indexStep + state]) this.rasterStep[this.indexStep + state].visible = false;

  if (this.indexStep < this.rasterStep.length - 1 && this.indexStep > 0) {
    setTimeout(
        (function () {
          this.manageStep(state, target, i, callback);
        }).bind(this), 25);
  }
  else {
    callback();
  }

}

IntroCanvasView.prototype.generateImages = function (assets, rasters, y, callback) {

  var raster;
  //var start = Date.now();
  //var cpt = 0;
  //console.log('generateImge: start');
  this.rasters.push(_.each(assets, (function (image) {

    raster = new paper.Raster(image);
    raster.visible = false;
    raster.position = new paper.Point(this.paper.view.size.width / 2, this.paper.view.size.height / 2 + y);
    raster.scale(this.scale);
    rasters.push(raster);

    //cpt++;
    //if (cpt === assets.length - 1) {
      //console.log('generateImge: end each loop', Date.now() - start);
    //}

  }).bind(this)));

  // console.log("this.rasters =", this.rasters);

  //console.log('generateImge: callback', Date.now() - start);
  callback();

}

IntroCanvasView.prototype.hideZee = function () {

  var rasterTarget = {
    opacity: 1,
    width: 640 / CV.viewport.width / 2
  }

  this.trigger(EVENT.LOADER_COMPLETE);

  TweenMax.to(rasterTarget, .3, {
    opacity: 0,
    width: 320 / CV.viewport.width / 2,
    delay: 0.1,
    onUpdate: (function () {

      this.rastersLoader[this.rastersLoader.length - 1].opacity = rasterTarget.opacity;

    }).bind(this)
  });

}

IntroCanvasView.prototype.hide = function () {

  this.mainBlob.canAnimate = false;
  this.joinBlob.canAnimate = false;
  this.canAnimate = false;

  if (this.TL.hide) this.killTL('hide');
  this.initTLHide();

  if (this.TL.hide) this.TL.hide.play(0);
}

IntroCanvasView.prototype.onHidden = function () {

  this.trigger(EVENT.CANVAS_HIDDEN);

  this.joinBlob.path.opacity = 0;
  this.joinBlob.path.visible = false;

  this.mainBlob.generateSettingsPoints();
  this.joinBlob.generateSettingsPoints();

  this.mainBlob.path.visible = false;

}

IntroCanvasView.prototype.animate = function (e) {

  this.event = e;

  if (this.canAnimate && !CV.isMobile) this.mainBlob.animate(e);
  if (this.canAnimate && !CV.isMobile) this.joinBlob.animate(e);

}

IntroCanvasView.prototype.mouseMove = function (e) {

  if (!this.isShown) return;

  var item = this.isItem(e.point);
  document.body.style.cursor = item || item == 0 ? "pointer" : "default";

}

IntroCanvasView.prototype.mouseDown = function (points) {

  var item = this.isItem(points);
  if (!item && item != 0 || !this.isShown) return;
  if (this.itemsPosition[item].name == 'joinBlob') location.href = "http://" + window.location.hostname + "/about/careers-list";

}

IntroCanvasView.prototype.isItem = function (p) {

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

IntroCanvasView.prototype.onResize = function () {

  if (!this.isShown) return;

  if (CV.viewport.width > 1500) {
      var mainBlobScale = this.mainBlob.getScale({w: 800}, this.mainBlob.path);
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var mainBlobScale = this.mainBlob.getScale({w: 550}, this.mainBlob.path);
  } else {
      var mainBlobScale = this.mainBlob.getScale({w: 450}, this.mainBlob.path);
  }

  if (CV.viewport.width > 1500) {
      var controlBlobScale = this.controlBlob.getScale({w: 800}, this.controlBlob.path);
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var controlBlobScale = this.controlBlob.getScale({w: 550}, this.controlBlob.path);
  } else {
      var controlBlobScale = this.controlBlob.getScale({w: 450}, this.controlBlob.path);
  }

  if (CV.viewport.width > 1500) {
      var joinBlobScale = this.joinBlob.getScale({w: 200}, this.joinBlob.path);
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var joinBlobScale = this.joinBlob.getScale({w: 175}, this.joinBlob.path);
  } else {
      var joinBlobScale = this.joinBlob.getScale({w: 150}, this.joinBlob.path);
  }

  this.mainBlob.path.scale(mainBlobScale);
  this.controlBlob.path.scale(controlBlobScale);
  this.joinBlob.path.scale(joinBlobScale);

  if (CV.breakpoint === 'sml') {

    this.mainBlob.path.position.x = CV.viewport.width / 2;
    this.mainBlob.path.position.y = CV.viewport.height / 2 - 80;

    this.controlBlob.path.position.x = CV.viewport.width / 2;
    this.controlBlob.path.position.y = CV.viewport.height / 2 - 80;

    this.joinBlob.path.position.x = CV.viewport.width / 2;
    this.joinBlob.path.position.y = CV.viewport.height / 2 + this.controlBlob.path.bounds._height / 2 - 40;

  } else {

    this.mainBlob.path.position.x = CV.viewport.width / 2;
    this.mainBlob.path.position.y = CV.viewport.height / 2;

    this.controlBlob.path.position.x = CV.viewport.width / 2;
    this.controlBlob.path.position.y = CV.viewport.height / 2;

    this.joinBlob.path.position.x = CV.viewport.width / 2 + this.controlBlob.path.bounds._width / 3 + 40;
    this.joinBlob.path.position.y = CV.viewport.height / 2 + this.controlBlob.path.bounds._height / 2 - 20;

  }

  this.joinBlob.text.position.x = this.joinBlob.path.position._x;
  this.joinBlob.text.position.y = this.joinBlob.path.position._y;

  this.controlBlob.onResize();
  this.mainBlob.onResize();
  this.joinBlob.onResize();

}

module.exports = IntroCanvasView;
