function forms() {
    ////////////////////forms/////////////////////////////////////////


    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Отправка...',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await response.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = 'отправка...';
            form.append(statusMessage);

            // const object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('https://saratov-tfprint.ru/api/main.php', json)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = res.result;
                }).catch((exeption) => {
                    console.log(exeption);
                    statusMessage.textContent = 'Ошибка клиента';
                }).finally(() => {
                    setTimeout(()=>{
                        let status = document.querySelectorAll('.status');
                        status.forEach((item) => {
                            item.remove();
                        });
                    }, 8000);
                })



        });
    }

}

function phoneInput() {
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');

    let onPhoneInput = function (event) {
        let input = event.target;
        input.value = formattingNumber(input.value);

    }

    function formattingNumber(value) {
        if (value === "") {
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
}

function yandexMap() {
    ymaps.ready(init);
    function init() {
        let myMap = new ymaps.Map("map", {
            center: [51.596290, 46.018815],
            zoom: 17
        });
        let myPlacemark = new ymaps.Placemark([51.596290, 46.018815]);
        myMap.geoObjects.add(myPlacemark)
    }
}

function burgerMenu() {
    const burger = document.querySelector('a[data-nav-burger]');
    const menu = document.querySelector('div[data-nav-buttons]');
    const button1 = document.querySelector('#button1');
    const button2 = document.querySelector('#button2');
    const button3 = document.querySelector('#button3');
    const button4 = document.querySelector('#button4');

    const scrollElement1 = document.querySelector('#scrollElement1');
    const scrollElement2 = document.querySelector('#scrollElement2');
    const scrollElement3 = document.querySelector('#scrollElement3');
    const scrollElement4 = document.querySelector('#scrollElement4');

    const arrayButtons = [button1, button2, button3, button4];
    const arrayScrollElements = [scrollElement1, scrollElement2, scrollElement3, scrollElement4];

    let onClickMButton = (button, element) => {
        button.addEventListener('touchend', (event) => {
            event.preventDefault();
            element.scrollIntoView( {
                'behavior': 'smooth',
                'block': 'center'
            });
        })
    }

    for (let index = 0; index < arrayButtons.length; index++) {
        onClickMButton(arrayButtons[index], arrayScrollElements[index]);
    }

    burger.addEventListener('touchend', (event) => {
        event.preventDefault();
        menu.classList.toggle('hide');
    })

    menu.addEventListener('touchend', (event) => {
        const button = event.target;
        if(button.classList.contains('nav__mobile-button')) {
            menu.classList.add('hide');
        }
    })


}
window.addEventListener('DOMContentLoaded', () => {
    forms();
    phoneInput();
    yandexMap();
    burgerMenu();
});