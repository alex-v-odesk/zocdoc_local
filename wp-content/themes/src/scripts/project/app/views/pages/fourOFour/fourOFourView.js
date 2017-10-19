var PageView  					= require('./../../../abstract/pageView');

var fourOFourView = function (options, datas){

  console.log("/************ FOUR O FOUR ***********/");

  PageView.call(this, options, datas);

}

_.extend(fourOFourView, PageView);
_.extend(fourOFourView.prototype, PageView.prototype);

fourOFourView.prototype.initDOM = function(){

	PageView.prototype.initDOM.call(this);

}

fourOFourView.prototype.setupDOM = function() {

	PageView.prototype.setupDOM.call(this);
}

fourOFourView.prototype.onDOMInit = function() {

	PageView.prototype.onDOMInit.call(this);

}

fourOFourView.prototype.onShown = function() {

	PageView.prototype.onShown.call(this);
}

fourOFourView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}

fourOFourView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = fourOFourView;
