<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

get_header();

$page_for_posts = get_option( 'page_for_posts' );
$must_read_title = get_field('must_read_title',$page_for_posts);

$featured = array(
    'tag' => 'featured',
    'showposts' => 3,
    'post_status' => 'publish',
    'caller_get_posts' => 1
);
$featured_posts = get_posts($featured);

$themed = array(
    'tag' => 'themed',
    'showposts' => 3,
    'post_status' => 'publish',
    'caller_get_posts' => 1
);
$themed_posts = get_posts($themed);

$latest = array(
    'posts_per_page' => 6,
    'showposts' => 30,
    'orderby' => 'date',
    'order' => 'DESC',
    'post_status' => 'publish',
    'caller_get_posts' => 1,
    'tag__not_in' => array(22)
);
$latest_posts = new WP_Query($latest);

$topics = get_terms('category', array(
    'exclude' => '1',
    'hide_empty' => 0
));

$popular = array(
    'post_type' => 'post,',
    'limit' => 3,
    'stats_category' => 1
);

?>

<?php get_template_part('template-parts/blog', 'header'); ?>

<div id="blog-home" class="page-wrapper">

    <section class="full-bleed-header">

        <div class="full-bleed-container row">
            <?php $i = 0 ?>
            <?php foreach ($featured_posts as $post) : ?>
                <?php $categories = get_the_category($post->ID); 
                $permalink = get_the_permalink($post->ID);
                ?>
                <div
                    class="content-container col-sm-offset-0 col-lg-4 col-sm-10 <?php if ($i === 0): ?>active<?php endif; ?>">
                    <a class="header-link" href="<?php echo $permalink; ?>"><h1 class="text-content">
                        <?php echo $post->post_title; ?>                         
                    </h1></a>  
                    <div class="info">
                        <a href="/about/blog/<?php echo $categories[0]->slug; ?>"><span class="category text-content"><?php echo $categories[0]->name; ?></span></a> - <span
                            class="publish-date"><?php echo mysql2date('j M Y', $post->post_date); ?></span>
                        <!-- <a class="text-content read-more" href="<?php echo $post->guid; ?>">Read more</a> -->
                        <a class="text-content read-more" href="<?php echo $permalink; ?>">Read more</a>

                    </div>
                </div>
                <div class="full-bleed-image"
                     style="background:url(<?php echo wp_get_attachment_url(
                         get_post_thumbnail_id($post->ID)
                     ) ?>) 50% 50% / cover no-repeat;"></div>
                <?php $i++ ?>
            <?php endforeach; ?>
            <div class="canvas-container">
                <canvas id="intro-canvas" class="canvas" resize></canvas>
            </div>
        </div>

        <div class="carousel-items-container row middle center">

            <ul class="row center middle">
                <?php $i = 0 ?>
                <?php foreach ($featured_posts as $post) : ?>
                    <?php $categories = get_the_category($post->ID); ?>
                    <?php $catColor = get_category_color($categories[0]->slug); ?>
                    <?php $permalink = get_the_permalink($post->ID); ?>

                    <li class="carouse-item col-lg-4 col-sm-4" data-id=<?php echo $i; ?>>
                        <div class="image">
                            <div class="round-mask">
                                <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID)) ?>"
                                     alt=""/>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"
                                 style="enable-background:new 0 0 120 120;">
                                <path class="path" stroke="<?php echo $catColor[0] ?>" stroke-width="4"
                                      stroke-linejoin="round"
                                      stroke-dasharray="360" stroke-dashoffset="360" fill="none"
                                      d="M60,116.5C28.8,116.5,3.5,91.2,3.5,60S28.8,3.5,60,3.5s56.5,25.3,56.5,56.5S91.2,116.5,60,116.5z"/>
                            </svg>
                        </div>

<!--                         <p data-color-category="<?php echo $catColor[1]; ?>">
                            <?php echo $post->post_title; ?>
                        </p> -->

                        <a href="<?php echo $permalink; ?>">
                            <p data-color-category="<?php echo $catColor[1]; ?>">
                                <?php echo $post->post_title; ?>
                            </p>
                        </a>

                        <div class="info">
                            <a href="/about/blog/<?php echo $categories[0]->slug; ?>"><span class="category"><?php echo $categories[0]->name; ?></span></a> - <span
                                class="publish-date"><?php echo mysql2date('j M Y', $post->post_date); ?></span>
                        </div>
                    </li>
                    <?php $i++ ?>
                <?php endforeach; ?>

            </ul>

        </div>

    </section>

    <section class="blog-post-container">

        <div class="content-wrapper row top">

            <section class="grid col-lg-10 col-sm-12 row">

                <?php $i = 0 ?>

                <?php foreach ($latest_posts->posts as $post) : ?>

                    <?php $categories = get_the_category($post->ID); ?>
                    <?php $catColor = get_category_color($categories[0]->slug); ?>
                    <?php $permalink = get_the_permalink($post->ID); ?>

                    <article id="post-<?php echo $i ?>"
                             class="post col-lg col-lg-6 col-sm-12 <?php if ($i > 5) : ?>hidden<?php endif; ?>">

                        <!-- <a href="<?php echo $post->guid; ?>"> -->
                            <a href="<?php echo $permalink; ?>">

                            <?php if (!empty(get_post_thumbnail_id($post->ID))): ?>
                                <header class="post-header"
                                        style="background: url(<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID)) ?>) 50% 50% / cover no-repeat; background-color:<?php echo $catColor[0];?>;"></header>
                            <?php else: ?>
                                <header class="post-header" style="background: #fe616e;"></header>
                            <?php endif; ?>

                            <div class="text-wrapper">

                                <h2 data-color-category="<?php echo $catColor[1]; ?>"
                                    class="title">
                                    <?php echo $post->post_title; ?>
                                </h2>


                                <div class="info">
                                    <a href="/about/blog/<?php echo $categories[0]->slug; ?>"><span class="category"><?php echo $categories[0]->name; ?></span></a>
                                    <span class="publish-date"><?php echo mysql2date('j M Y', $post->post_date); ?>
                                    <?php $duration = get_field('read_duration'); if($duration > 0) : ?>
                                        - <?php echo $duration; ?> min read</span>
                                    <?php endif; ?>
                                </div>
                            </div>

                        </a>

                    </article>
                    <?php $i++ ?>
                <?php endforeach; ?>

            </section>

            <div class="btn-wrapper col-lg-12 col-sm-12">
              <button type="button" name="explore-more" class="explore-more">Explore More</button>
            </div>

        </div>

    </section>

    <section class="must-read-container">

        <img class="zee" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/zee.png" alt=""/>

        <span class="must-read">Must read</span>
        <h2><?php echo $must_read_title; ?></h2>

        <ul class="article-list row center">

            <?php foreach ($themed_posts as $post) : ?>
                <?php $categories = get_the_category($post->ID); ?>
                <li class="article col-lg-4 col-sm-12">
                    <a href="<?php echo $post->guid; ?>">
                        <div class="round-mask">
                            <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID)) ?>" alt=""/>
                        </div>
                        <h3 class="title"><?php echo $post->post_title; ?></h3>
                        <div class="info">
                            <a href="/about/blog/<?php echo $categories[0]->slug; ?>"><span class="category"><?php echo $categories[0]->name; ?></span></a> - <span
                                class="publish-date"><?php echo mysql2date('j M Y', $post->post_date); ?></span> -
                            <span><?php $duration = get_field('read_duration');  echo $duration; ?> min read</span>
                        </div>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>

    </section>

</div>

<?php get_footer(); ?>
