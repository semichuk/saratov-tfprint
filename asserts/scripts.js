$(document).ready(function () {
    
    $('input[name="phone"]').mask("+7 (999) 999-99-99");
    
    $("form").each(function() {
        $(this).validate({
            rules : {
                name : {
                    required : true
                },
                phone : {
                    requiredPhone : true,
                    minlengthPhone : 10
                },
                mail : {
                    required : true,
                    email : true
                }
            },
            messages : {
                name : {
                    required : "Введите Ваше имя!"
                },
                phone : {
                },
                mail : {
                    required : "Введите Ваш email!",
                    email : "Правильно введите email!"
                }
            },
            submitHandler : function(form) {
                $(form).ajaxSubmit({
                    beforeSubmit : function(arr, $form, options) {
                        $('.cssload-thecube').show();
                    },
                    success : function(responseText, statusText, xhr, $form) {
                        $('.cssload-thecube').hide();
                        lity(responseText);
                    }
                });
            }
        });
    });

    $.validator.addMethod("requiredPhone", function(value, element, param) {
        value = value.replace('+7 (___) ___ - __ - __');

        if (!this.depend(param, element)) {
            return "dependency-mismatch";
        }
        if (element.nodeName.toLowerCase() === "select") {
            var val = $(element).val();
            return val && val.length > 0;
        }
        if (this.checkable(element)) {
            return this.getLength(value, element) > 0;
        }
        return $.trim(value).length > 0;
    }, "Укажите ваш телефон!");

    $.validator.addMethod("minlengthPhone", function(value, element, param) {
        value = value.replace('+7 (', '');
        value = value.replace(') ', '');
        value = value.replace(/ - /g, '');
        value = value.replace(/_/g, '');

        var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
        return this.optional(element) || length >= param;
    }, "Телефон должен быть не менее {0} символов!");

});