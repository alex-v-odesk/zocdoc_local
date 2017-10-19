<?php
/*
*	Template for Video Posts
*/
?>
<?php get_header(); ?>

<main class="main-container">


<div class="links-bar clear-header">
<div class="max-width">
    <section class="margin">
      <a class="sg-header8" href="<?php bloginfo('url'); ?>/press">Press</a>
       <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
      <a class="sg-header8" href="<?php bloginfo('url'); ?>/press/videos">Videos</a>
       <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
      <a class="sg-header8 dim title" href="<?php the_permalink()?>"><?php the_title() ?></a>
  </section>
  </div>
</div>

<div class="single-video">

    <?php
        $iframe = get_field('video');
        preg_match('/src="(.+?)"/', $iframe, $matches);
        $src = $matches[1];
        $params = array(
            'controls'    => 0,
            // 'hd'        => 1,
            'autohide'    => 1,
            'rel' => 0
        );
        $new_src = add_query_arg($params, $src);
        $iframe = str_replace($src, $new_src, $iframe);
        $attributes = 'frameborder="0"';
        $iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);
        echo $iframe;
    ?>
  <div class="sg-title">
    <div class="max-width">
        <div class="margin single-vid-title">
            <h3 class="sg-header3"><?php the_title() ?></h3>
            <a target="_blank" href="<?php
                preg_match('/src="(.+?)"/', get_field('video'), $matches_url );
                $src = $matches_url[1];
                $vidId = substr($src, 30, 11);
                $link = 'https://www.youtube.com/watch?v=' . $vidId;
                echo $link;
             ?>">Watch on YouTube</a>
        </div>
    </div>

  </div>
</div>
<div class="single-hr"></div>

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
          <img src="https://img.youtube.com/vi/<?php echo $id; ?>/mqdefault.jpg">
            <a href="<?php the_permalink()?>">
             <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/play.png" />
            </a>
        </div>
        <div class="info">
          <p class="title sg-title"><?php the_title(); ?></p>
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
$footer_email="Press@Zocdoc.com";
include( get_template_directory() . '/footer.php');
?>

</main>
