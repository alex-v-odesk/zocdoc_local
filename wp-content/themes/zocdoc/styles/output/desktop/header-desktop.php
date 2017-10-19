
<header class="sg-desktop-grid layout-header global ">
    <div class="sg-yellow-bg">
        <div class="sg-row sg-yellow-bg header-container">

            <div class="sg-small-4 sg-columns sg-small-offset-1">
                <table>
                    <tbody><tr><td>
            <a class="icon-zd-logo test js-zocdoc-logo" href="/" title="Find a Doctor on ZocDoc">Zocdoc</a>
</td>
                </tr></tbody></table>
            </div>
<?php if( have_rows('module') ):
    while ( have_rows('module') ) : the_row();
        $type = get_sub_field('type');
        if($type == "Nav Button"){
          NAV_BUTTON();
        }
    endwhile;
else :
endif;
?>
            <?php function NAV_BUTTON() {
            ?>

            <div class="sg-small-18 sg-columns sg-small-offset-1 sg-small-pull-1">
                <div class="sg-btn-duo action-links">
                <a style="font-family: sharp-sans-medium, arial, sans-serif; color: rgb(0, 35, 75); font-size: 18px;" href="tel:<?php the_sub_field('nav_number') ?>"><?php the_sub_field('nav_number') ?></a>
                <?php           
                    if (get_sub_field('button_text'))
                            echo "<a style='margin-left: 25px;' class='sg-btn-trans sg-btn-small utility-a js-inbound-lead-button' href='".get_sub_field('button_link')."'>".get_sub_field('button_text')."</a>";
                ?>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>
</header>
