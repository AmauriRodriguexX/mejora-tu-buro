# Mejora Buró — experiencia digital

Landing page mobile-first para orientar a personas con deudas y llevarlas de un autodiagnóstico claro a una conversación con un asesor.

## Tecnologías

- Svelte 5 con Runes (`$state`, `$props`, `$effect`).
- Vite 8.
- Tailwind CSS 4.
- Tokens CSS para tema claro/oscuro, accesibilidad y microinteracciones.
- GitHub Pages mediante GitHub Actions.

## Flujo UX/CRO

```text
Hero + autodiagnóstico
        ↓
Opiniones y franja de confianza
        ↓
Cómo funciona + calculadora de ahorro
        ↓
Tarjeta de entrada
        ↓
Formulario modal de 2 pasos
        ↓
Resumen y consentimiento de contacto
```

## Componentes principales

- Diagnóstico inicial con tarjetas seleccionables y CTA contextual.
- Métricas de opiniones con conteo progresivo y respeto a `prefers-reduced-motion`.
- La landing `/testimonios` usa únicamente referencias visuales demostrativas; no presenta reseñas reales ni atribuye testimonios a Google.
- Franja editorial con imagen 1920×1080 y degradado responsive.
- Calculadora basada en rangos, sin exigir cifras exactas.
- Formulario modal con foco inicial, cierre con Escape, bloqueo de scroll y resumen entre pasos.
- Catálogo de instituciones organizado por grupos (`optgroup`).
- FAQ con transición accesible.
- Tema claro/oscuro y botones homologados.

## Ejecutar localmente

Desde la raíz:

```bash
pnpm install
pnpm dev
```

La app se abre en `http://localhost:5173`.

Para validar producción:

```bash
pnpm build
pnpm preview
```

## Despliegue

Cada push a `main` compila `app/` y publica `app/dist` en GitHub Pages. El workflow vive en `.github/workflows/deploy-pages.yml`.

## Privacidad y secretos

La integración local de WhatsApp/Gemini usa variables en `.env`, nunca en el frontend. No se publican tokens, auditorías ni datos de prueba.

## Opiniones de Google (pendiente de integración oficial)

Para mostrar reseñas reales se debe integrar la API oficial de Google Business Profile desde un backend seguro, con OAuth, un `locationId` y credenciales restringidas. No se deben extraer comentarios mediante scraping ni exponer claves en GitHub Pages. Hasta completar esa integración, las tarjetas de `/testimonios` son únicamente referencias visuales no oficiales.
