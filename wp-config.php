<?php
# Database Configuration
define( 'DB_NAME', 'wp_zocdocstatic' );
define( 'DB_USER', 'zocdocstatic' );
define( 'DB_PASSWORD', 'KMO3aTXWNyCz8LYT0Rh3' );
define( 'DB_HOST', '127.0.0.1' );
define( 'DB_HOST_SLAVE', '127.0.0.1' );
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', 'utf8_unicode_ci');
$table_prefix = 'wp_';

# Security Salts, Keys, Etc
define('AUTH_KEY',         '9,i]RJX!=!gohKfqS$a6`:?&v+^fE{e(Vw;8aYoNfJ%aftK=Be=TCIEErU+=5h*l');
define('SECURE_AUTH_KEY',  '_Q2@92;:;_Uf W,Nf&O;c$l?vc%v6)J>a=VU*4rW7#1oMOz}4Q&{y4VXu-@5M]f1');
define('LOGGED_IN_KEY',    'f?iwi%G}B(Lx0c~;8x6pqiQ!}Xx2fyTv0.%b{}Ig54BrzU2-{,z>%t%fz#^&8SlC');
define('NONCE_KEY',        'Ba130|`9D-ES8Y,XW^7A(miU4W}Ahdz/*d+c$dr|w$/V67+:E>|pef|SI^9x+TUQ');
define('AUTH_SALT',        '/n*c-8e+rz`:R0FPU?Rt1z?R Oy()|.z:j^ev|J4N^AD}fiDr|xSAyfl1735B%5r');
define('SECURE_AUTH_SALT', '?D{?8/UJ;NOx)+@U.ndHsS-$5^t,{`9YlgUvWrMkG#Ex.fMAzdsr]R~Ij(:/B)<D');
define('LOGGED_IN_SALT',   '+Y%9+iGjFZuv/&-d4[03QYlT`&D4Q0*~M~;BbX!Eju7&mL&x8,I940].|%=w_>GG');
define('NONCE_SALT',       '-+uwJmKuCfb+<;x+mPB:Y7|}w&dh4HmF7msG_W3ItNHlF,-{BFF^)F>`AwI&.|RT');


# Localized Language Stuff

define( 'WP_CACHE', TRUE );

define( 'WP_AUTO_UPDATE_CORE', false );

define( 'PWP_NAME', 'zocdocstatic' );

define( 'FS_METHOD', 'direct' );

define( 'FS_CHMOD_DIR', 0775 );

define( 'FS_CHMOD_FILE', 0664 );

define( 'PWP_ROOT_DIR', '/nas/wp' );

define( 'WPE_APIKEY', '921d26e2cfc34ce3cdb0acc6bef68dc5a34f8c57' );

define( 'WPE_FOOTER_HTML', "" );

define( 'WPE_CLUSTER_ID', '100102' );

define( 'WPE_CLUSTER_TYPE', 'pod' );

define( 'WPE_ISP', true );

define( 'WPE_BPOD', false );

define( 'WPE_RO_FILESYSTEM', false );

define( 'WPE_LARGEFS_BUCKET', 'largefs.wpengine' );

define( 'WPE_SFTP_PORT', 2222 );

define( 'WPE_LBMASTER_IP', '' );

define( 'WPE_CDN_DISABLE_ALLOWED', false );

define( 'DISALLOW_FILE_MODS', FALSE );

define( 'DISALLOW_FILE_EDIT', FALSE );

define( 'DISABLE_WP_CRON', true );

define( 'WPE_FORCE_SSL_LOGIN', false );

define( 'FORCE_SSL_LOGIN', false );

/*SSLSTART*/ if ( isset($_SERVER['HTTP_X_WPE_SSL']) && $_SERVER['HTTP_X_WPE_SSL'] ) $_SERVER['HTTPS'] = 'on'; /*SSLEND*/

define( 'WPE_EXTERNAL_URL', false );

define( 'WP_POST_REVISIONS', FALSE );

define( 'WPE_WHITELABEL', 'wpengine' );

define( 'WP_TURN_OFF_ADMIN_BAR', false );

define( 'WPE_BETA_TESTER', false );

umask(0002);

$wpe_cdn_uris=array ( );

$wpe_no_cdn_uris=array ( );

$wpe_content_regexs=array ( );

$wpe_all_domains=array ( 0 => 'espanol.zocdoc.com', 1 => 'nj1test.zocdoc.com', 2 => 'www.espanol.zocdoc.com', 3 => 'www.zocdoc.com', 4 => 'zocdoc.com', 5 => 'zocdocstatic.wpengine.com', );

$wpe_varnish_servers=array ( 0 => 'pod-100102', );

$wpe_special_ips=array ( 0 => '130.211.196.28', );

$wpe_ec_servers=array ( );

$wpe_largefs=array ( );

$wpe_netdna_domains=array ( );

$wpe_netdna_domains_secure=array ( );

$wpe_netdna_push_domains=array ( );

$wpe_domain_mappings=array ( );

$memcached_servers=array ( );


#define( 'WP_SITEURL', 'http://www.zocdoc.com' );
define( 'WP_SITEURL', 'http://zocdocstatic.wpengine.com' );

// define( 'WP_HOME', 'http://zocdocstatic.wpengine.com' );
define('WPLANG','');

# WP Engine ID


# WP Engine Settings






# That's It. Pencils down
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'wp-settings.php');

$_wpe_preamble_path = null; if(false){}
