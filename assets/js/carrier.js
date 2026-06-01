/* ==========================================
   GLOBALFIBER ENTERPRISE MODULE
========================================== */

// Función principal de inicialización
function initEnterpriseCarrier() {
  
  // ==========================================
  // DATA STORE
  // ==========================================
  const modalData = {
    vpn: {
      title: "VPN Site-to-Site",
      icon: "ph-lock-key",
      description: "Interconectamos oficinas, plantas y centros operativos mediante túneles IPSec cifrados de grado militar para garantizar la privacidad de sus datos.",
      benefits: [
        "Comunicación privada integral",
        "Integración transparente con ERP",
        "Cámaras IP centralizadas",
        "Acceso remoto seguro para equipos",
        "Reducción de riesgos de ciberseguridad"
      ]
    },
    mpls: {
      title: "MPLS Corporativo",
      icon: "ph-share-network",
      description: "Red privada empresarial con priorización de tráfico y estabilidad Carrier clase operador.",
      benefits: [
        "Baja latencia para aplicaciones críticas",
        "Calidad de Servicio (QoS) garantizada",
        "Segmentación de red segura",
        "Estabilidad de conexión dedicada",
        "Escalabilidad de ancho de banda"
      ]
    },
    sdwan: {
      title: "SD-WAN",
      icon: "ph-broadcast",
      description: "Administración inteligente de enlaces para optimizar operaciones críticas y reducir costos operativos.",
      benefits: [
        "Balanceo de carga en tiempo real",
        "Failover automático sin intervención",
        "Priorización de tráfico ERP/Voz",
        "Optimización de WAN",
        "Menor tiempo de caída (MTTR)"
      ]
    },
    lte: {
      title: "Backup LTE",
      icon: "ph-cell-signal-high",
      description: "Continuidad operacional mediante respaldo automático inalámbrico ante fallos del enlace principal.",
      benefits: [
        "Alta disponibilidad 99.9%",
        "Cambio automático (milisegundos)",
        "Operación 24/7 sin interrupciones",
        "Respaldo LTE de alta velocidad",
        "Protección ante cortes físicos"
      ]
    },
    camaroneras: {
      title: "Camaroneras",
      icon: "ph-fish",
      description: "Infraestructura de conectividad robusta diseñada para las exigencias del sector acuícola y agroindustrial.",
      includes: [
        "Piscinas y laboratorios conectados",
        "Integración ERP agrícola",
        "Cámaras IP perimetrales",
        "Control biométrico",
        "Monitoreo remoto de variables"
      ],
      benefits: [
        "Continuidad productiva",
        "Seguridad operacional",
        "Supervisión en tiempo real",
        "Acceso remoto seguro"
      ]
    },
    corporativos: {
      title: "Corporativos",
      icon: "ph-buildings",
      description: "Infraestructura empresarial multisede con gestión unificada y estándares globales.",
      includes: [
        "VPN y MPLS integrados",
        "SD-WAN gestionado",
        "Monitoreo activo NOC 24/7",
        "Firewall Perimetral Administrado",
        "SLA Empresarial garantizado"
      ],
      benefits: [
        "Continuidad operativa garantizada",
        "Seguridad de información de nivel banco",
        "Alta disponibilidad de servicios",
        "Escalabilidad para crecimiento"
      ]
    }
  };

  // ==========================================
  // ELEMENTOS DOM
  // ==========================================
  const cards = document.querySelectorAll(".enterprise-card");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalContainer = document.getElementById("modal-container");
  const modalCloseBtn = document.getElementById("modal-close");
  
  // Elementos internos del modal
  const modalTitle = document.getElementById("modal-title");
  const modalIcon = document.getElementById("modal-icon");
  const modalBody = document.getElementById("modal-body");

  // Si no hay tarjetas, salimos (quizás no cargó bien)
  if (cards.length === 0) return;

  // ==========================================
  // EFECTO SPOTLIGHT
  // ==========================================
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });

    // Click para abrir modal
    card.addEventListener("click", () => {
      const solutionKey = card.getAttribute("data-solution");
      if (modalData[solutionKey]) {
        openModal(solutionKey);
      }
    });
  });

  // ==========================================
  // LÓGICA DEL MODAL
  // ==========================================

  function openModal(key) {
    const data = modalData[key];
    
    if (!data || !modalTitle || !modalIcon || !modalBody) return;

    // 1. Poblar contenido
    modalTitle.textContent = data.title;
    
    // Limpiar clases previas y añadir la nueva
    modalIcon.className = `ph ${data.icon}`; 
    // Reiniciar animación del icono del modal
    const iconBg = modalIcon.parentElement;
    iconBg.style.animation = "none";
    iconBg.offsetHeight; /* trigger reflow */
    iconBg.style.animation = "pulse-glow 3s infinite ease-in-out";

    let contentHTML = `<p>${data.description}</p>`;

    // Sección "Incluye" si existe
    if (data.includes) {
      contentHTML += `
        <div class="modal-section-title">Incluye</div>
        <ul class="modal-list">
          ${data.includes.map(item => `<li><i class="ph-fill ph-check-circle"></i> ${item}</li>`).join('')}
        </ul>
        <div class="modal-divider"></div>
      `;
    }

    // Sección "Beneficios"
    if (data.benefits) {
      contentHTML += `
        <div class="modal-section-title">Beneficios</div>
        <ul class="modal-list">
          ${data.benefits.map(item => `<li><i class="ph-fill ph-check-circle"></i> ${item}</li>`).join('')}
        </ul>
      `;
    }

    modalBody.innerHTML = contentHTML;

    // 2. Mostrar modal
    if (modalOverlay) {
      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // ==========================================
  // EVENTOS DE CIERRE
  // ==========================================

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}


// Verificamos si el evento ya ocurrió (por si el JS carga tarde)
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {

  if (document.querySelectorAll(".enterprise-card").length > 0) {

    initEnterpriseCarrier();

  } else {

    window.addEventListener(
      "componentsLoaded",
      initEnterpriseCarrier
    );

  }

} else {

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      if (
        document.querySelectorAll(".enterprise-card").length > 0
      ) {

        initEnterpriseCarrier();

      } else {

        window.addEventListener(
          "componentsLoaded",
          initEnterpriseCarrier
        );

      }

    }
  );

}


/**
 * Efecto Text Rotator Direccional - GLOBALFIBER S.A.S.
 * Anclaje izquierdo rígido mediante transiciones controladas de flujo Flexbox.
 */

function initCarrierTextRotator() {
    const wrapper = document.querySelector('.text-rotator-wrapper');
    if (!wrapper) return; 

    const words = wrapper.querySelectorAll('.word');
    if (words.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 1500; // ⚡ Velocidad del ciclo del bucle

    setInterval(() => {
        const currentWord = words[currentIndex];
        
        // 1. Desactivar palabra actual y sacarla del flujo relativo
        currentWord.classList.remove('active');
        currentWord.classList.add('exit');

        setTimeout(() => {
            currentWord.classList.remove('exit');
        }, 350); // Sincronizado milimétricamente con el CSS

        // 2. Apuntar a la siguiente palabra del bucle
        currentIndex = (currentIndex + 1) % words.length;

        // 3. Activar la nueva palabra (se vuelve relativa y empuja el texto final)
        words[currentIndex].classList.add('active');

    }, intervalTime);
}

// Inicializador adaptado al ecosistema de carga
window.addEventListener('componentsLoaded', () => {
    initCarrierTextRotator();
});

if (document.readyState !== 'loading') {
    setTimeout(initCarrierTextRotator, 300);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initCarrierTextRotator, 300);
    });
}