var rash;
$(document).ready(function() {
    rash = $('.rash-circle');
    if ($(window).width() > 736 && $(".scrolling")[0]) {
        aboutScroll();
    }
});

var okToCheckAboutScroll = true;
$(window).scroll(function() {
    if ($(window).width() > 736 && $(".scrolling")[0] && okToCheckAboutScroll) aboutScroll();
    okToCheckAboutScroll = false;
});


window.setInterval(function() {
    okToCheckAboutScroll = true;
},30);


var $scrolling = $(".scrolling");
var $window = $(window);

function aboutScroll() {
    var offset = $scrolling.offset().top;
    var height = $scrolling.height();
    var windowHeight = $window.height();
    var scrollTop = $window.scrollTop();

    if (scrollTop >= (height - windowHeight + offset)) {
        if (!$scrolling.hasClass('absolute')) {
            $scrolling.addClass('absolute');
        }
    } else {
        if ($scrolling.hasClass('absolute')) {
            $scrolling.removeClass('absolute');
        }
    }

    var percent = scrollTop / ( (height * 0.5) - (windowHeight * 0.5));
    var arrayIndex = Math.round(rash.length * percent);
        for (i = 0; i < arrayIndex; i++) {
            if (i < rash.length) {
                rash[i].setAttribute("class", "rash-circle hide");
            }
        }
        for (i = arrayIndex; i < rash.length; i++) {
            rash[i].setAttribute("class", "rash-circle");
        }
}

// test