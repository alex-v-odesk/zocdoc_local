<?php
/**
* Template for bio posts
*/ ?>

<?php get_header(); ?>

<main class="main-container">

<?php $categories = get_the_category(); ?>


<?php 
    $category = 'Team';
    $url = $_SERVER["REQUEST_URI"];
    if(strpos($url, 'spokespeople')){
        $category = "Spokespeople";
    }
?>

<div class="links-bar clear-header">
<div class="max-width">
    <section class="margin">
     <?php if ($category == 'Team') :?>
	<a class="sg-header8" href="<?php bloginfo('url');?>">
		About
	</a>
	<img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" title="right arrow" alt="right arrow" />
	<a class="sg-header8" href="<?php bloginfo('url');?>/team">
		Team
	</a>
	<img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" title="right arrow" alt="right arrow" />
	<a class="sg-header8 dim" href="<?php bloginfo('url');?>/bios/<?php echo( basename(get_permalink())) ?>">
		<?php the_title()?>
	</a>
<?php else:?>
	<a class="sg-header8" href="<?php bloginfo('url'); ?>/press">Press</a>
	<img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" title="right arrow" alt="right arrow" />
	<a class="sg-header8" href="<?php bloginfo('url'); ?>/press/spokespeople">
		Spokespeople
	</a>
	<img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" title="right arrow" alt="right arrow" />
	<a class="sg-header8 dim" href="<?php bloginfo('url'); ?>/spokespeople/<?php echo( basename(get_permalink())) ?>">
		<?php the_title()?>
	</a>
<?php endif;?>
  </section>
  </div>
</div>

<div class="bio max-width">
	<div class="inner margin">

		<div class="info">
			<h2 class="sg-header2"><?php the_title() ?></h2>
			<h5 class="sg-header5"><?php the_field('position') ?></h5>
		</div>

		<div class="headshot" style="background-image: url(<?php the_field('headshot') ?>)"></div>

		<span class="quote"><?php the_field('interesting_quote') ?></span>
		<span class="sg-para3 text">
		<?php while (have_posts()) : the_post(); ?>
		  <?php the_content(); ?>
		<?php endwhile; ?>
		</span>
	</div>
</div>

<?php
if ($category == 'Spokespeople'){
    $footer_text="Need to contact our press department?";
    $footer_email="Press@ZocDoc.com";
}
include( get_template_directory() . '/footer.php');
?>

</main>
