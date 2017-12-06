<?php /*
*
* Template for search ;
*
*/ ?>
<?php
//die('page-searcvh');
global $query_string;

$query_args = explode("&", $query_string);
$search_query = array();

if( strlen($query_string) > 0 ) {
	foreach($query_args as $key => $string) {
		$query_split = explode("=", $string);
		$search_query[$query_split[0]] = urldecode($query_split[1]);
	} // foreach

} //if

$search = new WP_Query( array("post_type" => "post", "s" => $search_query['search']) );

get_header();

?>

<?php get_template_part('template-parts/blog','header'); ?>

<section id="blog-search" class="page-wrapper">

<!-- <div class="search-form row middle center">
    <div class="form-container col-lg-10">
				<h2>What are you looking for?</h2>
        <form role="search" method="get" id="searchform" action="<?php echo esc_url( home_url( '/blog/search/' ) ); ?>">
                <input type="text" autocomplete="off" class="text" placeholder="Type to search" value="<?php echo $_GET['search']; ?>" name="search" id="search" value="<?php echo get_search_query()?>" name="s" id="s">
        </form>
    </div>
</div> -->

<div class="search-results row middle center">

  <div class="results col-lg-8 col-sm-10">

			<?php $i = 0; ?>
			<?php if ($search->have_posts() ) : ?>
				<?php while ($search->have_posts() ): $search->the_post(); ?>
					<?php $i++; ?>
				<?php endwhile; ?>
				<h3 class="col-lg-6 col-sm-12"><?php echo $i; ?> Posts</h3>
			<?php endif; ?>

      <?php if ($search->have_posts() ) : ?>

      <?php while ($search->have_posts() ): $search->the_post(); ?>

          <!-- BLOG POST CONTENT -->
          <article class="result col-lg-6 col-sm-12">

          <?php $categories = get_the_category($post->ID);?>

              <a href="<?php the_permalink(); ?>">

								<div class="round-mask">
										<img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID)) ?>" alt=""/>
								</div>

                <h2 class="title"><?php the_title(); ?></h2>

                <div class="info">
                  <span class="category"><?php echo $categories[0]->name; ?></span> - <span class="publish-date"><?php echo mysql2date('j M Y', $post->post_date);  ?> - <?php echo $post->read_duration[0]; ?> min read</span>
                </div>

              </a>

          </article>

  	<?php endwhile;
  	   else:
          echo "<p class='no-results'>You stumped us. Sorry, we don’t have an answer to this one.</p>
          <div class='no-results back-home'><a href='/about/blog'>&#8592 Back to blog home</a></div>";
          endif;
      ?>
      </div>
</div>

</section>

<?php get_footer()?>
