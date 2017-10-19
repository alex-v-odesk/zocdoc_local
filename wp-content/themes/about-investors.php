<?php
/*
*	Template Name: About/Investors
*/
?>

<?php
$query = new WP_Query(array(
  'post_type'=>'investors',
  'orderby'=>'menu_order',
  'order'=>'ASC',
  ));
?>

<?php get_header(); ?>

<main class="main-container">

<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>">About</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="sg-header8 dim" href="<?php bloginfo('url'); ?>/investors">Investors</a>
  </section>
  </div>
</div>

<div class="investors-page max-width">
  <div class="margin">
    <div class="investors-header">
      <h2 class="sg-header2"><?php the_title() ?></h2>
      <h5 class="sg-header5">
        <?php while (have_posts()) : the_post(); ?>
          <?php the_content(); ?>
        <?php endwhile; ?>
      </h5>
    </div>

    <?php if ($query->have_posts()): ?>

    <?php while($query->have_posts() ) : $query->the_post(); ?>
      <div class="investor">
        <section>
            <img src="<?php the_field('logo') ?>" />

            <?php
                the_content();
            ?>

        </section>
      </div>
    <?php endwhile; ?>

    <?php else: ?>
    	...
    	<?php /* No posts */ ?>
    <?php endif; ?>
  </div>
</div>

<?php get_footer(); ?>
</main>

