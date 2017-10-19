var BaseView = require('app/abstract/baseView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');

var CarouselBlogView = function (options, datas) {

  this.$carouselItems = null;
  this.currentIndex = 0;
  this.previousIndex = 0;

  this.timer = null;

  BaseView.call(this, options, datas);

}

_.extend(CarouselBlogView, BaseView);
_.extend(CarouselBlogView.prototype, BaseView.prototype);

CarouselBlogView.prototype.initDOM = function () {

  this.$fullImages = this.$el.find('.full-bleed-image');
  this.$contents = this.$el.find('.content-container');

  this.$titles = this.$el.find('h1.text-content');
  this.$paths = $('.path');
  this.$subtitles = this.$el.find('.info');
  this.$reads = this.$el.find('a.text-content');
  this.$contentsText = [];
  this.$startTimer = this.startTimer();

  _.each(this.$fullImages, (function (el, i) {

    this.$contentsText.push(
        [
          this.$titles[i],
          this.$subtitles[i],
          this.$reads[i]
        ]);


    // Workaround for loading the first carousel image
    // Find the first image
    if (i === 0) {
      // Create dummy image loader
      var img = new Image();

      // Get it's bg attribute
      var src = $(el).css('background');

      // Pull out the URL
      var url = src.split('"')[1];

      // Listen for the load event
      $(img).one('load', function () {

        // Reset the background CSS and add the active class
        $(el).css('background', src);
        $(el).addClass('active');

        // Start the timer once we know we're loaded
        this.$startTimer;
      })

      // Load the Dummy Image
      img.src = url;


    }


  }).bind(this));


  var currentPath = this.currentIndex;
  this.pathTimer = TweenMax.to(this.$paths[currentPath], 7.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone,
    onComplete: (function () {
      TweenMax.to(this.$paths[currentPath], .3, {
        strokeDashoffset: 360,
        ease: Linear.easeNone
      });
    }).bind(this)
  });
  // this.startTimer();

  BaseView.prototype.initDOM.call(this);

}

CarouselBlogView.prototype.onDOMInit = function () {

  BaseView.prototype.onDOMInit.call(this);

}

CarouselBlogView.prototype.goToItem = function (id) {

  if (parseInt(id) === this.currentIndex) return;
  this.stopTimer();
  this.pathTimer.kill();
  this.pathTimer = null;
  TweenMax.to(this.$paths[this.currentIndex], .3, {
    strokeDashoffset: 360,
    ease: Linear.easeNone
  });

  this.slidesManager(parseInt(id));

}

CarouselBlogView.prototype.startTimer = function () {

  this.timer = setTimeout(this.slidesManager.bind(this), 7500);

}

CarouselBlogView.prototype.stopTimer = function () {

  clearTimeout(this.timer);
  this.timer = null;

}

CarouselBlogView.prototype.onResize = function () {

  BaseView.prototype.onResize.call(this);

}

CarouselBlogView.prototype.slidesManager = function (id) {

  this.previousIndex = this.currentIndex;

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  TweenMax.staggerTo(this.$contentsText[this.currentIndex], .3, {
    opacity: 0,
    x: 40,
    ease: Expo.easeOut
  }, .05, (function () {
    $(this.$contents[this.previousIndex]).removeClass('active');
    $(this.$contents[this.currentIndex]).addClass('active');
  }).bind(this));

  if (msie > 0 || /Edge\/\d./i.test(navigator.userAgent) || CV.isMobile || CV.isTablet) {

    TweenMax.set(this.$fullImages[this.currentIndex], {
      opacity: 0,
      ease: Expo.easeOut
    });

  }
  else {

    TweenMax.to(this.$fullImages[this.currentIndex], .7, {
      opacity: 0,
      //scale: 1.2,
      ease: Expo.easeOut
    });

  }

  if (id != void 0)this.currentIndex = id;
  else this.currentIndex = this.currentIndex + 1 < this.$fullImages.length ? this.currentIndex + 1 : 0;

  var currentPath = this.currentIndex;
  this.pathTimer = TweenMax.to(this.$paths[currentPath], 7.5, {
    strokeDashoffset: 0,
    ease: Linear.easeNone,
    onComplete: (function () {
      TweenMax.to(this.$paths[currentPath], .3, {
        strokeDashoffset: 360,
        ease: Linear.easeNone
      });
      this.slidesManager();
    }).bind(this)
  });

  TweenMax.staggerFromTo(this.$contentsText[this.currentIndex], .8, {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        ease: Expo.easeOut,
        delay: .6
      }, .05);

  if (msie > 0 || /Edge\/\d./i.test(navigator.userAgent) || CV.isMobile || CV.isTablet) {

    TweenMax.fromTo(this.$fullImages[this.currentIndex], 0, {
          opacity: 0
        },
        {
          opacity: 1
        }
    );

  }
  else {

    TweenMax.fromTo(this.$fullImages[this.currentIndex], .7, {
          opacity: 0,
          //scale: 1.2
        },
        {
          opacity: 1,
          //scale: 1,
          ease: Expo.easeOut
        }
    );
  }
}

module.exports = CarouselBlogView;
