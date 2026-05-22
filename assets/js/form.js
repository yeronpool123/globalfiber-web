document.addEventListener("DOMContentLoaded", () => {
  // Usamos delegación de eventos por si el formulario se carga dinámicamente
  document.body.addEventListener('submit', function(e) {
    const form = e.target;
    if (form && form.id === 'contactForm') {
      e.preventDefault();
      
      const btn = form.querySelector('button');
      const originalText = btn.innerText;
      
      // Simular estado de carga
      btn.innerText = 'Enviando...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      // Simular petición al servidor (2 segundos)
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
        
        // Llamada a la función global definida en ui.js
        if (window.showToast) {
          window.showToast('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
        }
        
        form.reset();
      }, 2000);
    }
  });
});