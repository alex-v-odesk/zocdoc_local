<?php

  // server about page if no cta found and if not faq
  if(!have_rows('ctas') && empty($faq)){
    $page = get_page_by_title( 'About' );
    $id = $page->ID;
  }
  else if(!empty($faq)){
    $page = get_page_by_title( 'FAQ' );
    $id = $page->ID;
  }
  else{
    $id = $post->ID;
  }
?>
<div class="end-banner">
  <section class="">
    <div class="">
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
    </div>
  </section>
</div>