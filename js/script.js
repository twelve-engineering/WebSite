document.addEventListener('DOMContentLoaded', () => {
  // --- MENÚ DE NAVEGACIÓN MÓVIL ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- FORMULARIO DE CONTACTO (FORMSPREE AJAX) ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const btnSubmit = document.getElementById('btn-submit');

  if (contactForm && formStatus && btnSubmit) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault(); // Evita la redirección externa a Formspree

      // Estado inicial durante el envío
      btnSubmit.disabled = true;
      formStatus.style.display = 'block';
      formStatus.style.color = '#94a3b8'; // Gris neutro
      formStatus.textContent = 'Enviando mensaje...';

      const data = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.color = '#22c55e'; // Verde de éxito
          formStatus.textContent = '✓ ¡Gracias! Tu mensaje ha sido enviado correctamente.';
          contactForm.reset();
        } else {
          const errorData = await response.json();
          formStatus.style.color = '#ef4444'; // Rojo de error
          if (errorData.errors && errorData.errors.length > 0) {
            formStatus.textContent = errorData.errors.map(err => err.message).join(', ');
          } else {
            formStatus.textContent = 'Hubo un error al procesar tu mensaje. Inténtalo de nuevo.';
          }
        }
      } catch (error) {
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Error de conexión con el servidor. Por favor intenta más tarde.';
      } finally {
        btnSubmit.disabled = false;
      }
    });
  }
});