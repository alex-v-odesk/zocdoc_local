<?php
/**
*
*zocdoc static site theme functions and definitions
*
*
*
*/

// update_option( 'siteurl', 'http://localhost:8888/zocdoc' );
// update_option( 'home', 'http://localhost:8888/zocdoc' );
// update_option( 'siteurl', 'http://localhost:8888/' );
// update_option( 'home', 'http://localhost:8888/' );



require_once 'Mobile_Detect.php';

if ( ! function_exists( 'zocdoc_setup' ) ) :
function zocdoc_setup() {
	add_theme_support('title-tag');

	add_theme_support('post-thumbnails');
	set_post_thumbnail_size( 1200, 9999);

	/*add_theme_support() here for html6 markup for various wp forms*/

}
endif;
add_action('after_setup_theme', 'zocdoc_setup');

function create_post_types() {
	register_post_type('Bios',
		array(
			'labels' => array(
					'name' => __( 'Bios'),
					'singular_name' => __( 'Bio')
					),
			'taxonomies' => array('category'),
			'public' => true,
			'publically_queryable' => true,
			'has_archive'=>true,
			'rewrite' => array('slug' => 'bios', 'with_front' => false)
			)
	);

	register_post_type('Investors',
		array(
			'labels' => array(
					'name' => __( 'Investors'),
					'singular_name' => __( 'Investor')
					),
			'public' => true,
			'publically_queryable' => true,
			'has_archive'=>true,
			'rewrite' => array('slug' => 'investors_slug', 'with_front' => false)
			)
	);

	register_post_type('Press_Releases',
		array(
			'labels' => array(
					'name' => __( 'News'),
					'singular_name' => __( 'News')
					),
			'public' => true,
			'publically_queryable' => true,
			'has_archive'=>true,
			'rewrite' => array('slug' => 'news', 'with_front' => false)
			)
	);

	// register_post_type('Fast_Facts',
	// 	array(
	// 		'labels' => array(
	// 				'name' => __( 'Fast Facts'),
	// 				'singular_name' => __( 'Fast Fact')
	// 				),
	// 		'public' => true,
	// 		'publically_queryable' => true,
	// 		'has_archive'=>true,
	// 		'rewrite' => array('slug' => 'fast_facts', 'with_front' => false)
	// 		)
	// );

	register_post_type('Downloads',
		array(
			'labels' => array(
					'name' => __( 'Downloads'),
					'singular_name' => __( 'Download')
					),
			'public' => true,
			'publically_queryable' => true,
			//'has_archive'=>true,
			'rewrite' => array('slug' => 'download', 'with_front' => false)
			)
	);

	register_post_type('Videos',
		array(
			'labels' => array(
					'name' => __( 'Videos'),
					'singular_name' => __( 'Video')
					),
			'public' => true,
			'publically_queryable' => true,
			//'has_archive'=>true,
			'rewrite' => array('slug' => 'video', 'with_front' => false)
			)
	);

	register_post_type('Questions',
		array(
			'labels' => array(
					'name' => __( 'Questions'),
					'singular_name' => __( 'Question')
					),
			'public' => true,
			'publically_queryable' => true,
			//'has_archive'=>true,
			'rewrite' => array('slug' => 'question', 'with_front' => false)
			)
	);


	register_taxonomy('topics', array('questions'), array(
		'hierarchical' => true,
		'labels' => array(
			'name'	=>_x('Topics', 'taxonomy general name'),
			'singular_name'	=>_x('Topic', 'taxonomy singular name'),
			'search_items'	=> __('Search Topics'),
			'all_items' => __('All Topics'),
			'parent_item' => __('Parent Topic'),
			'parent_item_colon' => __('Parent Topic:'),
			'edit_item' => __('Edit topic'),
			'update_item' => __('Update Topic'),
			'add_new_item' => __('Add New Topic'),
			'new_item_name' => __('New Topic Name'),
			'menu_name' => __('Topic')),
		'show_ui'	=> true,
		'show_admin_column'	=> true,
		'query_var' => true,
		'rewrite' => array('slug' => 'topic', 'with_front' => false)));


	register_taxonomy('video-categories', array('videos'), array(
		'hierarchical' => true,
		'labels' => array(
			'name'	=>_x('Categories', 'taxonomy general name'),
			'singular_name'	=>_x('Category', 'taxonomy singular name'),
		),
		'show_ui'	=> true,
		'show_admin_column'	=> true,
		'query_var' => true,
		'rewrite' => array('slug' => 'video-categories', 'with_front' => false)));

	register_taxonomy('downloads-categories', array('downloads'), array(
		'hierarchical' => true,
		'labels' => array(
			'name'	=>_x('Categories', 'taxonomy general name'),
			'singular_name'	=>_x('Category', 'taxonomy singular name'),
		),
		'show_ui'	=> true,
		'show_admin_column'	=> true,
		'query_var' => true,
		'rewrite' => array('slug' => 'download-categories', 'with_front' => false)));

}


// /*create post types*/
add_action('init', 'create_post_types');

/*REWRITE RULES*/
function zd_insert_rewrite_rules($rules) {
	$newrules = array();
	$newrules['^team/(.+)$'] = 'index.php?post_type=bios&name=$matches[1]';
	$newrules['^spokespeople/(.+)$'] = 'index.php?post_type=bios&name=$matches[1]';
	return $newrules + $rules;
}
add_filter('rewrite_rules_array', 'zd_insert_rewrite_rules');


function getYoutubeThumb($video){
	preg_match('/src="(.+?)"/', $video, $matches_url );
  $src = $matches_url[1];
  preg_match('/embed(.*?)?feature/', $src, $matches_id );
  $id = $matches_id[1];
  $id = str_replace( str_split( '?/' ), '', $id );
  return $id;
}


/*Add styles and js*/
function zocdoc_scripts() {
	//wp_enqueue_style('zocdoc-fonts', zocdoc_fonts_url())
	wp_enqueue_style('zocdoc-style', get_stylesheet_uri());

	wp_enqueue_style('combined-styles', get_template_directory_uri() . '/styles/output/combined/combined.css');
	wp_enqueue_style('provider-style', get_template_directory_uri() . '/styles/output/desktop/styles/knowledgebase-style.css');

	wp_enqueue_style('zocdoc-desktop', get_template_directory_uri() . '/styles/output/desktop/styles/desktop-style.css');


	wp_enqueue_style('about-svg', get_template_directory_uri() . '/about-svg.css');


	$user_agent = $_SERVER['HTTP_USER_AGENT'];
	// $user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36 ZocDocApp iPhoneApp 3.02";
	if(strpos($user_agent, "ZocDocApp")){
		wp_enqueue_style('mobile-app', get_template_directory_uri() . '/styles/output/combined/mobileApp.css');
	}
}
add_action('wp_enqueue_scripts', 'zocdoc_scripts');

function custom_change_preview_link($link) {
    return preg_replace('/https:\/\/www.zocdoc.com/', 'https://zocdocstatic.wpengine.com', $link);
}
add_filter( 'preview_post_link', 'custom_change_preview_link' );

// Remove Canonical Link Added By Yoast WordPress SEO Plugin
function at_remove_dup_canonical_link() {
	return false;
}
// add_filter( 'wpseo_canonical', 'at_remove_dup_canonical_link' );

add_filter( 'template_include', 'default_page_template', 99 );
//set default template for page
function default_page_template( $template ) {

    if ( is_singular( 'page' )  ) {
        $default_template = locate_template( array( 'page-knowledgebase.php' ) );
        if ( '' != $default_template ) {
            return $default_template ;
        }
    }

    return $template;
}