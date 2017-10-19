var el = document.getElementById("template-play");

if (el) {
    el.addEventListener("touchstart", templatePlay, false);
    el.addEventListener("click", templatePlay, false);
}

var flag = false;

function templatePlay() {

    if (!flag) {

        flag = true;
        setTimeout(function() {
            flag = false;
        }, 100);

        var parent = this.parentNode.parentNode.parentNode;
        parent.classList.add('play');

    }
    return false
}
