<script>
  import { fly, fade } from 'svelte/transition';
  let open = $state(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = (value) => value === '/' ? home : `${base}${value}/`;
  const home = `${base}/`;
  const links = [['/','Inicio'],['/como-funciona','Cómo funciona'],['/calculadora','Calcula tu ahorro'],['/testimonios','Opiniones'],['/acerca-de','Acerca de']];
  function close(){ open=false; }
</script>

<header class="site-header sticky top-0 z-50 border-b" style="background:color-mix(in srgb,var(--bg) 94%,transparent);border-color:var(--border)">
  <div class="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
    <a href={`${home}#hero`} class="brand-logo-link flex items-center" aria-label="Mejora Buró, inicio"><img class="brand-logo" width="69" height="50" src="https://mejoraburo.com.mx/wp-content/uploads/2022/05/Mejora_buro-logo.png" alt="Mejora Buró" decoding="async" /></a>
    <nav class="desktop-navigation hidden items-center gap-6 text-sm font-semibold md:flex" aria-label="Principal">{#each links as link}<a class="nav-link" href={path(link[0])}>{link[1]}</a>{/each}<a class="nav-link" href={path('/entradas')}>Blog</a></nav>
    <div class="desktop-actions hidden items-center gap-3 sm:flex">
      <a class="btn-primary focus-ring font-bold" href={`${home}#formulario-captacion`}><span class="button-label">Revisar mi caso</span></a>
    </div>
    <button class="menu-toggle focus-ring" type="button" onclick={() => open=!open} aria-label={open?'Cerrar menú':'Abrir menú'} aria-expanded={open} aria-controls="menu-movil"><span></span><span></span><span></span></button>
  </div>
  {#if open}
    <button class="menu-backdrop" type="button" aria-label="Cerrar menú" onclick={close} transition:fade={{duration:180}}></button>
    <nav id="menu-movil" class="mobile-sidebar" aria-label="Navegación móvil" transition:fly={{x:360,duration:240}}>
      <div class="mobile-sidebar-heading"><div><span class="eyebrow">Mejora Buró</span></div></div>
      <div class="mobile-sidebar-links">{#each [...links,['/entradas','Blog']] as link, index}<a onclick={close} class="mobile-link" href={path(link[0])}><span class="mobile-nav-icon" aria-hidden="true">{['⌂','↗','◷','☆','◉','▤'][index]}</span><span>{link[1]}</span><span class="mobile-nav-arrow" aria-hidden="true">→</span></a>{/each}</div>
      <div class="mobile-sidebar-actions"><a onclick={close} class="btn-primary text-center font-bold" href={`${home}#formulario-captacion`}><span class="button-label">Revisar mi caso</span></a></div>
    </nav>
  {/if}
</header>
