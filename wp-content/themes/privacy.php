<?php
/*
*Template Name: Privacy
*/
?>
<?php get_header(); ?>

<main class="main-container">

<?php /*
<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>">Home</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="dim sg-header8" href="<?php bloginfo('url'); ?>/privacy">Privacy</a>
  </section>
  </div>
</div>
*/?>

<?php
$pages = get_pages(array(
  'meta_key' => '_wp_page_template',
  'meta_value' => 'privacy.php',
  'sort_order' => 'DESC'
));
$sections = array();
foreach($pages as $page){
   $obj = array();
   $obj["title"] = $page->post_title;
   $obj["slug"] = $page->post_name;
   $sections[] = $obj;
}

?>

<div class="page-links-bar privacy-bar sticky-bar">
<div class="max-width">
  <section class="margin">

    <div class="links-row">
        <div class="links-parent">
        <?php
          for ($x = 0; $x < count($sections); $x++) {
            $section = $sections[$x];
            $class = "";
            $url = get_bloginfo('url');
            if($x >= 2) $class = "hide-link";
            if($section["title"] == get_the_title()) $class = $class . " selected";
            echo '<a class="'.$class.'" href="'.$url.'/'.$section["slug"].'">'.$section["title"].'</a><div class="line"></div>';
        } ?>
          <a class="more-link">more</a>
        </div>
    </div>
    <div class="links-row">
        <div class="links-parent">
          <?php
          for ($x = 2; $x < count($sections); $x++) {
            $section = $sections[$x];
            $url = get_bloginfo('url');
            $class = "";
            if($section["title"] == get_the_title()) $class = $class . " selected";
            // $link = str_replace(' ', '_', strtolower($section));
            echo '<a class="'.$class.'" href="'.$url.'/'.$section["slug"].'">'.$section["title"].'</a><div class="line"></div>';
        }?>
        </div>
    </div>


  </section>
  </div>
</div>



<div class="privacy max-width">
<div class="margin">


<div class="content-parent">

    <section>
      <h2 class="sg-header2"><?php the_title(); ?></h2>
      <div class="preamble">
          <p class="sg-header7"><?php the_field('effective_date') ?></p>
          <p class="sg-header8"><?php the_field('privacy_preamble') ?></p>
      </div>
    </section>

    <div class="content">
    <?php

  while (have_posts()) : the_post();
    the_content();
  endwhile;
?>
    </div>

</div>
</div>
</div>
</main>



<?php
  $noCTA = true;
  include( get_template_directory() . '/footer.php');
?>