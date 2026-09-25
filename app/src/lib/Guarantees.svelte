<script>
  const criteria = [
    { title: 'Monto acumulado', copy: 'Casos con deudas acumuladas desde $20,000 MXN. Confirmaremos el monto y condiciones contigo.' },
    { title: 'Instituciones', copy: 'Bancos, tiendas departamentales y financieras se revisan de acuerdo con el tipo de cuenta y situación de atraso.' },
    { title: 'Revisión personalizada', copy: 'Cada caso se analiza de forma individual para explicar opciones, costos y posibles efectos en tu historial.' }
  ];
</script>

<section id="casos" class="surface py-16 sm:py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl">
      <p class="eyebrow">Antes de solicitar contacto</p>
      <h2 class="mt-3 text-3xl font-extrabold sm:text-4xl">¿Qué casos revisamos?</h2>
      <p class="muted mt-4 leading-relaxed">La primera conversación sirve para entender si tu caso podría aplicar. No equivale a una aprobación ni a una propuesta de liquidación.</p>
    </div>

    <ul class="criteria-list">
      {#each criteria as item}
        <li class="criteria-item">
          <span class="criteria-check" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="20" height="20"><path d="m4.6 10.4 3.5 3.5 7.3-7.8" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <h3 class="criteria-title">{item.title}</h3>
          <p class="criteria-copy">{item.copy}</p>
        </li>
      {/each}
    </ul>

    <p class="section-disclaimer"><span aria-hidden="true">*</span><strong>Información importante:</strong> antes de contratar, pide que te expliquen costos, documentos, forma de pago y posibles efectos sobre tu historial crediticio.</p>
  </div>
</section>
