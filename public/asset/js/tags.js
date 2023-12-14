
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnEtiqueta").addEventListener("click", function(){
        createTag();
    });
});


function createTag() {

    let etiqueta = document.getElementById('etiqueta');
    console.log(etiqueta.value);
    let etiquetaValue = etiqueta.value;
    let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/note/tag';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === 'Datos recibidos correctamente') {
                    console.log("Realizado correctamente");
                }
                console.log('Respuesta del servidor:', response);
            } else {
                console.error('Error al realizar la solicitud:', xhr.status);
            }

        }
    };

    xhr.onerror = function() {
        console.error('Error de red al realizar la solicitud.');
    };
    let data = JSON.stringify({ name: etiquetaValue });
    xhr.send(data);
}