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
    let data = JSON.stringify({ id: id });
    xhr.send(data);
}
function getFormMod(id){
     document.getElementById('modified').setAttribute('data-atributte', id);
     let note = document.getElementById('note-'+id);


     let data = note.innerText.split('\n');
     let title = data[0];
     let content = data[2];
     let form = document.getElementById('modification');
     form.elements['note[title]'].value = title;
     form.elements['note[content]'].value = content;
     let colorLength = note.style.backgroundColor.length;
     let color = note.style.backgroundColor.substring(4, colorLength-1).split(', ');
     form.elements['note[color]'].value = rgbToHex(color[0], color[1], color[2]);

}

function rgbToHex(r, g, b) {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function modificateNote() {
    let id = document.getElementById('modified').getAttribute('data-atributte');
    let form = document.getElementById('modification');
    let titulo = form.elements['note[title]'].value;
    let content = form.elements['note[content]'].value;
    let color = form.elements['note[color]'].value;

    console.log(id + ' ' + titulo + ' ' + content + ' ' + color);
    let datas = {
        id: id,
        title: titulo,
        content: content,
        color: color
    };
    console.log(datas);
    let xhr = new XMLHttpRequest();
    let url = '/projecTask/public/index.php/note/modification';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                window.location.reload();
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

    let data = JSON.stringify({ data: datas });
    xhr.send(data);
}
