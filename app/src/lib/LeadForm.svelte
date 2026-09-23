<script>
  import { onMount, tick } from 'svelte';
  import { fly } from 'svelte/transition';
  import { situations, situationLabels } from './situations.js';
  import { captureAttribution, getAttribution, newClickId } from './attribution.js';
  import sendMessageAnimation from '../assets/send-message.lottie?url';
  import lottieWasm from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url';

  let { savingPlan = null } = $props();
  let step = $state(1);
  let selectedSituations = $state([]);
  let name = $state('');
  let phone = $state('');
  let privacy = $state(false);
  let debt = $state('');
  let institutions = $state([]);
  let draftInstitutions = $state([]);
  let institutionQuery = $state('');
  let email = $state('');
  let errors = $state({});
  let sending = $state(false);
  // 'sent': the bot confirmed the WhatsApp message; 'prototype': no lead endpoint configured (static preview).
  let outcome = $state('');
  let clickId = '';
  let card;
  let institutionPicker;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  // Prototype by default: without VITE_LEAD_ENDPOINT the form always ends on the confirmation and sends nothing.
  // The backend (lead + WhatsApp bot) plugs in by setting it, e.g. /api/test-lead for the local webhook.
  const leadEndpoint = import.meta.env.VITE_LEAD_ENDPOINT || '';
  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
  const firstName = $derived(name.trim().split(/\s+/)[0]);
  const whatsappLink = $derived(whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, soy ${firstName}. Envié mi solicitud en Mejora Buró. Ref: ${clickId.slice(0, 8)}`)}` : '');

  onMount(() => { captureAttribution(); });

  // Confirmation animation: the player (and its wasm, self-hosted) is only downloaded once someone reaches this step.
  // Reduced motion shows the final frame; any load failure falls back to the static check icon.
  let animationReady = $state(false);
  function sendAnimation(canvas) {
    let player;
    let cancelled = false;
    import('@lottiefiles/dotlottie-web').then(({ DotLottie }) => {
      if (cancelled) return;
      DotLottie.setWasmUrl(lottieWasm);
      player = new DotLottie({ canvas, src: sendMessageAnimation, autoplay: !reduceMotion, loop: false, layout: { fit: 'contain', align: [0.5, 0.5] } });
      player.addEventListener('load', () => { animationReady = true; if (reduceMotion) player.setFrame(player.totalFrames - 1); });
      player.addEventListener('loadError', () => { animationReady = false; });
    }).catch(() => { animationReady = false; });
    return { destroy() { cancelled = true; animationReady = false; player?.destroy(); } };
  }
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stepIn = { y: 10, duration: reduceMotion ? 0 : 240 };
  const debtRanges = ['$20,000 - $40,000', '$41,000 - $99,000', '$100,000 - $249,999', 'Más de $250,000', 'No estoy seguro'];
  const institutionGroups = [
    { label: 'Departamentales', options: ['Coppel / Bancoppel', 'Elektra / Banco Azteca', 'Liverpool', 'Palacio de Hierro', 'Sears', 'Suburbia', 'Sanborns', 'C&A / Bradescard', 'Otras departamentales'] },
    { label: 'Bancos', options: ['BBVA Bancomer', 'Santander', 'Banorte', 'HSBC', 'Citibanamex', 'Scotiabank', 'Inbursa', 'American Express', 'Otros bancos'] },
    { label: 'Financieras y fintech', options: ['Kueski', 'Moneyman', 'Dineria', 'Apoyo Económico', 'Nu', 'Kubo', 'Libertad', 'DIMEX', 'EXITUS', 'Vivus', 'Otras fintech o financieras'] },
    { label: 'Compradoras de cartera', options: ['Finastrategy', 'Secorse', 'Ibkan', 'Zendere', 'Otra compradora de cartera'] }
  ];

  // The calculator already knows the amount: preselect the matching range so step 2 has one field less.
  $effect(() => {
    if (!savingPlan?.debt || debt) return;
    const amount = savingPlan.debt;
    debt = amount <= 40000 ? debtRanges[0] : amount < 100000 ? debtRanges[1] : amount < 250000 ? debtRanges[2] : debtRanges[3];
  });

  const validators = {
    situation: () => selectedSituations.length ? '' : 'Marca al menos una opción. Si ninguna encaja, elige «Otra situación».',
    name: () => { const value = name.trim(); if (!value) return 'Escribe tu nombre.'; if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(value)) return 'Usa solo letras en tu nombre.'; return value.length < 2 ? 'Escribe al menos 2 letras.' : ''; },
    phone: () => { const digits = phone.replace(/\D/g, '').length; if (!digits) return 'Escribe tu celular a 10 dígitos.'; return digits < 10 ? `Te falta${10 - digits === 1 ? '' : 'n'} ${10 - digits} dígito${10 - digits === 1 ? '' : 's'}.` : ''; },
    privacy: () => privacy ? '' : 'Acepta para continuar: te daremos seguimiento por WhatsApp.',
    debt: () => debt ? '' : 'Elige un rango o «No estoy seguro».',
    institution: () => institutions.length ? '' : 'Elige al menos una institución o «No estoy seguro».',
    email: () => !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? '' : 'Revisa el formato del correo.'
  };
  const stepFields = { 1: ['situation', 'name', 'phone', 'privacy'], 2: ['debt', 'institution', 'email'] };
  const fieldIds = { situation: 'hero-situation-0', name: 'hero-name', phone: 'hero-phone', privacy: 'hero-privacy', debt: 'hero-debt', institution: 'hero-institutions', email: 'hero-email' };

  // Blur: flag only what the person already typed. While typing: re-check only fields already in error, so errors clear as soon as they are fixed.
  function validateField(field) { if (errors[field]) errors = { ...errors, [field]: validators[field]() }; }
  function blurField(field, value) { if (value.trim()) errors = { ...errors, [field]: validators[field]() }; }

  async function validateStep(number) {
    const nextErrors = {};
    for (const field of stepFields[number]) { const message = validators[field](); if (message) nextErrors[field] = message; }
    errors = nextErrors;
    if (!Object.keys(nextErrors).length) return true;
    await tick();
    const first = stepFields[number].find((field) => nextErrors[field]);
    document.getElementById(fieldIds[first])?.focus();
    return false;
  }

  // Swap the card content in place; keep the card's top edge visible (below the sticky header) and move focus into the new step.
  async function goToStep(number, focusId) {
    step = number;
    await tick();
    const top = card?.getBoundingClientRect().top ?? 0;
    if (top < 88) window.scrollBy({ top: top - 88, behavior: reduceMotion ? 'auto' : 'smooth' });
    document.getElementById(focusId)?.focus({ preventScroll: true });
  }

  // Formats as "55 1234 5678" while typing and keeps the caret next to the same digit.
  function formatPhone(event) {
    const input = event.currentTarget;
    let allDigits = input.value.replace(/\D/g, '');
    // Pasted numbers with Mexico's country code (+52 / +521) keep only the 10-digit national number.
    const countryCode = allDigits.length > 10 && allDigits.startsWith('521') && allDigits.length >= 13 ? 3 : allDigits.length > 10 && allDigits.startsWith('52') ? 2 : 0;
    allDigits = allDigits.slice(countryCode);
    const digitsBeforeCaret = Math.max(0, input.value.slice(0, input.selectionStart ?? input.value.length).replace(/\D/g, '').length - countryCode);
    const digits = allDigits.slice(0, 10);
    phone = [digits.slice(0, 2), digits.slice(2, 6), digits.slice(6)].filter(Boolean).join(' ');
    input.value = phone;
    let caret = 0;
    for (let seen = 0; caret < phone.length && seen < digitsBeforeCaret; caret++) if (/\d/.test(phone[caret])) seen++;
    input.setSelectionRange(caret, caret);
    validateField('phone');
  }

  function toggleSituation(id) {
    selectedSituations = selectedSituations.includes(id) ? selectedSituations.filter((item) => item !== id) : [...selectedSituations, id];
    validateField('situation');
  }

  async function submitContact(event) {
    event.preventDefault();
    if (!(await validateStep(1))) return;
    // Production: save a partial lead here (situation + name + phone) so a drop-off in step 2 is still reachable.
    goToStep(2, debt ? 'hero-institutions' : 'hero-debt');
  }

  function toggleInstitution(item) {
    if (item === 'No estoy seguro') {
      draftInstitutions = draftInstitutions.includes(item) ? [] : [item];
      return;
    }
    const known = draftInstitutions.filter((selected) => selected !== 'No estoy seguro');
    draftInstitutions = known.includes(item) ? known.filter((selected) => selected !== item) : [...known, item];
  }
  function clearInstitutionSelection() { draftInstitutions = []; }
  function applyInstitutionSelection() {
    institutions = [...draftInstitutions];
    validateField('institution');
    if (institutionPicker) {
      institutionPicker.open = false;
      institutionPicker.querySelector('summary')?.focus();
    }
  }

  // The options panel is moved to the page root so the card's overflow and stacking never clip it.
  function portalInstitutionPicker(node) {
    const panel = node.querySelector('.institution-picker-options');
    const summary = node.querySelector('summary');
    institutionPicker = node;
    const placeholder = document.createComment('institution-picker-panel');
    panel.parentNode.insertBefore(placeholder, panel);
    (document.querySelector('.site') || document.body).appendChild(panel);
    panel.hidden = true;
    let wasOpen = false;
    function update() {
      if (!node.open) {
        panel.hidden = true;
        if (wasOpen) { draftInstitutions = [...institutions]; institutionQuery = ''; }
        wasOpen = false;
        return;
      }
      const opening = !wasOpen;
      if (opening) draftInstitutions = [...institutions];
      wasOpen = true;
      const rect = summary.getBoundingClientRect();
      const maxHeight = Math.min(320, window.innerHeight * 0.5);
      const below = window.innerHeight - rect.bottom - 16;
      const height = Math.max(140, Math.min(maxHeight, Math.max(below, rect.top - 16)));
      const top = below >= 180 ? rect.bottom + 6 : Math.max(8, rect.top - height - 6);
      panel.hidden = false;
      panel.style.top = `${top}px`;
      panel.style.left = `${Math.max(8, rect.left)}px`;
      panel.style.width = `${Math.min(Math.max(rect.width, 260), window.innerWidth - 16)}px`;
      panel.style.maxHeight = `${height}px`;
      if (opening && window.matchMedia('(pointer: fine)').matches) panel.querySelector('.institution-search input')?.focus();
    }
    function onPanelKey(event) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      node.open = false;
      summary.focus();
    }
    panel.addEventListener('keydown', onPanelKey);
    node.addEventListener('toggle', update);
    document.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return { destroy() { panel.removeEventListener('keydown', onPanelKey); node.removeEventListener('toggle', update); document.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); placeholder.parentNode?.insertBefore(panel, placeholder); placeholder.remove(); institutionPicker = null; } };
  }

  async function submitDetails(event) {
    event.preventDefault();
    if (!(await validateStep(2))) return;
    errors = {};
    if (!leadEndpoint) { outcome = 'prototype'; goToStep(3, 'hero-done-title'); return; }
    clickId = newClickId();
    sending = true;
    try {
      const response = await fetch(leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Consent to WhatsApp contact is part of the required step-1 checkbox, so every lead starts the bot.
        body: JSON.stringify({
          click_id: clickId,
          phone,
          name: name.trim(),
          email: email.trim(),
          situations: selectedSituations,
          debt,
          institutions,
          savingPlan,
          privacyAccepted: privacy,
          whatsappConsent: privacy,
          attribution: getAttribution()
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) { errors = { submit: result.error || 'No pudimos enviarte el WhatsApp. Inténtalo de nuevo en unos segundos.' }; return; }
      outcome = 'sent';
    } catch {
      errors = { submit: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.' };
      return;
    } finally { sending = false; }
    goToStep(3, 'hero-done-title');
  }

  // Accent- and case-insensitive search ("banamex" finds "Citibanamex", "elektra" finds "Elektra / Banco Azteca").
  const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const filteredGroups = $derived.by(() => {
    const query = normalize(institutionQuery);
    if (!query) return institutionGroups;
    return institutionGroups.map((group) => ({ ...group, options: group.options.filter((item) => normalize(item).includes(query)) })).filter((group) => group.options.length);
  });
  const institutionSummary = $derived(institutions.length === 1 ? institutions[0] : institutions.length ? `${institutions.length} instituciones` : 'Elige una o varias');
</script>

<div id="formulario-captacion" class="hero-intake-card" bind:this={card}>
  {#key step}
    <div class="hero-step-wrap" in:fly={stepIn}>
      {#if step === 1}
        <form class="hero-step" onsubmit={submitContact} novalidate>
          <div class="hero-form-heading"><h2 id="diagnostico-title">Cuéntanos qué te preocupa</h2><span class="hero-form-step">Paso 1 de 2</span></div>
          <fieldset class="hero-situation-fieldset" class:has-error={!!errors.situation} aria-describedby={errors.situation ? 'situation-error' : undefined}><legend>Marca todo lo que te pase</legend>
            <div class="hero-situations">
              {#each situations as situation, index}<label class="situation-chip"><input id={`hero-situation-${index}`} type="checkbox" value={situation.id} checked={selectedSituations.includes(situation.id)} onchange={() => toggleSituation(situation.id)} /><span>{situation.label}</span></label>{/each}
            </div>
            {#if errors.situation}<span id="situation-error" class="hero-field-error" role="alert">{errors.situation}</span>{/if}
          </fieldset>

          <div class="hero-contact-fields">
            <div class="hero-field"><label for="hero-name">Nombre</label><input id="hero-name" class="field" autocomplete="given-name" bind:value={name} oninput={() => validateField('name')} onblur={() => blurField('name', name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'hero-name-error' : undefined} />{#if errors.name}<span id="hero-name-error" class="hero-field-error" role="alert">{errors.name}</span>{/if}</div>
            <div class="hero-field"><label for="hero-phone">Celular</label><input id="hero-phone" class="field" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="55 1234 5678" value={phone} oninput={formatPhone} onblur={() => blurField('phone', phone)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'hero-phone-error' : undefined} />{#if errors.phone}<span id="hero-phone-error" class="hero-field-error" role="alert">{errors.phone}</span>{/if}</div>
          </div>

          <div class="hero-form-permissions">
            <label class="hero-permission"><input id="hero-privacy" type="checkbox" bind:checked={privacy} onchange={() => validateField('privacy')} aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? 'hero-privacy-error' : undefined} /><span>Acepto el <a href={`${base}/aviso-de-privacidad/`}>Aviso de Privacidad</a>, los <a href={`${base}/terminos-y-condiciones/`}>Términos</a> y que me contacten por WhatsApp.</span></label>
            {#if errors.privacy}<span id="hero-privacy-error" class="hero-field-error" role="alert">{errors.privacy}</span>{/if}
          </div>
          <button class="btn-primary focus-ring hero-submit" type="submit"><span class="button-label">Continuar con mi caso</span><span aria-hidden="true">→</span></button>
          <p class="hero-form-note">Sin compromiso · En el siguiente paso nos cuentas el monto de tu deuda.</p>
        </form>
      {:else if step === 2}
        <form class="hero-step hero-step-details" onsubmit={submitDetails} novalidate>
          <div class="hero-form-heading"><h2>Cuéntanos de tu deuda</h2><span class="hero-form-step">Paso 2 de 2</span></div>
          <div class="hero-summary">
            <p><strong>{name.trim()}</strong> · {phone}<span class="hero-summary-situations">{situationLabels(selectedSituations)}</span></p>
            <button class="hero-link-button focus-ring" type="button" onclick={() => goToStep(1, 'hero-name')} disabled={sending}>Editar</button>
          </div>

          <div class="hero-contact-fields">
            <div class="hero-field"><label for="hero-debt">Monto aproximado</label>
              <select id="hero-debt" class="field" bind:value={debt} onchange={() => validateField('debt')} aria-invalid={!!errors.debt} aria-describedby={errors.debt ? 'hero-debt-error' : undefined}><option value="">Elige un rango</option>{#each debtRanges as range}<option value={range}>{range}</option>{/each}</select>
              {#if errors.debt}<span id="hero-debt-error" class="hero-field-error" role="alert">{errors.debt}</span>{/if}
            </div>
            <div class="hero-field"><span class="hero-field-label" id="hero-institutions-label">¿Con quién tienes la deuda?</span>
              <details use:portalInstitutionPicker class="institution-picker">
                <summary id="hero-institutions" class="field flex cursor-pointer list-none items-center justify-between gap-3" class:is-invalid={!!errors.institution} aria-labelledby="hero-institutions-label hero-institutions-value" aria-describedby={errors.institution ? 'hero-institution-error' : undefined}><span id="hero-institutions-value" class="truncate" class:muted={!institutions.length}>{institutionSummary}</span><svg class="picker-chevron" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg></summary>
                <div class="institution-picker-options">
                  <div class="institution-picker-toolbar">
                    <label class="institution-search"><svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6" /><path d="M10.5 10.5 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span class="sr-only">Buscar institución</span><input type="search" placeholder="Buscar institución" autocomplete="off" enterkeyhint="search" bind:value={institutionQuery} onkeydown={(event) => { if (event.key === 'Enter') event.preventDefault(); }} /></label>
                    <button type="button" class="institution-clear focus-ring" onclick={clearInstitutionSelection} disabled={!draftInstitutions.length}>Limpiar</button>
                  </div>
                  {#if !filteredGroups.length}<p class="institution-empty">No encontramos «{institutionQuery.trim()}». Elige «Otros bancos», «Otras fintech o financieras» o «No estoy seguro».</p>{/if}
                  {#each filteredGroups as group}
                    <div class="institution-picker-group"><p class="muted px-2 py-2 text-xs font-bold uppercase tracking-wide">{group.label}</p>
                      {#each group.options as item}<label class="institution-picker-option"><input type="checkbox" checked={draftInstitutions.includes(item)} onchange={() => toggleInstitution(item)} /><span>{item}</span></label>{/each}
                    </div>
                  {/each}
                  <div class="institution-picker-group"><label class="institution-picker-option"><input type="checkbox" checked={draftInstitutions.includes('No estoy seguro')} onchange={() => toggleInstitution('No estoy seguro')} /><span>No estoy seguro</span></label></div>
                  <div class="institution-picker-actions"><span class="institution-count" aria-live="polite" aria-atomic="true">{draftInstitutions.length ? `${draftInstitutions.length} seleccionada${draftInstitutions.length === 1 ? '' : 's'}` : 'Marca todas las que apliquen'}</span><button type="button" class="btn-primary focus-ring" onclick={applyInstitutionSelection}><span class="button-label">Seleccionar</span></button></div>
                </div>
              </details>
              {#if errors.institution}<span id="hero-institution-error" class="hero-field-error" role="alert">{errors.institution}</span>{/if}
            </div>
          </div>

          <div class="hero-field"><label for="hero-email">Correo electrónico <span class="muted hero-optional">(opcional)</span></label><input id="hero-email" class="field" type="email" autocomplete="email" bind:value={email} oninput={() => validateField('email')} onblur={() => blurField('email', email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'hero-email-error' : undefined} />{#if errors.email}<span id="hero-email-error" class="hero-field-error" role="alert">{errors.email}</span>{/if}</div>

          {#if savingPlan}<p class="hero-plan-note"><strong>Tu plan de la calculadora:</strong> deuda de ${savingPlan.debt?.toLocaleString('es-MX')} MXN · {#if savingPlan.mode === 'monthly-payment'}{savingPlan.months} meses de ${savingPlan.monthlyPayment?.toLocaleString('es-MX')} MXN{:else}${savingPlan.monthlyCapacity?.toLocaleString('es-MX')} MXN al mes, unos {savingPlan.estimatedMonths} meses{/if}. <span class="muted">Cálculo simple sin intereses ni comisiones.</span></p>{/if}

          {#if errors.submit}<p class="hero-field-error" role="alert">{errors.submit}</p>{/if}
          <div class="hero-step-actions">
            <button class="btn-secondary focus-ring" type="button" onclick={() => goToStep(1, 'hero-name')} disabled={sending}><span class="button-label">Regresar</span></button>
            <button class="btn-primary focus-ring hero-submit" type="submit" disabled={sending}><span class="button-label">{sending ? 'Enviando…' : 'Enviar solicitud'}</span>{#if !sending}<span aria-hidden="true">→</span>{/if}</button>
          </div>
          <p class="hero-form-note hero-whatsapp-note"><svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14"><path d="M8 1.5a6.5 6.5 0 0 0-5.6 9.8L1.5 14.5l3.3-.9A6.5 6.5 0 1 0 8 1.5Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" /></svg>Al enviar, te escribimos por WhatsApp al {phone}.</p>
        </form>
      {:else}
        <div class="hero-step hero-done" role="status">
          <div class="hero-done-animation" class:is-ready={animationReady} aria-hidden="true"><canvas use:sendAnimation width="640" height="360"></canvas><span class="hero-done-icon">✓</span></div>
          <h2 id="hero-done-title" tabindex="-1">¡Listo, {firstName}! Recibimos tu información</h2>
          <p class="muted">Te escribiremos por WhatsApp al <strong>{phone}</strong>. Respóndenos ahí para continuar con la revisión de tu caso.</p>
          {#if outcome === 'sent' && whatsappLink}<a class="btn-primary focus-ring hero-done-action" href={whatsappLink} target="_blank" rel="noopener"><span class="button-label">Abrir WhatsApp</span></a>{/if}
          <p class="hero-done-hint">¿El número no es correcto? <button class="hero-link-button focus-ring" type="button" onclick={() => { outcome = ''; goToStep(1, 'hero-phone'); }}>Corregir celular</button></p>
        </div>
      {/if}
    </div>
  {/key}
</div>
