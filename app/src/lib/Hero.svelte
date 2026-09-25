<script>
  import { onMount } from 'svelte';
  import LeadForm from './LeadForm.svelte';

  let { savingPlan=null }=$props();
  let rotatingPhrase=$state('Hablemos de tu deuda.');
  const phrases=['Hablemos de tu deuda.','Entiende tus opciones.','Da el siguiente paso.','Ordena tus próximos pasos.'];

  onMount(() => {
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let phraseIndex=0; let charIndex=phrases[0].length; let deleting=false; let timer;
    const tick=()=>{ const phrase=phrases[phraseIndex]; if(!deleting && charIndex<phrase.length){ charIndex+=1; rotatingPhrase=phrase.slice(0,charIndex); timer=setTimeout(tick,78); return; } if(!deleting){ deleting=true; timer=setTimeout(tick,2100); return; } if(charIndex>0){ charIndex-=1; rotatingPhrase=phrase.slice(0,charIndex); timer=setTimeout(tick,42); return; } phraseIndex=(phraseIndex+1)%phrases.length; deleting=false; charIndex=0; rotatingPhrase=''; timer=setTimeout(tick,78); };
    timer=setTimeout(tick,2100);
    return ()=>clearTimeout(timer);
  });
</script>

<section id="hero" class="hero-shell relative isolate">
  <div class="hero-visual absolute inset-0" aria-hidden="true"><img src="./images/hero-persona-app-1920x1080.png" alt="" class="hero-image absolute inset-0 h-full w-full object-cover" /><div class="hero-wash absolute inset-0"></div><div class="hero-bottom-wash absolute inset-0"></div></div>
  <div class="hero-content relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="hero-copy">
      <p class="eyebrow mb-3">Asesoría para ordenar tus deudas</p>
      <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"><span class="sr-only">Recupera tu tranquilidad. Hablemos de tu deuda.</span><span aria-hidden="true">Recupera tu tranquilidad.<br /><span class="typing-headline" style="color:var(--brand)"><span>{rotatingPhrase}<span class="typing-caret" aria-hidden="true"></span></span></span></span></h1>
      <p class="muted hero-description mt-4 max-w-xl text-lg leading-relaxed">Revisamos tu situación y te explicamos las opciones disponibles para tu caso, con lenguaje claro y sin compromiso en la primera conversación.</p>

      <LeadForm {savingPlan} />
    </div>
  </div>
  <a class="hero-review review-badge focus-ring" href="#opiniones" aria-label="Ver la sección de opiniones de Google"><span class="review-stars" aria-hidden="true">★★★★★</span><span><strong>4.8</strong> <small>· 4,924 opiniones</small></span><span class="review-google" aria-hidden="true">Google</span></a>
</section>
