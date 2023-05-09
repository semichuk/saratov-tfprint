export default function forms() {
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

            postData('http://saratov-tfprint.ru/api/main.php', json)
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

