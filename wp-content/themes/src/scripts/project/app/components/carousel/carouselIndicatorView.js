var EVENT   		= require('app/events/events');
var BaseView    	= require('app/abstract/baseView');

var CarouselIndicatorView = function (options, datas){

	this.isActive = false;
	this.index = 0;

	this.events = {
		'click': 'onClick'
	}

	BaseView.call(this, options, datas);

};

_.extend(CarouselIndicatorView, BaseView);
_.extend(CarouselIndicatorView.prototype, BaseView.prototype);


CarouselIndicatorView.prototype.initDOM = function() {

	this.index = parseInt(this.$el.attr('data-id'), 10);

	BaseView.prototype.initDOM.call(this);

}

CarouselIndicatorView.prototype.toggleActive = function() {

	//console.log("CLICK")
	if (this.isActive) {

		this.$el.removeClass('active');
		this.isActive = false;

	}else{

		this.$el.addClass('active');
		this.isActive = true;
	}

}

CarouselIndicatorView.prototype.onClick = function() {

	this.trigger(EVENT.CAROUSEL_INDICATOR_CLICKED, {indicator: this});
}

module.exports = CarouselIndicatorView;
