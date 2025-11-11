document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================================
    // 1. GESTIÓN DE TEMAS Y ESTILOS DE GALERÍA
    // ==========================================================================

    const galeriaContent = document.getElementById('galeria-content');
    const temaClaroBtn = document.getElementById('tema-claro');
    const temaOscuroBtn = document.getElementById('tema-oscuro');
    const resetEstilosBtn = document.getElementById('reset-estilos');
    const botonesTema = [temaClaroBtn, temaOscuroBtn, resetEstilosBtn];

    /**
     * Aplica la clase 'botonActivo' al botón seleccionado y la remueve de los demás.
     * @param {HTMLElement} activeBtn - El botón que se debe activar.
     */
    function setBotonActivo(activeBtn) {
        botonesTema.forEach(btn => {
            btn.classList.remove('botonActivo');
        });
        if (activeBtn) {
            activeBtn.classList.add('botonActivo');
        }
    }

    // --- Lógica de Botones de Tema ---
    temaClaroBtn.addEventListener('click', function() {
        galeriaContent.classList.add('tema-claro');
        galeriaContent.classList.remove('tema-oscuro');
        setBotonActivo(this);
    });

    temaOscuroBtn.addEventListener('click', function() {
        galeriaContent.classList.remove('tema-claro');
        galeriaContent.classList.add('tema-oscuro');
        setBotonActivo(this);
    });

    resetEstilosBtn.addEventListener('click', function() {
        galeriaContent.classList.remove('tema-claro', 'tema-oscuro');
        setBotonActivo(this);
    });

    // Establecer el botón de "Restablecer" como activo al cargar
    setBotonActivo(resetEstilosBtn);


    // ==========================================================================
    // 2. FUNCIONALIDAD DEL BOTÓN VOLVER ARRIBA
    // ==========================================================================

    const backToTop = document.getElementById('back2Top');

    // Muestra u oculta el botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTop.style.display = 'flex'; // Usar flex para centrar el icono verticalmente
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Acción de scroll suave al hacer clic en el botón
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ==========================================================================
    // 3. SCROLLSPY Y ENLACES DE NAVEGACIÓN (INTEGRACIÓN CON BOOTSTRAP)
    // ==========================================================================

    // Este script complementa el scrollspy de Bootstrap, si lo estás usando.
    // Asegura un desplazamiento suave y resalta el enlace activo.
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50 // Ajusta el offset por la navbar
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Cierra el menú desplegable de Bootstrap después de hacer clic en un enlace
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
});

// Función para easing (necesaria para 'easeInOutExpo' si no usas un plugin)
// Si ya tienes jQuery UI o un plugin de easing, puedes omitir esto.
(function($) {
    $.extend($.easing, {
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    });
})(jQuery);