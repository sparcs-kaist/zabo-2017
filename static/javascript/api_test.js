const $document = $('document');

$document.ready(() => {
    const sendReqBtn = document.getElementById('send_req_btn');
    const reqUrlInput = document.getElementById('req_url_input');
    const reqMethodInput = document.getElementById('req_method_input');
    const reqBodyInput = document.getElementById('req_body_input');
    const resStatusElem = document.getElementById('res_status');
    const resBodyElem = document.getElementById('res_body');

    sendReqBtn.addEventListener('click', (e) => {
        const url = reqUrlInput.value;
        const method = reqMethodInput.value;
        const body = reqBodyInput.value;
        const data = JSON.stringify(body === '' ? '{}' : body);

        // reqUrlInput.value = '';
        // reqMethodInput.value = '';
        // reqBodyInput.value = '';

        const request = axios({
            method: method,
            url: url,
            data: data,
        }).then((res) => {
            resStatusElem.innerHTML = res.status;
            resBodyElem.innerHTML = JSON.stringify(res.data, null, 2);
        }).catch((err) => {
            if (err.response) {
                resStatusElem.innerHTML = err.response.status;
                resBodyElem.innerHTML = JSON.stringify(err.response.data, null, 2);
            } else {
                resStatusElem.innerHTML = 'Undefined';
            }
        });
    }, false);
});