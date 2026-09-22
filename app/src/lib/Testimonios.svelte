<script>
  import { onMount } from 'svelte';
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let active = $state(0);
  const featured = [
    { text: 'Entender mis opciones fue el primer paso para recuperar la tranquilidad.', label: 'Referencia visual · historia demostrativa', image: 'testimonials/woman-young.png', alt: 'Mujer mexicana revisando sus opciones en un teléfono' },
    { text: 'Tener la información ordenada me ayudó a saber qué preguntar antes de avanzar.', label: 'Referencia visual · historia demostrativa', image: 'testimonials/man-adult.png', alt: 'Hombre mexicano revisando información financiera' },
    { text: 'Una conversación clara puede convertir la preocupación en un siguiente paso concreto.', label: 'Referencia visual · historia demostrativa', image: 'testimonials/woman-mature.png', alt: 'Mujer mexicana adulta conversando sobre sus opciones' }
  ];
  const references = [
    { name: 'Persona usuaria', place: 'Referencia visual', text: 'Me explicaron mis opciones con claridad y pude tomar una decisión con calma.', image: 'testimonials/woman-young.png' },
    { name: 'Persona usuaria', place: 'Referencia visual', text: 'La conversación me ayudó a entender qué documentos revisar antes de pagar.', image: 'testimonials/man-adult.png' },
    { name: 'Persona usuaria', place: 'Referencia visual', text: 'Encontré un siguiente paso concreto para ordenar mi situación financiera.', image: 'testimonials/couple-older.png' }
  ];
  function next() { active = (active + 1) % featured.length; }
  function previous() { active = (active - 1 + featured.length) % featured.length; }
  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(next, 7000);
    return () => window.clearInterval(timer);
  });
</script>

<section class="surface route-generic" aria-labelledby="testimonios-title">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <a class="footer-link text-sm font-bold" href={base || '/'}>← Volver al inicio</a>
    <div class="mt-8 grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
      <div class="max-w-2xl">
        <p class="eyebrow">Historias que orientan</p>
        <h1 id="testimonios-title" class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Más claridad. Más tranquilidad.</h1>
        <p class="muted mt-4 text-lg leading-relaxed">Conoce el tipo de acompañamiento que buscamos ofrecer: información clara, expectativas honestas y un siguiente paso comprensible.</p>
        <a class="btn-primary focus-ring mt-7" href={`${base}/#formulario-captacion`}><span class="button-label">Quiero revisar mi caso</span></a>
      </div>
      <div class="testimonial-feature card overflow-hidden rounded-2xl" aria-roledescription="carrusel" aria-label="Historias destacadas">
        <div class="testimonial-slide"><img src={`${base}/images/${featured[active].image}`} alt={featured[active].alt} loading="lazy" /><div class="p-6 sm:p-7"><div class="text-lg tracking-wide" style="color:var(--brand)" aria-hidden="true">★★★★★</div><blockquote class="mt-3 text-xl font-bold leading-relaxed">“{featured[active].text}”</blockquote><p class="muted mt-4 text-sm">{featured[active].label}</p></div></div>
        <div class="testimonial-controls"><div class="carousel-dots" role="tablist" aria-label="Seleccionar historia">{#each featured as story, index}<button class:active={index === active} class="carousel-dot focus-ring" type="button" role="tab" aria-selected={index === active} aria-label={`Ver historia ${index + 1}`} onclick={() => active = index}></button>{/each}</div><div class="carousel-arrows"><button class="carousel-button focus-ring" type="button" aria-label="Historia anterior" onclick={previous}>←</button><button class="carousel-button focus-ring" type="button" aria-label="Historia siguiente" onclick={next}>→</button></div></div>
      </div>
    </div>
    <div class="mt-12 flex items-end justify-between gap-4"><div><p class="eyebrow">Experiencias de referencia</p><h2 class="mt-2 text-2xl font-extrabold sm:text-3xl">Una conversación clara puede cambiar el siguiente paso</h2></div></div>
    <div class="mt-6 grid gap-5 md:grid-cols-3">{#each references as reference}<article class="testimonial-card card overflow-hidden rounded-2xl"><img src={`${base}/images/${reference.image}`} alt="" loading="lazy" /><div class="p-5"><div class="text-sm tracking-wide" style="color:var(--brand)" aria-hidden="true">★★★★★</div><blockquote class="mt-3 font-semibold leading-relaxed">“{reference.text}”</blockquote><p class="muted mt-4 text-xs font-bold uppercase tracking-wide">{reference.name}</p><p class="muted mt-1 text-xs">{reference.place}</p></div></article>{/each}</div>
    <div class="card mt-8 rounded-2xl p-5 text-sm leading-relaxed" style="background:var(--brand-soft)"><strong>Nota de prototipo:</strong> estas historias e imágenes son referencias visuales no oficiales. No representan reseñas reales ni deben atribuirse a personas o a Google sin autorización verificable.</div>
  </div>
</section>
