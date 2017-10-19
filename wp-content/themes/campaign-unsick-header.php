<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo('description'); ?>">

		<?php wp_head(); ?>

	</head>
	<body <?php body_class($post->post_name); ?>>

		
		<header class="header bg_blue" role="banner" id="top">
    		<div class="header_wrapper">
                <nav>
                    <ul class="clearfix">
                        <li id="top_active"     ><a href="/campaigns/unsick#top">Unsick Day</a></li>
                        <li id="why_active"     ><a href="/campaigns/unsick#information_slides">Why Unsick Day</a></li>
                        <li id="videos_active"  ><a href="/campaigns/unsick#video_slides">Videos</a></li>
                        <li id="partners_active"><a href="/campaigns/unsick#partners">Partners</a></li>
                        <li id="support_active" ><a href="/campaigns/unsick#support">Support</a></li>
                        <li id="book_active"    ><a href="/campaigns/unsick#book_appointment">Book an Appointment</a></li>
                    </ul>
                </nav>
    		</div>
		</header>