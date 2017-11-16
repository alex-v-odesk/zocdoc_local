<?php get_header(); ?>

<?php

$job_id = urldecode($wp_query->query_vars['job_id']);
$job_id = preg_replace("/[^0-9]/", "", $job_id);
$data = get_job($job_id);
$dep_data = get_depData($data['departments'][0]['id']);

?>

<section data-anchor="<?php echo $dep_data['team_name']; ?>" id="job-detail" class="page-wrapper">
    <article class="job-detail-container full-size-block">

        <section class="job row center">

            <div class="content-wrapper row col-lg-6 col-sm-10">

                <div class="job-header col-lg-12">
                    <span><?php echo $data['location']['name']; ?></span>
                    <h2><?php echo $data['title']; ?></h2>
                    <button type="button" name="apply" class="btn-apply">Apply</button>
                    <canvas id="detail-header-canvas" class="canvas header-canvas"
                            data-color='<?php echo $dep_data['team_color'] ?>' resize></canvas>
                </div>

                <div class="content-text col-lg-12">

                    <div class="culture">

                        <h3><?php echo $dep_data['team_culture'][0]['culture_title']; ?></h3>

                        <?php if ($dep_data['team_culture'][0]['youtube_id']) : ?>

                            <div class="video-container">

                                <div class="mask" data-id="1">
                                    <img
                                        src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/zocdoc_video_mask_white.png"
                                        alt=""/>
                                </div>

                                <div class="overlay-content">

                                    <button type="button" data-id="<?php echo $i; ?>" class="btn-overlay-play">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="play-icon" viewBox="0 0 26 34"
                                             width="100%" height="100%">
                                            <path class="st0"
                                                  d="M23.9,18.6l-19.7,14c-1.2,0.9-2.9,0-2.9-1.6V3c0-1.6,1.7-2.5,2.9-1.6l19.7,14C25,16.2,25,17.8,23.9,18.6z"/>
                                        </svg>
                                    </button>

                                    <div class="poster">
                                        <img
                                            src="http://img.youtube.com/vi/<?php echo $dep_data['team_culture'][0]['youtube_id']; ?>/mqdefault.jpg"/>
                                    </div>

                                </div>

                                <?php if ($dep_data['team_culture'][0]['video_poster_image']) : ?>
                                    <div class="poster">
                                        <img
                                            src=<?php echo $dep_data['team_culture'][0]['video_poster_image']; ?> alt=""/>
                                    </div>
                                <?php endif; ?>

                                <div class="yt-player" id="yt-player-"
                                     data-youtubeid=<?php echo $dep_data['team_culture'][0]['youtube_id']; ?>></div>

                            </div>

                        <?php elseif ($dep_data['team_culture'][0]['image']) : ?>
                            <div class="culture-image-wrapper">
                                <img class="culture-image" src=<?php echo $dep_data['team_culture'][0]['image']; ?> alt=""/>
                                <img class="mask culture-mask" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/zocdoc_video_mask_white.png"/>
                            </div>

                        <p class="quote"
                           style="color:<?php echo $dep_data['team_color'] ?>;"><?php echo $dep_data['team_culture'][0]['quote']; ?></p>
                        <span
                            class="employee-name"><strong><?php echo $dep_data['team_culture'][0]['employee_name']; ?></strong>, <?php echo $dep_data['team_quote'][0]['role']; ?></span>
                            
                        <?php endif; ?>


                    </div>

                    <p><strong>About the position</strong></p>

                    <?php echo html_entity_decode($data['content']); ?>

                </div>

                <div id="grnhse_app" class="col-lg-12" data-id="<?php echo $data['id']; ?>"></div>

            </div>

        </section>

    </article>

</section>

<script src="https://boards.greenhouse.io/embed/job_board/js?for=zocdoc"></script>

<?php get_footer(); ?>
