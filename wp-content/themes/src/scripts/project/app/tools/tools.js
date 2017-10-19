var CV = require('./../config/currentValues');

var Tools = function () {

  this.getScaledFontSize = function (textConfig) {

    var maxHeight = (textConfig.maxHeight instanceof Function) ? textConfig.maxHeight.call(this) : textConfig.maxHeight;
    var fontRatio,
      fontBase,
      fontSize;
    //check if it exceeds max height

    if (textConfig.currentHeight && maxHeight !== null) {

      if (textConfig.currentHeight > maxHeight) {
        fontRatio = maxHeight / textConfig.currentHeight;

        fontBase = fontRatio * textConfig.currentFontSize;
        fontSize = fontBase > textConfig.maxFont ? textConfig.maxFont : fontBase < textConfig.minFont ? textConfig.minFont : fontBase;
      }
    } else {
      fontRatio = textConfig.maxWidth / textConfig.currentWidth,
        fontBase = fontRatio * textConfig.currentFontSize,
        fontSize = fontBase > textConfig.maxFont ? textConfig.maxFont : fontBase < textConfig.minFont ? textConfig.minFont : fontBase;
    }

    return fontSize;
  }

  this.getMaxNumberInArray = function (arrNumbers) {

    return Math.max.apply(Math, arrNumbers);

  }

  this.getRandomNumber = function (maxValue, onlyPositive, minValue) {

    var isPositive = Math.round(Math.random());

    if (onlyPositive != undefined && onlyPositive) isPositive = true;

    var nb = Math.round(Math.random() * maxValue);

    if (minValue != undefined && nb < minValue)
      nb = minValue;

    return isPositive ? nb : -nb;

  }

  this.rgbToHex = function (r, g, b) {

    r = parseInt(r).toString(16).length == 1 ? "0" + parseInt(r).toString(16) : parseInt(r).toString(16);
    g = parseInt(g).toString(16).length == 1 ? "0" + parseInt(g).toString(16) : parseInt(g).toString(16);
    b = parseInt(b).toString(16).length == 1 ? "0" + parseInt(b).toString(16) : parseInt(b).toString(16);

    return "#" + r + g + b;

  }

  this.disappearPage = function (link) {

    window.location.href = link;

    // I commented this out because the page dissapears when you hit the back button on safari.
    // the problem is caused by the back-forward cache
    // TweenMax.to('html', .4, {
    //   opacity: 0,
    //   ease: Expo.easeOut,
    //   onComplete: (function () {
    //     window.location.href = link;
    //   }).bind(this)
    // });

  }

  this.triggerEl = function (el, h) {

    var currentEl = el;
    var y = el.getBoundingClientRect().top;

    //var y = 0;
    // while (el && !isNaN(el.offsetTop)) {
    //   y += el.offsetTop - el.scrollTop;
    //   el = el.offsetParent;
    // }

    return {
      el: currentEl,
      y: y,
      visible: y >= -h && y <= CV.viewport.height ? true : false,
      percentage: y >= -h && y <= CV.viewport.height ? (-y + CV.viewport.height) / (h + CV.viewport.height) : null,
      top: y,
      height: h
    }

  }

  this.loadYTAPI = function (callback) {

    if (!window.onYouTubeIframeAPIReady) {

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = (function(){
        callback.call(this);
      }).bind(this);

    }
    else {

      callback();

    }


  }

}

module.exports = new Tools();
