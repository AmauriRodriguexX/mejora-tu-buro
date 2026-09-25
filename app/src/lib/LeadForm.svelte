<script>
  import { onMount, tick } from 'svelte';
  import { fly } from 'svelte/transition';
  import { captureAttribution, getAttribution, newClickId } from './attribution.js';
  import sendMessageAnimation from '../assets/send-message.lottie?url';
  import lottieWasm from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url';

  let { savingPlan = null } = $props();
  let step = $state(1);
  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let privacy = $state(false);
  let errors = $state({});
  let sending = $state(false);
  // 'sent': the bot confirmed the WhatsApp message; 'prototype': no lead endpoint configured (static preview).
  let outcome = $state('');
  let clickId = '';
  let card;

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

  // Lead qualification (debt amount, institutions, situation) happens on WhatsApp; the form only captures contact data.
  const validators = {
    name:() => { const value = name.trim(); if (!value) return 'Escribe tu nombre.'; if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(value)) return 'Usa solo letras en tu nombre.'; return value.length < 2 ? 'Escribe al menos 2 letras.' : ''; },
    phone: () => { const digits = phone.replace(/\D/g, '').length; if (!digits) return 'Escribe tu celular a 10 dígitos.'; return digits < 10 ? `Te falta${10 - digits === 1 ? '' : 'n'} ${10 - digits} dígito${10 - digits === 1 ? '' : 's'}.` : ''; },
    email: () => { const value = email.trim(); if (!value) return 'Escribe tu correo.'; return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Revisa el formato del correo.'; },
    privacy: () => privacy ? '' : 'Acepta para continuar: te daremos seguimiento por WhatsApp.'
  };
  const fields = ['name', 'phone', 'email', 'privacy'];
  const fieldIds = { name: 'hero-name', phone: 'hero-phone', email: 'hero-email', privacy: 'hero-privacy' };

  // Blur: flag only what the person already typed. While typing: re-check only fields already in error, so errors clear as soon as they are fixed.
  function validateField(field) { if (errors[field]) errors = { ...errors, [field]: validators[field]() }; }
  function blurField(field, value) { if (value.trim()) errors = { ...errors, [field]: validators[field]() }; }

  async function validateAll() {
    const nextErrors = {};
    for (const field of fields) { const message = validators[field](); if (message) nextErrors[field] = message; }
    errors = nextErrors;
    if (!Object.keys(nextErrors).length) return true;
    await tick();
    document.getElementById(fieldIds[fields.find((field) => nextErrors[field])])?.focus();
    return false;
  }

  // Swap the card content in place; keep the card's top edge visible (below the sticky header) and move focus into the new view.
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

  async function submitLead(event) {
    event.preventDefault();
    if (!(await validateAll())) return;
    errors = {};
    if (!leadEndpoint) { outcome = 'prototype'; goToStep(2, 'hero-done-title'); return; }
    clickId = newClickId();
    sending = true;
    try {
      const response = await fetch(leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Consent to WhatsApp contact is part of the required checkbox, so every lead starts the bot.
        body: JSON.stringify({
          click_id: clickId,
          phone,
          name: name.trim(),
          email: email.trim(),
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
    goToStep(2, 'hero-done-title');
  }
</script>

<div id="formulario-captacion" class="hero-intake-card" bind:this={card}>
  {#key step}
    <div class="hero-step-wrap" in:fly={stepIn}>
      {#if step === 1}
        <form class="hero-step" onsubmit={submitLead} novalidate>
          <div class="hero-form-heading"><h2 id="diagnostico-title">Deja tus datos y resolvamos tus deudas juntos</h2></div>

          <div class="hero-contact-fields">
            <div class="hero-field"><label for="hero-name">Nombre</label><input id="hero-name" class="field" autocomplete="given-name" placeholder="María González" bind:value={name} oninput={() => validateField('name')} onblur={() => blurField('name', name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'hero-name-error' : undefined} />{#if errors.name}<span id="hero-name-error" class="hero-field-error" role="alert">{errors.name}</span>{/if}</div>
            <div class="hero-field"><label for="hero-phone">Celular (WhatsApp)</label><input id="hero-phone" class="field" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="55 1234 5678" value={phone} oninput={formatPhone} onblur={() => blurField('phone', phone)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'hero-phone-error' : undefined} />{#if errors.phone}<span id="hero-phone-error" class="hero-field-error" role="alert">{errors.phone}</span>{/if}</div>
          </div>
          <div class="hero-field"><label for="hero-email">Correo electrónico</label><input id="hero-email" class="field" type="email" autocomplete="email" placeholder="tucorreo@ejemplo.com" bind:value={email} oninput={() => validateField('email')} onblur={() => blurField('email', email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'hero-email-error' : undefined} />{#if errors.email}<span id="hero-email-error" class="hero-field-error" role="alert">{errors.email}</span>{/if}</div>

          <div class="hero-form-permissions">
            <label class="hero-permission"><input id="hero-privacy" type="checkbox" bind:checked={privacy} onchange={() => validateField('privacy')} aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? 'hero-privacy-error' : undefined} /><span>Acepto el <a href={`${base}/aviso-de-privacidad/`}>Aviso de Privacidad</a>, los <a href={`${base}/terminos-y-condiciones/`}>Términos</a> y que me contacten por WhatsApp.</span></label>
            {#if errors.privacy}<span id="hero-privacy-error" class="hero-field-error" role="alert">{errors.privacy}</span>{/if}
          </div>

          {#if errors.submit}<p class="hero-field-error" role="alert">{errors.submit}</p>{/if}
          <button class="btn-primary focus-ring hero-submit" type="submit" disabled={sending}><span class="button-label">{sending ? 'Enviando…' : 'Quiero mejorar mi buró'}</span>{#if !sending}<span aria-hidden="true">→</span>{/if}</button>
          <p class="hero-form-note hero-whatsapp-note"><svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14"><path d="M8 1.5a6.5 6.5 0 0 0-5.6 9.8L1.5 14.5l3.3-.9A6.5 6.5 0 1 0 8 1.5Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" /></svg>Sin compromiso · Te escribimos por WhatsApp para revisar tu caso.</p>
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
