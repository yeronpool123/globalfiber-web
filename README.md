# GLOBALFIBER S.A.S. - Plataforma Web Corporativa B2B 🌐🛰️

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

Ecosistema digital corporativo y embudo de conversión de alta disponibilidad desarrollado para **GLOBALFIBER S.A.S.**, proveedor líder en infraestructura de telecomunicaciones *Carrier-Grade* y conectividad empresarial simétrica en el territorio ecuatoriano.

La plataforma ha sido diseñada bajo estrictos estándares de optimización UI/UX para el sector industrial, portuario, acuícola y tecnológico corporativo.

---

## 🚀 Características Clave e Ingeniería de Interacción

### 1. Módulo de Presencia Regional Dinámico 🗺️
* **Delegación de Eventos Asíncrona:** Implementación de un flujo lógico optimizado mediante JavaScript en una sola escucha global (`document.addEventListener`), mitigando el bloqueo del hilo de renderizado.
* **Layout Simétrico Computado:** Grid de CSS nativo configurado en contenedores controlados a `1140px` de ancho máximo para garantizar estabilidad visual e impedir desbordes de elementos en pantallas ultra-amplias.
* **Sedes Optimizadas:** Paneles interactivos de conmutación de datos en tiempo real para nodos estratégicos: **Guayaquil (NOC Central)**, **Machala (Soporte Acuícola)** y **Esmeraldas (Eje Portuario)**.

### 2. Matriz Tarifaria y Automatización Comercial 💰
* **UI Glassmorphism:** Componentes visuales organizados para segmentación de clientes corporativos (**Plan PYME**, **Plan Empresarial** y **Plan Corporativo**).
* **Auto-Fill Smart Script:** Rutina en JavaScript integrada que procesa el clic del usuario en cualquier tarifa de interés, ejecuta un desplazamiento suave (*smooth scroll*) al formulario de contacto e introduce por defecto el servicio exacto en el menú interactivo, reduciendo la fricción del lead.

### 3. Refactorización de Cierre e Identidad Visual (Footer) 📐
* **Cero Acoplamiento:** Eliminación masiva del CSS embebido en el código HTML, centralizando las reglas de animación, resplandores (`drop-shadow`) y gradientes tecnológicos (`#003366` a `#ff6b00`) en hojas de estilo distribuidas y desacopladas.
* **Integración API WhatsApp:** Filtros adaptativos dinámicos que alteran la propiedad visual de los accesos a redes bajo estándares de diseño líquido para dispositivos móviles.

---

## 📂 Arquitectura del Repositorio

El proyecto cuenta con una organización estructural modular preparada para el escalado e integración de microservicios:

```text
globalfiber-web/
├── assets/                  # Recursos públicos estáticos del sistema
│   ├── css/
│   │   ├── uiux.css         # Núcleo de diseño, rejillas distribuidas y animaciones
│   ├── js/
│   │   ├── form.js          # Control de eventos, validaciones y automatizaciones de UI
│   │   ├── global-ai.js     # Componentes interactivos globales
│   │   └── ui.js            # Controladores del layout adaptativo
│   └── images/              # Assets multimedia e infraestructura optimizada localmente
├── frontend/                # Vistas de producción y plantillas de diseño
│   └── index.html           # Documento de acceso y landing principal de alta conversión
└── README.md                # Documentación técnica corporativa
