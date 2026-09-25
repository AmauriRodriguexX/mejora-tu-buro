<script>
  const steps = [
    { title: 'Revisamos tu caso', copy: 'Dejas tu nombre, celular y correo. Por WhatsApp te preguntamos el monto y con quién tienes la deuda.' },
    { title: 'Te explicamos opciones', copy: 'Un asesor revisa si podemos atender el caso y explica requisitos, costos y posibles efectos en tu historial.' },
    { title: 'Tú decides', copy: 'Solo si eliges avanzar, recibirás los siguientes pasos. Antes de cualquier pago, revisa los documentos aplicables.' }
  ];
</script>

<section id="como-funciona" class="surface py-16 sm:py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl">
      <p class="eyebrow">Cómo funciona</p>
      <h2 class="mt-3 text-3xl font-extrabold sm:text-4xl">Entiende el proceso antes de compartir tus datos</h2>
      <p class="muted mt-4 leading-relaxed">Queremos que sepas qué sigue y qué información necesitamos en cada momento.</p>
    </div>

    <ol class="process-rail">
      {#each steps as step, index}
        <li class="process-step">
          <span class="process-node"><span class="process-number">{index + 1}</span></span>
          <h3 class="process-title">{step.title}</h3>
          <p class="process-copy">{step.copy}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>
