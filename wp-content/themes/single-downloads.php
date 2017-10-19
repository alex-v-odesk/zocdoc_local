<?php 
/**
* Template for download posts
*/ ?>

<?php get_header(); ?>
<a href="/press">≤≤ Press</a>
<hr>

<img src="<?php the_field('image') ?>">

<div><?php the_field('title')?></div>

<?php get_footer(); ?>