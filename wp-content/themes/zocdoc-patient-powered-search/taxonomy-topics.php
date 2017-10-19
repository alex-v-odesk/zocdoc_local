<?php
/**
*
*	Template for Q+A topics.
*
*/
?>

<?php get_header()?>

<main class="main-content">

<?php global $post;
$terms = get_the_terms($post->id, 'topics'); ?>
<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/faq">FAQ</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="dim sg-header8" href="<?php bloginfo('url')?>/topic/<?php echo $terms[0]->slug ?>"> <?php
    echo $terms[0]->name
     ?>
     </a>
  </section>
  </div>
</div>

<div class="max-width">
<div class="search-parent wider">
<form role="search" method="get" id="searchform" action="<?php bloginfo('url') ?>">
        <input type="text" autocomplete="off" class="text" placeholder="Search here..." value="<?php echo get_search_query()?>" name="s" id="s">
        <input type="submit" class="search-button" class="search" id="searchsubmit" value="">
        <input type="hidden"  name="post_type" id="post_type" value="questions" />
 </form>
      </div>
      </div>

<div class="max-width topic-header">
<h2 class="margin sg-header2"><?php echo $terms[0]->name; ?></h2>
</div>



<?php /*<div class="single-search max-width">
<div class="margin">
	<input placeholder="Search here...">
  <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/search.png" />
  </div>
</div>*/ ?>

<!-- use slug -->
<?php $question_query = new WP_Query(array(
	'post_type'=>'questions',
  'orderby'=>'menu_order',
  'order'=>'ASC',
	'tax_query'=> array(
		array(
				'taxonomy'=>'topics',
				'field'=>'slug',
				'terms'=>$terms[0]->slug
			)
	)
	));?>
<?php if ($question_query->have_posts()) :?>
	<div class="questions max-width">
  <div class="margin">
	<?php while($question_query->have_posts()) : $question_query->the_post(); ?>

    <?php

      if ($question_query->found_posts >= 5) {
        if( has_term( 'Data and Privacy', 'topics' ) ) {
          echo "<div class='question-parent'>";
        } else {
          echo "<div class='question-parent hidden-answer'>";
        }
      } else {
        echo "<div class='question-parent'>";
      }

    ?>


		<p class="sg-para1 question">
      <?php the_title()?>
      <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/down_arrow.png" />
    </p>
		 <p class="sg-para1 answer">
     <?php the_content() ?>
     </p>

		</div>
	<?php endwhile; ?>
	</div>
  </div>
<?php else: ?>
	<?php /*No posts*/ ?>
	...
<?php endif;?>

<div class="topics-parent max-width">
<div class="margin">
  <h4 class="sg-header4">Help topics</h4>
  <div class="topics">
    <?php $categories = get_categories(array('taxonomy'=>'topics'))?>
    <?php foreach ($categories as $cat):?>
      <a href="<?php bloginfo('url');?>/topic/<?php echo $cat->slug?>">
      <p class="sg-header6"><?php echo $cat->cat_name; ?></p>
      <div class="topic-hr"></div></a>
    <?php endforeach; ?>
  </div>
</div>
</div>


<?php
$faq = true;
$footer_text='Still need help? <a class="phone-number" data-test="layout-phonenumber" href="tel:(855) 962-3621">(855) 962-3621</a></td>';
include( get_template_directory() . '/footer.php');
?>
</main>
