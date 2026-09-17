# Plan de auditoría UX — mejoraburo.com.mx

Documento de trabajo. Protocolo base: `CLAUDE.md`. Historial: `BITACORA_UX.md`.

- **Fecha de creación:** 2026-09-17
- **URL objetivo:** https://mejoraburo.com.mx/
- **Estado del plan:** Fase 0 completada (reconocimiento de contenido). Fase 1 bloqueada por falta de navegador.

---

## 1. Qué es el sitio (Observado — solo contenido, sin navegador)

Reconocimiento hecho con fetch de HTML el 2026-09-17. **No es una auditoría de comportamiento**: no se ejecutó JavaScript, no hubo interacción ni capturas.

- Servicio financiero mexicano de reestructura/reparación de deuda.
- **No hay login ni compra en línea.** El sitio es un **funnel de generación de leads**.
- Hero: *"Pagar menos al mes para olvidarse del estrés. ¡La educación financiera es todo!"*
- CTAs literales: *"¡Descubre si eres candidato!"* y *"¡Comienza ahora!"* (este último repetido 3 veces).
- Formulario: **un solo campo** (rango de ingresos mensuales: $0–20k / $21–40k / $41–99k / $100–249k / $250k+) + checkbox de aceptación de contacto por WhatsApp.
- Confirmación declarada: *"¡Gracias por registrarte! En breve uno de nuestros consultores te contactará"*.
- Navegación: Inicio · ¿Cómo funciona? · Blog · Testimoniales · Preguntas Frecuentes.
- Sin precios publicados ("costos pueden variar según perfil"); asesoría inicial sin costo.
- Footer: redes sociales, avisos legales y privacidad, dirección Reforma 250 CDMX, correo y WhatsApp.

## 2. Hipótesis de público y tarea principal

`CLAUDE.md` permite continuar con hipótesis explícita cuando no se define el público. **Estas hipótesis son "Por validar", no evidencia.**

- **Público hipotético:** adulto mexicano de 25–55 años con deuda vencida o sobreendeudamiento (tarjetas, préstamos personales), historial afectado en buró, ingreso mensual $0–$40k, llega con estrés financiero y desconfianza previa hacia "despachos de cobranza/reparación".
- **Tarea principal a auditar:** *entender si el servicio aplica a mi situación y dejar mis datos para ser contactado*, sin enviar el formulario real.
- **Métrica de negocio afectada (inferida):** tasa de conversión visita → lead calificado, y calidad del lead (no solo volumen).

## 3. Regla dura: NO enviar el formulario

El envío del formulario dispara el contacto de un **consultor humano real** por WhatsApp. `CLAUDE.md` prohíbe enviar formularios reales. Por lo tanto:

- Se audita el flujo **hasta el botón de envío inclusive**, sin pulsarlo.
- Estados posteriores (confirmación, error de validación, mensaje de WhatsApp) solo se auditan con evidencia que aporte el dueño del sitio (screenshots, entorno de staging o grabación).
- Validación de campos: probar solo validación en cliente que no dispare el envío (ej. intentar enviar con el checkbox vacío es aceptable **solo si** no se envía nada; si hay duda, no se hace y queda "Por validar").

---

## 4. Flujos y dimensiones a auditar

Viewports obligatorios: **desktop 1440×900** y **móvil 390×844**.

| ID | Flujo / dimensión | Qué se prueba | Responsable |
|---|---|---|---|
| F1 | Primera impresión y propuesta de valor | ¿En 5 segundos se entiende qué hace la empresa y si aplica a mí? El hero habla de beneficio emocional, no del servicio. | Gemini (evidencia) + Opus (juicio) |
| F2 | Flujo de conversión | Landing → CTA → formulario → hasta el botón de envío. Fricción, claridad del compromiso, expectativa de qué pasa después. | Gemini + Opus |
| F3 | Confianza y legitimidad | Testimoniales, FAQ, avisos legales, aviso de privacidad, identidad legal de la empresa, presencia regulatoria. | astra (contexto) + Opus |
| F4 | Arquitectura de información y navegación | Menú de 5 ítems, repetición del CTA ×3, jerarquía de secciones, profundidad. | Sonnet + Opus |
| F5 | Responsive y consistencia | Comparación 1440×900 vs 390×844: overflow horizontal, targets táctiles, orden de contenido, sticky CTA. | Gemini |
| F6 | Accesibilidad WCAG 2.2 | Teclado, foco visible, contraste, `label` del select y del checkbox, alt text, jerarquía de headings, árbol de accesibilidad, axe. | Gemini (captura) + luna (inventario) |
| F7 | Transparencia y patrones oscuros | Ausencia de precios, consentimiento de WhatsApp, lenguaje de urgencia, promesas de resultado en un servicio financiero regulado. | astra + Opus |
| F8 | Microcopy y UX writing | CTAs genéricos repetidos, redacción del checkbox de consentimiento, claridad del rango de ingresos como único campo. | Sonnet |

---

## 5. Reparto por modelo

| Agente | Rol | Justificación | Costo |
|---|---|---|---|
| **Opus 5** (Claude Code, este chat) | Coordinación, criterio final de severidad/confianza, separar Observado/Inferido/Por validar, integración y entrega | Es quien sostiene el protocolo de `CLAUDE.md`; el juicio de evidencia no se delega | — |
| **gpt-6-astra** (Codex) | **Investigación**: competencia, marco regulatorio MX, benchmarks del sector, patrones oscuros documentados en reparación de crédito | Único descrito como "más capaz para trabajo complejo"; tarea de síntesis y criterio | Alto — máximo 2–3 llamadas |
| **gpt-5.6-luna** (Codex) | **Talacha mecánica**: inventario de HTML (headings, alt, labels, `aria-*`, contraste declarado), conteo de CTAs, extracción de textos literales, verificaciones repetitivas | Rápido y barato; tareas verificables sin criterio | Bajo |
| **Sonnet 5** (subagente Claude) | **Talacha de redacción**: borradores de hallazgos en formato `UX-###`, propuestas de microcopy, checklists, entrada de bitácora | Buena redacción a menor costo que Opus para volumen | Medio-bajo |
| **Gemini 3.8 Flash** (Antigravity, vía usuario) | **Captura de evidencia en navegador**: screenshots 1440×900 y 390×844, árbol de accesibilidad, prueba de teclado, axe | Es el único del equipo con navegador real disponible hoy | — |

### Rangos de ID para evitar colisiones

Cada agente numera dentro de su rango; Opus valida y puede reasignar severidad.

- `UX-001`–`UX-049` — hallazgos observados en navegador (Gemini → integra Opus)
- `UX-050`–`UX-079` — contenido y microcopy (Sonnet)
- `UX-080`–`UX-099` — contexto, regulación y competencia (astra)
- `UX-100`–`UX-129` — accesibilidad técnica e inventario (luna)

---

## 6. Fases

### Fase 0 — Reconocimiento *(hecha)*
Fetch de contenido, definición de hipótesis, este plan.

### Fase 1 — Evidencia en navegador *(bloqueada)*
**Bloqueador:** ni Claude Code ni Codex tienen navegador disponible en esta máquina (sin `chrome`/`chromium`, sin CLI `agent-browser`, extensión Claude-in-Chrome no conectada).

Salidas posibles, en orden de preferencia:
1. Gemini/Antigravity captura la evidencia (si su navegador funciona) y el usuario la deposita en `./evidencia/`.
2. Instalar `agent-browser` + Chromium para que Claude Code capture directamente.
3. El usuario toma los screenshots manualmente a 1440×900 y 390×844.

Sin Fase 1 no hay hallazgos "Observado" de comportamiento: todo quedaría como "Inferido" o "Por validar".

### Fase 2 — Investigación de contexto (astra)
Corre en paralelo a la Fase 1; no depende del navegador.

### Fase 3 — Inventario técnico (luna)
Extracción mecánica sobre el HTML ya disponible.

### Fase 4 — Análisis y redacción (Opus + Sonnet)
Conversión de evidencia en hallazgos con el formato obligatorio de `CLAUDE.md`.

### Fase 5 — Entrega
Según `CLAUDE.md`: resumen ejecutivo (≤5 puntos), flujos y viewports probados, hallazgos priorizados, quick wins, cambios estructurales, riesgos por validar, y actualización de `BITACORA_UX.md`.

---

## 7. Prompts listos para ejecutar

### 7.1 — astra: investigación de contexto

```bash
codex exec -m gpt-6-astra -s read-only --skip-git-repo-check "Investiga el contexto de mejoraburo.com.mx, un servicio mexicano de reestructura/reparación de deuda que capta leads con un formulario de un campo (rango de ingresos) y contacto por WhatsApp. Necesito: (1) marco regulatorio aplicable en México (CONDUSEF, LFPDPPP y consentimiento de datos, publicidad de servicios financieros) y qué debe aparecer obligatoriamente en el sitio; (2) 3-5 competidores directos mexicanos y cómo presentan precio, proceso y prueba social; (3) patrones oscuros documentados en la industria de reparación de crédito que un auditor debería buscar. Marca cada afirmación como Observado (fuente verificable), Inferido o Por validar. Si no tienes acceso a internet, dilo explícitamente al inicio y responde solo con lo que puedas sustentar."
```

> Antes de gastar en astra, verificar con una llamada barata si Codex tiene acceso a red en el sandbox:
> `codex exec -m gpt-5.6-luna -s read-only --skip-git-repo-check "¿Tienes acceso a internet en este entorno? Responde solo sí o no y cómo lo comprobaste."`

### 7.2 — luna: inventario técnico

```bash
codex exec -m gpt-5.6-luna -s read-only --skip-git-repo-check "Tengo el HTML de https://mejoraburo.com.mx/ en ./evidencia/home.html. Genera un inventario en tabla markdown de: (1) jerarquía de headings h1-h6 en orden de aparición; (2) todas las imágenes con su alt (marca las que no tienen); (3) todos los campos de formulario con su label asociada, id, name y atributos aria; (4) todos los enlaces y botones con su texto literal, marcando los repetidos y los genéricos; (5) atributos lang, title y meta description. Solo reporta lo que está en el archivo, no interpretes ni recomiendes."
```

### 7.3 — Gemini (Antigravity): captura de evidencia

Pegar en la terminal de Antigravity. Registrar la tarea en la sección 8 de este documento.

```text
Abre https://mejoraburo.com.mx/ y captura evidencia para una auditoría UX. NO envíes el formulario ni pulses el botón de envío: dispara el contacto de un consultor real.
1. Screenshot de la portada completa a 1440x900 y a 390x844.
2. Screenshot de cada sección: cómo funciona, testimoniales, FAQ, footer.
3. Screenshot del formulario abierto con sus opciones desplegadas.
4. Recorre la página solo con teclado (Tab) y reporta si el foco es visible en todo momento y en qué orden pasa.
5. Exporta el árbol de accesibilidad y, si puedes, corre axe y pega el reporte.
6. Reporta si hay scroll horizontal en 390x844.
Guarda los archivos en "/home/amauri/Documentos/t20 files/mejora tu buro/evidencia/" y dime el nombre de cada uno. No opines sobre diseño, solo reporta lo que observas.
```

### 7.4 — Sonnet: redacción de hallazgos

Se lanza desde este chat como subagente cuando exista evidencia, no antes.

---

## 8. Bitácora de tareas delegadas a Gemini

Se registra **cada** tarea pedida a Gemini/Antigravity. No borrar filas.

| # | Fecha | Tarea pedida | Evidencia esperada | Resultado | Archivo |
|---|---|---|---|---|---|
| G-001 | 2026-09-17 | Captura de evidencia en navegador: portada y secciones a 1440×900 y 390×844, formulario desplegado, recorrido con teclado, árbol de accesibilidad, axe, scroll horizontal en móvil. **Sin enviar el formulario.** | Screenshots en `./evidencia/`, reporte de foco/teclado, árbol a11y, salida de axe | **Completado.** 22 screenshots, 4 archivos de datos (axe, árbol a11y, tab-log, auditoría técnica) y 13 hallazgos (UX-001 a UX-013) redactados. | `auditoria-ux.md` §Gemini |

## 9. Bitácora de tareas delegadas a Codex

| # | Fecha | Modelo | Tarea pedida | Tokens | Resultado |
|---|---|---|---|---|---|
| C-001 | 2026-09-17 | gpt-5.6-luna | Prueba de saludo entre agentes | 3,542 | OK |
| C-002 | 2026-09-17 | gpt-5.6-luna | Listar modelos disponibles | 55,410 | OK |
| C-003 | 2026-09-17 | gpt-5.6-luna | Verificar acceso a internet del sandbox | 4,341 | **NO hay red.** `curl` falla con "Could not resolve host" |
| C-004 | 2026-09-17 | gpt-6-astra | Auditoría regulatoria (LFPDPPP, CONDUSEF) y patrones oscuros sobre `home.txt`, `aviso-privacidad.txt`, `terminos.txt`. Máx. 12 hallazgos UX-080–UX-099 | — | En curso (background) → `evidencia/astra-hallazgos.md` |

---

## 10. Riesgos y supuestos abiertos

1. **Sin navegador** — el riesgo principal. Sin él, la auditoría no puede afirmar nada sobre comportamiento, responsive ni accesibilidad real.
2. **No se puede validar el post-envío** — la confirmación y el flujo de WhatsApp quedan fuera de alcance salvo que el dueño aporte evidencia.
3. **Público objetivo no confirmado** — todas las conclusiones sobre expectativas del usuario son hipótesis hasta que haya analítica o entrevistas.
4. **Sin acceso a analítica** — no se puede medir dónde abandonan los usuarios; la priorización por impacto será estimada, no medida.
5. **Codex NO tiene red — confirmado (C-003).** El sandbox bloquea DNS. Habilitar red exigiría `danger-full-access`, que desactiva el sandbox por completo; no se hizo. **Rediseño adoptado:** Claude Code descarga el material real y lo deja en `./evidencia/` como `.txt`; astra analiza sin red. Consecuencia: todo lo que dependa de fuentes vivas (texto vigente de la ley, sitios de competidores, registro CONDUSEF) queda como **Por validar**, no como Observado.
6. **Sector sensible (YMYL)** — cualquier recomendación de copy debe evitar prometer resultados financieros; se revisa con criterio regulatorio, no solo de conversión.
