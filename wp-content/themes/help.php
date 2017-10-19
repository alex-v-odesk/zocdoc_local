<?php
/*
Template Name: Help
*/
header("HTTP/1.1 301 Moved Permanently"); 
header("Location: https://support.zocdoc.com/patients"); 
exit();
?>

<?php get_header(); ?>

<main class="main-container">

<div style="background-image: url(<?php the_field('header_image')?>)" class="banner help clear-header">
  <div class="inner max-width">
    <div class="copy margin">
    <h1 class="sg-header1"><?php the_field('header_title')?></h1>
    <h5 class="sg-header5"><?php the_field('header_text')?></h5>
    </div>
    <div class="search-parent">
        <form role="search" class="noborder" method="get" id="searchform" action="<?php bloginfo('url') ?>">
          <input type="text" autocomplete="off" class="text" placeholder="Search here..." value="<?php echo get_search_query()?>" name="s" id="s">
          <input type="submit" class="search-button" class="search" id="searchsubmit" value="">
          <input type="hidden"  name="post_type" id="post_type" value="questions" />
        </form>
    </div>
  </div>
</div>



<?php /*popular questions*/ ?>
<div class="questions max-width">
<div class="margin">
  <h4 class="sg-header4">Top Questions</h4>
  <div class="hold-questions">
  <?php
  if (have_rows('top_questions')) :
      while (have_rows('top_questions')):the_row();
        $post_object = get_sub_field('question');
        if ($post_object):
          $post = $post_object;
          setup_postdata($post);?>

              <?php /*
      if (count(get_field('top_questions'))) > 5) {
        echo "<div class='question-parent hidden-answer'>";
      } else {
         echo "<div class='question-parent'>";
      }
    */ ?>
            <div class='question-parent'>
              <p class="sg-para1 question">
                <?php the_title()?>
                <img src="<?php echo get_theme_root_uri(); ?>/zocdoc/styles/output/images/down_arrow.png" />
              </p>

              <?php the_content()?>

            </div>
          <?php wp_reset_postdata();
        endif;
      endwhile;
    else:
      //no rows;
    endif;
  ?>
  </div>
</div>
</div>



<?php /*the_field('contact_text')*/ ?>

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

<?php
$footer_text='Still need help? <a class="phone-number" data-test="layout-phonenumber" href="tel:(855) 962-3621">(855) 962-3621</a></td>';
include( get_template_directory() . '/footer.php');
?>

</main>











