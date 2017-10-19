<?php
/*
Template Name: Campaigns / Unsick / Employee Form
*/

require_once('campaign-unsick-header.php'); 
?>

<main>
    
    <section class="bg_blue margin_top_60">
        <div class="section_wrapper section_grid form_with_thanks">
            <?php if (have_posts()): while (have_posts()) : the_post(); ?>

                <div class="form">
                    <div class="grid">
                        <div class="col col_2 form_copy">
                            <?php the_content(); ?>
                        </div>
                        <div class="col col_2">
                            <?php echo do_shortcode(get_field('contact_form_shortcode')); ?>
                        </div> 
                    </div>
                </div>

                <div class="form_thanks">
                    <div class="grid">
                        <div class="col col_2 form_copy">
                            <p>Thank you for your help! We’ll be sending you a confirmation email. We’re one step closer to making Unsick Day a reality. Keep spreading the word.</p>
                        </div>
                        <div class="col col_2">
                            <h3>Tell the world</h3>
                            <ul id="share_buttons">
                                <li>
                                    <a href="mailto:?subject=Unsick%20Day&body=<?php echo urlencode('http://unsickdat.com'); ?>">
                                        <img src="/wp-content/themes/zocdoc/assets/campaigns/unsick/btn_mail.svg">
                                    </a>
                                </li>
                                <li id="btn_linkedin">
                                    <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode('http://unsickday.com')?>&title=Unsick%20Day&summary=<?php echo urlencode('Check out Unsick Day.')?>&source=<?php echo urlencode('http://unsickday.com')?>">
                                        <img src="/wp-content/themes/zocdoc/assets/campaigns/unsick/btn_linkedin.svg">
                                    </a>
                                </li>
                                <li id="btn_twitter">
                                    <a target="_blank" href="https://twitter.com/intent/tweet?original_referer=<?php echo urlencode('http://unsickday.com')?>&source=tweetbutton&text=<?php echo urlencode('Check out Unsick Day.')?>%20<?=urlencode('http://unsickday.com')?>" target="_blank">
                                        <img src="/wp-content/themes/zocdoc/assets/campaigns/unsick/btn_twitter.svg">
                                    </a>
                                </li>
                                <li id="btn_facebook">
                                    <a target="_blank" href="http://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode('http://unsickday.com')?>&t=<?php echo urlencode('Check out Unsick Day.')?>%20<?=urlencode('http://unsickday.com')?>">
                                        <img src="/wp-content/themes/zocdoc/assets/campaigns/unsick/btn_facebook.svg">
                                    </a>
                                </li>
                            </ul>
    
                            <div class="unsick_days_counter">
                                <p class="count">15,327</p>
                                <p class="tiny">Unsick Days Granted To Date</p>
                            </div>
                        </div> 
                    </div>
                </div>

            <?php endwhile; endif; ?>
        </div>
    </section>

    
</main>


<?php require_once('campaign-unsick-footer.php'); ?>