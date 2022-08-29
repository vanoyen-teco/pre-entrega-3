function $ (selector){
    return document.querySelector(selector);
}

function initSocket(){
    const socket = io();
    return socket;
}
async function iniciarSocket() {
    const socket = await initSocket();
    return socket;
}
  
const socket = iniciarSocket();

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json();
  }
  


(function () {
    'use strict'
    let forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }else{
                event.preventDefault();
                event.stopPropagation();
                let msg = $("#inp_msj").value;
                postData('/support/message', { msg })
                .then(data => {
                    if(data){
                        $("#formMsg").reset();
                    }
                })
            }        
        }, false)
        })
})();

async function refreshMessages (messages){
    const tpl = await fetch('./hbs/message.hbs');
    const baseMsgs = await tpl.text();
    let fillMsgs = Handlebars.compile(baseMsgs);
    $("#chatContainer").innerHTML = fillMsgs({ mensajes: messages });
    $("#formMsg").classList.remove('was-validated');
    $("#formMsg").reset();
}
let socketIo;
socket.then((socket)=>{
    socketIo = socket;
    socketIo.on('refreshMessages', refreshMessages);
});



//console.log(socket.id);