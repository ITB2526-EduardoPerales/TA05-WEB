// js/interaction.js

document.addEventListener('DOMContentLoaded', () => {

    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        logoElement.style.opacity = 1;
        logoElement.style.transform = 'translateY(0)';
    }

    const mainTitleElement = document.getElementById('main-title');

    if (mainTitleElement) {

        new Typed('#main-title', {
            strings: [" ", "PORTFOLIO", "NETWORKING & SECURITY", "CYBER DEFENSE"],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            showCursor: true,
            cursorChar: '_',
            // Se eliminaron las funciones preStringTyped y onLastChar,
            // ya que el primer string de " " ayuda a mantener las dimensiones.
        });
    }

    AOS.init();

    const interactiveButtons = document.querySelectorAll('header nav a, article footer a');

    const MAX_TILT = 5;
    const MAX_LIGHT_MOVE = 15;

    interactiveButtons.forEach(button => {
        const isNavLink = button.closest('nav');
        button.classList.add(isNavLink ? 'header-nav-link' : 'article-footer-link');

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