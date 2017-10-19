<?php
    //JOB DETAILS
    if(isset($wp_query->query_vars['job_id'])) {
        get_template_part('template-parts/careers','header');
        get_template_part('template-parts/job', 'details');
    } else {
        get_template_part('index');
    }
?>
