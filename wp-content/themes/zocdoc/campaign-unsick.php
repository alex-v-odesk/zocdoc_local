<?php
/*
Template Name: Campaigns / Unsick
*/

require_once('campaign-unsick-header.php'); 
?>


<main>
    
    <section id="masthead" class="section fullscreen bg_blue" >
        <div class="section_wrapper">
            <h1>Unsick Day</h1>
            <h2>A Day–Off for America's Health</h2>
            <div class="cols clearfix nav_trigger" data-activate="#top_active">
                <div class="col">
                    <a class="btn" href="/about/campaigns/unsick-employee">I Want an Unsick Day</a>
                    <span class="btn_label">(I'm an EMPLOYEE)</span>
                </div>
                <div class="col">
                    <a class="btn" href="/about/campaigns/unsick-crossroads">I Want to Give an Unsick Day</a>
                    <span class="btn_label">(I’m an EMPLOYER)</span>
                </div>
            </div>
        </div>
    </section>
    
    
    <section id="information_slides" class="section slides bg_white nav_trigger" data-activate="#why_active">
        <div class="slider" data-index="0">
            
            
            <div class="slide bg_white">
                <div class="section_wrapper section_grid stats stat_days">
                    
                    <div class="grid">
                        <div class="col col_2">
                            <h2>Why Unsick Day?</h2>
                            <p>All too often, work gets in the way of taking care of your health. And there is nothing more important than your health. Unsick day is a day off from work so you can get to the doctor before you get sick. A healthier you means less sick days, and less sick days means a healthier workplace. Everybody wins.</p>
                            <a href="/about/campaigns/unsick-faq" class="small text_red">&gt; See FAQS</a>
                        </div>
                        <div class="col col_2 center">
                            <div class="stat_text">15,327</div>
                            <h3>Unsick days granted</h3>
                        </div>    
                    </div>
                    
                </div>
            </div>
                        
            <div class="slide bg_blue">
                <div class="section_wrapper section_grid stats stat_employment">
                    
                    <div class="grid">
                        <div class="col col_3 grid_border right">
                            <div class="stat_image image_employment_1"></div>
                            <div class="stat_image image_employment_hands"></div>
                            <h2>employed Americans would cancel or delay a preventive care appointment due to workplace pressures</h2>
                        </div>
                        <div class="col col_1 cells">
                            <div class="cell grid_border bottom">
                                <div class="stat_image image_employment_2"></div>
                                <p>American workers say they have utilized all of their preventive health benefits</p>
                            </div>
                            <div class="cell">
                                <div class="stat_image image_employment_3"></div>
                                <p>are more likely to choose or stay with a company that offers time off for preventive care</p>
                            </div>
                        </div> 
                    </div>
                    
                </div>
            </div>
            
            <div class="slide bg_white">
                <div class="section_wrapper section_grid">
                    
                    <div class="grid">
                        <div class="col col_4 cells">
                            <div class="cell grid_border bottom clearfix">
                                <div class="quote_logo">
                                    <div class="cite_logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                                </div>
                                <div class="quote_text">
                                    <blockquote>Unsick Day was there for me when I needed to see the doctors.</blockquote>
                                    <cite>Tim, employee at Blue Apron</cite>
                                </div>
                            </div>
                            <div class="cell grid_border bottom clearfix">
                                <div class="quote_logo">
                                    <div class="cite_logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                                </div>
                                <div class="quote_text lcol">
                                    <blockquote>If it weren’t for Unsick Day I wouldn’t have fixed my wisdom teeth.</blockquote>
                                    <cite>Cynthia, employee at Zocdoc</cite>
                                </div>
                            </div>
                            <div class="cell clearfix">
                                <div class="quote_logo">
                                    <div class="cite_logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                                </div>
                                <div class="quote_text lcol">
                                    <blockquote>Why didn’t we ever have Unsick Days before 2016?</blockquote>
                                    <cite>Linda, HR at Home Depot</cite>
                                </div>
                            </div>
                        </div> 
                    </div>
                    
                </div>
            </div>
            
            <div class="slide bg_blue">
                <div class="section_wrapper section_grid iphone_slide">
                    
                    <div class="grid">
                        <div class="col col_2">
                            <h2>Take Care of Your Health Before You Get Sick</h2>
                            <p>Schedule an appointment for the <a class="link_popover">5 preventative healthcare measures</a> recommended by the CDC. You can easily book future appointments with Zocdoc and find nearby doctors in your network.</p> 
                            <ul class="iphone_list">
                                <li>- Dental Cleaning</li>
                                <li>- Vision Exam</li>
                                <li>- Skin Screening</li>
                                <li>- Annual Physical</li>
                                <li>- Well-woman Exam</li>
                            </ul>
                            <a class="btn" href="">Book Now</a><!-- get link from Caroline -->
                            <a href="" class="small">> Learn More</a><!-- get link from Caroline -->
                        </div>
                        <div class="col col_2">
                            <div class="iphone"></div>
                        </div> 
                    </div>
                    
                </div>
            </div>
            
       
        </div>
        <div class="slide_buttons">
            <div class="slide_button left hidden" data-target="#information_slides .slider" ></div>
            <div class="slide_button right"       data-target="#information_slides .slider" ></div>
            <div class="slide_dots" data-target="#information_slides .slider" ></div>
        </div>
    </section>
    

    <section id="video_slides" class="section bg_blue" data-activate="#videos_active">
        <div class="section_wrapper">
            <div id="video_placeholder_logo"></div>
            <h2 id="video_placeholder_copy">Videos coming soon</h2>
        </div>
    </section>
    
<?php /* video content is not ready yet
    <section id="video_slides" class="section slides bg_white nav_trigger" data-activate="#videos_active">

        <div class="slider" data-index="0">
            <div class="slide video">
                <!-- <video></video> -->
            </div>
            <div class="slide video">
                <!-- <video></video> -->
            </div>
            <div class="slide video">
                <!-- <video></video> -->
            </div>
        </div>
        
        <div class="slide_buttons">
            <div class="slide_button left hidden" data-target="#video_slides .slider" ></div>
            <div class="slide_button right"       data-target="#video_slides .slider" ></div>
            <div class="slide_dots" data-target="#video_slides .slider" ></div>
        </div>
            
    </section>
*/ ?>
    
    <section id="partners" class="section bg_white nav_trigger" data-activate="#partners_active">
        <div class="section_wrapper section_grid">
            
            <div class="grid">
                <div class="col col_4">
                    <h2>Our Founding Partners</h2>
                </div>
                <div class="col col_1 cells">
                    <div class="cell partner_logo">
                        <div class="logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                    </div>
                </div>
                <div class="col col_1 cells">
                    <div class="cell partner_logo">
                        <div class="logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                    </div>
                </div>
                <div class="col col_1 cells">
                    <div class="cell partner_logo">
                        <div class="logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                    </div>
                </div>
                <div class="col col_1 cells">
                    <div class="cell partner_logo">
                        <div class="logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                    </div>
                </div>
                <div class="col col_1 cells">
                    <div class="cell partner_logo">
                        <div class="logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                    </div>
                </div>
                <div class="col col_1 cells">
                    <div class="cell partner_logo">
                        <div class="logo" style="background-image:url('http://www.underconsideration.com/brandnew/archives/zocdoc_logo.png');"></div>
                    </div>
                </div>
                <div class="col col_4">
                    <a href="/about/campaigns/unsick-crossroads" class="btn">Join Us to Show Your Employees You Care</a>
                </div>
            </div>
            
        </div>
    </section>
    
    
    <section id="support" class="section bg_blue nav_trigger" data-activate="#support_active">
        <div class="section_wrapper section_grid">
            <div class="grid">
                <div class="col col_2">
                    <h2>How Can I Support?</h2>
                    <p>Whether you’re an employee or an employer, your support for Unsick Day will benefit thousands of American workers. Make your voice heard by signing up for this initiative, sharing the starter kit or spreading the word through social media.</p>
                    <a class="btn" href="/about/campaigns/unsick-employee">I Want an Unsick Day</a>
                    <span class="btn_label">(I'm an EMPLOYEE)</span>
                    <a class="btn" href="/about/campaigns/unsick-crossroads">I Want to Give an Unsick Day</a>
                    <span class="btn_label">(I’m an EMPLOYER)</span>
                </div>
                <div class="col col_2 center">
                    <div class="heart_hands"></div>
                </div> 
            </div>
        </div>
    </section>
    
    
    
    <section id="book_appointment" class="section bg_white nav_trigger" data-activate="#book_active">
        <div class="section_wrapper section_grid iphone_slide">
            <div class="grid">
                <div class="col col_2">
                    <h2>Book an Appointment</h2>
                    <p>Schedule your <a class="link_popover" >5 preventative healthcare measures</a> with Zocdoc and find nearby doctors and specialists in your network.</p> 
                    <ul class="iphone_list">
                        <li>- Dental Cleaning</li>
                        <li>- Vision Exam</li>
                        <li>- Skin Screening</li>
                        <li>- Annual Physical</li>
                        <li>- Well-woman Exam</li>
                    </ul>
                    <a class="btn" href="">Book Now</a><!-- get link from Caroline -->
                    <a href="" class="small text_red">> Learn More</a><!-- get link from Caroline -->
                </div>
                <div class="col col_2">
                    <div class="iphone"></div>
                </div> 
                <div class="col col_4">
                    <hr>
                </div>
                <div class="col col_4">
                    <div class="comments">
                        <div class="brain_hands"></div>
                        <h2>Comments? Questions? Ideas?</h2>
                        <a class="btn" href="https://www.zocdoc.com/about/contactus">Send Us a Message!</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
    
</main>




<div id="preventative_care" class="popover bg_blue">
	<h2>5 Preventative Healthcare Measures for Adults</h2>
	<ul>
    	<li id="prev_dental">
        	<h3>Dental Cleaning</h3>
        	<p>The American Dental Association recommends a routine dental cleaning for everyone 18 and up.</p>
    	</li>
    	<li id="prev_vision">
        	<h3>Vision Exam</h3>
        	<p>An eye health exam is recommended every two years by the American Academy of Ophthalmology for adults ages 20 to 80.</p>
    	</li>
    	<li id="prev_skin">
        	<h3>Skin Screening</h3>
        	<p>The American Cancer Society recommends an annual skin screening for everyone 20 to 80 years of age.</p>
    	</li>
    	<li id="prev_physical">
        	<h3>Annual Physical</h3>
        	<p>It’s recommended that adults get a blood pressure screening (according to the US Preventive Services Task Force), a flu vaccine (according to the CDC), and many more. </p>
    	</li>
    	<li id="prev_woman">
        	<h3>Well-Woman Exam</h3>
        	<p>The American College of Obstetricians and Gynecologists recommends periodic exams for women ages 21 and up.</p>
    	</li>
	</ul>    	
    <div class="popover_dismiss"></div>
</div>

<div class="popover_onionskin"></div>

<?php require_once('campaign-unsick-footer.php'); ?>