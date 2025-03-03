// Obtenemos referencias a los elementos del DOM
var galeriaEl;
var btnTemaClaro;
var btnTemaOscuro;
var btnReset;
var botones;

// Función para aplicar el tema claro
function aplicarTemaClaro() {
    // Eliminamos primero cualquier estilo directo que pueda tener la galería
    galeriaEl.removeAttribute('style');

    // Aplicamos la clase tema-claro
    galeriaEl.className = 'tema-claro';

    // Resaltamos el botón activo
    quitarResaltadoBotones();
    btnTemaClaro.classList.add('botonActivo');
}

// Función para aplicar el tema oscuro
function aplicarTemaOscuro() {
    // Eliminamos primero cualquier clase que pueda tener la galería
    galeriaEl.className = '';

    // Aplicamos los estilos directamente
    galeriaEl.style.backgroundColor = '#343a40';
    galeriaEl.style.padding = '15px';
    galeriaEl.style.border = '2px solid #dc3545';
    galeriaEl.style.borderRadius = '15px';
    galeriaEl.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
    galeriaEl.style.color = '#f8f9fa';

    // Mantenemos los estilos de flexbox que ya tenía la galería
    galeriaEl.style.display = 'flex';
    galeriaEl.style.flexWrap = 'wrap';
    galeriaEl.style.justifyContent = 'space-around';
    galeriaEl.style.gap = '20px';

    // Resaltamos el botón activo
    quitarResaltadoBotones();
    btnTemaOscuro.classList.add('botonActivo');
}

// Función para restablecer los estilos originales
function restablecerEstilos() {
    // Eliminamos cualquier clase o estilo directo
    galeriaEl.className = '';
    galeriaEl.removeAttribute('style');

    // Quitamos el resaltado de todos los botones
    quitarResaltadoBotones();
    btnReset.classList.add('botonActivo');

    // Agregamos un pequeño timeout para quitar el resaltado del botón de reset después de 500ms
    setTimeout(() => {
        btnReset.classList.remove('botonActivo');
    }, 500);
}

// Función para quitar el resaltado de todos los botones
function quitarResaltadoBotones() {
    botones.forEach(boton => {
        boton.classList.remove('botonActivo');
    });
}

// Función para inicializar referencias
function inicializaReferencias() {
    galeriaEl = document.getElementById('galeria');
    btnTemaClaro = document.getElementById('tema-claro');
    btnTemaOscuro = document.getElementById('tema-oscuro');
    btnReset = document.getElementById('reset-estilos');
    botones = document.querySelectorAll('button');

    // Eventos para los botones
    btnTemaClaro.addEventListener('click', aplicarTemaClaro);
    btnTemaOscuro.addEventListener('click', aplicarTemaOscuro);
    btnReset.addEventListener('click', restablecerEstilos);

    // Eventos para el hover de los botones
    botones.forEach(boton => {
        // Al pasar el ratón por encima
        boton.addEventListener('mouseenter', function() {
            // Solo añadimos la clase si el botón no es el actualmente activo
            if (!this.classList.contains('botonActivo')) {
                this.classList.add('botonActivo');

                // Guardamos el estado original para saber si debemos quitar la clase al salir
                this.dataset.temporal = 'true';
            }
        });

        // Al quitar el ratón
        boton.addEventListener('mouseleave', function() {
            // Solo quitamos la clase si fue añadida temporalmente por el hover
            if (this.dataset.temporal === 'true') {
                this.classList.remove('botonActivo');
                this.dataset.temporal = 'false';
            }
        });
    });
}

// Inicializamos la galería con el tema predeterminado
window.onload = function() {
    inicializaReferencias();
    restablecerEstilos();
};
