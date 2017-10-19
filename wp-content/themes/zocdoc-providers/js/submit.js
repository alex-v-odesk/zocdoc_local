$("#send").click(function() {
    var values = {};
    var empty = false;
    $('.error-message').removeClass('show-error')
    $.each($('.mesage-input').serializeArray(), function(i, field) {
        values[field.name] = field.value;
        if (field.value == "") empty = true;
    });
    // console.log(values, 'values')
    if (!empty) postData(values);
    else formError("Please fill out all fields");
});

function postData(values) {
    $.ajax({
        type: "post",
        url: "/ContactUs/SendMessage",
        dataType: "json",
        data: values,
        success: function(response) {
            if (response.status === "success") {
                console.log(response, 'success')
            } else if (response.status === "error") {
                console.log(response, 'error')
            }
            formSuccess();
        },
        error: function(err){
            console.log(err.status, 'error');
            formError("An error occurred please try again");
        }
    })
}

function formSuccess() {
    $('#replace').addClass('hidden-form');
    $('.form').addClass('hidden-form');
    $('.fields').addClass('shrink');
    setTimeout(function() {
        $('#replace').addClass('extra-padding');
        $('#replace').html("Thanks! We'll get back to you soon");
        $('#replace').removeClass('hidden-form');
    }, 250);
}

function formError(error) {
    $('.error-message').addClass('show-error').text(error);
}