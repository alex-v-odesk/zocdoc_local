var BaseView = require('./../../abstract/baseView');
var EVENT = require('./../../events/events');

var CustomVideoControlsView = function (options, datas) {

  this.events = {
    "click .timeline": "onTimelineClick",
    "click .btn-play, .btn-pause ": "togglePlay",
    "click .btn-fullscreen": "toggleFullScreen"
  }

  this.$timeline = null;
  this.$currentTime = null;
  this.$playBtn = null;
  this.$pauseBtn = null;
  this.$elapsed = null;
  this.$duration = null;

  this.isPlaying = false;

  BaseView.call(this, options, datas);

}

_.extend(CustomVideoControlsView, BaseView);
_.extend(CustomVideoControlsView.prototype, BaseView.prototype);

CustomVideoControlsView.prototype.initDOM = function () {

  this.$timeline = this.$el.find(".timeline");
  this.$currentTime = this.$timeline.find(".current-time");
  this.$playBtn = this.$el.find(".btn-play");
  this.$pauseBtn = this.$el.find(".btn-pause");
  this.$elapsed = this.$el.find(".elapsed-time");
  this.$duration = this.$el.find(".total-time");

}

CustomVideoControlsView.prototype.initPlay = function () {

  if (this.isPlaying) return;
  this.isPlaying = true;

}

CustomVideoControlsView.prototype.togglePlay = function () {

  this.trigger(EVENT.ON_TOGGLE_PLAY);

}

CustomVideoControlsView.prototype.toggleFullScreen = function () {

  this.trigger(EVENT.ON_FULLSCREEN);

}

CustomVideoControlsView.prototype.togglePlayBtn = function () {

  $(this.$pauseBtn).toggleClass('active');
  $(this.$playBtn).toggleClass('active');

}

CustomVideoControlsView.prototype.resetPlayBtn = function () {

  $(this.$pauseBtn).removeClass('active');
  $(this.$playBtn).addClass('active');

}

CustomVideoControlsView.prototype.onTimelineClick = function (e) {

  this.trigger(EVENT.ON_SEEK, {pct: (e.pageX - this.$el.offset().left) / parseInt(this.$timeline.width(), 10)});

}

CustomVideoControlsView.prototype.setCurrentPctPlayed = function (pct_) {

  TweenLite.set(this.$currentTime, {x: (pct_ * 100).toFixed(2) + "%", force3D: true});

}

CustomVideoControlsView.prototype.setDuration = function (duration_) {

  if(!this.$elapsed[0]) return;
  this.$elapsed[0].textContent = "00:00";
  this.$duration[0].textContent =  this.toHHMMSS(duration_).toString();

}

CustomVideoControlsView.prototype.updateDuration = function (currentTime_) {

  if(!this.$elapsed[0]) return;
  this.$elapsed[0].textContent = this.toHHMMSS(currentTime_).toString();

}

CustomVideoControlsView.prototype.toHHMMSS = function (time) {

  var sec_num = parseInt(time, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ':' + seconds;
  //return hours+':'+minutes+':'+seconds;
}

CustomVideoControlsView.prototype.dispose = function () {

  this.$timeline = null;
  this.$currentTime = null;
  this.$playBtn = null;

  AbstractDOMView.prototype.dispose.call(this);
}

module.exports = CustomVideoControlsView;
