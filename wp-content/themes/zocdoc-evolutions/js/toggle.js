  var els = document.getElementsByClassName("question");

  // console.log(els, 'els')

  for (var i = 0; i < els.length; i++) {
     // els[i].addEventListener("touchstart", toggle, false);
      els[i].addEventListener("click", toggle, false);
  }


var flag = false;
  function toggle() {

    if (!flag) {

      flag = true;
      setTimeout(function(){ flag = false; }, 100);

      var parent = this.parentNode;
      if (parent.classList.contains('hidden-answer')) {
        parent.classList.remove('hidden-answer');
      } else {
        parent.classList.add('hidden-answer');
      }

    }
    // return false
  }
