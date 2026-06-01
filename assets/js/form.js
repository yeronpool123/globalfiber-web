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

        const textMessage = 
`⚡ *NUEVO REQUERIMIENTO CORPORATIVO* ⚡
-----------------------------------------
📍 *Sede Destino:* ${ciudadAsignada}
🏢 *Empresa:* ${empresa}
🆔 *RUC:* ${ruc}
👤 *Contacto:* ${nombre}
💼 *Cargo:* ${cargo}
🛠️ *Servicio de Interés:* ${servicio}

📝 *Detalles del Proyecto:*
"${mensaje}"
-----------------------------------------
📡 _Enviado desde la Página Web GlobalFiber S.A.S._`;

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