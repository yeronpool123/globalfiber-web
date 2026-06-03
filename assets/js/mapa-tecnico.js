(function() {
    const inicializarMapaTecnico = () => {
        const disparador = document.getElementById("cyber-map-trigger");
        const modal = document.getElementById("map-modal");
        const botonCerrar = document.getElementById("close-map-modal");
        const targetImg = document.getElementById("modal-target-img");
        
        // Botones de zoom
        const btnIn = document.getElementById("btn-zoom-in");
        const btnOut = document.getElementById("btn-zoom-out");
        const btnReset = document.getElementById("btn-zoom-reset");

        // Variables de estado del Zoom y Paneo
        let currentScale = 1;
        let isDragging = false;
        let startX, startY;
        let translateX = 0, translateY = 0;

        // Renderizador unificado en Matriz 2D para fusionar Zoom + Movimiento de forma fluida
        const actualizarTransformacion = () => {
            if (targetImg) {
                targetImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
            }
        };

        if (disparador && modal && botonCerrar) {
            
            // Abrir Modal (Resetea valores para que siempre inicie centrado al 100%)
            disparador.addEventListener("click", () => {
                currentScale = 1;
                translateX = 0;
                translateY = 0;
                actualizarTransformacion();
                modal.classList.add("is-active");
                document.body.style.overflow = "hidden";
            });

            // Cerrar desde la X
            botonCerrar.addEventListener("click", (e) => {
                e.stopPropagation();
                modal.classList.remove("is-active");
                document.body.style.overflow = "";
            });

            // Cerrar haciendo clic en el backdrop oscuro
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.classList.remove("is-active");
                    document.body.style.overflow = "";
                }
            });

            // CONTROLES DE ZOOM
            if (btnIn && btnOut && btnReset) {
                btnIn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (currentScale < 4) { // Subimos el tope a 4x para que valga la pena mover el mapa con la manito
                        currentScale += 0.3;
                        actualizarTransformacion();
                    }
                });

                btnOut.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (currentScale > 0.75) {
                        currentScale -= 0.3;
                        // Si se aleja demasiado, lo centramos automáticamente
                        if (currentScale <= 1) { translateX = 0; translateY = 0; }
                        actualizarTransformacion();
                    }
                });

                btnReset.addEventListener("click", (e) => {
                    e.stopPropagation();
                    currentScale = 1;
                    translateX = 0;
                    translateY = 0;
                    actualizarTransformacion();
                });
            }

            // --- LÓGICA DE PANEO (MANITO CON ARRASTRE) ---
            if (targetImg) {
                
                targetImg.addEventListener("mousedown", (e) => {
                    e.preventDefault(); // Evita el arrastre de imagen nativo del navegador
                    // Solo permitimos mover si la imagen tiene zoom aplicado
                    if (currentScale > 1) {
                        isDragging = true;
                        // Guardamos la posición inicial restando el movimiento previo
                        startX = e.clientX - translateX;
                        startY = e.clientY - translateY;
                    }
                });

                window.addEventListener("mousemove", (e) => {
                    if (!isDragging) return;
                    // Calculamos la nueva distancia recorrida por el ratón
                    translateX = e.clientX - startX;
                    translateY = e.clientY - startY;
                    actualizarTransformacion();
                });

                window.addEventListener("mouseup", () => {
                    isDragging = false;
                });

                // Compatibilidad táctil para Teléfonos/Tablets (Touch events)
                targetImg.addEventListener("touchstart", (e) => {
                    if (currentScale > 1) {
                        isDragging = true;
                        startX = e.touches[0].clientX - translateX;
                        startY = e.touches[0].clientY - translateY;
                    }
                }, { passive: true });

                window.addEventListener("touchmove", (e) => {
                    if (!isDragging) return;
                    translateX = e.touches[0].clientX - startX;
                    translateY = e.touches[0].clientY - startY;
                    actualizarTransformacion();
                }, { passive: true });

                window.addEventListener("touchend", () => {
                    isDragging = false;
                });
            }
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializarMapaTecnico);
    } else {
        inicializarMapaTecnico();
    }
})();