function forms() {
       ////////////////////forms/////////////////////////////////////////


       const forms = document.querySelectorAll('form');

       const message = {
           loading: 'отправка...',
           succes: 'успешно отправленно!',
           fail: 'ошибка!'
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
               statusMessage.textContent = message.loading;
               form.append(statusMessage);
   
               // const object = {};
               // formData.forEach((value, key) => {
               //     object[key] = value;
               // });
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));

               postData('./api/main.php', json)
                   .then(res => {
                       console.log(res);
                       statusMessage.textContent = message.succes;
                   }).catch(() => {
                       alert('Извините, не удалось отправить заявку');
                   }).finally(() => {
                       form.reset();
                   })
   
   
   
           });
       }
   
}

export default forms;