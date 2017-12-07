<?php /*
*
* Template for search results;
*
*/ ?>
<?php get_header()?>

<main class="main-container">
<div class="links-bar clear-header">
<div class="max-width">
  <section class="margin">
    <a class="sg-header8" href="<?php bloginfo('url'); ?>/faq">FAQ</a>
    <img class="padding" src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/location_arrow.png" />
    <a class="sg-header8 dim" >Search Results</a>
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

<div class="questions max-width">
    <div class="margin">
    <div class="hold-questions">
        <?php if (have_posts() ) :?>
        <?php while (have_posts() ): the_post(); ?>
            <div class='question-parent'>
              <p class="sg-para1 question">
                <?php the_title()?>
                 <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/down_arrow.png" />
              </p>
              <p class="sg-para1 answer">
               <?php the_content()?>
               </p>
            </div>

    	<?php endwhile;
    	   else:
            echo "<div class='question-parent'><p class='sg-para1'>You stumped us. Sorry, we don’t have an answer to this one.</p></div>";
            endif;
        ?>
        </div>
    </div>
</div>
<?php /*topic selector*/ ?>
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

</main>

<?php get_footer()?>