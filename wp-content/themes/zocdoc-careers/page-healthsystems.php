<?php get_header(); ?>

<?php get_template_part('template-parts/healthsystems', 'header'); ?>

<section id="health-systems" class="page-wrapper">

    <div class="pardot-overlay">
      <div class="iframe-container">
        <div class="wrapper">
          <button type="button" name="btn-close" class="btn-close">
            <span class="line-1"></span>
            <span class="line-2"></span>
          </button>

        </div>
      </div>
    </div>

    <article class="start why full-size-block row center middle">

        <div class="content intro-content">
            <h1><?php the_field('start_title'); ?></h1>
        </div>

        <div class="scroll-cta">
            <p><?php the_field('start_scroll_text'); ?></p>
            <span class="arrow">
                <span class="middle"></span>
                <span class="line left-line"></span>
                <span class="line right-line"></span>
            </span>
        </div>

    </article>

    <article class="calendar full-size-block row center">

        <div class="content">

            <h3 class="white"><?php the_field('calendar_title'); ?></h3>

            <h3><?php the_field('calendar_second_title'); ?></h3>

            <h3><?php the_field('calendar_third_title'); ?></h3>

            <h3><?php the_field('calendar_fourth_title'); ?></h3>

        </div>

    </article>

    <article class="patient full-size-block row center middle">

        <div class="content">

            <img class="first-img icon-patient-first" src="<?php the_field('patient_icon_first'); ?>" title="alarm image" alt="alarm image">
            <img class="second-img icon-patient-first" src="<?php the_field('patient_icon_second'); ?>" title="email image" alt="email image">
            <img class="third-img icon-patient-first" src="<?php the_field('patient_icon_third'); ?>" title="calendar image" alt="calendar image">

            <h2><?php the_field('patient_title'); ?></h2>

            <img class="client" src="<?php the_field('patient_client'); ?>" title="patient image" alt="patient image">
            <img class="doctor" src="<?php the_field('patient_doctor'); ?>" title="doctor image" alt="doctor image">

        </div>

        <div class="content-second">
            <h2 class="second"><?php the_field('patient_second_title'); ?></h2>
            <button class="hs-btn-contact">
              <?php the_field('patient_contact_button'); ?>
            </button>
        </div>

    </article>

    <article class="clients full-size-block row center middle">

        <div class="content intro-content">

            <h2><?php the_field('clients_title'); ?></h2>

            <div class="blocks">

                <div class="quote-block block">

                    <h3>
                        <img src="<?php the_field('clients_icon_left'); ?>" title="award winning" title="award winning" />
                        <?php the_field('clients_subtitle_left'); ?>
                    </h3>

                    <p class="quote">
                        <span>“</span><?php the_field('clients_quote_left'); ?>“
                        <span class="separator"></span>
                    </p>

                    <p class="author">
                        <span>— </span><?php the_field('clients_author_left'); ?>“
                    </p>

                    <p class="work"><?php the_field('clients_author_work_left'); ?></p>

                </div>

                <div class="clients-logos-block block">

                    <h3>
                        <img src="<?php the_field('clients_icon_right'); ?>" title="client logos" alt="client logos" />
                        <?php the_field('clients_subtitle_right'); ?>
                    </h3>

                    <div class="logos">

                        <?php $i = 0; ?>
                        <?php while (have_rows('clients_logos_compagn_right')) : the_row(); ?>
                            <p id="logo-<?php echo $i ?>" class="logo">
                                <img src="<?php echo get_sub_field('logo'); ?>" title="client logo" alt="client logo">
                            </p>
                            <?php $i++; ?>
                        <?php endwhile; ?>
                        <span class="separator"></span>

                    </div>

                </div>
            </div>
            <button class="hs-btn-contact">
              <?php the_field('clients_contact_button'); ?>
            </button>
        </div>

    </article>

    <article class="market full-size-block">

        <img class="top-left" src=<?php the_field('market_top_left'); ?> title="app imagery" alt="app imagery">
        <img class="top-right" src=<?php the_field('market_top_right'); ?> title="app imagery" alt="app imagery">

        <img class="bottom-left" src=<?php the_field('market_bottom_left'); ?> title="app imagery" alt="app imagery">
        <img class="bottom-right" src=<?php the_field('market_bottom_right'); ?> title="app imagery" alt="app imagery">

        <img class="bottom-left-second" src=<?php the_field('market_second_bottom_left'); ?> title="app imagery" alt="app imagery">
        <img class="bottom-right-second" src=<?php the_field('market_second_bottom_right'); ?> title="app imagery" alt="app imagery">

        <div class="content">
            <h2><?php the_field('market_first_title'); ?></h2>
            <p><?php the_field('market_first_subtitle'); ?></p>
            <button class="hs-btn-contact">
              <?php the_field('market_contact_button'); ?>
            </button>
        </div>

        <div class="content second-content">
            <h2><?php the_field('market_second_title'); ?></h2>
            <p><?php the_field('market_second_subtitle'); ?></p>
            <button type="button" name="button"><a target="_blank" href="<?php the_field('market_second_button_link'); ?>" class="market-link"><?php the_field('market_second_button_text'); ?></a></button>
        </div>

    </article>

    <article class="intro why full-size-block row center middle">

        <div class="title-blob">

            <div class="content intro-content">
                <h1><?php the_field('intro_title'); ?></h1>
                <img class="mobile-blob" src="<?php echo get_template_directory_uri() ?>/assets/images/masks/blob-intro.png" alt="solid background color" title="solid background color">
            </div>

            <div class="scroll-cta">
            <span class="arrow">
                <span class="middle"></span>
                <span class="line left-line"></span>
                <span class="line right-line"></span>
            </span>
            </div>

        </div>

        <div class="search full-size-block row center middle">

            <div class="content">
                <h2><?php the_field('search_title'); ?></h2>
                <div class="search-module">
                    <p>
                        <span class="type">1</span>
                        <span class="type">2</span>
                        <span class="type space">0</span>
                        <span class="type">m</span>
                        <span class="type">i</span>
                        <span class="type">l</span>
                        <span class="type">l</span>
                        <span class="type">i</span>
                        <span class="type">o</span>
                        <span class="type">n</span>
                        <span class="border"></span>
                    </p>
                    <img src="<?php the_field('search_icon'); ?>" title="search icon" alt="search icon">
                </div>
                <h3><?php the_field('search_subtitle'); ?></h3>
                <p class="text"><?php the_field('search_text'); ?></p>
            </div>

        </div>

        <div class="percentage full-size-block row center middle">

            <div class="content">
                <?php for ($x = 0; $x <= 6; $x++) { ?>
                    <img class="cash-<?php echo $x ?> cash"
                         src="<?php echo get_template_directory_uri() ?>/assets/images/cash.png" title="cash" alt="cash">
                <?php } ?>

                <h4><?php the_field('percentage_number'); ?><span>%</span></h4>
                <h3><?php the_field('percentage_title'); ?></h3>
                <p class="text"><?php the_field('percentage_subtitle'); ?></p>
                <button class="hs-btn-contact">
                  <?php the_field('percentage_contact_button'); ?>
                </button>

            </div>

        </div>

    </article>

    <article class="loyalty full-size-block center">

        <img class="bg-image" src="<?php the_field('loyalty_left_bigger_image'); ?>" title="zd dude" alt="zd dude">
        <div class="content">
            <h2><?php the_field('loyalty_title'); ?></h2>
            <p class="heart center row middle">
                <img src="<?php the_field('loyalty_right_image'); ?>">
                <span class="number"><?php the_field('loyalty_number'); ?><span class="perc">%</span></span>
            </p>
            <h3><?php the_field('loyalty_subtitle'); ?></h3>
            <p class="text"><?php the_field('loyalty_text'); ?></p>
        </div>

    </article>

    <article class="smart full-size-block center">

        <div class="content">
            <h3><?php the_field('smart_number'); ?><span class="perc">%</span></h3>
            <h2><?php the_field('smart_title'); ?></h2>
            <p class="text"><?php the_field('smart_text'); ?></p>
        </div>
        <img class="bg-image" src="<?php the_field('smart_right_bigger_image'); ?>" title="smart" alt="smart">

    </article>

    <article class="stars full-size-block">

        <div class="stars-content content row center middle">
            <div class="content-text">
                <?php for ($x = 0; $x <= 6; $x++) { ?>
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/stars.svg" title="star" alt="star"
                         class="stars-<?php echo $x; ?> stars-icon">
                <?php } ?>
                <h4><?php the_field('stars_number'); ?></h4>
                <h3><?php the_field('stars_title'); ?></h3>
                <p class="text"><?php the_field('stars_text'); ?></p>
            </div>
        </div>

        <div class="reviews content row center middle">
            <div class="content-text">
                <?php for ($x = 0; $x <= 5; $x++) { ?>
                    <span class="line-<?php echo $x ?> line">
                        <span class="bg"></span>
                    </span>
                <?php } ?>

                <h4>
                    <?php the_field('reviews_number'); ?>
                    <img class="trophy" src="<?php the_field('reviews_image'); ?>" title="reviews" alt="reviews">
                </h4>

                <h3><?php the_field('reviews_title'); ?></h3>

                <p class="text"><?php the_field('reviews_text'); ?></p>

            </div>
        </div>

    </article>

    <article class="series full-size-block">

        <div class="main-video row middle center">

            <div class="video-container">
                <?php $j = 0; ?>
                <div class="yt-player" id="yt-player-series"
                     data-youtubeid="<?php while (have_rows('serie_video')) : the_row(); ?><?php if ($j === 0) {
                         echo get_sub_field('youtube_id');
                     } ?><?php $j++; endwhile; ?>"></div>
            </div>

            <img class="mask" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/zocdoc_video_mask_white.png"/ title="video mask" alt="video mask">

            <?php $x = 1; ?>
            <?php $coverUrl ?>
            <?php while (have_rows('serie_video')) : the_row(); ?>
                <?php $coverURL = get_sub_field('poster_image') ? get_sub_field('poster_image') : 'http://img.youtube.com/vi/' . get_sub_field('youtube_id') . '/maxresdefault.jpg'; ?>
                <div class="container-video-main">
                    <div class="poster row center middle"
                         style="background:url(<?php echo $coverURL; ?>) 50% 50% / cover no-repeat;">

                        <span class="layer"></span>
                        <div class="content">
                            <h4><?php echo the_field('series_title'); ?></h4>
                            <h5><span>Episode <?php echo $x; ?> </span><?php echo get_sub_field('episode_name'); ?></h5>
                            <p class="play"><img src=<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/play.svg title="play icon" alt="play icon"></p>
                        </div>

                    </div>
                </div>

                <?php $x++; ?>
            <?php endwhile; ?>

            <div class="cta">
                <p class="open">
                    <span>Watch other episodes</span>
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/arrow.svg" class="arrow" title="arrow" alt="arrow">
                </p>
                <p class="close">
                    <span>Close other episodes</span>
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/svg/cross.svg" class="cross" title="close" alt="close">
                </p>
                <span class="line"></span>
            </div>

        </div>

        <div class="series-container">
            <?php $i = 0; ?>
            <?php $imgUrl ?>
            <?php while (have_rows('serie_video')) : the_row(); ?>
                <?php $imgURL = get_sub_field('poster_image') ? get_sub_field('poster_image') : 'http://img.youtube.com/vi/' . get_sub_field('youtube_id') . '/maxresdefault.jpg'; ?>

                <div data-id="<?php echo $i; ?>" class="block-video-<?php echo $i; ?>  serie-video row middle center">

                    <div class="poster"
                         style="background:url(<?php echo $imgURL; ?>) 50% 50% / cover no-repeat;">
                        <img class="mask" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/masks/zocdoc_video_mask_white_0<?php echo $i; ?>.png" title="video mask" alt="video mask"/>
                    </div>

                    <h5><?php echo get_sub_field('episode_name'); ?></h5>
                    <h6><?php echo get_sub_field('episode_location'); ?></h6>

                </div>
                <?php $i++; ?>
            <?php endwhile; ?>
        </div>

    </article>

    <article class="contact full-size-block row center middle">

        <div class="full-size">
            <div class="content intro-content">
                <h2><?php the_field('contact_title'); ?></h2>
                <h3><?php the_field('contact_subtitle'); ?></h3>
                <div class="images">

                    <?php while (have_rows('contact_personas')) : the_row(); ?>
                        <div class="hidden">
                            <img src="<?php echo get_sub_field('contact_persona_image'); ?>" class="img-team" title="contact" alt="contact">
                        </div>
                    <?php endwhile; ?>

                </div>
                <button class="hs-btn-contact">
                  <?php the_field('contact_button'); ?>
                </button>
            </div>
        </div>
        <div class="footer-container"></div>

    </article>

    <canvas id="main-canvas"
            data-src-serie-cta="<?php echo the_field('series_cta'); ?>"
            data-src-serie="<?php while (have_rows('serie_video')) : the_row(); ?><?php echo get_sub_field(
                'episode_name'
            ); ?>$<?php echo get_sub_field('episode_location'); ?>$<?php echo get_sub_field(
                'poster_image'
            ); ?>$<?php echo get_sub_field(
                'youtube_id'
            ); ?>;<?php endwhile; ?>"
            class="canvas" resize></canvas>

</section>

<?php get_footer(); ?>
