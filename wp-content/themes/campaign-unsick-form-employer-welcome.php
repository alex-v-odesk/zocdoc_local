<?php
/*
Template Name: Campaigns / Unsick / Employer Welcome
*/

require_once('campaign-unsick-header.php'); 
?>

<?php if (have_posts()): while (have_posts()) : the_post(); ?>

    <main>    
        <section class="bg_blue margin_top_60">
            <div class="section_wrapper section_grid">
                <div class="grid">
                    <div class="col col_2 form_copy">
                        <?php the_content(); ?>
                        <div class="unsick_days_counter"><!-- do not rename this, we use it elsewhere -->
                            <p class="count">15,327</p>
                            <p class="tiny">Unsick Days Granted To Date</p>
                        </div>
                    </div>
                    <div class="col col_2">
                        <!-- Simon: don't do this dropzone thing until I find out what it's for.
                             I think it might be another boondoggle. -->
                        <div style="padding:20px; background-color:white; border-radius:15px; color:red; text-align:center; margin-bottom:2em;">
                            logo dropzone
                            <br>
                            eric has questions first
                        </div>
                        <p>Please drag and drop a .jpg or .png smaller than 2MB.</p>
                        <a class="btn" id="btn_popover" >Open Your Starter Kit</a>
                    </div> 
                </div>
            </div>
        </section>
    </main>
    
    		
    <div class="popover bg_blue">
        <h2>Your celebratory Starter Kit</h2>
        <p>You’re already awesome for supporting Unsick Day. As a little thank you from us, download some cool stuff to your device.</p>
        <ul id="downloadable_assets">
            <?php if( $assets = get_field('assets') ) foreach( $assets AS $asset ) : ?>
                <li>
                    <a class="btn" href="<?php echo( $asset['file'] ); ?>"><?php echo( $asset['name'] ); ?></a>
                </li>
            <?php endforeach; ?>
        </ul>
        <div class="popover_dismiss"></div>
    </div>

    <div class="popover_onionskin"></div>

<?php endwhile; endif; ?>

<?php require_once('campaign-unsick-footer.php'); ?>