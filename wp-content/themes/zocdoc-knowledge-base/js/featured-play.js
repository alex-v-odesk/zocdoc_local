  var el = document.getElementById("featured-play");

   // console.log(els, 'els')

   // for (var i = 0; i < els.length; i++) {
  if (el) {
      el.addEventListener("touchstart", featuredPlay, false);
      el.addEventListener("click", featuredPlay, false);
  }

   // }


  var flag = false;

  function featuredPlay() {

      if (!flag) {

          flag = true;
          setTimeout(function() {
              flag = false;
          }, 100);

          var parent = this.parentNode;
          parent.classList.add('play');

      }
      return false
  }