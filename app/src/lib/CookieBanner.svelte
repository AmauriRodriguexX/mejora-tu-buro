<script>
  import { onMount } from 'svelte';
  let visible = $state(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  onMount(() => { visible = localStorage.getItem('mb-cookie-consent') !== 'accepted' && localStorage.getItem('mb-cookie-consent') !== 'rejected'; });
  function choose(value) { localStorage.setItem('mb-cookie-consent', value); visible = false; }
</script>

{#if visible}<aside class="cookie-banner card" aria-label="Preferencias de cookies"><div><p class="font-extrabold">Tu privacidad importa</p><p class="muted mt-1 text-sm leading-relaxed">Usamos cookies necesarias y, si lo autorizas, cookies de medición para mejorar el sitio.</p><a class="footer-link mt-2 inline-flex text-xs font-bold" href={`${base}/politica-de-cookies`}>Leer política de cookies</a></div><div class="mt-4 flex flex-wrap gap-2 sm:mt-0"><button class="btn-secondary focus-ring" type="button" onclick={() => choose('rejected')}><span class="button-label">Rechazar</span></button><button class="btn-primary focus-ring" type="button" onclick={() => choose('accepted')}><span class="button-label">Aceptar</span></button></div></aside>{/if}
