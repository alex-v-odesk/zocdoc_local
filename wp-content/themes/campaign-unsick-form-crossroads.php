<?php
/*
Template Name: Campaigns / Unsick / Crossroads
*/

require_once('campaign-unsick-header.php'); 
?>


<main>
    
    <section class="bg_blue margin_top_60">
        <div class="section_wrapper ">
            <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                <article id="crossroads">
                    <?php the_content(); ?>
                </article>
                <div class="cols clearfix" >
                    <div class="col">
                        <a class="btn" href="/about/campaigns/unsick-employer">I’m Ready to Sign Up</a>
                    </div>
                    <div class="col">
                        <a class="btn" id="btn_popover" >I Need to Learn More</a>
                    </div>
                </div>
            <?php endwhile; endif; ?>
        </div>
    </section>
    
</main>

<div class="popover bg_blue form_with_thanks">
    <div class="form">
        <div class="section_wrapper section_grid">
            <div class="grid">
                <div class="col col_2 form_copy">
                	<p>If you need to learn more about Unsick Day at your company, we’d be more than happy to talk to you. Send us your contact info, and we’ll send you the information you need.</p>
                </div>
                <div class="col col_2">
                    <?php echo do_shortcode(get_field('contact_form_shortcode')); ?>
                </div>
            </div>
        </div>
    </div>
    <div class="form_thanks">
    	<?=get_field('response_message') ?>
    </div>
    <div class="popover_dismiss"></div>
</div>


<div class="popover_onionskin"></div>


<?php require_once('campaign-unsick-footer.php'); ?>