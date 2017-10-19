var Blob = require('canvas/blob');
var CV = require('app/config/currentValues');
var BaseView = require('app/abstract/baseView');
var EVENT = require('app/events/events');
var Tools = require('app/tools/tools');

var IntroCanvasView = function (options, datas) {

  this.mainCanvasView = options.mainCanvasView;
  this.mainView = options.mainView;
  this.canAnimate = false;
  this.currentScrollY = 0;

  BaseView.call(this, options, datas);

}

_.extend(IntroCanvasView, BaseView);
_.extend(IntroCanvasView.prototype, BaseView.prototype);

IntroCanvasView.prototype.init = function () {

  this.paper = this.options.mainCanvasView.paper;
  this.mainBlob = this.options.mainCanvasView.aCanvasAnimViews.start.mainBlob;
  this.viewBlob = this.options.mainCanvasView.aCanvasAnimViews.start;
  this.$canvas = this.mainView.$canvas;

  BaseView.prototype.init.call(this);

}

IntroCanvasView.prototype.initTLShow = function () {

}

IntroCanvasView.prototype.show = function () {

  this.canAnimate = false;
  this.isAnimating = true;
  this.mainBlob.canAnimate = false;
  this.mainBlob.path.opacity = 1;
  this.mainBlob.path.position.x = CV.viewport.width / 2;
  var wBlob = CV.isMobile ? CV.viewport.width * .7 : 450;

  if (CV.isMobile) {
    this.mainBlob.path.visible = false;
    TweenMax.set(this.$canvas, {background: "rgb(78, 213, 245)"});
  }

  if (CV.scrollYDirection == 'DOWN') {

    this.mainBlob.path.fillColor = "#4ed5f5";
    this.mainBlob.path.position.y = -300;

    var sBlob = this.mainBlob.getScale({w: wBlob}, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);
    this.mainBlob.generateSettingsPoints();

    var target = {
      width: this.mainBlob.path.bounds._width
    };

    TweenMax.to(target, 0.6, {
      width: CV.viewport.width * 4,
      height: CV.viewport.height * 4,
      ease: Expo.easeOut,
      onUpdate: (function () {

        //$(this.$canvas).removeAttr('style');
        s = this.mainBlob.getScale({w: target.width, h: target.height}, this.mainBlob.path);
        this.mainBlob.path.scale(s);



      }).bind(this),
      onComplete: (function () {

        this.mainBlob.canAnimate = false;
        this.mainBlob.path.position.y = CV.viewport.height / 2;
        this.mainBlob.generateSettingsPoints();

        TweenMax.set(this.$canvas, {background: "rgb(78, 213, 245)"});

        this.blobIsCenter = true;

        var color = {
          r: 78,
          g: 213,
          b: 245,
          width: this.mainBlob.path.bounds._width
        };
        var nextColor;
        var s;

        TweenMax.to(color, .8, {
          r: 6,
          g: 33,
          b: 90,
          width: 450,
          ease: Expo.easeOut,
          onUpdate: (function () {

            nextColor = Tools.rgbToHex(color.r, color.g, color.b);
            this.mainBlob.path.fillColor = nextColor;

            s = this.mainBlob.getScale({w: color.width}, this.mainBlob.path);
            this.mainBlob.path.scale(s);

          }).bind(this),
          onComplete: (function () {

            this.canAnimate = true;
            this.mainBlob.canAnimate = true;
            this.mainBlob.generateSettingsPoints();
            this.isAnimating = false;
            this.trigger(EVENT.CANVAS_SHOWN);

          }).bind(this)
        });

      }).bind(this),
      delay: 0
    });

    this.mainBlob.path.position.y = -250;
    var targetY = {
      y: -250
    };

    TweenMax.to(targetY, 1.1, {
      y: CV.viewport.height / 2,
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.mainBlob.path.position.y = targetY.y;

      }).bind(this)
    });

  }
  else {



    this.mainBlob.path.fillColor = "#06215a";
    this.mainBlob.path.position = this.paper.view.center;
    this.mainBlob.generateSettingsPoints();

    var sBlob = this.mainBlob.getScale({
      w: CV.viewport.width * 4,
      h: CV.viewport.height * 4
    }, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);

    TweenMax.set(this.$canvas, {background: "rgb(78, 213, 245)"});

    var target = {
      width: this.mainBlob.path.bounds._width
    };
    var s;

    TweenMax.to(target, .6, {
      width: wBlob,
      onUpdate: (function () {

        s = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
        this.mainBlob.path.scale(s);

      }).bind(this),
      onComplete: (function () {

        this.canAnimate = true;
        this.isAnimating = false;
        this.mainBlob.generateSettingsPoints();
        this.trigger(EVENT.CANVAS_SHOWN);

      }).bind(this),
      delay: 0,
      ease: Expo.easeOut
    });
  }
}

IntroCanvasView.prototype.initCanvas = function () {

  if (CV.scrollYDirection == 'DOWN') {

    var sBlob = this.mainBlob.getScale({w: 450}, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);
    this.mainBlob.path.position.y = -250;
    this.mainBlob.path.fillColor = "#42d6f8";
  }
  else {
    var sBlob = this.mainBlob.getScale({
      w: CV.viewport.width * 4,
      h: CV.viewport.height * 4
    }, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);
    this.mainBlob.path.position.y = CV.viewport.height / 2;
    this.mainBlob.path.fillColor = "#06215a";
  }

}

IntroCanvasView.prototype.animate = function (e) {

  this.setBlob(CV.scrollY);

  this.mainBlob.canAnimate = CV.scrollY > 0 ? false : true;

  if (!this.isVisible || CV.isMobile) return;

  if (this.canAnimate) {

    if (CV.scrollY == 0) {

      this.mainBlob.path.position.y = CV.viewport.height / 2;

      if (this.mainBlob.path.position.y != CV.viewport.height / 2) {
        var target = {
          y: this.mainBlob.path.position.y
        };

        TweenMax.to(target, .05, {
          y: CV.viewport.height / 2,
          onUpdate: (function () {

            this.mainBlob.path.position.y = target.y;

          }).bind(this),
          onComplete: (function () {

            this.mainBlob.canAnimate = true;

          }).bind(this),
          ease: Linear.easeNone
        });
      }

      this.mainBlob.animate(e);

    }

    //console.log(CV.isScrolling, CV.isTouching)

    if ((CV.isScrolling || CV.isTouching) && this.isVisible) {

      this.mainBlob.canAnimate = false;

      this.mainBlob.path.position.y = CV.viewport.height / 2 - CV.scrollY;

    }

  }

}

IntroCanvasView.prototype.setBlob = function (y) {

  if (this.isAnimating)return;

  this.isVisible = y > CV.viewport.height ? false : true;

  if (y > CV.viewport.height + 100 && !this.blobIsCenter) {

    this.blobIsCenter = true;
    var sBlob = this.mainBlob.getScale({
      w: CV.viewport.width * 4,
      h: CV.viewport.height * 4
    }, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);
    this.mainBlob.path.position.y = CV.viewport.height / 2;
    this.mainBlob.path.fillColor = "#42d6f8";
    //$(this.$canvas).removeAttr('style');

  }
  else if (this.blobIsCenter && y < CV.viewport.height + 100) {

    this.blobIsCenter = false;
    this.mainBlob.path.fillColor = "#06215a";
    //TweenMax.set(this.$canvas, {background: "#4ed5f5"});

    var wBlob = CV.isMobile ? CV.viewport.width * .7 : 450;
    var sBlob = this.mainBlob.getScale({w: wBlob}, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);

    this.mainBlob.path.position.y = -300;

  }

  if (CV.viewport.width / 2)this.mainBlob.path.position.x = CV.viewport.width / 2;

}

IntroCanvasView.prototype.hide = function () {

  this.isAnimating = true;

  if (CV.isMobile) {
    this.mainBlob.path.visible = true;
  }

  if (CV.scrollYDirection == 'DOWN') {

    $(this.$canvas).removeAttr('style');

    var target = {
      width: this.mainBlob.path.bounds._width,
      opacity: this.mainBlob.path.opacity
    };
    var s;

    TweenMax.to(target, 1.5, {
      width: CV.viewport.width * 2,
      height: CV.viewport.height * 2,
      opacity: 0,
      ease: Expo.easeOut,
      onUpdate: (function () {

        s = this.mainBlob.getScale({w: target.width, h: target.height}, this.mainBlob.path);
        this.mainBlob.path.scale(s);
        this.mainBlob.path.opacity = target.opacity;

      }).bind(this),
      onComplete: (function () {


        this.isAnimating = false;
        this.trigger(EVENT.CANVAS_HIDDEN);

      }).bind(this)
    });

  }
  else {

    this.blobIsCenter = true;
    var sBlob = this.mainBlob.getScale({
      w: CV.viewport.width * 4,
      h: CV.viewport.height * 4
    }, this.mainBlob.path);
    this.mainBlob.path.scale(sBlob);
    this.mainBlob.path.position.y = CV.viewport.height / 2;
    this.mainBlob.path.fillColor = "#42d6f8";
    $(this.$canvas).removeAttr('style');

    var target = {
      width: this.mainBlob.path.bounds._width,
    };

    var s;

    TweenMax.to(target, 1.5, {
      width: 450,
      ease: Expo.easeOut,
      onUpdate: (function () {

        $(this.$canvas).removeAttr('style');
        s = this.mainBlob.getScale({w: target.width}, this.mainBlob.path);
        this.mainBlob.path.scale(s);

      }).bind(this)
    });

    this.mainBlob.path.position.y = CV.viewport.height / 2;

    var targetY = {
      y: CV.viewport.height / 2
    };

    TweenMax.to(targetY, 1.1, {
      y: -250,
      ease: Expo.easeOut,
      onUpdate: (function () {

        this.mainBlob.path.position.y = targetY.y;

      }).bind(this),
      onComplete: (function () {

        this.isAnimating = false;
        this.trigger(EVENT.CANVAS_HIDDEN);

      }).bind(this)
    });

  }

}

IntroCanvasView.prototype.onResize = function () {

  if (!this.isShown) return;

  this.setBlob(CV.scrollY);


  this.mainBlob.onResize();

  if (CV.viewport.width > 1500) {
    var wBlob = this.mainBlob.getScale({w: 450}, this.mainBlob.path);
  }
  else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
    var wBlob = this.mainBlob.getScale({w: 350}, this.mainBlob.path);
  }
  else {
    var wBlob = this.mainBlob.getScale({w: 250}, this.mainBlob.path);
  }

  this.mainBlob.path.scale(wBlob);

  this.mainBlob.path.position.x = CV.viewport.width / 2;
  this.mainBlob.path.position.y = CV.viewport.height / 2;

}

module.exports = IntroCanvasView;
