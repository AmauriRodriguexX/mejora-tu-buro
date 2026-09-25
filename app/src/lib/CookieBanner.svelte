<script>
  import { onMount } from 'svelte';
  let visible = $state(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  onMount(() => { visible = localStorage.getItem('mb-cookie-consent') !== 'accepted' && localStorage.getItem('mb-cookie-consent') !== 'rejected'; });
  function choose(value) { localStorage.setItem('mb-cookie-consent', value); visible = false; }
</script>

{#if visible}<aside class="cookie-banner card" aria-label="Preferencias de cookies">
  <span class="cookie-mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="16" fill="var(--cookie-mark-bg)" />
      <path d="M16 6a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" fill="var(--cookie-brand)" />
      <g fill="var(--cookie-mark-bg)">
        <circle cx="12.4" cy="13.1" r="1.75" />
        <circle cx="19.4" cy="20.4" r="1.5" />
        <circle cx="12.1" cy="20.1" r="1.4" />
        <circle cx="16.4" cy="16.6" r="1.15" />
      </g>
    </svg>
  </span>
  <div class="cookie-copy">
    <p class="cookie-title">Tu privacidad importa</p>
    <p class="muted cookie-text">Usamos cookies necesarias y, si lo autorizas, cookies de medición para mejorar el sitio. <a class="cookie-link" href={`${base}/politica-de-cookies`}>Leer política</a></p>
  </div>
  <div class="cookie-actions">
    <button class="btn-secondary focus-ring" type="button" onclick={() => choose('rejected')}><span class="button-label">Rechazar</span></button>
    <button class="btn-primary focus-ring" type="button" onclick={() => choose('accepted')}><span class="button-label">Aceptar</span></button>
  </div>
</aside>{/if}
