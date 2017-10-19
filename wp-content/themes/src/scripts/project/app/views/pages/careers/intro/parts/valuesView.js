var PageView = require('abstract/pageView');
var VideoPlayer = require('app/components/videoPlayer/VideoPlayerView');
var ValuesCanvasView = require('canvas/careers/intro/valuesCanvasView');
var CV = require('app/config/currentValues');
var EVENT = require('app/events/events');
var Tools = require('app/tools/tools');
var Config = require('app/config/config');

var ValuesView = function (options, datas) {

  //--------0 Prototype

  this.canUpdate = true;

  this.$videoContainers = null;
  this.aVideoPlayers = [];

  this.$canvasElements = null;
  this.aCanvasElements = [];
  this.elementIndex = 0;
  this.canvasHeight = null;

  this.currentVideoIndex = 0;

  this.scrollOffset = null;

  this.descriptions = [];
  this.height = 0;
  this.canScroll = true;
  this.id = 'values';

  this.events = {
    "click .video-container": "onVideoClick",
    "mouseenter .mask": "onMouseEnterMask",
    "mouseleave .mask": "onMouseLeaveMask"
  };

  this.currentIndexMenu = 0;
  PageView.call(this, options, datas);

}
_.extend(ValuesView, PageView);
_.extend(ValuesView.prototype, PageView.prototype);

ValuesView.prototype.init = function () {

  // this.options.mainCanvasView.register(this.id, new ValuesCanvasView({
  //   mainCanvasView: this.options.mainCanvasView,
  //   mainView: this.options.mainView
  // }, null));
  //
  // this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.values, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  // this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.values, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));
  //
  // this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.values, EVENT.CANVAS_MASK_OVERLAY_CLICKED, $.proxy(_onCanvasMaskClicked, this));
  // this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.values, EVENT.CANVAS_MASK_OVERLAY_MOUSE_ENTER, $.proxy(_onCanvasMaskMouseEnter, this));
  // this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.values, EVENT.CANVAS_MASK_OVERLAY_MOUSE_LEAVE, $.proxy(_onCanvasMaskMouseLeave, this));

  PageView.prototype.init.call(this);

}

ValuesView.prototype.initDOM = function () {

  this.$videoContainers = this.$el.find('.video-container');
  this.$valuesContainers = this.$el.find('.value-video');
  this.$posters = this.$el.find('.poster img');
  this.$title = this.$el.find('h2');
  this.$blocksValuesEls = this.$el.find('.video-container');
  this.$menu = this.$el.find('.value-title-wrapper')[0];

  var description;
  _.each(this.$valuesContainers, (function (valueVideo) {

    var data = $(valueVideo).attr('data-description');
    description = data.replace(/<\/?p[^>]*>/g, "");
    this.descriptions.push(description);

  }).bind(this));

  this.hBlock = $(this.$el).height();
  this.wBlock = $(this.$el).width();

  // this.options.mainCanvasView.aCanvasAnimViews.values.canvasHeight = this.hBlock;
  // this.options.mainCanvasView.aCanvasAnimViews.values.canvasWidth = this.wBlock;
  // this.options.mainCanvasView.aCanvasAnimViews.values.$valuesContainers = this.$valuesContainers;
  // this.options.mainCanvasView.aCanvasAnimViews.values.descriptions = this.descriptions;

  this.indexVideo = 0;

  PageView.prototype.initDOM.call(this);
}

ValuesView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});

  $(this.$el).removeClass('hidden');

  PageView.prototype.setupDOM.call(this);

}

ValuesView.prototype.onDOMInit = function () {

  Tools.loadYTAPI((function () {
    this.initVideos();
  }).bind(this));

  PageView.prototype.onDOMInit.call(this);

}

ValuesView.prototype.onMouseEnterMask = function (e) {

  if (e.target.parentElement.classList.contains('no-video-player')) return;

  TweenMax.to(this.$posters[parseInt($(e.currentTarget).attr('data-id'))], 0.8, {scale: 1.05, ease: Expo.easeOut});

}

ValuesView.prototype.onMouseLeaveMask = function (e) {

  if (e.target.parentElement.classList.contains('no-video-player')) return;

  TweenMax.to(this.$posters[parseInt($(e.currentTarget).attr('data-id'))], 0.8, {scale: 1, ease: Expo.easeOut});

}

ValuesView.prototype.onVideoClick = function (e) {

  // console.log('onVideoClick', e.target );

  // event click is binded to the entire container of video so anything can trigger a play, MINUS the custom controls:
  // if the target is the play button do not 'play' twice this being the bubbled up event.
  if (e.target.parentElement.classList.contains('custom-video-controls-container') || e.target.parentElement.classList.contains('no-video-player')) return;

  this.playVideo(parseInt($(e.currentTarget).attr('data-id')));
}

// var _onCanvasMaskClicked = function (e) {
//
//   var id = e.index;
//
//   this.playVideo(id);
//
// }

ValuesView.prototype.playVideo = function (id) {
  //console.log(' ----- playVideo: do it', id);
  _.each(this.aVideoPlayers, (function (videoPlayer) {

    if (videoPlayer.id === id) {

      this.currentVideoIndex = videoPlayer.id;

      //console.log(' videoPlayer ', videoPlayer);

      if (!videoPlayer.isInit) {

        videoPlayer.player.init();
        videoPlayer.isInit = true;
        // listen ONCE:
        this.listenToOnce(videoPlayer.player, EVENT.READY, _playVideo.bind(this, videoPlayer.player));

        this.listenTo(videoPlayer.player, EVENT.ON_END, _resetPlayerToDefault.bind(this, videoPlayer.player));

      } else {
        // there is more to the video than just playing it:
        _playVideo(videoPlayer.player);
        //console.log("videoPlayer.player.play()");

      }
    } else {

      // if (videoPlayer.player.YTPlayer && videoPlayer.player.YTPlayer.isPlaying) {
        // If a player is playing when clicked on an other one. Pause it
        // _resetPlayerToDefault(videoPlayer.player);
        // console.log("videoPlayer.player.pause()");
      // }

      // regardless of playing or not, if it was paused and then someone plays on another...
      // reset all videos that do not match the id requested.
      _resetPlayerToDefault(videoPlayer.player);

    }

  }).bind(this));
}

ValuesView.prototype.playerEnded = function() {

}

ValuesView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, .5, {
    autoAlpha: 1,
    display: 'block'
  }, 0);

  this.TL.show.staggerFromTo(this.$videoContainers, .6, {opacity: 0, y: 100}, {
    opacity: 1,
    ease: Expo.easeOut,
    y: 0,
    scale: 1
  }, .05, 0.5);

  this.TL.show.fromTo(this.$title, .4, {opacity: 0, y: 50}, {
    opacity: 1,
    y: 0,
    ease: Expo.easeOut
    // delay: .4
  }, 0.4)

}

ValuesView.prototype.show = function () {

  setTimeout((function(){
    this.TL.show.play(0);
  }).bind(this), 0)


  // TweenMax.staggerFromTo(this.$videoContainers, .6, {opacity: 0, y: 100}, {
  //   opacity: 1,
  //   ease: Expo.easeOut,
  //   y: 0,
  //   scale: 1,
  //   delay: .5
  // }, .05);
  //
  // TweenMax.fromTo(this.$title, .4, {opacity: 0, y: 50}, {
  //   opacity: 1,
  //   y: 0,
  //   ease: Expo.easeOut,
  //   delay: .4,
  //   onComplete: (function () {
  //
  //     TweenMax.set(this.options.mainView.$canvas, {display: 'none'});
  //
  //   }).bind(this)
  // });

}

ValuesView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.hBlock = $(this.$el).height();

  TweenMax.set(this.options.mainView.$canvas, {display: 'none', zIndex:0});
  TweenMax.set(this.options.mainCanvasView.options.el, {zIndex:0});

  // _.delay((function () {
    // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
    // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});

    CV.mainView.setNormalScrollBehavior();
  // }).bind(this), 350);

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);

  PageView.prototype.onShown.call(this);

}

ValuesView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  // console.log('this.$videoContainers', this.$videoContainers);

  this.TL.hide.to(this.$videoContainers, .5, {
    opacity: 0,
    y:-200,
    ease: Power4.easeIn,
  }, 0)
  .to(this.$title, .5, {
    opacity: 0,
    y:-50,
    ease: Power4.easeIn,
  }, 0)
  .to(this.$el, .3, {
    autoAlpha: 0,
    display: 'none',
  }, "-=0.1");

}

ValuesView.prototype.hide = function () {


  TweenMax.set(this.options.mainView.$canvas, {display: 'block'});

  _.each(this.aVideoPlayers, (function (videoPlayer) {
    if (videoPlayer.player.YTPlayer && videoPlayer.player.YTPlayer.isPlaying) {

      //Stop all players
      videoPlayer.player.stop();

    }
  }).bind(this));

  this.TL.hide.play(0);

  // TweenMax.staggerFromTo(this.$videoContainers, .4, {opacity: 0, y: 0}, {
  //   opacity: 1,
  //   ease: Expo.easeOut,
  //   y: -100,
  //   scale: 1,
  //   delay: .5
  // }, .05);
  //
  // TweenMax.fromTo(this.$title, .4, {opacity: 0, y: 0}, {
  //   opacity: 1,
  //   y: -50,
  //   ease: Expo.easeOut,
  //   delay: .4,
  //   onComplete: (function () {
  //
  //   }).bind(this)
  // });

  //TweenMax.to(this.$videoContainers, .2, {opacity: 0, ease: Expo.easeOut});

}

ValuesView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);

  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
  CV.mainView.setNormalScrollBehavior(false);

  PageView.prototype.onHidden.call(this);

}

/*
 * video is loaded and we can play it:
 */
var _playVideo = function (player) {
  // console.log(' _playVideo ');
  if (player.YTPlayer.isPlaying) {
    // already playing just pause it, do not collapse UI or revert:
    // don't collapse the mask.
    player.pause({cssMask: false});
    return;
  } else {

    player.togglePlay({cssMask: true});

  }


  if (!CV.isMobile) {

    var controlsEl = $(player.el).find('.custom-video-controls-container');
    var descriptionEl = $(player.el).find('.description');
    controlsEl.removeClass('hidden');
    descriptionEl.addClass('hidden');
  }

}

/*
 * on pause or stop or end,
 * set the player state back to default. reset everything!
 */
var _resetPlayerToDefault = function(player) {
  // console.log(' RESET PLAYER TO DEFAULT ');

  player.pause({cssMask: true});

  if (!CV.isMobile) {

    var controlsEl = $(player.el).find('.custom-video-controls-container');
    var descriptionEl = $(player.el).find('.description');
    controlsEl.addClass('hidden');
    descriptionEl.removeClass('hidden');

  }
}

var _videoEnded = function (player) {
  // console.log("_videoEnded");

  // do we reset here:
  _resetPlayerToDefault(player);
}

ValuesView.prototype.onResize = function () {

  this.hBlock = $(this.$el).height();

  PageView.prototype.onResize.call(this);

}

ValuesView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

ValuesView.prototype.onUpdate = function () {

  if (!CV.isScrolling) return;

  this.percentage = (CV.scrollY + CV.viewport.height) / this.hBlock;

  if (CV.viewport.width > 920) {
    TweenMax.to(this.$valuesContainers[0], .2, {y: this.percentage * -100, ease: Linear.easeNone, delay: .2});
    TweenMax.to(this.$valuesContainers[1], .2, {y: this.percentage * -150, ease: Linear.easeNone, delay: .2});
    TweenMax.to(this.$valuesContainers[2], .2, {y: this.percentage * -100, ease: Linear.easeNone, delay: .2});
    TweenMax.to(this.$valuesContainers[3], .2, {y: this.percentage * -150, ease: Linear.easeNone, delay: .2});
    TweenMax.to(this.$valuesContainers[4], .2, {y: this.percentage * -100, ease: Linear.easeNone, delay: .2});
    TweenMax.to(this.$valuesContainers[5], .2, {y: this.percentage * -150, ease: Linear.easeNone, delay: .2});
    TweenMax.to(this.$valuesContainers[6], .2, {y: this.percentage * -100, ease: Linear.easeNone, delay: .2});
  }
  else {
    TweenMax.set(this.$valuesContainers, {y: 0});
  }

  PageView.prototype.onUpdate.call(this);
}

ValuesView.prototype.initVideos = function () {

  var videoPlayer;
  _.each(this.$videoContainers, (function (videoContainer, i) {

    videoPlayer = new VideoPlayer({
      el: videoContainer,
      hasCustomControls: true,
      // callback: this.playerIsLoaded,
      onVideoEnd: this.playerEnded,
      togglePoster: true,
    }, null);
    this.aVideoPlayers.push({id: i, player: videoPlayer, isInit: false});

  }).bind(this));

}

module.exports = ValuesView;
