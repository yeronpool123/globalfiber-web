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
          '9ryOSEnVHLid-LSIB',
          'template_ztl6p69',
          {
            from_name: name,
            from_email: email,
            message: message
          }
        );

        // Toast success
        if (window.showToast) {
          window.showToast(
            '¡Mensaje enviado correctamente!',
            'success'
          );
        }

        form.reset();

      } catch (error) {

        console.error(error);

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