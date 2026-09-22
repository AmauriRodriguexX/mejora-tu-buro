<script>
  import { onMount } from 'svelte';
  import { followsSystemTheme, resetThemePreference, saveThemePreference } from './themePreference.js';
  let { theme = $bindable('light') } = $props();
  let systemMode = $state(true);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  onMount(() => { systemMode = followsSystemTheme(); });
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    saveThemePreference(theme);
    systemMode = false;
  }
  function useSystemTheme() {
    theme = resetThemePreference();
    systemMode = true;
  }
  const socials=[
    ['Facebook','https://www.facebook.com/MejoraBuroMX'],['LinkedIn','https://www.linkedin.com/company/mejora-buro/'],['Instagram','https://www.instagram.com/mejoraburo/'],['YouTube','https://www.youtube.com/@mejoraburo9244/'],['X / Twitter','https://twitter.com/MejoraBuro']
  ];
</script>

<footer class="site-footer border-t" style="border-color:var(--border)">
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    <div class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr]">
      <div><h2 class="text-sm font-extrabold">Síguenos en redes sociales</h2><div class="mt-4 grid gap-2 text-sm">{#each [...socials,['Pinterest','https://www.pinterest.com.mx/mejoraburo/']] as social}<a class="muted footer-link" href={social[1]} target="_blank" rel="noreferrer">Mejora Buró {social[0]} <span aria-hidden="true">↗</span></a>{/each}</div></div>
      <div id="aviso-privacidad"><h2 class="text-sm font-extrabold">Explora</h2><div class="mt-4 grid gap-2 text-sm"><a class="muted footer-link" href={`${base}/#blog`}>Blog</a><a class="muted footer-link" href={`${base}/#opiniones`}>Opiniones</a><a class="muted footer-link" href={`${base}/#faq`}>Preguntas frecuentes</a></div></div>
      <div><h2 class="text-sm font-extrabold">Legales</h2><div class="mt-4 grid gap-2 text-sm"><a class="muted footer-link" href={`${base}/aviso-de-privacidad/`}>Aviso de privacidad</a><a class="muted footer-link" href={`${base}/terminos-y-condiciones/`}>Términos y condiciones</a><a class="muted footer-link" href={`${base}/politica-de-cookies/`}>Política de cookies</a><a class="muted footer-link" href={`${base}/derechos-arco/`}>Derechos ARCO</a></div></div>
      <div><h2 class="text-sm font-extrabold">Contacto</h2><div class="muted mt-4 grid gap-2 text-sm leading-relaxed"><a class="footer-link" href="mailto:contacto@mejoraburo.com.mx">contacto@mejoraburo.com.mx</a><a class="footer-link" href="https://api.whatsapp.com/send/?phone=5215567484566" target="_blank" rel="noreferrer">WhatsApp: 55 6748 4566</a><p>Calle Bahía de Sta. Bárbara 177, Verónica Anzúres, Miguel Hidalgo, 11300 Ciudad de México, CDMX</p></div><div class="footer-map mt-4"><iframe title="Ubicación de Mejora Buró" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15049.924468223278!2d-99.1723963!3d19.4348129!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbc359df0e0f5aed6!2sMejora%20Bur%C3%B3%20%7C%20Reparadora%20de%20Cr%C3%A9dito!5e0!3m2!1sen!2smx!4v1674580659883!5m2!1sen!2smx"></iframe></div><a class="footer-map-link mt-3 inline-flex" href="https://www.google.com/maps/search/?api=1&query=Mejora%20Bur%C3%B3%20Bah%C3%ADa%20de%20Santa%20B%C3%A1rbara%20177%20CDMX" target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></div>
    </div>
    <div class="mt-10 flex flex-col gap-5 border-t pt-5 text-xs muted sm:flex-row sm:items-center sm:justify-between" style="border-color:var(--border)"><p>© 2025 Mejora Buró Asesoría Legal y Financiera. Todos los derechos reservados por Baui Solutions S.A. de C.V.</p><div class="footer-appearance"><div><span class="font-bold">Apariencia</span><span class="footer-appearance-caption">{systemMode ? `Automática · ${theme === 'dark' ? 'oscuro' : 'claro'}` : 'Personalizada'}</span></div><button class="theme-toggle theme-toggle-footer focus-ring" type="button" role="switch" aria-checked={theme === 'dark'} aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} onclick={toggleTheme}><span class="theme-toggle-icon" aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span><span class="theme-toggle-label">{theme === 'dark' ? 'Oscuro' : 'Claro'}</span><span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-thumb"></span></span></button>{#if !systemMode}<button class="footer-link footer-appearance-reset focus-ring" type="button" onclick={useSystemTheme}>Usar tema del sistema</button>{/if}</div></div>
  </div>
</footer>
