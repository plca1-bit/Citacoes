document.addEventListener("DOMContentLoaded", function() {

    // --- Efeito Typewriter (Máquina de Escrever) ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const phrases = ["Desenvolvedor Web", "Estudante de Análise de Sistemas", "Entusiasta de Tecnologia", "Futuro Dev Full-Stack"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleta caracteres
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Adiciona caracteres
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // Define o tempo de digitação
            let typingSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pausa no final da palavra
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Passa para a próxima palavra
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(type, typingSpeed);
        }
        
        type(); // Inicia o efeito
    }


    // --- Animação de Fade-in ao Rolar (Intersection Observer) ---
    // Esta é a forma moderna e eficiente de fazer animações de scroll
    
    const sectionsToFade = document.querySelectorAll('.fade-in-section');

    if (sectionsToFade.length) {
        const observerOptions = {
            root: null, // Observa em relação ao viewport
            rootMargin: '0px',
            threshold: 0.15 // 15% da seção precisa estar visível
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Para a animação não repetir
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        sectionsToFade.forEach(section => {
            observer.observe(section);
        });
    }

});