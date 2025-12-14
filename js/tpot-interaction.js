// js/tpot-interaction.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EFECTO DE MÁQUINA DE ESCRIBIR (TYPING EFFECT) ---

    const h1Element = document.querySelector('.capcalera-principal h1');
    // Palabras a rotar: Portfolio y el significado de T-Pot
    const words = ["Portfolio", "Threat-Pot"];
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

        let typingSpeed = 150;

        if (isDeleting) {
            typingSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Terminó de escribir, espera un momento y empieza a borrar
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Terminó de borrar, pasa a la siguiente palabra
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (h1Element) {
        typeEffect();
    }


    // --- 2. APLICACIÓN DEL EFECTO DE INTERACCIÓN (INCLINACIÓN 3D) ---

    // Seleccionar todos los enlaces interactivos
    const interactiveButtons = document.querySelectorAll('.menu-navegacio a, .detall-projecte footer a');

    const MAX_TILT = 5;
    const MAX_LIGHT_MOVE = 15;

    interactiveButtons.forEach(button => {
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

            const tiltX = -normY * MAX_TILT;
            const tiltY = normX * MAX_TILT;

            const lightX = (x / rect.width) * MAX_LIGHT_MOVE * 2 - MAX_LIGHT_MOVE;
            const lightY = (y / rect.height) * MAX_LIGHT_MOVE * 2 - MAX_LIGHT_MOVE;

            button.style.transition = 'none';
            button.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;

            button.style.boxShadow = `
                0 5px 15px rgba(0, 0, 0, 0.4), 
                ${lightX}px ${lightY}px 20px rgba(0, 255, 231, 0.8), 
                inset ${-lightX/2}px ${-lightY/2}px 10px rgba(255, 255, 255, 0.2) 
            `;
        };

        const handleMouseLeave = () => {
            button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
            button.style.transform = 'none';
            button.style.boxShadow = originalShadow;
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
    });
});