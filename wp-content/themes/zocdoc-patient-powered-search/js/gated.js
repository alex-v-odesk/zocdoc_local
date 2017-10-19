jQuery(document).ready(function($){
// handle links with @href started with '#' only
$("#45052_86078pi_45052_86078_1044466").prop('checked', true);
$("#45052_86080pi_45052_86080_1044468").prop('checked', true);
$("#45052_87963pi_45052_87963_1069997").prop('checked', true);
$(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.size() === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $(id).offset().top;

    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});

$(function(){
    $("#submit").on("click", function(event){
        event.preventDefault();
    });
});
//video
(function($){
        $(document).ready( function(){
             $(".videoOverlay").click(function(){
                 $(".videoOverlay").css({"opacity":"0", "display": "hidden", "z-index":"-1"});
              $(".video-embed")[0].src += "?autoplay=1";
              $(this).unbind("click");
            });
        } );
    })(jQuery)
});
