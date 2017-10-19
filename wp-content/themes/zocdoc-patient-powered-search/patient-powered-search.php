<?php
/*
Template Name: Patient Powered Search
*/
?>
<?php get_header(); ?>

<main class="main-container">
  
    <div id="pps-intro">Submit your search suggestions<br class="hide_desktop"/> to make Patient-Powered Search smarter.</div>

    <div id="animation_container" style="background-color:rgba(243, 243, 244, 1.00); width:1050px; height:1000px; margin: 0 auto;">
    
      <canvas id="canvas" width="1050" height="1000" style="position: absolute; display: block; background-color:rgba(243, 243, 244, 1.00);"></canvas>
      
      <div id="overlays">
  
        <div class="pps-question">&nbsp;</div>
        
        <?php echo the_content(); ?>
        
        <div class="pps-feedback"></div>
      </div>
    </div>
  

</main>

<?php get_footer(); ?>