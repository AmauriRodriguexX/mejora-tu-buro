# Auditoría UX — mejoraburo.com.mx

Archivo de hallazgos compartido entre agentes. Plan: `PLAN_AUDITORIA_UX.md`. Protocolo: `CLAUDE.md`.

**Regla:** cada agente escribe SOLO en su propia sección y usa SOLO su rango de IDs. Nadie borra hallazgos de otro. Todo hallazgo lleva el formato obligatorio de `CLAUDE.md` y marca su estado como **Observado**, **Inferido** o **Por validar**.

| Agente | Rango de IDs | Rol | Estado |
|---|---|---|---|
| Gemini 3.8 Flash (Antigravity) | UX-001 – UX-049 | Evidencia en navegador | ✅ 13 hallazgos |
| Sonnet 5 (Claude) | UX-050 – UX-079 | Contenido y microcopy | Pendiente |
| gpt-6-astra (Codex) | UX-080 – UX-099 | Contexto, regulación, patrones oscuros | ✅ 8 hallazgos |
| gpt-5.6-luna (Codex) | UX-100 – UX-129 | Inventario técnico y accesibilidad | No ejecutado (cubierto por Opus) |
| Opus 5 (Claude Code) | UX-130 – UX-140 | Embudo real, consentimiento, canal de contacto | ✅ 11 hallazgos |
| Opus 5 (Claude Code) | UX-150 – UX-153 | Prueba con envío real autorizado | ✅ 4 hallazgos |
| Opus 5 (Claude Code) | UX-141 – UX-149 | Cruce con briefing del cliente y crawl externo | ✅ 9 hallazgos |

**Total: 45 hallazgos documentados.** El rango de Opus (UX-130–149) quedó agotado; nuevos hallazgos deben abrir un rango nuevo. Verificación cruzada aplicada: Opus reprodujo de forma independiente los hallazgos de Gemini y corrigió cuatro (ver §Correcciones).

**Material disponible en `./evidencia/`:** `home.html`, `aviso-privacidad.html`, `terminos.html` y sus versiones `.txt` en texto limpio, descargados el 2026-09-17.

**Restricción levantada el 2026-09-17:** la prohibición de enviar el formulario se levantó con autorización explícita del responsable del proyecto, para poder auditar el flujo completo y el canal de WhatsApp. Se enviaron dos leads de prueba controlados (ver §Hallazgos de la prueba con envío real y UX-140). Cualquier prueba futura requiere autorización nueva.

## Gemini 3.8 Flash (Antigravity) — evidencia en navegador

**Rango:** UX-001 – UX-049  
**Viewports probados:** Desktop (1440×900) y Móvil (390×844)  

### 1. Respuestas directas a las 4 preguntas abiertas de máxima prioridad

#### A) Bloque "Nuestro Fideicomiso está avalado por:" y logos regulatorios
- **Respuesta:** En el código HTML existe la fila `.kc-elm.kc-css-303631` con el texto *"Nuestro Fideicomiso está avalado por:"* y una etiqueta `<img>` que apunta a `https://mejoraburo.com.mx/wp-content/uploads/2022/02/brand-logos.png`. Sin embargo, en las hojas de estilo reales aplicadas en producción, el maquetador KingComposer tiene configuradas las reglas:
  ```css
  body.kc-css-system .kc-css-506567 { display: none; }
  body.kc-css-system .kc-css-743817 { text-align: center; display: none; }
  ```
  Esto provoca que tanto el texto del aval como la imagen de los logos tengan `display: none;` y midan `0×0 px` en pantalla para cualquier visitante humano común (tanto en desktop 1440×900 como en móvil 390×844). Visualmente solo se renderiza el logo de Mejora Buró a la izquierda y un espacio vacío a la derecha.
- **Transcripción exacta de la imagen `brand-logos.png` (presente en el servidor y oculta en DOM):**
  1. **CNBV - COMISIÓN NACIONAL BANCARIA Y DE VALORES** (logotipo hexagonal oficial con tipografía institucional).
  2. **Buró De Entidades Financieras** (logotipo institucional oficial de recuadro metálico).
  3. **CONDUSEF - COMISIÓN NACIONAL PARA LA PROTECCIÓN Y DEFENSA DE LOS USUARIOS DE SERVICIOS FINANCIEROS** (logotipo oficial con dos esferas verdes superpuestas).
- **Evidencia visual:** `evidencia/brand-logos.png`, `evidencia/bloque-fideicomiso-aval-1440x900.png`, `evidencia/bloque-fideicomiso-contexto-1440x900.png` y `evidencia/bloque-fideicomiso-movil-390x844.png`.

#### B) Testimoniales y reseñas de clientes
- **Respuesta:** La sección de testimoniales (`#testimoniales`, encabezada por *"¡Nuestros clientes no dejan de hablar de nosotros!"*) se encuentra **completamente desierta**. No contiene nombres, fotos, fechas ni citas verificables de clientes. En el código fuente únicamente existe un `<script async defer src="https://cdn.trustindex.io/loader.js?35d632c1354d7233ca96ad398ba">`, el cual se ejecuta en el navegador e inyecta un simple `<div></div>` vacío sin reseñas debido a que el endpoint externo de Trustindex no devuelve datos válidos (status 404 en subrecursos). Visualmente el bloque muestra un lienzo azul vacío entre el encabezado y el botón CTA *"¡Comienza ahora!"*. En el Hero existe un distintivo que reza *"Google ★★★★★ 4910 reseñas >"*, pero no posee enlace (`href: null`), impidiendo comprobar si tales opiniones existen en Google Maps o Google Business Profile.
- **Evidencia visual:** `evidencia/seccion-testimoniales-1440x900.png` y `evidencia/hero-1440x900.png`.

#### C) Enlace al Aviso de Privacidad en el formulario
- **Respuesta:** El enlace al Aviso de Privacidad **NO aparece junto al formulario ni en el momento de solicitar los datos o recabar el consentimiento**. En el formulario únicamente se muestra la leyenda *"Acepto ser contactado a través de la cuenta de WhatsApp verificada de Mejora Buró"*. El enlace al Aviso de Privacidad está exclusivamente ubicado en el pie de página (`footer`), fuera del campo visual del usuario al completar sus datos.
- **Evidencia visual:** `evidencia/formulario-desktop-1440x900.png`, `evidencia/formulario-select-desplegado-1440x900.png` y `evidencia/formulario-checkbox-tras-clic.png`.

#### D) Términos y Condiciones tipo marketplace en vivo
- **Respuesta:** **Confirmado al 100%.** Al ingresar en el navegador a `https://mejoraburo.com.mx/terminos-y-condiciones/`, el texto se le muestra de forma íntegra a cualquier visitante. El documento contiene cláusulas de un marketplace de compraventa entre usuarios particulares, incluyendo explícitamente:
  - Apartado **G. RESPONSABILIDAD**: *"Mejora Buró recomienda actuar con prudencia y sentido común al momento de realizar operaciones con otros Usuarios. El Usuario debe tener presente además, los riesgos de contratar con menores o con personas que se valgan de una identidad falsa. En caso que uno o más Usuarios o algún tercero inicien cualquier tipo de reclamo o acciones legales contra otro u otros Usuarios, todos y cada uno de los Usuarios involucrados en dichos reclamos o acciones eximen de toda responsabilidad a Mejora Buró..."*
  - Apartado **F. SANCIONES. SUSPENSIÓN DE OPERACIONES**: *"inhabilitar definitivamente la Cuenta de un Usuario o una publicación, aplicar una sanción que impacte negativamente en la reputación de un Usuario..."*
  - Apartado **I. VERIFICACIÓN DE IDENTIDAD**: *"sistema de información, además constará de un espacio donde los Usuarios podrán hacer comentarios y réplicas a las calificaciones recibidas y acceder a los mismos."*
- **Evidencia visual:** `evidencia/terminos-1440x900.png` y `evidencia/terminos-texto-marketplace-1440x900.png`.

---

### 2. Hallazgos observados en navegador (UX-001 a UX-013)

ID: UX-001
Severidad: Bloqueador
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Footer (.kc-elm.kc-css-303631) — Desktop 1440×900 y Móvil 390×844 — Archivos: `evidencia/brand-logos.png`, `evidencia/bloque-fideicomiso-aval-1440x900.png`
Problema: En el HTML del sitio existe la afirmación "Nuestro Fideicomiso está avalado por:" acompañada de una imagen (`brand-logos.png`) que incluye los logotipos oficiales de la CNBV, el Buró de Entidades Financieras y la CONDUSEF. Sin embargo, en el archivo CSS de producción ambas columnas tienen la regla `display: none;`, por lo que permanecen invisibles en el navegador para usuarios visuales pero se indexan y leen en herramientas de texto plano o scrapers. Si el aval fuera real, ocultarlo resta confianza institucional; si no existe tal aval formal de las tres entidades gubernamentales/reguladoras sobre el fideicomiso, mantenerlo en el DOM representa un grave riesgo regulatorio y engaño publicitario.
Impacto: Afecta a todos los visitantes que buscan certeza de regulación antes de compartir información de deudas; genera inconsistencia entre lo que leen motores/crawlers y lo que ve el usuario.
Evidencia: La imagen `https://mejoraburo.com.mx/wp-content/uploads/2022/02/brand-logos.png` contiene literalmente "CNBV COMISION NACIONAL BANCARIA Y DE VALORES", "Buró De Entidades Financieras" y "CONDUSEF". En tiempo de ejecución, `window.getComputedStyle(document.querySelector('.kc-css-506567')).display` devuelve `"none"` y `window.getComputedStyle(document.querySelector('.kc-css-743817')).display` devuelve `"none"`.
Recomendación: Retirar del DOM inmediatamente la imagen y el texto si no se cuenta con autorización y registro de aval regulatorio ante CNBV y CONDUSEF. Si existe una figura fiduciaria debidamente registrada ante una institución regulada, transparentar en texto visible y accesible la institución fiduciaria autorizada y el número de registro correspondiente.
Criterio de aceptación: Ningún elemento regulatorio no respaldado figura en el DOM ni en CSS; si existe respaldo legal comprobable, se exhibe de manera clara y accesible con texto y enlaces oficiales.

---

ID: UX-002
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Hero / Formulario (#intro) — Desktop 1440×900 y Móvil 390×844 — Archivos: `evidencia/formulario-desktop-1440x900.png`, `evidencia/formulario-select-desplegado-1440x900.png`, `evidencia/formulario-checkbox-tras-clic.png`
Problema: El formulario no contiene 1 solo campo como indicaba la lectura de texto preliminar, sino 4 campos obligatorios: `*Nombre` (text), `*Correo electrónico` (email), `+52 *WhatsApp` (tel) y `Rango aproximado` (select de ingresos con 6 opciones). Además, el selector `<select id="amount">` carece de etiqueta semántica `<label>` asociada o atributo `aria-label` (violación axe-core crítica `select-name`). Tampoco se informa la política de tratamiento ni el motivo de pedir correo si el contacto prometido es por WhatsApp.
Impacto: Prospectos con deudas que temen ser expuestos o contactados en sus empleos/familias se enfrentan a un formulario de captación completo de identidad sin advertencia de privacidad previa. Personas usuarias de lectores de pantalla no escuchan el nombre accesible del selector de ingresos.
Evidencia: Inspección DOM: inputs `#name`, `#email`, `#tel`, `#amount`. Al intentar interactuar, se despliega el mensaje de error: "El campo es obligatorio" en cada uno de los 4 campos. Reporte axe: regla `select-name` violada en `#amount` ("Element does not have an explicit label").
Recomendación: Incorporar `<label for="amount">Rango aproximado de deuda o ingresos</label>`, explicitar antes de los campos para qué se usará cada dato y clarificar si el correo electrónico es indispensable o secundario.
Criterio de aceptación: Todos los campos del formulario cuentan con labels accesibles vinculados por ID, validados al 100% por axe-core sin errores `select-name`.

---

ID: UX-003
Severidad: Bloqueador
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Formulario (#intro) — Desktop 1440×900 y Móvil 390×844 — Archivos: `evidencia/formulario-desktop-1440x900.png`, `evidencia/teclado-tab-log.json`
Problema: El elemento `<input type="checkbox" name="your-chk">` tiene aplicada la regla de estilo `display: none;`. No existe ninguna casilla cuadrada visual (checkbox) renderizada en pantalla, únicamente el texto plano "Acepto ser contactado a través de la cuenta de WhatsApp verificada de Mejora Buró". Debido a `display: none`, el checkbox es completamente omitido por el teclado durante el recorrido con Tab (salta del select al botón submit), impidiendo que un usuario con discapacidad motriz o que navegue por teclado pueda marcar o desmarcar el consentimiento.
Impacto: Exclusión absoluta de usuarios de tecnologías de asistencia o teclado; imposibilidad de conocer el estado del consentimiento antes de pulsar el botón.
Evidencia: Registro de navegación por teclado en `teclado-tab-log.json`: tras el paso 4 (`#amount`), el siguiente elemento con foco salta a un enlace y luego al paso 6 (`#submit`). En el DOM, `window.getComputedStyle(cb).display` es `"none"`.
Recomendación: Restablecer el renderizado de la casilla del checkbox nativo o implementar un control accesible con `role="checkbox"`, `aria-checked`, `tabindex="0"` y estilos de foco visibles.
Criterio de aceptación: La casilla de verificación es visible, muestra claramente el estado marcado/desmarcado y puede operarse con la barra espaciadora mediante teclado.

---

ID: UX-004
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Hero / Formulario — Desktop 1440×900 y Móvil 390×844 — Archivo: `evidencia/formulario-desktop-1440x900.png`
Problema: En el área del formulario no existe ningún enlace ni mención al Aviso de Privacidad. El único enlace al aviso se encuentra en el pie de página, a más de 2000 píxeles de distancia. Al captar nombre, correo personal, teléfono móvil y rango de ingresos patrimoniales, no se pone a disposición del titular el aviso de privacidad simplificado ni se enlaza el integral en el momento de la recolección.
Impacto: Incumplimiento de las mejores prácticas de UX y del principio de información bajo la LFPDPPP; desconfianza en el usuario que busca saber si sus datos serán compartidos con despachos de cobranza.
Evidencia: En el análisis de enlaces del contenedor del formulario (`form_analysis.containerLinks`), los únicos enlaces encontrados hacia `aviso-de-privacidad` tienen texto vacío y están en el footer. El texto interno del formulario carece de la palabra "privacidad".
Recomendación: Insertar junto al checkbox de consentimiento un texto claro con enlace directo: "He leído y acepto el [Aviso de Privacidad](https://mejoraburo.com.mx/aviso-de-privacidad/) y autorizo el tratamiento de mis datos de contacto y situación financiera."
Criterio de aceptación: El enlace al Aviso de Privacidad es visible inmediatamente contiguo al botón de acción, accesible por teclado y con contraste suficiente.

---

ID: UX-005
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/#testimoniales — Sección Testimoniales — Desktop 1440×900 y Móvil 390×844 — Archivo: `evidencia/seccion-testimoniales-1440x900.png`
Problema: La sección de testimonios promete prueba social mediante el título "¡Nuestros clientes no dejan de hablar de nosotros!", pero se encuentra totalmente vacía. El widget de Trustindex (`https://cdn.trustindex.io/loader.js?35d632c1354d7233ca96ad398ba`) falla al solicitar sus dependencias (devuelve errores 404 en subrecursos) e inserta un contenedor `<div></div>` sin contenido. El usuario solo ve un gran bloque azul vacío seguido de un botón de conversión.
Impacto: Sensación de sitio web roto o abandonado; desconfianza severa en un servicio financiero delicado (reparación de crédito) donde la prueba social es el principal factor de credibilidad.
Evidencia: Screenshot `seccion-testimoniales-1440x900.png`. El código de la sección `.kc-css-851649` tras 4 segundos de carga solo tiene `innerHTML: "<div></div>"` e `innerText: ""`.
Recomendación: Si el widget de Trustindex requiere suscripción o configuración de API, renovarlo o repararlo. Como respaldo (fallback), maquetar testimonios estáticos verificables en HTML semántico con nombre, fecha aproximada, monto orientativo o caso de éxito resuelto.
Criterio de aceptación: La sección muestra testimonios legibles con contenido real sin depender exclusivamente de un script externo fallido.

---

ID: UX-006
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/terminos-y-condiciones/ — Todo el documento — Desktop 1440×900 — Archivo: `evidencia/terminos-texto-marketplace-1440x900.png`
Problema: El texto legal publicado de Términos y Condiciones corresponde a un contrato de adhesión para plataformas de intermediación de compraventa entre particulares (marketplace estilo Mercado Libre o eBay), regulando "calificaciones entre usuarios", "publicación de artículos", "operaciones con otros Usuarios" y "sanciones a la reputación de la cuenta". No tiene ninguna relación con el servicio real de asesoría financiera y reestructura de deudas bancarias que ofrece Mejora Buró.
Impacto: Destrucción de la credibilidad jurídica del sitio para cualquier prospecto que revise las condiciones antes de entregar sus datos o contratar; riesgo legal para la empresa.
Evidencia: En el texto real activo en vivo en la página se lee: "Mejora Buró recomienda actuar con prudencia y sentido común al momento de realizar operaciones con otros Usuarios" y "constará de un espacio donde los Usuarios podrán hacer comentarios y réplicas a las calificaciones recibidas".
Recomendación: Reemplazar íntegramente los Términos y Condiciones por un documento redactado específicamente para el servicio de consultoría legal y financiera de Baui Solutions S.A. de C.V.
Criterio de aceptación: Los términos describen con exactitud las etapas de la asesoría, gratuidad inicial, alcance de los servicios y responsabilidades de las partes.

---

ID: UX-007
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Global — Desktop 1440×900 — Archivo: `evidencia/teclado-tab-log.json`
Problema: El orden secuencial de foco con teclado (Tab) se encuentra gravemente alterado. Al presionar Tab desde la carga de la página, el foco no ingresa al enlace de salto ("Saltar al contenido") ni al menú de cabecera; salta directo al primer campo del formulario en el Hero (`#name`). El menú de navegación principal y el enlace de salto solo reciben el foco al final del documento (pasos 35 a 38 de 39), después de recorrer todo el pie de página y 8 iframes invisibles.
Impacto: Los usuarios que dependen exclusivamente del teclado no pueden navegar a las secciones del sitio ("¿Cómo funciona?", "Preguntas Frecuentes", "Blog") sin antes tabular por todos los campos e inputs del formulario y el footer.
Evidencia: En `teclado-tab-log.json`: Pasos 1-4 corresponden a `#name`, `#email`, `#tel`, `#amount`. El enlace "Saltar al contenido" aparece hasta el Paso 35, el logo en el Paso 36 y "Blog" en el Paso 38.
Recomendación: Reordenar el DOM o retirar los `tabindex` positivos/forzados para que el orden de tabulación respete el flujo visual natural: Skip link → Logo → Menú principal → Hero/Formulario → Contenido → Footer.
Criterio de aceptación: La primera pulsación de Tab enfoca el enlace "Saltar al contenido" y las siguientes navegan el menú principal antes de pasar al cuerpo de la página (WCAG 2.2 criterio 2.4.3).

---

ID: UX-008
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Global — Desktop 1440×900 — Archivos: `evidencia/teclado-foco-step-0.png`, `evidencia/teclado-foco-step-10.png`
Problema: Los campos del formulario y la gran mayoría de enlaces y botones carecen de un indicador de foco visible (`outline: none;` o `outline-style: none`). De 39 elementos interactivos analizados en el recorrido con teclado, 36 no presentan ningún anillo de foco ni sombra discernible al estar activos.
Impacto: Un usuario que navega con la tecla Tab pierde la noción de en qué parte de la pantalla se encuentra el cursor interactivo (violación directa de WCAG 2.4.7 Focus Visible y WCAG 2.4.11 Focus Appearance).
Evidencia: Valores computados en CSS: inputs `#name`, `#email`, `#tel` tienen `outline: 3px none rgb(51, 51, 51)` y `hasVisibleOutline: false`. Enlaces del menú y botones muestran `outline: none`.
Recomendación: Definir en la hoja de estilos global una regla `:focus-visible` con un contorno de al menos 2px sólido de color de alto contraste (ej. `#00386e` o `#8154f0`) y un desplazamiento (`outline-offset: 2px`).
Criterio de aceptación: Cada elemento interactivo muestra un anillo de foco nítido y de alto contraste al recibir el foco del teclado.

---

ID: UX-009
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Footer — Móvil 390×844 — Archivo: `evidencia/home-movil-390x844.png`, `evidencia/auditoria-datos-completos.json`
Problema: Múltiples enlaces interactivos en el pie de página presentan un tamaño de objetivo táctil (touch target) con una altura de solo 20 a 22 píxeles, incumpliendo el criterio de éxito WCAG 2.2 Criterio 2.5.8 Target Size (Minimum) que exige un mínimo de 24×24 px (y la guía de diseño móvil de Google/Apple que recomienda 44-48 px).
Impacto: En dispositivos móviles, los usuarios con dedos más anchos o dificultades motoras sufren toques accidentales al intentar presionar "Aviso de privacidad" o los enlaces de contacto.
Evidencia: Medición en viewport 390×844:
- "Aviso de privacidad": 133×20 px
- "Términos y Condiciones": 161×20 px
- Redes sociales (Facebook, LinkedIn, Twitter, Instagram, YouTube, Pinterest): altura de 20 px cada uno.
- "contacto@mejoraburo.com.mx": altura de 22 px.
Recomendación: Incrementar el `line-height` y añadir `padding: 8px 0;` a los enlaces del footer para asegurar que el área de toque alcance al menos 44×44 px en pantallas táctiles.
Criterio de aceptación: Ningún elemento interactivo en móvil mide menos de 24×24 px en su caja de toque efectiva.

---

ID: UX-010
Severidad: Baja
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Cabecera / Menú principal (#masthead) — Desktop 1440×900 — Archivo: `evidencia/axe-report.json`
Problema: Los enlaces del menú superior de navegación (Inicio, ¿Cómo funciona?, Blog, Testimoniales, Preguntas Frecuentes) presentan un color gris `#797984` sobre fondo blanco `#ffffff`, lo que produce una relación de contraste de **4.3:1**. Esto incumple el ratio mínimo de 4.5:1 exigido por WCAG 2.1 Criterio 1.4.3 para texto normal (15px).
Impacto: Personas con agudeza visual reducida o expuestas a reflejos de luz solar en pantallas tienen dificultades para leer las opciones del menú.
Evidencia: Detección automática en axe-core (`color-contrast` con 15 nodos afectados en `#masthead` y menú, reportando `contrast ratio of 4.3`).
Recomendación: Ajustar el color del texto del menú a un tono más oscuro, como `#595965` o `#333333`, lo que elevará el ratio a más de 7:1 (cumpliendo nivel AAA).
Criterio de aceptación: Todas las opciones del menú alcanzan un ratio de contraste mínimo de 4.5:1 verificado con axe y analizador de contraste.

---

ID: UX-011
Severidad: Baja
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Portada completa — Desktop 1440×900 — Archivo: `evidencia/axe-report.json`
Problema: La página de portada no posee ningún encabezado de nivel 1 (`<h1>`). El texto principal del Hero ("Pagar menos al mes para olvidarse del estrés...") está maquetado como `<h2>` o dentro de contenedores de KingComposer, provocando una jerarquía de títulos rota (violación axe-core `page-has-heading-one`).
Impacto: Los lectores de pantalla y motores de búsqueda no pueden identificar cuál es el tema principal de la página al omitirse el nodo estructural primario.
Evidencia: Reporte axe-core: regla `page-has-heading-one` violada ("Page must have a level-one heading"). Búsqueda en DOM: `document.querySelectorAll('h1').length === 0`.
Recomendación: Convertir el titular de la propuesta de valor del Hero en un `<h1>` semántico: `<h1>Pagar menos al mes para olvidarse del estrés. ¡La educación financiera es todo!</h1>`.
Criterio de aceptación: La página contiene exactamente un `<h1>` al inicio de su estructura de contenidos, superando la regla de axe-core.

---

ID: UX-012
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Hero (#intro) — Desktop 1440×900 y Móvil 390×844 — Archivo: `evidencia/hero-1440x900.png`
Problema: Debajo del titular del Hero se muestra una insignia con el logotipo de Google, cinco estrellas amarillas y el texto "4910 reseñas >", sugiriendo que existen casi 5,000 reseñas verificadas en Google. Sin embargo, el elemento no es un enlace (`href: null`), no reacciona al clic ni conduce a la ficha de Google Maps o Google Business Profile de Mejora Buró.
Impacto: Genera sospecha de manipulación o cifra falsa en prospectos escépticos que intentan verificar las calificaciones antes de proporcionar datos personales sensibles.
Evidencia: En inspección con Playwright en vivo, el elemento que contiene "4910 reseñas" tiene `href: null` y no desencadena navegación alguna.
Recomendación: Enlazar el distintivo directamente a la URL pública de la ficha de Google Maps de Mejora Buró / Baui Solutions S.A. de C.V., o indicar la fuente y fecha de corte de la calificación.
Criterio de aceptación: El badge de reseñas es clickeable y abre en una pestaña nueva la ficha real de opiniones en Google.

---

ID: UX-013
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — Footer y Scripts de terceros — Desktop 1440×900 — Archivo: `evidencia/axe-report.json`, `evidencia/teclado-tab-log.json`
Problema: Al navegar con teclado por la parte inferior de la página, el foco ingresa consecutivamente a 8 elementos `<iframe>` correspondientes a widgets de mapas, Stripe y scripts de analítica/rastreo que carecen del atributo `title` accesible (violación de accesibilidad axe `frame-title`).
Impacto: Un usuario de lector de pantalla escucha "marco", "frame" repetidamente sin ninguna indicación de qué contiene o si requiere interacción.
Evidencia: Pasos 27 a 34 de `teclado-tab-log.json` enfocan etiquetas `IFRAME` sin texto ni título. Reporte de axe: violación `frame-title` ("Ensure <iframe> and <frame> elements have an accessible name").
Recomendación: Añadir a los iframes requeridos un atributo `title` descriptivo (ej. `title="Ubicación de oficinas en Google Maps"`) y agregar `tabindex="-1"` a aquellos iframes invisibles o de uso puramente técnico para excluirlos de la secuencia de tabulación.
Criterio de aceptación: Ningún iframe de la página carece de título accesible ni atrapa el foco innecesariamente.

---

### 3. Síntesis de mediciones técnicas en navegador

| Dimensión | Herramienta / Método | Resultado Observado | Estado / Evaluación |
|---|---|---|---|
| **Scroll horizontal móvil** | Viewport 390×844 / DOM | `scrollWidth: 390px`, `windowWidth: 390px`. 0 desbordamientos. | **Excelente** (sin overflow) |
| **Contraste CTA principal** | Medición RGB / WCAG 2.1 | Botón "¡Comenzar!" (`#ffffff` sobre `#00386e`): ratio **11.73:1**. | **Cumple AAA** |
| **Contraste CTAs cuerpo** | Medición RGB / WCAG 2.1 | Botones "¡Comienza ahora!" (`#ffffff` sobre `#8154f0`): ratio **4.71:1**. | **Cumple AA** (falla AAA) |
| **Contraste menú superior** | axe-core / Computed CSS | Enlaces (`#797984` sobre `#ffffff`): ratio **4.3:1**. | **Falla AA** (mín. 4.5:1) |
| **Touch targets móvil** | Viewport 390×844 | 11 enlaces con altura de 20-22 px (footer y legales). | **Falla WCAG 2.2 (2.5.8)** |
| **Recorrido por teclado** | Emulación Tab (39 pasos) | Foco inicia en formulario, omite checkbox, foco visible en solo 3/39 elementos. | **Deficiente** |
| **axe-core** | Versión 4.10.2 inyectada | 7 violaciones (2 críticas: `select-name`, `image-alt`; 3 serias: `color-contrast`, `link-name`, `frame-title`; 2 moderadas). | **Reporte exportado** (`axe-report.json`) |
| **Árbol de accesibilidad** | Chrome DevTools Protocol | Exportado completo en `evidencia/arbol-accesibilidad.json`. | **Completado** |
| **Popups / Interrupciones** | Inspección DOM en vivo | 0 modales, 0 banners de cookies, 0 chats flotantes intrusivos. | **Limpio** |
| **Rendimiento percibido** | Performance Navigation Timing | TTFB: 1.1s, FCP: 1.8s, DOMContentLoaded: 2.1s, Load: 3.8s. | **Aceptable** |

---

### 4. Qué NO se pudo probar y por qué
1. **Envío del formulario y página de confirmación / mensaje de error de servidor:** En estricto apego al protocolo y regla dura de la auditoría, no se envió el formulario para no disparar llamadas o mensajes de WhatsApp de asesores comerciales humanos reales en producción.
2. **Respuesta real del canal de WhatsApp:** No se estableció comunicación activa con el número telefónico de WhatsApp ni se validó el bot/atención humana.
3. **Comportamiento tras autenticación o panel de cliente:** El sitio no cuenta con inicio de sesión ni área privada de clientes; opera exclusivamente como landing page de prospección.

---

**Auditor:** Gemini 3.8 Flash (Antigravity) — 2026-09-17 — Viewports probados: Desktop (1440×900) y Móvil (390×844).


---

## gpt-6-astra (Codex) — contexto, regulación y patrones oscuros

**Rango:** UX-080 – UX-099
**Condición:** ejecutado SIN acceso a internet (sandbox de Codex sin red, verificado en C-003). Analizó el texto real del sitio descargado por Claude Code: `home.txt`, `aviso-privacidad.txt`, `terminos.txt`.

Auditor: gpt-6-astra | Sin acceso a internet | Fuentes: archivos locales

Leí completos `evidencia/home.txt`, `evidencia/aviso-privacidad.txt` y `evidencia/terminos.txt`. La revisión cubre la captación de prospectos y sus textos legales; no verifica comportamiento del formulario, imágenes, contratación posterior ni tratamiento efectivo de datos.

No pude confirmar la legislación vigente, las reglas de publicidad aplicables a esta empresa ni los criterios actuales de CONDUSEF. Las implicaciones jurídicas se marcan **Por validar**, sin afirmar infracciones. Las recomendaciones son criterios de remediación propuestos, no transcripciones de obligaciones legales.

---

**ID: UX-080**  
**Severidad:** Alta  
**Confianza:** Media  
**Estado:** Por validar  
**Ubicacion:** `home.txt`, formulario; `aviso-privacidad.txt`, Obtención y tratamiento de los datos personales.  
**Problema:** El consentimiento textual del formulario autoriza contacto por WhatsApp, pero no explica el tratamiento del rango de ingresos. Debe validarse si ese dato queda vinculado a una persona identificada o identificable, qué consentimiento requiere y cómo se obtiene. No pude confirmar en fuente vigente el requisito de consentimiento expreso para datos financieros o patrimoniales ni sus excepciones.  
**Impacto:** El prospecto puede autorizar una conversación sin comprender el uso de su información económica; afecta la decisión informada al enviar el formulario.  
**Evidencia:** “Acepto ser contactado a través de la cuenta de WhatsApp verificada de Mejora Buró”. El aviso declara: “Los datos que los Clientes libre y voluntariamente proporcionan a Mejora Buró, incluyen: datos de identificación, datos laborales, datos patrimoniales, actividad a la que se dedican.”  
**Recomendacion:** Explicar junto al campo para qué se solicita el ingreso, enlazar el aviso y distinguir el tratamiento de información económica de la autorización de contacto. Validar jurídicamente el mecanismo de consentimiento aplicable.  
**Criterio de aceptacion:** Antes del envío se identifica la finalidad del rango de ingresos; la revisión jurídica documenta el consentimiento exigible y una prueba del flujo acredita su obtención y registro.

---

**ID: UX-081**  
**Severidad:** Alta  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `aviso-privacidad.txt`, Finalidad del tratamiento de datos.  
**Problema:** El aviso incluye publicidad y prospección entre las finalidades de mantenimiento o cumplimiento de la relación jurídica. Aunque reconoce la posibilidad de negarse, deja al cliente determinar cuáles finalidades no son necesarias y comunicarlo al recibir el aviso. Es una agrupación textual que dificulta distinguir la asesoría solicitada del marketing; no demuestra que el checkbox esté premarcado ni que exista consentimiento forzado en funcionamiento.  
**Impacto:** El prospecto puede interpretar que aceptar publicidad forma parte de recibir asesoría, reduciendo su control sobre contactos posteriores.  
**Evidencia:** “(ix) para fines mercadotécnicos, publicitarios y de prospección comercial relacionados a Mejora Buró.” También: “aquellas que servirán al mantenimiento y/o cumplimiento de las obligaciones que se derivan de la relación jurídica serán las contenidas en los incisos (iii), (iv), (v), (vi), (vii), (viii), (ix).”  
**Recomendacion:** Separar las finalidades necesarias para atender la solicitud de las finalidades publicitarias opcionales y ofrecer una decisión específica sobre estas últimas.  
**Criterio de aceptacion:** El aviso distingue ambos grupos y el prospecto puede solicitar asesoría sin autorizar campañas posteriores; esa preferencia se conserva durante el seguimiento.

---

**ID: UX-082**  
**Severidad:** Alta  
**Confianza:** Media  
**Estado:** Por validar  
**Ubicacion:** `aviso-privacidad.txt`, Transferencia de datos personales por Mejora Buró.  
**Problema:** La cláusula comprende transferencias para publicidad y expresa conformidad mediante una supuesta firma del aviso. Los textos no permiten establecer cómo se obtiene esa conformidad en el flujo descrito ni cuáles transferencias requieren consentimiento. No pude verificar las excepciones legales aplicables ni la vigencia de la referencia al artículo 37.  
**Impacto:** El usuario puede desconocer que la autorización contempla compartir datos para promoción, además de atender su solicitud.  
**Evidencia:** “(vi) publicidad y promoción de los productos financieros que Mejora Buró ofrezca a sus Clientes.” La cláusula añade: “En este acto, el Cliente manifiesta su conformidad para que Mejora Buró pueda llevar a cabo las transferencias en los supuestos antes enunciados, a los terceros receptores antes mencionados y por las finalidades enunciadas, por lo que firma de enterado y de conformidad el presente Aviso de Privacidad.”  
**Recomendacion:** Contrastar el aviso con las transferencias reales; identificar destinatarios o categorías, finalidad y fundamento aplicable. Sustituir la referencia a una firma por el mecanismo que efectivamente se utilice y permitir decisiones separadas cuando corresponda.  
**Criterio de aceptacion:** Cada transferencia declarada tiene una finalidad y una base documentadas; las que requieran autorización cuentan con evidencia del consentimiento correspondiente y una negativa impide ejecutarlas.

---

**ID: UX-083**  
**Severidad:** Alta  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `aviso-privacidad.txt`, Medios y procedimiento para el ejercicio de los derechos ARCO y para la revocación del consentimiento.  
**Problema:** El procedimiento publicado remite al domicilio para obtener la solicitud y consultar la respuesta. Frente a la captación digital, introduce una carga considerable para ejercer derechos o retirar el consentimiento. El hallazgo es de fricción documentada; no afirma que un procedimiento presencial sea, por sí mismo, ilegal.  
**Impacto:** Personas fuera de Ciudad de México o con limitaciones de movilidad pueden desistir de solicitar acceso, cancelación u oposición.  
**Evidencia:** “Los Clientes de Mejora Buró podrán ejercer sus derechos ARCO y revocar su consentimiento para el tratamiento de sus datos personales, a través de la solicitud respectiva, que podrá ser obtenida en forma gratuita en el domicilio de Mejora Buró, la cual deberá ser entregada al Director Jurídico de Mejora Buró.” También: “La respuesta se pondrá a disposición del Cliente en el domicilio de Mejora Buró donde se hubiere presentado la solicitud, dentro del plazo antes señalado.”  
**Recomendacion:** Añadir un procedimiento remoto explícito con requisitos, verificación proporcional de identidad, acuse y respuesta por el canal elegido. Ofrecer una baja sencilla de comunicaciones publicitarias.  
**Criterio de aceptacion:** Una persona puede presentar y dar seguimiento a su solicitud sin desplazarse; el aviso describe el canal y una prueba completa acredita recepción, respuesta y ejecución cuando proceda.

---

**ID: UX-084**  
**Severidad:** Alta  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `terminos.txt`, apartados G. Responsabilidad e I. Verificación de identidad; `home.txt`, descripción del servicio.  
**Problema:** Los términos describen operaciones entre usuarios, calificaciones y réplicas, mientras la portada ofrece asesoría con un consultor. Esas cláusulas no explican qué compromisos adquiere una persona al solicitar contacto en el flujo aportado.  
**Impacto:** Dificulta comprender quién presta el servicio, qué relación se inicia y qué responsabilidades corresponden al prospecto. Puede generar desconfianza durante la consulta de los términos.  
**Evidencia:** “Mejora Buró recomienda actuar con prudencia y sentido común al momento de realizar operaciones con otros Usuarios.” Además: “Este sistema de información, además constará de un espacio donde los Usuarios podrán hacer comentarios y réplicas a las calificaciones recibidas y acceder a los mismos.” La portada indica: “Uno de nuestros asesores te brinda educación y orientación legal y financiera, sin compromiso.”  
**Recomendacion:** Reescribir los términos para la captación y asesoría reales: solicitud de contacto, alcance de la asesoría inicial y momento de contratación de servicios adicionales. Retirar las cláusulas de operaciones y reputación entre usuarios si no corresponden.  
**Criterio de aceptacion:** Cada cláusula corresponde a una función o relación real y el documento permite identificar qué ocurre al enviar el formulario y qué requeriría una contratación posterior.

---

**ID: UX-085**  
**Severidad:** Alta  
**Confianza:** Media  
**Estado:** Por validar  
**Ubicacion:** `home.txt`, encabezado principal y Preguntas Frecuentes → ¿Qué hacemos?  
**Problema:** El encabezado presenta pagar menos al mes como beneficio, mientras la descripción concreta del servicio se limita a educación y organización financiera. Debe validarse qué actuación permite obtener ese beneficio y cuáles son sus condiciones y límites. El texto no equivale a una garantía expresa, pero puede generar una expectativa superior al alcance explicado. No pude confirmar qué reglas publicitarias o declaraciones espera CONDUSEF de esta empresa según su actividad y estatus.  
**Impacto:** Puede atraer prospectos que esperan una reducción de pagos cuando la prestación descrita no explica cómo se conseguiría; afecta la calidad de los leads y la confianza durante la asesoría.  
**Evidencia:** “Pagar menos al mes para olvidarse del estrés.” Frente a: “Brindamos educación y herramientas para ayudar a las personas a organizar mejor su panorama financiero y tomar decisiones más informadas.”  
**Recomendacion:** Alinear la promesa con el servicio comprobable. Si existe negociación de deuda, explicar condiciones, dependencia de terceros y consecuencias relevantes. Declarar el papel y estatus reales de la empresa, sin sugerir autorizaciones o respaldo institucional no acreditados.  
**Criterio de aceptacion:** El beneficio anunciado tiene soporte documentado y condiciones accesibles antes de solicitar contacto; la revisión jurídica confirma las reglas aplicables y las declaraciones sobre alcance y estatus.

---

**ID: UX-086**  
**Severidad:** Media  
**Confianza:** Baja  
**Estado:** Por validar  
**Ubicacion:** `home.txt`, bloque anterior a las redes sociales, repetido en ambos documentos legales.  
**Problema:** Se anuncia un aval del fideicomiso, pero el texto descargado no identifica quién lo otorga ni qué cubre. Puede existir información en imágenes no conservadas en la extracción; por ello, no se concluye que el aval sea falso ni que falte en la página visual.  
**Impacto:** El visitante podría interpretar un respaldo comercial como garantía de resultados, de recursos o supervisión institucional.  
**Evidencia:** “Nuestro Fideicomiso está avalado por:”  
**Recomendacion:** Verificar el bloque visual y la documentación del supuesto aval. Identificar en texto a la entidad, su función y el alcance preciso del respaldo; sustituir “avalado” si no describe correctamente la relación.  
**Criterio de aceptacion:** El bloque permite conocer quién interviene y en qué calidad; cada afirmación tiene soporte comprobable y no atribuye garantías superiores a las documentadas.

---

**ID: UX-087**  
**Severidad:** Media  
**Confianza:** Alta  
**Estado:** Observado  
**Ubicacion:** `home.txt`, Preguntas Frecuentes → ¿Cuánto cuestan los servicios de asesoría legal y financiera con Mejora Buró?  
**Problema:** La respuesta reconoce costos variables, pero no aporta rangos, componentes ni método de cálculo. La información económica disponible antes del contacto no permite estimar la asequibilidad. Dado que no existe compra en el sitio y la consulta inicial se declara gratuita, esto no acredita cargos ocultos ni una infracción por no publicar precios.  
**Impacto:** Obliga a invertir tiempo en una conversación para comparar alternativas y puede producir abandono cuando se conozca la cotización.  
**Evidencia:** “Los costos pueden variar según el perfil y los servicios que se elijan .” Y: “Durante la asesoría gratuita , compartimos información sobre las opciones disponibles y sus características.”  
**Recomendacion:** Publicar los componentes del costo y, cuando sea viable, rangos o ejemplos con supuestos explícitos. Explicar cuándo se entrega la cotización y qué incluye.  
**Criterio de aceptacion:** Antes de solicitar contacto, el visitante entiende qué es gratuito, qué puede cobrarse y cómo se determina; antes de contratar recibe una cotización desglosada y el total aplicable.

---

No hay sustento textual para señalar **urgencia falsa**: “¡Comienza ahora!” no demuestra escasez ni plazos ficticios. Tampoco encontré promesas de borrar registros del buró, porcentajes garantizados de descuento o resultados asegurados.

“¡Nuestros clientes no dejan de hablar de nosotros!” no basta para afirmar que existen testimonios falsos o no verificables: su contenido podría estar en elementos excluidos de la extracción.

La identidad legal **sí aparece**: “Baui Solutions S.A. de C.V. (en lo sucesivo Mejora Buró)”, junto con domicilio. El aviso también reconoce derechos ARCO y revocación. Estas menciones no acreditan cumplimiento integral, pero impiden reportarlas como ausentes.

---

## Sonnet 5 (Claude) — contenido y microcopy

**Rango:** UX-050 – UX-079

_Pendiente. Se lanza cuando exista evidencia de navegador._

---

## gpt-5.6-luna (Codex) — inventario técnico y accesibilidad

**Rango:** UX-100 – UX-129

_Pendiente._

---

## Opus 5 (Claude Code) — embudo real, consentimiento y canal de contacto

**Rango:** UX-130 – UX-149
**Herramientas:** Playwright + Chromium (`~/.venvs/ux`), inspección de DOM computado, descarga directa de HTML.
**Fecha:** 2026-09-17

> **Prueba con envío real autorizada por el usuario.** El protocolo de `CLAUDE.md` prohíbe enviar formularios reales "sin autorización explícita"; el usuario la otorgó expresamente por mandato de trabajo, usando sus propios datos de contacto reales. Envío registrado a las **12:01:19 (hora CDMX)**. El paso 2 NO se envió.

---

ID: UX-136
Severidad: Bloqueador
Confianza: Alta
Estado: Observado
Ubicación: `https://mejoraburo.com.mx/` — formulario `#intro`, `input[name="your-chk"]`
Problema: No existe mecanismo funcional de consentimiento. La frase "Acepto ser contactado a través de la cuenta de WhatsApp verificada de Mejora Buró" se muestra como texto plano, pero la casilla que registraría ese consentimiento está oculta (`display:none`, 0×0 px), **no es obligatoria** y nunca se marca. El formulario se envía igual y el usuario es contactado por WhatsApp sin haber consentido nunca de forma registrable.
Impacto: Ningún usuario otorga consentimiento verificable. La empresa carece de registro de consentimiento para el tratamiento de datos de contacto y patrimoniales. Afecta a la totalidad de los leads.
Evidencia: DOM computado en vivo: `{checked: false, required: false, display: "none", width: 0, height: 0, ariaRequired: null}`. Contraste directo: la página del paso 2 (`/acreedores-homepage/`) presenta **43 casillas perfectamente visibles y funcionales** — la capacidad técnica existe, no se aplicó al consentimiento. Captura: `evidencia/prueba-formulario-lleno-1440x900.png`.
Recomendación: Casilla visible, operable por teclado y obligatoria, desmarcada por defecto, con enlace al Aviso de Privacidad contiguo. El usuario propone además una vista o modal con los términos antes de aceptar; es la solución correcta: no puede consentirse lo que no se puede leer.
Criterio de aceptación: El envío es imposible sin marcar una casilla visible; existe registro por lead con fecha, hora y versión del aviso aceptado.

> **Corrección a UX-003 (Gemini):** lo clasificó Bloqueador porque un usuario de teclado no podría operar la casilla. Al no ser obligatoria, no bloquea el envío. El defecto es distinto y más grave: no bloquea a nadie porque **no recoge el consentimiento de nadie**.

---

ID: UX-134
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: `https://mejoraburo.com.mx/acreedores-homepage/`
Problema: El embudo tiene un segundo paso que no está enlazado desde ninguna página ni anunciado antes de entregar los datos. Solo se accede enviando el formulario. Ninguna auditoría externa, competidor o usuario puede conocerlo sin entregar antes su teléfono.
Impacto: El usuario cree completar un formulario de contacto y aparece en un cuestionario distinto. Impide decisión informada sobre cuánta información va a tener que entregar.
Evidencia: La extracción de todos los `href` internos del home devuelve solo `/`, `/aviso-de-privacidad/`, `/terminos-y-condiciones/`, `/entradas/`. Tras el envío, redirección observada a `/acreedores-homepage/` (título "Acreedores - Mejora Buró"). Capturas: `evidencia/prueba-post-envio-1440x900.png`, `acreedores-completa.png`.
Recomendación: Anunciar el flujo completo antes del primer campo ("2 pasos: tus datos y tus acreedores") o fusionarlo en un único formulario progresivo.
Criterio de aceptación: Antes de escribir el primer dato, el usuario sabe cuántos pasos hay y qué se le pedirá en cada uno.

---

ID: UX-135
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: `/acreedores-homepage/` — secciones Departamentales, Bancos, Financieras y Fintechs, Compradora de cartera
Problema: Escalada de sensibilidad sin aviso. El paso 1 pide un rango aproximado de ingresos; el paso 2 pide la lista nominal de instituciones a las que el usuario debe dinero, incluida si su deuda ya fue vendida a una compradora de cartera. Es un perfil de deuda completo, dato patrimonial sensible, solicitado después de haber entregado ya el teléfono.
Impacto: El usuario no pudo anticipar el nivel de exposición al decidir participar. Agrava las cláusulas de transferencia a terceros señaladas en UX-082: una lista de acreedores tiene alto valor comercial.
Evidencia: 43 casillas agrupadas en 4 categorías, con marcas concretas (Coppel/Bancoppel, Elektra/Banco Azteca, BBVA Bancomer, Santander, Kueski, NU, Finastrategy…). Enlace al Aviso de Privacidad presente en esta página, ausente en el paso 1.
Recomendación: Declarar antes del paso 1 qué datos se pedirán y para qué; recabar consentimiento específico para el perfil de deuda, separado del consentimiento de contacto.
Criterio de aceptación: El usuario ve la finalidad del dato patrimonial antes de proporcionarlo y puede solicitar asesoría sin entregar la lista de acreedores.

---

ID: UX-133
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: Transición de `/` a `/acreedores-homepage/`
Problema: No hay confirmación de envío. El sitio contiene en el DOM el texto "¡Gracias por registrarte! En breve uno de nuestros consultores te contactará a tu WhatsApp", pero **nunca se muestra**: el envío redirige directamente al formulario de acreedores. El usuario no recibe ningún acuse de que sus datos se recibieron, ni plazo, ni el número desde el que será contactado.
Impacto: Incertidumbre en el momento de mayor ansiedad del flujo. Al no publicarse el número emisor, el usuario no puede distinguir un contacto legítimo de una suplantación — vector de fraude frecuente en el sector.
Evidencia: El contenedor `.wpcf7-response-output` permanece `aria-hidden="true"` y vacío; se observó navegación a `/acreedores-homepage/` durante la espera de respuesta. Texto oculto recuperado por DOM.
Recomendación: Acuse explícito con plazo y horario reales, y la línea "Te escribiremos desde el 55 6748 4566". Mantener el acuse aunque se redirija al paso 2.
Criterio de aceptación: Tras enviar, el usuario ve confirmación, plazo comprometido y número emisor; puede verificar la identidad de quien lo contacte.

---

ID: UX-137
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: `/acreedores-homepage/`
Problema: No hay indicador de progreso ni continuidad visual entre pasos. La página de acreedores no indica que sea el paso 2, ni cuántos faltan, ni permite volver sin perder lo enviado.
Impacto: Aumenta el abandono en el punto donde el usuario ya entregó sus datos y la empresa ya asumió el costo de adquisición.
Evidencia: Headings de la página: H1 "Acreedores", H2 "Elige las opciones que apliquen", H3 por categoría. Ningún elemento de progreso. Único botón: "Finalizar".
Recomendación: Indicador "Paso 2 de 2" y contexto de por qué se pide esta información.
Criterio de aceptación: El usuario sabe en todo momento en qué punto del proceso está y cuánto falta.

---

ID: UX-138
Severidad: Media
Confianza: Media
Estado: Observado (el hecho) · Inferido (el impacto)
Ubicación: `/acreedores-homepage/` — viewport móvil 390×844
Problema: 43 casillas distribuidas en 2,931 px de alto en móvil (≈3.5 pantallas de scroll), sin buscador, sin opción "No lo sé" ni "Prefiero no decirlo", y sin posibilidad de continuar sin responder.
Impacto: Carga cognitiva alta en un público con estrés financiero. El abandono en este punto es previsiblemente el comportamiento más común — y ocurre después de que el lead ya fue captado.
Evidencia: `document.body.scrollHeight` = 2931 px a 390 px de ancho; 43 `input[type=checkbox]`, todos visibles. Captura: `evidencia/acreedores-movil-390x844.png`.
Recomendación: Buscador por nombre de institución, categorías colapsadas, y opciones de salida ("No lo sé", "Lo veo con el asesor"). Medir la tasa de abandono de este paso antes de rediseñarlo.
Criterio de aceptación: El paso se completa sin scroll excesivo y existe una ruta válida para quien no conoce o no quiere declarar sus acreedores.

---

ID: UX-130
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: `https://mejoraburo.com.mx/` — formulario `#intro`, campos ocultos
Problema: El formulario transporta cinco campos de rastreo que el usuario no ve ni consiente: `your-utm-src`, `your-utm-mdm`, `your-utm-cmp`, `your-doaffcid` ("Doaff CLICK ID") y `your-ksubid` ("KEITARO SUBID"). Keitaro es un sistema de distribución de tráfico habitual en marketing de afiliados. Cada lead se envía con atribución de afiliado adjunta.
Impacto: Transparencia. El usuario desconoce que su solicitud incorpora identificadores de campaña y de afiliado. Relevante para evaluar el origen del tráfico y la cadena de responsabilidad sobre la publicidad que trajo al usuario.
Evidencia: `placeholder="UTM SOURCE"`, `"UTM MEDIUM"`, `"UTM CAMPAIGN"`, `"Doaff CLICK ID"`, `"KEITARO SUBID"` en el HTML. Validación cruzada: la inspección en navegador reporta solo 4 campos visibles, luego los cinco están ocultos al usuario.
Recomendación: Declarar en el Aviso de Privacidad la recolección de datos de origen y afiliación. Auditar la publicidad que despliegan los afiliados, dado el sector.
Criterio de aceptación: El aviso menciona los datos de origen recabados y existe control documentado sobre las piezas publicitarias de afiliados.

---

ID: UX-131
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: Footer — `https://api.whatsapp.com/send/?phone=5215567484566`
Problema: El enlace de WhatsApp no precarga mensaje (`&text=` ausente) ni parámetro alguno. El usuario llega a un chat vacío y debe redactar desde cero una consulta sobre sus deudas; la empresa recibe el contacto sin contexto ni atribución.
Impacto: Fricción en el arranque de la conversación, en un tema que genera vergüenza. Pérdida total de atribución en un canal que, según el propio modelo de negocio, concentra la conversión.
Evidencia: Único `href` a WhatsApp en todo el HTML, sin parámetros adicionales.
Recomendación: Precargar mensaje ("Hola, quiero saber si soy candidato") e incorporar parámetro de origen por página o campaña.
Criterio de aceptación: Todo contacto entrante por WhatsApp llega con mensaje inicial y origen identificable.

---

ID: UX-132
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: Footer, bloque de contacto
Problema: Existe un único punto de entrada a WhatsApp en todo el sitio, situado en el pie de página, presentado como texto gris (`#797984`) junto al correo, sin botón, icono ni afordancia. En móvil queda a ≈5.4 pantallas de scroll desde el inicio. No hay acceso flotante ni persistente.
Impacto: Quien prefiere preguntar antes de entregar 4 datos personales no encuentra una vía visible. El diseño fuerza el formulario como única ruta practicable.
Evidencia: 1 sola ocurrencia de `api.whatsapp.com` en el HTML; ausencia de widget flotante confirmada en navegador; alto del home en móvil: 4,523 px. Mismo color que incumple contraste en UX-010.
Recomendación: Botón de WhatsApp persistente en móvil, con etiqueta explícita, como alternativa declarada al formulario.
Criterio de aceptación: El acceso a WhatsApp es alcanzable desde cualquier punto del sitio en un toque y se percibe como accionable.

---

### Correcciones a hallazgos de otros agentes

| ID | Autor | Corrección |
|---|---|---|
| UX-003 | Gemini | La casilla **no es obligatoria**; no bloquea el envío. Reencuadrado en UX-136: el defecto es la ausencia de mecanismo de consentimiento, no la barrera de teclado. |
| UX-011 | Gemini | Sí existe un `<h1>`: `<h1 class="site-title">Mejora Buró</h1>`. El defecto real es que el titular del hero no es `h1`. El hallazgo se sostiene; la redacción no. |
| UX-013 | Gemini | "8 iframes" no reproducido: el HTML servido contiene 2 y axe reporta 1 violación `frame-title`. El resto serían inyectados en runtime. Queda **Por validar**. |
| UX-012 | Gemini | **Confirmado visualmente**: la insignia "Google ★★★★★ 4910 reseñas" existe en el hero (`evidencia/prueba-formulario-lleno-1440x900.png`). No era verificable desde el HTML estático por inyectarse en runtime. |
| UX-005 | Gemini | **Confirmado de forma independiente**: la sección de testimoniales está vacía (`evidencia/movil-testimoniales-390x844.png`). |
| UX-001 | Gemini | Separado por niveles de evidencia y reclasificado a **Alta** (no Bloqueador), por estar oculto al usuario. Trasladado al anexo de riesgo regulatorio, fuera del flujo UX. Ver `PLAN_AUDITORIA_UX.md`. |
| UX-084 / UX-006 | astra / Gemini | Mismo hallazgo (términos de marketplace) desde dos fuentes. Consolidar en la entrega como uno solo, conservando ambos IDs como referencias cruzadas. |

---

### Hallazgos de la prueba con envío real (2026-09-17)

ID: UX-153
Severidad: Bloqueador
Confianza: Alta
Estado: Observado
Ubicación: `https://mejoraburo.com.mx/` — script inline, manejador `wpcf7mailsent`
Problema: Todos los datos del formulario se almacenan en una cookie `vik_user_data`, en JSON plano, escrita por JavaScript del lado del cliente y con 30 días de vigencia. El bucle no filtra campos: guarda nombre, correo, teléfono, rango de ingresos y —tras el paso 2— la lista completa de acreedores, acumulándolos. Por estar escrita por JS, la cookie **no puede ser `HttpOnly`**: cualquier script de la página puede leerla con `document.cookie`.
Impacto: El perfil de deuda completo del usuario, con nombre y teléfono, queda legible durante 30 días para los ~70 scripts de terceros publicitarios presentes en el sitio (Taboola, Meta, TikTok, AdRoll, Criteo, PubMatic, TradeDesk, Tapad, Pinterest, Reddit, Stripe). Todo ello sin mecanismo de consentimiento (UX-136).
Evidencia: Código fuente del sitio: `document.addEventListener('wpcf7mailsent', function(event){ ... for(var i=0;i<inputs.length;i++){ obj[inputs[i].name.replace(prefix,'')] = inputs[i].value; } setCookie('vik_user_data', JSON.stringify(obj), 30); })`.
Recomendación: No almacenar datos personales en cookies legibles por cliente. Usar identificador opaco de sesión del lado del servidor y resolver la identidad en backend. Si se mantiene la cookie, limitarla a un token sin PII.
Criterio de aceptación: Ningún dato personal es legible desde `document.cookie`; la vinculación entre pasos se resuelve en servidor.

---

ID: UX-151
Severidad: Bloqueador
Confianza: Alta
Estado: Observado
Ubicación: `/acreedores-homepage/` → página de confirmación (post-3517), scripts inline
Problema: Nombre, correo y teléfono del usuario se transmiten a servidores de terceros dentro de la cadena de consulta de una URL, cargada como pixel invisible de 1×1. Se envían a `mejoraburotracker.com` (Keitaro) y a `tracker2.doaffiliate.net` (red de afiliados), esta última usando el teléfono como identificador de lead.
Impacto: Datos personales en query string quedan registrados en logs de servidor, historial de navegación y cabeceras `referer`. Uso de PII como llave de cruce entre plataformas publicitarias. Transferencia a terceros sin consentimiento recabado.
Evidencia: `postbackurl = 'https://mejoraburotracker.com/6d76ff3/postback?subid=' + obj.ksubid + '&status=lead' + '&vname=' + obj.name + '&vemail=' + obj.email + '&vtel=' + obj.tel;` y `endpoint_doaff = 'https://tracker2.doaffiliate.net/api/mejoraburo-com-mx?type=CPL'` con comentario literal en el código: `//Lead ID sent by us, we use phone number as Lead ID`. El parámetro `type=CPL` confirma modelo de pago por lead a afiliados.
Recomendación: Enviar conversiones mediante identificador anónimo por POST de servidor a servidor, nunca PII en URL. Documentar la transferencia en el aviso de privacidad y condicionarla a consentimiento.
Criterio de aceptación: Ninguna petición saliente contiene nombre, correo o teléfono; las conversiones se reportan con identificador opaco.

---

ID: UX-150
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: Todo el sitio
Problema: El sitio deposita ~70 cookies de terceros publicitarios en la primera visita, sin banner ni mecanismo de consentimiento previo.
Impacto: Seguimiento publicitario sin consentimiento en un sitio que trata datos patrimoniales.
Evidencia: Contexto de navegador limpio: Taboola, `_fbp` (Meta), `_ttp`/`ttcsid` (TikTok), `_rdt_uuid` (Reddit), `_pin_unauth` (Pinterest), `__adroll`, `TDID`/`TDCPM` (TradeDesk), `KRTBCOOKIE`/`PugT` (PubMatic), `CMID`/`CMPS` (Criteo), `TapAd_DID`, `__stripe_mid`/`__stripe_sid`, `_ga`/`_gcl_au`.
Recomendación: Banner de consentimiento con bloqueo previo de etiquetas no esenciales.
Criterio de aceptación: Ninguna cookie no esencial se escribe antes del consentimiento.

> **Corrección a Gemini:** reportó "0 banners de cookies → Limpio". La ausencia de banner no es limpieza; es ausencia de consentimiento.

---

ID: UX-152
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: Página de confirmación tras el paso 2
Problema: Si falla la llamada al rastreador de afiliados, se muestra al usuario una alerta nativa del navegador con jerga interna: "¡Algo salió mal! El cable de Doaff no está registrado."
Impacto: El usuario, que acaba de entregar su perfil de deuda, recibe un mensaje de error técnico incomprensible en el momento de máxima expectativa. Erosiona la confianza y expone detalle de infraestructura.
Evidencia: `error: function() { alert( '¡Algo salió mal! El cable de Doaff no está registrado.' ); }`
Recomendación: Eliminar el `alert`. Los fallos de rastreo deben registrarse en consola o backend, nunca interrumpir al usuario.
Criterio de aceptación: Ningún fallo de analítica o rastreo produce mensajes visibles al usuario.

---

ID: UX-139
Severidad: Alta
Confianza: Alta
Estado: Observado — **CORREGIDO**
Ubicación: Transición paso 1 → paso 2
Problema: **Versión corregida.** La vinculación entre pasos **sí existe**, mediante la cookie `vik_user_data` (ver UX-153). El defecto no es la ausencia de enlace, sino que está implementado en cliente y sin protección. Persisten dos defectos de diseño: la página del paso 2 es accesible públicamente sin haber enviado el paso 1, y no existe indicación de continuidad para el usuario.
Impacto: El flujo depende de una cookie de cliente: si el usuario borra cookies, usa modo privado o cambia de dispositivo entre pasos, la asociación se pierde en silencio y el registro de acreedores llega huérfano.
Evidencia: `/acreedores-homepage/` carga y es operable en contexto de navegador sin cookies previas; los campos ocultos `your-name`, `your-email`, `your-tel` aparecen vacíos en esa condición.
Recomendación: Resolver la continuidad en servidor con identificador de sesión; impedir el acceso directo al paso 2 sin lead asociado, o degradar mostrando los campos de contacto.
Criterio de aceptación: El paso 2 siempre queda asociado a un lead, o se solicita explícitamente el contacto cuando no hay asociación.

> **Registro de la corrección:** la primera versión de UX-139 afirmaba que no existía ningún mecanismo de vinculación. Era incorrecta: se verificó en un contexto de navegador limpio, sin haber enviado el paso 1, condición en la que la cookie aún no existe. Se conserva el ID y se documenta el error conforme a `CLAUDE.md`.

---

### UX-140 · Canal conversacional de WhatsApp — NO EVALUABLE

Severidad: —
Confianza: Alta
Estado: **Pendiente — no se pudo evaluar**
Problema: La evaluación del canal de WhatsApp no pudo realizarse porque **ningún asesor estableció contacto** con ninguno de los dos leads de prueba.

**Diseño del experimento y resultado:**

| Brazo | Nombre | Teléfono | Paso 2 | T0 | Resultado |
|---|---|---|---|---|---|
| A | Amauri | 220 680 6340 | Abandonado | 12:01 | Sin contacto |
| B | Carlos | 5579002713 | Completado | ~12:50 | Sin contacto |

Variable controlada: rango de ingresos idéntico ($21,000–$40,000) en ambos brazos. Ambos envíos ocurrieron en día hábil dentro del horario declarado por el propio sitio ("lunes a viernes de 9 a 7pm").

**Lectura:** no se puede evaluar tiempo de primera respuesta, calidad del handoff, identificación del asesor, solicitud de datos, mención de precio, promesas de resultado ni respeto de la baja. La ausencia de contacto no permite concluir que nunca contacten: solo que **no lo hicieron dentro de la ventana observada**, y que el brazo que completó el flujo íntegro no obtuvo mejor trato que el que lo abandonó.

Pendiente de validar con el cliente: si el primer contacto es automático o manual, cuál es su SLA comprometido y qué porcentaje de leads recibe contacto efectivo.

---

## Opus 5 — cruce con briefing del cliente y crawl externo (UX-141 a UX-149)

Añadido el 2026-09-17, después de la entrega del deck. Dos fuentes nuevas:

1. **Briefing del cliente** (reunión del 2026-09-14). Define meta comercial, criterios de lead calificado, stack y decisiones ya acordadas.
2. **Crawl externo tipo Semrush** (`mejora_buro_issues_overview_report.csv`, 82 problemas sobre 486–2,099 URLs), compartido por el cliente.

### Contexto del briefing que cambia el estado de la auditoría

- **Público objetivo confirmado** (deja de ser hipótesis): NSE C+ a C−, deuda vencida superior a $20,000 MXN, historial crediticio afectado, dificultad por falta de educación financiera. Créditos con **Banco Azteca y Coppel NO son elegibles**.
- **Meta comercial:** 30,000 leads calificados en 12 meses.
- **Modelo de negocio declarado:** "entidad dedicada a la **compra de deudas**".
- **Stack:** CRM **WATI**; libertad total concedida para modificar sitio, formularios y recorrido.
- **Decisiones ya acordadas:** chatbot de IA en WhatsApp; medición server-side vía GTM; uso del marco de madurez de KFC/Enterprise.

---

ID: UX-141
Severidad: Bloqueador (comercial)
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — formulario paso 1 y `/acreedores-homepage/`
Problema: El sitio nunca captura el criterio de calificación principal del negocio. El briefing define el lead calificado por **monto de deuda mayor a $20,000 MXN**; el paso 1 pregunta rango de *ingresos* y el paso 2 pregunta *quién* le cobra. Ningún campo pregunta cuánto debe.
Impacto: Imposible filtrar leads contra la meta de 30,000 sin llamada humana. Se paga CPL a redes de afiliados por volumen no calificable.
Evidencia: Campos del paso 1 (nombre, correo, WhatsApp, rango de ingresos) y 43 casillas de acreedores en el paso 2. Criterio de calificación declarado en el briefing del 2026-09-14.
Recomendación: Añadir un campo de rango de deuda total en el paso 1, o capturarlo en la capa conversacional de WhatsApp antes del handoff al asesor.
Criterio de aceptación: Todo lead entregado al CRM incluye un rango de deuda que permite clasificarlo como calificado o no sin intervención humana.

---

ID: UX-142
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/acreedores-homepage/
Problema: El paso 2 ofrece explícitamente acreedores que el negocio no acepta. El briefing establece que los créditos con Banco Azteca y Coppel no son elegibles, pero ambos figuran entre las 43 casillas seleccionables.
Impacto: Se captan, procesan y pagan leads que se descartan por definición. Desperdicio directo de presupuesto de medios y de tiempo comercial.
Evidencia: Las 43 casillas incluyen "Coppel/Bancoppel" y "Elektra/Banco Azteca" (ver UX-135).
Recomendación: Retirar esas opciones, o mantenerlas y usarlas como filtro de descalificación inmediata con un mensaje honesto al usuario.
Criterio de aceptación: Ningún lead cuya única deuda sea con acreedores no elegibles llega al equipo comercial.

---

ID: UX-143
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: https://mejoraburo.com.mx/ — hero y FAQ
Problema: La comunicación del sitio contradice el modelo de negocio declarado. El briefing describe la operación como compra de deudas; el sitio se define en su FAQ como "educación y herramientas para organizar su panorama".
Impacto: Agrava UX-085. No es un desajuste de tono entre hero y FAQ: es una discrepancia entre lo que el negocio hace y lo que comunica. En sector YMYL con compra de cartera, es exposición regulatoria además de fricción de conversión.
Evidencia: Hero "Pagar menos al mes…"; FAQ "¿Qué hacemos?" define educación financiera; briefing del cliente define compra de deudas.
Recomendación: Alinear la propuesta de valor con el servicio real, explicando el modelo en lenguaje llano antes de capturar datos.
Criterio de aceptación: Un usuario puede describir correctamente qué hace la empresa después de leer solo la portada.

---

ID: UX-144
Severidad: Media
Confianza: Media
Estado: Por validar
Ubicación: Cadena de tratamiento de datos — frontend y Aviso de Privacidad
Problema: El briefing indica que el cliente usa **WATI** como CRM para centralizar leads, pero WATI no aparece en ningún punto de la cadena de datos observada en el frontend (cookie, postbacks, formulario).
Impacto: No se puede verificar si WATI está declarado como encargado del tratamiento ni en qué momento recibe la PII.
Evidencia: La auditoría mapeó PII hacia `vik_user_data`, `mejoraburotracker.com` (Keitaro) y `tracker2.doaffiliate.net`. Ninguna llamada a WATI fue observada.
Recomendación: Solicitar al cliente el diagrama de flujo de datos y verificar que el Aviso de Privacidad declare a WATI como encargado.
Criterio de aceptación: El Aviso de Privacidad enumera a todos los encargados reales del tratamiento.

---

ID: UX-145
Severidad: — (corrección de estado, no defecto)
Confianza: Alta
Estado: Confirmado por el cliente
Ubicación: `PLAN_AUDITORIA_UX.md` §2, `BITACORA_UX.md` Estado actual
Problema: El público objetivo estaba marcado como hipótesis "Por validar". El briefing del cliente lo define formalmente.
Impacto: Toda conclusión que dependía de la hipótesis de público pasa de "Por validar" a sustentada.
Evidencia: Briefing del 2026-09-14: NSE C+ a C−, deuda > $20,000 MXN, historial afectado, falta de educación financiera.
Recomendación: Actualizar plan y bitácora. Ya hecho en esta entrada.
Criterio de aceptación: Ningún documento del proyecto sigue presentando el público objetivo como suposición del equipo auditor.

---

ID: UX-146
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: Todo el sitio — encabezados HTTP de respuesta
Problema: El sitio no envía ninguno de los cinco encabezados de seguridad básicos: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options` ni `Referrer-Policy`.
Impacto: Agrava directamente UX-153. La remediación propuesta para la cookie con PII (restringir acceso vía CSP) no parte de una política mal configurada: parte de cero. Los ~70 scripts de terceros no tienen ninguna barrera técnica. Sin CSP, un CMP de cookies no puede garantizar bloqueo real.
Evidencia: Crawl externo — 2,099 URLs afectadas (98.27% del sitio) para los cinco encabezados.
Recomendación: Habilitar los cinco encabezados en servidor o CDN. Desplegar CSP primero en modo `report-only` para medir qué se rompería antes de bloquear.
Criterio de aceptación: Los cinco encabezados presentes en todas las respuestas; CSP en modo enforce sin romper funcionalidad.

---

ID: UX-147
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: Todo el sitio — plantilla (tema de WordPress)
Problema: Los defectos de accesibilidad detectados en la portada no son de la portada: son de la plantilla, y se replican en el sitio completo.
Impacto: Eleva la severidad y el retorno de las correcciones. Un solo cambio en el tema corrige 486 páginas.
Evidencia: Crawl externo sobre 486 URLs. Contraste insuficiente: 486/486 (100%). Marcos sin `title`: 486/486 (100%). Enlaces sin texto discernible: 486/486 (100%). Selector sin nombre accesible: 8 URLs. h1 múltiple: 57 URLs. Saltos de nivel de encabezado: 299 URLs. Coincide con lo detectado por axe-core en la portada: verificación cruzada entre dos metodologías independientes.
Recomendación: Corregir foco visible, contraste, etiquetas y `title` de iframes en el tema, antes de cualquier optimización página por página.
Criterio de aceptación: Un nuevo crawl reporta cero URLs con esas tres reglas.

---

ID: UX-148
Severidad: Alta
Confianza: Alta
Estado: Observado
Ubicación: Todo el contenido publicado, incluido el blog
Problema: El nivel de lectura del sitio excluye a su propio público objetivo. El 58% de las páginas (283 URLs) requiere nivel de estudios superiores para leerse con fluidez, y otro 38% (187 URLs) está en el escalón más difícil de la escala Flesch.
Impacto: El briefing define el público como NSE C+ a C− con dificultades derivadas de **falta de educación financiera**. Una empresa que vende educación financiera redacta como si el lector ya la tuviera. Conecta con UX-143 y UX-085.
Evidencia: Crawl externo — "Contenido: Lectura difícil" 283 URLs (58.23%); "Lectura muy difícil" 187 URLs (38.48%).
Recomendación: Reescribir hero, FAQ y la pantalla de acreedores con frases cortas y vocabulario cotidiano. Fijar un umbral de legibilidad como requisito de publicación.
Criterio de aceptación: Ninguna página crítica del embudo supera el umbral de dificultad acordado.

---

ID: UX-149
Severidad: Media
Confianza: Alta
Estado: Observado
Ubicación: Todo el sitio
Problema: Higiene técnica descuidada a escala: 19 URLs internas devuelven error 4xx, 470 imágenes (41%) tienen atributo `alt` vacío, 157 URLs (32%) no tienen meta description y una URL está marcada con `noindex`.
Impacto: Enlaces rotos en la navegación; 470 imágenes invisibles para lectores de pantalla y buscadores; una página potencialmente importante fuera del índice.
Evidencia: Crawl externo — "Códigos de respuesta: Error de cliente interno (4xx)" 19 URLs; "Imágenes: Falta texto ALT" 470; "Meta description: Falta" 157; "Directivas: Noindex" 1.
Recomendación: Identificar cuál es la URL con `noindex`; si es de conversión, es fuga silenciosa. Corregir los 4xx y establecer `alt` obligatorio en el flujo editorial.
Criterio de aceptación: Cero 4xx internos; ninguna imagen de contenido sin `alt`; `noindex` solo donde sea intencional.

---

### Nota metodológica sobre el crawl externo

El reporte no contiene ningún "Error" crítico: son 4 problemas, 37 avisos y 41 oportunidades. Nada está roto para los buscadores. Es un sitio funcional pero descuidado, y conviene presentarlo así: exagerar la gravedad es arriesgado cuando el cliente puede correr el mismo reporte.

**Matiz sobre rendimiento:** la auditoría calificó el rendimiento percibido con 6/10 ("lo mejor del sitio", FCP 1.8 s, TTFB 1.1 s). Ese dato es de la portada y sigue siendo válido, pero el crawl reporta JavaScript duplicado, heredado y sin usar, más recursos que bloquean el renderizado, en el 94% de las páginas. El 6/10 sobreestima al sitio completo.

---

## Integración — priorización final

Cerrada el 2026-09-17. 45 hallazgos. Prioridad por impacto y esfuerzo.

### Quick wins — bajo esfuerzo, alto impacto

| # | Hallazgo | Acción | Esfuerzo |
|---|---|---|---|
| 1 | UX-136 | Casilla de consentimiento visible, obligatoria y operable por teclado, con enlace al Aviso contiguo | Horas |
| 2 | UX-146 | Habilitar los cinco encabezados de seguridad en servidor o CDN | Horas |
| 3 | UX-152 | Eliminar el `alert()` nativo de error de afiliados | Minutos |
| 4 | UX-006 / UX-084 | Sustituir los términos de marketplace por términos de asesoría financiera | Días (legal) |
| 5 | UX-002 / UX-010 | Etiqueta accesible para el selector y contraste del menú a ratio ≥4.5:1 | Horas |
| 6 | UX-012 | Enlazar o retirar la insignia de reseñas de Google | Minutos |
| 7 | UX-001 | Purgar `brand-logos.png` del servidor, o transparentar el respaldo fiduciario | Horas (decide Legal) |

### Cambios estructurales

| # | Hallazgo | Acción | Esfuerzo |
|---|---|---|---|
| 1 | UX-153 / UX-146 | Eliminar la cookie con PII; sesión con token opaco en backend | Semanas |
| 2 | UX-151 / UX-130 | Migrar postbacks de afiliados a server-to-server con ID anónimo | Semanas |
| 3 | UX-147 | Corregir accesibilidad en la plantilla: foco, contraste, etiquetas, `title` de iframes | Semanas |
| 4 | UX-134 / UX-135 / UX-141 / UX-142 | Rediseñar el embudo: anunciar los 2 pasos, buscador de acreedores, capturar monto de deuda, filtrar acreedores no elegibles | Semanas |
| 5 | UX-140 | Capa conversacional de IA en WhatsApp con acuse inmediato y precalificación | Semanas |
| 6 | UX-148 / UX-143 | Reescribir el contenido al nivel de lectura del público real y alinear la propuesta de valor | Semanas |
| 7 | UX-150 | CMP de cookies con bloqueo previo al consentimiento (requiere UX-146) | Semanas |

### Fuera del flujo UX

- **UX-001** — riesgo regulatorio, enrutado a Dirección Legal del cliente.
- **UX-140** — canal de WhatsApp: no evaluable, requiere información del cliente.
- **UX-144** — WATI en la cadena de datos: por validar con el cliente.

