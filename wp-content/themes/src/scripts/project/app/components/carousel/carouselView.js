var BaseView = require('./../../abstract/baseView');
var CV = require('app/config/currentValues');
var CarouselIndicatorView = require('./carouselIndicatorView');
var EVENT = require('./../../events/events');

var CarouselView = function (options, datas) {

  this.$carouselItems = null;

  this.currentIndex = 0;

  this.$indicatorEl = null;
  this.aCarouselIndicators = [];

  this.timer = null;

  BaseView.call(this, options, datas);

}

_.extend(CarouselView, BaseView);
_.extend(CarouselView.prototype, BaseView.prototype);

CarouselView.prototype.initDOM = function () {

  this.$carouselItems = this.$el.find('.carousel-item');
  this.$carouselItemsContainer = this.$el.find('.carousel-items-container');
  this.$indicatorEl = this.$el.find('.indicator');

  BaseView.prototype.initDOM.call(this);

}

CarouselView.prototype.onDOMInit = function () {

  _.each(this.$indicatorEl, (function (indicatorEl) {

    var indicatorView = new CarouselIndicatorView({el: indicatorEl}, null);
    indicatorView.init();
    this.aCarouselIndicators.push(indicatorView);
    this.listenTo(indicatorView, EVENT.CAROUSEL_INDICATOR_CLICKED, $.proxy(this.indicatorClicked, this));

  }).bind(this));

  // Always set first indicator on init
  this.aCarouselIndicators[0].toggleActive();

  //this.startTimer();

  BaseView.prototype.onDOMInit.call(this);

}

CarouselView.prototype.ticker = function () {

  if (this.timer) this.stopTimer();

  this.goToItem(this.currentIndex + 1);

}

CarouselView.prototype.startTimer = function () {

  if (this.timer) this.stopTimer();

  this.timer = setTimeout(this.ticker.bind(this), 5000);

}

CarouselView.prototype.stopTimer = function () {

  clearTimeout(this.timer);
  this.timer = null;

}

CarouselView.prototype.resetTimer = function () {

  if (this.timer != null) {
      this.stopTimer();
  }

  this.startTimer();

}

CarouselView.prototype.indicatorClicked = function (e) {

  this.goToItem(e.indicator.index);

}

CarouselView.prototype.goToItem = function (index) {

  if (index > this.$carouselItems.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = this.$carouselItems.length - 1;
  }

  this.updateCarouselItems(index);
  this.updateIndicators(index);

  this.currentIndex = index;

  this.resetTimer();
}

CarouselView.prototype.goToPrevItem = function () {
  this.goToItem(this.currentIndex - 1);
}

CarouselView.prototype.goToNextItem = function () {
  this.goToItem(this.currentIndex + 1);
}

CarouselView.prototype.updateCarouselItems = function (index) {

  if (this.currentIndex === index) return;

  $(this.$carouselItems[index]).addClass('active');
  $(this.$carouselItems[this.currentIndex]).removeClass('active');
}

CarouselView.prototype.updateIndicators = function (index) {

  if (this.currentIndex === index) return;

  // Disable the (old) indicator with the currentIndex and set the new indicator with the new index
  this.aCarouselIndicators[index].toggleActive();
  this.aCarouselIndicators[this.currentIndex].toggleActive();

}

CarouselView.prototype.onResize = function () {


  BaseView.prototype.onResize.call(this);

}

module.exports = CarouselView;
