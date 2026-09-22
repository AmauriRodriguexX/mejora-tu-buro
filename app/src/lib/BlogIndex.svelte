<script>
  let { categorySlug = '' } = $props();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const categories = [
    { label: 'Todos', slug: '' },
    { label: 'Convenios', slug: 'convenios' },
    { label: 'Deudas', slug: 'deudas' },
    { label: 'Cobranza', slug: 'cobranza' },
    { label: 'Finanzas personales', slug: 'finanzas-personales' },
    { label: 'Crédito', slug: 'credito' },
    { label: 'Buró de crédito', slug: 'buro-de-credito' }
  ];
  const posts = [
    { category: 'Convenios', categorySlug: 'convenios', date: '2026', title: 'Carta convenio de pago en México: guía completa', excerpt: 'Qué datos revisar antes de aceptar una propuesta y realizar un pago.', slug: 'carta-convenio-de-pago', image: 'carta-convenio.jpg' },
    { category: 'Deudas', categorySlug: 'deudas', date: '2025', title: '¿Cómo negociar una quita con el banco?', excerpt: 'Una guía para entender el proceso, sus condiciones y sus posibles efectos.', slug: 'como-negociar-una-quita-con-el-banco', image: 'quita-banco.webp' },
    { category: 'Cobranza', categorySlug: 'cobranza', date: '2025', title: '¿Puede un despacho de cobranza embargarte?', excerpt: 'Diferencia entre una llamada de cobranza y un procedimiento legal.', slug: 'un-despacho-de-cobranza-me-puede-embargar', image: 'embargo-cobranza.webp' },
    { category: 'Finanzas personales', categorySlug: 'finanzas-personales', date: '2025', title: 'Cómo manejar el estrés financiero', excerpt: 'Estrategias para recuperar claridad y tomar decisiones paso a paso.', slug: 'como-manejar-el-estres-financiero', image: 'estres-financiero.jpg' },
    { category: 'Crédito', categorySlug: 'credito', date: '2025', title: '¿Cómo elegir una financiera segura en México?', excerpt: 'Señales que conviene revisar antes de compartir tus datos.', slug: 'como-elegir-una-financiera-segura-en-mexico', image: 'financiera-segura.jpg' },
    { category: 'Buró de crédito', categorySlug: 'buro-de-credito', date: '2025', title: '¿Qué es el Buró de Crédito?', excerpt: 'Entiende qué información contiene y por qué es importante consultarla.', slug: 'buro-de-credito', image: 'buro-credito.jpg' }
  ];
  let activeCategory = $derived(categories.find((category) => category.slug === categorySlug) ?? categories[0]);
  let visiblePosts = $derived(activeCategory.slug ? posts.filter((post) => post.categorySlug === activeCategory.slug) : posts);
  const articleUrl = (post) => `${base}/entradas/${post.categorySlug}/${post.slug}/`;
</script>

<section class="surface blog-index-section">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <a class="footer-link text-sm font-bold" href={`${base}/`}>← Volver al inicio</a>
    <div class="mt-8 max-w-3xl">
      <p class="eyebrow">Blog Mejora Buró · {activeCategory.label}</p>
      <h1 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{activeCategory.slug ? `Guías sobre ${activeCategory.label.toLowerCase()}` : 'Información para tomar mejores decisiones'}</h1>
      <p class="muted mt-4 text-lg leading-relaxed">Guías prácticas para entender deudas, convenios, cobranza y organización financiera.</p>
    </div>
    <nav class="blog-category-nav mt-8" aria-label="Categorías del blog">
      {#each categories as category}
        <a class="category-chip" aria-current={activeCategory.slug === category.slug ? 'page' : undefined} href={category.slug ? `${base}/entradas/categoria/${category.slug}/` : `${base}/entradas/`}>{category.label}</a>
      {/each}
    </nav>

    {#if !activeCategory.slug}
      <div class="mt-8 grid gap-5 lg:grid-cols-2">
        <a class="blog-featured-card card overflow-hidden rounded-2xl" href={articleUrl(posts[0])}>
          <img src={`${base}/images/blog/${posts[0].image}`} alt="" loading="lazy" />
          <div class="p-6 sm:p-8">
            <span class="eyebrow">Artículo destacado · {posts[0].category}</span>
            <h2 class="mt-3 text-3xl font-extrabold leading-tight">{posts[0].title}</h2>
            <p class="muted mt-3 leading-relaxed">{posts[0].excerpt}</p>
            <span class="footer-link mt-5 inline-flex text-sm font-bold">Leer artículo →</span>
          </div>
        </a>
        <div class="grid gap-5">
          {#each posts.slice(1, 3) as post}
            <a class="blog-card card rounded-2xl p-5" href={articleUrl(post)}>
              <div class="flex gap-4">
                <img class="blog-list-thumb" src={`${base}/images/blog/${post.image}`} alt="" loading="lazy" />
                <div><span class="eyebrow">{post.category}</span><h3 class="mt-2 text-xl font-bold leading-snug">{post.title}</h3><p class="muted mt-2 text-sm leading-relaxed">{post.excerpt}</p></div>
              </div>
            </a>
          {/each}
        </div>
      </div>
      <h2 class="mt-14 text-2xl font-extrabold">Más guías para ti</h2>
      <div class="mt-5 grid gap-5 md:grid-cols-3">
        {#each posts.slice(3) as post}
          <a class="blog-card card rounded-2xl p-5" href={articleUrl(post)}>
            <img class="blog-card-image" src={`${base}/images/blog/${post.image}`} alt="" loading="lazy" />
            <span class="eyebrow mt-5 block">{post.category} · {post.date}</span>
            <h3 class="mt-2 text-xl font-bold leading-snug">{post.title}</h3>
            <p class="muted mt-3 text-sm leading-relaxed">{post.excerpt}</p>
          </a>
        {/each}
      </div>
    {:else}
      <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {#each visiblePosts as post}
          <a class="blog-card card rounded-2xl p-5" href={articleUrl(post)}>
            <img class="blog-card-image" src={`${base}/images/blog/${post.image}`} alt="" loading="lazy" />
            <span class="eyebrow mt-5 block">{post.category} · {post.date}</span>
            <h2 class="mt-2 text-xl font-bold leading-snug">{post.title}</h2>
            <p class="muted mt-3 text-sm leading-relaxed">{post.excerpt}</p>
            <span class="footer-link mt-5 inline-flex text-sm font-bold">Leer artículo →</span>
          </a>
        {/each}
      </div>
      {#if visiblePosts.length === 0}<p class="muted mt-8">Pronto publicaremos guías en esta categoría.</p>{/if}
    {/if}
  </div>
</section>
