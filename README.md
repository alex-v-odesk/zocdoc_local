# zocdoc

all css is in the in the wp-content/themese/zocdoc/styles folder
inside styles folder:    
/input folder is the pre-compiled less  
/input/common is the responsive css that comes from us  
/input/desktop is zocdoc's desktop css plus adjustments in less file  
/inpu/mobile is zocdoc's mobile css plus adjustments  

/output has compiled css and other style elements    
there are also .html files in here (they should probably be moved to a diff folder for clarity, let us know if you want us to refactor) out of these only the Header html files are used, the footer code has been moved to php files

you can use `less-watch-compiler` to compile the .less files:  
cd into wp-content/themese/zocdoc folder and run  
`
less-watch-compiler
`  
less-watch-compiler.config.json has the config settings

note from @eric_wvgg April 2017:
    less-watch-compiler doesn't seem to read the config file. 
    This worked for me, (run from /wp-content/themes/zocdoc)
        lessc -x styles/input/combined/combined.less > styles/output/combined/combined.css


you can push this repo directly to the wp production and stagin repos:   
production	git@git.wpengine.com:production/zocdocstatic.git (fetch)  
production	git@git.wpengine.com:production/zocdocstatic.git (push)  
staging	git@git.wpengine.com:staging/zocdocstatic.git (fetch)  
staging	git@git.wpengine.com:staging/zocdocstatic.git (push)  

There's a strange issue where pushing will break everything. These steps are necessary to repair the site after deployment.

Staging:

* If you copy from Production to Staging, go to Wordpress General > Appearance and set the theme to Zocdoc-careers
* Go to General > Settings
* Change the site address to the original URL: http://zocdocstatic.staging.wpengine.com; save changes
* Change the site URL back to: http://zocdocstatic.staging.wpengine.com/about; save changes
* Change the permalinks to /%postname%/ and save
* Change the permalinks back to /blog/%category%/%postname%/ and save

Production:

* Go to General > Settings
* Change the site address to the original URL: https://zocdocstatic.wpengine.com; save changes
* Change the site URL back to: https://www.zocdoc.com/about; save changes
* Change the permalinks to /%postname%/ and save
* Change the permalinks back to /blog/%category%/%postname%/ and save