<?php
/*
*	Template Name: Press/Spokespeople
*/
?>

<?php
$query = new WP_Query(array(
  'post_type'=>'bios',
  'category_name'=>'spokespeople',
  'orderby'=>'menu_order',
  'order'=>'ASC'
  // 'order' => 'ASC',
  // 'post_status' => 'publish',
  // 'posts_per_page' => -1,
  // 'meta_key' => '_reorder_term_category_spokespeople',
  // 'orderby' => 'meta_value_num title'
  ));
?>

<?php get_header(); ?>

<main class="main-container">

<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/press">Press</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="sg-header8 dim" href="<?php bloginfo('url'); ?>/spokespeople">Spokespeople</a>
  </section>
  </div>
</div>

<div class="all-bios max-width">
  <div class="bios-header">
    <h2 class="sg-header2"><?php the_field('header_title') ?></h2>
    <h5 class="sg-header5"><?php the_field('header_text') ?></h5>
  </div>

  <?php if ($query->have_posts()): ?>

  <div class="grid margin">
    <?php while($query->have_posts() ) : $query->the_post(); ?>
      <div class="person">
        <div class="overlay" style="background-color:<?php the_field('color')?>"></div>
      	<a href="<?php bloginfo('url'); ?>/spokespeople/<?php echo $post->post_name?>" class="headshot" style="background-image: url(<?php the_field('headshot')?>)"></a>
        <a class="sg-title" href="<?php bloginfo('url'); ?>/spokespeople/<?php echo $post->post_name?>">
          <?php the_title() ?>
        </a>
        <p class="sg-title"><?php the_field('position') ?></p>
      </div>
    <?php endwhile; ?>

    <?php else: ?>
    	<?php /* No posts */ ?>
    <?php endif; ?>
  </div>

</div>


<?php
$footer_text="Need to contact our press department?";
$footer_email="Press@Zocdoc.com";
include( get_template_directory() . '/footer.php');
?>

</main>
