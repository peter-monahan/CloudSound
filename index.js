
function submitRequest() {
  const button = document.querySelector('#submit-button');
  const methodSelect = document.querySelector('#method-select');
  const urlInput = document.querySelector('#url-input');
  const headerTextarea = document.querySelector('#headers-textarea');
  const bodyTextarea = document.querySelector('#body-textarea');
  const responseTextarea = document.querySelector('#response-textarea');
  button.addEventListener('click', async e => {
    const method = methodSelect.value;
    const url = urlInput.value;
    const headers = JSON.parse(headerTextarea.value);
    const body = bodyTextarea.value;
    fetch(url, {
      method: method,
      headers: headers,
      body: method !== 'GET' ? body : undefined,
    }).then(res => res.json()).then(data => responseTextarea.value = JSON.stringify(data, null, 4));

  console.log(methodSelect.value)
  console.log(urlInput.value)
  console.log(headerTextarea.value)
  console.log(bodyTextarea.value)
});


}

window.addEventListener('DOMContentLoaded', e => {
  submitRequest();
});
