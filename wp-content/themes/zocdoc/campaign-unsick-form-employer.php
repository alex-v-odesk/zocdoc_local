<?php
/*
Template Name: Campaigns / Unsick / Employer Form
*/

require_once('campaign-unsick-header.php'); 
?>
<main>    
    <section class="bg_blue margin_top_60">
        <div class="section_wrapper section_grid">
            <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                <div class="grid">
                    <div class="col col_2 form_copy">
                        <?php the_content(); ?>
                    </div>
                    <div class="col col_2">
                        <?php echo do_shortcode(get_field('contact_form_shortcode')); ?>
                    </div> 
                </div>
            <?php endwhile; endif; ?>
        </div>
    </section>
</main>



<?php require_once('campaign-unsick-footer.php'); ?>