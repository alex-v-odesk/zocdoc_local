<?php
/*
Template Name: Knowledge base template
*/
?>
<?php get_header('header'); ?>
  
<style type="text/css">
  @media only screen and (max-width: 768px){
.template-video {
    height: auto !important;
  }
  .sg-para1 p {
    font-size:20px !important;
  }
  .template-video .max-width {
    text-align: center;
  }
}
h4 > p > a { color: #2bbfed !important; }
</style>
<main class="main-container <?php
    if (count($sections) == 0) {
      echo 'no-pad';
    }
  ?>">



<?php

if( have_rows('knowledge_base') ):
    while ( have_rows('knowledge_base') ) : the_row();
        $type = get_sub_field('type');
        if($type == "Header"){
          TEMPLATE_HEADER();
        }
        if($type == "Body"){
          KNOWLEDGE_BODY();
        }
    endwhile;
else :
endif;
?>

<?php function TEMPLATE_HEADER() {
  // global $post;
?>

<div class="providers-header link-el">
  <div class="inner max-width">
    <div class="copy margin">
      <h2 class="sg-header2"><?php the_sub_field('main_templ_text') ?></h2>
      <h5 class="sg-para2"><?php the_sub_field('secondary_text') ?></h5>
      <?php
      if (get_sub_field('button_text'))
        echo "<a class='sg-prov-btn sg-btn-med prov-btn' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
      ?>
    </div>
    <div class="container">
      <div class="logo-slide">
        <?php if( have_rows('logo_carousel') ): ?>
        <?php while( have_rows('logo_carousel') ): the_row(); 
          //vars
          $image = get_sub_field('logo_image');
        ?>
          <div class="logo-panel"><img src="<?php echo $image; ?>" alt="" /></div>
        <?php endwhile; ?>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>
<?php } ?>

<?php function KNOWLEDGE_BODY() {
  // global $post;
?>
<div class="knowledge-header">
  <div class="inner max-width">
  <?php if( have_rows('knowledge_base_body') ): ?>
  <?php while( have_rows('knowledge_base_body') ): the_row(); 
  //vars
  $patient_image = get_sub_field('patient_image');
  $patient_hed = get_sub_field('patient_knowledge_hed');
  $patient_p = get_sub_field('patient_knowledge_body');
  $practice_image = get_sub_field('practice_image');
  $practice_hed = get_sub_field('practice_knowledge_header');
  $practice_p = get_sub_field('practice_knowledge_body');
  ?>
    <div class="container knowledge-base-cont">
      <div class="knowledge-body">
        <div class="kb-image"><img src="<?php echo $patient_image; ?>" alt="patient" title="patient"></div>
        <h5 class="sg-header7" style="padding-bottom:20px;"><?php echo $patient_hed; ?></h5>
        <h5 class="sg-para3"><?php echo $patient_p; ?></h5>
        <a class='sg-prov-btn sg-btn-med prov-btn' href="http://support.zocdoc.com/patients">I'm a Patient</a>
      </div>
      <div class="knowledge-body">
        <div class="kb-image"><img src="<?php echo $practice_image; ?>" alt="practice" title="practice"></div>
        <h5 class="sg-header7" style="padding-bottom:20px;"><?php echo $practice_hed; ?></h5>
        <h5 class="sg-para3"><?php echo $practice_p; ?></h5>
        <a class='sg-prov-btn sg-btn-med prov-btn' href="http://support.zocdoc.com/practices">I'm a Practice</a>
      </div>
    </div>
  <?php endwhile; ?>
<?php endif; ?>
  </div>
</div>
<?php } ?>



<?php
  include( get_template_directory() . '/footer.php');
?>
</main>