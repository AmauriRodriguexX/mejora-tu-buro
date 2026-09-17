# Auditoría UX & CRO — mejoraburo.com.mx
## Entregable Ejecutivo t2ó México (Septiembre 2026)

Este directorio contiene el deck oficial de presentación y la documentación de homologación técnica para la auditoría de experiencia de usuario, optimización de tasa de conversión (CRO), accesibilidad y gobernanza de datos del sitio **https://mejoraburo.com.mx/** (operado por **Baui Solutions S.A. de C.V.**).

- **Archivo de presentación:** [`auditoria-ux-mejoraburo-t2o.pptx`](./auditoria-ux-mejoraburo-t2o.pptx)
- **Formato:** Widescreen 16:9 (10.0" × 5.625"), 100% nativo y optimizado para Microsoft PowerPoint y Google Slides (fuentes seguras Arial/Calibri, sin SmartArt, imágenes incrustadas con mockups de dispositivos).
- **Paleta de diseño:** Basada en los colores del sitio auditado: Teal (`#30afb8`) como primario dominante, Cian (`#42bce2`), Slate (`#313b48`) para portadas y divisores, Morado CTA (`#8154f0`), Navy institucional (`#00386e`) y Rojo (`#dc3232`) reservado exclusivamente para severidades Bloqueador/Alta.

---

### 1. Estructura y Mapeo de Slides con Hallazgos Homologados

| # | Título del Slide | Tipo / Sección | Hallazgos Asociados (IDs) | Severidad y Estado |
|---|---|---|---|---|
| **01** | **Portada** | Carátula institucional | — | Presentación t2ó México |
| **02** | **Objetivo** | Contexto estratégico | — | Formato idéntico al estándar de la casa |
| **03** | **Metodología y Alcance** | Protocolo técnico | — | Playwright, axe-core 4.10.2, CDP y límites |
| **04** | **Resumen Ejecutivo** | Síntesis ejecutiva | UX-136, UX-134, UX-153, UX-005, UX-002 | Máximo 5 puntos clave (Regla CLAUDE.md) |
| **05** | **DIVISOR: El Embudo de Conversión** | Divisor oscuro | — | Sección 01 |
| **06** | **El embudo real: 2 pasos y el 2° oculto** | Embudo & Fricción | UX-134, UX-135, UX-137, UX-139 | Alta / Media — Observado |
| **07** | **El consentimiento que no existe** | Consentimiento & Legal | **UX-136** (Hallazgo estrella), UX-003 | **Bloqueador** — Observado |
| **08** | **4 campos obligatorios sin contexto** | Formulario & A11y | UX-002, UX-004 | Alta — Observado |
| **09** | **Prueba social vacía e insignia rota** | Confianza & Prueba social | UX-005, UX-012 | Alta / Media — Observado |
| **10** | **Promesa en Hero vs. Servicio en FAQ** | Propuesta de valor | UX-085, UX-087 | Alta / Media — Por validar / Observado |
| **11** | **DIVISOR: Accesibilidad & Responsive** | Divisor oscuro | — | Sección 02 |
| **12** | **axe-core 4.10.2: 7 violaciones** | Accesibilidad técnica | UX-002, UX-010, UX-011, UX-013 | Crítica / Seria — Observado |
| **13** | **Navegación con teclado (39 pasos)** | Teclado & Foco | UX-007, UX-008, UX-003, UX-013 | Media — Observado |
| **14** | **Móvil (390×844): Lo bueno vs. Ajustes** | Responsive & Touch | UX-009 | Media — Observado (destaca fortalezas) |
| **15** | **DIVISOR: Datos, Privacidad & Confianza** | Divisor oscuro | — | Sección 03 |
| **16** | **La cookie vik_user_data** | Fuga de PII en cliente | **UX-153** | **Bloqueador** — Observado |
| **17** | **PII en Query Strings a afiliados CPL** | Tracking & Privacidad | **UX-151**, UX-130, UX-152 | **Bloqueador** / Media — Observado |
| **18** | **Documentos legales y derechos ARCO** | Marco jurídico | UX-006, UX-084, UX-083, UX-081 | Alta — Observado |
| **19** | **DIVISOR: Hacia Dónde Vamos** | Divisor oscuro | — | Sección 04 |
| **20** | **Modelo de Madurez UX (Walk/Run/Fly)** | Framework t2ó | Puntuación 0-10 en 8 dimensiones | Juicio del Auditor (Inferido) |
| **21** | **Matriz de Quick Wins vs. Estructurales** | Roadmap priorizado | Matriz de impacto vs. esfuerzo | 10 iniciativas priorizadas |
| **22** | **Próximos pasos (01 / 02 / 03)** | Hoja de ruta t2ó | Fases: Semanas 1-2, 3-4 y Mes 2 | Plan secuencial de remediación |
| **23** | **ANEXO A: Riesgo Regulatorio (Logos)** | Cumplimiento legal | **UX-001**, UX-086 | Alta — Observado (enrutado a Legal) |
| **24** | **ANEXO B: Canal WhatsApp (No evaluable)** | Canal comercial | **UX-140** | **Pendiente / No evaluable** |
| **25** | **Cierre institucional** | Cierre oscuro | — | Firma t2ó México |

---

### 2. Puntuación del Modelo de Madurez UX (Slide 20)

Escala del framework insignia de t2ó: **Walk (0 a 4 puntos)**, **Run (4 a 7 puntos)**, **Fly (8 a 10 puntos)**.  
*Nota metodológica: Puntuación inferida sujeta a juicio profesional del equipo auditor con base en evidencia técnica.*

| Dimensión | Score | Nivel t2ó | Fundamento |
|---|:---:|:---:|---|
| **Consistencia legal** | `1.0 / 10` | **WALK** | Términos de marketplace ajenos al negocio; trámite ARCO exclusivamente presencial en Reforma 250. |
| **Accesibilidad WCAG** | `2.0 / 10` | **WALK** | 7 violaciones axe-core; orden de teclado invertido; 36 de 39 controles sin indicador de foco visible. |
| **Confianza / Prueba social** | `2.0 / 10` | **WALK** | Sección de testimoniales desierta por widget roto; distintivo de Google Reviews sin hipervínculo verificable. |
| **Transparencia del embudo** | `2.0 / 10` | **WALK** | Paso 2 de acreedores oculto sin previo aviso; ausencia de rangos de precios o esquemas de honorarios. |
| **Protección de datos** | `2.0 / 10` | **WALK** | Cookie `vik_user_data` con PII expuesta sin HttpOnly a ~70 scripts; PII transmitida en URL a redes CPL. |
| **Contenido y microcopy** | `3.0 / 10` | **WALK** | Promesa del Hero ("pagar menos") desfasada del alcance en FAQ ("educación"); CTAs repetidos sin progresión. |
| **Conversión / Formulario** | `3.0 / 10` | **WALK** | Formulario operativo pero con fricción alta; casilla de consentimiento invisible; sin acuse formal post-envío. |
| **Rendimiento percibido** | `6.0 / 10` | **RUN** | **Lo mejor del sitio:** TTFB de 1.1s, FCP de 1.8s, responsive 390×844 limpio sin scroll horizontal ni popups. |
| **PROMEDIO GLOBAL** | **`2.6 / 10`** | **WALK** | **Etapa Básica / Foco en remediación inmediata de cimientos antes de escalar pauta.** |

---

### 3. Asuntos Pendientes de Validar con el Cliente (Baui Solutions S.A. de C.V.)

Para completar el ciclo de auditoría y avanzar hacia la fase de optimización activa (CRO), se requiere información interna y alineación sobre los siguientes puntos que no pudieron ser resueltos desde el frontend:

1. **Operación del Canal Comercial de WhatsApp (UX-140):**
   - Confirmar si el ruteo del primer mensaje tras el envío del lead es manual (ejecutivos comerciales) o automatizado (chatbot / API de WhatsApp Business).
   - Conocer el Acuerdo de Nivel de Servicio (SLA) comprometido para el primer contacto. (En la prueba de envío en horario hábil a las 12:01 y 12:50 h, ningún lead recibió respuesta durante la ventana observada).
   - Validar qué porcentaje de prospectos que abandonan en el Paso 2 (acreedores) son contactados comercialmente.

2. **Estatus Legal del Fideicomiso y Autorizaciones (UX-001):**
   - Validar con el área legal si la empresa cuenta con un contrato fiduciario registrado formalmente ante una institución de crédito o fiduciaria autorizada por la CNBV.
   - En caso afirmativo, definir la redacción jurídica exacta para transparentar la institución fiduciaria y el número de registro. En caso negativo, purgar de inmediato del CMS y del servidor el archivo `brand-logos.png` y la leyenda "Nuestro Fideicomiso está avalado por:".

3. **Arquitectura y Atribución de Afiliados CPL (UX-151, UX-130):**
   - Validar los contratos y requerimientos técnicos con las redes de afiliados `Doaffiliate` y `Keitaro`.
   - Coordinar la migración técnica del postback de conversión para que se realice por webhook Server-to-Server (S2S) mediante un ID de clic anónimo, eliminando la transmisión de teléfonos y correos en URLs públicas.

4. **Esquema de Precios y Honorarios (UX-087):**
   - Definir el rango de comisión o porcentaje sobre el ahorro negociado que pueda publicarse de forma orientativa en la sección de Preguntas Frecuentes, con el fin de filtrar prospectos no calificados y aumentar la tasa de cierre.

5. **Acceso a Analítica (GA4 / Hotjar / Pixel):**
   - Solicitar acceso de lectura a Google Analytics 4 para contrastar las tasas de abandono estimadas entre el Paso 1 (Home) y el Paso 2 (`/acreedores-homepage/`).
