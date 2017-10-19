var singlePost = document.getElementsByClassName("single-post")[0];

if (singlePost) centerContent();

function centerContent() {
  var eachP = $(singlePost).find('p');

  for (var i = 0; i < eachP.length; i++) {
    var iframe = $(eachP[i]).find('iframe');
    var image = $(eachP[i]).find('img');
    if (iframe.length > 0 || image.length > 0) {
      eachP[i].classList.add('center');
    }
  };
}