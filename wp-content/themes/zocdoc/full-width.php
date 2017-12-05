<?php
/*
Template Name: Full Width
*/
?>
<?php get_header(); ?>


<main class="main-container>

  <div class="top">
    <?php the_content(); ?>
  </div>


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


<?php
  $noCTA = true;
  include( get_template_directory() . '/footer.php');
?>
</main>
