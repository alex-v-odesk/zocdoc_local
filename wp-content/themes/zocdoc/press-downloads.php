<?php
/**
* Template Name: Press/Downloads
*/
?>
<?php get_header()?>

<main class="main-container">

<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/press">Press</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="sg-header8 dim" href="<?php bloginfo('url'); ?>/press/downloads">Downloads</a>
  </section>
  </div>
</div>

<div class="downloads-header">
  <h2 class="sg-header2">All downloads</h2>
</div>



<?php
$taxonomy = 'downloads-categories';
$terms = get_terms($taxonomy, 'orderby=name');

foreach ($terms as $term):
  $args = array(
    'posts_per_page' => -1,
    $taxonomy => $term->slug,
    'post_type' => 'downloads',
    'orderby'=>'menu_order',
    'order'=>'ASC'
  );
  $posts=get_posts($args);

  if ($posts): ?>

    <div class="video-catagory all-downloads max-width">
    <div class="margin">

      <section>
        <h5 class="sg-header5"><?php echo $term->name; ?></h5>
      </section>

      <?php
      foreach($posts as $post) {
        setup_postdata($post); ?>

        <div class="download">
          <?php
          $file = get_field('file');
          if( $file ): ?>
            <a href="<?php the_field('file')?>" download>
          <?php endif; ?>

          <div class="image" style="background-image:url(<?php the_field('image')?>)">
            <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/16x9.png" class="expand" />
          </div>
          <?php
          $file = get_field('file');
          if( $file ): ?>
          </a>
          <?php endif; ?>
          <div class="info">
          <?php
          $file = get_field('file');
          if( $file ): ?>
            <a href="<?php the_field('file')?>" download><?php the_title()?></a>
            <a href="<?php the_field('file')?>" download></a>
          <?php endif; ?>
        </div>
        </div>
      <?php } ?>


        </div>
        </div>
      <div class="all-hr"></div>


<?php else: ?>
	<?php /*No posts*/ ?>
	...
<?php endif; ?>

<?php endforeach; ?>

<?php wp_reset_query(); ?>


<?php
$footer_text="Need to contact our press department?";
$footer_email="Press@Zocdoc.com";
include( get_template_directory() . '/footer.php');
?>
</main>
