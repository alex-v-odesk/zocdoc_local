<?php get_header(); ?>

<?php get_template_part('template-parts/careers', 'header'); ?>

<section id="careers" class="page-wrapper">

    <article class="intro zocdoc full-size-block row center middle hidden">

        <div class="content intro-content">
            <h2><?php the_field('intro_title'); ?></h2>
            <p><?php the_field('intro_subtitle'); ?></p>
        </div>

        <span class="arrow">
                <span class="middle"></span>
                <span class="line left-line"></span>
                <span class="line right-line"></span>
        </span>

    </article>

    <article class="mission story full-size-block row center middle hidden"
             data-src="<?php the_field('our_story_bg_image'); ?>">
        <!--  -->
        <div class="bg-image"
             style="background:url(<?php the_field('our_story_bg_image'); ?>) 50% 50% / cover no-repeat fixed;">
            <div class="layer-color"></div>
        </div>
        <div class="content story-content">
            <h2><?php the_field('our_story_title'); ?></h2>
            <?php the_field('our_story_text'); ?>

            <div class="mask-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="64" height="63" viewBox="0 0 64 63">
                    <image xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA/CAMAAABnwz74AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABsFBMVEUAAAD+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lz+8lwAAADvZ5b2AAAAjnRSTlMAH0lvlbHF2+7+49a3kmMmLXWy6OWhSgOO4OmMBV7M+5scAmjf83MEOs7RK4j3GcYBIdycJJoUgrlUbvEiGsOWXxj55w55hdTyECB0YNgwvYna1fpSgeyo3sjw/FnhXauGJ+agTOsGDdCjNCUI0ipGi3iKD499whFX9epQB/2dFbSvMTOeKN1bDGvH5LuUZEVdvQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVEjHpZf3W9NQFIZPhUqCiJUhZSNYyihYNghlyGqZ1oKoWFBZglD2qLIVBJHzN9MkT4WWjJt7vt/f97nPyU3OFwD1WB4kJFofJgmCiELyo5THqU+APbanael4LxmZz7KYaHs2aiUn12JA5+UXoG4Ki57r4MUlL9AwjlKnFl9WboxLqahUxZ0ukY1HrMpX4atfsuJSXO54vqbWDI9YF/dE6zPM8YgNMWdoTDLLIzbd4d3N5nkUW24Frzh4xNa2KO9p5RJge3QMHXw8YqfCd73mFXT3yIJeXh6xTxb08wu8vgg/wM8jDkYEQxTBcESQSBHgCMAoSfAGwE8SvAUQSAL0QIAmGAPue6hkHN7RBBPwnib4AAU0QTZM0AQfYZwmmIRPNEEA2mgCASBIEgQBMkmCcoApkmAawEe6zJ8jnxQrRSBt+jGK4ItULQjP4au8nQb5BTPyZvB5uQWzynbjfh/m5hXBQg6nwB7d8Al8fOH/4ur8xiVYvC0pS5McfOD7nZ6US5mAlOUV03zyQkxVDDlM8uJqXFltYe7KStbu1eV1U/yoyu/Lhgl+ZVOlsbuLmHm/R/Wfwb3FyFdUg0a2mSa5swua2Qsb4qI9D3QSMrpRP36Cfvb79ErLweERGCZ0rHn6k1NjXMovq9owHb9tbLiUM9d5LB22/rlgx+VUXh7+vQqjo9v/7/qyTGvyN0g2y8XfFTBKAAAAAElFTkSuQmCC" width="64" height="63"/>
                    <path d="M38.089,31.744 L30.707,37.007 C30.245,37.337 29.618,36.990 29.618,36.403 L29.618,25.876 C29.618,25.289 30.245,24.941 30.707,25.271 L38.089,30.535 C38.496,30.825 38.496,31.454 38.089,31.744 Z" class="cls-1"/>
                </svg>
                <span>Watch our story</span>
            </div>
        </div>

        <div class="story-video-overlay row middle center hidden">

            <div class="story-video row middle center">

              <button type="button" name="back" class="btn-back">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 49 49" style="enable-background:new 0 0 49 49;" xml:space="preserve">
                <style type="text/css">
                	.st2{fill:#FCF060;}
                	.st3{fill:#1E2758;}
                </style>
                <path class="st2" d="M49,25.3c0-14.5-8.7-22.8-23.9-22.8C13,2.5,0,9.6,0,20.5c0,21.8,16.7,25,25.8,25C41,45.5,49,39.9,49,25.3"/>
                <g>
                	<g>
                		<path class="st3" d="M25.9,24l6.1-6.6c0.4-0.4,0.4-1.1,0-1.5c-0.4-0.4-1-0.4-1.4,0l-6.3,6.8l-6.1-6.8c-0.4-0.4-1-0.4-1.4,0
                			c-0.4,0.4-0.4,1.1,0,1.5l5.9,6.6l-5.9,6.6c-0.4,0.4-0.4,1.1,0,1.5c0.4,0.4,1,0.4,1.4,0l6.1-6.8l6.3,6.8c0.4,0.4,1,0.4,1.4,0
                			c0.4-0.4,0.4-1.1,0-1.5L25.9,24z"/>
                	</g>
                </g>
                </svg>
              </button>

                <div class="video-container">

                    <div class="poster">
                        <img src="<?php the_field('our_story_video_poster'); ?>" alt=""/>
                    </div>

                    <canvas id="overlay-canvas" class="canvas" resize></canvas>

                    <div class="yt-player" id="yt-player-10"
                         data-youtubeid="<?php echo the_field('our_story_youtube_video_id'); ?>"></div>

                    <div class="custom-video-controls-container">

                        <div class="title">
                            <span>Our Mission</span>
                        </div>

                        <div class="timer">
                            <span class="elapsed-time"></span> - <span class="total-time"></span>
                        </div>

                        <div class="timeline">
                            <span class="current-time"></span>
                        </div>

                        <button class="control-btn btn-fullscreen" rel="fullscreen"></button>
                        <button class="control-btn btn-play active" rel="play"></button>
                        <button class="control-btn btn-pause" rel="pause"><span></span><span></span></button>

                    </div>

                </div>

            </div>

        </div>

    </article>

    <article class="values full-size-block row middle hidden">

        <h2><?php the_field('our_values_title'); ?></h2>

        <div class="value-videos-wrapper scroll-content col-lg-6 col-sm-12">
            <?php $i = 0; ?>
            <?php while (have_rows('value_video')) : the_row(); ?>

                <?php $youtubeID = get_sub_field('youtube_id'); ?>

                <?php if(isset($youtubeID) && $youtubeID != "" ) { ?>

                    <div data-anchor="<?php echo cleanString(get_sub_field('value_title')); ?>"
                         data-description="<?php the_sub_field('value_description'); ?>"
                         class="value-video">

                        <?php $poster = get_sub_field_object('poster_image'); ?>

                        <div data-id="<?php echo $i; ?>" class="video-container">

                            <div class="overlay-content">
                                <h3><?php the_sub_field('value_title'); ?></h3>

                                <button type="button" data-id="<?php echo $i; ?>" class="btn-overlay-play">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="play-icon" viewBox="0 0 26 34"
                                         width="100%" height="100%">
                                        <path class="st0"
                                              d="M23.9,18.6l-19.7,14c-1.2,0.9-2.9,0-2.9-1.6V3c0-1.6,1.7-2.5,2.9-1.6l19.7,14C25,16.2,25,17.8,23.9,18.6z"/>
                                    </svg>
                                </button>

                            </div>

                            <div class="mask" data-id="<?php echo $i; ?>">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/masks/zocdoc_video_mask_0<?php echo $i; ?>.png" />
                            </div>

                            <div class="poster">
                                <img src=<?php echo $poster['value']['url']; ?> alt=""/>
                            </div>

                            <div class="yt-player" id="yt-player-<?php echo $i; ?>" data-youtubeid=<?php echo $youtubeID; ?>></div>

                            <div class="custom-video-controls-container hidden">

                                <div class="timer">
                                    <span class="elapsed-time"></span> - <span class="total-time"></span>
                                </div>

                                <div class="timeline">
                                    <span class="current-time"></span>
                                </div>

                                <button class="control-btn btn-fullscreen" rel="fullscreen"></button>
                                <button class="control-btn btn-play active" rel="play"></button>
                                <button class="control-btn btn-pause" rel="pause"><span></span><span></span></button>

                            </div>

                            <div class="description">
                              <?php the_sub_field('value_description'); ?>
                            </div>

                        </div>
                    </div>
                <?php } else {  ?>

                    <div data-anchor="<?php echo cleanString(get_sub_field('value_title')); ?>"
                         data-description="<?php the_sub_field('value_description'); ?>"
                         class="value-video">

                        <?php $poster = get_sub_field_object('poster_image'); ?>

                        <div data-id="<?php echo $i; ?>" class="video-container no-video-player">

                            <div class="overlay-content">
                                <h3><?php the_sub_field('value_title'); ?></h3>
                            </div>

                            <div class="mask no-video-player" data-id="<?php echo $i; ?>">
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/masks/zocdoc_video_mask_0<?php echo $i; ?>.png" />
                            </div>

                            <div class="poster">
                                <img src=<?php echo $poster['value']['url']; ?> alt=""/>
                            </div>

                            <div class="description">
                              <?php the_sub_field('value_description'); ?>
                            </div>

                        </div>
                    </div>
                <?php } ?>
                <?php $i++; ?>
            <?php endwhile; ?>

        </div>
    </article>

    <article class="patients full-size-block row center middle hidden">

        <div class="content patients-content">

            <h2><?php the_field('patients_section_title'); ?></h2>

            <?php $i = 0; ?>
            <?php while (have_rows('patient_quote')) : the_row(); ?>
                <div class="patient-block">
                    <div class="content-block">
                        <div class="quote quote-<?php echo $i; ?>">
                            <p class="img img-<?php echo $i; ?>"><img src="<?php the_sub_field('quote_image'); ?>"/></p>
                            <p class="text text-<?php echo $i; ?>"><?php the_sub_field('quote_text'); ?></p>
                        </div>
                        <div class="type type-<?php echo $i; ?>">
                            <img src="<?php the_sub_field('patient_photo'); ?>"/>
                            <p>
                                <span class="name"><?php the_sub_field('patient'); ?></span>
                                <span class="job"><?php the_sub_field('patient_role'); ?></span>
                            </p>
                            <div class="typing typing-<?php echo $i; ?>">
                                <span class="round-animate"></span>
                                <span class="round-animate"></span>
                                <span class="round-animate"></span>
                                <span class="round"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php $i++; ?>
            <?php endwhile; ?>
        </div>

    </article>

    <article class="culture full-size-block row center middle hidden">

        <div class="carousel culture-carousel row center">

            <div class="carousel-items-container">
                <div class="layer"></div>
                <ul class="carousel-items">
                    <?php $i = 0; ?>
                    <?php while (have_rows('cultural_perk')) : the_row(); ?>
                        <li class="carousel-item <?php if ($i == 0): ?>active<?php endif; ?>"
                            data-id="<?php echo $i; ?>">
                            <div class="text-container content-carousel">
                                <img class="icon" src="<?php the_sub_field('cultural_perk_icon'); ?>" alt=""/>
                                <?php the_sub_field('cultural_perk_description'); ?>
                            </div>
                            <div class="image-container" style="background:url(<?php the_sub_field(
                                'cultural_perk_image'
                            ); ?>) 50% 50% / cover no-repeat;"></div>
                        </li>
                        <?php $i++; ?>
                    <?php endwhile; ?>
                </ul>

                <nav class="carousel-indicators-container content-carousel">
                    <ul class="carousel-indicators row center middle">
                        <?php $i = 0; ?>
                        <li class="selector"></li>
                        <?php while (have_rows('cultural_perk')) : the_row(); ?>
                            <li class="indicator" data-id="<?php echo $i; ?>">
                                <!-- <div class="circle"></div> -->
                            </li>
                            <?php $i++; ?>
                        <?php endwhile; ?>
                    </ul>
                </nav>

            </div>

        </div>

        <div class="overlay-content-container content-carousel">
            <h2><?php the_field('culture_section_title'); ?></h2>
            <?php the_field('culture_section_description'); ?>
        </div>

        <div class="press row center middle">
            <div class="content press-content">
                <?php the_field('press_sippet'); ?>
                <span class="author">- <?php the_field('athor'); ?>, <?php the_field('published_date'); ?></span>
                <ul class="logo-list">
                    <?php while (have_rows('award_logo')) : the_row(); ?>
                        <li><img src="<?php the_sub_field('logo'); ?>" alt=""/></li>
                    <?php endwhile; ?>
                </ul>
            </div>
        </div>

    </article>

    <article class="perks full-size-block hidden">
        <h2><?php the_field('perks_title'); ?></h2>
        <h3><?php the_field('perks_subtitle'); ?></h3>

        <div class="content perks-content">
            <?php while (have_rows('perk')) : the_row(); ?>
                <div class="perk-block">
                    <p class="img"><img src="<?php the_sub_field('perk_image'); ?>"/></p>
                    <p class="text"><?php the_sub_field('perk_description'); ?></p>
                </div>
            <?php endwhile; ?>
        </div>

    </article>

    <article class="join full-size-block row center middle hidden">
        <?php
        $counts = get_count_jobs();
        ?>

        <div class="main-content full-size-block row center middle">

            <canvas id="join-canvas" class="canvas" resize></canvas>
            
            <div class="content join-content">
                <h2><?php the_field('join_us_title'); ?></h2>
                <p>
                    <?php echo $counts[0] == 0 || $counts[0] == 1 ? $counts[0] . ' open position. ' : $counts[0] . ' open positions. ' ?>
                    <?php echo $counts[1] == 0 || $counts[1] == 1 ? $counts[1] . ' team.' : $counts[1] . ' teams.' ?>
                    3 locations.
                </p>
            </div>

            <img src="<?php the_field('join_us_image'); ?>" class="cover">
            <span class="layer"></span>

            <div class="mobile-blob-overlay">
              <a href="/about/careers-list">
                <span>Join us</span>
              </a>
            </div>

        </div>

        <div class="footer-container scroll-content"></div>

    </article>

    <canvas id="main-canvas" class="canvas" resize></canvas>

</section>

<?php get_footer(); ?>
