<?php get_header(); ?>

<?php

if (have_posts()) {
    while (have_posts()) {

        the_post();

        $post = get_post();
        //print_r($post); die();
        $author = get_field('author_name');
        $duration = get_field('read_duration');
        $related = get_field('related_posts');
        $id = $post->ID;
        $title = $post->post_title;
        $date = mysql2date('j M Y', $post->post_date);
        //$autor = $post->post_author;
        $categories = get_the_category($id);
        $category = $categories[0];
        $categoryName = $category->slug;
        $catColor = get_category_color($categoryName);
        $has_thumbnail = has_post_thumbnail();
//        $really_has_thumbnail = (the_post_thumbnail_url() != null);
        $really_has_thumbnail = (get_the_post_thumbnail() != null);
    }
}


//Set default related Posts

    if (!$related) {
    $args = array(
        'category' => $category->term_id,
        'post_status' => 'publish',
        'post_type' => 'post',
        'numberposts' => 2,
        'post__not_in' => array($id)
    );
    $related = get_posts($args);
}

?>

<?php get_template_part('template-parts/blog', 'header'); ?>

<div id="article" class="page-wrapper">

    <section class="full-bleed-header <?php if ($really_has_thumbnail) : ?>has-thumbnail<?php endif; ?>"
             data-color-category=<?php echo $catColor[1]; ?> data-color=<?php echo $catColor[0]; ?>>

        <!-- <div class="search-form row middle center">
            <div class="form-container col-lg-10">
                <h2>What are you looking for?</h2>
                <form role="search" method="get" id="searchform"
                      action="<?php echo esc_url(home_url('/blog/search/')); ?>">
                    <input type="text" autocomplete="off" class="text" placeholder="Type to search" name="search"
                           id="search" value="<?php echo get_search_query() ?>" name="s" id="s">
                </form>
            </div> 
        </div> -->

        <div class="full-bleed-container row middle center">

            <div class="content-container col-lg-12 col-sm-12">
                <h1><?php echo $title; ?></h1>
                <div class="info">
                    <span class="category"><?php echo $category->name; ?></span> -
                    <span class="publish-date"><?php echo $date; ?></span>
                    <?php if( $duration ) : ?>
                        - <span><?php echo $duration; ?> min read</span>
                    <?php endif; ?>
                    <?php if ( 'newscred' == get_the_author_meta( 'user_login' ) ) {
                        // https://support.newscred.com/hc/en-us/articles/208182496
                        echo(' - <span>');
                        printf(generate_license_info());
                        echo('</span>');
                    } elseif( $author ) { ?>
                        - <span>by <?php echo $author; ?></span>
                    <?php } ?>
                    <?php if (function_exists('ADDTOANY_SHARE_SAVE_KIT')) {
                        - ADDTOANY_SHARE_SAVE_KIT();
                    } ?>
                </div>
            </div>

            <?php

            $prev_post = get_previous_post();

            if (!empty($prev_post)):
                ?>
                <div class="nav-prev-next previous">

                    <!-- <a href="<?php echo $prev_post->guid ?>"> -->
                    <a href="<?php echo the_permalink($prev_post); ?>">

                    <svg class='arrow previous' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 17 12" style="enable-background:new 0 0 17 12;" xml:space="preserve">
					                    <style type="text/css">
                        .st0 {
                            fill: none;
                            stroke: #ffffff;
                            stroke-width: 2;
                            stroke-linecap: round;
                            stroke-miterlimit: 10;
                        }

                        .st1 {
                            fill: none;
                            stroke: #ffffff;
                            stroke-width: 2;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                        }
                    </style>
                        <line class="st0" x1="1.5" y1="6" x2="15" y2="6"/>
                        <polyline class="st1" points="10.5,1 15.5,6 10.5,11 "/>
					                 </svg>

                    <span>Previous</span>

                    <span class="title"><?php echo $prev_post->post_title ?></span>
                  </a>

                </div>
            <?php endif ?>

            <?php
            $next_post = get_next_post();
            if (!empty($next_post)):
                ?>

                  <div class="nav-prev-next next">
                    <!-- <a href="<?php echo $next_post->guid ?>"> -->
                    <a href="<?php echo the_permalink($next_post); ?>">

                      <svg class='arrow next' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                           viewBox="0 0 17 12" style="enable-background:new 0 0 17 12;" xml:space="preserve">
  					                     <style type="text/css">
                          .st0 {
                              fill: none;
                              stroke: #ffffff;
                              stroke-width: 2;
                              stroke-linecap: round;
                              stroke-miterlimit: 10;
                          }

                          .st1 {
                              fill: none;
                              stroke: #ffffff;
                              stroke-width: 2;
                              stroke-linecap: round;
                              stroke-linejoin: round;
                              stroke-miterlimit: 10;
                          }
                      </style>
                          <line class="st0" x1="1.5" y1="6" x2="15" y2="6"/>
                          <polyline class="st1" points="10.5,1 15.5,6 10.5,11 "/>
  					                 </svg>

                      <span>Next</span>

                      <span class="title"><?php echo $next_post->post_title ?></span>
                      </a>
                  </div>
            <?php endif ?>
        </div>
    </section>

    <section class="article-body-container"
             data-color-category=<?php echo $catColor[1]; ?> data-color=<?php echo $catColor[0]; ?>>
        <div class="content-wrapper <?php if ($really_has_thumbnail) : ?>has-thumbnail<?php endif; ?>">
            <?php 
                if ($really_has_thumbnail) : 
            ?>
                <div class="header-image" style="background-image:url(<?php the_post_thumbnail_url() ?>);"></div>
            <?php endif; ?>
            <div class="text-container">
                <div class="social_shares">
                    <ul>
                        <li>Share Story</li>
                        <li><a target="_new" href="https://twitter.com/intent/tweet?original_referer=<?=urlencode(get_permalink())?>&source=tweetbutton&text=<?=rawurlencode(get_the_title())?>%20-%20<?=urlencode(get_permalink())?>">
                            <span class="ss-icon twitter" >Twitter</span> 
                            Twitter
                        </a></li>
                        <li><a target="_new" href="http://www.facebook.com/sharer/sharer.php?u=<?=urlencode(get_permalink())?>&t=<?=rawurlencode(get_the_title())?>">
                            <span class="ss-icon facebook" >Facebook</span> 
                            Facebook
                        </a></li>

                        <li><a target="_new" href="http://www.linkedin.com/shareArticle?mini=true&amp;title=<?php the_title(); ?>&amp;url=<?php the_permalink(); ?>" title="Share on LinkedIn">
                            <span class="ss-icon" >Linkedin</span> 
                            Linkedin
                        </a></li>

                        <li><a target="_new" href="mailto:?subject=<?=rawurlencode(get_the_title())?>&body=<?=urlencode(get_permalink())?>">
                            <span class="ss-icon email" >Email</span> 
                            Email
                        </a></li>
                    </ul>
                </div>
                <?php echo the_content(); ?>
            </div>
            <div class="button-comments <?php if(get_comments_number() > 0) : ?>has-comments<?php endif;?>">
                <?php if(get_comments_number() == 0) : ?>
                    <p class="close">No comments yet, be the first?</p>
                <?php elseif (get_comments_number() == 1): ?>
                    <p class="close">Show comment (<?php echo get_comments_number() ?>)</p>
                <?php else: ?>
                    <p class="close">Show comments (<?php echo get_comments_number() ?>)</p>
                <?php endif; ?>
                <p class="open"> Close comments</p>
            </div>
            <?php if (comments_open() || get_comments_number()) : ?>
                <div class="comments" id="comments_wrapper">
                    <?php echo comments_template(); ?>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <?php if( isset($related) && $related ) : ?>
        <section class="must-read-container <?php if (has_post_thumbnail()) : ?>has-thumbnail<?php endif; ?>"
                 data-color-category=<?php echo $catColor[1]; ?> data-color=<?php echo $catColor[0]; ?>>
    
            <h2>You might also like</h2>
    
            <ul class="article-list row center">
                <?php foreach ($related as $post) : ?>
                    <?php $categories = get_the_category($post->ID); ?>
                    <?php $permalink = get_the_permalink($post->ID); ?>
                    <li class="article col-lg-4 col-sm-12">
                        <!-- <a href="<?php echo $post->guid; ?>"> -->
                        <a href="<?php echo $permalink; ?>">

                            <?php if(has_post_thumbnail()) : ?>
                                <div class="round-mask">
                                    <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID)) ?>" alt=""/>
                                </div>
                            <?php else : ?>
                                <div class="round-mask" style="background-color:<?php echo $catColor[0]; ?>"></div>
                            <?php endif; ?>
                            <h3 class="title"><?php echo $post->post_title; ?></h3>
                            <div class="info">
                                <span class="category"><?php echo $categories[0]->name; ?></span> -
                                <span class="publish-date"><?php echo mysql2date('j M Y', $post->post_date); ?></span>
                                <?php if( $duration ) : ?>
                                    - <span><?php echo $duration; ?> min read</span>
                                <?php endif; ?>
                            </div>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
    
        </section>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
