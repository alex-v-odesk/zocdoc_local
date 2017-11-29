<?php
/*
Template Name: Landing Page
*/
?>
<?php get_header(); ?>

<?php $bg_color = get_field('background-color'); ?>


<main id="landing-page" class="main-container" style="background-color:<?php the_field('background_color'); ?>">

  <div class="content-editor-text">
    <!-- for full width -->

    <div class="max-width">
      <div class="margin">
        <div class="top">
        <?php the_content(); ?>
        </div>
      </div>
    </div>
  </div>

</main>
  <?php
    $noCTA = true; //comment this out to get the cta footer (pink background with three CTAs)
    include( get_template_directory() . '/footer.php');
  ?>
