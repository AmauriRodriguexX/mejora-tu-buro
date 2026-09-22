<script>
  import { onMount } from 'svelte';
  let { onStart=()=>{}, onSelect=()=>{} }=$props();
  let selectedSituation=$state('');
  let rotatingPhrase=$state('Hablemos de tu deuda.');
  const phrases=['Hablemos de tu deuda.','Entiende tus opciones.','Da el siguiente paso.','Ordena tus próximos pasos.'];
  const situations=[
    {id:'atrasos',icon:'◷',title:'Tengo pagos atrasados',help:'Quiero saber qué opciones tengo'},
    {id:'minimos',icon:'$',title:'Solo puedo pagar el mínimo',help:'Mi deuda no deja de crecer'},
    {id:'llamadas',icon:'☎',title:'Recibo llamadas de cobranza',help:'Necesito orientación para manejar la presión'},
    {id:'convenio',icon:'✓',title:'Tengo una carta convenio',help:'Quiero entenderla antes de pagar'}
  ];
  function continueWithSituation(){ if(selectedSituation) onStart(selectedSituation); }
  function chooseSituation(id){ selectedSituation=id; onSelect(id); }
  onMount(() => {
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let phraseIndex=0; let charIndex=phrases[0].length; let deleting=false; let timer;
    const tick=()=>{ const phrase=phrases[phraseIndex]; if(!deleting && charIndex<phrase.length){ charIndex+=1; rotatingPhrase=phrase.slice(0,charIndex); timer=setTimeout(tick,78); return; } if(!deleting){ deleting=true; timer=setTimeout(tick,2100); return; } if(charIndex>0){ charIndex-=1; rotatingPhrase=phrase.slice(0,charIndex); timer=setTimeout(tick,42); return; } phraseIndex=(phraseIndex+1)%phrases.length; deleting=false; charIndex=0; rotatingPhrase=''; timer=setTimeout(tick,78); };
    timer=setTimeout(tick,2100);
    return ()=>clearTimeout(timer);
  });
</script>

<section id="hero" class="hero-shell relative isolate overflow-hidden border-b" style="border-color:var(--border)">
  <div class="hero-visual absolute inset-0" aria-hidden="true"><img src="./images/hero-persona-app-1920x1080.png" alt="" class="hero-image absolute inset-0 h-full w-full object-cover object-[72%_center]" /><div class="hero-wash absolute inset-0"></div><div class="hero-bottom-wash absolute inset-0"></div></div>
  <a class="hero-review review-badge focus-ring" href="#opiniones" aria-label="Ver la sección de opiniones de Google"><span class="review-stars" aria-hidden="true">★★★★★</span><span><strong>4.8</strong> <small>· 4,924 opiniones</small></span><span class="review-google" aria-hidden="true">Google</span></a>
  <div class="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"><div class="relative"><p class="eyebrow mb-5">Asesoría para ordenar tus deudas</p><h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Recupera tu tranquilidad.<br /><span class="typing-headline" style="color:var(--brand)"><span class="sr-only">Hablemos de tu deuda.</span><span aria-hidden="true">{rotatingPhrase}<span class="typing-caret" aria-hidden="true"></span></span></span></h1><p class="muted mt-6 max-w-xl text-lg leading-relaxed">Revisamos tu situación y te explicamos las opciones disponibles para tu caso, con lenguaje claro y sin compromiso en la primera conversación.</p>
    <div class="mt-10 max-w-xl" aria-labelledby="diagnostico-title"><p id="diagnostico-title" class="text-base font-extrabold">¿Qué te preocupa hoy?</p><p class="muted mt-1 text-sm">Elige una opción. Todavía no te pedimos datos.</p><div class="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-labelledby="diagnostico-title">{#each situations as situation}<button type="button" role="radio" aria-checked={selectedSituation===situation.id} class="diagnostic-card focus-ring rounded-xl border p-4 text-left transition" class:selected={selectedSituation===situation.id} style="border-color:var(--border)" onclick={() => chooseSituation(situation.id)}><span class="diagnostic-icon" aria-hidden="true">{situation.icon}</span><span class="diagnostic-copy"><strong>{situation.title}</strong><small>{situation.help}</small></span><span class="diagnostic-arrow" aria-hidden="true">{selectedSituation===situation.id?'✓':'→'}</span></button>{/each}</div><button type="button" class="btn-primary focus-ring mt-4 rounded-lg px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40" class:button-ready={!!selectedSituation} disabled={!selectedSituation} onclick={continueWithSituation}><span class="button-label">Continuar con esta situación</span></button></div>
  </div></div>
</section>
