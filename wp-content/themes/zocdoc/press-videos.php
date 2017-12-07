<?php
/*
*	Template Name: Press/Videos
*/
?>
<?php get_header(); ?>

<main class="main-container">

<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/press">Press</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" title="right arrow" alt="right arrow" />
    <a class="sg-header8 dim" href="<?php bloginfo('url'); ?>/press/videos">Videos</a>
  </section>
  </div>
</div>

<?php /*recent videos*/ ?>
<div class="video-header">
  <h2 class="sg-header2">All videos</h2>
</div>

<?php
$taxonomy = 'video-categories';
$terms = get_terms($taxonomy, 'orderby=name');

foreach ($terms as $term) {
  $args = array(
    'posts_per_page' => -1,
    $taxonomy => $term->slug,
    'post_type' => 'videos',
    'orderby'=>'menu_order',
    'order'=>'ASC'
  );
  $posts=get_posts($args);
  if ($posts) {
    ?>
    <div class="video-category max-width">
    <div class="margin">
      <section>
        <h5 class="sg-header5"><?php echo $term->name; ?></h5>
      </section>
      <?php
      foreach($posts as $post) {
        setup_postdata($post);
        $id = getYoutubeThumb(get_field('video')); ?>
        <div class="video">
        <div class="image">
          <img src="https://img.youtube.com/vi/<?php echo $id; ?>/mqdefault.jpg" title="video thumbnail" alt="video thumbnail">
            <a href="<?php the_permalink()?>">
             <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/play.png" title="play icon" alt="play icon" />
            </a>
        </div>
        <div class="info">
          <a href="<?php the_permalink()?>"><?php the_title()?></a>
        </div>
        </div>
        <?php
      }?>
      </div>
      </div>
      <div class="all-hr"></div>
      <?php
  }
}
?>
<?php
$footer_text="Need to contact our press department?";
$footer_email="Press@ZocDoc.com";
include( get_template_directory() . '/footer.php');
?>

</main>


