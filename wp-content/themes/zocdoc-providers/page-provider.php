<?php
/*
Template Name: Provider template
*/
?>

<?php get_header('provider-header'); ?>
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

<div class="page-links-bar template sticky-bar smooth sticky-mobile provider-nav <?php
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
            if($x >= 2) $lineClass = "line hide-line";
            if($x >= 2) $class = "hide-link";
            $link = str_replace(' ', '_', $section);
            if($sections[$x]['link'] != null){
              $link = $sections[$x]['link'];
              echo '<a class="'.$class.'" href="'.$link.'">'.$section.'</a><div class="'.$lineClass.'"></div>';
            }
            else{
              echo '<a class="'.$class.'" data-tag="'.$link.'">'.$section.'</a><div class="'.$lineClass.'"></div>';
            }
        } ?>
       <?php if (count($sections) > 2) : ?>
        <a class="more-link">more</a>
      <?php endif ?>
      </div>
    </div>
    <?php if (count($sections) > 2) : ?>
    <div class="links-row">
      <div class="links-parent">
        <?php
          foreach ($sections as $x => $value) {
            if ($x > 1 && $x <= 6) {
              $section = $sections[$x]['section'];
              $class = "";
              $link = str_replace(' ', '_', $section);
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
<?php

if( have_rows('module') ):
    while ( have_rows('module') ) : the_row();
        $type = get_sub_field('type');
        if($type == "Header"){
          TEMPLATE_HEADER();
        }
        if($type == "Text with image"){
          TEXT_W_IMAGE();
        }
        if($type == "Why join"){
          WHY_JOIN();
        }
        if($type == "Text"){
          TEXT();
        }
        if($type == "How do I join"){
          JOIN_INFO();
        }
        if($type == "Video"){
          VIDEO();
        }
        if($type == "Icons"){
          ICONS();
        }
    endwhile;
else :
endif;
?>
<!-- header -->
<?php function TEMPLATE_HEADER() {
?>
<div id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>" class="providers-header link-el">
  <div class="inner max-width">
    <div class="copy margin">
      <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>
      <h5 class="sg-para2"><?php the_sub_field('secondary_text') ?></h5>
      <?php
      if (get_sub_field('button_text'))
        echo "<a class='sg-prov-btn sg-btn-med prov-btn' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
      ?>
    </div>
    <div class="container">
      <div class="logo-slide">
        <?php if( have_rows('logo_carousel') ): ?>
        <?php while( have_rows('logo_carousel') ): the_row(); 
          //vars
          $image = get_sub_field('logo_image');
        ?>
          <div class="logo-panel"><img src="<?php echo $image; ?>" alt="logo slide" title="logo slide" /></div>
        <?php endwhile; ?>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>
<?php } ?>
<!-- text w/ iamge -->
<?php function TEXT_W_IMAGE() {
?>
<div id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>" class="providers-text-image link-el">
  <div class="inner max-width">
    <div class="copy margin">
      <h2 class="sg-header3" style="text-align: center;"><?php the_sub_field('title') ?></h2>
      <div class="text-w-image-container wrap-reverse">
        <div class="text-w-image prov-text">
          <h5 class="sg-header7"><?php the_sub_field('text_left_hed') ?></h5>
          <h5 class="sg-para3"><?php the_sub_field('text_left_paragraph') ?></h5>
        </div>
        <div class="text-w-image">
          <img src="<?php the_sub_field('image_right') ?>" alt="right aligned image" title="right aligned image">
        </div>
      </div>
      <div class="text-w-image-container wrap">
        <div class="text-w-image">
          <img src="<?php the_sub_field('image_left') ?>" alt="left aligned image" title="left aligned image">
        </div>
        <div class="text-w-image prov-text">
          <h5 class="sg-header7"><?php the_sub_field('text_right_hed') ?></h5>
          <h5 class="sg-para3"><?php the_sub_field('text_right_paragraph') ?></h5>
        </div>
      </div>
    </div>
    <div style="width:100%; text-align: center;">
      <?php
    if (get_sub_field('button_text'))
      echo "<a class='sg-prov-btn sg-btn-med prov-btn' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
      ?>
    </div>
  </div>
</div>
<?php } ?>
<!-- why join -->
<?php function WHY_JOIN() {
?>
<div id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>" class="providers-header link-el">
  <div class="inner max-width">
    <div class="copy margin">
      <h2 class="sg-header3" style="text-align: center;"><?php the_sub_field('title') ?></h2>
      <div class="why-join-container">
        <?php if( have_rows('why_join_text') ): ?>
          <?php while( have_rows('why_join_text') ): the_row(); 
            //vars
            $hed = get_sub_field('join_hed');
            $dek = get_sub_field('join_dek');
          ?>
          <div class="why-join-blurb">
            <h5 class="sg-header7" style="padding-bottom:20px;"><?php echo $hed; ?></h5>
            <h5 class="sg-para3"><?php echo $dek; ?></h5>
          </div>
          <?php endwhile; ?>
        <?php endif; ?>
      </div>
      <div class="why-join-container">
        <?php if( have_rows('why_join_icons') ): ?>
          <?php while( have_rows('why_join_icons') ): the_row(); 
            //vars
            $hed = get_sub_field('icon_hed');
            $image = get_sub_field('icon_image');
            $dek = get_sub_field('icon_dek');
          ?>
          <div class="why-join-icon">
            <h5 class="sg-header7 icon-header"><?php echo $hed; ?></h5>
            <img src="<?php echo $image; ?>" title="why join image" alt="why join image">
            <h5 class="sg-para3 icon-dek"><?php echo $dek; ?></h5>
          </div>
          <?php endwhile; ?>
        <?php endif; ?>
      </div>
    </div>
    <div style="width:100%; text-align: center; padding:50px 0 50px 0;">
      <?php
    if (get_sub_field('button_text'))
      echo "<a class='sg-prov-btn sg-btn-med prov-btn' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
      ?>
    </div>
  </div>
</div>
<?php } ?>
<!-- why join-->
<?php function JOIN_INFO() {
?>
<div id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>" class="providers-text-image link-el">
  <div class="inner max-width">
    <div class="copy margin">
      <h2 class="sg-header3" style="text-align: center;"><?php the_sub_field('title') ?></h2>
      <div class="join-text-container">
        <?php if( have_rows('how_to_join') ): ?>
          <?php while( have_rows('how_to_join') ): the_row(); 
            //vars
            $bullet = get_sub_field('join_text_left');
            $image = get_sub_field('join_blob_background');
            $price = get_sub_field('join_price');
            $blurb = get_sub_field('join_blurb');
          ?>
          <div class="join-row">
            <div class="join-text-left" style="background-image:url('<?php echo $image; ?>'); ">
              <span><h5 class="sg-para2 icon-header"><style>p:nth-child(2){ font-size:27px;}</style><?php echo $bullet; ?></h5></span>
            </div>
            <div class="join-text-right">
              <h5 class="sg-header1 icon-header"><?php echo $price; ?></h5>
              <h6 class="sg-header7 icon-dek"><?php echo $blurb; ?></h5>
            </div>
          </div>
          <?php endwhile; ?>
        <?php endif; ?>
      </div>
    </div>
    <div style="width:100%; text-align: center;">
      <?php
    if (get_sub_field('button_text'))
      echo "<a class='sg-prov-btn sg-btn-med' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
      ?>
    </div>
  </div>
</div>
<?php } ?>
<!-- video -->
<?php function VIDEO() {
?>
<div id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>" class="template-video link-el">
  <div class="inner">
    <div class="image" style="background-image:url(https://img.youtube.com/vi/<?php echo getYoutubeThumb(get_sub_field('provider_video')); ?>/maxresdefault.jpg)"></div>
  </div>
  <div class="max-width video-container">
    <div class="margin copy video-text">
      <h2 class="sg-header2"><?php the_sub_field('title') ?></h2>
      <a id="template-play" class="sg-prov-btn sg-btn-med">
        <?php the_sub_field('button_text') ?>
<!--         <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 10.9 12.6" style="enable-background:new 0 0 10.9 12.6;" xml:space="preserve">
          <style type="text/css">
            .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#11254A;}
          </style>
          <polygon class="st0" points="10.9,6.3 0,12.6 0,0 "/>
        </svg> -->
      </a>
    </div>
  </div>
  <?php
  $iframe = get_sub_field('provider_video');
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

<!-- footer -->
<?php
  include( get_template_directory() . '/footer-provider.php');
?>
</main>