var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
var VideoPlayer = require('app/components/videoPlayer/VideoPlayerView');
var Tools = require('app/tools/tools');
var SeriesCanvasView = require('canvas/healthSystems/seriesCanvasView');
require('ScrollTo');

var seriesView = function (options, datas) {

  // for calculating height on mobile: H / W.
  this.aspectRatioOfMask = 539 / 729;

  this.hasBeenPlayed = false;
  this.id = 'series';

  this.currentVideo = 0;
  this.currentYTID = null;
  this.videoPlayer = null;
  this.videoIsinit = false;
  this.isMainVideo = true;
  this.videoPlaying = false;

  this.isAnimating = {
    player : false,
    switchMovie : false,
    blocks : false,
  };

  this.events = {
    'click .main-video .mask, iframe': 'managePlayer',
    'click .cta': 'manageBlock',
    'click .serie-video': 'switchMovie',
    'mouseenter .main-video .mask': 'onMouseEnterMask',
    'mouseenter .serie-video': 'onMouseEnterMaskSerie',
    'mouseleave .main-video .mask': 'onMouseLeaveMask',
    'mouseleave .serie-video': 'onMouseLeaveMaskSerie',
    // 'mouseenter .cta': 'onMouseEnterCTA',
    // 'mouseleave .cta': 'onMouseLeaveCTA'
  };

  this.canScroll = CV.isMobile ? true : false;

  PageView.call(this, options, datas);

}

_.extend(seriesView, PageView);
_.extend(seriesView.prototype, PageView.prototype);

seriesView.prototype.initDOM = function () {

  this.$canvas = this.options.mainView.$canvas;
  this.$postersMain = this.$el.find('.main-video .poster');
  this.$postersContent = this.$el.find('.main-video .poster .content');

  this.$episodes = this.$el.find('.serie-video');
  this.$cover = this.$el.find('.serie-video .poster');
  this.$seriesContainer = this.$el.find('.series-container');

  this.$videoContainer = this.$el.find('.video-container');
  this.$mask = this.$el.find('.main-video .mask');

  this.$ctaLine = this.$el.find('.cta .line');
  this.$cta = this.$el.find('.cta p');

  this.$mainVideo = this.$el.find('.main-video');
  this.$mainCovers = this.$el.find('.main-video .poster');
  // this.$titleOpen = this.$el.find('.open');
  // this.$titleClose = this.$el.find('.close');

  this.$titles = this.$el.find('h5');
  this.$subTitles = this.$el.find('h6');

  this.$mainTitles = this.$el.find('.main-video .poster h4');
  this.$mainSubtitles = this.$el.find('.main-video .poster h5');
  this.$mainImgs = this.$el.find('.main-video .poster p');

  //this.hBlock = CV.viewport.height * .7 + CV.viewport.height * .35;
  //if (CV.isMobile || CV.viewport.width < 920)TweenMax.set(this.$el, {height: this.hBlock});

  this.$mainVideos = [];

  _.each(this.$mainCovers, (function (video, i) {

    this.$mainVideos.push([
      this.$mainTitles[i],
      this.$mainSubtitles[i],
      this.$mainImgs[i]
    ]);

  }).bind(this));

  this.paper = this.options.mainCanvasView.paper;

  PageView.prototype.initDOM.call(this);

}

seriesView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {autoAlpha: 0, display: 'none'});
  TweenMax.set(this.$mainCovers, {display: 'none'});
  TweenMax.set(this.$cover, {opacity: 0});

  PageView.prototype.setupDOM.call(this);

}

seriesView.prototype.onDOMInit = function () {


  this.ytPlayerEl = this.$videoContainer.find('.yt-player');
  this.currentYTID = this.ytPlayerEl.attr('data-youtubeid');

  Tools.loadYTAPI((function () {
    this.initVideo();
  }).bind(this));

  this.dataVideos = this.$canvas.getAttribute('data-src-serie');
  this.ctaContent = this.$canvas.getAttribute('data-src-serie-cta');
  this.dataVideos = this.dataVideos.split(';');

  _.each(this.dataVideos, (function (data, i) {

    data = data.split('$');
    this.dataVideos[i] = data;

  }).bind(this));

  this.dataVideos.splice(this.dataVideos.length - 1, 1);


  PageView.prototype.onDOMInit.call(this);

}


seriesView.prototype.initVideo = function () {

  this.videoPlayer = new VideoPlayer({el: this.$videoContainer[0], hasCustomControls: false}, null);
  this.videoPlayer.init();
  this.listenTo(this.videoPlayer, EVENT.READY, _playerIsLoaded.bind(this));
  this.listenTo(this.videoPlayer, EVENT.ON_END, this._videoHasEnded.bind(this));


}

var _playerIsLoaded = function () {
  this.videoIsinit = true;
}

seriesView.prototype._videoHasEnded = function() {
  this.isAnimating.player = true;
  
  TweenMax.staggerFromTo(this.$mainVideos[this.currentVideo], .5, {x: -50}, {
          x: 0,
          opacity: 1,
          ease: Expo.easeOut
        },
        .05,
        (function () {

          this.videoPlaying = false;
          this.isAnimating.player = false;

        }).bind(this)
    );

    TweenMax.to(this.$mainCovers[this.currentVideo], .5, {
          scale: 1,
          display: 'flex',
          opacity: 1,
          ease: Expo.easeOut
        }
    );

    // TweenMax.to(this.$mask, .4, {scale: 1, ease: Expo.easeOut});
    this.$mainVideo.removeClass('playing');
}

seriesView.prototype.initTLShow = function () {
}

seriesView.prototype.initTLHide = function () {
}

seriesView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);
  this.trigger(EVENT.CANVAS_SHOWN);
  TweenMax.set(this.$el, {scrollTo: 0});

  PageView.prototype.onShown.call(this);

}

seriesView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);
  this.trigger(EVENT.CANVAS_HIDDEN);
  PageView.prototype.onHidden.call(this);

}

seriesView.prototype.show = function () {

  if (CV.scrollYDirection == 'DOWN') {

    TweenMax.set(this.$el, {scrollTo: 0});

    TweenMax.fromTo(this.$el, .6, {y: 100}, {
      y: 0,
      autoAlpha: 1,
      display: 'flex',
      ease: Expo.easeOut,
      onUpdate: (function () {

        if (CV.isMobile && CV.viewport.height < 920) {
          // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
          // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
          CV.mainView.setNormalScrollBehavior();
        }

      }).bind(this),
      onComplete: this.onShown.bind(this)
    });

    TweenMax.fromTo(this.$mainCovers[this.currentVideo], .6, {scale: 1.3, opacity: 0}, {
          scale: 1,
          display: 'flex',
          opacity: 1,
          ease: Expo.easeOut,
          delay: .2
        }
    );

  }
  else {

    TweenMax.fromTo(this.$el, .6, {autoAlpha: 0, y: 100}, {
      y: 0,
      autoAlpha: 1,
      display: 'flex',
      ease: Expo.easeOut,
      onUpdate: (function () {

        if (CV.isMobile && CV.viewport.height < 920) {
          // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
          // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
          CV.mainView.setNormalScrollBehavior();
        }

      }).bind(this)
    });
    TweenMax.fromTo(this.$mainCovers[this.currentVideo], .6, {scale: 1.3, opacity: 0}, {
          scale: 1,
          display: 'flex',
          opacity: 1,
          ease: Expo.easeOut,
          delay: .05,
          onComplete: this.onShown.bind(this)
        }
    );

  }

  if (!this.isMainVideo) {

    TweenMax.staggerFromTo(this.$cover, .5, {scale: 1.3, opacity: 0}, {
          scale: 1,
          opacity: 1,
          ease: Expo.easeOut,
          delay: .1
        },
        .07
    );

  }

}

seriesView.prototype.hide = function () {

  if (this.videoPlaying) this.managePlayer();

  if (CV.scrollYDirection == "DOWN") {
    TweenMax.to(this.$el, .6, {autoAlpha: 0, display: 'none', ease: Expo.easeOut});

    TweenMax.to(this.$mainCovers[this.currentVideo], .6, {
          scale: 1.3,
          opacity: 0,
          ease: Expo.easeOut,
          onComplete: (function () {

            this.onHidden();

          }).bind(this)
        }
    );

    TweenMax.staggerTo(this.$cover, .5, {
          scale: 1.3,
          opacity: 0,
          ease: Expo.easeOut
        },
        .05
    );
  }
  else {

    TweenMax.set(this.$el, {
      autoAlpha: 0,
      display: 'none',
      ease: Expo.easeOut,
      delay: .3
    });

    setTimeout((function () {
      this.onHidden();
    }).bind(this), 150);

  }

  if (!this.isMainVideo) this.manageBlock();

}

seriesView.prototype.switchMovie = function (e) {

  var i = parseFloat($(e.currentTarget).attr('data-id'));

  if (this.isMainVideo) this.managePlayer();

  if (this.isAnimating.switchMovie || this.currentVideo == i || this.isMainVideo) return;

  this.isAnimating.switchMovie = true;

  TweenMax.staggerTo(this.$mainVideos[this.currentVideo], .6, {
        x: 50,
        opacity: 0,
        ease: Expo.easeOut
      },
      .05
  );

  TweenMax.to(this.$mainCovers[this.currentVideo], .8, {
        scale: 1.3,
        display: 'none',
        opacity: 0,
        ease: Expo.easeOut
      }
  );

  TweenMax.fromTo(this.$mainCovers[i], .6, {scale: 1.3, opacity: 0}, {
        scale: 1,
        display: 'flex',
        opacity: 1,
        ease: Expo.easeOut
      }
  );

  TweenMax.staggerFromTo(this.$mainVideos[i], .6, {x: -50, opacity: 0}, {
        x: 0,
        opacity: 1,
        delay: .3,
        ease: Expo.easeOut,
        onComplete: (function () {

          this.currentVideo = i;
          this.isAnimating.switchMovie = false;

        }).bind(this)
      },
      .05
  );


  // new video go back to full screen, unexpanded subcontent state
  this.manageBlock();

}

seriesView.prototype.managePlayer = function (e) {
  console.log(' manage player', this.isAnimating);
  if (this.isAnimating.player || !this.videoIsinit) return;

  this.newYTID = this.dataVideos[this.currentVideo][3];

  this.isAnimating.player = true;

  if (this.videoPlaying) {
    console.log(' video is playing pause it!' );
    // Pause video
    this.videoPlayer.togglePlay();

    TweenMax.staggerFromTo(this.$mainVideos[this.currentVideo], .5, {x: -50}, {
          x: 0,
          opacity: 1,
          ease: Expo.easeOut
        },
        .05,
        (function () {

          this.videoPlaying = false;
          this.isAnimating.player = false;

        }).bind(this)
    );

    TweenMax.to(this.$mainCovers[this.currentVideo], .5, {
          scale: 1,
          display: 'flex',
          opacity: 1,
          ease: Expo.easeOut
        }
    );

    // TweenMax.to(this.$mask, .4, {scale: 1, ease: Expo.easeOut});
    this.$mainVideo.removeClass('playing');

  } else {

    // Play video
    if (this.currentYTID === this.newYTID) {

      this.videoPlayer.togglePlay();

    } else {

      this.videoPlayer.YTPlayer.player.loadVideoById(this.newYTID);
      // add an on end event to a video:
      this.currentYTID = this.newYTID;

    }

    // TweenMax.to(this.$mask, .5, {scale: 2, ease: Expo.easeOut});
    this.$mainVideo.addClass('playing');

    TweenMax.to(this.$mainCovers[this.currentVideo], .5, {
          scale: 1.3,
          display: 'none',
          opacity: 0,
          ease: Expo.easeOut
        }
    );

    TweenMax.staggerTo(this.$mainVideos[this.currentVideo], .5, {
          x: 50,
          opacity: 0,
          ease: Expo.easeOut
        },
        .05,
        (function () {

          this.videoPlaying = true;
          this.isAnimating.player = false;

        }).bind(this)
    );

    if (e && e.type == 'click') {
      // on click to play and this is expanded/ not just main video:
      //  close all the other videos and go back to default.
      if (!this.isMainVideo) this.manageBlock();
    }

  }


}

seriesView.prototype.onMouseEnterMask = function (e) {

  if (CV.isMobile) return
  TweenMax.to(this.$postersMain[this.currentVideo], .5, {scale: 1.05, ease: Expo.easeOut});
  // TweenMax.to(this.$postersContent[this.currentVideo], .5, {scale: .9, ease: Expo.easeOut});

}

seriesView.prototype.onMouseLeaveMask = function (e) {

  if (CV.isMobile) return
  TweenMax.to(this.$postersMain[this.currentVideo], .5, {scale: 1, ease: Expo.easeOut});
  // TweenMax.to(this.$postersContent[this.currentVideo], .5, {scale: 1, ease: Expo.easeOut});

}

seriesView.prototype.onMouseEnterMaskSerie = function (e) {

  if (CV.isMobile) return
  TweenMax.to(this.$cover[parseInt($(e.currentTarget).attr('data-id'))], .4, {scale: 1.05, ease: Expo.easeOut});

}

seriesView.prototype.onMouseLeaveMaskSerie = function (e) {

  if (CV.isMobile) return
  TweenMax.to(this.$cover[parseInt($(e.currentTarget).attr('data-id'))], .4, {scale: 1, ease: Expo.easeOut});

}

// seriesView.prototype.onMouseEnterCTA = function (e) {
//   if (CV.isMobile) return
//   TweenMax.to(this.$cta, .4, {y: -9, ease: Expo.easeOut});
//   TweenMax.to(this.$ctaLine, .4, {width: 100, ease: Expo.easeOut});

// }

// seriesView.prototype.onMouseLeaveCTA = function (e) {
//   if (CV.isMobile) return
//   TweenMax.to(this.$cta, .4, {y: 0, ease: Expo.easeOut});
//   TweenMax.to(this.$ctaLine, .4, {width: 0, ease: Expo.easeOut});
// }

/*
 * On click of cta expand open/close the sub container of videos.
 */

seriesView.prototype.manageBlock = function (e) {
  console.log(' manage block ---- ');

  if (this.isAnimating.blocks) return;
  this.isAnimating.blocks = true;


  // is main video only on screen:
  if (this.isMainVideo) {

    TweenMax.set(this.$seriesContainer, {autoAlpha: 1, display: 'block'});

    TweenMax.staggerFromTo(this.$cover, .5, {scale: 1.3, opacity: 0}, {
          scale: 1,
          opacity: 1,
          ease: Expo.easeOut,
          delay: .1
        },
        .07,
        (function () {

          this.isMainVideo = false;
          this.isAnimating.blocks = false;

        }).bind(this)
    );

    TweenMax.staggerFromTo(this.$titles, .5, {opacity: 0}, {
          opacity: 1,
          ease: Expo.easeOut,
          delay: .05
        },
        .05
    );

    TweenMax.staggerFromTo(this.$subTitles, .5, {opacity: 0}, {
          opacity: 1,
          ease: Expo.easeOut,
          delay: .1
        },
        .05
    );

    // TweenMax.to(this.$titleOpen, .4, {y: -20, autoAlpha: 0, ease: Expo.easeOut, delay: .2});
    // TweenMax.to(this.$titleClose, .4, {y: -20, autoAlpha: 1, display: 'block', ease: Expo.easeOut, delay: .25});

    // manage the sizing of the font by class:
    this.$mainVideo.addClass('expanded');

    // stop the video from playing:
    console.log(' expanding.. pause video!!!', this.videoPlaying);
    if (this.videoPlaying) this.managePlayer();

  } else {
    // is expanded view with thumbs below.
    TweenMax.staggerTo(this.$cover, .35, {
          scale: 1.3,
          opacity: 0,
          ease: Expo.easeOut
        },
        .05,
        (function () {

          this.isMainVideo = true;
          this.isAnimating.blocks = false;

        }).bind(this)
    );

    TweenMax.staggerTo(this.$titles, .35, {
          opacity: 0,
          ease: Expo.easeOut
        },
        .05
    );

    TweenMax.staggerTo(this.$subTitles, .35, {
          opacity: 0,
          ease: Expo.easeOut
        },
        .05,
        (function () {
          TweenMax.set(this.$seriesContainer, {autoAlpha: 0, display: 'none'});
        }).bind(this)
    );


    // manage the sizing of the font by class:
    this.$mainVideo.removeClass('expanded');


    // TweenMax.to(this.$titleOpen, .4, {y: 0, autoAlpha: 1, ease: Expo.easeOut, delay: .2});
    // TweenMax.to(this.$titleClose, .4, {y: 0, autoAlpha: 0, display: 'none', ease: Expo.easeOut, delay: .25});
  }

  // regardless resize: and reset the main video position:
  // we are resizing in regards to the state that WILL change, but hasn't:
  this.onResize(!this.isMainVideo);
}

seriesView.prototype.onResize = function (mainVideoState) {

  PageView.prototype.onResize.call(this);

  var state = !mainVideoState ? mainVideoState : this.isMainVideo;
  var w = Math.round(CV.viewport.width);
  if (!state) {
    if(CV.isMobile) w *= .8;
    else w *= 0.5;
  }



  var h = this.aspectRatioOfMask * w;



  if (CV.breakpoint != 'sml') {
    h = '';
    w = '';
  }

  this.$mainVideo.css({
    "height": h,
    "width": w,
  });

}

seriesView.prototype.onUpdate = function () {

}

seriesView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = seriesView;
