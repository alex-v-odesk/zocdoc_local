var AbstractCanvasView = require('./../../../abstract/abstractCanvasView');

var JoinUsButtonCanvasView = function (options, datas) {

  //----------0 Main Blob
  this.pathData = 'M769.5,338.7c0-93.6-12.2-175.5-55.1-234S598.1,11,475.7,11c-97.9,0-214.2,23.4-306,64.4S10.5,174.8,10.5,245c0,140.4,67.3,216.4,153,257.3S353.3,549,426.7,549c122.4,0,208.1-5.8,263.2-35C745,484.9,769.5,432.3,769.5,338.7z';

  //----------0 Main Blob
  this.pathJoinData = 'M45.134,10.035C135.889-34.68,184.518,93.554,116,125,20.052,164.955-48.816,64.566,45.134,10.035,47.243,8.811,12.986,25.87,45.134,10.035Z';
  this.WSizeJoin = 80;

  this.mouseForce = .2;
  this.radiusMultiplicator = 0.4;
  this.Angle = 0;

  this.index = 0;

  AbstractCanvasView.call(this, options, datas);

}

_.extend(JoinUsButtonCanvasView, AbstractCanvasView);
_.extend(JoinUsButtonCanvasView.prototype, AbstractCanvasView.prototype);

JoinUsButtonCanvasView.prototype.init = function () {

  var radius = Math.min(this.paper.view.size.width, this.paper.view.size.height) / 2 * this.radiusMultiplicator;
  this.threshold = radius * 1.5;

  // this.buildMainBlob(radius);
  this.buildJoinBlob(radius);

  AbstractCanvasView.prototype.init.call(this);

}

JoinUsButtonCanvasView.prototype.buildMainBlob = function (radius) {

  //--------0 set the SVG path
  this.path = new paper.Path(this.pathData);
  this.path.position = new paper.Point(this.paper.view.size.width / 2, this.paper.view.size.height / 2);
  this.path.fillColor = "#c594fb";


  //--------0 turn ON if you want show line
  this.path.selected = false;

  this.threshold = radius * 1;
  this.center = this.paper.view.bounds.center;
  this.path.flatten(radius * 1.5);
  this.path.scale(.8);
  this.path.smooth();

  this.controlCircle = this.path.clone();
  this.controlCircle.fullySelected = false;
  this.controlCircle.visible = false;

  var rotationMultiplicator = radius / 200;

  //--------0  Settings pro segment
  this.settingsPoints = [];

  _.each(this.path.segments, (function (segment, i) {
    this.settingsPoints[i] = {
      relativeX: segment.point.x - this.paper.view.center.x,
      relativeY: segment.point.y - this.paper.view.center.y,
      offsetX: rotationMultiplicator,
      offsetY: rotationMultiplicator,
      momentum: new paper.Point(0, 0)
    };
  }).bind(this));

}

JoinUsButtonCanvasView.prototype.buildJoinBlob = function (radius) {

  //--------0 set the SVG path
  this.pathJoin = new paper.Path(this.pathData);
  this.pathJoin.fillColor = '#fef25c';


  //--------0 turn ON if you want show line
  this.pathJoin.selected = false;
  this.WScaleJoin = this.WSizeJoin / this.pathJoin.bounds._width;

  this.threshold = radius;
  this.center = this.paper.view.bounds.center;
  this.pathJoin.flatten(radius * 1.5);
  this.pathJoin.scale(this.WScaleJoin);
  this.pathJoin.smooth();

  this.pathJoin.position = new paper.Point(this.paper.view.size.width / 2, this.pathJoin.view.size.height / 2 - 10);
  this.textJoin = new paper.PointText(new paper.Point(this.paper.view.size.width / 2, this.pathJoin.view.size.height / 2 - 5));
  this.textJoin.justification = 'center';
  this.textJoin.style = {
    fontFamily: 'sharp-sans-bold',
    fontSize: 17,
    fillColor: '#0b215a'
  };
  this.textJoin.content = 'Join us';

  this.group = new this.paper.Group(
    [
      this.pathJoin,
      this.textJoin
    ]
  );

  this.controlJoinCircle = this.pathJoin.clone();
  this.controlJoinCircle.fullySelected = false;
  this.controlJoinCircle.visible = false;

  var rotationMultiplicator = radius / 200;

  //--------0  Settings pro segment
  this.settingsJoinPoints = [];

  _.each(this.pathJoin.segments, (function (segment, i) {
    this.settingsJoinPoints[i] = {
      relativeX: segment.point.x - this.paper.view.center.x,
      relativeY: segment.point.y - this.paper.view.center.y,
      offsetX: rotationMultiplicator,
      offsetY: rotationMultiplicator,
      momentum: new paper.Point(0, 0)
    };
  }).bind(this));

}

JoinUsButtonCanvasView.prototype.bindEvents = function () {

  AbstractCanvasView.prototype.bindEvents.call(this);
}

JoinUsButtonCanvasView.prototype.animate = function (e) {

  //this.animateMainBlob(e);
  this.animateJoinBlob(e);

}

JoinUsButtonCanvasView.prototype.animateMainBlob = function (e) {

  //--------0 in circle
  var sizeW = 5;
  var sizeX = 5;
  this.X = sizeW + sizeW * Math.cos(this.Angle * Math.PI / 180);
  this.Y = sizeX + sizeX * Math.sin(this.Angle * Math.PI / 180);

  this.path.position.x = this.path.view.size._width / 2 - this.X;
  this.path.position.y = this.path.view.size._height / 2 - this.Y;

  this.Angle++;

  this.Angle = this.Angle > 360 ? 0 : this.Angle;

  this.path.smooth();

  _.each(this.path.segments, (function (segment, i) {
    var settings = this.settingsPoints[i];
    var controlPoint = new paper.Point();
    controlPoint = this.controlCircle.segments[i].point;

    //--------0  Avoid the mouse
    var mouseOffset = this.mousePoint.subtract(controlPoint);
    var mouseDistance = this.mousePoint.getDistance(controlPoint);
    var newDistance = (mouseDistance - this.threshold) * this.mouseForce;

    var newOffset = new paper.Point((-mouseOffset.x / mouseDistance * newDistance) / 2, (-mouseOffset.y / mouseDistance * newDistance) / 2);
    var newPosition = controlPoint.add(newOffset);
    var distanceToNewPosition = segment.point.subtract(newPosition);

    settings.momentum = settings.momentum.subtract(distanceToNewPosition.divide(8));
    settings.momentum = settings.momentum.multiply(.6);

    //--------0  Add automatic rotation
    var amountX = settings.offsetX / 6;
    var amountY = settings.offsetY / 6;
    var sinus = Math.sin(e.time + i * 1.5);
    var cos = Math.cos(e.time + i * 1.5);
    settings.momentum = settings.momentum.add(new this.paper.Point(cos * -amountX, sinus * -amountY));

    //--------0  go to the point, now!
    segment.point = segment.point.add(settings.momentum);
  }).bind(this));

}

JoinUsButtonCanvasView.prototype.animateJoinBlob = function (e) {

  this.pathJoin.smooth();

  _.each(this.pathJoin.segments, (function (segment, i) {
    var settings = this.settingsJoinPoints[i];
    var controlPoint = new paper.Point();
    controlPoint = this.controlJoinCircle.segments[i].point;

    // Avoid the mouse
    var mouseOffset = this.mousePoint.subtract(controlPoint);
    var mouseDistance = this.mousePoint.getDistance(controlPoint);
    var newDistance = mouseDistance < this.threshold ? newDistance = (mouseDistance - this.threshold) * .2 : 0;
    var newOffset = mouseDistance !== 0 ? new paper.Point(mouseOffset.x / mouseDistance * newDistance, mouseOffset.y / mouseDistance * newDistance) : new paper.Point(0, 0);

    var newPosition = controlPoint.add(newOffset);

    var distanceToNewPosition = segment.point.subtract(newPosition);

    settings.momentum = settings.momentum.subtract(distanceToNewPosition.divide(8));
    settings.momentum = settings.momentum.multiply(.65);

    //--------0  Add automatic rotation
    var amountX = settings.offsetX;
    var amountY = settings.offsetY;
    var sinus = Math.sin(e.time + i * 2);
    var cos = Math.cos(e.time + i * 2);
    settings.momentum = settings.momentum.add(new this.paper.Point(cos * -amountX, sinus * -amountY));

    //--------0  go to the point, now!
    segment.point = segment.point.add(settings.momentum);
  }).bind(this));

}

JoinUsButtonCanvasView.prototype.onResize = function () {

  this.path.position = this.paper.view.center;

  AbstractCanvasView.prototype.onResize.call(this);

}

JoinUsButtonCanvasView.prototype.mouseMove = function (e) {

  AbstractCanvasView.prototype.mouseMove.call(this, e);

}


module.exports = JoinUsButtonCanvasView;
