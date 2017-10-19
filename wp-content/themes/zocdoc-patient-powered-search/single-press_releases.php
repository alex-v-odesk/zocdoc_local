<?php
/*
*
*/
?>
<?php get_header(); ?>

<main class="main-container">

<div class="links-bar clear-header">
<div class="max-width">
    <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/press">Press</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/press/news/">News</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="sg-header8 dim title" href="<?php the_permalink()?>">
    	<?php the_title()?>
    </a>
  </section>
  </div>
</div>

<div class="single-post max-width">
    <div class="margin">
  <?php while (have_posts()) : the_post(); ?>
    <section class="header">
      <h4 class="sg-header4"><?php the_field('date'); ?></h4>
      <h2 class="sg-header2"><?php the_title(); ?></h2>
      <?php if( $subtitle = get_field('subtitle') ) : ?><h3 class="sg-header3"><?php echo $subtitle ?></h3><?php endif; ?>
    </section>
    <div class="content text-width">
      <?php the_content(); ?>
      </div>
  <?php endwhile; ?>
  </div>
</div>


<?php
$footer_text="Need to contact our press department?";
$footer_email="Press@Zocdoc.com";
include( get_template_directory() . '/footer.php');
?>

</main>
