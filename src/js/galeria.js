document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;

        //el dataset le agrega un atributo al html para ser llamado desde otro lado
        //en este caso es para identificar la imagen que el usuario clickleo

        imagen.dataset.imagenId = i;

        //Añadir la funcion de mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {

    const id = parseInt(e.target.dataset.imagenId);

    const imagen = document.createElement('IMG');

    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //overlay el div compretto tambien genera el onclick

    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }



    //Boton para cerrar la imagen

    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    cerrarImagen.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }


    overlay.appendChild(cerrarImagen);

    //Para mostrar en el html

    const body = document.querySelector('body');

    body.appendChild(overlay);
    body.classList.add('fijar-body');

}