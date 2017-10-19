var BaseView = require('./../../abstract/baseView');
var EVENT = require('./../../events/events');
var CV = require('./../../config/currentValues');
var CustomVideoControlsView = require('./customVideoControlsView');

var YTPlayer = function (options, datas) {

  this.config = {};

  this.player = null;
  this.isPlaying = false;
  this.isInit = false;
  this.isInitializing = false;

  this.currentTime = 0;
  this.quality = 100;
  this.state = 0;

  this.iframe = null;

  this.hasCustomControls = null;
  this.customControlsView = null;

  BaseView.call(this, options, datas);

}

_.extend(YTPlayer, BaseView);
_.extend(YTPlayer.prototype, BaseView.prototype);

YTPlayer.prototype.init = function (config_) {

  this.config = config_;

  if (!this.config.youtubeID) {
    console.log("YTPlayer:: Please provide a youtubeID");
    return null;
  }

  this.quality = this.config.quality || 100;
  this.customPlayer = this.config.customPlayer || true;
  this.hasCustomControls = this.config.hasCustomControls || false;

  if (this.config.hasCustomControls) _createCustomControls.call(this);

  _bindEvents.call(this);

  _initPlayer.call(this);
}

var _bindEvents = function () {

}

var _unbindEvents = function () {

}

var _initPlayer = function () {

  if (this.isInitializing) return;

  this.isInitializing = true;

  if (this.player != null) {
    console.log("YTPlayer:: Player is already initialised!");
    return null;
  }

  var controls = (this.customPlayer) ? 0 : 1;

  var ytDefaults = {
    'autoplay': 0,
    'controls': controls,
    'showinfo': 0,
    'modestbranding': 1,
    'iv_load_policy': 3
  };

  this.player = new YT.Player(this.config.id, {
    height: this.config.height || "100%",
    width: this.config.width || "100%",
    videoId: this.config.youtubeID,
    playerVars: this.config.playerVars || ytDefaults,
    events: {
      'onReady': $.proxy(_onReady, this),
      'onStateChange': $.proxy(_onPlayerStateChange, this),
      'onPlaybackQualityChange': $.proxy(_onPlaybackQualityChange, this),
      'onError': $.proxy(_onError, this)
    }
  });

}

var _onReady = function () {

  this.player.setPlaybackQuality(this.quality);

  this.isInit = true;
  this.isInitializing = false;

  this.duration = this.player.getDuration();

  if (this.config.hasCustomControls) this.customControlsView.setDuration(this.duration);

  this.trigger(EVENT.READY);

}

var _onPlayerStateChange = function (e) {

  this.state = e.data;
  this.trigger(EVENT.STATE_CHANGE, e);

  /*
   -1 (unstarted)
   0 (ended)
   1 (playing)
   2 (paused)
   3 (buffering)
   5 (video cued)..
   */

  this.noRAF = this.state == 2 || this.state == 0 ? true : false;
  this.isPlaying = this.state == 1 ? true : false;
  this.isBuffering = this.state == 3 ? true : false;

  // console.log(' _onPlayerStateChange ', this.state );

  if (this.state == 0) {

    //_showPlayButton.call(this);
    this.trigger(EVENT.ON_END, {mediaID: this.config.youtubeID});
    _showPoster.call(this);
    this.stop();

  }
  else if (this.state <= 2) {
    if (this.state == 1) {

      this.duration = this.player.getDuration();
      this.onUpdate();
      this.trigger(EVENT.ON_PLAY, {mediaID: this.config.youtubeID});
      //_hidePlayButton.call(this);
      _hidePoster.call(this);

    }
    else {

      this.trigger(EVENT.ON_PAUSE, {mediaID: this.config.youtubeID});
      //_showPlayButton.call(this);
      _showPoster.call(this);

    }
  }
  else {

    //buffering
    _onBuffering.call(this);

  }


}

var _onPlaybackQualityChange = function (e) {
  this.quality = e.data;
  this.trigger(EVENT.QUALITY_CHANGE, e);
}

var _onError = function (e) {
  switch (e.data) {
    case 2   :
      console.log("Youtube Error :: The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.");
      break;
    case 5   :
      console.log("Youtube Error :: The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.");
      break;
    case 100 :
      console.log("Youtube Error :: The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.");
      break;
    case 101 :
      console.log("Youtube Error :: The owner of the requested video does not allow it to be played in embedded players.");
      break;
    case 150 :
      console.log("Youtube Error :: This error is the same as 101. It's just a 101 error in disguise!");
      break;
  }
}

var _onBuffering = function () {

  console.log("onBuffering");
  //console.log('YTPlayer:: player is buffering');

}

var _createCustomControls = function () {

  // If we don't want a custom one by default

  if (!this.config.hasCustomControls) return;

  this.customControlsView = new CustomVideoControlsView({el: this.config.$controlsContainer}, null);
  this.customControlsView.init();

  _bindCustomControlsEvents.call(this);

}

var _bindCustomControlsEvents = function () {

  //this.config.$poster[0].addEventListener("click", this.togglePlay.bind(this), false);

  this.listenTo(this.customControlsView, EVENT.ON_FULLSCREEN, this.toggleFullScreen.bind(this));
  this.listenTo(this.customControlsView, EVENT.ON_TOGGLE_PLAY, this.togglePlay.bind(this));
  this.listenTo(this.customControlsView, EVENT.ON_SEEK, this.onSeek.bind(this));
}

var _unbindCustomControlsEvents = function () {

  //this.config.$poster[0].removeEventListener("click", this.togglePlay.bind(this), false);

  this.stopListening(this.customControlsView, EVENT.ON_FULLSCREEN, this.toggleFullScreen.bind(this));
  this.stopListening(this.customControlsView, EVENT.ON_TOGGLE_PLAY, this.togglePlay.bind(this));
  this.stopListening(this.customControlsView, EVENT.ON_SEEK, this.onSeek.bind(this));
}

YTPlayer.prototype.toggleFullScreen = function () {

  // The player object stores the iframe in the a param
  this.iframe = this.player.a;

  var requestFullScreen = this.iframe.requestFullScreen || this.iframe.mozRequestFullScreen || this.iframe.webkitRequestFullScreen || this.iframe.msRequestFullscreen;
  if (requestFullScreen) requestFullScreen.bind(this.iframe)();

}

YTPlayer.prototype.togglePlay = function () {
  console.log(' toggle play...');
  if (CV.isMobile || CV.isTablet) {
    _hidePoster.call(this);
    return;
  }

  if (!this.isPlaying) this.play();
  else this.pause();

}

YTPlayer.prototype.onMouseEnter = function () {

  if (this.mouseIsHover) return;
  document.body.style.cursor = "pointer";
  this.mouseIsHover = true;

}

YTPlayer.prototype.onMouseLeave = function () {

  if (!this.mouseIsHover) return;
  document.body.style.cursor = "default";
  if (this.posterIsVisibile && !this.textIsVisible) {
    this.textIsVisible = true;
    TweenMax.staggerTo(this.config.$elsText, .3, {autoAlpha: 1, ease: Cubic.easeOut}, .1);
  }
  this.mouseIsHover = false;

}

YTPlayer.prototype.play = function () {

  if (!this.player || !this.isInit || this.isBuffering || this.isPlaying || CV.isMobile || CV.isTablet) return;

  // console.log("play");

  this.player.playVideo();
  _showPlayButton.call(this);

  if (this.config.hasCustomControls)this.customControlsView.isPlaying = true;

}

YTPlayer.prototype.pause = function () {

  if (!this.player || !this.isInit || this.isBuffering || !this.isPlaying) return;

  //console.log("pause");

  this.player.pauseVideo();
  _hidePlayButton.call(this);

  if (this.config.hasCustomControls) this.customControlsView.isPlaying = false;

}

YTPlayer.prototype.stop = function () {

  if (!this.player || !this.isInit) return;

  this.player.stopVideo();
  _hidePlayButton.call(this);

  if (this.config.hasCustomControls) this.customControlsView.isPlaying = false;

  _showPoster.call(this);
}

var _showPoster = function () {
  // console.log(' --- show poster this.config.togglePoster', this.config.togglePoster );
  if (!this.config.$poster) return;
  if (this.config.togglePoster) TweenLite.to(this.config.$poster, .3, {autoAlpha: 1, ease: Cubic.easeOut});

  if (!this.config.$elsContent) return;
  if (!CV.isMobile && !CV.isTablet) TweenMax.staggerTo(this.config.$button, .3, {autoAlpha: 1, ease: Cubic.easeOut}, .1);
  else TweenMax.staggerTo(this.config.$elsContent, .3, {autoAlpha: 1, display: 'block', ease: Cubic.easeOut}, .1);

  this.posterIsVisibile = true;

}

var _hidePoster = function () {
  // console.log(' --- hide poster ');
  if (!this.config.$poster) return;
  TweenLite.to(this.config.$poster, .3, {autoAlpha: 0, ease: Cubic.easeOut});

  if (!this.config.$elsContent) return;
  TweenMax.staggerTo(this.config.$elsContent, .3, {autoAlpha: 0, ease: Cubic.easeOut}, .1, (function () {
    if (CV.isMobile || CV.isTablet)TweenMax.set(this.config.$elsContent, {display: "none"});
  }).bind(this));

  this.posterIsVisibile = false;
  this.textIsVisible = false;

}

var _showPlayButton = function () {
  // console.log('show play button');
  // SHOW PLAY BUTTON
  if (this.hasCustomControls) this.customControlsView.togglePlayBtn();

}

var _hidePlayButton = function () {
  // console.log('hide play button');
  // HIDE PLAY BUTTON
  if (this.hasCustomControls) this.customControlsView.resetPlayBtn();

}

YTPlayer.prototype.currentTime = function (time) {

  if (!this.player || !this.isInit) return;

  if (time) this.player.seekTo(time);
  else return this.player.getCurrentTime();

}

YTPlayer.prototype.bufferedPercent = function () {

  return !this.player || !this.isInit ? null : this.player.getVideoLoadedFraction();

}

YTPlayer.prototype.onSeek = function (e) {

  if (!this.player || !this.isInit) return;

  var currentTime = this.duration * e.pct;
  this.player.seekTo(currentTime);
  this.play();

}

YTPlayer.prototype.onUpdate = function () {

  if (!this.player || !this.isInit) return;

  _updateCustomControls.call(this);

  if (!this.noRAF) window.requestAnimationFrame(this.onUpdate.bind(this));

}

var _updateCustomControls = function () {

  if (!this.hasCustomControls || !this.duration) return;

  this.currentTime = this.player.getCurrentTime();

  this.customControlsView.setCurrentPctPlayed(this.currentTime / this.duration);
  this.customControlsView.updateDuration(this.currentTime);

}

YTPlayer.prototype.dispose = function () {

  this.noRAF = true; //stop RAF
  this.player = null;
  this.isInit = false;

  if (!this.hasCustomControls) {
    _unbindCustomControlsEvents.call(this);
    this.customControlsView.dispose();
  }

  this.customControlsView = null;

  _unbindEvents.call(this);

  this.config.$poster = null;
  this.config.$YTPlayerContainer = null;
  this.config.$controlsContainer = null;

  this.config = null;
}

module.exports = YTPlayer;
