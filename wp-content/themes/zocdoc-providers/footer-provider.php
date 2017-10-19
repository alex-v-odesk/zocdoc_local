<?php
/**
* Footer template
*/

include( get_template_directory() . '/footer-desktop-provider.php');

?>

<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/iframeResizer.min.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/toggle.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/jquery-1.12.0.min.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/easings.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/swiper.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/custom-swiper.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/featured-play.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/sticky.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/iframe.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/submit.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/menu-toggle.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/autoplay.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/smooth.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/expand-nav.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/about-scroll.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/template-play.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/center-content.js"></script>

<script type="text/javascript">
$(document).ready(function(){
$('.logo-slide').slick({
  dots: true,
  arrows: false,
  speed: 250,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 755,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

});

</script>

</script>
</body>
</html>
