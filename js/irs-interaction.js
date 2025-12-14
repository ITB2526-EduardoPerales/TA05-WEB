// js/irs-interaction.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EFECTO DE MÁQUINA DE ESCRIBIR (TYPING EFFECT) ---

    const h1Element = document.querySelector('.capcalera-principal h1');
    const words = ["Portfolio", "Incident Reporting System"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Borrar
            h1Element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Escribir
            h1Element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = 150; // Velocidad de escritura base

        if (isDeleting) {
            typingSpeed /= 2; // Borrar más rápido
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Terminó de escribir, espera un momento y empieza a borrar
            typingSpeed = 2000; // Pausa larga
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Terminó de borrar, pasa a la siguiente palabra
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pausa corta antes de empezar a escribir la siguiente
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Iniciar el efecto solo si el elemento existe
    if (h1Element) {
        typeEffect();
    }


    // --- 2. APLICACIÓN DEL EFECTO DE INTERACCIÓN (INCLINACIÓN 3D) ---

    // Seleccionar todos los enlaces que deben tener interactividad
    const interactiveButtons = document.querySelectorAll('.menu-navegacio a, .detall-projecte footer a');

    const MAX_TILT = 5;
    const MAX_LIGHT_MOVE = 15;

    interactiveButtons.forEach(button => {
        // La sombra se basa en el estilo definido para el índice o el pie de artículo
        const isNavLink = button.closest('.menu-navegacio');
        const originalShadow = isNavLink
            ? '0 4px 10px rgba(0, 255, 231, 0.4)'
            : '0 2px 5px rgba(0, 255, 231, 0.3)';

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const normX = (x - centerX) / centerX;
            const normY = (y - centerY) / centerY;

            // Calcular inclinación (Tilt)
            const tiltX = -normY * MAX_TILT;
            const tiltY = normX * MAX_TILT;

            // Calcular movimiento de luz (Light Move)
            const lightX = (x / rect.width) * MAX_LIGHT_MOVE * 2 - MAX_LIGHT_MOVE;
            const lightY = (y / rect.height) * MAX_LIGHT_MOVE * 2 - MAX_LIGHT_MOVE;

            // Aplicar transformaciones sin transición para respuesta inmediata
            button.style.transition = 'none';
            button.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;

            // Aplicar sombra de neón y relieve
            button.style.boxShadow = `
                0 5px 15px rgba(0, 0, 0, 0.4), 
                ${lightX}px ${lightY}px 20px rgba(0, 255, 231, 0.8), 
                inset ${-lightX/2}px ${-lightY/2}px 10px rgba(255, 255, 255, 0.2) 
            `;
        };

        const handleMouseLeave = () => {
            // Restaurar transiciones y estado original
            button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
            button.style.transform = 'none';
            // Restaurar la sombra original
            button.style.boxShadow = originalShadow;
        };

        // Asignar listeners
        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
    });
});