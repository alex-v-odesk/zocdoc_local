<?php

// custom attachment image sizes
if ( function_exists( 'add_image_size' ) ) { 
	add_image_size( 'home-slider-img', 1920, 600 ); // home page top slider
    add_image_size( 'home-round', 55, 55 ); // home page top rounded images
	add_image_size( 'home-post-header-bg', 480, 240 ); // home page posts header bg
	add_image_size( 'single-post-image', 1025, 512 ); // single post main image
}

add_filter('the_content', 'wpautop');

/*
    This is present on production, but not on staging for some reason.
    Adding to codebase for consistency, shouldn't break anything.
    @eric_wvgg Feb 2017
*/
add_theme_support( 'post-thumbnails', array( 'post', 'page' ) );

require_once('functions-newscred.php');

// Strip whitespaces, alphanumeric and dashed form string
function cleanString($string)
{
    //Lower case everything
    $string = strtolower($string);
    //Make alphanumeric (removes all other characters)
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    //Clean up multiple dashes or whitespaces
    $string = preg_replace("/[\s-]+/", " ", $string);
    //Convert whitespaces and underscore to dash
    $string = preg_replace("/[\s_]/", "-", $string);

    return $string;
}

function get_locations($loc_id = false)
{

    $data = get_job_board($loc_id);
    $aLocations = [];

    foreach ($data['departments'] as $department) {
        foreach ($department['jobs'] as $job) {
            if (!in_array($job['location']['name'], $aLocations, true)) {
                array_push($aLocations, $job['location']['name']);
            }
        }
    }

    return $aLocations;
}

function get_count_jobs($loc_id = false)
{
    $data = get_job_board($loc_id);
    $teams = 0;
    $jobs = 0;
    $aDifflocations = [];
    $locations = 0;

    foreach ($data['departments'] as $department) {
        if (count($department['jobs']) > 0) {
            $teams++;
        }
        $jobs += count($department['jobs']);
    }

    $aOffices = get_locations();

    $aDifflocations = array_count_values($aOffices);

    $locations = count($aDifflocations);

    return array($jobs, $teams, $locations);

}

function get_job_board($loc_id = false)
{
    $data = false;
    if ($loc_id) {
        $url = 'https://api.greenhouse.io/v1/boards/zocdoc/offices/' . $loc_id;
        $res = wp_remote_get($url);
        $tmp = json_decode($res['body']);
        $json['departments'] = $tmp->departments;
        $data = json_encode($json);
    } else {
        $url = 'https://api.greenhouse.io/v1/boards/zocdoc/departments';
        $res = wp_remote_get($url);
        if(is_array($res) && isset($res['body'])) {
            $data = $res['body'];
        }
    }

    if (!$data) {
        $data = '{"departments":[{"id":13324,"name":"Business Development","parent_id":null,"child_ids":[],"jobs":[]},{"id":13325,"name":"Data Science \u0026 Business Intelligence","parent_id":null,"child_ids":[],"jobs":[{"id":122528,"internal_job_id":136826,"title":"Machine Learning Engineer","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122528\u0026gh_jid=122528","metadata":null}]},{"id":13446,"name":"Design \u0026 UX","parent_id":null,"child_ids":[],"jobs":[]},{"id":13515,"name":"Engineering","parent_id":null,"child_ids":[],"jobs":[{"id":189982,"internal_job_id":211865,"title":"Principal Software Engineer - Sponsored Results","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=189982\u0026gh_jid=189982","metadata":null},{"id":187303,"internal_job_id":209002,"title":"Principal Software Engineer - Sync","updated_at":"2016-08-09T11:49:53-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=187303\u0026gh_jid=187303","metadata":null},{"id":251485,"internal_job_id":277647,"title":"Senior Front End Engineer - Patient Team","updated_at":"2016-07-20T13:14:29-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=251485\u0026gh_jid=251485","metadata":null},{"id":238999,"internal_job_id":264256,"title":"Senior Front End Engineer - Patient Team/Search","updated_at":"2016-08-03T14:34:27-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=238999\u0026gh_jid=238999","metadata":null},{"id":257663,"internal_job_id":284259,"title":"Senior Principal Software Engineer","updated_at":"2016-08-10T14:53:55-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=257663\u0026gh_jid=257663","metadata":null},{"id":190038,"internal_job_id":211930,"title":"Senior Software Engineer - CRM","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=190038\u0026gh_jid=190038","metadata":null},{"id":205076,"internal_job_id":228294,"title":"Senior Software Engineer - Patient","updated_at":"2016-08-10T14:23:41-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=205076\u0026gh_jid=205076","metadata":null},{"id":238996,"internal_job_id":264253,"title":"Senior Software Engineer - Provider","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=238996\u0026gh_jid=238996","metadata":null},{"id":187305,"internal_job_id":209003,"title":"Senior Software Engineer - Sync","updated_at":"2016-08-09T11:51:05-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=187305\u0026gh_jid=187305","metadata":null}]},{"id":13447,"name":"Enterprise Sales","parent_id":null,"child_ids":[],"jobs":[{"id":122358,"internal_job_id":58383,"title":"Enterprise Clients Director, Health Systems","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122358\u0026gh_jid=122358","metadata":null}]},{"id":13516,"name":"Field Sales","parent_id":null,"child_ids":[],"jobs":[]},{"id":13520,"name":"Finance \u0026 Accounting","parent_id":null,"child_ids":[],"jobs":[{"id":122531,"internal_job_id":136825,"title":"Staff Accountant","updated_at":"2016-07-26T10:54:38-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122531\u0026gh_jid=122531","metadata":null}]},{"id":13445,"name":"Inside Sales","parent_id":null,"child_ids":[],"jobs":[{"id":122705,"internal_job_id":136805,"title":"Sales Origination Associate","updated_at":"2016-07-21T14:42:20-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122705\u0026gh_jid=122705","metadata":null},{"id":204485,"internal_job_id":227666,"title":"Vice President of Inside Sales","updated_at":"2016-07-07T09:06:24-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=204485\u0026gh_jid=204485","metadata":null}]},{"id":13517,"name":"International ","parent_id":null,"child_ids":[],"jobs":[]},{"id":13518,"name":"IT","parent_id":null,"child_ids":[],"jobs":[{"id":193199,"internal_job_id":215271,"title":"CISO, Director of Information Security","updated_at":"2016-08-01T16:22:36-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=193199\u0026gh_jid=193199","metadata":null}]},{"id":12530,"name":"Legal","parent_id":null,"child_ids":[],"jobs":[]},{"id":12531,"name":"Marketing","parent_id":null,"child_ids":[],"jobs":[{"id":146651,"internal_job_id":165274,"title":"Director of CRM/Direct Marketing","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=146651\u0026gh_jid=146651","metadata":null},{"id":148200,"internal_job_id":166910,"title":"Health Systems Communications Manager","updated_at":"2016-07-14T11:15:34-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=148200\u0026gh_jid=148200","metadata":null}]},{"id":12532,"name":"Money","parent_id":null,"child_ids":[],"jobs":[]},{"id":9670,"name":"No Department","parent_id":null,"child_ids":[],"jobs":[]},{"id":12528,"name":"Operations","parent_id":null,"child_ids":[],"jobs":[{"id":159212,"internal_job_id":178872,"title":"Data Operations Researcher","updated_at":"2016-08-04T05:30:12-04:00","location":{"name":"Pune, India"},"absolute_url":"http://www.zocdoc.com/careers?rid=159212\u0026gh_jid=159212","metadata":null},{"id":170692,"internal_job_id":191146,"title":"Freelance Photographer","updated_at":"2016-08-11T17:22:52-04:00","location":{"name":"Indianapolis, IN"},"absolute_url":"http://www.zocdoc.com/careers?rid=170692\u0026gh_jid=170692","metadata":null},{"id":222497,"internal_job_id":246966,"title":"Freelance Photographer","updated_at":"2016-08-11T17:22:16-04:00","location":{"name":"Birmingham, AL"},"absolute_url":"http://www.zocdoc.com/careers?rid=222497\u0026gh_jid=222497","metadata":null},{"id":220324,"internal_job_id":244619,"title":"Freelance Photographer","updated_at":"2016-08-11T17:22:03-04:00","location":{"name":"Boston, MA"},"absolute_url":"http://www.zocdoc.com/careers?rid=220324\u0026gh_jid=220324","metadata":null},{"id":222491,"internal_job_id":246960,"title":"Freelance Photographer","updated_at":"2016-08-11T17:22:36-04:00","location":{"name":"El Paso, TX"},"absolute_url":"http://www.zocdoc.com/careers?rid=222491\u0026gh_jid=222491","metadata":null},{"id":122543,"internal_job_id":136812,"title":"Patient Operations Associate (Part Time)","updated_at":"2016-08-08T16:54:03-04:00","location":{"name":"Phoenix, AZ"},"absolute_url":"http://www.zocdoc.com/careers?rid=122543\u0026gh_jid=122543","metadata":null},{"id":122544,"internal_job_id":136781,"title":"Provider Operations Associate","updated_at":"2016-07-28T14:36:17-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122544\u0026gh_jid=122544","metadata":null},{"id":146124,"internal_job_id":164663,"title":"Senior Enterprise Operations Manager","updated_at":"2016-08-03T14:34:49-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=146124\u0026gh_jid=146124","metadata":null}]},{"id":12529,"name":"People","parent_id":null,"child_ids":[],"jobs":[{"id":205596,"internal_job_id":228827,"title":"Assistant to the CEO","updated_at":"2016-07-25T17:31:59-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=205596\u0026gh_jid=205596","metadata":null},{"id":170472,"internal_job_id":190926,"title":"Director of Talent Acquisition and Development","updated_at":"2016-08-03T14:32:59-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=170472\u0026gh_jid=170472","metadata":null},{"id":122575,"internal_job_id":136790,"title":"Executive Assistant","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122575\u0026gh_jid=122575","metadata":null},{"id":122571,"internal_job_id":136829,"title":"Senior People Operations Associate","updated_at":"2016-08-04T09:46:12-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122571\u0026gh_jid=122571","metadata":null}]},{"id":12527,"name":"Product","parent_id":null,"child_ids":[],"jobs":[{"id":262263,"internal_job_id":289152,"title":"Senior Product Manager","updated_at":"2016-08-10T10:53:23-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=262263\u0026gh_jid=262263","metadata":null}]},{"id":13519,"name":"Sales Operations","parent_id":null,"child_ids":[],"jobs":[{"id":145856,"internal_job_id":164370,"title":"Salesforce Administrator","updated_at":"2016-08-05T12:08:52-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=145856\u0026gh_jid=145856","metadata":null},{"id":122398,"internal_job_id":136837,"title":"Vice President of Sales Operations and Strategy","updated_at":"2016-06-30T13:48:57-04:00","location":{"name":"New York, NY"},"absolute_url":"http://www.zocdoc.com/careers?rid=122398\u0026gh_jid=122398","metadata":null}]},{"id":0,"name":"No Department","parent_id":null,"child_ids":[],"jobs":[]}]}';
    }
    return json_decode($data, true);
}

function get_job($job_id)
{
    //CACHE CONTROL
    $data = wp_cache_get('job_' . $job_id, 'job');

    if (false === $data) {
        $url = 'https://api.greenhouse.io/v1/boards/zocdoc/jobs/' . $job_id;
        $res = wp_remote_get($url);
        if(is_array($res) && isset($res['body'])) {
            $data = $res['body'];
        } else {
            $data = '{}';
        }

        // Since we know that the cache isn't up to date, we should
        // write this fresh information to it now, so that we can avoid
        // the query next time.
        $myexpire = 60 * 60 * 24; // Cache data for one day (86400 seconds)
        wp_cache_set('job_' . $job_id, $data, 'job', $myexpire);
    }

    return json_decode($data, true);
}

function get_depData($dep_id)
{
    //CACHE CONTROL
    $data = wp_cache_get('dep_' . $dep_id, 'dep');

    if (false === $data) {
        //Get Page ID of careers-list
        $page = get_page_by_path('careers-list');
        $teams = get_field('team', $page->ID);

        foreach ($teams as $data) {
            if ($data['department_id'] == $dep_id) {
                $myexpire = 60 * 60 * 24; // Cache data for one day (86400 seconds)
                wp_cache_set('dep_' . $dep_id, $data, 'dep', $myexpire);
                return $data;
            }
        }
        return false;
    }

    return $data;
}

function add_query_vars($aVars)
{
    $aVars[] = "job_id"; // represents the name of the product category as shown in the URL
    $aVars[] = "loc_id"; // represents the name of the product category as shown in the URL
    $aVars[] = "search";
    return $aVars;
}

// hook add_query_vars function into query_vars
add_filter('query_vars', 'add_query_vars');

function add_rewrite_rules($aRules)
{
    $aNewRules = array('careers/([^/]+)/?$' => 'index.php?pagename=careers&job_id=$matches[1]');
    $aRules = $aNewRules + $aRules;
    return $aRules;
}

// hook add_rewrite_rules function into rewrite_rules_array
add_filter('rewrite_rules_array', 'add_rewrite_rules');


// // First remove unwanted scripts like jQuery, jQuery migrate and wp-embed scripts
function deregister_unwanted_scripts()
{

    wp_deregister_script('jquery');
    wp_deregister_script('wp-embed');
}

add_action('wp_enqueue_scripts', 'deregister_unwanted_scripts');

// load css into the website's front-end
function enqueue_custom_style()
{

    // wp_register_style() example
    wp_register_style(
        'app-style', // handle name
        get_template_directory_uri() . '/css/app.css', // the URL of the stylesheet
        null, // an array of dependent styles
        null, // version number
        'screen' // CSS media type
    );

    wp_enqueue_style('app-style');

}

add_action('wp_enqueue_scripts', 'enqueue_custom_style');

// load js into the website's front-end
function enqueue_custom_script()
{

    if($_SERVER['REQUEST_URI'] != '/about/legacy/') {

        //$bundle = preg_match("/zd-enh.local/i", $_SERVER['HTTP_HOST']) ? '/js/bundle.js' : '/js/bundle.min.js';
        if (
            preg_match("/zd-enh.local/i", $_SERVER['HTTP_HOST']) 
            || preg_match("/dev.zocdoc.sdny.in/i", $_SERVER['HTTP_HOST'])
            || preg_match("/zocdocstatic.staging.wpengine.com/i", $_SERVER['HTTP_HOST'])
// ^ uncomment if you want to test code on staging, as there is no formal Dev server - @eric_wvgg 4-2017
        ) {
          $bundle = '/js/bundle.js';
        }else{
          $bundle = '/js/bundle.min.js';
        }
		
        // wp_register_style() example
        wp_register_script(
            'bundle', // handle name
            get_template_directory_uri() . $bundle, // the URL of the stylesheet
            null, // an array of dependent styles
            null, // version number
            true // append in footer
        );
    }
     wp_register_script(
            'main-js', // handle name
            get_template_directory_uri() . '/js/main.js', // the URL of the stylesheet
            array("jquery"), // an array of dependent styles
            null, // version number
            true // append in footer
        );
	wp_register_script(
            'jquery', // handle name
            'https://code.jquery.com/jquery-1.9.1.min.js', // the URL of the stylesheet
            null, // an array of dependent styles
            null, // version number
            true // append in footer
        );
	
	wp_register_script(
            'jqueryui', // handle name
            'https://code.jquery.com/ui/1.9.1/jquery-ui.min.js', // the URL of the stylesheet
            array("jquery"), // an array of dependent styles
            null, // version number
            true // append in footer
        );
	
	wp_enqueue_script('bundle');
	wp_enqueue_script('jquery');
	wp_enqueue_script('jqueryui');
    wp_enqueue_script('main-js');
   

}

add_action('wp_enqueue_scripts', 'enqueue_custom_script');

// Custom funtion to get a template part that allows you to pass vars. (because the classic WP funtion won't allow that)
function getTemplatePart($part, $vars)
{
    if (is_array($vars)) {
        foreach ($vars as $key => $value) {
            $key = '_' . $key;
            $$key = $value;
        }
    }
    include(locate_template($part . '.php', false, false));
}

/*
 * Builds custom HTML.
 *
 * With this function, I can alter WPP's HTML output from my theme's functions.php.
 * This way, the modification is permanent even if the plugin gets updated.
 *
 * @param   array   $mostpopular
 * @param   array   $instance
 * @return  string
 */
function my_custom_popular_posts_html_list($mostpopular, $instance)
{
    $output = '<ul class="wpp-list">';

    // loop the array of popular posts objects
    $count = 1;
    foreach ($mostpopular as $p) {
        $post = get_post($p->id); //print_r($p); die();
        $categories = get_the_category($post->ID);

        $output .= '<li class="article">
                    <a href="' . get_the_permalink($p->id) . '">
                        <span class="number">' . $count . '</span>
                        <h3 class="title">' . $p->title . '</h3>
                        <p class="description">' . $post->post_excerpt . '</p>
                        <div class="info">
                            <span class="category">' . $categories[0]->name . '</span> -
                            <span class="publish-date">' . date('j M Y', strtotime($p->date)) . '</span>
                        </div>
                    </a>
                </li>';
        $count++;
    }

    $output .= '</ul>';

    return $output;
}

add_filter('wpp_custom_html', 'my_custom_popular_posts_html_list', 10, 2);


function get_category_color ($categoryName) {

  if (!empty($categoryName)) {
		switch ($categoryName) {
			case 'partnership':
				$catColor = "#39E4AD";
				$category = 'partnership';
				break;
			case 'company':
				$catColor = "#44D8FB";
				$category = 'company';
				break;
			case 'patients':
				$catColor = "#FCB5C9";
				$category = 'patients';
				break;
			case 'provider':
				$catColor = "#F96573";
				$category = 'provider';
				break;
			case 'tech':
				$catColor = "#C191FF";
				$category = 'tech';
				break;
			default:
				$catColor = "#FCB5C9";
				$category = 'default';
				break;
		}
	}

  return array($catColor, $category);
}
?>
