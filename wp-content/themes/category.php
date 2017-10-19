<?php /*
Template Name: topics
*/ ?>

<?php
$cat_title = single_cat_title("", false);
$category = get_category_by_slug($cat_title);
$cat_description = category_description( $category->term_id );
$catColor = get_category_color($category->slug);
$page = (isset($_GET['page'])) ? intval($_GET['page']) : 1;
$next_page = $page + 1;
$showposts = 6;

$imagesIDs = get_objects_in_term($category->cat_ID, 'category');
foreach ($imagesIDs as $id) {
    if ($img = wp_get_attachment_url($id)) {
        //echo $img ."<br>";
    }
}
?>

<?php get_header(); ?>



<?php get_template_part('template-parts/blog', 'header'); ?>

<div id="blog-topic" class="page-wrapper">

    <section class="full-bleed-header row middle"
             data-color-category="<?php echo $catColor[1]; ?>" data-color="<?php echo $catColor[0]; ?>"
             style="background-image:url(<?php echo z_taxonomy_image_url($category->term_id) ?> );">

        <div class="full-bleed-container row middle">

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

            <div class="content-container col-lg-12 col-sm-12">
                <h1><?php echo $cat_title; ?></h1>
                <p><?php echo $cat_description; ?></p>
            </div>

        </div>

    </section>

    <section class="blog-post-container"
             data-color-category=<?php echo $catColor[1]; ?> data-color=<?php echo $catColor[0]; ?>>

        <div class="content-wrapper row top">

            <section class="grid col-lg-12 col-sm-12 row">

                <!-- GET TOPIC BLOG POSTS -->
                <?php 
                    query_posts(array(
                        'post_type' => 'post',
                        'showposts' => $showposts,
                        'orderby' => 'date',
                        'order' => 'DESC',
                        'cat' => $category->cat_ID,
                        'paged' => $page
                    ));
                ?>
                <!-- LOOP THROUGH POSTS -->
                <?php $i = 0 ?>

                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                    <!-- BLOG POST CONTENT -->
                    <article id="post-<?php echo $i ?>" class="post col-lg col-lg-4 col-sm-12 ">
                        
                        <a href="<?php the_permalink(); ?>">
                            <?php 
                                if (has_post_thumbnail()) : 
                            ?>
                                <header class="post-header"
                                        style="background: url(<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID)) ?>) 50% 50% / cover no-repeat <?php echo get_category_color($category->slug)[0]; ?>;"></header>
                            <?php else : ?>
                                <header class="post-header"
                                        style="background-color: <?php echo get_category_color($category->slug)[0]; ?>;"></header>
                            <?php endif; ?>

                            <div class="text-wrapper <?php if($legacy_blog_post) echo('no-header-image'); ?>">

                                <h2 class="title"><?php the_title(); ?></h2>

                                <div class="info">
                                    <?php $categories = get_the_category($post->ID); ?>
                                    <span class="category"><?php echo $categories[0]->name; ?></span>
                                    <span class="publish-date"><?php echo mysql2date('j M Y', $post->post_date); ?>
                                    <?php if( $post->read_duration != 0 ) : ?>
                                        - <?php echo $post->read_duration; ?> min read</span>
                                    <?php endif; ?>
                                </div>
                            </div>

                        </a>

                    </article>
                    <?php $i++; ?>
                <?php endwhile; ?>
                <?php else: ?>

                    <h2 class="no-posts">There are currently no posts for this category</h2>

                <?php endif; ?>

            </section>
            <?php if ($category->category_count > $page * $showposts): ?>
                <a style="color:black; text-decoration:none;" href="/about/blog/<?php echo $category->slug;?>/?page=<?php echo($next_page); ?>" type="button" name="explore-more" class="explore-more">Explore More</a>
            <?php endif; ?>

        </div>

    </section>

</div>

<?php get_footer(); ?>
