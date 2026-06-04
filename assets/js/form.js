document.addEventListener("DOMContentLoaded", () => {

  document.body.addEventListener('submit', async function(e) {

    const form = e.target;

    if (form && form.id === 'contactForm') {

      e.preventDefault();

      const btn = form.querySelector('button');

      const originalText = btn.innerText;

      // Inputs
      const inputs = form.querySelectorAll('input, textarea');

      const name = inputs[0].value;
      const email = inputs[1].value;
      const message = inputs[2].value;

      // Estado loading
      btn.innerText = 'Enviando...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      try {

        await emailjs.send(
          'service_ikm4pu1', // <-- SERVICE ID
          'template_ztl6p69',
          {
            from_name: name,
            from_email: email,
            message: message
          },
          '9ryOSEnVHLid-LSIB' // <-- TU PUBLIC KEY
        );

        // Toast success
        if (window.showToast) {
          window.showToast(
            '¡Mensaje enviado correctamente, te contactaremos pronto!',
            'success'
          );
        }

        form.reset();

      } catch (error) {

        console.error('ERROR EMAILJS:', error);

        if (window.showToast) {
          window.showToast(
            'Error al enviar el mensaje.',
            'error'
          );
        }

      } finally {

        btn.innerText = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;

      }

    }

  });

});


// ==========================================================================
// SOLUCIÓN COMPLETA: LOGICA DE EVENTOS DELEGADOS PARA PRESENCIA REGIONAL
// ==========================================================================

document.addEventListener("click", (event) => {
    // Buscar si el elemento clicado es una tarjeta de ciudad o está dentro de ella
    const card = event.target.closest(".regional-city-card");
    
    if (card) {
        // 1. Quitar la clase activa de todas las tarjetas de la sección
        const allCards = document.querySelectorAll(".regional-city-card");
        allCards.forEach(c => c.classList.remove("active"));
        
        // 2. Activar la tarjeta actual
        card.classList.add("active");

        // 3. Obtener los datos configurados en los atributos "data-"
        const cityName = card.getAttribute("data-city");
        const localImgPath = card.getAttribute("data-img");

        // 4. Capturar los componentes de visualización
        const previewImg = document.getElementById("regional-preview-img");
        const imageLabel = document.getElementById("regional-image-label");
        const selectedCityInput = document.getElementById("selected-city-input");

        // 5. Aplicar cambios e interpolación visual con seguridad
        if (previewImg && imageLabel && selectedCityInput) {
            previewImg.style.opacity = "0.2";
            
            setTimeout(() => {
                previewImg.src = localImgPath;
                imageLabel.innerHTML = `<i class="ph ph-map-pin"></i> Vista de Infraestructura: ${cityName}`;
                previewImg.style.opacity = "1";
            }, 200);

            selectedCityInput.value = cityName;
        }
    }
});

// Manejador del envío del formulario a WhatsApp
document.addEventListener("submit", (event) => {
    if (event.target && event.target.id === "regional-whatsapp-form") {
        event.preventDefault();

        const ciudadAsignada = document.getElementById("selected-city-input").value;
        const empresa = document.getElementById("reg-empresa").value.trim();
        const ruc = document.getElementById("reg-ruc").value.trim() || "No provisto";
        const nombre = document.getElementById("reg-nombre").value.trim();
        const cargo = document.getElementById("reg-cargo").value.trim() || "No especificado";
        const servicio = document.getElementById("reg-servicio").value;
        const mensaje = document.getElementById("reg-mensaje").value.trim();

        const whatsappNumber = "593991800097"; // Teléfono destino GlobalFiber

        // Construcción del mensaje usando saltos de línea explícitos (\n) para evitar fallos de encoding
        const textMessage = 
            "⚡ *NUEVO REQUERIMIENTO CORPORATIVO* ⚡\n" +
            "-----------------------------------------\n\n" +
            `📍 *Sede Destino:* ${ciudadAsignada}\n` +
            `🏢 *Empresa:* ${empresa}\n` +
            `🆔 *RUC:* ${ruc}\n` +
            `👤 *Contacto:* ${nombre}\n` +
            `💼 *Cargo:* ${cargo}\n` +
            `🛠️ *Servicio de Interés:* ${servicio}\n\n` +
            "📝 *Detalles del Proyecto:*\n" +
            `"${mensaje}"\n` +
            "-----------------------------------------\n" +
            "📡 _Enviado desde el Selector de Presencia Regional GlobalFiber S.A.S._";

        const encodedText = encodeURIComponent(textMessage);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
    }
});



// ==========================================================================
// CONTROL INTERACTIVO DE PLANES Y AUTO-FILL PARA FORMULARIO REGIONAL
// ==========================================================================

function selectPlanAndScroll(serviceValue) {
    const targetSelect = document.getElementById("reg-servicio");
    const targetSection = document.getElementById("regional-whatsapp-form");

    if (targetSelect && targetSection) {
        // 1. Modificar el valor del dropdown select con el plan correspondiente
        targetSelect.value = serviceValue;

        // 2. Hacer scroll suave (Smooth Scroll) directo al formulario de contacto
        targetSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
        });

        // 3. Destacar visualmente el formulario por un breve momento para guiar al usuario
        targetSection.style.transition = "all 0.4s ease";
        targetSection.style.borderColor = "#ff6b00";
        targetSection.style.boxShadow = "0 0 25px rgba(255, 107, 0, 0.25)";

        setTimeout(() => {
            targetSection.style.borderColor = "rgba(0, 51, 102, 0.08)";
            targetSection.style.boxShadow = "0 15px 40px rgba(0, 51, 102, 0.06)";
        }, 1500);
    }
}


// CONTROL INTELIGENTE PARA EL MENÚ HAMBURGUESA CYBER-GLASS
document.addEventListener("click", (event) => {
    const hamburgerBtn = event.target.closest("#menu-hamburger-btn");
    const navLinksMenu = document.getElementById("nav-links-menu");

    // 1. Si hace clic en el botón de hamburguesa, abrimos o cerramos
    if (hamburgerBtn && navLinksMenu) {
        event.preventDefault();
        hamburgerBtn.classList.toggle("toggle-active");
        navLinksMenu.classList.toggle("menu-active");
        return;
    }

    // 2. Si el menú está abierto y presiona un enlace, navega y se cierra solo
    if (event.target.classList.contains("nav-link") || event.target.closest(".nav-link")) {
        const activeBtn = document.getElementById("menu-hamburger-btn");
        const activeMenu = document.getElementById("nav-links-menu");
        
        if (activeMenu && activeMenu.classList.contains("menu-active")) {
            activeBtn.classList.remove("toggle-active");
            activeMenu.classList.remove("menu-active");
        }
        return;
    }

    // 3. Si el menú está abierto y el usuario hace clic fuera de él, se cierra automáticamente
    const openMenu = document.getElementById("nav-links-menu");
    const openBtn = document.getElementById("menu-hamburger-btn");
    if (openMenu && openMenu.classList.contains("menu-active") && !event.target.closest("#nav-links-menu") && !event.target.closest("#menu-hamburger-btn")) {
        openBtn.classList.remove("toggle-active");
        openMenu.classList.remove("menu-active");
    }
});

