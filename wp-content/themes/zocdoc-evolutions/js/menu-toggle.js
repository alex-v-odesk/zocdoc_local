var hamEl = document.getElementsByClassName("-menu-button-container")[0];
var mobileMenu = document.getElementsByClassName("mobile-menu")[0];
var container = document.getElementsByClassName("main-container");
var mobileHeader = document.getElementsByClassName("mobile-header")[0];
var bodyEl = document.getElementsByTagName("body")[0];
var htmlEl = document.getElementsByTagName("html")[0];

if (hamEl) hamEl.addEventListener("click", toggleMenu, false);

var flag = false;

function toggleMenu() {

    if (!flag) {

        flag = true;
        setTimeout(function() {
            flag = false;
        }, 100);

        var parent = this.parentNode;
        if (mobileMenu.classList.contains('hide')) {
            mobileMenu.classList.remove('hide');
            bodyEl.classList.add('control');
            htmlEl.classList.add('control');

            for (var i = 0; i < container.length; i++) {
                container[i].classList.add('push');
                container[i].classList.add('push');
            }

        } else {
            mobileMenu.classList.add('hide');
            bodyEl.classList.remove('control');
            htmlEl.classList.remove('control');

            for (var i = 0; i < container.length; i++) {
                container[i].classList.remove('push');
                container[i].classList.remove('push');
            }


        }

    }
    // return false
}