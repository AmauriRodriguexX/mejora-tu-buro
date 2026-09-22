<script>
  import { onMount } from 'svelte';
  let metricsReady = $state(false); let rating = $state(0); let reviews = $state(0);
  function animateNumber(target, duration, update) { const start = performance.now(); const tick = (now) => { const progress = Math.min((now - start) / duration, 1); const eased = 1 - Math.pow(1 - progress, 3); update(target * eased); if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }
  onMount(() => { const section = document.getElementById('opiniones'); if (!section) return; const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; const show = () => { if (metricsReady) return; metricsReady = true; if (reduce) { rating = 4.8; reviews = 4924; return; } animateNumber(4.8, 3300, (value) => rating = value); animateNumber(4924, 4500, (value) => reviews = value); }; const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) { show(); observer.disconnect(); } }, { threshold: .25 }); observer.observe(section); return () => observer.disconnect(); });
</script>

<section id="opiniones" class="opinions-section surface py-20 sm:py-28" aria-labelledby="opiniones-title">
  <div class="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
    <p class="eyebrow">Confianza que se comparte</p>
    <h2 id="opiniones-title" class="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Más claridad. Más tranquilidad. Más personas que ya dieron el primer paso.</h2>
    <p class="muted mx-auto mt-5 max-w-2xl text-lg leading-relaxed">La experiencia de otras personas puede ayudarte a decidir con información y expectativas claras.</p>
    <div class="opinions-metrics mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3" class:metrics-ready={metricsReady}>
      <div class="opinion-metric card rounded-2xl p-7"><span class="opinion-number" aria-label="4.8 de 5">{rating.toFixed(1)}<span class="opinion-unit">/5</span></span><span class="opinion-label">calificación en Google</span></div>
      <div class="opinion-metric card rounded-2xl p-7"><span class="opinion-number" aria-label="4,924 opiniones">{Math.round(reviews).toLocaleString('es-MX')}</span><span class="opinion-label">opiniones públicas</span></div>
      <div class="opinion-metric card rounded-2xl p-7"><span class="opinion-number opinion-check" aria-hidden="true"><svg class="opinion-checkmark" viewBox="0 0 42 42" fill="none"><path d="M9 22.5 17.5 31 34 12.5" /></svg></span><span class="opinion-label">primera conversación sin compromiso</span></div>
    </div>
    <a class="btn-secondary focus-ring mt-10" href="https://www.google.com/search?kgmid=/g/11td0z9l8p&hl=es-419&q=Mejora+Buró" target="_blank" rel="noreferrer"><span class="button-label">Leer opiniones en Google ↗</span></a>
    <p class="muted mt-4 text-xs">Calificación y número de opiniones consultados en la ficha pública de Google.</p>
  </div>
</section>
