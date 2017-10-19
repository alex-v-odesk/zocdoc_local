$(window).load(function() {
  var iframe = $('.single-video').find('iframe')[0];
  if (iframe) iframe.src += "&autoplay=1";

  $("#featured-play").click(function(){
    var iframe = $('.featured-video').find('iframe')[0];
    if (iframe) iframe.src += "&autoplay=1";
  })

  $("#template-play").click(function(){
    var iframe = $('.template-video').find('iframe')[0];
    if (iframe) iframe.src += "&autoplay=1";
  })

});
