function loadComponent(id, file) {
  return fetch(`frontend/components/${file}`)
    .then(res => {
      if (!res.ok) throw new Error(`Error loading ${file}`);
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar todos los componentes en paralelo para mayor velocidad
    await Promise.all([
      loadComponent("header", "header.html"),
      loadComponent("hero", "hero.html"),
      loadComponent("services", "services.html"),
      loadComponent("benefits", "benefits.html"),
      loadComponent("contact", "contact.html"),
      loadComponent("footer", "footer.html")
    ]);

    // Notificar a UI.js que el contenido está listo
    window.dispatchEvent(new Event('componentsLoaded'));
    
  } catch (err) {
    console.error("Error crítico cargando componentes:", err);
    document.body.innerHTML = "<h1 style='color:white; text-align:center; padding-top:50px;'>Error al cargar el sitio. Por favor recarga.</h1>";
  }
});

