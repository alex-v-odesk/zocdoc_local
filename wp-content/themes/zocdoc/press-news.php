<?php
/*
*	Template Name: Press/Press Releases
*/
?>
<?php get_header(); ?>

<main class="main-container">

<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/press">Press</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="dim sg-header8" href="<?php bloginfo('url'); ?>/press/news">News</a>
  </section>
  </div>
</div>

<?php /* press releases */ ?>
<div id="press_releases" class="press-releases-header max-width">
  <h2 class="margin sg-header2">News</h2>
</div>


<?php
  function posts_by_year() {
    // array to use for results
    $years = array();
    // get posts from WP
    $posts = get_posts(array(
      'numberposts' => -1,
      'post_type' => 'Press_Releases',
      'post_status' => 'publish',
      'meta_query' => array(
        'relation' => 'OR',
        array(
          'key' => 'dont_show',
          'value' => true,
          'compare' => '!=',
        ),
        array(
          'key' => 'dont_show',
          'compare' => 'NOT EXISTS',
        ),
      ),
      'meta_key' => 'date',
      'orderby' => 'meta_value_num',
      'order' => 'DESC',
    ));
    // loop through posts, populating $years arrays
    foreach($posts as $post) {
      $year = DateTime::createFromFormat("Ymd", $post->date)->format('Y');
      $years[$year][] = $post;
    }
    // reverse sort by year
    krsort($years);
    return $years;
  }
  foreach(posts_by_year() as $year => $posts) :
      echo '<div class="year max-width"><h5 class="year-text sg-header5 margin">'.$year.'</h5><div class="posts margin">';
      foreach($posts as $post): setup_postdata($post);?>
      <div class="post">
          <p class="sg-title date">
            <?php the_field('date') ?>
          </p>
          <p class="sg-title title">
           <?php the_title()?>
          </p>
          <div class="sg-title more">
            <a href="<?php the_permalink() ?>">Read more</a>
          </div>
          </div>
        <?php endforeach;
        echo '</div></div><div class="all-hr"></div>';
  endforeach;
?>

<?php
$footer_text="Need to contact our press department?";
$footer_email="Press@Zocdoc.com";
include( get_template_directory() . '/footer.php');
?>

</main>
