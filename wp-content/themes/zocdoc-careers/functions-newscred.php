<?php
    
// https://support.newscred.com/hc/en-us/articles/208182496
    
function generate_license_info() {
    $license = '';
    $nc_author = get_post_meta(get_the_id(), 'nc-author', 1); // Pull in the author custom-field
    $nc_source = get_post_meta(get_the_id(), 'nc-source', 1); // Pull in the source custom-field ``` // Check if both the nc-author & nc-source field aren't empty, then assign it to $license string
    if ( $nc_author != '' )
        $license = $nc_author;

    if ( $nc_source != '' )
        $license = $nc_source; // Join the author name & source name together, separated by a comma for a complete byline.

    if ( $nc_author != '' && $nc_source != '' )
        $license = $nc_author . ' | ' . $nc_source;
        return $license;
}

function wpseo_canonical_exclude($canonical) { 
    global $post; 
    if (is_single()) { 
        $canonical = false; 
    } 
    return $canonical; 
 }