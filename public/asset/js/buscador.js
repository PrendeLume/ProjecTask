
function buscador(element) {
    let content = document.getElementById('listar-notas');
    console.log(content);
    let filterNotes = [];
    fetch('/projecTask/public/index.php/note/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las notas');
            }
            return response.json();
        })
        .then(data => {
            // Manejar los datos de las notas obtenidas
            console.log(data.data);
            let misNotas = data.data;

            let notas_filtradas = misNotas.filter(function (nota){
                 return nota.title.indexOf((element.value).toLowerCase()) !== -1;

            });
            filterNotes = notas_filtradas;
            content.innerHTML = print(filterNotes);
            console.log('filternotes: ' + notas_filtradas);
            console.log(print(filterNotes));
        })
        .catch(error => {
            console.error(error);
        });


}
function print(notes){
    data = '';

    console.log('dentro de print ' +notes);
    notes.forEach(function(nota) {
        console.log("nota dentro de print " +nota.id);
            data += "<div class=\"col my-2\">\n" +
            "                <div id=\"note-" + nota.id + "\" class=\"card my-2 h-100 color-texto nota\" data-rute=\"{{ path('app_note_modification') }}\" style=\"width: 18rem; background-color: " + nota.color + "; color: {{ note.getTextColor }}\">\n" +
            "                    <div class=\"card-header d-flex justify-content-between\">\n" +
            "                        " + nota.title + "\n" +
            "                        <div class=\"d-flex justify-content-around\">\n" +
            "                            <a href=\"\" class=\"btn\" id=\"modificate" + nota.id + "\" data-bs-toggle=\"modal\" data-bs-target=\"#modalAddTag\" data-note-id=\"" + nota.id + "\"><i class=\"fa-solid fa-tag\" style=\"color: {{ note.getTextColor }}\"></i></a>\n" +
            "                            <a href=\"\" class=\"btn\" data-bs-toggle=\"modal\" data-bs-target=\"#modal-modificate\" onclick=\"getFormMod(" + nota.id + ")\"><i class=\"fa-solid fa-pencil\" style=\"color: {{ note.getTextColor }}\"></i></a>\n" +
            "                            <a href=\"\" class=\"btn\" id=\"delete" + nota.id + "\" onclick=\"deleteNote(" + nota.id + ")\"><i class=\"fa-solid fa-x\" style=\"color: {{ note.getTextColor }}\"></i></a>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                    <div class=\"card-body\">\n" +
            "                        <p class=\"card-text align-top\">" + nota.content + "</p>\n" +
            "                        <small class=\"align-bottom\">Última modificación {{ " + nota.modification + " | date('Y-m-d H:i:s') }}</small>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>"
    });
    console.log(data);
    return data;
}