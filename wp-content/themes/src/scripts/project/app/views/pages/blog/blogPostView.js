var PageView = require('app/abstract/pageView');
var CV = require('app/config/currentValues');

var BlogPostView = function (options, datas) {

  this.menuIsVisible = true;

  this.events = {
    'click .button-comments': 'showHideComments'
  }

  PageView.call(this, options, datas);

}

_.extend(BlogPostView, PageView);
_.extend(BlogPostView.prototype, PageView.prototype);

BlogPostView.prototype.initDOM = function () {

  this.$searchContent = this.$el.find('.search-form');
  this.$btnClose = this.$el.find('.button-comments .close');
  this.$btnOpen = this.$el.find('.button-comments .open');
  this.$comments = this.$el.find('.comments');
  this.$menu = this.$el.find('.content-menu');
  this.$titleComment = this.$el.find('.comments h3#comments');
  this.$containersComments = this.$el.find('.comments .commentlist');
  this.$comment = this.$el.find('.comments .commentlist li div');
  this.$respondTitle = this.$el.find('h3#reply-title');
  this.$formTitle = this.$el.find('form .comment-notes');
  this.$formComment = this.$el.find('form .comment-form-comment');
  this.$formAuthor = this.$el.find('form .comment-form-author');
  this.$formEmail = this.$el.find('form .comment-form-email');
  this.$formUrl = this.$el.find('form .comment-form-url');
  this.$containerTopImg = this.$el.find('.full-bleed-container');
  this.$header = $('.page-header');

  this.hContainerTopImg = $(this.$containerTopImg).height();
  this.commentsHeight = $(this.$comments).height();

  this.$els = [
    this.$titleComment,
    this.$containersComments,
    this.$comment,
    this.$respondTitle,
    this.$formTitle,
    this.$formComment,
    this.$formAuthor,
    this.$formEmail,
    this.$formUrl
  ];

  this.durationAnimation = 0;
  this.commentsAreVisible = true;

  _.each(this.$els, (function (el) {
    this.durationAnimation = this.durationAnimation + el.length;
  }).bind(this));

  this.oneElAnim = .3;
  this.delayBehindEl = .05;
  this.durationAnimation = this.oneElAnim * this.durationAnimation + this.delayBehindEl * this.durationAnimation;

  CV.mainView.setNormalScrollBehavior();

  TweenMax.set(this.$comments, {height: 0});

  PageView.prototype.initDOM.call(this);

}

BlogPostView.prototype.onDOMInit = function () {

  this.showHideComments();

  PageView.prototype.onDOMInit.call(this);

}

BlogPostView.prototype.showHideComments = function () {

  if (this.isAnimating) return;

  this.isAnimating = true;

  if (!this.commentsAreVisible) {
    TweenMax.fromTo(this.$btnOpen, .35, {
      opacity: 0,
      top: 35
    }, {
      opacity: 1,
      top: 20,
      delay: .05,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$btnClose, .35, {
      top: -15,
      opacity: 0,
      ease: Expo.easeOut
    });

    TweenMax.staggerFromTo(this.$els, .5, {opacity: 0}, {
      opacity: 1,
      ease: Expo.easeOut
    }, .1);

    TweenMax.to(this.$comments, 1, {
      height: this.commentsHeight,
      ease: Expo.easeOut,
      onComplete: (function () {
        this.commentsAreVisible = true;
        this.isAnimating = false;
      }).bind(this)
    });
  }
  else {
    TweenMax.staggerTo(this.$els, .5, {opacity: 0, ease: Expo.easeOut}, .1);

    TweenMax.fromTo(this.$btnClose, .35, {
      opacity: 0,
      top: 15
    }, {
      opacity: 1,
      top: 0,
      delay: .05,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$btnOpen, .35, {
      top: 5,
      opacity: 0,
      ease: Expo.easeOut
    });

    TweenMax.to(this.$comments, 1, {
      height: 0,
      ease: Expo.easeOut,
      onComplete: (function () {
        this.commentsAreVisible = false;
        this.isAnimating = false;
      }).bind(this)
    });
  }

  PageView.prototype.onShown.call(this);

}

BlogPostView.prototype.onShown = function () {

  PageView.prototype.onShown.call(this);
}

BlogPostView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);
}

BlogPostView.prototype.onUpdate = function () {

  if (CV.scrollY > this.hContainerTopImg / 2 && this.menuIsVisible) {

    this.menuIsVisible = false;
    TweenMax.to(this.options.mainAppView.headerView.$menu, .3, {top: -70, ease: Expo.easeOut});
    TweenMax.fromTo(this.options.mainAppView.headerView.$articleTitleContent, .3, {top: 100, delay: .05}, {
      top: 0,
      ease: Expo.easeOut
    });

  }
  else if (!this.menuIsVisible && CV.scrollY < this.hContainerTopImg / 2) {

    this.menuIsVisible = true;
    TweenMax.to(this.options.mainAppView.headerView.$menu, .3, {top: 0, delay: .05, ease: Expo.easeOut});
    TweenMax.to(this.options.mainAppView.headerView.$articleTitleContent, .3, {top: 100, ease: Expo.easeOut});

  }

}

BlogPostView.prototype.managerSearchField = function () {

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

BlogPostView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);
}

module.exports = BlogPostView;
