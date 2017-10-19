<?php get_header()?>
<main class="main-content">
<div class="questions max-width">
<div class="margin">
<div class='question-parent'>

  <p class="sg-para1 question">
    <?php the_title()?>
    <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/down_arrow.png" />
  </p>
  <p class="sg-para1 answer">
    <?php while (have_posts()) : the_post(); ?>
      <?php the_content(); ?>
    <?php endwhile; ?>
  </p>
</div>
</div>
</div>
</main>