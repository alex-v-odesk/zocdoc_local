<header id="page-header" class="page-header blog" role="banner">

    <?php
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            $post = get_post();
            $duration = get_field('read_duration');
            $title = $post->post_title;
        }
    }
    ?>

    <h1 class="logo"><a href="https://www.zocdoc.com/"><strong>Zocdoc</strong></a></h1>
    <!-- <h1 class="logo"><a href="<?php echo site_url(); ?>/about/blog"><strong>Zocdoc</strong></a></h1> -->

    <?php
    $topics = get_terms('category', array(
        'exclude' => '1,23',
        'hide_empty' => 0
    ));
    $icons = array();
    foreach ($topics as $topic) {
        $category = get_category_by_slug($topic->name);
        $imagesIDs = get_objects_in_term($category->cat_ID, 'category');

        foreach ($imagesIDs as $id) {
            if ($img = wp_get_attachment_url($id)) {
                $tmp['category'] = $category->slug;
                $tmp['img'] = $img;
                $icons[] = $tmp;
            }
        }
    }
    $categories = get_the_category($post->ID);
    $cat = $categories[0];

    $isSingle = is_single();

    ?>

    <div class="navigation topics-bar">
        <?php if ($isSingle): ?>
            <?php $navCatColor = get_category_color($cat->slug); ?>
            <div data-color-category="<?php echo $navCatColor[1]; ?>" data-color="<?php echo $navCatColor[0]; ?>"
                 class="article-title">
                <span class="title"><?php echo $title; ?></span>
                <?php if($duration): ?>
                    - <span class="duration"><?php echo $duration; ?> min read</span>
                <?php endif; ?>
            </div>
        <?php endif; ?>
        <ul class="content-menu row center middle">
            <?php if(!is_home()) : ?>
                <li>
                    <a id="blog-topic-home" href="/about/blog">
                        <span class="title">Blog Home</span>
                        <span class="round-mask"><img class="zee" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/zee.png" alt="zee"/>
                        </span>
                        <span class="description">Visit the Zocdoc Blog to find a complete list of all posts</span>
                    </a>
                </li>
            <?php endif; ?>
            <?php $i = 0; ?>
            <?php foreach ($topics as $topic) : ?>
                <?php if( $topic->name == "Team" || $topic->name == "Spokespeople" ) {
                    //Ignore TEAM PAGE Categories
                } else { ?>
                    <?php $iconImg = "";
                    foreach ($icons as $icon) {
                        if ($icon['category'] == $topic->slug) {
                            $iconImg = $icon['img'];
                        }
                    } ?>
                    <?php $catColor = get_category_color($topic->slug); ?>


                    <li data-index="<?php echo $i; ?>" data-id="<?php the_sub_field('hash'); ?>"
                        data-color-category="<?php echo $catColor[1]; ?>" data-color="<?php echo $catColor[0]; ?>">
                        <a href="/about/blog/<?php echo $topic->slug; ?>">
                            <span class="title"><?php echo $topic->name; ?></span>
                            <span class="round-mask"><img src="<?php echo $iconImg; ?>" alt=""/></span>
                            <span class="description"><?php echo $topic->description; ?></span>
                        </a>
                        <!-- <span class="shadow"></span> -->
                    </li>
                    <?php $i++;
                } ?>
            <?php endforeach; ?>
        </ul>
    </div>

    <button type="button" name="btn-dropdown" class="dropdown-cta">Topics</button>
<!--         <div class="back-home">
          <span class="title">Blog Home</span>
        </div> -->
    <a href="#" class="btn-search">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             viewBox="-242 244 14 14" style="enable-background:new -242 244 14 14;" xml:space="preserve">
      <style type="text/css">
          .searchPath {
              fill: #06215A;
          }
      </style>
            <path class="searchPath" d="M-229.2,257.8c-0.3,0-0.5-0.1-0.7-0.3l-3.1-3.1c-0.9,0.6-2,1-3.2,1c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6
      	s5.6,2.5,5.6,5.6c0,1.2-0.4,2.3-1,3.2l3.1,3.1c0.4,0.4,0.4,1,0,1.4C-228.7,257.7-228.9,257.8-229.2,257.8z M-236.2,246.2
      	c-2,0-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6s3.6-1.6,3.6-3.6S-234.2,246.2-236.2,246.2z"/>
      </svg>
    </a>

    <div class="search-form row middle center">
        <div class="form-container col-lg-10">
            <h2>What are you looking for?</h2>
            <form role="search" method="get" id="searchform" action="<?php echo esc_url( home_url( '/blog/search/' ) ); ?>">
                <input type="text" autocomplete="off" class="text" placeholder="Type to search" name="search" id="search" value="<?php echo get_search_query()?>" name="s" id="s">
            </form>
        </div>
    </div>

</header>
