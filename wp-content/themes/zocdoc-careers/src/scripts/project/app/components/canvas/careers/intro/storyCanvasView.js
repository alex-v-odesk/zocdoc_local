var Blob = require('canvas/blob');
var AbstractCanvasView = require('abstract/abstractCanvasView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var StoryCanvasView = function (options, datas) {

  //this.mainCanvasView = options.mainCanvasView;

  this.TL = {};
  this.imgURL = options.imgURL;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(StoryCanvasView, AbstractCanvasView);
_.extend(StoryCanvasView.prototype, AbstractCanvasView.prototype);


StoryCanvasView.prototype.init = function () {

  this.paper = new paper.PaperScope();
  this.paper.setup(this.options.el);

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  if (CV.viewport.width > 1500) {
      this.blobMaxSize = 700;
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      this.blobMaxSize = 550;
  } else {
      this.blobMaxSize = CV.viewport.width * 0.75;
  }

  this.mainBlob = new Blob({
    scope: this,
    canvasView: this,
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    position:{
      x: 'this.paper.view.size.width / 2',
      y: 'this.paper.view.size.height / 2'
    },
    size: {
      w: this.blobMaxSize,
      maxW: this.blobMaxSize
    },
    orbit: {
      h: 3,
      w: 3
    },
    divide : 3,
    multiply: 0.3,
    bgImg: {
      url: this.imgURL,
      size: {
        w: CV.viewport.width,
        h: CV.viewport.height
      },
      layer: {
        color: 'black',
        opacity: 0.8
      }
    },
    canHover: true
  });

  this.imgLoaded = false;

  //this.mainBlob.path.opacity = 0;

  //this.mainBlob.path.visible = false;



  // Prevent blob from animating
  this.mainBlob.canAnimate = false;

  //this.mainBlob.path.selected = true;

  this.listenTo(this.mainBlob, EVENT.BLOB_IMG_LOADED, _onBlobImgLoaded.bind(this));

  //this.initTL();

  AbstractCanvasView.prototype.init.call(this);

}

var _onBlobImgLoaded = function(){

  this.imgLoaded = true;

  this.mainBlob.bgRaster.visible = true;
  this.mainBlob.bgImgGroup.opacity = 1;

}

// StoryCanvasView.prototype.initTL = function () {
//
//   console.log("initTL");
//
//   //this.initTLShow();
//
//   AbstractCanvasView.prototype.initTL.call(this);
// }

// StoryCanvasView.prototype.initTLShow = function() {
//
//   this.TL.show = new TimelineMax({paused:true, onComplete:this.onShown.bind(this)});
//
//   // MAINBLOB
//
//   var mainBlobTarget = {
//     opacity: 0
//   };
//
//   this.TL.show.to(mainBlobTarget, 0, {
//     opacity: 1,
//     onUpdate: (function () {
//
//       this.mainBlob.path.opacity = mainBlobTarget.opacity;
//       this.mainBlob.bgImgGroup.opacity = mainBlobTarget.opacity;
//       this.mainBlob.bgRaster.opacity = mainBlobTarget.opacity;
//
//     }).bind(this),
//     onUpdateParams: ["{self}"]
//   }, 0);
//
//
// }

//StoryCanvasView.prototype.show = function () {

  // this.mainBlob.path.visible = true;
  // this.mainBlob.bgImgGroup.visible = true;
  // this.mainBlob.bgRaster.visible = true;

  //TweenMax.set(this.options.el, {zIndex:30});

  //this.mainBlob.canAnimate = false;

  //if (this.TL.show) this.TL.show.play(0);

//}

//StoryCanvasView.prototype.onShown = function (){

  // this.mainBlob.generateSettingsPoints();
  //
  // if (this.TL.hide) this.TL.hide = null;
  //this.initTLHide();

  //this.trigger(EVENT.CANVAS_SHOWN);

  //this.mainBlob.canAnimate = true;

//}

// StoryCanvasView.prototype.initTLHide = function() {
//
//
//   this.TL.hide = new TimelineMax({paused:true, onComplete:this.onHidden.bind(this)});
//
//   var mainBlobTarget = {
//     opacity: 1
//   };
//
//   this.TL.hide.to(mainBlobTarget, 0, {
//     opacity: 0,
//     onUpdate: (function () {
//
//       this.mainBlob.path.opacity = mainBlobTarget.opacity;
//       this.mainBlob.bgImgGroup.opacity = mainBlobTarget.opacity;
//       this.mainBlob.bgRaster.opacity = mainBlobTarget.opacity;
//
//     }).bind(this),
//     onUpdateParams: ["{self}"]
//   }, 0);
//
//
// }

// StoryCanvasView.prototype.hide = function () {
//
//   //TweenMax.set(this.mainCanvasView.options.el, {zIndex:30});
//
//   //this.mainBlob.canAnimate = false;
//
//   if (this.TL.hide) this.TL.hide.play(0);
//
// }

// StoryCanvasView.prototype.onHidden = function (){
//
//   TweenMax.set(this.options.el, {zIndex:0});
//
//   this.mainBlob.generateSettingsPoints();
//
//   this.mainBlob.path.visible = false;
//   this.mainBlob.bgImgGroup.visible = false;
//
//   //this.trigger(EVENT.CANVAS_HIDDEN);
//
//   if (this.TL.show) this.TL.show = null;
//   this.initTLShow();
//
// }

// StoryCanvasView.prototype.animate = function (e) {
//
//   //this.mainBlob.animate(e);
//
// }

StoryCanvasView.prototype.onResize = function () {

  if (!this.mainBlob || !this.imgLoaded) return;

  this.mainBlob.bgRaster.bounds.width = CV.viewport.width + 20;
  this.mainBlob.bgRaster.bounds.height = CV.viewport.height + 20;

  this.mainBlob.rectangle.bounds.width = CV.viewport.width + 20;
  this.mainBlob.rectangle.bounds.height = CV.viewport.height + 20;

  this.mainBlob.rectangle.position.x = CV.viewport.width / 2;
  this.mainBlob.rectangle.position.y = CV.viewport.height / 2;

  this.mainBlob.bgRaster.position.x = CV.viewport.width / 2;
  this.mainBlob.bgRaster.position.y = CV.viewport.height / 2;

  this.mainBlob.path.position.x = CV.viewport.width / 2;
  this.mainBlob.path.position.y = CV.viewport.height / 2;
  
  if (CV.viewport.width > 1500) {
      var blobMaxSize = 700;
  } else if (CV.viewport.width < 1500 && CV.viewport.width > 922) {
      var blobMaxSize = 550;
  } else {
      var blobMaxSize = CV.viewport.width * 0.75;
  }

  var scale = this.mainBlob.getScale({w:blobMaxSize}, this.mainBlob.path);
  this.mainBlob.path.scale(scale);

  this.mainBlob.onResize();
}

module.exports = StoryCanvasView;
