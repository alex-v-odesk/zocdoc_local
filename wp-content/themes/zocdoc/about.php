<?php
/*
Template Name: About
*/
?>
<?php get_header(); ?>
<main class="main-container">

<div class="page-links-bar about-bar sticky-bar smooth sticky-mobile">
<div class="max-width">
    <section class="margin">
        <div class="links-row">
            <div class="links-parent">
                <a data-tag="ourstory">Our story</a><div class="line"></div>
                <?php if(get_field('hide_facts')==false) { ?>
                    <a data-tag="facts">Facts</a><div class="line"></div>
                <?php } ?>
                <a data-tag="team">Team</a><div class="line"></div>
                <a class="hide-link" data-tag="investors">Investors</a><div class="hide-link line"></div>
                <a class="hide-link" data-tag="video">Video</a><div class="hide-link line"></div>
                <a class="more-link" data-tag="investors">More</a>
            </div>
        </div>
        <div class="links-row">
            <div class="links-parent">
                <a data-tag="investors">Investors</a><div class="line"></div>
                <a data-tag="video">Video</a><div class="line"></div>
            </div>
        </div>
    </section>
    </div>
</div>


<?php /*Colorful header w graphic*/ ?>
<div class="scrolling link-el" id="ourstory">
<?php include( get_template_directory() . '/about-svg.php');
    $story = get_field('story' );
 ?>

  <div class="scroll-parent max-width">
    <div class="scrolling-content margin">
        <div class="initial">
            <h1 class="sg-header1"><?php the_field('header_title')?></h1>
        </div>

        <section class="bottle">
            <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/aboutscroll1.png" title="pill bottle" alt="pill bottle" />
            <div class="text">
                <h3 class="sg-header3"><?php echo $story[0]['story_header'];?></h3>
                <?php echo $story[0]['story_text'];?>
            </div>
            <br>
            <br>
            <div class="text">
                <h3 class="sg-header3"><?php echo $story[1]['story_header'];?></h3>
                <?php echo $story[1]['story_text'];?>
            </div>
        </section>
        <section class="calendar">
            <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/aboutscroll2.png" title="medical supplies" alt="medical supplies"/>
            <div class="text">
                <h3 class="sg-header3"><?php echo $story[2]['story_header'];?></h3>
                <?php echo $story[2]['story_text'];?>
            </div>
        </section>
        <section class="phone">
            <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/aboutscroll3.png" title="tech imagery" alt="tech imagery" />
            <div class="text">
                <h3 class="sg-header3"><?php echo $story[3]['story_header'];?></h3>
                <?php echo $story[3]['story_text'];?>
           </div>
        </section>
        <section class="doctor">
            <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/aboutscroll4.png" title="happy doctor" alt="happy doctor" />
        </section>
    </div>
  </div>

</div>


<?php /*About text w graphics
<div id="ourstory"></div>
<p><?php the_field('about_text') ?></p>
*/ ?>


<?php if(get_field('hide_facts')==false) { ?>
    <div class="facts max-width link-el" id="facts">
    <div class="margin">
        <?php //Data Points
        if (have_rows('data_points')): ?>
    <div class="about-header-text">
        <h2 class="sg-header2">Zocdoc facts</h2>
    </div>
    <div class="facts-grid">
            <?php while (have_rows('data_points')) : the_row();?>
                <section>
                <?php the_sub_field('data_point'); ?>
                <?php if(get_sub_field('data_link')){ ?>
                    <a href="<?php the_sub_field('data_link');?>">Read more</a>
                <?php }; ?>
                </section>
                <?php
             endwhile;
        else:
            // no rows
        endif;
        ?>
        </div>
    </div>
    </div>
<?php } ?>


<div class="leadership link-el" id="team">
    <div class="max-width">
        <div class="margin">
            <h2 class="sg-header2" id="leadership"><?php the_field('leadership_section_title')?></h2>
            <a class="about-more-link" href="<?php bloginfo('url'); ?>/team"><?php the_field('leadership_section_link_label')?><img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/blue_right_arrow.png" title="right arrow" alt="right arrow"/></a>
        </div>
    </div>

    <section class="parent">
        <div class="quote-parent swiper-container desktop">
            <div class="swiper-wrapper">
                <?php
                $bio_index = 0;
                if (have_rows('leadership_section')):
                    while (have_rows('leadership_section')) : the_row();?>
                        <?php $post_object = get_sub_field('leader');?>
                        <?php if ($post_object) :
                            $post = $post_object;
                            setup_postdata($post);?>
                
                            <div class="quote swiper-slide">
                                <div class="quote-inner" style="background-color:<?php the_field('color')?>;">
                                    <?php the_field('interesting_quote')?>
                                </div>
                                <div class="bio_svg_wrapper" id="bio_svg_wrapper_<?php echo $bio_index;?>">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 48.3 23.8" style="enable-background:new 0 0 48.3 23.8;" xml:space="preserve"
                                        id="bio_quote_<?php echo $bio_index; ?>"
                                        >
                                      <style type="text/css">
                                        .st0{fill-rule:evenodd;clip-rule:evenodd;}
                                      </style>
                                      <polygon class="st0" points="48.3,0 24.1,23.8 0,0 " style="fill:<?php the_field('color')?>;"/>
                                    </svg>
                                </div>
                            </div>
                        <?php wp_reset_postdata();?>
                        <?php endif; ?>
                        <?php 
                        $bio_index++;
                    endwhile;
                else:
                    // no rows
                endif;
                ?>
                <style type="text/css">
                    .bio_svg_wrapper {
                        position: absolute;
                        bottom: -23px;
                        height: 24px;
                        width: <?php echo(round(100/($bio_index))); ?>%;
                        text-align:center;
                    }
                    <?php for( $i = 0; $i < $bio_index; $i++ ) : ?>
                        #bio_svg_wrapper_<?php echo($i); ?> {
                            left:<?php echo ($i / $bio_index * 100); ?>%;
                        }
                        #bio_quote_<?php echo($i); ?> {
                            margin:auto;
                            position: relative;
                            bottom: auto;
                            left: auto !important;
                        }
                    <?php endfor; ?>
                    @media only screen and (min-width:768px) {
                        .people-parent .person {
                            width: <?php echo(round(100/($bio_index))); ?>%;
                        }
                    }
                </style>
            </div>
        </div>
        <div class="people-parent desktop">
            <?php /*Leadership w quotes, will always be 3*/
            if (have_rows('leadership_section')):
                while (have_rows('leadership_section')) : the_row();?>
                    <?php $post_object = get_sub_field('leader');?>
                    <?php if ($post_object) :
                        $post = $post_object;
                        setup_postdata($post);?>
            
                        <div class="person swiper-pagination-switch">
                            <a href="<?php bloginfo('url'); ?>/team/<?php echo $post->post_name?>">
                                <div class="image" style="background-image: url(<?php the_field('headshot')?>)"></div>
                                <div class="name"><?php the_title();?></div>
                                <div><?php the_field('position')?></div>
                            </a>
                        </div>
            
                    <?php wp_reset_postdata();?>
                    <?php endif; ?>
                <?php endwhile;
            else:
                // no rows
            endif;
            ?>
        </div>

        <div class="combined-parent">
            <?php /*Leadership w quotes, will always be 3*/
            if (have_rows('leadership_section')):
                while (have_rows('leadership_section')) : the_row();?>
                    <?php $post_object = get_sub_field('leader');?>
                    <?php if ($post_object) :
                        $post = $post_object;
                        setup_postdata($post);?>
            
                        <div class="item">
                            <div class="quote" style="background-color:<?php the_field('color')?>;">
                            <h2 class="sg-header4"><?php the_field('interesting_quote')?></h2>
                                 <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 48.3 23.8" style="enable-background:new 0 0 48.3 23.8;" xml:space="preserve">
                                    <style type="text/css">
                                        .st0_b{fill-rule:evenodd;clip-rule:evenodd;}
                                    </style>
                                    <polygon class="st0_b" points="48.3,0 24.1,23.8 0,0 " fill="<?php the_field('color')?>"/>
                                </svg>
                            </div>
                            <div class="info">
                                <div class="image" style="background-image: url(<?php the_field('headshot')?>)"></div>
                                <a href="<?php bloginfo('url'); ?>/team/<?php echo $post->post_name?>">
                                    <div class="sg-title"><?php the_title();?></div>
                                    <div class="sg-title"><?php the_field('position')?></div>
                                </a>
                            </div>
            
                        </div>
            
                    <?php wp_reset_postdata();?>
                    <?php endif; ?>
                <?php endwhile;
            else:
                // no rows
            endif;
            ?>
        </div>

    </section>
</div>


<div id="investors" class="investors link-el">
    <h2 class="sg-header2"><?php the_field("investor_section_title"); ?></h2>
    <a class="about-more-link" href="<?php bloginfo('url'); ?>/investors">Learn more<img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/blue_right_arrow.png" title="right arrow" alt="right arrow" /></a>

<div class="investor-grid">
    <?php
    $investor_query = new WP_Query(array(
        'post_type'=>'investors',
        'orderby'=>'menu_order',
        'order'=>'ASC'
    ));
    if ($investor_query->have_posts()) :
        while($investor_query->have_posts()) : $investor_query->the_post(); ?>
            <div class="investor" style="background-image: url(<?php the_field('logo')?>)"></div>
        <?php endwhile;?>
    <?php else: ?>
        <?php /*No posts*/?>
    <?php endif; ?>
</div>
<?php wp_reset_query(); ?>
</div>
<?php /* Featured Video */ ?>
<div class="featured-video link-el" id="video">
	<?php
        $iframe = get_field('video');
        preg_match('/src="(.+?)"/', $iframe, $matches);
        $src = $matches[1];
        $params = array(
            'controls'    => 0,
            // 'hd'        => 1,
            'autohide'    => 1,
            'rel' => 0
        );
        $new_src = add_query_arg($params, $src);
        $iframe = str_replace($src, $new_src, $iframe);
        $attributes = 'frameborder="0"';
        $iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);

        echo $iframe;
    ?>
	<div class="image" style="background-image:url(https://img.youtube.com/vi/<?php echo getYoutubeThumb(get_field('video')); ?>/maxresdefault.jpg)"></div>


    <h2 class="sg-header2"><?php the_field('video_label') ?></h2>
	<img id="featured-play" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/play.png" title="play icon" alt="play icon" />
</div>
<?php get_footer(); ?>
</main>

