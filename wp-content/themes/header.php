<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>

    <meta charset="<?php bloginfo('charset'); ?>"/>
    <title><?php echo wp_title();?></title>
	<link href="//www.google-analytics.com" rel="dns-prefetch">
	<link href="///analytics.newscred.com" rel="dns-prefetch">
	    <!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-NF4MWM');</script>
	<!-- End Google Tag Manager -->


    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes"/>

    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon.png"/>
    <link rel="icon" type="image/jpeg" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon.jpg"/>
    <link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon.png"/>
    <?php
        // https://support.newscred.com/hc/en-us/articles/208182496
        $canonical_url = get_post_meta( $post->ID, 'nc-link', true); 
        if (is_single() && !empty($canonical_url)) : ?>
            <link rel="canonical" href="<?php echo $canonical_url ?>" />
        <?php else : ?>
            <link rel="canonical" href="<?php the_permalink(); ?>"
        <?php endif; ?> 
    ?>
    <?php wp_head(); ?>

    <script>
        window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments); }; ga.l = +new Date;
        ga('create', 'UA-2809147-1', 'auto');
        ga('send', 'pageview');
    </script>
    
    <!-- Unbounce embed code -->
        <script src="//ad5fb309742e4500b46927451cf89060.js.ubembed.com" async></script>
    <!-- End Unbounce embed code -->

    <script async src="//analytics.newscred.com/analytics_ba0d155b6f6941e7a1c123e84deab985.js"></script>
    
</head>

<body data-page-slug="<?php echo(basename(get_permalink())); ?>" <?php body_class(); ?>>

	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NF4MWM"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->


<div id="container">
    <div class="hide-content">
        <div class="center">
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/rotate.png"/>
            <p>This site looks healthier in portrait mode.</p>
        </div>
    </div>
    <span class="overlay-bg"></span>

