jQuery( document ).ready(function() {
	console.log( "document loaded" );
	
	
	/* jQuery('.department-list li').click(function(e){
		e.preventDefault();
		var id = jQuery(this).attr('data-id');
		var scrollTarget = jQuery('[data-anchor="' + id + '"]')[0].offsetTop + 100;
		jQuery('body').animate({scrollTop: (scrollTarget)}, 'slow');
	}); */
	jQuery('.department-list li').click(function(e){
		console.log("department-list li click");
		//e.preventDefault();
		var id = jQuery(this).attr('data-id');
		jQuery(".department-list>li").find("button").removeClass("current");
		jQuery(this).find("button").addClass("current");
		
		jQuery('html, body').animate({ 
		    scrollTop: jQuery("#"+id).offset().top}, 
		    2000, 
		    function() {
			    window.location.hash = id;
			}
		);
	 });
	
	jQuery('.dropdown-btn').click(function(e){
		e.preventDefault();
		var dropDownHeight = jQuery('.filter-wrapper ul').height() + 40;
		if (!jQuery('.filter-wrapper').hasClass('active')) {
			jQuery('.filter-wrapper').addClass('active');
			jQuery('.filter-wrapper').css('height', dropDownHeight);
		} else {
			jQuery('.filter-wrapper').removeClass('active');
			jQuery('.filter-wrapper').css('height', 0);
		}
	});
});
 