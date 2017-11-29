<?php
/*
Template Name: Landing Page
*/
?>
<?php get_header(); ?>

<?php $headline = get_field('headline'); 
$subheadline = get_field('subheadline');
$form = get_field('form');
?>


<main id="landing-page" class="main-container" style="background-color:<?php the_field('background_color'); ?>">

  <div class="content-editor-text">
    <!-- for full width -->

    <div class="max-width">
      <div class="margin">
        <div class="top">
          <h1><?php echo $headline; ?></h1>
          <h2><?php echo $subheadline; ?></h2>
          <div><?php echo $form; ?></div>
        </div>
      </div>
    </div>
  </div>

</main>
  <?php
    $noCTA = true; //comment this out to get the cta footer (pink background with three CTAs)
    include( get_template_directory() . '/footer.php');
  ?>
