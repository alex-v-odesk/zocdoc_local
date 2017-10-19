// $('#inputText').keypress(function (e) {
//   if (e.which == 13) {
//     var inputData = $('#inputText').val();
//     console.log(inputData);
//     search(inputData);
//     return false;
//   }
// });


// $("#search-button").click(function() {
//     var inputData = $('#inputText').val();
//     console.log(inputData);
//     search(inputData);
// });

// function search(inputData) {
//   $.ajax({
//         type: 'GET',
//         dataType: 'html',
//         url: '../?s=' + inputData + '&post_type=questions',
//         success: function(html) {
//             var div = $('.hold-questions', $(html))
//             $('.hold-questions').html(div);
//             newElems();
//         }
//     });
// }

// function newElems() {
//     var els = document.getElementsByClassName("question");


//     for (var i = 0; i < els.length; i++) {
//         els[i].addEventListener("touchstart", toggle, false);
//         els[i].addEventListener("click", toggle, false);
//     }

//     var flag = false;

//     function toggle() {

//         if (!flag) {

//             flag = true;
//             setTimeout(function() {
//                 flag = false;
//             }, 100);

//             var parent = this.parentNode;
//             if (parent.classList.contains('hidden-answer')) {
//                 parent.classList.remove('hidden-answer');
//             } else {
//                 parent.classList.add('hidden-answer');
//             }

//         }
//         return false
//     }

// }