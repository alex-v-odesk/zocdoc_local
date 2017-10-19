<header id="page-header"
        class="page-header careers <?php if (strpos($_SERVER['REQUEST_URI'], "job")): ?>job-detail<?php endif; ?>"
        role="banner">

    <h1 class="logo"><a href="https://www.zocdoc.com/"><strong>Zocdoc</strong></a></h1>

    <?php if (!strpos($_SERVER['REQUEST_URI'], "job")): ?>

        <div class="navigation anchors row center middle">
            <div class="content-navigation">
                <ul class="content-menu">
                    <?php $i = 0; ?>
                    <?php while (have_rows('menu')) : the_row(); ?>
                        <li data-index="<?php echo $i; ?>" data-id="<?php the_sub_field('hash'); ?>">
                            <?php the_sub_field('title'); ?>
                            <span class="separator"></span>
                        </li>
                        <?php $i++; ?>
                    <?php endwhile; ?>
                </ul>
            </div>
        </div>

    <?php else: ?>

        <div class="navigation row center middle">
            <div class="content-navigation">
                <ul class="content-menu">
                    <li>
                        <a href="#" class="back-btn">
                    <span class="back-arrow">
                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                           xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="11px"
                           viewBox="0 0 17 12" style="enable-background:new 0 0 17 12;" xml:space="preserve">
                        <style type="text/css">
                          .st0 {
                              fill: none;
                              stroke: #061F5C;
                              stroke-width: 2;
                              stroke-linecap: round;
                              stroke-miterlimit: 10;
                          }

                          .st1 {
                              fill: none;
                              stroke: #061F5C;
                              stroke-width: 2;
                              stroke-linecap: round;
                              stroke-linejoin: round;
                              stroke-miterlimit: 10;
                          }
                        </style>
                        <line class="st0" x1="1.5" y1="6" x2="15" y2="6"/>
                        <polyline class="st1" points="10.5,1 15.5,6 10.5,11 "/>
                        </svg>
                    </span>Back to job openings</button>
                    </li>
                </ul>
            </div>
        </div>

    <?php endif; ?>


    <?php if (strpos($_SERVER['REQUEST_URI'], "job")): ?>

        <a href="/about/careers" class="btn-join">Careers</a>

    <?php else: ?>

        <a href="/about/careers-list" class="btn-join">Join us</a>

    <?php endif; ?>

</header>
