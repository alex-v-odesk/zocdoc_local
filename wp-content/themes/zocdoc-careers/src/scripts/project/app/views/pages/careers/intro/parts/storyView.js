var PageView = require('abstract/pageView');
var VideoPlayer = require('app/components/videoPlayer/VideoPlayerView');
var StoryCanvasView = require('canvas/careers/intro/storyCanvasView');
var MissionCanvasView = require('canvas/careers/intro/missionCanvasView');
var BezierEasing = require('BezierEasing');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var Tools = require('app/tools/tools');

var StoryView = function (options, datas) {

  //--------0 Prototype
  this.canUpdate = true;

  this.$videoContainer = null;
  this.videoPlayer = null;
  this.$overlay = null;
  this.videoIsPlaying = false;
  this.storyCanvasView = null;

  this.missionId = 'mission';
  this.storyId = 'story';

  this.imgURL = null;
  this.isOverlayActive = false;

  this.videoLoaded = false;
  this.playerIsLoaded = this.playerIsLoaded.bind(this);

  PageView.call(this, options, datas);

}

_.extend(StoryView, PageView);
_.extend(StoryView.prototype, PageView.prototype);

StoryView.prototype.init = function () {

  this.options.mainCanvasView.register(this.missionId, new MissionCanvasView({mainCanvasView: this.options.mainCanvasView}, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.mission, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.mission, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  PageView.prototype.init.call(this);

}

StoryView.prototype.initDOM = function () {

  this.$videoContainer = this.$el.find('.video-container');
  this.$overlay = this.$el.find('.story-video-overlay');
  this.$videoCanvas = this.$el.find('#overlay-canvas');
  this.$title = this.$el.find('.story-content h2');
  this.$description = this.$el.find('.story-content p');
  this.$button = this.$el.find('.mask-wrapper');
  this.$backButton = this.$el.find('.btn-back');

  this.$button[0].addEventListener('click', $.proxy(this.showOverlay, this), false);
  this.$backButton[0].addEventListener('click', $.proxy(this.hideOverlay, this), false);


  this.imgURL = this.$el[0].dataset.src;

  PageView.prototype.initDOM.call(this);

}

StoryView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});
  TweenMax.set(this.$title, {autoAlpha: 0, y: 25});
  TweenMax.set(this.$description, {autoAlpha: 0, y: 25});
  TweenMax.set(this.$button, {autoAlpha: 0, y: 25});

  TweenLite.set(this.$overlay, {autoAlpha: 0, ease: Cubic.easeOut});

  $(this.$el).removeClass('hidden');

  PageView.prototype.setupDOM.call(this);

}

StoryView.prototype.onDOMInit = function () {

  // this.options.mainCanvasView.register(this.storyId, new StoryCanvasView({
  //   imgURL: this.imgURL,
  //   mainCanvasView: this.options.mainCanvasView
  // }, null));

  this.storyCanvasView = new StoryCanvasView({el: this.$videoCanvas[0], imgURL: this.imgURL}, null);
  this.storyCanvasView.init();

  PageView.prototype.onDOMInit.call(this);

}

StoryView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  if (CV.breakpoint === 'default') {
    var opacityDuration = 0
  } else {
    var opacityDuration = 0.5;
  }

  this.TL.show.to(this.$el, opacityDuration, {autoAlpha: 1, display: 'flex', ease: Power4.easeOut}, 0.1)
      .to(this.$title, 0.5, {autoAlpha: 1, y: 0, ease: Power4.easeOut}, 0.8)
      .to(this.$description, 0.5, {autoAlpha: 1, y: 0, ease: Power4.easeOut}, 0.85)
      .to(this.$button, 0.5, {autoAlpha: 1, y: 0, ease:Power4.easeOut }, 0.9);
}


StoryView.prototype.show = function () {

  this.TL.show.play(0);

  if (CV.breakpoint === 'default') this.options.mainCanvasView.showCanvas(this.missionId);

}

StoryView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);

  if (CV.breakpoint === 'sml') this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

var _onCanvasShown = function () {

  this.trigger(EVENT.CANVAS_SHOWN);

}

StoryView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  if (CV.breakpoint === 'default') {
    var opacityDelay = '+=1';
    var opacityDuration = 0.1;
  } else {
    var opacityDelay = 0.5;
    var opacityDuration = 0.5;
  }

  this.TL.hide.to(this.$title, 0.5, {autoAlpha: 0, y: -20, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0.2)
      .to(this.$description, 0.5, {autoAlpha: 0, y: -20, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0.3)
      .to(this.$button, 0.5, {autoAlpha: 0, y: -20, ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, 0.4)
      .to(this.$el, opacityDuration, {autoAlpha: 0, display: 'none', ease: new Ease(BezierEasing(0.25, 1, 0.50, 1.25))}, opacityDelay);

}

StoryView.prototype.hide = function () {

  if (CV.breakpoint === 'default') {
    this.options.mainCanvasView.hideCanvas(this.missionId);
  }else{
    this.TL.hide.play(0);
  }
}

StoryView.prototype.onHidden = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});
  TweenMax.set(this.$title, {autoAlpha: 0, y: -20});
  TweenMax.set(this.$description, {autoAlpha: 0, y: -20});
  TweenMax.set(this.$button, {autoAlpha: 0, y: -20});

  this.trigger(EVENT.BLOCK_HIDDEN);

  if (CV.breakpoint === 'sml') this.trigger(EVENT.CANVAS_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

var _onCanvasHidden = function () {

  this.onHidden();
  this.trigger(EVENT.CANVAS_HIDDEN);
}

StoryView.prototype.onUpdate = function () {

  PageView.prototype.onUpdate.call(this);

}

StoryView.prototype.showOverlay = function () {

  TweenMax.set([this.options.mainView.$canvas, this.$videoCanvas], {pointerEvents: "none"});
  TweenMax.set(this.$el[0], {zIndex: "initial"});

  if (!this.videoLoaded) {

    Tools.loadYTAPI((function () {
      this.initVideo();
    }).bind(this));

  }else {

    this.trigger(EVENT.STORY_OVERLAY_SHOWN);
    this.isOverlayActive = true;

    TweenLite.to(this.$overlay, 0.3, {
      autoAlpha: 1,
      delay: 0.1,
      onComplete: (function () {

        this.videoPlayer.togglePlay();
        this.videoIsPlaying = true;

      }).bind(this)
    });

    //this.storyCanvasView.show();
    //this.options.mainCanvasView.showCanvas(this.storyId);
  }

}

StoryView.prototype.initVideo = function () {

  this.videoIsPlaying = true;

  this.videoPlayer = new VideoPlayer({
    el: this.$videoContainer,
    hasCustomControls: true,
    callback: this.playerIsLoaded
  }, null);
  this.videoPlayer.init();


}

StoryView.prototype.playerIsLoaded = function () {

  this.videoLoaded = true;

  this.trigger(EVENT.STORY_OVERLAY_SHOWN);
  this.isOverlayActive = true;

  //this.options.mainCanvasView.showCanvas(this.storyId);
  //this.storyCanvasView.show();

  TweenLite.to(this.$overlay, 0.3, {
    autoAlpha: 1,
    delay: 0,
    onComplete: (function () {

      this.videoPlayer.togglePlay();
      this.videoIsPlaying = true;

    }).bind(this)
  });

}

StoryView.prototype.hideOverlay = function () {

  TweenMax.set([this.options.mainView.$canvas, this.$videoCanvas], {pointerEvents: "auto"});

  if (this.videoPlayer)this.videoPlayer.stop();
  this.videoIsPlaying = false;

  //this.options.mainCanvasView.hideCanvas(this.storyId);
  //this.storyCanvasView.hide();

  TweenLite.to(this.$overlay, 0.15, {
    autoAlpha: 0,
    onComplete: ((function () {

      this.isOverlayActive = false;
      TweenMax.set(this.$el[0], {zIndex: 9});

      this.trigger(EVENT.STORY_OVERLAY_HIDDEN);

      //this.options.mainCanvasView.showCanvas(this.missionId);

    }).bind(this))
  });

}

StoryView.prototype.onResize = function () {

  if (this.storyCanvasView) this.storyCanvasView.onResize();

  PageView.prototype.onResize.call(this);

}

StoryView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = StoryView;
