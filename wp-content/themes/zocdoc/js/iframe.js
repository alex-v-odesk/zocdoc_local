var iframes = document.getElementsByClassName('pardotform');

if (iframes) {
  // console.log(iframes)
  // iframes.forEach(function(iframe) {
  //   iFrameResize(iframe);
  // })
  for (var i = 0; i < iframes.length; i++) {
    // Things[i]
    // iFrameResize(iframes[i]);
    // iFrameResize({log:true, checkOrigin:false, heightCalculationMethod: 'grow', enablePublicMethods: true} || iframes[i]);
  };
iFrameResize({log:true, checkOrigin:false, heightCalculationMethod: 'default', enablePublicMethods: true} || iframes[i]);
}