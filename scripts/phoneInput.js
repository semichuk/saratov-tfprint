document.addEventListener("DOMContentLoaded", function() {
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');
    
    let onPhoneInput = function(event) {
        let input = event.target;
        input.value = formattingNumber(input.value);
        
    }
    
    function formattingNumber(value) {
        if(value === "") {
            return value;
        }
        let withoutCharacterNumber = value.replace(/\D/g, "");
        let a = withoutCharacterNumber.split("");
        switch (a[0]) {
            case "7":
                return withoutCharacterNumber;
                break;
            default:
                a[0] = "7";
                return creatingString(a);
                break;
        }

    }

    function creatingString(array) {
        let string = ""
        for (let i = 0; i < array.length; i++) {
             string += array[i];
        }
        return string;
    }

    for (let index = 0; index < phoneInputs.length; index++) {
        let input = phoneInputs[index];
        input.addEventListener("input", onPhoneInput);
    }
})