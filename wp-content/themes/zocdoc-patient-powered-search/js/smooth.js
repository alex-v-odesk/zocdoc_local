var linkEls = $('.smooth a').not('.more-link');
var linksBarCtx = document.getElementsByClassName("page-links-bar")[0];

for (var i = 0; i < linkEls.length; i++) {
    linkEls[i].addEventListener("click", smoothScroll, false);
}



function smoothScroll() {

        var tag = $(this).data('tag');

        var topPadding = parseInt($(".main-container").css('padding-top'));

        if (window.innerWidth < 737) {
            $('html, body').animate({
                scrollTop: $('#' + tag).offset().top - topPadding
            }, 1000, 'easeOutQuart');

        } else {
            $('html, body').animate({
                scrollTop: $('#' + tag).offset().top - 64
            }, 500, 'easeOutQuart');
        }
}

var okToCheckScroll = true;
$(window).scroll(function() {
    if (okToCheckScroll) detectEl();
    okToCheckScroll = false;
});

window.addEventListener('load',function(){
    detectEl();
})

window.setInterval(function() {
    okToCheckScroll = true;
},30);

var $window = $(window);
var $links = $('.link-el');

function detectEl() {
     var scrollTop = $window.scrollTop() + ($window.height() * 0.5);

    $links.each(function(i, el) {
        var elOffset = $(el).offset().top;
        var elHeight = $(el).height();

        if (scrollTop >= elOffset && scrollTop <= elOffset + elHeight) {
            var id = $(el).attr('id');
            // console.log(id, 'id')

            for (var x = 0; x < linkEls.length; x++) {
               var tag = $(linkEls[x]).data('tag');
               // console.log(tag, 'tags')
                if ( tag == id ) {
                    linkEls[x].classList.add('selected');
                    // console.log('match', linkEls[x])
                } else {
                    if (linkEls[x].classList.contains('selected')) {
                     linkEls[x].classList.remove('selected');
                    }
                }
            }
        }
    })
}























