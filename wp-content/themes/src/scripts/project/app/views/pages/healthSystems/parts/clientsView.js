var PageView = require('abstract/pageView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
var ClientsCanvasView = require('canvas/healthSystems/clientsCanvasView');

var clientsView = function (options, datas) {

  this.id = 'clients';
  this.hasBeenPlayed = false;
  this.canScroll = CV.isMobile ? true : false;

  PageView.call(this, options, datas);

}

_.extend(clientsView, PageView);
_.extend(clientsView.prototype, PageView.prototype);

clientsView.prototype.initDOM = function () {

  this.hBlock = $(this.$el).height();

  TweenMax.set(this.$el, {display: 'none'});

  this.$title = this.$el.find('h2');
  this.$button = this.$el.find('button');
  this.$titleQuote = this.$el.find('.quote-block h3');
  this.$textQuote = this.$el.find('.quote-block .quote');
  this.$authorQuote = this.$el.find('.quote-block .author');
  this.$workQuote = this.$el.find('.quote-block .author');
  this.$titleClients = this.$el.find('.clients-logos-block h3');
  this.$logoClients = this.$el.find('.clients-logos-block .logo');
  this.$logosBlock = this.$el.find('.clients-logos-block');
  this.$quoteBlock = this.$el.find('.quote-block');

  this.$els = [
    this.$title,
    this.$titleQuote,
    this.$textQuote,
    this.$authorQuote,
    this.$workQuote,
    this.$titleClients
  ];

  this.options.mainCanvasView.register(this.id, new ClientsCanvasView({
    mainCanvasView: this.options.mainCanvasView,
    mainView: this.options.mainView
  }, null));

  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.clients, EVENT.CANVAS_SHOWN, _onCanvasShown.bind(this));
  this.listenTo(this.options.mainCanvasView.aCanvasAnimViews.clients, EVENT.CANVAS_HIDDEN, _onCanvasHidden.bind(this));

  PageView.prototype.initDOM.call(this);

}

clientsView.prototype.setupDOM = function () {

  TweenMax.set(this.$el, {opacity: 0, display: 'none'});
  TweenMax.set(this.$title, {opacity: 0, y: 100});
  TweenMax.set(this.$quoteBlock, {opacity: 0, y: 100});
  TweenMax.set(this.$logosBlock, {opacity: 0, y: 50});
  TweenMax.set(this.$button, {opacity: 0, y: 100});

  PageView.prototype.setupDOM.call(this);

}

clientsView.prototype.onDOMInit = function () {

  PageView.prototype.onDOMInit.call(this);

}

clientsView.prototype.initTLShow = function () {

  this.TL.show = new TimelineMax({paused: true, onComplete: this.onShown.bind(this)});

  this.TL.show.to(this.$el, 0.2, { opacity: 1, display: 'flex'}, 0.2)
              .to(this.$title, .75, { opacity: 1, y: 0, ease: Expo.easeOut}, 0.2)
              .to(this.$quoteBlock, .75, { opacity: 1, y: 0, ease: Expo.easeOut}, 0.2)
              .to(this.$logosBlock, .75, { opacity: 1, y: 0, ease: Expo.easeOut}, 0.4)
              .to(this.$button, .75, { opacity: 1, y: 0, ease: Expo.easeOut}, 0.55);

}

clientsView.prototype.initTLHide = function () {

  this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});

  this.TL.hide.to(this.$title, .75, { opacity: 0, y: CV.scrollYDirection == "DOWN" ? 100 : -100, ease: Expo.easeOut})
              .to(this.$quoteBlock, .75, { opacity: 0, y: CV.scrollYDirection == "DOWN" ? 100 : -100, ease: Expo.easeOut}, 0.05)
              .to(this.$logosBlock, .75, { opacity: 0, y: CV.scrollYDirection == "DOWN" ? 100 : -100, ease: Expo.easeOut}, 0.1)
              .to(this.$button, .75, { opacity: 0, y: CV.scrollYDirection == "DOWN" ? 100 : -100, ease: Expo.easeOut}, 0.15)
              .to(this.$el, 0.2, { opacity: 0, display: 'none'}, '-=0.5');


    // TweenMax.to(this.$title, .75, {
    //   opacity: 0,
    //   y: CV.scrollYDirection == "DOWN" ? 100 : -100,
    //   ease: Expo.easeOut
    // });
    //
    // TweenMax.to(this.$quoteBlock, .75, {
    //   opacity: 0,
    //   y: CV.scrollYDirection == "DOWN" ? 100 : -100,
    //   ease: Expo.easeOut,
    //   delay: .1,
    // });
    //
    // TweenMax.to(this.$logosBlock, .75, {
    //   opacity: 0,
    //   y: CV.scrollYDirection == "DOWN" ? 100 : -100,
    //   ease: Expo.easeOut,
    //   delay: .1,
    // });
    //
    // TweenMax.to(this.$button, .3, {
    //   opacity: 0,
    //   y: CV.scrollYDirection == "DOWN" ? 100 : -100,
    //   ease: Expo.easeOut,
    //   delay: .15
    // });
    //
    // TweenMax.to(this.$el, .3, {
    //   opacity: 0,
    //   display: 'none',
    //   ease: Expo.easeOut,
    //   onComplete: (function () {
    //
    //     this.onHidden();
    //
    //   }).bind(this)
    // });

}

clientsView.prototype.onShown = function () {

  if (!this.hasBeenPlayed) this.hasBeenPlayed = true;

  this.trigger(EVENT.BLOCK_SHOWN);
  //this.trigger(EVENT.CANVAS_SHOWN);

  if (CV.isMobile) {
    // TweenMax.set(this.options.mainView.$html, {overflowY: 'scroll'});
    // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
    CV.mainView.setNormalScrollBehavior();
  }

  PageView.prototype.onShown.call(this);

}

clientsView.prototype.onHidden = function () {

  if (CV.isMobile) {
    // TweenMax.set(this.options.mainView.$html, {overflowY: 'hidden'});
    // TweenMax.set(this.options.mainView.$bodyHtml, {scrollTo: 0});
    CV.mainView.setNormalScrollBehavior(false);
  }

  //TweenMax.set(this.options.mainView.$canvas, {zIndex: 2, delay: .1});

  this.trigger(EVENT.BLOCK_HIDDEN);
  // Because we temporarily disabled the hide canvas animation we need to trigger the canvas hidden here
  this.trigger(EVENT.CANVAS_HIDDEN);

  PageView.prototype.onHidden.call(this);

}

var _onCanvasShown = function () {

  TweenMax.set(this.options.mainView.$canvas, {zIndex: -1});
  this.trigger(EVENT.CANVAS_SHOWN);

}

var _onCanvasHidden = function () {

  //console.log("_onCanvasHidden");

  this.trigger(EVENT.CANVAS_HIDDEN);

}

clientsView.prototype.show = function () {

  // console.log('this.options.mainCanvasView.aCanvasAnimViews.clients', this.options.mainCanvasView.aCanvasAnimViews.clients, 'this.options.mainCanvasView', this.options.mainCanvasView);

  setTimeout((function(){
    this.TL.show.play(0);
    this.options.mainCanvasView.showCanvas(this.id);
  }).bind(this), 0);


  // TweenMax.set(this.options.mainView.$canvas, {
  //       zIndex: 20,
  //       delay: .2,
  //       onComplete: (function () {
  //
  //         this.options.mainCanvasView.showCanvas(this.id);
  //         this.hBlock = $(this.$el).height();
  //
  //       }).bind(this)
  //     }
  // );
  //
  // TweenMax.set(this.$el, {display: 'flex', delay: .2});
  //
  // TweenMax.fromTo(this.$title, .75, {opacity: 0, y: 100}, {
  //   opacity: 1,
  //   y: 0,
  //   ease: Expo.easeOut,
  //   delay: .4
  // });
  //
  // TweenMax.fromTo(this.$quoteBlock, .75, {opacity: 0, y: 100}, {
  //   opacity: 1,
  //   y: 0,
  //   ease: Expo.easeOut,
  //   delay: .6
  // });
  //
  // TweenMax.fromTo(this.$logosBlock, .75, {opacity: 0, y: 50}, {
  //   opacity: 1,
  //   y: 0,
  //   ease: Expo.easeOut,
  //   delay: .6
  // });
  //
  // TweenMax.fromTo(this.$button, .75, {opacity: 0, y: 100}, {
  //   opacity: 1,
  //   y: 0,
  //   ease: Expo.easeOut,
  //   delay: .75,
  //   onComplete: this.onShown.bind(this)
  // });

}

clientsView.prototype.hide = function () {

  setTimeout((function(){
    this.TL.hide.play(0);
    // CL disabling the hide animation for now
    //this.options.mainCanvasView.hideCanvas(this.id);
  }).bind(this), 0);

}

clientsView.prototype.onResize = function () {

  this.canScroll = CV.isMobile ? true : false;
  this.hBlock = $(this.$el).height();

  PageView.prototype.onResize.call(this);

}

clientsView.prototype.onUpdate = function () {

}

clientsView.prototype.dispose = function () {

  PageView.prototype.dispose.call(this);

}

module.exports = clientsView;
