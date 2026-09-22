<script>
  import { slide } from 'svelte/transition';
  let open=$state(0);
  const items=[
    ['¿Tiene costo la primera revisión?','La primera conversación debe explicar si el caso puede atenderse y qué información hace falta. Los costos de un servicio posterior deben confirmarse antes de contratar.'],
    ['¿Cómo afecta una quita al historial crediticio?','Los efectos dependen de la solución y de la institución. Pide una explicación clara antes de decidir.'],
    ['¿Por qué piden mi institución y monto aproximado?','Sirven para entender si el caso podría aplicar. No necesitas tener todos los datos exactos para pedir orientación.']
  ];
</script>

<section id="faq" class="surface py-16 sm:py-20"><div class="mx-auto max-w-3xl px-4 sm:px-6"><p class="eyebrow">Preguntas frecuentes</p><h2 class="mt-3 text-3xl font-extrabold sm:text-4xl">Respuestas antes de dar el siguiente paso</h2><div class="mt-8 space-y-3">{#each items as item,index}<div class="card rounded-xl"><button class="faq-trigger focus-ring flex w-full items-center justify-between gap-4 p-5 text-left font-bold" onclick={() => open=open===index?-1:index} aria-expanded={open===index}><span>{item[0]}</span><span class="faq-symbol" class:open={open===index} style="color:var(--brand)">{open===index?'−':'+'}</span></button>{#if open===index}<p transition:slide={{duration:240}} class="faq-answer muted border-t px-5 pb-5 pt-4 text-sm leading-relaxed" style="border-color:var(--border)">{item[1]}</p>{/if}</div>{/each}</div></div></section>
