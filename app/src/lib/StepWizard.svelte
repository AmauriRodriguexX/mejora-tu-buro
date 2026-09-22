<script>
  import { onMount, tick } from 'svelte';
  let { selectedSituation = '', savingPlan = null } = $props();
  let open = $state(false); let step = $state(1); let debt = $state(''); let institution = $state(''); let situation = $state('');
  let name = $state(''); let phone = $state(''); let email = $state(''); let whatsapp = $state(false); let privacy = $state(false); let errors = $state({}); let sending = $state(false); let messageSent = $state(false);
  const institutionGroups = [
    { label: 'Bancos', options: ['BBVA Bancomer','Santander','Banorte','HSBC','Citibanamex','Scotiabank','Inbursa','American Express','Otros bancos'] },
    { label: 'Departamentales', options: ['Coppel / Bancoppel','Elektra / Banco Azteca','Liverpool','Palacio de Hierro','Sears','Suburbia','Sanborns','C&A / Bradescard','Otras departamentales'] },
    { label: 'Financieras y fintech', options: ['Kueski','Moneyman','Dineria','Apoyo Económico','Nu','Kubo','Libertad','DIMEX','EXITUS','Vivus','Otras fintech o financieras'] },
    { label: 'Compradoras de cartera', options: ['Finastrategy','Secorse','Ibkan','Zendere','Otra compradora de cartera'] }
  ];
  const debtRanges = ['$0 - $20,000','$21,000 - $40,000','$41,000 - $99,000','$100,000 - $249,999','Más de $250,000'];
  $effect(() => { if (selectedSituation) situation = selectedSituation; });
  function openForm(event) { if (event?.detail?.situation) situation = event.detail.situation; open = true; tick().then(() => document.getElementById(step === 1 ? 'debt' : 'name')?.focus()); }
  function closeForm() { open = false; }
  onMount(() => { const handleOpen = (event) => openForm(event); const handleAnchor = (event) => { const link = event.target.closest?.('a[href="#formulario-captacion"]'); if (link) { event.preventDefault(); openForm(); } }; const handleKey = (event) => { if (open && event.key === 'Escape') closeForm(); }; document.addEventListener('open-form', handleOpen); document.addEventListener('click', handleAnchor); document.addEventListener('keydown', handleKey); return () => { document.removeEventListener('open-form', handleOpen); document.removeEventListener('click', handleAnchor); document.removeEventListener('keydown', handleKey); }; });
  $effect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; });
  function rangeMinimum(value) { const match = String(value).match(/[\d,]+/); return match ? Number(match[0].replace(/,/g, '')) : 0; }
  function validateCase() { errors = {}; const amount = rangeMinimum(debt); if (!debt) errors.debt = 'Selecciona un rango aproximado.'; else if (amount < 20000) errors.debt = 'Este prototipo revisa casos desde $20,000 MXN.'; if (!institution) errors.institution = 'Selecciona una institución o “Otra / no lo sé”.'; return Object.keys(errors).length === 0; }
  function next() { if (validateCase()) { step = 2; tick().then(() => document.getElementById('name')?.focus()); } }
  async function submit(event) {
    event.preventDefault();
    errors = {};
    if (!name.trim()) errors.name = 'Escribe tu nombre.';
    if (phone.replace(/\D/g, '').length < 10) errors.phone = 'Escribe un teléfono de 10 dígitos.';
    if (!privacy) errors.privacy = 'Lee y acepta el Aviso de Privacidad para continuar.';
    if (Object.keys(errors).length) return;

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
          // The case details, name, and email stay in the browser during this prototype.
          body: JSON.stringify({ phone, privacyAccepted: privacy, whatsappConsent: whatsapp }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          errors.submit = result.error || 'No pudimos enviar el mensaje de prueba por WhatsApp.';
          return;
        }
        messageSent = true;
      } catch {
        errors.submit = 'No se pudo conectar con el servidor local. Comprueba que el webhook esté iniciado e inténtalo de nuevo.';
        return;
      } finally {
        sending = false;
      }
    }

    step = 3;
  }
</script>

<section id="formulario-captacion" class="form-launcher py-16 sm:py-20" aria-labelledby="form-launcher-title"><div class="mx-auto max-w-3xl px-4 sm:px-6"><div class="card rounded-2xl p-6 text-center sm:p-10"><p class="eyebrow">Solicitud de revisión</p><h2 id="form-launcher-title" class="mt-3 text-3xl font-extrabold sm:text-4xl">Cuéntanos sobre tu caso</h2><p class="muted mx-auto mt-3 max-w-xl">Son dos pasos y tú decides cómo autorizas el contacto. No necesitas tener todos los datos a la mano.</p><button class="btn-primary focus-ring mt-7" type="button" onclick={openForm}><span class="button-label">Empezar revisión</span></button><p class="muted mt-3 text-xs">Toma menos de 2 minutos · Sin compromiso</p></div></div></section>

{#if open}<div class="form-modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && closeForm()}><div class="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><div class="form-modal-header"><div><p class="eyebrow">Solicitud de revisión</p><h2 id="form-title" class="mt-2 text-2xl font-extrabold sm:text-3xl">Cuéntanos sobre tu caso</h2></div><button class="modal-close focus-ring" type="button" aria-label="Cerrar formulario" onclick={closeForm}>×</button></div><p class="muted mt-3">Primero revisamos tu situación; después decides cómo autorizas el contacto.</p><div class="mt-7 mb-8 flex items-center gap-3 text-sm font-bold"><span class="step-dot step-active">{step > 1 ? '✓' : '1'}</span><span class:step-current={step === 1}>Tu caso</span><span class="h-px flex-1" style="background:var(--border)"></span><span class="step-dot" class:step-active={step > 1}>{step > 2 ? '✓' : '2'}</span><span class:step-current={step === 2}>Contacto</span></div>
{#if step === 1}<div class="space-y-5"><label class="block font-semibold" for="debt">Rango aproximado de tus deudas<select id="debt" class="field mt-2" bind:value={debt} aria-describedby="debt-help debt-error"><option value="">Rango aproximado</option>{#each debtRanges as range}<option value={range}>{range}</option>{/each}</select>{#if errors.debt}<span id="debt-error" class="mt-1 block text-sm" style="color:var(--danger)">{errors.debt}</span>{/if}<span id="debt-help" class="muted mt-2 block text-xs font-normal">Un rango nos ayuda a orientarte sin pedirte una cifra exacta.</span></label><label class="block font-semibold" for="institution">¿Con qué institución tienes la deuda?<select id="institution" class="field mt-2" bind:value={institution} aria-describedby="institution-help institution-error"><option value="">Selecciona una opción</option>{#each institutionGroups as group}<optgroup label={group.label}>{#each group.options as item}<option value={item}>{item}</option>{/each}</optgroup>{/each}<option value="Más de una institución">Más de una institución</option><option value="Otra / no lo sé">Otra / no lo sé</option></select><span id="institution-help" class="muted mt-2 block text-xs font-normal">Si tienes varias, elige “Más de una institución”.</span>{#if errors.institution}<span id="institution-error" class="mt-1 block text-sm" style="color:var(--danger)">{errors.institution}</span>{/if}</label><label class="block font-semibold" for="situation">¿Qué describe mejor tu situación?<select id="situation" class="field mt-2" bind:value={situation}><option value="">Prefiero explicarlo después</option><option value="atrasos">Tengo pagos atrasados</option><option value="minimos">Solo puedo pagar el mínimo</option><option value="llamadas">Recibo llamadas de cobranza</option><option value="convenio">Quiero entender una carta convenio</option></select></label>{#if savingPlan}<div class="rounded-xl p-4 text-sm" style="background:var(--brand-soft)">Referencia de calculadora: <strong>${savingPlan.estimated?.toLocaleString('es-MX')} MXN de saldo restante en un escenario ilustrativo.</strong> Puedes comentarla con el asesor.</div>{/if}<button class="btn-primary focus-ring" type="button" onclick={next}><span class="button-label">Continuar</span></button></div>
{:else if step === 2}<form onsubmit={submit} class="space-y-5"><div class="rounded-xl p-4 text-sm" style="background:var(--surface)"><strong>Resumen:</strong> {debt || '—'} · {institution || '—'} <button class="ml-2 underline" style="color:var(--brand)" type="button" onclick={() => step = 1}>Editar</button></div><label class="block font-semibold" for="name">Nombre<input id="name" class="field mt-2" autocomplete="name" bind:value={name} />{#if errors.name}<span class="mt-1 block text-sm" style="color:var(--danger)">{errors.name}</span>{/if}</label><label class="block font-semibold" for="phone">Teléfono celular<input id="phone" class="field mt-2" inputmode="tel" autocomplete="tel" placeholder="55 1234 5678" bind:value={phone} />{#if errors.phone}<span class="mt-1 block text-sm" style="color:var(--danger)">{errors.phone}</span>{/if}</label><label class="block font-semibold" for="email">Correo electrónico <span class="muted text-sm font-normal">(opcional)</span><input id="email" class="field mt-2" type="email" autocomplete="email" bind:value={email} /></label><fieldset class="space-y-3 border-t pt-5" style="border-color:var(--border)"><legend class="font-semibold">Preferencias y privacidad</legend><label class="mt-3 flex gap-3 text-sm leading-relaxed"><input class="mt-1 h-4 w-4" type="checkbox" bind:checked={whatsapp} /><span>Autorizo recibir orientación por WhatsApp. Puedes continuar sin seleccionar esta opción.</span></label><label class="flex gap-3 text-sm leading-relaxed"><input class="mt-1 h-4 w-4" type="checkbox" bind:checked={privacy} /><span>He leído y acepto el <a class="underline" style="color:var(--brand)" href="#aviso-privacidad">Aviso de Privacidad</a> para revisar mi solicitud.</span></label>{#if errors.privacy}<span class="block text-sm" style="color:var(--danger)">{errors.privacy}</span>{/if}</fieldset>{#if errors.submit}<p class="rounded-lg p-3 text-sm" role="alert" style="background:var(--brand-soft);color:var(--danger)">{errors.submit}</p>{/if}<div class="flex flex-col gap-3 sm:flex-row"><button class="btn-secondary focus-ring" type="button" onclick={() => step = 1} disabled={sending}><span class="button-label">Regresar</span></button><button class="btn-primary focus-ring" type="submit" disabled={sending}><span class="button-label">{sending ? 'Enviando prueba…' : 'Enviar solicitud de revisión'}</span></button></div><p class="muted text-xs">Prueba local: no se guardan los datos del caso. Solo se envía un mensaje de confirmación a WhatsApp si autorizas ese contacto.</p></form>
{:else}<div class="py-5 text-center"><span class="inline-flex h-14 w-14 items-center justify-center rounded-full text-2xl" style="background:var(--brand-soft);color:var(--brand)">✓</span><h3 class="mt-5 text-2xl font-extrabold">{messageSent ? 'Mensaje de prueba enviado' : 'Prueba de formulario completada'}</h3><p class="muted mx-auto mt-3 max-w-md leading-relaxed">{#if messageSent}Enviamos una confirmación por WhatsApp. No enviamos ni guardamos el detalle de tu caso, nombre o correo.{:else}No enviamos mensaje por WhatsApp porque no autorizaste ese canal. Los datos de esta prueba no se guardaron.{/if}</p><button class="btn-secondary focus-ring mt-6" type="button" onclick={() => { step = 1; closeForm(); }}><span class="button-label">Cerrar</span></button></div>{/if}</div></div>{/if}
