/**
 * assets/js/global-ai.js
 * Asistente Virtual Autónomo, Autoinyectable y de Inferencia Semántica - GLOBAL AI
 * Versión Ultra-Inteligente: Motor de Coincidencia de Densidad de Tokens y Fusión de Contextos
 * Diseñado para: GLOBALFIBER S.A.S. (Ecuador)
 */

(function () {
    // Respuestas dinámicas de saludo
    const RESPUESTAS_SALUDO = [
        "<p>Saludos cordiales. Bienvenido al Centro de Asistencia Virtual de <strong>GLOBALFIBER S.A.S.</strong></p><p>Soy <strong>GLOBAL AI</strong>, su asesor de infraestructura Carrier Grade. ¿En qué vertical de conectividad o ingeniería de red requiere soporte el día de hoy?</p>",
        "<p>Hola. Es un placer asistirle en la plataforma oficial de <strong>GLOBALFIBER S.A.S.</strong></p><p>Soy <strong>GLOBAL AI</strong>, optimizado para brindarle información técnica instantánea sobre redes dedicadas y telecomunicaciones empresariales. ¿Qué solución técnica está buscando?</p>"
    ];

    // Base de conocimiento estructurada quirúrgicamente con datos de los portafolios corporativos de GLOBALFIBER
    const GLOBAL_KNOWLEDGE = {
        bienvenida: {
            respuesta: "<p>Saludos. Bienvenido al Centro de Inteligencia y Asistencia Virtual de <strong>GLOBALFIBER S.A.S.</strong></p><p>Soy <strong>GLOBAL AI</strong>, su asistente Carrier Grade. Estoy programado para proveer especificaciones técnicas e información de ingeniería sobre nuestra infraestructura y soluciones de conectividad. ¿En qué vertical de telecomunicaciones requiere asistencia?</p>",
            sugerencias: ["Servicios", "Planes", "Camaroneras", "Cobertura", "Contacto"]
        },
        saludos_automatizados: {
            palabrasClave: ["hola", "hola!", "que tal", "buenas", "buenos dias", "buenas tardes", "buenas noches", "saludos", "holas", "q tal", "buen dia", "asistente", "ayuda", "hello", "hi"],
            sugerencias: ["Servicios", "Planes", "Camaroneras", "Contacto"]
        },
        quien_eres: {
            palabrasClave: ["quien eres", "quien eres tu", "que eres", "tu nombre", "como te llamas", "quien habla", "identidad", "presentate", "eres una ia", "eres un bot", "definicion"],
            respuesta: "<p>Soy <strong>GLOBAL AI</strong>, el asistente virtual autónomo e inteligente de <strong>GLOBALFIBER S.A.S.</strong></p><p>Mi sistema está diseñado bajo estándares Carrier-Grade para interactuar con clientes corporativos, analizando requerimientos de conectividad, redes privadas unificadas, infraestructuras en zonas extremas (como camaroneras) y especificaciones de soporte NOC 24/7. No soy un operador humano, pero tengo acceso directo a toda la documentación de ingeniería y portafolios de la empresa para guiarle inmediatamente.</p>",
            sugerencias: ["¿Quiénes Somos?", "Servicios", "Planes"]
        },
        quienes_somos: {
            palabrasClave: ["quienes somos", "la empresa", "globalfiber", "trayectoria", "historia", "corporativo", "mision", "vision", "valores", "ecuador", "operador"],
            respuesta: "<p><strong>GLOBALFIBER S.A.S.</strong> es un Operador de Telecomunicaciones e Infraestructura de nivel Carrier, líder en la provisión de Conectividad de Alta Disponibilidad y Soluciones de Red complejas para el sector corporativo, industrial, logístico y camaronero en el Ecuador.</p><p>Operamos con nuestra propia red de Fibra Óptica Dedicada, Monitoreo NOC activo 24/7/365, acuerdos de nivel de servicio altamente exigentes (SLA del 99.9%) y arquitecturas avanzadas de ciberseguridad perimetral para garantizar la continuidad operacional.</p>",
            sugerencias: ["Servicios", "Infraestructura", "NOC 24/7"]
        },
        servicios: {
            palabrasClave: ["servicios", "portafolio", "soluciones", "que ofrecen", "productos", "catalogos", "ofrece", "asistencia", "unificadas", "redes privadas"],
            respuesta: "<p>Nuestro portafolio de Soluciones Tecnológicas comprende:</p><ul><li><strong>Internet Dedicado (BIA & DIA):</strong> Ancho de banda 100% simétrico sobre red MPLS/IP con fibra óptica dedicada y canales limpios BGP.</li><li><strong>Redes Privadas Corporativas:</strong> VPN Sitio a Sitio (Site-to-Site) y VPN Corporativa MPLS para interconectar sedes con priorización de tráfico (QoS).</li><li><strong>SD-WAN Empresarial:</strong> Orquestación inteligente y Failover automático multi-proveedor.</li><li><strong>Backup LTE:</strong> Conmutación automática ante fallos de enlaces físicos.</li><li><strong>Soluciones para Camaroneras:</strong> Enlaces de largo alcance, Microondas Gigabit y torres autosoportadas para zonas críticas de alta salinidad.</li></ul>",
            sugerencias: ["VPN", "SD-WAN", "Internet Dedicado", "Planes"]
        },
        vpn: {
            palabrasClave: ["vpn", "site-to-site", "interconexion", "red segura", "sucursales", "encriptacion", "cifrado", "sitio a sitio", "tunes", "ipsec", "ssl", "aislamiento", "erp"],
            respuesta: "<p>Nuestras arquitecturas de <strong>VPN Sitio a Sitio (Site-to-Site)</strong> permiten unificar de manera privada múltiples ubicaciones geográficas (plantas, oficinas, centros operativos). Realizamos túneles cifrados robustos IPsec/SSL para integración de sistemas ERP, cámaras IP centralizadas y reducción de riesgos cibernéticos.</p>",
            sugerencias: ["MPLS", "SD-WAN", "Hardware"]
        },
        mpls: {
            palabrasClave: ["mpls", "corporativo", "ruteo", "etiquetas", "red privada", "qos", "cos", "backbone", "enrutamiento"],
            respuesta: "<p>El servicio de <strong>VPN Corporativa MPLS</strong> proporciona un transporte de datos perimetral basado en conmutación de etiquetas multiprotocolo. Está optimizado con políticas exigentes de Calidad de Servicio (QoS/CoS), latencias ultra bajas y aislamiento total de la red pública, ideal para corporativos con alta demanda de estabilidad.</p>",
            sugerencias: ["VPN", "Infraestructura"]
        },
        sd_wan: {
            palabrasClave: ["sd-wan", "sdwan", "orquestacion", "red inteligente", "enlaces", "administracion", "failover", "jitter", "telemetria"],
            respuesta: "<p>Nuestra solución <strong>SD-WAN Empresarial</strong> utiliza tecnología avanzada para la administración inteligente de enlaces. Realiza un balanceo dinámico y Failover automático basándose en telemetría en tiempo real (pérdida de paquetes, jitter, latencia), priorizando aplicaciones de misión crítica como VoIP o ERP.</p>",
            sugerencias: ["Backup LTE", "Hardware"]
        },
        backup_lte: {
            palabrasClave: ["backup lte", "lte", "conmutacion", "failover", "redundancia celula", "redundancia", "4g", "5g", "inalambrica", "corte", "atenuacion"],
            respuesta: "<p>El sistema de <strong>Backup LTE Corporativo</strong> actúa como una capa de redundancia inalámbrica de grado comercial. Ante cualquier contingencia o corte físico en el anillo de fibra óptica principal, el router conmuta el tráfico crítico de forma transparente hacia redes móviles 4G/5G LTE, impidiendo cortes comerciales.</p>",
            sugerencias: ["SD-WAN", "NOC 24/7"]
        },
        camaroneras: {
            palabrasClave: ["camaroneras", "camaronera", "acuicultura", "zonas remotas", "enlaces maritimos", "largo alcance", "salinidad", "microondas", "gigabit", "torres", "autosoportadas", "monitoreo", "videovigilancia", "iot"],
            respuesta: "<p>Disponemos de ingeniería especializada para <strong>Soluciones de Conectividad en Camaroneras</strong>, industrias estratégicas y zonas geográficas aisladas de alta salinidad.</p><p>En zonas remotas donde el mercado convencional no tiene cobertura, implementamos sistemas híbridos de Microondas Gigabit de largo alcance, Torres Auto-soportadas y Fibra Óptica, integrando plataformas de videovigilancia perimetral inteligente y telemetría IoT.</p>",
            sugerencias: ["Infraestructura", "Cobertura", "Planes"]
        },
        infraestructura: {
            palabrasClave: ["infraestructura", "carrier", "red", "nodos", "torres", "anillo", "fibra oscura", "ftth", "vsat", "towering", "co-ubicacion", "salidas internacionales", "submarino"],
            respuesta: "<p>La <strong>Infraestructura Carrier</strong> de GLOBALFIBER S.A.S. cuenta con más de 100,000 km de fibra óptica desplegada en LATAM a través de socios y anillos propios redundantes. Disponemos de nodos core con energía ininterrumpida de alta autonomía, climatización de precisión y enrutadores de alta densidad para servicios de Capacidad (L2/L3), Co-ubicación, Fibra Oscura, FTTH, VSAT y Towering.</p>",
            sugerencias: ["Salidas Internacionales", "Hardware", "NOC 24/7"]
        },
        salidas_internacionales: {
            palabrasClave: ["salidas internacionales", "submarino", "cable submarino", "tier-one", "intercambio de trafico", "ufinet", "nedetel", "cogent", "telia", "tellus", "claro", "pccw", "otecel", "liberty", "cirion", "telefonica", "telxius"],
            respuesta: "<p>GLOBALFIBER cuenta con interconexiones terrestres y submarinas hacia los principales puntos de intercambio de tráfico global y proveedores Tier-One. En Ecuador, la red dispone de <strong>7 Salidas Internacionales redundantes</strong> a través de cables de primer nivel como <em>Cogent, Telia, Tellus, Mistral-Claro, PCCW, SAM-Telefónica (GYE/UIO/MNT), SAM-Telxius, Terrestre-Cirion</em> y redundancia vía <em>Liberty y Ufinet-Nedetel</em>.</p>",
            sugerencias: ["Infraestructura", "Hardware", "BGP"]
        },
        hardware: {
            palabrasClave: ["mikrotik", "ccr", "fortinet", "bgp", "enrutador", "firewall", "equipos", "hardware", "fortigate", "ips", "ngfw", "seguridad perimetral"],
            respuesta: "<p>Para garantizar nuestra robustez perimetral, desplegamos hardware de infraestructura de clase mundial:</p><ul><li><strong>Mikrotik CCR (Cloud Core Router):</strong> Unidades multinúcleo optimizadas para procesamiento masivo de paquetes y ruteo BGP.</li><li><strong>Fortinet (FortiGate):</strong> Firewalls de Próxima Generación (NGFW) para inspección profunda de tráfico, segmentación de redes corporativas y prevención de intrusiones (IPS).</li><li><strong>Border Gateway Protocol (BGP):</strong> Configuración avanzada de Sistemas Autónomos (ASN) con enrutamiento de rutas múltiples redundantes hacia múltiples salidas internacionales.</li></ul>",
            sugerencias: ["SD-WAN", "NOC 24/7"]
        },
        noc: {
            palabrasClave: ["noc 24/7", "noc", "monitoreo", "soporte", "24/7", "asistencia tecnica", "24/7/365", "ingenieros", "incidencias", "escalamiento", "remoto", "presencial"],
            respuesta: "<p>Nuestro <strong>NOC (Network Operations Center)</strong> opera de forma ininterrumpida las 24 horas del día, los 7 días de la semana, los 365 días del año.</p><p>Un equipo de ingenieros especializados monitorea proactivamente las métricas de red. Esto permite la detección temprana de anomalías antes de que afecten la operatividad empresarial, disponiendo de escalamiento inmediato presencial y remoto.</p>",
            sugerencias: ["SLA", "Contacto"]
        },
        sla: {
            palabrasClave: ["sla", "acuerdo de nivel", "garantia", "disponibilidad", "contrato", "penalizaciones", "porcentaje", "99.5", "99.9"],
            respuesta: "<p>Nuestras soluciones empresariales cuentan con Acuerdos de Nivel de Servicio rígidos y parametrizados contractualmente:</p><ul><li><strong>SLA del 99.5%:</strong> Orientado a planes corporativos estándar y PYMEs avanzadas.</li><li><strong>SLA del 99.9%:</strong> Para infraestructuras de nivel Carrier, Data Centers corporativos y entornos multisede críticos.</li><li><strong>SLA Personalizado:</strong> Diseñado a medida según las necesidades específicas de continuidad operacional de la industria.</li></ul>",
            sugerencias: ["NOC 24/7", "Planes"]
        },
        cobertura: {
            palabrasClave: ["cobertura", "donde llegan", "provincias", "alcance", "ciudades", "mapa", "nacional", "gis", "viabilidad", "factibilidad", "coordenadas"],
            respuesta: "<p>GLOBALFIBER brinda soluciones corporativas e infraestructura de telecomunicaciones <strong>a nivel nacional</strong> en Ecuador. Poseemos una densa infraestructura troncal metropolitana en los principales polos comerciales, puertos industriales, zonas logísticas y regiones acuícolas. Proyectos especiales se evalúan mediante simulaciones exactas en nuestro sistema GIS Core de factibilidad técnica.</p>",
            sugerencias: ["Contacto", "Servicios"]
        },
        planes: {
            palabrasClave: ["planes", "costos", "precios", "tarifas", "cotizacion", "planes empresariales", "paquetes", "mensuales", "mensual", "cuanto cuesta", "valor", "pyme", "corporativo"],
            respuesta: "<p>GLOBALFIBER diseña soluciones a medida a través de consultorías de ingeniería técnica. Disponemos de los siguientes <strong>Paquetes Referenciales</strong> para el segmento Enterprise:</p>" +
                "<ul>" +
                "<li><strong>PLAN PYME:</strong> Incluye Internet Dedicado, VPN IPSec, IP pública fija y soporte empresarial. Desde <strong>$620 mensuales</strong>.</li>" +
                "<li><strong>PLAN EMPRESARIAL:</strong> Diseñado para operaciones medianas. Incluye VPN multisede, Firewall perimetral gestionado, Backup LTE e hilos de monitoreo activo. Desde <strong>$1,000 mensuales</strong>.</li>" +
                "<li><strong>PLAN CORPORATIVO:</strong> Diseñado para grandes industrias y Carriers. Incluye arquitecturas MPLS/SD-WAN, infraestructura de red redundante física, enrutamiento BGP, monitoreo NOC prioritario y SLA avanzado. Desde <strong>$5,000 mensuales</strong>.</li>" +
                "</ul>",
            sugerencias: ["Contacto", "Internet Dedicado", "SLA"]
        },
        contacto: {
            palabrasClave: ["contacto", "telefono", "correo", "direccion", "oficina", "vendedor", "cotizar", "asesor", "llamar", "email", "central", "matriz"],
            respuesta: "<p>Para dar inicio a un despliegue tecnológico corporativo, puede contactar directamente a nuestra división Enterprise:</p>" +
                "<p>📧 <strong>E-mail Corporativo:</strong> global.fibr@gmail.com<br>" +
                "📞 <strong>Central Telefónica (Ecuador):</strong> (+593) 099 180 0097<br>" +
                "📍 <strong>Matriz de Operaciones y Core NOC:</strong> Distrito Tecnológico, Suite 500-B.<br>" +
                "🌐 O bien, registre su requerimiento formal a través de los formularios técnicos de nuestra página web.</p>",
            sugerencias: ["Servicios", "Planes"]
        }
    };

    let welcomeRendered = false;

    function injectWidgetHTML() {
        if (document.getElementById("globalAiWidget")) return;

        const widgetDiv = document.createElement("div");
        widgetDiv.id = "globalAiWidget";
        widgetDiv.className = "global-ai-widget";

        widgetDiv.innerHTML = `
            <button class="global-ai-trigger" id="globalAiTrigger" aria-label="Abrir asistente virtual">
                <div class="robot-avatar-container pulse-glow">
                    <svg class="robot-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#003366" />
                                <stop offset="100%" stop-color="#001F40" />
                            </linearGradient>
                            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#ff6600" />
                                <stop offset="100%" stop-color="#cc5200" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <rect x="12" y="40" width="6" height="20" rx="3" fill="#ff6600" />
                        <rect x="82" y="40" width="6" height="20" rx="3" fill="#ff6600" />
                        <rect x="20" y="25" width="60" height="50" rx="15" fill="url(#robotGrad)" stroke="#ff6600" stroke-width="2" />
                        <rect x="28" y="33" width="44" height="26" rx="8" fill="#001122" stroke="#003366" stroke-width="1.5" />
                        <circle class="robot-eye eye-left" cx="40" cy="46" r="4" fill="#ff6600" filter="url(#glow)" />
                        <circle class="robot-eye eye-right" cx="60" cy="46" r="4" fill="#ff6600" filter="url(#glow)" />
                        <path d="M 44 53 L 56 53" stroke="#003366" stroke-width="2" stroke-linecap="round" />
                        <rect x="42" y="75" width="16" height="8" rx="2" fill="#001F40" />
                        <path d="M 35 83 L 65 83" stroke="#ff6600" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </div>
                <span class="trigger-text">GLOBAL <span class="text-orange">AI</span></span>
            </button>

            <div class="global-ai-window" id="globalAiWindow">
                <div class="chat-header">
                    <div class="header-identity">
                        <div class="header-robot-avatar">
                            <svg class="robot-svg-mini" viewBox="0 0 100 100">
                                <rect x="20" y="25" width="60" height="50" rx="12" fill="#003366" stroke="#ff6600" stroke-width="2" />
                                <rect x="28" y="33" width="44" height="26" rx="6" fill="#001122" />
                                <circle class="robot-eye-mini" cx="40" cy="46" r="3.5" fill="#ff6600" />
                                <circle class="robot-eye-mini" cx="60" cy="46" r="3.5" fill="#ff6600" />
                            </svg>
                        </div>
                        <div class="header-title-wrapper">
                            <h3 class="header-title">GLOBAL <span class="text-orange">AI</span></h3>
                            <span class="header-status">Asistente Virtual • Corporativo</span>
                        </div>
                    </div>
                    <div class="header-actions">
                        <button class="action-btn" id="btnMinimize" title="Minimizar" aria-label="Minimizar">
                            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                        <button class="action-btn" id="btnMaximize" title="Maximizar / Restaurar" aria-label="Maximizar">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>
                        </button>
                        <button class="action-btn close-btn" id="btnCloseChat" title="Cerrar" aria-label="Cerrar">
                            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                    </div>
                </div>

                <div class="chat-body" id="chatBody">
                    <div class="chat-messages-container" id="messagesContainer"></div>
                </div>

                <div class="chat-quick-replies" id="quickRepliesContainer"></div>

                <form class="chat-input-area" id="chatInputForm" autocomplete="off">
                    <input type="text" id="chatInput" class="chat-input-field" placeholder="Escriba su consulta corporativa aquí..." aria-label="Mensaje para GLOBAL AI">
                    <button type="submit" class="chat-send-btn" id="chatSendBtn" aria-label="Enviar mensaje">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(widgetDiv);
        bindEvents();
    }

    function getWidget() { return document.getElementById("globalAiWidget"); }
    function getWindow() { return document.getElementById("globalAiWindow"); }
    function getMessagesContainer() { return document.getElementById("messagesContainer"); }
    function getQuickRepliesContainer() { return document.getElementById("quickRepliesContainer"); }
    function getChatBody() { return document.getElementById("chatBody"); }

    function openChat() {
        const widget = getWidget();
        if (!widget) return;
        widget.classList.add("chat-open");
        
        if (!welcomeRendered) {
            renderWelcomeMessage();
            welcomeRendered = true;
        } else {
            scrollToBottom();
        }

        const inputField = document.getElementById("chatInput");
        if (inputField) setTimeout(() => inputField.focus(), 250);
    }

    function closeChat() {
        const widget = getWidget();
        if (widget) widget.classList.remove("chat-open");
    }

    function cleanString(str) {
        return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function toggleMaximize() {
        const win = getWindow();
        if (win) win.classList.toggle("maximized");
    }

    function scrollToBottom() {
        const body = getChatBody();
        if (body) {
            setTimeout(() => { body.scrollTop = body.scrollHeight; }, 50);
        }
    }

    function renderWelcomeMessage() {
        const container = getMessagesContainer();
        if (!container) return;
        container.innerHTML = "";
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            appendMessage("bot", GLOBAL_KNOWLEDGE.bienvenida.respuesta);
            renderQuickReplies(GLOBAL_KNOWLEDGE.bienvenida.sugerencias);
        }, 600);
    }

    function appendMessage(sender, htmlContent) {
        const container = getMessagesContainer();
        if (!container) return;

        const messageRow = document.createElement("div");
        messageRow.classList.add("message-row", sender);

        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble");
        bubble.innerHTML = htmlContent;

        messageRow.appendChild(bubble);
        container.appendChild(messageRow);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const container = getMessagesContainer();
        if (!container) return;

        const indicatorRow = document.createElement("div");
        indicatorRow.classList.add("message-row", "bot", "GLOBAL-typing-row");
        
        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble");
        
        const typing = document.createElement("div");
        typing.classList.add("typing-indicator");
        typing.innerHTML = "<span></span><span></span><span></span>";
        
        bubble.appendChild(typing);
        indicatorRow.appendChild(bubble);
        container.appendChild(indicatorRow);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const container = getMessagesContainer();
        if (!container) return;
        const indicator = container.querySelector(".telecom-typing-row");
        if (indicator) indicator.remove();
    }

    function renderQuickReplies(suggestionsList) {
        const container = getQuickRepliesContainer();
        if (!container) return;
        container.innerHTML = "";
        if (!suggestionsList || suggestionsList.length === 0) return;

        suggestionsList.forEach(item => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.classList.add("quick-reply-btn");
            btn.textContent = item;
            
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                appendMessage("user", item);
                processUserQuery(item);
            });
            
            container.appendChild(btn);
        });
    }

    // --- CORE MOTOR DE INFERENCIA SEMÁNTICA Y FUSIÓN AUTÓNOMA DE CONTEXTO ---
    function processUserQuery(rawQuery) {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            
            const normalizedQuery = cleanString(rawQuery);
            const queryTokens = normalizedQuery.split(/[\s,.\-?¿!¡]+/);
            
            // Detección explícita de negaciones
            const tieneNegacion = queryTokens.includes("no") || normalizedQuery.includes("no quiero") || normalizedQuery.includes("tampoco");

            let intentScores = {};
            let matchedIntentsList = [];

            // 1. Evaluar todas las intenciones por densidad y peso de tokens
            for (const key in GLOBAL_KNOWLEDGE) {
                if (key === "bienvenida") continue;
                
                let score = 0;
                const keywords = GLOBAL_KNOWLEDGE[key].palabrasClave;
                
                keywords.forEach(keyword => {
                    const cleanKeyword = cleanString(keyword);
                    
                    // Coincidencia de frase exacta o subfrase (Gran Peso)
                    if (normalizedQuery.includes(cleanKeyword)) {
                        score += 6;
                    }
                    
                    // Intersección por tokens (Palabras sueltas)
                    const keywordTokens = cleanKeyword.split(/\s+/);
                    keywordTokens.forEach(ktoken => {
                        if (ktoken.length > 2 && queryTokens.includes(ktoken)) {
                            score += 1.5;
                        }
                    });
                });

                // Penalización por negación contextual cruzada
                if (tieneNegacion) {
                    if (key === "planes" && (normalizedQuery.includes("no pyme") || normalizedQuery.includes("sin pyme"))) {
                        score = score > 2 ? score - 4 : score; 
                    }
                }

                if (score > 2.5) {
                    intentScores[key] = score;
                    matchedIntentsList.push({ key: key, score: score });
                }
            }

            // Ordenar intenciones detectadas por relevancia de mayor a menor
            matchedIntentsList.sort((a, b) => b.score - a.score);

            // 2. Ejecutar la Respuesta (Simple o Compuesta/Fusionada si detecta múltiples intenciones)
            if (matchedIntentsList.length > 0) {
                const primaryIntent = matchedIntentsList[0].key;

                if (primaryIntent === "saludos_automatizados" && matchedIntentsList.length === 1) {
                    const saludoAleatorio = RESPUESTAS_SALUDO[Math.floor(Math.random() * RESPUESTAS_SALUDO.length)];
                    appendMessage("bot", saludoAleatorio);
                    renderQuickReplies(GLOBAL_KNOWLEDGE[primaryIntent].sugerencias);
                    return;
                }

                // Si hay más de una intención con puntuación alta, se activa la Fusión Autónoma de Respuesta
                if (matchedIntentsList.length > 1 && matchedIntentsList[1].score > 4.5 && primaryIntent !== "saludos_automatizados") {
                    const secondaryIntent = matchedIntentsList[1].key;
                    
                    let respuestaFusionada = `<p>Entiendo perfectamente su requerimiento correlacionado sobre nuestras verticales de <strong>${primaryIntent.toUpperCase().replace('_', ' ')}</strong> y <strong>${secondaryIntent.toUpperCase().replace('_', ' ')}</strong>.</p>`;
                    respuestaFusionada += GLOBAL_KNOWLEDGE[primaryIntent].respuesta;
                    respuestaFusionada += "<hr style='border:0; border-top:1px dashed #ff6600; margin:10px 0;'>";
                    respuestaFusionada += GLOBAL_KNOWLEDGE[secondaryIntent].respuesta;

                    // Combinar sugerencias eliminando duplicados
                    let sugerenciasCombinadas = [...new Set([...GLOBAL_KNOWLEDGE[primaryIntent].sugerencias, ...GLOBAL_KNOWLEDGE[secondaryIntent].sugerencias])].slice(0, 5);

                    appendMessage("bot", respuestaFusionada);
                    renderQuickReplies(sugerenciasCombinadas);
                } else {
                    // Respuesta estándar de intención única dominante
                    const finalIntent = primaryIntent === "saludos_automatizados" && matchedIntentsList.length > 1 ? matchedIntentsList[1].key : primaryIntent;
                    appendMessage("bot", GLOBAL_KNOWLEDGE[finalIntent].respuesta);
                    renderQuickReplies(GLOBAL_KNOWLEDGE[finalIntent].sugerencias);
                }
            } else {
                // Fallback inteligente
                const defaultResponse = "<p>Su consulta excede los parámetros automatizados de mi base de conocimiento local estructurada. Al ser un operador Carrier-Grade, procesamos arquitecturas y factibilidades de ingeniería personalizadas.</p><p>Le sugiero contactar directamente a un asesor de soluciones Enterprise o verificar nuestro mapa nacional.</p>";
                appendMessage("bot", defaultResponse);
                renderQuickReplies(["Servicios", "Planes", "Contacto", "Cobertura"]);
            }
        }, 650);
    }

    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function bindEvents() {
        document.addEventListener("click", function (e) {
            const trigger = e.target.closest("#globalAiTrigger");
            const minimize = e.target.closest("#btnMinimize") || e.target.closest("#btnCloseChat");
            const maximize = e.target.closest("#btnMaximize");

            if (trigger) { e.preventDefault(); openChat(); }
            else if (minimize) { e.preventDefault(); closeChat(); }
            else if (maximize) { e.preventDefault(); toggleMaximize(); }
        });

        document.addEventListener("submit", function (e) {
            if (e.target && e.target.id === "chatInputForm") {
                e.preventDefault();
                const inputField = document.getElementById("chatInput");
                if (!inputField) return;
                const query = inputField.value.trim();
                if (!query) return;

                appendMessage("user", escapeHTML(query));
                inputField.value = "";
                processUserQuery(query);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectWidgetHTML);
    } else {
        injectWidgetHTML();
    }
})();