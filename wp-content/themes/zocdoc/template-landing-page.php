<?php
/*
Template Name: Landing Page
*/
?>
<?php get_header(); ?>


<main class="main-container">



    <section class="margin">
      
    </section>




<div class="content-editor-text">
  <div class="max-width">
    <div class="margin">
      <div class="top">
      <?php the_content(); ?>
      </div>
    </div>
  </div>



<?php function TEMPLATE_HEADER() {
  // global $post;
?>

<div style="background-color: <?php the_sub_field('header_color') ?>; background-image: url(<?php the_sub_field('image_image')?>)" id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>" class="banner template link-el">
  <div class="inner max-width">
    <div class="copy margin">
      <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>
      <h4 class="sg-header4-sp"><?php the_sub_field('main_templ_text') ?></h4>
      <h5 class="sg-para1"><?php the_sub_field('secondary_text') ?></h5>
      <?php
      if (get_sub_field('button_text'))
        echo "<a class='sg-btn sg-btn-med' style='background-color: ".get_sub_field('header_button_color')."' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
      ?>
    </div>
  </div>
</div>
<?php } ?>


<?php function VIDEO() {
  // global $post;
?>
<div class="template-video link-el" id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>">
  <div class="image" style="background-image:url(https://img.youtube.com/vi/<?php echo getYoutubeThumb(get_sub_field('video')); ?>/maxresdefault.jpg)"></div>
  <div class="max-width">
    <div class="margin copy">
      <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>

      <h4 class="sg-para1"><?php the_sub_field('secondary_text') ?></h4>
      <a id="template-play" class="sg-btn-secondary sg-btn-med">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 10.9 12.6" style="enable-background:new 0 0 10.9 12.6;" xml:space="preserve">
          <style type="text/css">
            .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#11254A;}
          </style>
          <polygon class="st0" points="10.9,6.3 0,12.6 0,0 "/>
        </svg>
        <p><?php the_sub_field('button_text') ?></p>
      </a>
    </div>
  </div>
  <?php
  $iframe = get_sub_field('video');
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
</div>
<?php } ?>

<?php function TEXT_W_FORM() {
  // global $post;
?>
<div class="text-w-form link-el" id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>">
  <div class="max-width">
    <div class="margin">
      <div class="yellow-bg"></div>
      <div class="copy">
        <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>
        <h4 class="sg-para1"><?php the_sub_field('main_templ_text') ?></h4>
      </div>
      <div class="form">
        <?php the_sub_field('form') ?>
      </div>
    </div>
  </div>
</div>
<?php } ?>

<?php function TEXT() {
  // global $post;
?>
<div class="template-text link-el" id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>">
  <div class="max-width">
    <div class="margin">
      <div class="top">
        <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>
        <h4 class="sg-header4"><?php the_sub_field('secondary_text') ?></h4>
        <?php if (get_sub_field('button_text')): ?>
        <a class="sg-btn sg-btn-med" ><?php the_sub_field('button_text') ?></a>
        <?php endif ?>
      </div>
      <div class="bottom">
        <h6 class="sg-para1"><?php the_sub_field('main_templ_text') ?></h6>
      </div>
    </div>
  </div>
</div>
<?php } ?>


<?php function FORM() {
  // global $post;
?>
<div class="template-form link-el" id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>">
 <div class="max-width">
   <div class="margin">
      <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>
      <?php the_sub_field('form') ?>
    </div>
  </div>
</div>
<?php } ?> 




      <?php //Call to actions
      if (have_rows('ctas', $id)):
        while (have_rows('ctas', $id)) : the_row();?>
          <article>
            <p class="sg-header4"><?php the_sub_field('caption_text');?></p>
            <img src="<?php the_sub_field('cta_graphic')?>">
            <a class="sg-btn-med" href="<?php the_sub_field('link') ?>"><?php the_sub_field('link_label');?></a>
          </article>
      <?php endwhile;
      else:
        // no rows
      endif;
      ?>



<?php function ICONS() {
  // global $post;
?>
<div class="end-banner-template link-el <?php
  echo 'r'.get_sub_field('row_length');
?>" id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>">
  <section class="max-width">
    <div class="margin">
      <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>
      <h3><?php the_sub_field('secondary_text') ?></h3>
      <div class="rows">
      <?php if( have_rows('icons') ):
        while ( have_rows('icons') ) : the_row(); ?>
      <article>
        <?php the_sub_field('icon_header');?>
        <img src="<?php the_sub_field('icon')?>">
        <?php the_sub_field('icon_text');?>
      </article>
      <?php
        endwhile;
        endif;
      ?>
      </div>
    </div>
  </section>
</div>
<?php } ?>

<?php
  $noCTA = true;
  include( get_template_directory() . '/footer.php');
?>
</main>
