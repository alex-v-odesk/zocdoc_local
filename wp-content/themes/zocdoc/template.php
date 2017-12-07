<?php
/*
Template Name: Template
*/
?>
<?php get_header(); ?>
  <?php
    if (have_rows('module')):
      $sections = array();
      $count = 0;
      while(have_rows('module')):the_row();
        $section = get_sub_field('menu_title');
        $sectionId = $count;
        $count++;
        if(!empty( $section )) {
          $sectionObj = array();
          // $sections[$sectionId] = $section;
          $sectionObj['section']= $section;
          $link = get_sub_field('navigation_link');
          $sectionObj['link'] = null;
          if(!empty( $link )){
            $sectionObj['link']= $link;
          }
          array_push($sections,$sectionObj);
        }
        wp_reset_postdata();
      endwhile;
    else:
      //no rows
    endif;
    wp_reset_query();
  ?>

<main class="main-container <?php
    if (count($sections) == 0) {
      echo 'no-pad';
    }
  ?>">

  <div class="page-links-bar template sticky-bar smooth sticky-mobile <?php
    if (count($sections) == 0) {
      echo 'hide-bar';
    }
  ?>">
  <div class="max-width">
    <section class="margin">
      <div class="links-row">
        <div class="links-parent">
  				<?php
  					foreach ($sections as $x => $value) {
  						$section = $sections[$x]['section'];
  						$class = "";
              $lineClass = "line";
              if($x >= 3) $lineClass = "line hide-line";
  						if($x >= 3) $class = "hide-link";
  						$link = str_replace(' ', '_', $section);
              if($sections[$x]['link'] != null){
                $link = $sections[$x]['link'];
                echo '<a class="'.$class.'" href="'.$link.'">'.$section.'</a><div class="'.$lineClass.'"></div>';
              }
              else{
  							echo '<a class="'.$class.'" data-tag="'.$link.'">'.$section.'</a><div class="'.$lineClass.'"></div>';
              }
  				} ?>
         <?php if (count($sections) > 3) : ?>
          <a class="more-link">more</a>
        <?php endif ?>
        </div>
      </div>
      <?php if (count($sections) > 3) : ?>
      <div class="links-row">
        <div class="links-parent">
  				<?php
  					foreach ($sections as $x => $value) {
              if ($x > 2 && $x <= 6) {
                $section = $sections[$x]['section'];
                $class = "";
                $link = str_replace(' ', '_', strtolower($section));
                if($sections[$x]['link'] != null){
                  $link = $sections[$x]['link'];
                  echo '<a class="'.$class.'" href="'.$link.'">'.$section.'</a><div class="line"></div>';
                }
                else {
                  echo '<a class="'.$class.'" data-tag="'.$link.'">'.$section.'</a><div class="line"></div>';
                }
              }

  				} ?>
  			</div>
      </div>
      <?php endif ?>
      <?php if (count($sections) > 7) : ?>
      <div class="links-row">
        <div class="links-parent">
          <?php
            foreach ($sections as $x => $value) {
              if ($x > 6 && $x <= 10) {
                $section = $sections[$x]['section'];
                $class = "";
                $link = str_replace(' ', '_', strtolower($section));
                if($sections[$x]['link']){
                  $link = $sections[$x]['link'];
                  echo '<a class="'.$class.'" href="'.$link.'">'.$section.'</a><div class="line"></div>';
                }
                else {
                  echo '<a class="'.$class.'" data-tag="'.$link.'">'.$section.'</a><div class="line"></div>';
                }
              }
            }
          ?>
        </div>
      </div>
    <?php endif ?>
    <?php if (count($sections) > 11) : ?>
      <div class="links-row">
        <div class="links-parent">
          <?php
            foreach ($sections as $x => $value) {
              if ($x > 10) {
                $section = $sections[$x]['section'];
                $class = "";
                $link = str_replace(' ', '_', strtolower($section));
                if($sections[$x]['link']){
                  $link = $sections[$x]['link'];
                  echo '<a class="'.$class.'" href="'.$link.'">'.$section.'</a><div class="line"></div>';
                }
                else {
                  echo '<a class="'.$class.'" data-tag="'.$link.'">'.$section.'</a><div class="line"></div>';
                }
              }
            }
          ?>
        </div>
      </div>
      <?php endif ?>
    </section>
    </div>
  </div>


<div class="content-editor-text">
  <div class="max-width">
    <div class="margin">
      <div class="top">
      <?php the_content(); ?>
      </div>
    </div>
  </div>

<?php



if( have_rows('module') ):
    while ( have_rows('module') ) : the_row();
        $type = get_sub_field('type');
        if($type == "Header"){
          TEMPLATE_HEADER();
        }
        if($type == "Video"){
          VIDEO();
        }
        if($type == "Text with form"){
          TEXT_W_FORM();
        }
        if($type == "Text"){
          TEXT();
        }
        if($type == "Form"){
          FORM();
        }
        if($type == "Icons"){
          ICONS();
        }
    endwhile;
else :
endif;
?>

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
            <img src="<?php the_sub_field('cta_graphic')?>" title="cta graphic" alt="cta graphic">
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
        <img src="<?php the_sub_field('icon')?>" title="icon image" alt="icon image">
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
