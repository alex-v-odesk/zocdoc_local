<?php
/**
* Footer template
*/
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;

//CTAS
if ($detect->isMobile()) {
	// include('styles/output/mobile/Footer.html');
  include( get_template_directory() . '/footer-mobile.php');

} else {
	include( get_template_directory() . '/footer-desktop.php');
}
?>

<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/iframeResizer.min.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/toggle.js"></script>
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
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc/js/center-content.js"></script>

</script>
</body>
</html>
