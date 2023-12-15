
let tagsLoaded = false;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnEtiqueta").addEventListener("click", function(){
        createTag();
    });

    document.getElementById("modificateTag").addEventListener("click", function(){
        if (!tagsLoaded) {
            mostrarTags();
            tagsLoaded = true;
        }
    });
    document.getElementById("btnBorrarEtiqueta").addEventListener("click", function(){
        borrarTags();
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
                if (response.message === 'Etiqueta creada') {
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

function mostrarTags(){

    let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/note/tag/list';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === 'Etiqueta recogida') {
                    let listContainer = document.getElementById('newTag');

                    let ul = document.createElement('ul');
                    ul.setAttribute('class', 'list-group');
                    let i = 0;
                    response['etiquetas'].forEach(function(name){
                        let li = document.createElement('li');
                        li.setAttribute('class', 'list-group-item');
                        let input = document.createElement('input');
                        input.setAttribute('class', 'form-check-input me-1');
                        input.setAttribute('type', 'checkbox');
                        input.setAttribute('id', 'numero'+i);
                        li.appendChild(input);
                        let label = document.createElement('label');
                        label.setAttribute('class', 'form-check-label');
                        label.setAttribute('for', 'numero'+i);
                        label.innerText = name;
                        li.appendChild(label);
                        ul.appendChild(li);
                        i++;
                    });

                    listContainer.appendChild(ul);
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

    xhr.send();
}

function borrarTags(){
    let tags = document.querySelectorAll('.form-check-input');
    let selectTags = [];
    tags.forEach( function(tag){
        if (tag.checked){
            let label = document.querySelector(`label[for="${tag.id}"]`);
            selectTags.push(label.innerText);

        }
    });
    //console.log(selectTags);

    let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/note/tag/delete';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === 'Etiqueta eliminada correctamente') {

                    console.log("Dentro del response");
                }
                console.log('Respuesta servidor ' + response['probando']);
                console.log('Respuesta del servidor:', response);
            } else {
                console.error('Error al realizar la solicitud:', xhr.status);
            }

        }
    };

    xhr.onerror = function() {
        console.error('Error de red al realizar la solicitud.');
    };

    let data = JSON.stringify({ data: selectTags });
    xhr.send(data);
}