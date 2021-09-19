document.addEventListener('DOMContentLoaded', function() {
    scrollNav();
    navegacionFija();
});

//Mostar la navegacion caundo hago scroll

function navegacionFija() {
    const barra = document.querySelector('.header')
    const observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            barra.classList.remove('fijo');
        } else {
            barra.classList.add('fijo');
        }
    });

    observer.observe(document.querySelector('.sobre-festival'));
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');


    enlaces.forEach(function(enlace) {

        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            console.log(seccion);
            seccion.scrollIntoView({
                behavior: 'smooth'
            })
        });
    });
}