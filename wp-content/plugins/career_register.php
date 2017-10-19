<?php
/*
  Plugin Name: Career Register
 */

add_action( 'init', 'zocdoc_careers_init' );
/**
 * Register Custom Post & Taxonomy Section 
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
*/
function zocdoc_careers_init() {
	$labels = array(
		'name'               => _x( 'Careers', '', 'Zocdoc' ),
		'singular_name'      => _x( 'Careers', '', 'Zocdoc' ),
		'menu_name'          => _x( 'Careers', 'admin menu', 'Zocdoc' ),
		'name_admin_bar'     => _x( 'Careers', 'add new on admin bar', 'Zocdoc' ),
		'add_new'            => _x( 'Add New', 'Careers', 'Zocdoc' ),
		'add_new_item'       => __( 'Add New Careers', 'Zocdoc' ),
		'new_item'           => __( 'New Careers', 'Zocdoc' ),
		'edit_item'          => __( 'Edit Careers', 'Zocdoc' ),
		'view_item'          => __( 'View Careers', 'Zocdoc' ),
		'all_items'          => __( 'All Careers', 'Zocdoc' ),
		'search_items'       => __( 'Search Careers', 'Zocdoc' ),
		'parent_item_colon'  => __( 'Parent Careers:', 'Zocdoc' ),
		'not_found'          => __( 'No Careers found.', 'Zocdoc' ),
		'not_found_in_trash' => __( 'No Careers found in Trash.', 'Zocdoc' )
	);

	$args = array(
		'labels'             => $labels,
                'description'        => __( 'Description.', 'Zocdoc' ),
		'public'             => false,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'careers' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title','editor','excerpt', 'custom-fields')
	);
	register_post_type( 'careers', $args );
//        wp_flush_cache();
        $taxonomies = array(
            array(
                'slug'         => 'type',
                'single_name'  => 'Type',
                'plural_name'  => 'Type',
                'post_type'    => 'careers',
            ),
            array(
                'slug'         => 'location',
                'single_name'  => 'Location',
                'plural_name'  => 'Location',
                'post_type'    => 'careers',
            ),
	);
	foreach( $taxonomies as $taxonomy ) {
            $labels = array(
                'name' => $taxonomy['plural_name'],
                'singular_name' => $taxonomy['single_name'],
                'search_items' =>  'Search ' . $taxonomy['plural_name'],
                'all_items' => 'All ' . $taxonomy['plural_name'],
                'parent_item' => 'Parent ' . $taxonomy['single_name'],
                'parent_item_colon' => 'Parent ' . $taxonomy['single_name'] . ':',
                'edit_item' => 'Edit ' . $taxonomy['single_name'],
                'update_item' => 'Update ' . $taxonomy['single_name'],
                'add_new_item' => 'Add New ' . $taxonomy['single_name'],
                'new_item_name' => 'New ' . $taxonomy['single_name'] . ' Name',
                'menu_name' => $taxonomy['plural_name']
            );

            $rewrite = isset( $taxonomy['rewrite'] ) ? $taxonomy['rewrite'] : array( 'slug' => $taxonomy['slug'] );
            $hierarchical = isset( $taxonomy['hierarchical'] ) ? $taxonomy['hierarchical'] : true;

            register_taxonomy( $taxonomy['slug'], $taxonomy['post_type'], array(
                'labels' => $labels,
                'hierarchical' => true,
                'public' => true,
                'show_ui' => true,
                'show_admin_column' => true,
                'show_in_nav_menus' => true,
                'show_tagcloud' => true,
//                'rewrite' => array(
//                    'slug' => $taxonomy['slug']
//                ),
            ));
            register_taxonomy_for_object_type($taxonomy['slug'], $taxonomy['post_type']);
	}
}
// ============  End Custom Post & Taxonomy Register Section========================================
 
function load_zocdoc_wp_admin_style() {
       wp_enqueue_style('zocdoc_custom', plugin_dir_url(__FILE__).'css/custom.css');
}
add_action( 'admin_enqueue_scripts', 'load_zocdoc_wp_admin_style' );

add_action('admin_menu', 'zocdoc_admin_menu');
function zocdoc_admin_menu() {
    add_options_page(
        'XML & CRON Settings', 'XML & CRON Settings', 'manage_options', 'xml-settings', 'zocdoc_options_page'
    );
}
function zocdoc_options_page() {
    ?>
    <div class="wrap">
        <h1>CRON Settings & XML</h1>
        <form method="post" action="options.php" novalidate="novalidate" id="zocdoc-cron" >
            <?php settings_fields('settings-group'); ?>
            <?php do_settings_sections('settings-group'); ?>
            <table class="form-table">
                <tbody>
                    <tr>
                        <th scope="row"><label for="blogname">CRON Frequency</label></th>
                        <td>
                            <?php $cron_frequency = get_option('cron_frequency'); ?>
                            <select name="cron_frequency" id="cron_frequency">
                                <option value="">Select a cron</option>
                                <?php
                                $cron_intervals = wp_get_schedules();
                                foreach ($cron_intervals as $key => $interval) {
                                    $selected = "";
                                    if ($cron_frequency == $key) {
                                        $selected = " selected";
                                    }
                                    ?>
                                    <option <?php echo $selected; ?> value="<?php echo $key; ?>"><?php echo $interval['display']; ?></option>
                                <?php }
                                ?>
                            </select> 
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>

        </form>
    </div>
<div class="wrap" id="zocdoc_xml_file" >
    <h1 >Generate the careers xml file </h1>
        <a href="?page=xml-settings&report=xml&download=true" name="generate_xml_file" id="generate_xml_file" class="button button-primary" >Generate</a>
    </div>
    <?php
}

function register_settings() {
    register_setting('settings-group', 'cron_frequency');
}
add_action('admin_init', 'register_settings');

class XMLExport {
    /**
     * Constructor
     */
    public function __construct() {
        if (isset($_GET['report']) && $_GET['report'] == 'xml') {
			$path = ABSPATH;
			$filename = $path . "careers.xml";
			if (!file_exists($filename)){ 
				$fp=fopen($filename,'w+');
			}
            $xmlDoc = new DOMDocument();
            
            //create the root element
            $args = array(
                'posts_per_page' => -1,
                'post_type' => 'careers',
                'orderby'  => 'name',
                'order'  => 'ASC', 
            );
        $the_query = get_posts( $args );
        
        // The Loop
        $root = $xmlDoc->appendChild($xmlDoc->createElement("JobPostingInfo"));
            foreach($the_query as $job)
            {
                $title = htmlspecialchars($job->post_title);
                $baseSalary = get_post_meta($job->ID,'baseSalary',true);
                $unitText = get_post_meta($job->ID,'unitText',true);
                $employmentType = get_post_meta($job->ID,'employmentType',true);
                $hiringOrganization = get_post_meta($job->ID,'hiringOrganization',true);
                $identifiert = get_post_meta($job->ID,'identifier',true);
                $streetAddress = get_post_meta($job->ID,'streetAddress',true);
                $addressLocality = get_post_meta($job->ID,'addressLocality',true);
                $addressRegion = get_post_meta($job->ID,'addressRegion',true);
                $postalCode = get_post_meta($job->ID,'postalCode',true);
                $addressCountry = get_post_meta($job->ID,'addressCountry',true);
                $validThrough = get_post_meta($job->ID,'validThrough',true);
                //create a tutorial element
                $tutTag = $root->appendChild($xmlDoc->createElement("JobPosting"));
                
                $basesellery = $tutTag->appendChild($xmlDoc->createElement("baseSalary"));
                $value = $basesellery->appendChild($xmlDoc->createElement("value"));
                $value->appendChild($xmlDoc->createElement("value", $baseSalary));
                $value->appendChild($xmlDoc->createElement("unitText", $unitText));
                
                $tutTag->appendChild($xmlDoc->createElement("datePosted", $job->post_date));
                
                $tutTag->appendChild($xmlDoc->createElement("description", $job->post_content));
                
                $tutTag->appendChild($xmlDoc->createElement("employmentType", $employmentType));
                $tutTag->appendChild($xmlDoc->createElement("hiringOrganization", $hiringOrganization));
                $tutTag->appendChild($xmlDoc->createElement("identifier", $identifiert));
                
                $jobLocation = $tutTag->appendChild($xmlDoc->createElement("jobLocation"));
                $address = $jobLocation->appendChild($xmlDoc->createElement("address"));
                $address->appendChild($xmlDoc->createElement("streetAddress", $streetAddress));
                $address->appendChild($xmlDoc->createElement("addressLocality", $addressLocality));
                $address->appendChild($xmlDoc->createElement("addressRegion", $addressRegion));
                $address->appendChild($xmlDoc->createElement("postalCode", $postalCode));
                $address->appendChild($xmlDoc->createElement("addressCountry", $addressCountry));
                
                $tutTag->appendChild($xmlDoc->createElement("title", $title));
                
                $tutTag->appendChild($xmlDoc->createElement("validThrough", $validThrough));
            }
            //make the output pretty
            $xmlDoc->formatOutput = true;
			$xmlDoc->save($filename);
			if ($_GET['download'] == 'true') {
                header('Content-type: text/xml');
                header('Content-Disposition: attachment; filename="careers.xml"');
            }
            echo $xmlDoc->saveXML();
            die;
			
        }
    }
}
if (isset($_GET['report']) && $_GET['report'] == 'xml') {
    $csvExport = new XMLExport();
}

