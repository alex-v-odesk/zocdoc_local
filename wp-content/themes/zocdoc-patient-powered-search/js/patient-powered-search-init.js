$(document).ready(function() {

  _objectsInited = false;
  _currentWord = -1;
  _ppsLayout = 0;
  _layouts = ["content_desktop","content_mobile"];

  // do Adobe Animate setup in patient-powered-search-canvas.js
  pps_init();

  _placeholders = ["anxiety","vomiting","migraine","acid reflux","snoring","pregnant","hernia","eczema","school phobia","menopause"];
  _questions = ["How do you say I have", "How do you say", "How do you say I have a", "How do you say I have", "How do you ask about", "How do you say I might be", "How do you say I have a", "How do you say I have", "How do you say I have","How do you say I am in"];
    
  // pps = 1 is checked for in the NS Google Connector plugin in case there are other CF7 forms on this site
  $(".wpcf7-form").append('<input type="hidden" name="pps" value="1" />');
  
  // http://stackoverflow.com/questions/2830542/prevent-double-submission-of-forms-in-jquery
  $(".wpcf7-form").on('submit',function(e){
    if ($(this).data('submitted') === true) {
      //console.log("can't submit again!");
      // Previously submitted - don't submit again
      e.preventDefault();
    } else {
      //console.log("first submit");
      // Mark it so that the next submit can be ignored
      $(this).data('submitted', true);
    }
  });
  
  // canvas inited from within FLA/patient-powered-search.js
});

function setupForm()
{
  if (_currentWord == 0)
  {
    TweenMax.set($("#overlays"), { css: {"visibility": "visible"} });
  }
  
  TweenMax.set($("#pps-intro"), { css: {"visibility": "visible"} });
  TweenMax.set(".wpcf7-form", { css: {"display": "block"} });
  TweenMax.to(".wpcf7-form", 0.5, { alpha: 1 });
  TweenMax.to(".pps-feedback", 0.5, { alpha: 1 });
  
  // re-enable form submit
  $(".wpcf7-form").data('submitted', false);
  
  $(".wpcf7-submit").click(function (){
    if($("#pps-word").val() !== "") {
      //console.log("sending!");
      $(this).hide();
      $(".pps-feedback").html("submitting...").show();
    }
  });
  
  $(".pps-question").html(_questions[_currentWord]);
  
  $("#pps-word").val(_placeholders[_currentWord]+"?").removeAttr('disabled').focus();
  $("#pps-word").css({"background-color": "rgba(255, 255, 255, 0.5)", "color": "#00234b"});
  $("#pps-word").on("keypress", function() {
    $("#pps-word").off("keypress");
    
    // clicking into field
    if ($(this).val() == _placeholders[_currentWord]+"?")
    {
      $(this).val("");
    }
    $(".pps-feedback").html("");
    $(".pps-question").html("You could say...");
    $(".wpcf7-submit").show();
  });
  $(".pps-feedback").html("write it here");
  TweenMax.set(".pps-question", { alpha: 1 });

  setGoogleSheetTab(_currentWord);
}

function onCF7SubmitSuccess()
{
  addUserWord($("#pps-word").val()); 
  
  TweenMax.set(".pps-question", { alpha: 0 });
  $(".pps-feedback").html("that's a good one!");
  $("#pps-word").css({"background-color": "#00234b", "color": "#fff"});
  setTimeout(function() {
    $("#pps-word").val("thanks!").attr('disabled','disabled').focusout();
  },100);
  
  setTimeout(function() {
    transitionOut();
  },2000);
}

function setGoogleSheetTab(n)
{
  $(".wpcf7-form").find("input[name='tab']").remove();
  $(".wpcf7-form").append('<input type="hidden" name="tab" value="word'+n+'" />');
}

// CANVAS

function initCanvas()
{   
  // set names for each instance (not done by default in createJS)
  // and create global vars for them
  for(var childName in exportRoot)
  {      
    if(exportRoot[childName] instanceof createjs.DisplayObject && childName != "parent")
    {
      exportRoot[childName].name = childName;
      window[childName] = exportRoot[childName];
      //console.log(exportRoot[childName].name + " now has a name and global var");
    }
  } 
  _objectsInited = true;
  
  var c;
  for (var j=0; j<=1; j++)
  {
    c = exportRoot[_layouts[j]].continue_mc;
    c.continue_btn.cursor = "pointer";
    c.continue_btn.on("rollover", function () { this.gotoAndStop("over"); });
    c.continue_btn.on("rollout", function () { this.gotoAndStop("out"); });
    c.continue_btn.addEventListener("click", onContinueClick);

    TweenMax.to(exportRoot[_layouts[j]].blobs_mc, 1, { alpha: 1, scaleX: 1, scaleY: 1 });
  }
  
  // enable mouse interactions 
  stage.enableMouseOver();
}

function showIntro()
{
  // apply to desktop and mobile content
  for (var k=0; k<=1; k++)
  {
    TweenMax.to(exportRoot[_layouts[k]].continue_mc, 0.5, { alpha: 1, delay: 1.5 });
  }
}

function showWords()
{
  // apply to desktop and mobile content
  var layout;
  var word;
  for (var j=0; j<=1; j++)
  {
    word = exportRoot[_layouts[j]]["word"+_currentWord];
    for (var i=0; i<=word.numChildren-1; i++)
    {
      popupword = word.getChildAt(i);
      if (popupword !== word.ugc_word_mc)
      {
        TweenMax.set(popupword, { alpha: 0, scaleX: 0, scaleY: 0});
        TweenMax.to(popupword, 0.5, { alpha: 1, scaleX: 1, scaleY: 1, ease: Elastic.easeOut.config(1, 0.5), delay: i*0.25 });
        //TweenMax.to(popupword, 1.5, { alpha: 1, scaleX: 1, scaleY: 1 });
      }
    }  
  }
}

function addUserWord(word)
{
  var ugc_word;
  var s;
  
  // apply to desktop and mobile content
  for (var i=0; i<=1; i++)
  {
    ugc_word = exportRoot[_layouts[i]]["word"+_currentWord].ugc_word_mc;
    
    // add UGC word
    var text = new createjs.Text('"' + word + '"', "20px sharp-sans-semibold", "#ffffff");
    text.y = 4;
    ugc_word.addChild(text);
    // add timestamp
    var ts = new createjs.Text(getTimestamp(), "12px sharp-sans-semibold", "#00234b");
    ts.y = 36;
    ugc_word.addChild(ts);
  
    // scale text
    var textBounds = text.getBounds();
    var textW = textBounds.width;
    // scale bg
    ugc_word.bg.regX = 0;
    ugc_word.bg.scaleX = (textW+20)/100;
    // move elements
    if (ugc_word.scaleCenter)
    {
      ugc_word.bg.x = (textW+20)/2 * -1;
      text.x = ugc_word.bg.x + 10;
      ts.x = -1 * ts.getBounds().width/2;
    }
    else
    {
      text.x = 10;
      ts.x = text.x + textW/2 - ts.getBounds().width/2;
    }

    // mobile ugc words mc's are scaled up on the stage, so scale up to their current scale, not 1
    s = ugc_word.scaleX;
    TweenMax.set(ugc_word, { alpha: 0, scaleX: 0, scaleY: 0});
    TweenMax.to(ugc_word, 0.5, { alpha: 1, scaleX: s, scaleY: s, ease: Elastic.easeOut.config(1, 0.5) });
  }  
}

function getTimestamp()
{
  var d = new Date();
  var day = ('0' + (d.getMonth()+1)).slice(-2) + '.'
             + ('0' + d.getDate()).slice(-2) + '.'
             + d.getFullYear().toString().substr(2,2);
  return "Submitted " + day + " at " + formatAMPM(d);
}

function formatAMPM(date)
{
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


// transitions

function transitionOut()
{
  TweenMax.to(".wpcf7-form", 0.5, { alpha: 0, onComplete: function() { 
    TweenMax.set(".wpcf7-form", { css: {"display": "none"} });
  } });
  TweenMax.to(".pps-feedback", 0.5, { alpha: 0 });

  // apply to desktop and mobile content
  var layout;
  var word;
  for (var j=0; j<=1; j++)
  {
    word = exportRoot[_layouts[j]]["word"+_currentWord];
    for (var i=0; i<=word.numChildren-1; i++)
    {
     w = word.getChildAt(i);
     TweenMax.to(w, 0.5, { alpha: 0, delay: i*0.1 });
    }    
  }

  if (_currentWord === 9)
  {
    // show end screen
    for (var m=0; m<=1; m++)
    {
      TweenMax.to(exportRoot[_layouts[m]].end_mc, 0.5, { alpha: 1, delay: 1.5 });
    }
  }
  else
  {
    gotoNextWord();
  }
}

function gotoNextWord()
{
  _currentWord += 1;
  
  var d = 2;
  // apply to desktop and mobile content
  if (_currentWord == 0)
  {
    d = 1;
  }
    else
  {
    TweenMax.delayedCall(1, function () { content_desktop.blobs_mc.gotoAndPlay("word"+_currentWord); });
    TweenMax.delayedCall(1, function () { content_mobile.blobs_mc.gotoAndPlay("word"+_currentWord); });
  }
    
  TweenMax.delayedCall(d, setupForm);
  TweenMax.delayedCall(d, showWords);
}

function onContinueClick(e)
{
  // apply to desktop and mobile content
  for (var k=0; k<=1; k++)
  {
    TweenMax.to(exportRoot[_layouts[k]].continue_mc, 0.5, { alpha: 0, onComplete: function () {
      TweenMax.set(this, { css: {"display": "none"} }); }
    });
  }  
  gotoNextWord();
}

function updatePPSLayout()
{
  // this is called from -canvas but the above stage setup may not be done. keep trying
  if (!_objectsInited)
  {
    setTimeout(function() {
     updatePPSLayout();
    },100);
    return;
  }

  if (_ppsLayout == 0)
  {
    TweenMax.set(content_desktop, { alpha: 1 });
    TweenMax.set(content_mobile, { alpha: 0 }); 
  }
  else if (_ppsLayout == 1)
  {
    TweenMax.set(content_desktop, { alpha: 0 });
    TweenMax.set(content_mobile, { alpha: 1 }); 
  }
}





