<script>
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const posts = [
    { category: 'Convenios', categorySlug: 'convenios', date: '2026', title: 'Carta convenio de pago en México: guía completa', excerpt: 'Qué datos revisar antes de aceptar una propuesta y realizar un pago.', slug: 'carta-convenio-de-pago', image: 'carta-convenio.jpg' },
    { category: 'Deudas', categorySlug: 'deudas', date: '2025', title: '¿Cómo negociar una quita con el banco?', excerpt: 'Una guía para entender el proceso, sus condiciones y sus posibles efectos.', slug: 'como-negociar-una-quita-con-el-banco', image: 'quita-banco.webp' },
    { category: 'Cobranza', categorySlug: 'cobranza', date: '2025', title: '¿Puede un despacho de cobranza embargarte?', excerpt: 'Diferencia entre una llamada de cobranza y un procedimiento legal.', slug: 'un-despacho-de-cobranza-me-puede-embargar', image: 'embargo-cobranza.webp' },
    { category: 'Finanzas personales', categorySlug: 'finanzas-personales', date: '2025', title: 'Cómo manejar el estrés financiero', excerpt: 'Estrategias para recuperar claridad y tomar decisiones paso a paso.', slug: 'como-manejar-el-estres-financiero', image: 'estres-financiero.jpg' },
    { category: 'Crédito', categorySlug: 'credito', date: '2025', title: '¿Cómo elegir una financiera segura en México?', excerpt: 'Señales que conviene revisar antes de compartir tus datos.', slug: 'como-elegir-una-financiera-segura-en-mexico', image: 'financiera-segura.jpg' },
    { category: 'Buró de crédito', categorySlug: 'buro-de-credito', date: '2025', title: '¿Qué es el Buró de Crédito?', excerpt: 'Entiende qué información contiene y por qué es importante consultarla.', slug: 'buro-de-credito', image: 'buro-credito.jpg' }
  ];
</script>

<section id="blog" class="surface py-16 sm:py-20" aria-labelledby="blog-title">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div class="max-w-2xl">
        <p class="eyebrow">Blog Mejora Buró</p>
        <h2 id="blog-title" class="mt-3 text-3xl font-extrabold sm:text-4xl">Información para tomar mejores decisiones</h2>
        <p class="muted mt-4 leading-relaxed">Guías sencillas para entender tus deudas, tus opciones y los siguientes pasos.</p>
      </div>
      <a class="btn-secondary focus-ring shrink-0" href={`${base}/entradas/`}><span class="button-label">Ver todo el blog <span aria-hidden="true">→</span></span></a>
    </div>
    <div class="blog-track mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="region" aria-label="Artículos del blog" tabindex="-1">{#each posts as post}<a class="blog-card card rounded-2xl p-5" href={`${base}/entradas/${post.categorySlug}/${post.slug}/`} aria-label={`Leer artículo: ${post.title}`}><img class="blog-card-image" src={`${base}/images/blog/${post.image}`} alt="" loading="lazy" /><div class="mt-5 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wide"><span style="color:var(--brand)">{post.category}</span><time class="muted datetime" datetime={`${post.date}-01-01`}>{post.date}</time></div><h3 class="mt-3 text-xl font-bold leading-snug">{post.title}</h3><p class="muted mt-3 text-sm leading-relaxed">{post.excerpt}</p><span class="footer-link mt-5 inline-flex text-sm font-bold">Leer artículo <span aria-hidden="true">→</span></span></a>{/each}</div>
  </div>
</section>
