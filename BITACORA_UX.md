# Bitácora de UX/UI

Esta bitácora conserva el historial de auditorías, decisiones y mejoras. No borrar entradas anteriores.

## Estado actual

- Proyecto: Mejora tu buro
- Protocolo: `CLAUDE.md`
- Plan de trabajo: `PLAN_AUDITORIA_UX.md`
- Última auditoría: 2026-09-17 — Fase 0 (reconocimiento de contenido, sin navegador)
- URL principal: https://mejoraburo.com.mx/
- Público objetivo: Hipótesis por validar — adulto mexicano 25–55 años con deuda vencida o sobreendeudamiento, historial afectado en buró, ingreso $0–$40k mensuales
- Tarea principal a validar: Entender si el servicio aplica a mi situación y dejar mis datos para ser contactado (sin enviar el formulario real)

## Plantilla de nueva auditoría

### AAAA-MM-DD — [URL o nombre del flujo]

**Objetivo:**

**Alcance:**

- URLs/pantallas:
- Viewports:
- Tareas probadas:
- Herramientas:

**Evidencia recopilada:**

- Screenshots:
- Código/Figma:
- Auditoría de accesibilidad:
- Datos o feedback:

**Hallazgos:**

| ID | Severidad | Confianza | Estado | Ubicación | Problema | Recomendación |
|---|---|---|---|---|---|---|
| UX-001 | — | — | — | — | — | — |

**Decisiones tomadas:**

1. —

**Cambios realizados:**

1. —

**Pendientes y validación con usuarios:**

1. —

**Resultado posterior:**

- Conversión/éxito:
- Problemas resueltos:
- Problemas abiertos:

---

## Entradas

### 2026-09-17 — https://mejoraburo.com.mx/ — Fase 0: reconocimiento

**Objetivo:** Definir alcance, público hipotético y reparto de trabajo entre agentes antes de auditar.

**Alcance:**

- URLs/pantallas: portada (solo contenido HTML)
- Viewports: ninguno — **sin navegador disponible**
- Tareas probadas: ninguna. No hubo interacción, ejecución de JS ni capturas.
- Herramientas: fetch de contenido HTML → markdown

**Evidencia recopilada:**

- Screenshots: ninguno
- Código/Figma: contenido de la portada (hero, CTAs, formulario, navegación, footer)
- Auditoría de accesibilidad: no ejecutada
- Datos o feedback: ninguno

**Hallazgos:** ninguno todavía. Esta entrada no contiene hallazgos porque sin navegador no hay evidencia de comportamiento; emitir hallazgos aquí violaría la regla de no inventar problemas.

**Decisiones tomadas:**

1. El sitio es un funnel de generación de leads (sin login ni compra); la tarea principal se define como "evaluar si aplico y dejar mis datos", no una conversión transaccional.
2. **Prohibido enviar el formulario**: dispara contacto de un consultor humano real por WhatsApp. Se audita hasta el botón de envío, sin pulsarlo.
3. Público objetivo asumido como hipótesis explícita y marcado "Por validar" (`CLAUDE.md` lo permite cuando no se define).
4. Reparto por modelo: Opus 5 coordina y juzga evidencia; gpt-6-astra investiga contexto regulatorio y competencia; gpt-5.6-luna hace inventario técnico; Sonnet 5 redacta hallazgos; Gemini 3.8 Flash captura evidencia en navegador.
5. Rangos de ID asignados por agente para evitar colisiones (ver `PLAN_AUDITORIA_UX.md` §5).

**Cambios realizados:**

1. Creado `PLAN_AUDITORIA_UX.md` con flujos, fases, prompts ejecutables y bitácora de delegación.
2. Actualizado el "Estado actual" de esta bitácora con URL, hipótesis de público y tarea principal.

**Pendientes y validación con usuarios:**

1. **Bloqueador:** conseguir navegador para la Fase 1 (Gemini/Antigravity, instalar `agent-browser` + Chromium, o capturas manuales del usuario).
2. Confirmar el público objetivo real con analítica o entrevistas.
3. Verificar si Codex tiene acceso a red antes de gastar en investigación con astra.
4. Solicitar al dueño evidencia del estado post-envío (confirmación y mensaje de WhatsApp), inauditable sin enviar el formulario.

**Resultado posterior:**

- Conversión/éxito: sin medir — no hay acceso a analítica
- Problemas resueltos: —
- Problemas abiertos: —

---

### 2026-09-17 — https://mejoraburo.com.mx/ — Fase 1: Evidencia en navegador

**Objetivo:** Capturar evidencia visual, técnica y de interacción en navegador real (Chromium Headless / Playwright) para resolver las 4 preguntas abiertas del equipo y emitir los hallazgos observados en los rangos UX-001 a UX-049.

**Alcance:**
- URLs/pantallas: Portada (`/`), Aviso de privacidad (`/aviso-de-privacidad/`), Términos y condiciones (`/terminos-y-condiciones/`), Blog (`/entradas/`).
- Viewports: Desktop 1440×900 y Móvil 390×844.
- Tareas probadas: Inspección visual de elementos, navegación por teclado (Tab en 39 pasos), interacción con formulario (sin pulsar envío), evaluación de contraste computado, análisis de overflow y touch targets en móvil, ejecución de axe-core 4.10.2 y exportación de árbol de accesibilidad por CDP.
- Herramientas: Google Chrome / Chromium Headless (Playwright v1.63), axe-core v4.10.2, Chrome DevTools Protocol (Accessibility.getFullAXTree).

**Evidencia recopilada:**
- Screenshots: Guardados en `./evidencia/` (`home-1440x900.png`, `home-movil-390x844.png`, `hero-1440x900.png`, `hero-movil-390x844.png`, `bloque-fideicomiso-aval-1440x900.png`, `bloque-fideicomiso-contexto-1440x900.png`, `bloque-fideicomiso-movil-390x844.png`, `seccion-como-funciona-1440x900.png`, `seccion-testimoniales-1440x900.png`, `seccion-faq-1440x900.png`, `seccion-footer-1440x900.png`, `formulario-desktop-1440x900.png`, `formulario-select-desplegado-1440x900.png`, `formulario-movil-390x844.png`, `formulario-checkbox-tras-clic.png`, `terminos-1440x900.png`, `terminos-texto-marketplace-1440x900.png`, `aviso-privacidad-1440x900.png`, `blog-entradas-1440x900.png`, `menu-movil-abierto-390x844.png`, `teclado-foco-step-*.png`, `brand-logos.png`).
- Datos técnicos: `arbol-accesibilidad.json`, `axe-report.json`, `teclado-tab-log.json`, `auditoria-datos-completos.json`.
- Auditoría de accesibilidad: axe-core reportó 7 violaciones (2 críticas: `select-name`, `image-alt`; 3 serias: `color-contrast`, `link-name`, `frame-title`; 2 moderadas: `page-has-heading-one`, `region`).

**Hallazgos:**

| ID | Severidad | Confianza | Estado | Ubicación | Problema | Recomendación |
|---|---|---|---|---|---|---|
| UX-001 | Bloqueador | Alta | Observado | Portada / Footer (.kc-css-303631) | Texto de aval y logos de CNBV, Buró y CONDUSEF ocultos con `display: none` en CSS de producción pero presentes en DOM. | Retirar del DOM si no hay aval oficial o transparentar número de registro fiduciario si existe. |
| UX-002 | Alta | Alta | Observado | Portada / Formulario (#intro) | Formulario capta 4 campos obligatorios (nombre, correo, WhatsApp, ingresos) en vez de 1; `<select>` sin label accesible. | Añadir `<label for="amount">` e informar finalidad de cada dato. |
| UX-003 | Bloqueador | Alta | Observado | Portada / Formulario (#intro) | Checkbox de WhatsApp tiene `display: none`: invisible visualmente e inalcanzable por teclado. | Renderizar casilla accesible con soporte de foco y teclado. |
| UX-004 | Alta | Alta | Observado | Portada / Formulario (#intro) | No hay enlace ni texto del Aviso de Privacidad en el formulario; solo en el footer lejano. | Insertar enlace directo al Aviso de Privacidad contiguo al consentimiento. |
| UX-005 | Alta | Alta | Observado | Portada / Testimoniales (#testimoniales) | Sección de testimonios totalmente vacía; widget de Trustindex falla y renderiza `<div></div>` vacío. | Reparar widget o maquetar testimonios estáticos verificables. |
| UX-006 | Alta | Alta | Observado | Términos y Condiciones (/terminos-y-condiciones/) | Cláusulas activas de marketplace (calificaciones, réplicas, operaciones entre usuarios) ajenas a reestructura de deuda. | Reemplazar por términos redactados para asesoría financiera legal. |
| UX-007 | Media | Alta | Observado | Portada / Navegación global | Orden de tabulación alterado: foco inicia en formulario y menú de cabecera solo recibe foco al final tras 34 pasos. | Reordenar DOM y tabulación para respetar flujo natural de lectura. |
| UX-008 | Media | Alta | Observado | Portada / Global | 36 de 39 elementos interactivos carecen de indicador de foco visible (`outline: none`). | Implementar estilos globales para `:focus-visible`. |
| UX-009 | Media | Alta | Observado | Portada / Footer móvil | 11 enlaces en móvil miden 20-22 px de altura, incumpliendo el mínimo de 24×24 px (WCAG 2.5.8). | Incrementar padding y line-height en móvil a mínimo 44×44 px. |
| UX-010 | Baja | Alta | Observado | Portada / Menú superior (#masthead) | Texto de opciones de menú (`#797984`) sobre blanco tiene ratio 4.3:1 (falla mínimo WCAG AA de 4.5:1). | Oscurecer color a `#595965` o superior. |
| UX-011 | Baja | Alta | Observado | Portada / Hero | La página no tiene ningún encabezado `<h1>`. | Asignar `<h1>` al título principal del Hero. |
| UX-012 | Media | Alta | Observado | Portada / Hero | Distintivo "Google ★★★★★ 4910 reseñas" no es clickeable ni verificable (`href: null`). | Enlazar a la ficha real de Google Maps de la empresa. |
| UX-013 | Media | Alta | Observado | Portada / Scripts y Footer | Secuencia de teclado pasa por 8 `<iframe>` sin título accesible (`frame-title`). | Añadir atributo `title` descriptivo y `tabindex="-1"` si son técnicos. |

**Decisiones tomadas:**
1. Verificado y documentado mediante screenshots que los logos de CNBV, Buró de Entidades Financieras y CONDUSEF sí residen en la imagen `brand-logos.png` del servidor, pero fueron ocultados visualmente con `display: none`.
2. Verificado que el formulario no es de un solo campo: exige 4 datos personales y patrimoniales.
3. Se respetó la regla dura de no enviar el formulario.

**Cambios realizados:**
1. Documentados los hallazgos UX-001 a UX-013 en `auditoria-ux.md` sección Gemini 3.8 Flash.
2. Capturados 22 screenshots y 4 archivos de datos técnicos en `./evidencia/`.

**Pendientes y validación con usuarios:**
1. Validar el flujo post-envío (pantalla de gracias y contacto por WhatsApp) mediante material proporcionado por el cliente o entorno de pruebas controlado.
2. Pasar reporte a Sonnet y Opus para integración con los hallazgos de astra (UX-080 a UX-087).

**Resultado posterior:**
- Problemas resueltos en auditoría: 4 preguntas abiertas resueltas con evidencia fotográfica y forense.
- Bloqueador de Fase 1 superado.

