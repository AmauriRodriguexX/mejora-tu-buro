<script>
  import { onMount, tick } from 'svelte';

  let { selectedSituation = '', savingPlan = null } = $props();
  let open = $state(false);
  let step = $state(1);
  let debt = $state('');
  let institutions = $state([]);
  let draftInstitutions = $state([]);
  let institutionPicker;
  let situation = $state('');
  let name = $state('');
  let phone = $state('');
  let email = $state('');
  let whatsapp = $state(false);
  let privacy = $state(false);
  let errors = $state({});
  let sending = $state(false);
  let messageSent = $state(false);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const institutionGroups = [
    { label: 'Departamentales', options: ['Coppel / Bancoppel','Elektra / Banco Azteca','Liverpool','Palacio de Hierro','Sears','Suburbia','Sanborns','C&A / Bradescard','Otras departamentales'] },
    { label: 'Bancos', options: ['BBVA Bancomer','Santander','Banorte','HSBC','Citibanamex','Scotiabank','Inbursa','American Express','Otros bancos'] },
    { label: 'Financieras y fintech', options: ['Kueski','Moneyman','Dineria','Apoyo Económico','Nu','Kubo','Libertad','DIMEX','EXITUS','Vivus','Otras fintech o financieras'] },
    { label: 'Compradoras de cartera', options: ['Finastrategy','Secorse','Ibkan','Zendere','Otra compradora de cartera'] }
  ];
  const debtRanges = ['$20,000 - $40,000','$41,000 - $99,000','$100,000 - $249,999','Más de $250,000','No estoy seguro'];
  const situations = [
    ['atrasos','Tengo pagos atrasados'],['minimos','Solo puedo pagar el mínimo'],['llamadas','Recibo llamadas de cobranza'],['convenio','Quiero entender una carta convenio'],['otro','Otra situación']
  ];

  $effect(() => { if (selectedSituation) situation = selectedSituation; });

  function openForm(event) {
    if (event?.detail?.situation) situation = event.detail.situation;
    step = 1;
    open = true;
    tick().then(() => document.getElementById('lead-name')?.focus());
  }
  function closeForm() { open = false; }
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
    if (institutionPicker) {
      institutionPicker.open = false;
      institutionPicker.querySelector('summary')?.focus();
    }
  }

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
        if (wasOpen) draftInstitutions = [...institutions];
        wasOpen = false;
        return;
      }
      if (!wasOpen) draftInstitutions = [...institutions];
      wasOpen = true;
      const rect = summary.getBoundingClientRect();
      const maxHeight = Math.min(320, window.innerHeight * 0.5);
      const below = window.innerHeight - rect.bottom - 16;
      const height = Math.max(140, Math.min(maxHeight, Math.max(below, rect.top - 16)));
      const top = below >= 180 ? rect.bottom + 6 : Math.max(8, rect.top - height - 6);
      panel.hidden = false;
      panel.style.top = `${top}px`;
      panel.style.left = `${Math.max(8, rect.left)}px`;
      panel.style.width = `${Math.min(rect.width, window.innerWidth - 16)}px`;
      panel.style.maxHeight = `${height}px`;
    }
    node.addEventListener('toggle', update);
    document.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return { destroy() { node.removeEventListener('toggle', update); document.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); placeholder.parentNode?.insertBefore(panel, placeholder); placeholder.remove(); institutionPicker = null; } };
  }

  function validateContact() {
    errors = {};
    if (!name.trim()) errors.name = 'Escribe tu nombre.';
    if (phone.replace(/\D/g, '').length < 10) errors.phone = 'Escribe un teléfono de 10 dígitos.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Revisa el formato del correo.';
    if (!privacy) errors.privacy = 'Acepta el Aviso de Privacidad y los Términos y Condiciones para continuar.';
    return Object.keys(errors).length === 0;
  }

  function validateDetails() {
    errors = {};
    if (!debt) errors.debt = 'Selecciona un rango o indica que no estás seguro.';
    if (!institutions.length) errors.institution = 'Selecciona al menos una institución o “No estoy seguro”.';
    if (!situation) errors.situation = 'Selecciona la opción que mejor describe tu situación.';
    return Object.keys(errors).length === 0;
  }

  function continueToDetails(event) {
    event.preventDefault();
    if (!validateContact()) return;
    step = 2;
    tick().then(() => document.getElementById('debt-range')?.focus());
  }

  async function submitLead(event) {
    event.preventDefault();
    if (!validateDetails()) return;
    errors = {};
    messageSent = false;

    if (whatsapp) {
      if (!import.meta.env.DEV) {
        errors.submit = 'El envío de solicitudes aún no está habilitado en la versión publicada.';
        return;
      }
      sending = true;
      try {
        const response = await fetch('/api/test-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // The prototype endpoint only sends a WhatsApp test; lead details stay in the browser.
          body: JSON.stringify({ phone, privacyAccepted: privacy, whatsappConsent: whatsapp })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) { errors.submit = result.error || 'No pudimos enviar el mensaje de prueba por WhatsApp.'; return; }
        messageSent = true;
      } catch {
        errors.submit = 'No se pudo conectar con el servidor local. Comprueba que el webhook esté iniciado e inténtalo de nuevo.';
        return;
      } finally { sending = false; }
    }
    step = 3;
  }

  onMount(() => {
    const handleOpen = (event) => openForm(event);
    const handleKey = (event) => { if (open && event.key === 'Escape') closeForm(); };
    document.addEventListener('open-form', handleOpen);
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('open-form', handleOpen); document.removeEventListener('keydown', handleKey); };
  });

  $effect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  });
</script>

<section id="formulario-captacion" class="form-launcher py-16 sm:py-20" aria-labelledby="form-launcher-title">
  <div class="mx-auto max-w-3xl px-4 sm:px-6">
    <div class="card rounded-2xl p-6 text-center sm:p-10">
      <p class="eyebrow">Solicitud de revisión</p>
      <h2 id="form-launcher-title" class="mt-3 text-3xl font-extrabold sm:text-4xl">Cuéntanos sobre tu caso</h2>
      <p class="muted mx-auto mt-3 max-w-xl">Comparte tus datos básicos y, después, si quieres, agrega detalles para orientar mejor la revisión.</p>
      <button class="btn-primary focus-ring mt-7" type="button" onclick={openForm}><span class="button-label">Empezar revisión</span></button>
      <p class="muted mt-3 text-xs">Toma menos de 2 minutos · Sin compromiso</p>
    </div>
  </div>
</section>

{#if open}
  <div class="form-modal-backdrop" role="presentation">
    <div class="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div class="form-modal-header">
        <div><p class="eyebrow">Solicitud de revisión</p><h2 id="form-title" class="mt-2 text-2xl font-extrabold sm:text-3xl">Cuéntanos sobre tu caso</h2></div>
        <button class="modal-close focus-ring" type="button" aria-label="Cerrar formulario" onclick={closeForm}>×</button>
      </div>
      <p class="muted mt-3">Primero comparte tus datos de contacto. Luego podrás contarnos más sobre tu caso.</p>
      <div class="mt-7 mb-8 flex items-center gap-3 text-sm font-bold" aria-label={`Paso ${step} de 2`}>
        <span class="step-dot step-active">{step > 1 ? '✓' : '1'}</span><span class:step-current={step === 1}>Contacto</span>
        <span class="h-px flex-1" style="background:var(--border)"></span>
        <span class="step-dot" class:step-active={step > 1}>{step > 2 ? '✓' : '2'}</span><span class:step-current={step === 2}>Tu caso</span>
      </div>

      {#if step === 1}
        <form class="space-y-5" onsubmit={continueToDetails}>
          <label class="block font-semibold" for="lead-name">Nombre
            <input id="lead-name" class="field mt-2" autocomplete="name" bind:value={name} />
            {#if errors.name}<span class="mt-1 block text-sm" style="color:var(--danger)">{errors.name}</span>{/if}
          </label>
          <label class="block font-semibold" for="lead-phone">Teléfono celular
            <input id="lead-phone" class="field mt-2" type="tel" inputmode="tel" autocomplete="tel" placeholder="55 1234 5678" bind:value={phone} />
            {#if errors.phone}<span class="mt-1 block text-sm" style="color:var(--danger)">{errors.phone}</span>{/if}
          </label>
          <label class="block font-semibold" for="lead-email">Correo electrónico <span class="muted text-sm font-normal">(opcional)</span>
            <input id="lead-email" class="field mt-2" type="email" autocomplete="email" bind:value={email} />
            {#if errors.email}<span class="mt-1 block text-sm" style="color:var(--danger)">{errors.email}</span>{/if}
          </label>
          <fieldset class="space-y-3 border-t pt-5" style="border-color:var(--border)">
            <legend class="font-semibold">Permisos de contacto</legend>
            <label class="flex gap-3 text-sm leading-relaxed"><input class="mt-1 h-4 w-4" type="checkbox" bind:checked={whatsapp} /><span>Acepto recibir orientación por WhatsApp. Es opcional.</span></label>
            <label class="flex gap-3 text-sm leading-relaxed"><input class="mt-1 h-4 w-4" type="checkbox" bind:checked={privacy} /><span>He leído y acepto el <a class="underline" style="color:var(--brand)" href={`${base}/aviso-de-privacidad/`}>Aviso de Privacidad</a> y los <a class="underline" style="color:var(--brand)" href={`${base}/terminos-y-condiciones/`}>Términos y Condiciones</a>.</span></label>
            {#if errors.privacy}<span class="block text-sm" style="color:var(--danger)">{errors.privacy}</span>{/if}
          </fieldset>
          <button class="btn-primary focus-ring w-full" type="submit"><span class="button-label">Continuar</span></button>
          <p class="muted text-xs">Al continuar, podrás agregar datos de tu deuda para ayudar a orientar la revisión.</p>
        </form>
      {:else if step === 2}
        <form class="space-y-5" onsubmit={submitLead}>
          <div class="rounded-xl p-4 text-sm" style="background:var(--surface)"><strong>Contacto:</strong> {name} · {phone} {#if email}· {email}{/if} <button class="ml-2 underline" style="color:var(--brand)" type="button" onclick={() => step = 1}>Editar</button></div>

          {#if selectedSituation || situation}
            <div class="rounded-xl p-4 text-sm" style="background:var(--brand-soft)"><strong>Lo que te preocupa:</strong> {situations.find(([id]) => id === situation)?.[1] || situation}</div>
          {/if}

          <label class="block font-semibold" for="debt-range">¿Cuál es el monto aproximado de tu deuda?
            <select id="debt-range" class="field mt-2" bind:value={debt} aria-describedby="debt-help debt-error"><option value="">Selecciona un rango</option>{#each debtRanges as range}<option value={range}>{range}</option>{/each}</select>
            <span id="debt-help" class="muted mt-2 block text-xs font-normal">Si no tienes la cifra exacta, un rango aproximado está bien.</span>
            {#if errors.debt}<span id="debt-error" class="mt-1 block text-sm" style="color:var(--danger)">{errors.debt}</span>{/if}
          </label>

          <fieldset aria-describedby="institution-help institution-error">
            <legend class="block font-semibold">¿En qué instituciones tienes tu deuda?</legend>
            <details use:portalInstitutionPicker class="institution-picker mt-2">
              <summary class="field flex cursor-pointer list-none items-center justify-between gap-3"><span class="truncate">{institutions.length ? `${institutions.length} institución${institutions.length === 1 ? '' : 'es'} seleccionada${institutions.length === 1 ? '' : 's'}` : 'Elige una o varias instituciones'}</span><span aria-hidden="true">⌄</span></summary>
              <div class="institution-picker-options">
                <div class="institution-picker-toolbar"><span aria-live="polite" aria-atomic="true">{draftInstitutions.length ? `${draftInstitutions.length} seleccionada${draftInstitutions.length === 1 ? '' : 's'}` : 'Selecciona todas las que apliquen'}</span><button type="button" class="institution-clear focus-ring" onclick={clearInstitutionSelection} disabled={!draftInstitutions.length}>Limpiar</button></div>
                {#each institutionGroups as group}
                  <div class="institution-picker-group"><p class="muted px-2 py-2 text-xs font-bold uppercase tracking-wide">{group.label}</p>
                    {#each group.options as item}<label class="institution-picker-option"><input type="checkbox" checked={draftInstitutions.includes(item)} onchange={() => toggleInstitution(item)} /><span>{item}</span></label>{/each}
                  </div>
                {/each}
                <div class="institution-picker-group"><label class="institution-picker-option"><input type="checkbox" checked={draftInstitutions.includes('No estoy seguro')} onchange={() => toggleInstitution('No estoy seguro')} /><span>No estoy seguro</span></label></div>
                <div class="institution-picker-actions"><button type="button" class="btn-primary focus-ring" onclick={applyInstitutionSelection}><span class="button-label">Aplicar selección</span></button></div>
              </div>
            </details>
            <span id="institution-help" class="muted mt-2 block text-xs font-normal">Marca todas las que apliquen y pulsa «Aplicar selección». Las opciones están agrupadas por tipo.</span>
            {#if errors.institution}<span id="institution-error" class="mt-1 block text-sm" style="color:var(--danger)">{errors.institution}</span>{/if}
          </fieldset>

          <label class="block font-semibold" for="situation">Describe mejor tu situación
            <select id="situation" class="field mt-2" bind:value={situation}><option value="">Elige la opción más cercana</option>{#each situations as item}<option value={item[0]}>{item[1]}</option>{/each}</select>
            {#if errors.situation}<span class="mt-1 block text-sm" style="color:var(--danger)">{errors.situation}</span>{/if}
          </label>

          {#if savingPlan}<div class="rounded-xl p-4 text-sm" style="background:var(--brand-soft)"><strong>Referencia de tu plan:</strong> deuda estimada de ${savingPlan.debt?.toLocaleString('es-MX')} MXN · {#if savingPlan.mode === 'monthly-payment'}plazo de {savingPlan.months} meses, pago estimado de ${savingPlan.monthlyPayment?.toLocaleString('es-MX')} MXN al mes{:else}pagando ${savingPlan.monthlyCapacity?.toLocaleString('es-MX')} MXN al mes, alrededor de {savingPlan.estimatedMonths} meses{/if}. <span class="muted">Cálculo simple sin intereses ni comisiones.</span></div>{/if}

          {#if errors.submit}<p class="rounded-lg p-3 text-sm" role="alert" style="background:var(--brand-soft);color:var(--danger)">{errors.submit}</p>{/if}
          <div class="flex flex-col gap-3 sm:flex-row"><button class="btn-secondary focus-ring" type="button" onclick={() => step = 1} disabled={sending}><span class="button-label">Regresar</span></button><button class="btn-primary focus-ring" type="submit" disabled={sending}><span class="button-label">{sending ? 'Enviando prueba…' : 'Enviar solicitud'}</span></button></div>
          <p class="muted text-xs">Los datos de calificación se quedan en este prototipo. El envío real y almacenamiento de solicitudes requiere conectar el backend de producción.</p>
        </form>
      {:else}
        <div class="py-5 text-center"><span class="inline-flex h-14 w-14 items-center justify-center rounded-full text-2xl" style="background:var(--brand-soft);color:var(--brand)">✓</span><h3 class="mt-5 text-2xl font-extrabold">{messageSent ? 'Mensaje de prueba enviado' : 'Gracias, completaste la solicitud de prueba'}</h3><p class="muted mx-auto mt-3 max-w-md leading-relaxed">{#if messageSent}Enviamos una confirmación de prueba por WhatsApp. El prototipo no guarda tus datos ni envía los detalles del caso.{:else}Esta versión de prueba no envió ni guardó la solicitud. Un asesor puede revisar los datos cuando esté conectado el envío de producción.{/if}</p><button class="btn-secondary focus-ring mt-6" type="button" onclick={() => { step = 1; closeForm(); }}><span class="button-label">Cerrar</span></button></div>
      {/if}
    </div>
  </div>
{/if}
