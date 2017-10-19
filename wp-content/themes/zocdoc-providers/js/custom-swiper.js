 var ua = navigator.userAgent;
 var ie9 = ua.indexOf('MSIE 9') > 0 ? true : false;

 if (!ie9) {
     var swiper = new Swiper('.swiper-container', {
         slidesPerView: 'auto',
         spaceBetween: 0,
         onSlideChangeStart: function() {
             $('.swiper-pagination-switch').removeClass('active')
             $('.swiper-pagination-switch').eq(swiper.activeSlide).addClass('active')
         }
     });

     $('.swiper-pagination-switch').hover(function() {
         swiper.slideTo($(this).index());
         $('.swiper-pagination-switch').removeClass('active');
         $(this).addClass('active')
     })
 }