var BaseView = require('abstract/pageView');
var VideoPlayer = require('app/components/videoPlayer/VideoPlayerView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
var Tools = require('app/tools/tools');
// var DetailVideoCanvasView = require('canvas/careers/detail/detailVideoCanvasView');
var DetailHeaderCanvasView = require('canvas/careers/detail/detailHeaderCanvasView');

var JobDetailView = function (options, datas) {

  //console.log(options, datas);

  //--------0 Prototype
  this.canUpdate = true;

  this.$ghFormContainer = null;
  this.jobId = null;

  this.$videoContainer = null;
  this.videoPlayer = null;

  this.idVideoBlob = 'video';
  this.idHeaderBlob = 'header';

  this.$headerCanvasEl = null;
  this.headerCanvas = null;

  this.events = {
    'click .btn-apply': 'scrollToForm',
    'click .video-container': 'toggleVideo'
  };

  BaseView.call(this, options, datas);

}

_.extend(JobDetailView, BaseView);
_.extend(JobDetailView.prototype, BaseView.prototype);

JobDetailView.prototype.initDOM = function () {

  this.$ghFormContainer = this.$el.find('#grnhse_app');
  this.jobId = this.$ghFormContainer[0].dataset.id;
  this.$videoContainer = this.$el.find('.video-container');
  this.$jobDetail = this.$el.find('.job-detail');
  this.$text = this.$el.find('.content-text p');
  this.$headerCanvasEl = this.$el.find('.header-canvas');
  this.blobColor = $(this.$headerCanvasEl).attr('data-color');

  $(this.$text).removeAttr('style');

  CV.mainView.setNormalScrollBehavior();

  BaseView.prototype.initDOM.call(this);
}

JobDetailView.prototype.onDOMInit = function () {

  if (this.$videoContainer[0]) {

    Tools.loadYTAPI((function () {
      this.videoPlayer = new VideoPlayer({el: this.$videoContainer, hasCustomControls: false, autoPlay: false}, null);
      this.videoPlayer.init();
    }).bind(this));

  }

  this.headerCanvas = new DetailHeaderCanvasView({el: this.$headerCanvasEl[0], blobColor: this.blobColor}, null)
  this.headerCanvas.init();

  if (this.jobId != null) {

    Grnhse.Iframe.load(this.jobId);

  }
  else {
    console.log("No job ID!");
  }

}

JobDetailView.prototype.toggleVideo = function () {

  console.log('toggleVideo!!!!');

  if (this.videoPlayer) this.videoPlayer.togglePlay({cssMask: true});

}


JobDetailView.prototype.scrollToForm = function () {

  var scrollOffset = CV.breakpoint === 'default' ? 80 : 50;

  TweenMax.to(window, .8, {
    scrollTo: $(this.$ghFormContainer)[0].offsetTop - scrollOffset,
    ease: Expo.easeInOut
  });

}

JobDetailView.prototype.onUpdate = function () {

  var $iframeHead = $("#grnhse_iframe");

  if ($iframeHead && document.getElementById('grnhse_iframe')) {
    var iframe = document.getElementById('grnhse_iframe');

    var style = document.createElement('style');
    style.textContent =
        '.some-class-name {' +
        '  some-style-name: some-value;' +
        '}'
    ;
    iframe.contentDocument.head.appendChild(style);
  }

  BaseView.prototype.onUpdate.call(this);

}

JobDetailView.prototype.onResize = function () {

  if (this.headerCanvas) this.headerCanvas.onResize();

  BaseView.prototype.onResize.call(this);

}

JobDetailView.prototype.dispose = function () {

  BaseView.prototype.dispose.call(this);

}

module.exports = JobDetailView;
