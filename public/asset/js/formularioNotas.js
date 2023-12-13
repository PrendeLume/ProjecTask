function Aparicionformulario() {
    let button = document.getElementById('form01');
    button.style.display = 'none'
    let formulario = document.getElementById('formulario');
    formulario.style.display = 'block';
}

function redirect(id){
    document.getElementById('nota'+id).onclick = function() {
        // Redirigir a una nueva ruta en Symfony
        var ruta = this.getAttribute('data-rute');
        if (ruta) {
            window.location.href = ruta;
        }
    };
}