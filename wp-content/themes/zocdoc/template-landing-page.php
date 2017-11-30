<?php
/*
Template Name: Landing Page
*/
?>
<?php get_header(); ?>

<?php 
$hero_icon = get_field('hero_icon');
$headline = get_field('headline', false, false); 
$subheadline = get_field('subheadline', false, false);
$body_copy = get_field('body_copy', false, false);
$form = get_field('form');
?>


<main id="landing-page" class="main-container" style="background-color:<?php the_field('background_color'); ?>">
  <div class="max-width">
    <div class="margin">
      <div class="top">
        <img src="<?php echo $hero_icon; ?>">
        <h1 class="hero-text"><?php echo $headline; ?></h1>
        <h2 class="hero-text"><?php echo $subheadline; ?></h2>
        <p class="body-copy hero-text"><?php echo $body_copy; ?></p>
        <div class="form-embed">
          <?php echo $form; ?>
        </div>
      </div>
    </div>
  </div>
</main>

  <?php
    $noCTA = true; //comment this out to get the cta footer (pink background with three CTAs)
    include( get_template_directory() . '/footer.php');
  ?>
