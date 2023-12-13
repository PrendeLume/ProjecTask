function Aparicionformulario() {
    let button = document.getElementById('form01');
    button.style.display = 'none'
    let formulario = document.getElementById('formulario');
    formulario.style.display = 'block';
}

function deleteNote(id) {
    let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/note/delete';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
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
    let data = JSON.stringify({ id: id });
    xhr.send(data);
}