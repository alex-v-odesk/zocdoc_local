<?php
//Set JOB DETAILS
$loc_id = "";
$current_office_name = "";
$locationID = "";
$locations = array();

if(isset($wp_query->query_vars['loc_id'])) {
    $loc_id = $wp_query->query_vars['loc_id'];
}

$rows = get_field('office');
foreach($rows as $row) {
    $locations[] = array('title' => $row['location_title'], 'slug' => $row['location'], 'office_id' => $row['office_id']);
    if( isset($loc_id) && $row['location'] == $loc_id ) {
        $current_office_name = $row['location_title'];
        $locationID = $row['office_id'];
    }
}

$data = get_job_board($locationID);

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
      <img src="<?php the_field('header_image'); ?>" class="cover" title="team photo" alt="team photo">
      <span class="layer"></span>

      <canvas id="intro-list-canvas" class="canvas" resize></canvas>

  </article>

  <div class="wrapper">

    <aside class="deparment-side-nav">

      <h3>Our Teams</h3>
      <?php if(isset($loc_id) && $loc_id != "") { ?>
          <button type="button" name="dropdown-locations" class="dropdown-btn"><?php echo $current_office_name ?></button>
      <?php } else { ?>
          <button type="button" name="dropdown-locations" class="dropdown-btn">at all locations</button>
      <?php } ?>
      <div class="filter-wrapper">
        <ul>
          <?php foreach($locations as $office) : ?>
            <?php $office_jobs = array(); $office_jobs = get_count_jobs($office['office_id']);  ?>
            <?php if ($office_jobs[0] >= 1) {?>
                <li class="office"><a href="?loc_id=<?php echo cleanString($office['slug']); ?>"><?php echo $office['title']; ?></a></li>
            <?php } ?>
          <?php endforeach; ?>
          <li class="office"><a href="?loc_id=">All locations</a></li>
        </ul>
      </div>

      <ul class="department-list">
        <?php $i = 0; ?>
        <?php foreach($data['departments'] as $dep) : ?>
          <?php if( count($dep['jobs']) > 0 ): ?>
            <li data-id="<?php echo cleanString($dep['name']); ?>"><button type="button" class="<?php if( $i == 0 ): ?>current<?php endif; ?>" name="button"><?php echo $dep['name']; ?></button></li>
            <?php $i++; ?>
          <?php endif; ?>
        <?php endforeach; ?>
      </ul>
    </aside>

    <article class="department-list-container full-size-block">

        <header class="sticky-header">
          <div class="blob-wrapper">
            <?php $i = 0; ?>
            <?php foreach($data['departments'] as $dep) : ?>
              <?php if( count($dep['jobs']) > 0 ): ?>
                  <h2 class="<?php if( $i == 0 ): ?>current<?php endif; ?>"><?php echo $dep['name']; ?>
                      <?php if(isset($loc_id) && $loc_id != "") { ?>
                          <span><?php echo count($dep['jobs']); ?>  <?php if( count($dep['jobs']) == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in <?php echo $current_office_name ?></span>
                      <?php } else { ?>
                          <span><?php echo count($dep['jobs']); ?>  <?php if( count($dep['jobs']) == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in all locations</span>
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

        <?php $i = 0; ?>

        <?php foreach($data['departments'] as $dep) : ?>
            <?php if( count($dep['jobs']) > 0 ): ?>

              <?php
                while (have_rows('team')) : the_row();
                  if(get_sub_field('department_id') == $dep['id']) :
                    $teamColor = get_sub_field('team_color');
                  endif;
                endwhile;
              ?>

                <section data-anchor="<?php echo cleanString($dep['name']); ?>" class="team row center <?php echo cleanString($dep['name']); ?>" data-color-index=<?php echo $i; ?> data-color="<?php echo $teamColor ?>">
                  <div class="content-wrapper row
                              col-lg-offset-1
                              col-med-offset-2
                              col-sm-offset-0
                              col-lg-6
                              col-med-8
                              col-sm-10">
                    <div class="team-header col-lg-12 col-sm-12">
                      <h2><?php echo $dep['name']; ?></h2>
                      <?php if( count($dep['jobs']) > 0 ): ?>
                        <?php if(isset($loc_id) && $loc_id != "") { ?>
                            <span><?php echo count($dep['jobs']); ?>  <?php if( count($dep['jobs']) == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in <?php echo $current_office_name ?></span>
                        <?php } else { ?>
                            <span><?php echo count($dep['jobs']); ?>  <?php if( count($dep['jobs']) == 1 ): ?>opening<?php else: ?>openings<?php endif; ?> in all locations</span>
                        <?php } ?>
                      <?php else: ?>
                        <span>No openings at any location</span>
                      <?php endif; ?>
                    </div>

                    <div class="about-text col-lg-7 col-sm-12">

                      <?php while (have_rows('team')) : the_row(); ?>
                        <?php if(get_sub_field('department_id') == $dep['id']) : ?>
                           <h3>About the Team</h3>
                           <p><?php the_sub_field('team_description'); ?></p>
                        <?php endif; ?>
                      <?php endwhile; ?>

                    </div>

                    <div class="quote col-lg-5 row col-sm-12">
                      <?php while (have_rows('team')) : the_row(); ?>
                        <?php if(get_sub_field('department_id') == $dep['id']) : ?>

                            <?php $quote = get_sub_field('team_quote')[0]; ?>

                            <p class="quote-text" style="color:<?php echo $teamColor?>;"><?php echo $quote['quote']; ?></p>
                            <span class="employee-name"><?php echo $quote['employee_name']; ?></span>
                            <span class="role"><?php echo $quote['role']; ?></span>
                            <img src="<?php echo $quote['image']; ?>" title="employee photo" alt="employee photo" />

                        <?php endif; ?>
                      <?php endwhile; ?>
                    </div>

                    <div class="job-openings-container col-lg-12 col-sm-12">
                      <ul>
                        <?php if( count($dep['jobs']) > 0 ): ?>
                          <?php foreach($dep['jobs'] as $job) : ?>
                            <?php
                            $title = str_replace(" ", "-", $job['title']);
                            $jobLink = '/about/careers/?job_id=' . urlencode($title) . '-' . $job['id'];
                            ?>
                            <li class="row middle">
                                <a data-color="<?php echo $teamColor?>;" href="<?php echo $jobLink; ?>"><?php echo $job['title'] ?>
                                    <span><?php echo $job['location']['name']; ?></span>
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
          <?php endif; ?>
        <?php endforeach; ?>

    </article>
  </div>

</section>

<?php get_footer(); ?>
