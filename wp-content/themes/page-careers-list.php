<?php
//Set JOB DETAILS
$loc_id = "";
$current_office_name = "";
$locationID = "";
$locations = array();

if(isset($_GET['location']) && !empty($_GET['location'])) {
    $current_office_name = $_GET['location'];
}


//$data = get_job_board($locationID);
//echo '<pre>';
//print_r($data);
//echo '</pre>';

?>

<?php get_header(); ?>

<?php get_template_part('template-parts/careers','list-header'); ?>

<section id="careers-list" class="page-wrapper">

  <article class="list-header full-size-block row center middle">

      <div class="content intro-content">
          <?php
            $counts = get_count_jobs($locationID);
          ?>

          <h2><?php the_field('header_title'); ?></h2>
          <p>
              <?php echo $counts[0] == 0 || $counts[0] == 1 ? $counts[0] . ' open position. ' : $counts[0] . ' open positions. ' ?>
              <?php echo $counts[1] == 0 || $counts[1] == 1 ? $counts[1] . ' team.' : $counts[1] . ' teams.' ?>
              3 locations.
          </p>
      </div>
      <img src="<?php the_field('header_image'); ?>" class="cover">
      <span class="layer"></span>

      <canvas id="intro-list-canvas" class="canvas" resize></canvas>

  </article>

  <div class="wrapper">

    <aside class="deparment-side-nav">
      <h3>Our Teams</h3>
      <?php if(isset($current_office_name) && $current_office_name != "") {
			$current_office_name = str_replace('-', ' ', $current_office_name);?>
          <button type="button" name="dropdown-locations" class="dropdown-btn"><?php echo ucwords($current_office_name); ?></button>
      <?php } else { ?>
          <button type="button" name="dropdown-locations" class="dropdown-btn">at all locations</button>
      <?php } ?>
      <div class="filter-wrapper">
        <ul>
          <?php 
		  $terms = get_terms( 'location', array(
				'hide_empty' => false,
			) );
		  foreach($terms as $term) : ?>
            <?php if ($term->count >= 1) {?>
                <li class="office"><a href="?location=<?php echo $term->slug; ?>"><?php echo $term->name; ?></a></li>
            <?php } ?>
          <?php endforeach; ?>
          <li class="office"><a href="?location=">All locations</a></li>
        </ul>
      </div>

      <ul class="department-list">
        <?php $i = 0;
        $terms = get_terms( 'type', array(
            'hide_empty' => false,
        ) );
        foreach($terms as $term) : ?>
            <li data-id="<?php echo cleanString($term->name); ?>"><button type="button" class="<?php if( $i == 0 ): ?>current<?php endif; ?>" name="button"><?php echo $term->name ?></button></li>
            <?php $i++; ?>
        <?php endforeach; ?>
      </ul>
    </aside>

    <article class="department-list-container full-size-block">
        <header class="sticky-header">
            <div class="blob-wrapper">
              <?php $i = 0; ?>
              <?php foreach($terms as $term) : ?>
                <?php if( $term->count > 0 ): ?>
                    <h2 class="<?php if( $i == 0 ): ?>current<?php endif; ?>"><?php echo $term->name; ?>
                        <?php if(isset($loc_id) && $loc_id != "") { ?>
                            <span><?php echo $term->count ?>  <?php if( $term->count == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in <?php echo ucwords($current_office_name) ?></span>
                        <?php } else { ?>
                            <span><?php echo $term->count; ?>  <?php if( $term->count == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in all locations</span>
                        <?php } ?>
                    </h2>
                    <?php $i++; ?>
                <?php endif; ?>
              <?php endforeach; ?>
                <!--img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/big_list_header_blob.svg" class="big-blob" alt="" /-->
                <canvas id="sticky-canvas" class="canvas" resize></canvas>
                <!--img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/small_list_header_blob.svg" class="small-blob" alt="" /-->
            </div>
        </header>
        <?php $i = 0;
        $terms = get_terms( 'type', array(
            'hide_empty' => false,
        ) ); 
        ?>
        <?php foreach($terms as $term) : ?>
              <?php
                $teamColor = get_term_meta( $term->term_id, 'team_color', true);
              ?>

                <section data-anchor="<?php echo cleanString($term->name); ?>" class="team row center <?php echo cleanString($term->name); ?>" data-color-index=<?php echo $i; ?> data-color="<?php echo $teamColor ?>" id="<?php echo cleanString($term->name); ?>">
                  <div class="content-wrapper row
                              col-lg-offset-1
                              col-med-offset-2
                              col-sm-offset-0
                              col-lg-6
                              col-med-8
                              col-sm-10">
                    <div class="team-header col-lg-12 col-sm-12">
                      <h2><?php echo $term->name; ?></h2>
                      <?php 
						$tax = array();
						$arg = array(
                                    'posts_per_page' => -1,
                                    'post_type' => 'careers',
                                    'orderby'  => 'name',
                                    'order'  => 'ASC',
                                );
						$tax[] =   array(
										'taxonomy' => 'type',
										'field' => 'term_id',
										'terms' => $term->term_id,
									);
						if(isset($_GET['location']) && !empty($_GET['location'])){
						$tax[] =array(
								'taxonomy' => 'location',
								'field' => 'slug',
								'terms' => $_GET['location'],
							);
						$tax[] =  "'relation' => 'AND'";	
						}
						if(!empty($tax)){
							$arg['tax_query'] = $tax;
						}
						
                        $job_array = get_posts($arg);
					  
					  if( count($job_array) > 0 ): ?>
                        <?php if(isset($_GET['location']) && $_GET['location']!= "") { ?>
                            <span><?php echo count($job_array); ?>  <?php if( count($job_array) == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in <?php echo ucwords($current_office_name); ?></span>
                        <?php } else { ?>
                            <span><?php echo count($job_array); ?>  <?php if( count($job_array) == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in all locations</span>
                        <?php } ?>
                      <?php else: ?>
                        <span>No openings at any location</span>
                      <?php endif; ?>
                    </div>

                    <div class="about-text col-lg-7 col-sm-12">
                        <h3>About the Team</h3>
                        <p><?php echo $term->description; ?></p>
                    </div>
                      
                    <div class="quote col-lg-5 row col-sm-12">
                      <?php 
                        $team_quotes = get_field('team_quote', 'type_'.$term->term_id);
                        if(!empty($team_quotes)){
                            foreach ($team_quotes as $team_quote) {  ?>
                            <p class="quote-text" style="color:<?php echo $teamColor?>;"><?php echo $team_quote['quote']; ?></p>
                            <span class="employee-name"><?php echo $team_quote['employee_name']; ?></span>
                            <span class="role"><?php echo $team_quote['role']; ?></span>
                            <img src="<?php echo $team_quote['image']['url']; ?>" alt="" />
                        <?php }
                        } ?>
                    </div>
                      
                    <div class="job-openings-container col-lg-12 col-sm-12">
                      <ul>
                        <?php
                        if( count($job_array) > 0 ): ?>
                          <?php foreach($job_array as $job) : ?>
                            <?php
                            $title = str_replace(" ", "-", $job->post_title);
                            $job_id = get_post_meta($job->ID, '_d_id', true);
                            $jobLink = '/about/careers/?job_id=' . urlencode($title) . '-' . $job_id;
                            ?>
                            <li class="row middle">
                                <a data-color="<?php echo $teamColor?>;" href="<?php echo $jobLink; ?>"><?php echo $job->post_title ?>
                                    <?php 
                                    $location = wp_get_post_terms($job->ID, 'location',  array("fields" => "names")); ?>
                                    <span><?php if(!empty($location)){ echo $location[0]; } ?></span>
                                    <span class="learn-more">
                                      Learn More
                                      <svg class="arrow-svg" xmlns="http://www.w3.org/2000/svg" width="22" height="28" viewBox="0 0 22 28">
                                        <path class="cls-1" d="M10.987,23.458a1,1,0,0,1-1.026-.963V3.964a1.028,1.028,0,0,1,2.051,0V22.495A1,1,0,0,1,10.987,23.458Zm0,1.544L3.3,17.781a0.922,0.922,0,0,1,0-1.362,1.073,1.073,0,0,1,1.45,0l6.24,5.86,6.24-5.86a1.072,1.072,0,0,1,1.45,0,0.922,0.922,0,0,1,0,1.362Z"/>
                                      </svg>
                                    </span>
                                </a>
                            </li>
                          <?php endforeach; ?>
                        <?php else: ?>
                            <li class="row middle">Currently no openings in this team.</li>
                        <?php endif; ?>
                      </ul>
                    </div>
                  </div>
                </section>

                <?php
                  if($i < 4) {

                    $i++;

                  } else {

                    $i = 0;
                  }
                ?>
        <?php endforeach; ?>

    </article>
  </div>

</section>

<?php get_footer(); ?>
