<script>
  import { tick } from 'svelte';

  let { savingPlan = $bindable(null) } = $props();
  let mode = $state('monthly-payment');
  let debt = $state(70000);
  let months = $state(12);
  let monthlyCapacity = $state(6000);

  // Verbatim excerpts (… marks cuts) copied from the public Google reviews on 2026-09-23; surnames abbreviated.
  const reviews = [
    { name: 'Ubaldo P.', quote: 'Hasta ahora la atención del asesor de servicio al cliente ha sido muy atenta y clara. Guiándome para tomar medidas y reducir el acoso. Me ha dado más tranquilidad.' },
    { name: 'Alan M.', quote: '…el trato ha sido muy bueno y bastante personalizado. Desde que los contacté me explicaron todo de manera clara y me han acompañado durante todo el proceso, siempre atentos y resolviendo dudas.' }
  ];
  // The quotes rotate in place instead of stacking as cards: this column sits beside the calculator
  // and two full-height cards made the section read as a wall. Pauses on hover/focus, static under
  // reduced motion, and dots stay for manual control.
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeReview = $state(0);
  let quotesPaused = $state(false);
  // The active dot fills over the cycle in CSS and its animationend advances the quote. Driving it
  // from the animation (instead of a JS timer) keeps the bar and the text in step through every
  // pause, resume and manual pick, and it simply stops under reduced motion.
  function advanceReview(index) { if (index === activeReview) activeReview = (activeReview + 1) % reviews.length; }

  const money = (value) => Number(value || 0).toLocaleString('es-MX', { maximumFractionDigits: 0 });
  const bounded = (value, min, max) => Math.min(max, Math.max(min, Number(value) || min));
  let debtAmount = $derived(bounded(debt, 20000, 5000000));
  let termMonths = $derived(bounded(months, 1, 60));
  let monthlyAmount = $derived(bounded(monthlyCapacity, 500, 100000));
  let monthlyPayment = $derived(Math.ceil(debtAmount / termMonths));
  let estimatedMonths = $derived(Math.ceil(debtAmount / monthlyAmount));
  let finalPayment = $derived(debtAmount - (estimatedMonths - 1) * monthlyAmount);

  async function sendPlan() {
    savingPlan = {
      mode,
      debt: debtAmount,
      months: termMonths,
      monthlyCapacity: monthlyAmount,
      monthlyPayment,
      estimatedMonths,
      finalPayment
    };
    await tick();
    document.dispatchEvent(new CustomEvent('open-form'));
  }
</script>

<section id="simulador" class="py-16 sm:py-20">
  <div class="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_.95fr] lg:gap-12 lg:px-8">
    <div>
      <p class="eyebrow">Calculadora orientativa</p>
      <h2 class="mt-3 text-3xl font-extrabold sm:text-4xl">Arma un plan para resolver tu deuda</h2>
      <p class="muted mt-4 leading-relaxed">Explora un plazo o una mensualidad que se ajuste a ti. Es una operación estimada sobre el saldo que indiques, no una propuesta de negociación ni una garantía de liquidación.</p>

      <!-- Desktop only: fills the column beside the calculator. Quotes are verbatim excerpts from the public Google profile. -->
      <aside class="calc-aside" aria-label="Antes de decidir">
        <ul class="calc-notes">
          <li><strong>Es una referencia.</strong> Divide tu saldo entre el plazo, sin intereses ni comisiones.</li>
          <li><strong>Un asesor revisa tu caso.</strong> Te explica qué alternativas aplican a tu situación.</li>
          <li><strong>Sin compromiso.</strong> La primera conversación no te obliga a nada.</li>
        </ul>

        <div class="calc-quote" class:is-paused={quotesPaused} onmouseenter={() => quotesPaused = true} onmouseleave={() => quotesPaused = false} onfocusin={() => quotesPaused = true} onfocusout={() => quotesPaused = false}>
          <div class="calc-quote-stack">
            {#each reviews as review, index}
              <figure class="calc-quote-item" class:is-active={index === activeReview} aria-hidden={index !== activeReview}>
                <blockquote><p>{review.quote}</p></blockquote>
                <figcaption><strong>{review.name}</strong><span>Reseña en Google</span></figcaption>
              </figure>
            {/each}
          </div>
          <div class="calc-quote-footer">
            {#if reviews.length > 1}
              <div class="calc-quote-dots" role="group" aria-label="Elegir reseña">
                {#each reviews as review, index}
                  <button class="calc-quote-dot focus-ring" class:is-active={index === activeReview} type="button" aria-label={`Ver la reseña de ${review.name}`} aria-pressed={index === activeReview} onclick={() => activeReview = index} onanimationend={(event) => { if (event.pseudoElement === '::after') advanceReview(index); }}></button>
                {/each}
              </div>
            {/if}
            <a class="calc-reviews-link focus-ring" href="https://www.google.com/search?kgmid=/g/11td0z9l8p&hl=es-419&q=Mejora+Buró" target="_blank" rel="noreferrer">Ver las 4,924 opiniones en Google ↗</a>
          </div>
        </div>
      </aside>
    </div>

    <div class="card calc-panel rounded-2xl p-5 sm:p-6 lg:self-start">
      <div class="calc-mode-switch" role="group" aria-label="Tipo de cálculo">
        <button type="button" class:active={mode === 'monthly-payment'} aria-pressed={mode === 'monthly-payment'} onclick={() => mode = 'monthly-payment'} aria-label="Calcular mensualidad">Mensualidad</button>
        <button type="button" class:active={mode === 'payoff-time'} aria-pressed={mode === 'payoff-time'} onclick={() => mode = 'payoff-time'} aria-label="Calcular tiempo">Tiempo</button>
      </div>

      <div class="mt-5 grid gap-5">
        <fieldset class="calc-control">
          <legend class="font-semibold">¿Cuál es el total de tu deuda?</legend>
          <div class="calc-number-input mt-2"><span aria-hidden="true">$</span><input aria-label="Monto total de la deuda en pesos" type="number" min="20000" max="5000000" step="1000" bind:value={debt} /></div>
          <input class="calc-range mt-3" type="range" min="20000" max="5000000" step="5000" aria-label="Ajustar total de deuda" bind:value={debt} />
          <div class="muted mt-1 flex justify-between text-xs"><span>$20,000</span><span>$5,000,000</span></div>
        </fieldset>

        {#if mode === 'monthly-payment'}
          <fieldset class="calc-control">
            <legend class="font-semibold">¿En cuántos meses te gustaría cubrirla?</legend>
            <div class="calc-number-input mt-2"><input aria-label="Plazo en meses" type="number" min="1" max="60" step="1" bind:value={months} /><span>meses</span></div>
            <input class="calc-range mt-3" type="range" min="1" max="60" step="1" aria-label="Ajustar plazo en meses" bind:value={months} />
            <div class="muted mt-1 flex justify-between text-xs"><span>1 mes</span><span>60 meses</span></div>
          </fieldset>
          <div class="calc-result rounded-xl p-4" aria-live="polite">
            <p class="muted text-sm">Mensualidad aproximada para ese plazo</p>
            <p class="calc-result-figure mt-1 font-extrabold" style="color:var(--brand)">${money(monthlyPayment)} <span class="text-base font-bold">MXN / mes</span></p>
            <p class="muted mt-2 text-xs leading-relaxed">Cálculo simple: saldo total dividido entre {termMonths} meses. No incluye intereses, comisiones ni posibles acuerdos.</p>
          </div>
        {:else}
          <fieldset class="calc-control">
            <legend class="font-semibold">¿Cuánto podrías destinar al mes?</legend>
            <div class="calc-number-input mt-2"><span aria-hidden="true">$</span><input aria-label="Pago mensual disponible en pesos" type="number" min="500" max="100000" step="500" bind:value={monthlyCapacity} /><span>MXN / mes</span></div>
            <input class="calc-range mt-3" type="range" min="500" max="100000" step="500" aria-label="Ajustar pago mensual disponible" bind:value={monthlyCapacity} />
            <div class="muted mt-1 flex justify-between text-xs"><span>$500</span><span>$100,000+</span></div>
          </fieldset>
          <div class="calc-result rounded-xl p-4" aria-live="polite">
            <p class="muted text-sm">Tiempo estimado para cubrir el saldo</p>
            <p class="calc-result-figure mt-1 font-extrabold" style="color:var(--brand)">{estimatedMonths} <span class="text-base font-bold">{estimatedMonths === 1 ? 'mes' : 'meses'}</span></p>
            <p class="muted mt-2 text-xs leading-relaxed">Con pagos de ${money(monthlyAmount)} MXN al mes y un último pago estimado de ${money(finalPayment)} MXN. Cálculo sin intereses, comisiones ni acuerdos.</p>
          </div>
        {/if}
      </div>

      <button class="btn-primary focus-ring calc-submit mt-5 w-full font-bold" type="button" onclick={sendPlan}><span class="button-label">Revisar este plan con un asesor</span></button>
      <p class="muted calc-disclaimer mt-3">*No es una oferta ni garantiza un resultado. Un asesor revisa tu caso.</p>
    </div>
  </div>
</section>
