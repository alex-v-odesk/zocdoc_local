var PageView = require('app/abstract/pageView');
var CV = require('app/config/currentValues');

var BlogTopicView = function (options, datas) {

  this.events = {
    'click .explore-more' : 'onExploreMoreClicked'
  }

  PageView.call(this, options, datas);

}

_.extend(BlogTopicView, PageView);
_.extend(BlogTopicView.prototype, PageView.prototype);

BlogTopicView.prototype.initDOM = function () {

  this.$searchContent = this.$el.find('.search-form');
  this.$btnExploreMore = this.$el.find('.explore-more');
  this.$posts = this.$el.find('.post');
  this.$header = $('.page-header');

  CV.mainView.setNormalScrollBehavior();

  PageView.prototype.initDOM.call(this);

}

BlogTopicView.prototype.onDOMInit = function () {


  PageView.prototype.onDOMInit.call(this);

}

BlogTopicView.prototype.managerSearchField = function () {

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


BlogTopicView.prototype.onExploreMoreClicked = function () {

  var count = 0;

  var hiddenItems = 0;

  _.each(this.$posts, (function (post) {

    if (!$(post).hasClass('hidden') || count > 5) return;

    $(post).removeClass('hidden');
    count ++ ;

    hiddenItems = this.$el.find('.grid .hidden').length;

    if (!hiddenItems) {
        $(this.$btnExploreMore).addClass('hidden');
    }

  }).bind(this));

}

BlogTopicView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);
}

BlogTopicView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);
}

module.exports = BlogTopicView;
