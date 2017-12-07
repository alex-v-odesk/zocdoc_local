<?php
/*
Template Name: Press
*/
?>
<?php get_header(); ?>

<main class="main-container">
<?php /*sticky nav*/ ?>

<?php
	if (have_rows('section_order')):
		$sections = array();
		while(have_rows('section_order')):the_row();
			$section = get_sub_field('section');

				array_push($sections,$section);
			wp_reset_postdata();
		endwhile;
	else:
		//no rows
	endif;
	wp_reset_query();
?>

<div class="page-links-bar press-bar sticky-bar smooth sticky-mobile">
<div class="max-width">
  <section class="margin">
    <div class="links-row">
      <div class="links-parent">
				<?php
					for ($x = 0; $x < count($sections); $x++) {
						$section = $sections[$x];
						$class = "";
						if($x >= 3) $class = "hide-link";
						$link = str_replace(' ', '_', strtolower($section));
						if ($section != 'Blogs') {
							echo '<a class="'.$class.'" data-tag="'.$link.'">'.$section.'</a><div class="line"></div>';
						}
				} ?>
       <a class="more-link">more</a>
      </div>
    </div>
    <div class="links-row">
      <div class="links-parent">
				<?php
					for ($x = 3; $x < count($sections); $x++) {
						$section = $sections[$x];
						$class = "";
						$link = str_replace(' ', '_', strtolower($section));
						if ($section != 'Blogs') {
							echo '<a class="'.$class.'" data-tag="'.$link.'">'.$section.'</a><div class="line"></div>';
						}
				} ?>
				</div>
    </div>
  </section>
  </div>
</div>
<?php /*Header section*/ ?>
<div style="background-image: url(<?php the_field('header_image')?>)" class="banner press">
	<div class="inner max-width">
		<div class="copy margin">
			<h1 class="sg-header1"><?php the_field('header_title')?></h1>
			<h5 class="sg-header5"><?php the_field('header_text')?></h5>
		</div>
	</div>
</div>

<?php
foreach($sections as $section){
		if ($section == 'News') {
			PRESS_RELEASES();
		}
		if ($section == 'Downloads') {
			DOWNLOADS();
		}
		if ($section == 'Videos') {
			VIDEOS();
		}
		if ($section == 'Spokespeople') {
			SPOKESPEOPLE();
		}
}; ?>



<?php function PRESS_RELEASES() {
	global $post;
?>
<div id="news" class="link-el">
	<div class="max-width press-header">
		<a href="<?php bloginfo('url'); ?>/press/news" class="sg-header4 margin">News</a>
	</div>

	<?php $press_query = new WP_Query(
		array(
			'post_type'=>'Press_Releases',
			'posts_per_page'=>'4',
			'meta_key' => 'date',
      'orderby' => 'meta_value_num',
      'order' => 'DSC',
      'meta_query' => array(
        'relation' => 'OR',
        array(
          'key' => 'dont_show',
          'value' => true,
          'compare' => '!=',
        ),
        array(
          'key' => 'dont_show',
          'compare' => 'NOT EXISTS',
        ),
			)
		)
	);

	if ($press_query->have_posts()) : ?>
	<div class="all-posts max-width">
		<div class="margin">
		<?php while($press_query->have_posts() ) : $press_query->the_post(); ?>
			<div class="post">
			<p class="sg-title date">
				<?php the_field('date')?>
			</p>
			<p class="sg-title title">
				<?php the_title()?>
			</p>
			<p class="sg-title more">
				<a href="<?php the_permalink() ?>">Read more</a>
			</p>
			</div>
		<?php endwhile; ?>
		</div>
			</div>
		<div class="see-all max-width">
		<a class="margin" href="<?php bloginfo('url'); ?>/press/news" >See all</a>
		</div>

	<?php else: ?>
		<?php /* No posts */ ?>
		...
	<?php endif ?>

	<?php
		wp_reset_postdata();
		wp_reset_query();
	?>

	<div class="press-hr"></div>
</div>
<?php } ?>

<?php function DOWNLOADS() {
	global $post;
?>
<div id="downloads" class="link-el">
	<div class="header-text max-width">
		<a href="<?php bloginfo('url'); ?>/press/downloads" class="sg-header4 margin">Downloads</a>
	</div>
	<div class="downloads max-width">
	<div class="margin">
	<?php
	if (have_rows('featured_downloads')):
		while(have_rows('featured_downloads')) : the_row();?>
			<div class="download">
			<?php $post_object = get_sub_field('download');?>
			<?php if ($post_object) :
				$post = $post_object;
				setup_postdata($post);?>
				<a href="<?php the_field('file')?>" download>
					<div class="image" style="background-image: url(<?php the_field('image')?>);">
			    	<img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/16x9.png" class="expand" />
			    </div>
			    </a>
					<div class="info">
						<a href="<?php the_field('file')?>" download><?php the_title()?></a>
						<a href="<?php the_field('file')?>" download></a>
					</div>

			<?php wp_reset_postdata();?>
			<?php endif;?>
			</div>
		<?php endwhile;
	else:
		// no rows
	endif;
	?>
	</div>
	</div>
	<div class="see-all max-width">
		<a class="margin" href="<?php bloginfo('url'); ?>/press/downloads">See all</a>
	</div>

	<div class="press-hr"></div>
</div>
<?php } ?>

<?php function VIDEOS() {
	global $post;
?>
<div id="videos" class="link-el">
	<div class="header-text max-width">
	<a href="<?php bloginfo('url');?>/press/videos" class="sg-header4 margin">Videos</a>
	</div>
	<div class="videos max-width">
	<div class="margin">
	<?php
	if (have_rows('featured_videos')):
		while(have_rows('featured_videos')) : the_row();?>
	<div class="video">
		<?php $post_object = get_sub_field('video');?>
			<?php setup_postdata($post_object);
			 if ($post_object) :
				$post = $post_object;
				$video = get_field( 'video');
				$id = getYoutubeThumb($video);
				?>
				<div class="image">
					<img src="https://img.youtube.com/vi/<?php echo $id; ?>/mqdefault.jpg" />
					<a href="<?php the_permalink()?>">
						<img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/play.png" />
					</a>
				</div>
			<div class="info">
			<a href="<?php the_permalink()?>"><?php the_title()?></a>
			</div>
			<?php /*<div><a href="<?php the_permalink()?>">Video Link</a></div>*/ ?>
			<?php wp_reset_postdata();?>
			<?php endif;?>
			</div>
		<?php endwhile;
	else:
		// no rows
	endif;
	?>
	</div>
	</div>
	<div class="see-all max-width">
		<a class="margin" href="<?php bloginfo('url');?>/press/videos">See all</a>
	</div>


	<div class="press-hr"></div>
</div>
<?php } ?>

<?php function SPOKESPEOPLE() {
	global $post;
?>
<div id="spokespeople" class="link-el">
	<div class="max-width header-text">
		<a href="<?php bloginfo('url'); ?>/press/spokespeople/" class="sg-header4 margin">Spokespeople</a>
	</div>
	<div class="spokespeople max-width">
	<div class="margin">
	<?php
	if (have_rows('featured_spokespeople')):
		while(have_rows('featured_spokespeople')) : the_row();?>
	<div class="spokesperson">
		<?php $post_object = get_sub_field('spokesperson');?>
			<?php if ($post_object) :
				$post = $post_object;
				setup_postdata($post);?>
	    <div class="overlay"  style="background-color:<?php the_field('color')?>"></div>
			<a href="<?php bloginfo('url'); ?>/spokespeople/<?php echo $post->post_name?>" class="headshot" style="background-image: url(<?php the_field('headshot')?>)"></a>
			<div class="name sg-title"><a href="<?php bloginfo('url'); ?>/spokespeople/<?php echo $post->post_name?>"><?php the_title() ?></a></div>
			<p class="position sg-title"><?php the_field('position')?></p>
			<?php wp_reset_postdata();?>
			<?php endif;?>
	</div>
		<?php endwhile;
	else:
		// no rows
	endif;
	?>
	</div>
	</div>

	<div class="see-all max-width">
		<a class="margin" href="<?php bloginfo('url'); ?>/press/spokespeople/">See all</a>
	</div>

	<div class="press-hr"></div>
</div>
<?php } ?>

<!-- <div class="end-banner press">
	<section class="max-width">
		<div class="margin">
			<?php //Call to actions
			if (have_rows('ctas')):
				while (have_rows('ctas')) : the_row();?>
					<article>
						<p class="sg-header4"><?php the_sub_field('caption_text');?></p>
						<img src="<?php the_sub_field('cta_graphic')?>">
						<a class="sg-btn-med" href="<?php the_sub_field('link') ?>"><?php the_sub_field('link_label');?></a>
					</article>
			<?php endwhile;
			else:
				// no rows
			endif;
			?>
		</div>
	</section>
</div> -->



<?php
$footer_text="Need to contact our press department?";
$footer_email="Press@Zocdoc.com";
include( get_template_directory() . '/footer.php');
?>
</main>



