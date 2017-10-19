var PageView = require('app/abstract/pageView');
var CarouselBlogView = require('app/components/carousel/carouselBlogView');
var BlogHeaderCanvasView = require('canvas/blog/BlogHeaderCanvasView');
var CV = require('app/config/currentValues');

var BlogView = function (options, datas) {

  console.log("BlogView");

  this.$canvasElement = null;
  this.canvasMask = null;

  this.events = {
    'click .carouse-item': function (e) {
      this.carousel.goToItem($(e.currentTarget).attr('data-id'));
    },
    'click .explore-more': 'onExploreMoreClicked'
  }

  PageView.call(this, options, datas);

}

_.extend(BlogView, PageView);
_.extend(BlogView.prototype, PageView.prototype);

BlogView.prototype.initDOM = function () {

  this.$carouselEl = this.$el.find('.full-bleed-container');
  this.$canvasElement = this.$el.find('.canvas');
  this.$searchContent = this.$el.find('.search-form');

  this.$btnExploreMore = this.$el.find('.explore-more');
  this.$posts = this.$el.find('.post');
  this.$header = $('.page-header');

  CV.mainView.setNormalScrollBehavior();

  PageView.prototype.initDOM.call(this);

}

BlogView.prototype.onDOMInit = function () {

  this.carousel = new CarouselBlogView({el: this.$carouselEl, hasTimer: true}, null);
  this.carousel.init();

  this.canvasMask = new BlogHeaderCanvasView({el: this.$canvasElement[0]}, null);
  this.canvasMask.init();

  PageView.prototype.onDOMInit.call(this);

}

BlogView.prototype.onExploreMoreClicked = function () {

  var count = 0;

  var hiddenItems = 0;

  _.each(this.$posts, (function (post) {

    if (!$(post).hasClass('hidden') || count > 5) return;

    $(post).removeClass('hidden');
    count++;

    hiddenItems = this.$el.find('.grid .hidden').length;

    if (!hiddenItems) {
      $(this.$btnExploreMore).addClass('hidden');
    }

  }).bind(this));

}

BlogView.prototype.managerSearchField = function () {

  if (!this.searchIsVisible) {

    $(this.$header).addClass('border');
    TweenMax.to(this.$searchContent, .9, {y: '0%', ease: Expo.easeOut});

  }
  else {

    $(this.$header).removeClass('border');
    TweenMax.to(this.$searchContent, 1, {y: '-100%', ease: Expo.easeOut});

  }

  this.searchIsVisible = !this.searchIsVisible ? true : false;

}

BlogView.prototype.onShown = function () {

  PageView.prototype.onShown.call(this);
}

BlogView.prototype.onResize = function () {

  if (this.canvasMask) {
    this.canvasMask.onResize();
  }

  PageView.prototype.onResize.call(this);
}

BlogView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);
}

module.exports = BlogView;
