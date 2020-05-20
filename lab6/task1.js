$("#form").validate({
    errorClass: 'formError',
    rules: {
        email: {
            required: true,
            email: true
        },
        name: {
            required: true,
            maxlength: 12
        },
        message: {
            required: true,
            minlength: 5,
            maxlength: 100
        }
    },
    messages: {
        email: {
            required: "Email is required",
            email: "Please, enter a valid email"
        },
        name: {
            required: "Name is required",
            maxlength: "Maximum length is 12"
        },
        message: {
            required: "Message is required",
            minlength: "Minimum length is 5",
            maxlength: "Maximum length is 100"
        }
    },
    submitHandler: function(form) {
        const json = ConvertFormToJSON(form);
        $.ajax({
            type: "POST",
            url: "./task1.html",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        return false;
    }
});

function ConvertFormToJSON(form){
    const array = jQuery(form).serializeArray();
    const json = {};
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    return JSON.stringify(json);
}


