<?php
/*
Template Name: Campaigns / Unsick / FAQ
*/


require_once('campaign-unsick-header.php'); 
?>
<main>
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>

        <section id="faq_intro" class="section bg_white" >
            <div class="section_wrapper">
                <h1><?php the_title(); ?></h1>
                <?php the_content(); ?>
            </div>
        </section>

        <?php if( get_field('questions') ) : ?>
            <section id="faqs" class="section bg_white" >
                <div class="section_wrapper">
                    <ul class="faqs">
                        <?php foreach( get_field('questions') AS $q ) : ?>
                            <li>
                                <p class="question" ><span><?php echo($q['question']); ?></span></p>                    
                                <div class="answer" ><?php echo($q['answer']); ?></div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </section>
        <?php endif; ?>

    <?php endwhile; endif; ?>
</main>
		

<?php require_once('campaign-unsick-footer.php'); ?>