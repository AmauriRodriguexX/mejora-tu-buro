# Bitácora de UX/UI

Esta bitácora conserva el historial de auditorías, decisiones y mejoras. No borrar entradas anteriores.

## Estado actual

- Proyecto: Mejora tu buró — cliente **Baui Solutions S.A. de C.V.**, sitio https://mejoraburo.com.mx/
- Protocolo: `CLAUDE.md` · Plan: `PLAN_AUDITORIA_UX.md` · Hallazgos: `auditoria-ux.md`
- Última auditoría: **2026-09-17 — Fases 0 a 5 completadas. 45 hallazgos.**
- **Público objetivo (CONFIRMADO por el cliente en briefing del 2026-09-14):** NSE C+ a C−, deuda vencida superior a $20,000 MXN, historial crediticio afectado, dificultad por falta de educación financiera. **Créditos con Banco Azteca y Coppel NO son elegibles.**
- Meta comercial del cliente: 30,000 leads calificados en 12 meses. CRM: WATI.
- Entregable: `entrega-final/` y consolidado en `Mejora Buró _ Pitch sep 2026.pptx` (35 slides; 1–28 UX, 29–35 SEO de otros compañeros).

### Pendientes abiertos — al cierre del 2026-09-17

Cualquier agente que retome el proyecto empieza por aquí. Ordenados por urgencia.

**1. Dos datos rebatibles siguen en el pitch.** Son el riesgo más alto: si el equipo técnico del cliente los verifica y no cuadran, pone en duda los otros 43 hallazgos. Ambos están corregidos en `auditoria-ux.md` §Correcciones pero **no** en el deck.

- Diapositiva *"Navegación con teclado: 39 pasos…"* dice **"8 iframes"**. No se reprodujo: el HTML servido tiene 2 y axe reporta 1. Texto propuesto: *"Pasos 27 a 34 quedan atrapados en iframes técnicos sin atributo title. El HTML servido contiene 2; el resto se inyecta en runtime (pendiente de verificar en producción)."*
- Diapositiva *"axe-core 4.10.2: 7 violaciones…"* dice **"La portada carece de un encabezado `<h1>`"**. Sí existe un `<h1 class="site-title">`. Texto propuesto: *"El único `<h1>` de la portada es el nombre del sitio en la cabecera, no el titular del hero. El mensaje principal queda fuera de la jerarquía semántica."*

**2. Contenido de otro cliente filtrado en la sección SEO.** Las diapositivas finales del pitch (*"De SEO a SxO | El Futuro de la Búsqueda"*) mencionan `AutoDealer`, `Offers`, `Vehicles` e *"influencers de aventura detonando búsquedas off-road"*. Es material de una automotriz, copiado tal cual en un pitch de reestructura de deuda. Avisar a quien armó esa sección.

**3. Diapositivas duplicadas en la sección SEO.** *"Resumen ejecutivo"* aparece dos veces seguidas, y *"De SEO a SxO | El Futuro de la Búsqueda"* también. Cuatro slides, dos contenidos.

**4. Diapositiva mal ubicada.** *"Los datos de cada prospecto viajan sin ninguna protección activada"* quedó entre *"La cookie vik_user_data"* y *"Transmisión de PII a redes de afiliados"*. Está escrita como cierre del bloque: debe ir **después** de la de afiliados. Se arregla moviéndola una posición.

**5. Códigos `UX-###` a medias en el pitch.** La Síntesis Ejecutiva quedó limpia, pero siguen ~20 códigos internos repartidos en el resto (`[UX-136]`, `[UX-153]`, `[UX-001]`, `[UX-140]`…). Decisión del responsable: quitarlos todos o dejarlos todos. Cosmético.

**6. Modelo de Madurez UX ausente.** El deck original tenía una diapositiva con puntuación 0–10 en 8 dimensiones (promedio **2.6/10, nivel WALK**), documentada en `entrega-final/README.md`. Se perdió al editar. **El briefing la vuelve obligatoria:** fue decisión acordada usar el marco de madurez de KFC/Enterprise.

**7. `entrega-final/README.md` desactualizado.** Dice 25 slides con un mapeo que ya no corresponde a ninguna versión viva del deck.

**8. Bloque de microcopy nunca ejecutado.** El rango UX-050 a UX-079 (contenido y UX writing, flujo F8 del plan) quedó sin dueño. Es el único flujo del plan sin hallazgos. UX-148 lo toca de lado pero no lo sustituye.

**9. Pendientes de validar con el cliente.** Sin acceso a GA4. Sin confirmación del SLA de WhatsApp ni del tipo de ruteo. Sin respuesta de Legal sobre el fideicomiso (UX-001). Sin diagrama de flujo de datos que ubique a WATI (UX-144).

### Notas operativas para quien retome

- **El rango de IDs de Opus (UX-130–149) está agotado.** Nuevos hallazgos deben abrir un rango nuevo.
- **Numerar diapositivas por título, no por número.** El deck se editó en paralelo en Google Slides y la numeración se desfasó varias veces durante el proyecto.
- **El entregable al cliente no menciona modelos de IA.** Internamente se documenta el reparto por agente; de cara al cliente es trabajo del equipo. La única mención legítima a Gemini es la diapositiva de costos del chatbot, donde Gemini es el producto propuesto.
- **La PII de los leads de prueba (nombres y teléfonos reales) se dejó en el Anexo B a petición del responsable**, como evidencia. Revisar antes de cualquier distribución externa.

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

---

### 2026-09-17 — Fases 2 a 5: investigación, prueba con envío real, entrega y consolidación en pitch

**Objetivo:** Cerrar la auditoría, producir el entregable ejecutivo y consolidarlo en el pitch comercial del 23 de septiembre.

**Alcance:**

- URLs/pantallas: portada, `/acreedores-homepage/`, aviso de privacidad, términos y condiciones, blog.
- Viewports: 1440×900 y 390×844.
- Tareas probadas: flujo de conversión completo **incluido el envío real** (ver decisión 1), inspección de cookies y red, análisis de postbacks a redes de afiliados.
- Herramientas: Chromium headless, axe-core 4.10.2, CDP, inspección de red y `document.cookie`.
- Fuentes documentales nuevas: briefing del cliente (2026-09-14) y crawl externo tipo Semrush compartido por el cliente.

**Evidencia recopilada:**

- 40+ screenshots y 4 archivos de datos en `./evidencia/`.
- `mejora_buro_issues_overview_report.csv` — 82 problemas sobre 486–2,099 URLs.
- Notas del briefing del 2026-09-14.

**Hallazgos:** 45 en total. Se añadieron en esta fase:

| ID | Severidad | Confianza | Estado | Problema |
|---|---|---|---|---|
| UX-130 a UX-140 | Variada | Alta | Observado | Embudo real de 2 pasos, consentimiento inexistente, canal de WhatsApp |
| UX-150 a UX-153 | Bloqueador/Media | Alta | Observado | Cookie con PII, postbacks con PII en URL, alert nativo, CMP ausente |
| UX-141 | Bloqueador | Alta | Observado | El formulario no captura el monto de deuda, que es el criterio de calificación |
| UX-142 | Alta | Alta | Observado | El paso 2 ofrece acreedores no elegibles (Azteca, Coppel) |
| UX-143 | Alta | Alta | Observado | El sitio comunica "educación financiera"; el negocio es compra de deudas |
| UX-144 | Media | Media | Por validar | WATI no aparece en la cadena de datos observada |
| UX-145 | — | Alta | Confirmado | Público objetivo deja de ser hipótesis |
| UX-146 | Alta | Alta | Observado | Cero encabezados de seguridad HTTP en el 98% del sitio |
| UX-147 | Alta | Alta | Observado | Los defectos de accesibilidad son de la plantilla: 486 páginas |
| UX-148 | Alta | Alta | Observado | El nivel de lectura excluye al público objetivo del propio cliente |
| UX-149 | Media | Alta | Observado | 19 URLs 4xx, 470 imágenes sin alt, 157 sin meta description, 1 noindex |

**Decisiones tomadas:**

1. **Se levantó la prohibición de enviar el formulario**, con autorización explícita del responsable del proyecto. Sin ella no era posible auditar el paso 2 ni el canal de WhatsApp. Se enviaron dos leads de prueba controlados con variable única (paso 2 completado vs. abandonado). Resultado: ningún asesor contactó a ninguno en la ventana observada (UX-140). **Cualquier prueba futura requiere autorización nueva.**
2. **UX-001 reclasificado** de Bloqueador a Alta y movido a anexo: está oculto al usuario, por lo que no bloquea ninguna tarea. Es riesgo jurídico, no UX. Se enruta a Dirección Legal del cliente.
3. **Verificación cruzada:** Opus reprodujo de forma independiente los hallazgos de Gemini y corrigió cuatro (UX-003, UX-011, UX-012, UX-013). Ver §Correcciones en `auditoria-ux.md`.
4. **El crawl externo del cliente valida la auditoría** desde una metodología distinta y la extiende de 4 páginas a 486. Presentarlo siempre como triangulación, nunca como trabajo de campo propio.
5. **Se purgaron del entregable las referencias a modelos de IA** (Gemini, Codex, Claude). Internamente se documenta el reparto por agente; el entregable al cliente se presenta como trabajo del equipo. La diapositiva de metodología fue eliminada.

**Cambios realizados:**

1. `entrega-final/auditoria-ux-mejoraburo-t2o.pptx` — deck ejecutivo.
2. `entrega-final/diapositiva-ia-whatsapp.pptx` — capa conversacional de IA con costos Gemini.
3. `entrega-final/lote2-hallazgos-crawl.pptx` — 3 diapositivas del cruce con el crawl.
4. Consolidación en `Mejora Buró _ Pitch sep 2026.pptx` (35 slides: 1–28 UX, 29–35 SEO de otros compañeros).
5. `auditoria-ux.md` — añadidos UX-141 a UX-149 y §Integración con la priorización final.

**Pendientes:**

Ver la sección **"Pendientes abiertos"** al inicio de este archivo.

**Resultado posterior:**

- Conversión/éxito: sin medir. Sigue sin haber acceso a analítica (GA4).
- Problemas abiertos: los 45 hallazgos siguen sin corregir en producción. La auditoría diagnostica; la remediación es fase posterior.
