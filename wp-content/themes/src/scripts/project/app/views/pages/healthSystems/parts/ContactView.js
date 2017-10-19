var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
require('ScrollTo');
var ContactCanvasView = require('canvas/healthSystems/contactCanvasView');

var contactView = function (options, datas) {

  this.hasBeenPlayed = false;
  this.id = 'contact';
  this.canScroll = true;

  PageView.call(this, options, datas);

}

_.extend(contactView, PageView);
_.extend(contactView.prototype, PageView.prototype);

contactView.prototype.init = function () {

  PageView.prototype.init.call(this);
}

contactView.prototype.initDOM = function () {

  this.options.mainCanvasView.register(this.id, new ContactCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.contact, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.contact, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));


  PageView.prototype.initDOM.call(this);

}

contactView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {display: 'none'});

  PageView.prototype.setupDOM.call(this);

}

contactView.prototype.onDOMInit = function () {

  this.$title = this.$el.find('h2');
  this.$subTitle = this.$el.find('h3');
  this.$button = this.$el.find('button');
  this.$images = this.$el.find('.hidden');
  this.$footerContainer = this.$el.find('.footer-container')[0];

  $(this.$footerContainer).append(this.options.mainView.$footer);

  this.$els = [
    this.$title,
    this.$subTitle,
    this.$button
  ];

  PageView.prototype.onDOMInit.call(this);

}

contactView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);

  PageView.prototype.onShown.call(this);

}

contactView.prototype.onHidden = function () {

  this.trigger(EVENT.BLOCK_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

contactView.prototype.show = function () {

  this.options.mainCanvasView.aCanvasAnimViews.contact.initAnimInUp();

  TweenMax.set(this.options.mainView.$canvas, {
        zIndex: 20,
        onComplete: (function () {

          this.options.mainCanvasView.showCanvas(this.id);

        }).bind(this)
      }
  );

  TweenMax.set(this.options.mainView.$canvas, {zIndex: 2, delay: .5});

  TweenMax.staggerFromTo(this.$els, .5, {autoAlpha: 0, y: 40}, {
        autoAlpha: 1,
        y: 0,
        ease: Expo.easeOut,
        delay: .5
      },
      .1,
      (function () {

        // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
        // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
        CV.mainView.setNormalScrollBehavior();
        this.onShown();

      }).bind(this)
  );

  TweenMax.fromTo(this.$images, .5, {autoAlpha: 0, y: 40}, {
        autoAlpha: 1,
        y: 0,
        ease: Expo.easeOut,
        delay: .55
      }
  );


  TweenMax.set(this.$el, {display: 'flex', autoAlpha: 1, delay: .1});
  this.canAnimate = true;

  TweenMax.set(this.$el, {scrollTo: 0});

}

contactView.prototype.hide = function () {

  TweenMax.set(this.$el, {
    display: 'none',
    ease: Expo.easeInOut,
    delay: .4,
    onComplete: (function () {

      // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
      // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
      CV.mainView.setNormalScrollBehavior(false);
      this.onHidden();

    }).bind(this)
  });

  this.canAnimate = false;

  TweenMax.to(this.$images, .35, {
        autoAlpha: 0,
        y: 40,
        ease: Expo.easeOut
      }
  );

  TweenMax.to(this.$els, .3, {
        autoAlpha: 0,
        y: 40,
        ease: Expo.easeOut
      }
  );

  // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
  // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
  CV.mainView.setNormalScrollBehavior(false);

  this.options.mainCanvasView.hideCanvas(this.id)

}

var _onCanvasShown = function () {

  TweenMax.set(this.options.mainView.$canvas, {zIndex: -1});
  this.trigger(EVENT.CANVAS_SHOWN);

}

var _onCanvasHidden = function () {

  TweenMax.set(this.options.mainView.$canvas, {zIndex: -1});
  this.trigger(EVENT.CANVAS_HIDDEN);

}

contactView.prototype.onResize = function () {

  PageView.prototype.onResize.call(this);

}

contactView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = contactView;
