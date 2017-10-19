<?php
/*
Template Name: Contact
*/
?>
<?php get_header(); ?>

<main class="main-container">

<div style="background-image: url(<?php the_field('header_image')?>)" class="banner contact clear-header">
	<div class="inner max-width">
		<div class="copy margin">
			<h1 class="sg-header1"><?php the_field('header_title')?></h1>
			<h5 class="sg-header5"><?php the_field('header_text')?></h5>
		</div>
	</div>
</div>

<!--
<div class="contact-methods max-width">
    <div class="margin">
        <section>
        	<h4 class="sg-header4">Email</h4>
        	<a href="mailto:<?php the_field('email')?>" class="sg-btn-med"><?php the_field('email')?></a>
        </section>
        
        <section>
        	<h4 class="sg-header4">Phone</h4>
        	<a href="tel:<?php the_field('phone')?>" class="sg-btn-med"><?php the_field('phone')?></a>
        </section>
        
    	<?php if(have_rows('social')):?>
    		<section class="social">
    			<h4 class="sg-header4">Social</h4>
    			<?php while (have_rows('social')): the_row();?>
    				<a style="background-image: url(<?php the_sub_field('social_icon');?>)" href="<?php the_sub_field('social_link')?>"></a>
    			<?php endwhile;?>
    		</section>
    	<?php else: ?>
    		<?php /*No rows*/ ?>
    	<?php endif;?>
    </div>
</div>

<div class="fields max-width">
    <div class="margin">
    	<h4 class="sg-header4 replace" id="replace">Send a message</h4>
    	<div class="form" id="message-form">
    			<div data-test="name-row" class="name-row">
    				<section>
    	      	<label for="FirstName">first</label>
    	      	<input class="mesage-input" autocomplete="off" data-placeholder="First" data-test="contactus-first-name" id="FirstName" name="FirstName" type="text" value="" />
          	</section>
    
          	<section>
    					<label for="LastName">last</label>
    	      	<input class="mesage-input" autocomplete="off" data-placeholder="Last" data-test="contactus-last-name" id="LastName" name="LastName" type="text" value="" />
          	</section>
    
          	<section>
    	  			<label for="Email">email</label>
    	      	<input class="mesage-input" data-test="contactus-email" id="Email" name="Email" requiredvalue="" type="text" value="" />
          	</section>
    
          </div>
          <div data-test="subject-row" class="subject-row">
          	<section>
    	        <label for="Subject">subject</label>
    					<input class="mesage-input" data-test="contactus-subject" id="Subject" name="Subject" requiredvalue="" type="text" value="" />
    				</section>
          </div>
          <div class="message-row">
          <section>
    					<label for="Message">message</label>
    					<textarea class="mesage-input" cols="10" data-placeholder="" data-test="contactus-message" id="Message" name="Message" rows="4"></textarea>
    				</section>
    			</div>
    			<div class="error-message">
    			</div>
        	<div class="submit-row">
    			  <button id="send" class="sg-btn-med">submit message now</button>
          </div>
		</div>
	</div>
</div>
-->

<div class="max-width">
    <div class="margin">
        <h4 class="sg-header4" style="font-family: 'kievit-slab-book', Georgia, serif; margin:1em 0 2em 0;">Need Help? Visit our <a href="https://www.zocdoc.com/about/knowledge-base/" style="color:#62d5f6;">Knowledge Base</a>.</h4>
    </div>
</div>

<div class="offices max-width">
	<div class="margin">
		<h4 class="sg-header4">Our offices</h4>
		<?php the_field('office_locations_label')?>

		<?php if(have_rows('office_locations')):?>
			<?php while (have_rows('office_locations')): the_row();?>
				<section>
					<p class="office-name">
						<?php the_sub_field('office_name')?>
					</p>
					<?php the_sub_field('office_address')?>
				</section>
			<?php endwhile;?>
		<?php else: ?>
			<?php /*No rows*/ ?>
		<?php endif;?>
	</div>
</div>

    <?php get_footer(); ?>
</main>

