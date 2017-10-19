var EVENT   					= require('./../../../events/events');
var CV      					= require('./../../../config/currentValues');
var Config      				= require('./../../../config/config');
var BaseView    				= require('./../../../abstract/baseView');

var FooterView = function (options, datas){

	BaseView.call(this, options, datas);

};

_.extend(FooterView, BaseView);
_.extend(FooterView.prototype, BaseView.prototype);


FooterView.prototype.initDOM = function() {

	this.onResize();

	BaseView.prototype.initDOM.call(this);

}

FooterView.prototype.onDOMInit = function() {

	BaseView.prototype.onDOMInit.call(this);

}

FooterView.prototype.initTL = function() {

	this.TL.show = new TimelineMax({paused:true, onComplete:this.onShown.bind(this)});
	this.TL.show.to(this.$el, 0.3, {autoAlpha:1, ease:Cubic.easeOut});

	this.TL.hide = new TimelineMax({paused:true, onComplete:this.onShown.bind(this)});
	this.TL.hide.to(this.$el, 0.3, {autoAlpha:0, ease:Cubic.easeOut});

}

FooterView.prototype.show = function() {
	this.TL.show.play(0);
}

FooterView.prototype.hide = function() {
	this.TL.hide.play(0);
}


FooterView.prototype.bindEvents = function() {

	BaseView.prototype.bindEvents.call(this);

}

FooterView.prototype.onResize = function() {

}

module.exports = FooterView;