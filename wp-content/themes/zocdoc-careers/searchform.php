<?php
/**
 * Template for displaying search forms
 */
?>

<form role="search" method="get" id="searchform" action="<?php echo esc_url( home_url( '/blog/search/' ) ); ?>">
		<input type="text" autocomplete="off" class="text" placeholder="Search here..." name="search" id="search" value="<?php echo get_search_query()?>" name="s" id="s">
		<input type="submit" class="search-button" class="search" id="searchsubmit" value="">
</form>
