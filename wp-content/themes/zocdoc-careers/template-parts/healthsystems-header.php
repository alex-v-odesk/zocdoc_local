<header id="page-header"
        class="page-header healthsystems <?php if (strpos($_SERVER['REQUEST_URI'], "job")): ?>job-detail<?php endif; ?>"
        role="banner">

    <h1 class="logo"><a href="https://www.zocdoc.com/"><strong>Zocdoc</strong></a></h1>

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

    <button type="button" name="button" class="btn-join hs-header-btn-contact">Contact Us</button>
</header>
