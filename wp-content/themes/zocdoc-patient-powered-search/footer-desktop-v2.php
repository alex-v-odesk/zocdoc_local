<?php
    if( have_rows('module') ):
        while ( have_rows('module') ) : the_row();
            $type = get_sub_field('type');
            if($type == "Footer Text"){
              FOOTER_TEXT();
            }
        endwhile;
        else :
    endif;
?>
<?php
    if(!isset($footer_text)){
        $footer_text='Have questions? Give us a call! <a class="phone-number" data-test="layout-phonenumber" href="tel:(855) 962-3622">(855) 962-3622</a>';
    }
    if(!isset($footer_email)){
        $footer_email="JoinNow@Zocdoc.com";
    }
?>
<?php function FOOTER_TEXT() {
// global $post;
?>
<footer class="sg-desktop-grid layout-footer footer-extension">

    <div class="sg-yellow-bg">

<div class="sg-row sg-header6 contact-info sg-yellow-bg">
    <table class="sg-small-1 sg-columns sg-small-offset-1 zface-container">
        <tbody><tr><td><div class="icon-zface"></div></td>
    </tr></tbody></table>
    <table class="sg-small-12 sg-columns help-container">
    <tbody><tr><td><?php the_sub_field('main_footer_text')?><a class="phone-number" data-test="layout-phonenumber" href="tel:<?php the_sub_field('footer_number') ?>"><?php the_sub_field('footer_number') ?></a></td>
    </tr></tbody></table>
    <table class="sg-small-8 sg-columns">
        <tbody><tr><td>
            <a href="mailto:<?php the_sub_field('footer_email') ?>"><?php the_sub_field('footer_email') ?></a>
        </td>
    </tr></tbody></table>

    </div>
</div>

<div class="sg-navy-bg">
<div class="sg-row links-and-text links sg-navy-bg layout-footer-content">
        <div class="sg-small-3 sg-columns sg-small-offset-1">
            <h3>Zocdoc</h3>
            <ul>
                    <li><a href="<?php bloginfo('url'); ?>">About</a></li>
                    <li><a href="<?php bloginfo('url'); ?>/press">Press</a></li>
                    <li><a href="http://zocdoc.com/careers">Careers</a></li>
                    <li><a href="<?php bloginfo('url'); ?>/contactus">Contact</a></li>
                    <li><a href="http://zocdoc.com/answers">Answers</a></li>
                    <li><a href="<?php bloginfo('url'); ?>/faq">FAQ</a></li>
                    <li><a href="/about/blog">Blog</a></li>
            </ul>
        </div>
        <div class="sg-small-4 sg-columns ">
            <h3>Search By</h3>
            <ul>
                    <li><a href="/directory">Doctor Name</a></li>
                    <li><a href="/practicedirectory">Practice Name</a></li>
                    <li><a href="/morespecialties">Specialty</a></li>
                    <li><a href="/procedures">Procedure</a></li>
                    <li><a href="/languages">Language</a></li>
                    <li><a href="/locations">Location</a></li>
                    <li><a href="/hospital-directory">Hospital</a></li>
                    <li><a href="/insurances">Insurance</a></li>
            </ul>
        </div>
        <div class="sg-small-4 sg-columns ">
            <h3>Cities</h3>
            <ul>
                    <li><a href="/primary-care-doctors/chicago-210499pm">Chicago</a></li>
                    <li><a href="/primary-care-doctors/houston-215108pm">Houston</a></li>
                    <li><a href="/primary-care-doctors/new-york-46063pm">New York</a></li>
                    <li><a href="/primary-care-doctors/philadelphia-216871pm">Philadelphia</a></li>
                    <li><a href="/primary-care-doctors/phoenix-220419pm">Phoenix</a></li>
                    <li><a href="/primary-care-doctors/san-antonio-225141pm">San Antonio</a></li>
                    <li><a href="/primary-care-doctors/washington-34993pm">Washington DC</a></li>
            </ul>
        </div>
        <div class="sg-small-4 sg-columns ">
            <h3>Specialties</h3>
            <ul>
                    <li><a href="/chiropractors">Chiropractors</a></li>
                    <li><a href="/dentists">Dentists</a></li>
                    <li><a href="/dermatologists">Dermatologists</a></li>
                    <li><a href="/eye-doctors">Eye Doctors</a></li>
                    <li><a href="/obgyns">Gynecologists </a></li>
                    <li><a href="/primary-care-doctors">Primary Care Doctors</a></li>
                    <li><a href="/psychiatrists">Psychiatrists</a></li>
            </ul>
        </div>

    <div class="sg-small-3 sg-columns">
        <h3>Are You a Top Doctor?</h3>
        <ul>
            <li><a href="/join/whyjoin">Join Zocdoc today!</a></li>
        </ul>
            <h3>Zocdoc for Employers</h3>
            <ul>
                <li><a href="/employers">Learn More</a></li>
            </ul>
            <h3>Zocdoc for Health Systems</h3>
            <ul>
                <li><a href="/healthsystems">Learn More</a></li>
            </ul>
    </div>

    <div class="sg-small-4 sg-columns">
        <h3>Follow Zocdoc</h3>
        <ul>
            <li>
                <a href="http://www.facebook.com/Zocdoc" rel="nofollow">
                    <span class="icon icon-facebook"></span>
                    <span>Facebook</span>
                </a>
            </li>
            <li>
                <a href="http://twitter.com/#!/zocdoc" rel="nofollow">
                    <span class="icon icon-twitter"></span>
                    <span>Twitter</span>
                </a>
            </li>
            <li>
                <a href="https://plus.google.com/104979133689507882900/" rel="publisher nofollow">
                    <span class="icon icon-googleplus"></span>
                    <span>Google+</span>
                </a>
            </li>
            <li>
                <a href="http://www.linkedin.com/company/167902" rel="nofollow">
                    <span class="icon icon-linkedin"></span>
                    <span>LinkedIn</span>
                </a>
            </li>
        </ul>
    </div>
</div>
<div class="sg-row links-and-text sg-navy-bg">
    <div class="sg-small-2 sg-columns sg-small-centered">
        <a href="http://wearemadeinny.com/" rel="nofollow" target="_blank"><div class="icon-made-in-ny"></div></a>
    </div>
</div>
<div class="sg-row links-and-text legal sg-navy-bg">
    <div class="sg-small-2 sg-columns sg-small-offset-1 server">
        HOSTNAME
    </div>
    <div class="sg-small-10 sg-columns sg-small-offset-4 copyright">
        Our <b><a class="a link-light" href="<?php bloginfo('url'); ?>/privacypolicy" rel="nofollow" data-test="link-privacypolicy">Privacy Policy</a></b> and <b><a class="a link-light" href="<?php bloginfo('url'); ?>/terms" rel="nofollow" data-test="link-termsofuse">Terms of Use</a></b> ©<?php echo date("Y"); ?> Zocdoc, Inc.
    </div>
    <div class="sg-small-4 sg-columns">
<!--             <a href="/localization/setculture?cultureId=2&amp;redirectTo=%2fdoctor%2fama-alexis-md-6892" data-test="language-link-espanol">Español</a> -->
    </div>
</div>
</div>
</footer>
<?php } ?>