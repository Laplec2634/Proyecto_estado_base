// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ==== SISTEMA DE FILTROS ====
    const filterButtons = document.querySelectorAll('.menu-filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            // Obtener el filtro seleccionado
            const filterValue = this.getAttribute('data-filter');

            // Filtrar las tarjetas
            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'todos') {
                    // Mostrar todas las tarjetas
                    card.classList.remove('hidden');
                    // Animar entrada
                    card.style.animation = 'fadeIn 0.5s ease';
                } else if (category === filterValue) {
                    // Mostrar solo las tarjetas que coinciden
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    // Ocultar las tarjetas que no coinciden
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==== SISTEMA DE FLIP DE TARJETAS ====
    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardInner = this.querySelector('.card-inner');
            cardInner.classList.toggle('flipped');
        });
    });

    // ==== ANIMACIÓN DE ENTRADA ====
    // Agregar la animación CSS si no existe
    if (!document.querySelector('#fadeInAnimation')) {
        const style = document.createElement('style');
        style.id = 'fadeInAnimation';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==== SCROLL SUAVE PARA ENLACES INTERNOS ====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==== LAZY LOADING PARA IMÁGENES ====
    const images = document.querySelectorAll('.card-front img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Si la imagen tiene data-src, cargala
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));

    // ==== PREVENIR FLIP ACCIDENTAL EN MÓVILES ====
    let touchStartTime;
    menuCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            touchStartTime = Date.now();
        });

        card.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            // Solo hacer flip si el toque fue rápido (no un scroll)
            if (touchDuration < 200) {
                const cardInner = this.querySelector('.card-inner');
                cardInner.classList.toggle('flipped');
            }
            e.preventDefault();
        });
    });

    // ==== CONTADOR DE PLATOS VISIBLE ====
    function updateVisibleCount() {
        const visibleCards = document.querySelectorAll('.menu-card:not(.hidden)');
        console.log(`Mostrando ${visibleCards.length} platos`);
    }

    // Actualizar contador cuando cambie el filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(updateVisibleCount, 100);
        });
    });

    // Contar al cargar
    updateVisibleCount();
});