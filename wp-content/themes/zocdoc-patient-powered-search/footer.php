<?php
/**
* Footer template
*/
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;

if ($detect->isMobile()) {
	// include('styles/output/mobile/Footer.html');
  include( get_template_directory() . '/footer-mobile.php');

} else {
	include( get_template_directory() . '/footer-desktop.php');
}
?>

<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/iframeResizer.min.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/toggle.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/jquery-1.12.0.min.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/easings.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/swiper.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/custom-swiper.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/featured-play.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/sticky.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/iframe.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/submit.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/menu-toggle.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/autoplay.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/smooth.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/expand-nav.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/about-scroll.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/template-play.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/center-content.js"></script>
<script type="text/javascript" src="<?php echo get_theme_root_uri(); ?>/zocdoc-patient-powered-search/js/patient-powered-search-init.js"></script>


<?php wp_footer(); ?>
</body>
</html>
