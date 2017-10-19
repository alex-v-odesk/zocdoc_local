var Blob = require('canvas/blob');
var AbstractCanvasView = require('abstract/abstractCanvasView');
var EVENT = require('app/events/events');
var CV = require('app/config/currentValues');
require('ScrollTo');

var ListHeaderCanvasView = function (options, datas) {

  this.paper = null;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(ListHeaderCanvasView, AbstractCanvasView);
_.extend(ListHeaderCanvasView.prototype, AbstractCanvasView.prototype);

ListHeaderCanvasView.prototype.init = function () {

  this.paper = new paper.PaperScope();
  this.paper.setup(this.options.el);
  this.itemsPosition = [];

  this.tool = new this.paper.Tool();

  this.mousePoint = new paper.Point(-500, -500);

  this.mainBlob = new Blob({
    scope: this,
    canvasView: this,
    bgColor: '#F1F1F1',
    position: {
      x: 'window.innerWidth / 2',
      y: '(CV.breakpoint === "sml") ? window.innerHeight / 2 + 20 : window.innerHeight / 2'
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    size: {
      w: CV.viewport.width * .9,
      maxW: 600
    },
    orbit: {
      h: 2,
      w: 2
    },
    divide: 2,
    multiply: 0.2,
    typeID: 'listHeaderMainBlob'
  });

  this.joinBlob = new Blob({
    type: 0,
    scope: this,
    canvasView: this,
    color: '#fef25c',
    position: {
      x: 'this.paper.view.size.width / 2 + this.scope.mainBlob.path.bounds._width / 3',
      y: 'this.paper.view.size.height / 2 + this.scope.mainBlob.path.bounds._height / 2'
    },
    size: {
      w: 'window.innerWidth * .4',
      maxW: 200
    },
    path: 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z',
    divide: 2,
    multiply: 0.2,
    orbit: {
      h: 2,
      w: 2
    },
    text: {
      content: 'Explore \n Openings',
      color: '#0b215a',
      position: {
        x: 'this.path.bounds._x + this.path.bounds._width / 2',
        y: 'this.path.bounds._y + this.path.bounds._height / 2'
      }
    },
    canTrigger: true,
    canHover: true,
    canClick: true,
    goTo: '.department-list-container',
    typeID: 'listHeaderJoinBlob'
  });

  this.itemsPosition[0] = {
    name: 'joinBlob',
    i: 0,
    x: (CV.breakpoint === 'sml') ? CV.viewport.width / 2 : CV.viewport.width / 2 + this.mainBlob.path.bounds._width / 3,
    y: (CV.breakpoint === 'sml') ? CV.viewport.height / 2 + this.mainBlob.path.bounds._height / 2 + 20 : CV.viewport.height / 2 + this.mainBlob.path.bounds._height / 2,
    w: this.joinBlob.path.bounds._width,
    h: this.joinBlob.path.bounds._height
  };

  this.mainBlob.canAnimate = true;
  this.joinBlob.canAnimate = true;

  //if (CV.isMobile && window.matchMedia("(orientation: landscape)").matches) {
    this.onResize();
  //}

  AbstractCanvasView.prototype.init.call(this);

}

ListHeaderCanvasView.prototype.bindEvents = function () {

  this.listenTo(this.joinBlob, EVENT.JOIN_BLOB_CLICKED, $.proxy(_onExploreClicked, this));

  this.tool.onMouseMove = (function (e) {

    this.mousePoint = e.lastPoint;

  }).bind(this);

  this.paper.view.onFrame = (function (e) {

    this.animate(e);

  }).bind(this);

  AbstractCanvasView.prototype.bindEvents.call(this);
}


var _onExploreClicked = function (e) {

  this.trigger(EVENT.JOIN_BLOB_CLICKED, {goto: e.goto});
}

ListHeaderCanvasView.prototype.mouseDown = function (points) {

  var item = this.isItem(points);
  if (item == 'joinBlob') {

    TweenMax.to(window, .8, {
      scrollTo: {y: (CV.breakpoint === 'sml') ? CV.viewport.height + 650: CV.viewport.height + 20},
      ease: Expo.easeOut,
      onUpdate: (function () {

        CV.scrollY = window.scrollY || window.pageYOffset;

      })
    });
    this.options.mainView.hideMenu();

  }

}

ListHeaderCanvasView.prototype.animate = function (e) {

  if (!CV.isMobile) this.mainBlob.animate(e);
  if (!CV.isMobile) this.joinBlob.animate(e);

  AbstractCanvasView.prototype.animate.call(this, e);

}

ListHeaderCanvasView.prototype.onResize = function () {

  // FIX FOR IOS SAFARI BECAUSE THE STATUS BAR DISSAPEARS IT TRIGGERS A RESIZE EVENT
  if (CV.isMobile || CV.isTablet && Detectizr.browser.name == 'safari') return;

  this.mainBlob.canAnimate = false;

  this.mainBlob.path.position.x = CV.viewport.width / 2;
  this.mainBlob.path.position.y = CV.viewport.height / 2;

  this.mainBlob.rectanglePath.bounds.width = CV.viewport.width;
  this.mainBlob.rectanglePath.bounds.height = CV.viewport.height;

  var s;

  if ((CV.breakpoint === 'sml') && window.matchMedia("(orientation: landscape)").matches) {
    s = this.mainBlob.getScale({h: 'window.innerHeight * .7'}, this.mainBlob.path);
  }
  else {
    s = this.mainBlob.getScale({w: 'window.innerWidth * .9', maxW: 600}, this.mainBlob.path);
  }

  this.mainBlob.path.scale(s);
  this.mainBlob.generateSettingsPoints();

  this.joinBlob.path.position.x = (CV.breakpoint === 'sml') ? CV.viewport.width / 2 : CV.viewport.width / 2 + this.mainBlob.path.bounds._width / 3;
  this.joinBlob.path.position.y = (CV.breakpoint === 'sml') ? CV.viewport.height / 2 + this.mainBlob.path.bounds._height / 2 + 20 : CV.viewport.height / 2 + this.mainBlob.path.bounds._height / 2;

  this.joinBlob.text.position.x = this.joinBlob.path.position._x;
  this.joinBlob.text.position.y = this.joinBlob.path.position._y;

  this.itemsPosition[0] = {
    name: 'joinBlob',
    i: 0,
    x: this.joinBlob.path.position.x,
    y: this.joinBlob.path.position.y,
    w: this.joinBlob.path.bounds._width,
    h: this.joinBlob.path.bounds._height
  };

  this.mainBlob.onResize();
  this.joinBlob.onResize();

  AbstractCanvasView.prototype.onResize.call(this);
}

ListHeaderCanvasView.prototype.mouseMove = function (e) {

  AbstractCanvasView.prototype.mouseMove.call(this, e);

}

ListHeaderCanvasView.prototype.isItem = function (p) {

  var itemName = null;
  var yItem;
  var xItem;
  var wItem;
  var hItem;

  _.each(this.itemsPosition, (function (item) {

    yItem = eval(item.y);
    xItem = eval(item.x);
    wItem = item.w / 2;
    hItem = item.h / 2;

    if (p.y > yItem - hItem && p.y < yItem + hItem && p.x > xItem - wItem && p.x < xItem + wItem && !itemName) {

      this.currentItem = item;
      itemName = item.name;

    }

  }).bind(this));

  return itemName;

}

module.exports = ListHeaderCanvasView;
