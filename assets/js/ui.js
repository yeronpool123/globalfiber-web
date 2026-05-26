document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. Canvas Background Animation (Mantiene lógica anterior) ---
  const initCanvas = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(255, 107, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(window.innerWidth / 15, 60); 
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(0, 51, 102, ${0.08 - dist/3000})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resize(); initParticles(); });
    resize();
    initParticles();
    animate();
  };

  // --- 2. PARALLAX SCROLL EFFECT (El toque especial) ---
  const initParallax = () => {
    const title = document.querySelector('.hero-parallax-fast');
    const subtitle = document.querySelector('.hero-parallax-slow');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      // Solo aplicar si estamos cerca del hero para ahorrar recursos
      if (scrollY < window.innerHeight) {
        if (title) {
          // El título se mueve más rápido (hacia arriba) creando profundidad
          title.style.transform = `translateY(${scrollY * 0.4}px)`; 
          title.style.opacity = 1 - (scrollY / 700);
        }
        if (subtitle) {
          // El subtítulo se mueve más lento
          subtitle.style.transform = `translateY(${scrollY * 0.2}px)`;
          subtitle.style.opacity = 1 - (scrollY / 500);
        }
      }
    });
  };

  // --- 3. Scroll Reveal (Intersection Observer) ---
  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observar elementos iniciales
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
  };

  // --- 4. Dynamic Navbar ---
  const initNavbar = () => {
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  };

  // --- 5. Toast System ---
  window.showToast = (message, type = 'success') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '<i class="ph ph-check-circle" style="font-size:1.5rem; color:#4ade80;"></i>' : '<i class="ph ph-warning" style="font-size:1.5rem; color:#f87171;"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  // Inicializar módulos
  initCanvas();
  initNavbar();
  initScrollAnimations();
  initParallax(); // Activa el efecto de movimiento de letras
});

// Re-escanear para contenido dinámico
window.addEventListener('componentsLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});


  // ... código anterior de ui.js ...

  // --- 6. Lógica del Modal de WhatsApp ---
  const initWaModal = () => {
    const trigger = document.getElementById('wa-trigger');
    const modal = document.getElementById('wa-modal');
    const closeBtn = document.getElementById('close-wa-modal');
    const openLinkBtn = document.getElementById('wa-open-link');

    if (!trigger || !modal) return;

    // Abrir modal
    trigger.addEventListener('click', (e) => {
      e.preventDefault(); // Evita que el enlace recargue la página
      modal.classList.add('active');
    });

    // Cerrar modal con la X
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // Cerrar modal al hacer clic fuera del contenido (en el fondo oscuro)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Opcional: Cerrar modal al dar clic en "Abrir Enlace" (para limpiar la pantalla)
    openLinkBtn.addEventListener('click', () => {
      setTimeout(() => {
        modal.classList.remove('active');
      }, 500); // Pequeño delay para que el usuario vea que hizo click
    });
  };

  // --- 6. Widget Flotante WhatsApp Premium ---
  const initWaWidget = () => {
    const widgetContainer = document.getElementById('wa-floating-widget');
    const closeBtn = document.getElementById('wa-widget-close');
    const fabBtn = document.getElementById('wa-widget-fab');
    const qrContainer = document.getElementById('wa-qr-code');

    if (!widgetContainer) return;

    // Generar QR dinámicamente
    if (qrContainer && typeof QRCode !== 'undefined') {
      try {
        // Limpiar contenedor si ya tiene QR
        qrContainer.innerHTML = '';

        new QRCode(qrContainer, {
          text: 'https://wa.me/593991800097',
          width: 180,
          height: 180,
          colorDark: '#003366',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });

        // Asegurar que la imagen del QR sea visible
        const qrImages = qrContainer.querySelectorAll('img, canvas');
        qrImages.forEach(img => {
          img.style.borderRadius = '8px';
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        });
      } catch (e) {
        console.log('QR generation:', e);
        qrContainer.innerHTML = '<p style="color: #ff6b00;">QR disponible</p>';
      }
    }

    // Auto-show después de 2 segundos (no invasivo)
    setTimeout(() => {
      widgetContainer.classList.add('show');
    }, 2000);

    // Close button
    closeBtn.addEventListener('click', () => {
      widgetContainer.classList.remove('show');
      widgetContainer.classList.add('fab-visible');
    });

    // FAB button - reabre el widget
    fabBtn.addEventListener('click', () => {
      widgetContainer.classList.add('show');
      widgetContainer.classList.remove('fab-visible');
    });
  };

  // Llamar a la función al cargar
window.addEventListener('componentsLoaded', () => {
  initWaWidget();
});





/* =========================================
   PRELOADER GLOBALFIBER
========================================= */

const initPreloader = () => {

  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar');
  const canvas = document.getElementById('preloader-canvas');

  if (!preloader || !canvas) return;

  // =====================================
  // PARTICULAS
  // =====================================

  const ctx = canvas.getContext('2d');

  let width;
  let height;

  let particles = [];

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;

      this.size = Math.random() * 3 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) {
        this.vx *= -1;
      }

      if (this.y < 0 || this.y > height) {
        this.vy *= -1;
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(0,51,102,0.45)';

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initParticles = () => {

    particles = [];

    const count = Math.min(window.innerWidth / 8, 160);

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  };

  const animate = () => {

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {

      p.update();
      p.draw();

      for (let j = index + 1; j < particles.length; j++) {

        const p2 = particles[j];

        const dx = p.x - p2.x;
        const dy = p.y - p2.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {

          ctx.strokeStyle = `rgba(0,51,102,${0.12 - dist / 1200})`;

          ctx.lineWidth = 1.2;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  };

  resize();
  initParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  // =====================================
  // BARRA DE PROGRESO
  // =====================================

  let progress = 0;

  const interval = setInterval(() => {

    progress += Math.random() * 12;

    if (progress > 100) {
      progress = 100;
    }

    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {

      clearInterval(interval);

      setTimeout(() => {
        preloader.classList.add('hide');
      }, 500);
    }

  }, 120);
};

// Inicializar
initPreloader();
