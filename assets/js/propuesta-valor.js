// CONTROLADOR DE INTERACTIVIDAD DE PROPUESTA DE VALOR - VERSIÓN FINAL PRODUCTION-READY
(function() {
    const ejecutarLogicaGrid = () => {
        const gridLayout = document.querySelector(".gf-features-grid-layout");
        
        if (!gridLayout) {
            return false; 
        }

        const cambiarModulo = (targetCard) => {
            if (targetCard.classList.contains("active")) return;

            // 1. Apagar tarjeta anterior
            const activeCard = document.querySelector(".gf-feature-card.active");
            if (activeCard) activeCard.classList.remove("active");
            
            // 2. Apagar imagen anterior
            const activeImg = document.querySelector(".gf-viewer-img.active");
            if (activeImg) activeImg.classList.remove("active");

            // 3. Encender tarjeta actual
            targetCard.classList.add("active");

            // 4. Encender imagen actual
            const featureKey = targetCard.getAttribute("data-feature-img");
            const targetImg = document.getElementById(`img-${featureKey}`);
            if (targetImg) {
                targetImg.classList.add("active");
            }
        };

        // Delegación de eventos para clics (Mobile / Tablets)
        gridLayout.addEventListener("click", (e) => {
            const card = e.target.closest(".gf-feature-card");
            if (card) {
                cambiarModulo(card);
            }
        });

        // Evento hover para computadoras (Desktop)
        const cards = document.querySelectorAll(".gf-feature-card");
        cards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                cambiarModulo(card);
            });
        });

        return true; 
    };

    // Intento de carga controlado en bucle por si el DOM tarda en renderizar
    const iniciarConRetardo = () => {
        if (!ejecutarLogicaGrid()) {
            const checkExist = setInterval(() => {
                if (ejecutarLogicaGrid()) {
                    clearInterval(checkExist);
                }
            }, 100);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarConRetardo);
    } else {
        iniciarConRetardo();
    }
})();