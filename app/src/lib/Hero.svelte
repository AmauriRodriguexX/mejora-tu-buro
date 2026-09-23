<script>
  import { onMount, tick } from 'svelte';
  import { situations } from './situations.js';

  let { onStart=()=>{}, onSelect=()=>{} }=$props();
  let selectedSituations=$state([]);
  let rotatingPhrase=$state('Hablemos de tu deuda.');
  let name=$state('');
  let phone=$state('');
  let privacy=$state(false);
  let errors=$state({});
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const phrases=['Hablemos de tu deuda.','Entiende tus opciones.','Da el siguiente paso.','Ordena tus próximos pasos.'];

  const validators={
    situation:()=>selectedSituations.length?'':'Marca al menos una opción. Si ninguna encaja, elige «Otra situación».',
    name:()=>{ const value=name.trim(); if(!value) return 'Escribe tu nombre.'; if(!/^[\p{L}][\p{L}\s'.-]*$/u.test(value)) return 'Usa solo letras en tu nombre.'; return value.length<2?'Escribe al menos 2 letras.':''; },
    phone:()=>{ const digits=phone.replace(/\D/g,'').length; if(!digits) return 'Escribe tu celular a 10 dígitos.'; return digits<10?`Te falta${10-digits===1?'':'n'} ${10-digits} dígito${10-digits===1?'':'s'}.`:''; },
    privacy:()=>privacy?'':'Acepta el Aviso de Privacidad y los Términos para continuar.'
  };
  // Blur: flag only what the person already typed. While typing: re-check only fields already in error, so errors clear as soon as they are fixed.
  function validateField(field,{force=false}={}){ if(!force && !errors[field]) return; errors={...errors,[field]:validators[field]()}; }
  function blurField(field,value){ if(value.trim()) errors={...errors,[field]:validators[field]()}; }
  // Formats as "55 1234 5678" while typing and keeps the caret next to the same digit.
  function formatPhone(event){
    const input=event.currentTarget;
    let allDigits=input.value.replace(/\D/g,'');
    // Pasted numbers with Mexico's country code (+52 / +521) keep only the 10-digit national number.
    const countryCode=allDigits.length>10 && allDigits.startsWith('521') && allDigits.length>=13 ? 3 : allDigits.length>10 && allDigits.startsWith('52') ? 2 : 0;
    allDigits=allDigits.slice(countryCode);
    const digitsBeforeCaret=Math.max(0,input.value.slice(0,input.selectionStart ?? input.value.length).replace(/\D/g,'').length-countryCode);
    const digits=allDigits.slice(0,10);
    phone=[digits.slice(0,2),digits.slice(2,6),digits.slice(6)].filter(Boolean).join(' ');
    input.value=phone;
    let caret=0;
    for(let seen=0; caret<phone.length && seen<digitsBeforeCaret; caret++) if(/\d/.test(phone[caret])) seen++;
    input.setSelectionRange(caret,caret);
    validateField('phone');
  }
  function toggleSituation(id){
    selectedSituations=selectedSituations.includes(id)?selectedSituations.filter((item)=>item!==id):[...selectedSituations,id];
    onSelect(selectedSituations);
    validateField('situation');
  }
  async function submitContact(event){
    event.preventDefault();
    const nextErrors={};
    for(const field of Object.keys(validators)){ const message=validators[field](); if(message) nextErrors[field]=message; }
    errors=nextErrors;
    if(Object.keys(nextErrors).length){
      await tick();
      const firstInvalid={situation:'hero-situation-0',name:'hero-name',phone:'hero-phone',privacy:'hero-privacy'};
      const key=Object.keys(firstInvalid).find((field)=>nextErrors[field]);
      document.getElementById(firstInvalid[key])?.focus();
      return;
    }
    onStart(selectedSituations,{name:name.trim(),phone:phone.trim(),privacy});
  }

  onMount(() => {
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let phraseIndex=0; let charIndex=phrases[0].length; let deleting=false; let timer;
    const tick=()=>{ const phrase=phrases[phraseIndex]; if(!deleting && charIndex<phrase.length){ charIndex+=1; rotatingPhrase=phrase.slice(0,charIndex); timer=setTimeout(tick,78); return; } if(!deleting){ deleting=true; timer=setTimeout(tick,2100); return; } if(charIndex>0){ charIndex-=1; rotatingPhrase=phrase.slice(0,charIndex); timer=setTimeout(tick,42); return; } phraseIndex=(phraseIndex+1)%phrases.length; deleting=false; charIndex=0; rotatingPhrase=''; timer=setTimeout(tick,78); };
    timer=setTimeout(tick,2100);
    return ()=>clearTimeout(timer);
  });
</script>

<section id="hero" class="hero-shell relative isolate border-b" style="border-color:var(--border)">
  <div class="hero-visual absolute inset-0" aria-hidden="true"><img src="./images/hero-persona-app-1920x1080.png" alt="" class="hero-image absolute inset-0 h-full w-full object-cover" /><div class="hero-wash absolute inset-0"></div><div class="hero-bottom-wash absolute inset-0"></div></div>
  <div class="hero-content relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="hero-copy">
      <p class="eyebrow mb-3">Asesoría para ordenar tus deudas</p>
      <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"><span class="sr-only">Recupera tu tranquilidad. Empieza aquí.</span><span aria-hidden="true">Recupera tu tranquilidad.<br /><span class="typing-headline" style="color:var(--brand)"><span>{rotatingPhrase}<span class="typing-caret" aria-hidden="true"></span></span></span><span class="hero-mobile-headline">Empieza aquí.</span></span></h1>
      <p class="muted hero-description hero-desktop-description mt-4 max-w-xl text-lg leading-relaxed">Revisamos tu situación y te explicamos las opciones disponibles para tu caso, con lenguaje claro y sin compromiso en la primera conversación.</p>
      <p class="muted hero-description hero-mobile-description">Te orientamos con claridad, sin compromiso.</p>

      <form id="formulario-captacion" class="hero-intake-card" onsubmit={submitContact} novalidate>
        <div class="hero-form-heading"><h2 id="diagnostico-title">Cuéntanos qué te preocupa</h2><span class="hero-form-step">Paso 1 de 2</span></div>
        <fieldset class="hero-situation-fieldset" class:has-error={!!errors.situation} aria-describedby={errors.situation ? 'situation-error' : undefined}><legend>Marca todo lo que te pase</legend>
          <div class="hero-situations">
            {#each situations as situation, index}<label class="situation-chip"><input id={`hero-situation-${index}`} type="checkbox" value={situation.id} checked={selectedSituations.includes(situation.id)} onchange={() => toggleSituation(situation.id)} /><span>{situation.label}</span></label>{/each}
          </div>
          {#if errors.situation}<span id="situation-error" class="hero-field-error" role="alert">{errors.situation}</span>{/if}
        </fieldset>

        <div class="hero-contact-fields">
          <div class="hero-field"><label for="hero-name">Nombre</label><input id="hero-name" class="field" autocomplete="given-name" bind:value={name} oninput={() => validateField('name')} onblur={() => blurField('name',name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'hero-name-error' : undefined} />{#if errors.name}<span id="hero-name-error" class="hero-field-error" role="alert">{errors.name}</span>{/if}</div>
          <div class="hero-field"><label for="hero-phone">Celular</label><input id="hero-phone" class="field" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="55 1234 5678" value={phone} oninput={formatPhone} onblur={() => blurField('phone',phone)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'hero-phone-error' : undefined} />{#if errors.phone}<span id="hero-phone-error" class="hero-field-error" role="alert">{errors.phone}</span>{/if}</div>
        </div>

        <div class="hero-form-permissions">
          <label class="hero-permission"><input id="hero-privacy" type="checkbox" bind:checked={privacy} onchange={() => validateField('privacy')} aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? 'hero-privacy-error' : undefined} /><span>Acepto el <a href={`${base}/aviso-de-privacidad/`}>Aviso de Privacidad</a> y los <a href={`${base}/terminos-y-condiciones/`}>Términos</a>.</span></label>
          {#if errors.privacy}<span id="hero-privacy-error" class="hero-field-error" role="alert">{errors.privacy}</span>{/if}
        </div>
        <button class="btn-primary focus-ring hero-submit" type="submit"><span class="button-label">Continuar con mi caso</span><span aria-hidden="true">→</span></button>
        <p class="hero-form-note">Sin compromiso · En el siguiente paso nos cuentas el monto de tu deuda.</p>
      </form>
    </div>
  </div>
  <a class="hero-review review-badge focus-ring" href="#opiniones" aria-label="Ver la sección de opiniones de Google"><span class="review-stars" aria-hidden="true">★★★★★</span><span><strong>4.8</strong> <small>· 4,924 opiniones</small></span><span class="review-google" aria-hidden="true">Google</span></a>
</section>
