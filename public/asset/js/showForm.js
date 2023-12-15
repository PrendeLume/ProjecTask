function Aparicionformulario(form) {
    if(form === 'note'){
        let tagForm = document.getElementById('tagForm');
        tagForm.style.display = 'none';
        let noteForm = document.getElementById('noteForm');
        noteForm.style.display = 'block';
    }
    if (form === 'tag'){
        let tagForm = document.getElementById('tagForm');
        tagForm.style.display = 'block';
        let noteForm = document.getElementById('noteForm');
        noteForm.style.display = 'none';
    }
}