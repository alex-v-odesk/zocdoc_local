<?php
/**
* Header template
*/
?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="/images/rebrand/favicon/favicon.ico" sizes="32x32"/>

	<?php wp_head(); ?>

  <!--[if lte IE 8]>
  <style type="text/css">
  .leadership .parent .quote-parent .swiper-wrapper .swiper-slide:nth-of-type(n+2) {
  display: none;
}

.ie-content {
  display: block;
}
</style>
<![endif]-->

  <!--[if IE]>
<![endif]-->
<script>

window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments); }; ga.l = +new Date;

ga('create', 'UA-2809147-1', 'auto');

</script><!-- Google Tag Manager --><body><noscript>

<iframe src="//www.googletagmanager.com/ns.html?id=GTM-NF4MWM" height="0" width="0" style="display:none;visibility:hidden"></iframe>

</noscript>

<script data-test="google-tag-manager">

(function (w, d, s, l, i) {

w[l] = w[l] || []; w[l].push({

'gtm.start':

new Date().getTime(), event: 'gtm.js'

}); var f = d.getElementsByTagName(s)[0],

j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =

"https:" + '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);

})(window, document, 'script', 'dataLayer', 'GTM-NF4MWM');

</script>

<script>

ga('send', 'pageview');

</script>
</head>

<body <?php body_class(); ?>>
<div class="ie-content">
  <div class="color"></div>
  <div class="image"></div>
  <div class="ie-bar">
    <p>Important: You're using Internet Explorer 8, which is unsupported.  please consider <b>updating your browser</b>.</p>
  </div>
</div>
<?php
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;

$user_agent = $_SERVER['HTTP_USER_AGENT'];

// $user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36 ZocDocApp iPhoneApp 3.02";

// echo "<div id='iphone'>" . strpos($user_agent, "ZocDocApp iPhoneApp") . "</div>";

if ($detect->isMobile()) {
  if(!strpos($user_agent, "ZocDocApp iPhoneApp") && !strpos($user_agent, "ZocDocApp AndroidApp")){
    include('styles/output/mobile/Menu.html');
    include('styles/output/mobile/Header.html');
  }
} else {

	include('styles/output/desktop/header-desktop.php');

}
?>
