
let tagsLoaded = false;
document.addEventListener('DOMContentLoaded', function () {

    if (!tagsLoaded) {
        tagsList();
        tagsLoaded = true;
    }
    /*document.getElementById("").addEventListener("click", function(){
        createTag();
    });*/

    /*document.getElementById("modificateTag").addEventListener("click", function(){
        if (!tagsLoaded) {
            mostrarTags();
            tagsLoaded = true;
        }
    });
    document.getElementById("btnBorrarEtiqueta").addEventListener("click", function(){
        borrarTags();
    });
    /**document.getElementById("btnEtiqueta").addEventListener("click", function(){
        addTag();
    });*/
});


function createTag() {
    let tagForm = document.getElementById('tagForm');
    let tagName = tagForm.elements['tags[nombre]'].value;
    let tagContent = document.getElementById('tags_notes');
    let tagContentSelected = [];
    for (let i = 0; i < tagContent.options.length; i++){
        if (tagContent.options[i].selected) {
            tagContentSelected.push(tagContent.options[i].value);
        }
    }

    let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/tag/create';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === 'Etiqueta creada') {
                    console.log("Realizado correctamente");
                    console.log(response.select);
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
    let data = JSON.stringify({ name: tagName, select: tagContentSelected });
    xhr.send(data);
}

function tagsList(){

    let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/tag/list';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === 'Etiqueta recogida') {
                    let ul = document.getElementById('tagsDropdown');
                    ul.setAttribute('class', 'dropdown-menu');
                    let i = 0;
                    response['etiquetas'].forEach(function(name){
                        let li = document.createElement('li');
                        let a = document.createElement('a');
                        a.setAttribute('class', 'dropdown-item');
                        a.innerText = name;
                        li.appendChild(a);
                        ul.appendChild(li);
                        i++;
                    });
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

function addTag(){
    let tags = document.querySelectorAll('.form-check-input');
    let selectTags = [];
    tags.forEach( function(tag){
        if (tag.checked){
            let label = document.querySelector(`label[for="${tag.id}"]`);
            selectTags.push(label.innerText);

        }
    });

    let miModal = document.getElementById('modalAddTag');
    miModal.addEventListener('show.bs.modal', function (event) {
        let boton = event.relatedTarget; // Botón que abre el modal
        let id = boton.getAttribute('data-note-id'); // Obtener el valor del atributo data-id del botón

        // Hacer algo con la ID en el modal (por ejemplo, mostrarla en el cuerpo del modal)
        let contenidoModal = document.getElementById('etiquetaOculta');
        contenidoModal.textContent = 'ID: ' + id;
        console.log(id);
    });
    console.log(miModal);
    //console.log(nota[0].getAttribute('data-note-id'));
    //console.log(id);
    /*let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/note/tag/add';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === 'Etiqueta añadida') {

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
    xhr.send(data);*/
}