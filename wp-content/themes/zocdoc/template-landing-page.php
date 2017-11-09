<?php
/*
Template Name: Landing Page
*/
?>
<?php get_header(); ?>


<main class="main-container">


  <div class="content-editor-text">
    <div class="max-width">
      <div class="margin">
        <div class="top">
        <?php the_content(); ?>
        </div>
      </div>
    </div>










<?php
  $noCTA = true; //comment this out to get the cta footer (pink background with three CTAs)
  include( get_template_directory() . '/footer.php');
?>
</main>
