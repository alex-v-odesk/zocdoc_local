function campaign_form_sent_success(id) {
    console.log(id);
    switch(id) {
        case 1924: /* employer: go to welcome page */
            document.location = '/about/campaigns/unsick-employer-welcome';
            break;
        case 1925: 
            jQuery('.form_with_thanks.thanking').addClass('thanking');
            break;
        case 1923: /* employee: show popup */
        default:
            jQuery('.popover, .popover_onionskin').addClass('on');
            if( $('html').hasClass('touch') ) {
                jQuery('html, body').animate({
                    scrollTop: target.offset().top - header_height
                }, 1000);
            }
            break;
    }
}





jQuery(function() {

    /*
        Left/Right buttons on slideshows.
    */
    jQuery('.slide_button').on('click', function(e) {
        var $slider = jQuery(jQuery(this).data('target'));
        var slide_count = $slider.find('.slide').length;
        var slide_index = $slider.data('index');
        if(jQuery(this).hasClass('left') && slide_index > 0 ) {
            slide_index--;
        } else if ( slide_index < slide_count - 1 ) {
            slide_index++;
        } else {
            return;
        }
        move_slider($slider, slide_index);
    });
    
    var move_slider = function($slider, slide_index) {
        var slide_count = $slider.find('.slide').length;
        $slider.data('index', slide_index);
        $slider.css('transform', 'translateX(calc(-' + slide_index + ' * 100vw))');
        // if we hit side of slider, hide button
        $slider.parent('.slides').find('.slide_button').removeClass('hidden');
        if( slide_index == 0 ) {
            $slider.parent('.slides').find('.slide_button.left').addClass('hidden');
        } else if ( slide_index == slide_count - 1 ) {
            $slider.parent('.slides').find('.slide_button.right').addClass('hidden');
        }
        jQuery($slider.parent('.slides').find('.slide_dot')).removeClass('active');
        jQuery($slider.parent('.slides').find('.slide_dot')[slide_index]).addClass('active');
    }
    
    /*
        Initialize dots on slideshows.
    */
    jQuery('.slides').each(function(i,n) {
        // count slides
        var x = jQuery(n).find('.slide').length;
        var $dots = jQuery(jQuery(n).find('.slide_dots')[0]);
        for( var i = 0; i < x; i ++ ) {
            var c = (i == 0) ? 'active' : '';
            $dots.append('<div class="slide_dot ' + c + '" data-index="' + i + '" data-target="#' + jQuery(n).attr('id') + ' .slider"></div>');
        }
    });
    
    jQuery('.slide_dot').on('click', function(e) {
        var $slider = jQuery(jQuery(this).data('target'));
        move_slider($slider, jQuery(this).data('index'));
    });
    
    
    /* smooth scroll anchors */
    
    var header_height = jQuery('header').innerHeight();

    jQuery('a[href*="#"]:not([href="#"])').click(function(e) {
      jQuery('header nav').removeClass('active');
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = jQuery(this.hash);
        target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          jQuery('html, body').animate({
            scrollTop: target.offset().top - header_height
          }, 1000);
          return false;
        }
      }
    });
    
    
    /* smart nav hover */
    
    var waypoints = jQuery('.nav_trigger').waypoint(function(direction) {
        jQuery('nav li').removeClass('active');
        jQuery(jQuery(this.element).data('activate')).addClass('active');
    }, {
        offset: header_height + 'px'
    })


    /* popup forms -- INCOMPLETE */

        jQuery('#btn_popover, .link_popover').on('click', function(e) {
            jQuery('.popover, .popover_onionskin').addClass('on');
            if( $('html').hasClass('touch') ) {
                jQuery('html, body').animate({
                    scrollTop: target.offset().top - header_height
                }, 1000);
            }
        });
        
        jQuery('.popover_onionskin, .popover_dismiss').on('click', function(e) {
            jQuery('.popover, .popover_onionskin').removeClass('on');
            jQuery('.form_with_thanks.thanking').removeClass('thanking');
            jQuery('input[type=text], input[type=email]').val('');
        });
        
        

    
    /* mobile menu */
    
    jQuery('header').on('click', function(e) {
        jQuery('header nav').toggleClass('active');
    });
    
    jQuery('nav li').on('click', function(e) {
        jQuery('header nav').removeClass('active');
    })
    
    
});