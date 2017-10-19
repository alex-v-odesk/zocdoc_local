var Config = require('app/config/config');
var CV = require('app/config/currentValues');
var Tools = require('app/tools/tools');
var EVENT = require('app/events/events');

var Blob = function (blob) {

  this.canvasView = blob.canvasView;
  this.paper = blob.canvasView.paper ? blob.canvasView.paper : blob.paper;

  this.scope = blob.scope;
  this.blob = blob;

  this.radiusMultiplicator = blob.radiusMultiplicator ? blob.radiusMultiplicator : .4;
  this.radius = blob.radius ? blob.radius : Math.min(this.paper.view.size.width, this.paper.view.size.height) / 2 * this.radiusMultiplicator;
  this.mouseForce = blob.mouseForce ? blob.mouseForce : .2;

  this.orbit = blob.orbit ? blob.orbit : {h: 0, w: 0};
  this.rotate = blob.rotate ? blob.rotate : null;
  this.Angle = 0;

  this.img = blob.img ? blob.img : null;
  this.index = blob.index ? blob.index : null;

  this.bgImg = blob.bgImg ? blob.bgImg : null;
  this.bgColor = blob.bgColor ? blob.bgColor : null;
  this.content = blob.text ? blob.text : null;
  this.multipleContent = blob.multipleContent ? blob.multipleContent : null;
  this.size = blob.size ? blob.size : null;

  this.divide = blob.divide ? blob.divide : 2;
  this.multiply = blob.multiply ? blob.multiply : .2;

  this.typeID = (blob.typeID) ? blob.typeID : 'NA';

  //--------0 Position string
  this.position = {
    x: blob.position.x,
    y: blob.position.y
  };

  this.blobColor = blob.color ? blob.color : '#03215B';

  this.aGroupElements = [];

  this.resizeTO = null;

  //--------0 Position number
  this.posX = blob.position.x ? eval(blob.position.x) : this.paper.view.size.width / 2;
  this.posY = blob.position.y ? eval(blob.position.y) : this.paper.view.size.height / 2;

  this.canHover = blob.canHover ? blob.canHover : false;
  this.canClick = blob.canClick ? blob.canClick : false;
  this.canTrigger = blob.canTrigger ? blob.canTrigger : false;

  this.goTo = blob.goTo ? blob.goTo : null;
  this.figures = [];

  this.build(this.radius, blob.path, blob.color, this.posX, this.posY, blob.size, blob.img, blob.bgImg, blob.text, blob.rectangle, blob.bgColor, blob.rotate, blob.multipleContent);

  Backbone.View.call(this);

}

_.extend(Blob, Backbone.View);
_.extend(Blob.prototype, Backbone.View.prototype);

//--------0 Default blob is an blob with color, gradient, text or image mask
Blob.prototype.build = function (radius, path, color, posX, posY, size, img, bgImg, text, rectangle, bgColor, rotate, multipleContent) {

  //--------0 set the SVG path
  this.path = new paper.Path(path);

  this.path.position.x = text && CV.isMobile || text && CV.viewport.width < Config.breakPointMobile ? this.paper.view.size.width / 2 + (this.orbit.w + this.orbit.w * Math.cos(this.Angle * Math.PI / 180)) : eval(this.position.x) - (this.orbit.w + this.orbit.w * Math.cos(this.Angle * Math.PI / 180));
  this.path.position.y = eval(this.position.y) - (this.orbit.h + this.orbit.h * Math.sin(this.Angle * Math.PI / 180));

  //--------0 Color
  this.path.fillColor = color ? color : '#03215B';

  //--------0 turn ON if you want show line
  this.path.selected = false;

  this.threshold = radius * 1;
  this.path.flatten(radius * 1.5);

  //--------0 Size
  this.defaultScale = this.getScale(size, this.path);
  this.path.scale(this.defaultScale);

  this.path.smooth();
  if (!this.index)  this.path.name = 'blob' + this.index;

  this.figures.push(this.path);

  if (rotate) this.path.rotate(rotate, this.anchor);

  this.els = [];
  this.els.push(this.path);

  //--------0 if Background Image - Mask
  if (bgImg) {

    this.bgRaster = new this.paper.Raster({
      source: bgImg.url
    });

    this.bgRaster.visible = false;

    this.bgRectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Point(this.paper.view.size.width, this.paper.view.size.height));

    this.bgRaster.on('load', (function () {

      this.bgRaster.position = new paper.Point(posX, posY);

      this.defaultBgImgScale = this.getScale(bgImg.size, this.bgRaster);

      this.bgRaster.scale(this.defaultBgImgScale);

      this.figures.push(this.bgRaster);

      if (bgImg.layer) {

        this.rectangle = new paper.Path.Rectangle(this.bgRectangle);
        this.rectangle.fillColor = bgImg.layer.color;
        this.rectangle.opacity = bgImg.layer.opacity;
        this.rectangle.selected = false;

        this.bgImgGroup = new paper.Group([
          this.bgRaster,
          this.rectangle
        ]);

        this.bgImgGroup.blendMode = 'source-out'

        this.figures.push(this.bgRectangle);
        this.figures.push(this.rectangle);
        this.figures.push(this.bgImgGroup);

        this.bgImgGroup.opacity = 0;

        this.trigger(EVENT.BLOB_IMG_LOADED);

      }

    }).bind(this));

  }

  //--------0 if Image - Mask
  if (img) {
    this.raster = new this.paper.Raster({source: img});
    this.raster.on('load', (function () {

      this.raster.position = new paper.Point(posX, posY);

      this.defaultImgScale = this.getScale(size, this.raster) + .2;
      this.raster.scale(this.defaultImgScale);

    }).bind(this));

    this.figures.push(this.raster);
    this.els.push(this.raster);
  }

  //--------0 add Text to blob
  if (text) {

    this.text = new paper.PointText();
    this.text.justification = 'center';
    this.text.style = {
      fontFamily: 'sharp-sans-bold',
      fontSize: CV.isMobile ? 20 : 28,
      fillColor: text.color
    };
    this.text.content = text.content;
    this.text.position = new paper.Point(this.path.bounds._x + this.path.bounds._width / 2, this.path.bounds._y + this.path.bounds._height / 2);

    this.figures.push(this.text);
    this.els.push(this.text);
  }

  if (rectangle) {

    this.bgRectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(this.paper.view.size.width, this.paper.view.size.height));
    this.rectangle = new paper.Path.Rectangle(this.bgRectangle);
    this.rectangle.fillColor = rectangle.color;
    this.rectangle.opacity = rectangle.opacity;
    this.rectangle.selected = false;

    this.figures.push(this.bgRectangle);
    this.figures.push(this.rectangle);

    this.els.push(this.rectangle);
  }

  if (bgColor) {

    this.bgRectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(this.paper.view.size.width + 10, this.paper.view.size.height + 10));
    this.rectanglePath = new paper.Path.Rectangle(this.bgRectangle);

    this.rectanglePath.selected = false;

    this.compoundPath = new paper.CompoundPath({
      children: [this.rectanglePath, this.path],
      fillColor: bgColor
    });

    this.figures.push(this.bgRectangle);
    this.figures.push(this.rectanglePath);

  }
  else {
    this.group = new this.paper.Group(this.els);
    if (this.img)this.group.clipped = true;
  }

  this.controlCircle = this.path.clone();
  this.controlCircle.fullySelected = false;
  this.controlCircle.visible = false;

  this.generateSettingsPoints();
  this.bindEvents();
  this.onResize();

}

Blob.prototype.remove = function (callback) {

  _.each(this.figures, (function (figure, i) {

    if (figure.remove)figure.remove();
    else figure = null;

    if (this.figures.length - 1 === i)callback();

  }).bind(this));

}

Blob.prototype.generateContent = function (fontSize, y) {

  var fSize = fontSize ? fontSize : 16;
  var yTitle = y ? y : 40;

  this.title = new paper.PointText();
  this.title.justification = 'center';
  this.title.style = {
    fontFamily: 'sharp-sans-bold',
    fontSize: fSize,
    fillColor: this.multipleContent.color
  };
  this.title.content = this.multipleContent.title;
  this.title.position = new paper.Point(this.path.bounds._x + this.path.bounds._width / 2, this.path.bounds._y + this.path.bounds._height + yTitle);

  this.subtitle = new paper.PointText();
  this.subtitle.justification = 'center';
  this.subtitle.style = {
    fontFamily: 'kievit-slab-pro-book',
    fontSize: 14,
    fillColor: this.multipleContent.color
  };
  this.subtitle.content = this.multipleContent.subtitle;
  this.subtitle.position = new paper.Point(this.path.bounds._x + this.path.bounds._width / 2, this.title.bounds._y + this.title.bounds._height + 10);

  this.subtitle.opacity = 0;
  this.title.opacity = 0;

  this.figures.push(this.title);
  this.figures.push(this.subtitle);
  this.els.push(this.title);
  this.els.push(this.subtitle);

}

Blob.prototype.bindEvents = function () {
  this.path.onMouseEnter = this.onMouseEnter.bind(this);

  //if (this.canHover) {

    //--------0 bind Enter\Leave Events
    // this.path.onMouseEnter = this.onMouseEnter.bind(this);
    // this.path.onMouseLeave = this.onMouseLeave.bind(this);

    // if (this.text) {
    //
    //   this.text.onMouseEnter = this.onMouseEnter.bind(this);
    //   this.text.onMouseLeave = this.onMouseLeave.bind(this);
    // }

  //}

}

Blob.prototype.onMouseEnter = function () {

  //document.body.style.cursor = "pointer";

}

Blob.prototype.onMouseLeave = function () {

  //document.body.style.cursor = "default";

}

Blob.prototype.triggerBlob = function (color) {

  // If we want to get a random number between -5 and 5 to get some random movement going

  var obj = {blobX: 0, blobY: 0, blobColor: this.blobColor};

  TweenLite.to(obj, 0.2, {
    blobX: Tools.getRandomNumber(-3, 3),
    blobY: 2,
    blobColor: color,
    ease: Power1.easeOut,
    onUpdate: $.proxy(this.animateTriggerBlob, this),
    onUpdateParams: [obj, ['blobX', 'blobY', 'blobColor']]
  });

}

Blob.prototype.animateTriggerBlob = function (obj) {

  this.path.fillColor = obj['blobColor'];

  if (CV.isMobile || CV.isTablet) return;

  this.path.segments[0].point.y += obj['blobY'];
  this.path.segments[0].point.x += obj['blobX'];

  this.path.smooth();

}

//--------0 Mask Blob is background with an hole

Blob.prototype.generateSettingsPoints = function () {
  //--------0  Settings pro segment
  //this.canAnimate = false;

  this.controlCircle.remove();
  this.controlCircle = null;

  this.settingsPoints = [];

  _.each(this.path.segments, (function (segment, i) {

    this.settingsPoints[i] = {
      relativeX: segment.point.x - this.paper.view.center.x,
      relativeY: segment.point.y - this.paper.view.center.y,
      offsetX: this.radius / 200,
      offsetY: this.radius / 200,
      momentum: new paper.Point(0, 0)
    };

  }).bind(this));

  this.controlCircle = this.path.clone();
  this.controlCircle.fullySelected = false;
  this.controlCircle.visible = false;

  if (this.text) this.text.position = new paper.Point(this.path.bounds._x + this.path.bounds._width / 2, this.path.bounds._y + this.path.bounds._height / 2);

  this.canAnimate = true;

}

Blob.prototype.animate = function (e) {

  if (!this.canAnimate) return;

  // // Skipping ambient movement for now!
  // if (
  //     this.typeID != 'careerStickyBlob' ||
  //     !this.canAnimate
  //     ) {
  //   // this MUST work for the career list sticky blob at top of page, otherwise it does not render well.
  //   return;
  // }

  this.path.smooth();

  //--------0 Move text with blob

  _.each(this.path.segments, (function (segment, i) {

    var settings = this.settingsPoints[i];
    var controlPoint = new paper.Point();
    controlPoint = this.controlCircle.segments[i].point;

    //--------0  Avoid the mouse

    var mouseOffset = this.canvasView.mousePoint.subtract(controlPoint);
    var mouseDistance = this.canvasView.mousePoint.getDistance(controlPoint);
    var newDistance = mouseDistance < this.threshold ? (mouseDistance - this.threshold) * this.mouseForce : 0;
    var newOffset = mouseDistance !== 0 ? new paper.Point((-mouseOffset.x / mouseDistance * newDistance) / 5, (-mouseOffset.y / mouseDistance * newDistance) / 5) : new paper.Point(0, 0);

    var newPosition = controlPoint.add(newOffset);
    var distanceToNewPosition = segment.point.subtract(newPosition);
    settings.momentum = settings.momentum.subtract(distanceToNewPosition.divide(this.divide));
    settings.momentum = settings.momentum.multiply(this.multiply);

    //--------0  Add automatic rotation
    var amountX = settings.offsetX / 4;
    var amountY = settings.offsetY / 4;
    var sinus = Math.sin(e.time + i * 2);
    var cos = Math.cos(e.time + i * 2);
    settings.momentum = settings.momentum.add(new this.paper.Point(cos * -amountX, sinus * -amountY));

    //--------0  go to the point, now!
    segment.point = segment.point.add(settings.momentum);

  }).bind(this));

  this.Angle = this.Angle++ > 360 ? 0 : this.Angle++;

}

Blob.prototype.getScale = function (size, container) {

  var containerSize = container.bounds ? container.bounds : container.size;

  if (size.w) {
    var scale = eval(size.w) / container.bounds._width;
    if (size.h && scale * container.bounds._height < size.h) scale = size.h / container.bounds._height;
    if (scale * container.bounds._width > size.maxW)scale = eval(size.maxW) / container.bounds._width;
  }
  else {
    scale = eval(size.h) / containerSize._height
  }

  return scale;

}

Blob.prototype.onResize = function () {

  this.canResize = true;
  this.canAnimate = false;

  if (this.resizeTO) clearTimeout(this.resizeTO);
  // Timeout to check if we can activate the resizing event again after 300ms
  this.resizeTO = setTimeout((function () {
    this.onResizeEnd();
  }).bind(this), 300);

}

Blob.prototype.onResizeEnd = function () {

  this.generateSettingsPoints();
  //console.log("onResizeEnd");

}


module.exports = Blob;
