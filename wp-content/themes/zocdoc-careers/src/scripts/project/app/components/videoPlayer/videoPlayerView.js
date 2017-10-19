var BaseView = require('abstract/baseView');
var EVENT = require('./../../events/events');
var CV = require('./../../config/currentValues');
var YTPlayer = require('./YTPlayer');

var VideoPlayerView = function (options, datas) {

  this.YTPlayer = null;
  this.togglePoster = options.togglePoster ? options.togglePoster : false;
  this.$poster = null;
  this.$overlay = null;
  this.$YTPlayerContainer = null;
  this.$controlsContainer = null;
  this.callback = options.callback ? options.callback : null;

  this.hasCustomControls = options.hasCustomControls ? options.hasCustomControls : false;
  this.autoPlay = options.autoPlay ? options.autoPlay : false;

  BaseView.call(this, options, datas);

}

_.extend(VideoPlayerView, BaseView);
_.extend(VideoPlayerView.prototype, BaseView.prototype);

VideoPlayerView.prototype.initDOM = function () {

  this.$mask = this.$el.find('.mask');
  this.$poster = this.$el.find('.poster');
  this.$overlay = this.$el.find('.overlay-content');
  this.$title = this.$el.find('.overlay-content h3');
  this.$subtitle = this.$el.find('.overlay-content p');
  this.$button = this.$el.find('.overlay-content button');
  this.$YTPlayerContainer = this.$el.find('.yt-player');

  this.$elsText = [
    this.$title,
    this.$subtitle
  ];

  this.$elsContent = [
    this.$title,
    this.$subtitle,
    this.$button
  ];

  if (this.hasCustomControls) this.$controlsContainer = this.$el.find('.custom-video-controls-container');

  BaseView.prototype.initDOM.call(this);
}

VideoPlayerView.prototype.onDOMInit = function () {

  _createPlayer.call(this);

  BaseView.prototype.onDOMInit.call(this);
}

VideoPlayerView.prototype.bindEvents = function () {

  this.listenToOnce(this.YTPlayer, EVENT.READY, _onYTPlayerReady.bind(this));
  this.listenTo(this.YTPlayer, EVENT.ON_END, _onEventEnd.bind(this));
  BaseView.prototype.bindEvents.call(this);
}

VideoPlayerView.prototype.show = function () {

  BaseView.prototype.show.call(this);
}

VideoPlayerView.prototype.hide = function () {

  BaseView.prototype.hide.call(this);
}

VideoPlayerView.prototype.togglePlay = function (obj) {
  var toggleCssMask = (obj && obj.cssMask) ? obj.cssMask : false;

  if (!this.YTPlayer) return;

  if (toggleCssMask) this.toggleMask();

  this.YTPlayer.togglePlay();

}

VideoPlayerView.prototype.pause = function (obj) {
  var toggleCssMask = (obj && obj.cssMask) ? obj.cssMask : false;

  if (!this.YTPlayer) return;

  // console.log(' ---- pause --- toggleCssMask', toggleCssMask);
  
  if (toggleCssMask) this.toggleMask({forceShow: true});
  this.YTPlayer.pause();

}

VideoPlayerView.prototype.play = function (obj) {
  // console.log(' PLAY() ');
  var toggleCssMask = (obj && obj.cssMask) ? obj.cssMask : false;

  if (!this.YTPlayer) return;
  if (toggleCssMask) this.toggleMask();
  this.YTPlayer.play();

}

VideoPlayerView.prototype.toggleMask = function (obj) {
  // console.log(' obj ', obj );
  var forceShow = (obj && obj.forceShow) ? obj.forceShow : false;
  // console.log(' force show ? ', forceShow);
  if (this.$mask) {
    
    var maskClass = 'hide';

    if (this.YTPlayer.isPlaying || forceShow == true) {

      this.$mask.removeClass(maskClass);

      if (CV.isMobile || CV.isTablet) {
        TweenMax.set(this.$mask, {zIndex: 5});
        TweenMax.set(this.$overlay, {zIndex: 5});
      }

    } else {

      this.$mask.addClass(maskClass);

      if (CV.isMobile || CV.isTablet) {
        TweenMax.set(this.$mask, {zIndex: 0});
        TweenMax.set(this.$overlay, {zIndex: 0});
      }

    }
  }
}

VideoPlayerView.prototype.stop = function () {

  if (!this.YTPlayer) return;
  this.YTPlayer.stop();

}

var _createPlayer = function () {

  this.YTPlayer = new YTPlayer();

  this.YTPlayer.init({
    id: this.$YTPlayerContainer.attr('id'),
    youtubeID: this.$YTPlayerContainer.attr('data-youtubeid'),
    noInit: true,
    $YTPlayerContainer: this.$YTPlayerContainer,
    hasCustomControls: this.hasCustomControls,
    $controlsContainer: this.$controlsContainer,
    $poster: this.$poster,
    $overlay: this.$overlay,
    $elsText: this.$elsText,
    $button: this.$button,
    $elsContent: this.$elsContent,
    $mask: this.$mask,
    togglePoster: this.togglePoster,
  });

}

var _onYTPlayerReady = function () {
  if (this.callback) this.callback();
  // once callback is called do we null it?
  this.callback = null;

  if (this.autoPlay) this.YTPlayer.togglePlay();

  this.trigger(EVENT.READY);

}

var _onEventEnd = function () {
  // console.log('video is over.');
  // this.YTPlayer.isPlaying = true;
  // this.toggleMask(true);
  // force show the mask on end.
  this.toggleMask({forceShow: true});

  this.trigger(EVENT.ON_END);
}

VideoPlayerView.prototype.dispose = function () {

  // Dispose YT Player
  this.YTPlayer.dispose();
  this.YTPlayer = null;
  this.stopListening();
  BaseView.prototype.dispose.call(this);
}

module.exports = VideoPlayerView;
