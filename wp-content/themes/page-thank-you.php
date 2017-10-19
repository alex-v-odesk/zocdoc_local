<?php
/*
Template Name: Confirmation Page
*/
?>

<?php get_header('header2'); ?>
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

<style type="text/css">
  .confirmation {
      min-height: 400px;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      padding: 7em 0 7em 0;
  }
  .sg-header2 {
    margin-bottom:15px;
  }
  /*button*/
  .prov-btn{
    margin-top:45px;
  }
  .prov-btn-container{
    width:90vw;
    margin: 0 auto;
  }
  .sg-prov-btn{
      min-width: 20px;
      display: inline-block;
      text-align: center;
      cursor: pointer;
    color: #00234b;
    background-color: #fff04b;
  }
  .sg-prov-btn:hover{
    background-color: #00234b;
    color: #fff04b;
  }
</style>

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

if( have_rows('confirmation_page') ):
    while ( have_rows('confirmation_page') ) : the_row();
        $type = get_sub_field('type');
        if($type == "Default"){
          TEMPLATE_HEADER();
        }
    endwhile;
else :
endif;
?>

<?php function TEMPLATE_HEADER() {
?>
<div id="<?php
$title = get_sub_field('menu_title');
echo str_replace(' ', '_', $title);
 ?>" class="confirmation link-el">
  <div class="inner max-width">
    <div class="copy margin">
      <img src="<?php the_sub_field('logo') ?>" alt="">
      <h2 class="sg-header2"><?php the_sub_field('header') ?></h2>
      <h5 class="sg-para2"><?php the_sub_field('body_copy') ?></h5>
      <?php
      if (get_sub_field('button_text'))
        echo "<a class='sg-prov-btn sg-btn-med prov-btn' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
      ?>
    </div>
  </div>
</div>
<?php } ?>

<?php
  $noCTA = true;
  include( get_template_directory() . '/footer-desktop-confirmation.php');
?>
</main>