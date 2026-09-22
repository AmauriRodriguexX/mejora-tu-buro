<script>
  let { theme = $bindable('light') } = $props();
  let open = $state(false);
  const links = [['#como-funciona','Cómo funciona'],['#casos','Casos que atendemos'],['#simulador','Calcula tu ahorro'],['#faq','Preguntas']];
  function close(){ open=false; }
  function toggleTheme(){ theme=theme==='light'?'dark':'light'; }
</script>

<header class="sticky top-0 z-50 border-b" style="background:color-mix(in srgb,var(--bg) 94%,transparent);border-color:var(--border);backdrop-filter:blur(12px)">
  <div class="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
    <a href="#hero" class="brand-logo-link flex items-center" aria-label="Mejora Buró, inicio"><img class="brand-logo" width="69" height="50" src="https://mejoraburo.com.mx/wp-content/uploads/2022/05/Mejora_buro-logo.png" alt="Mejora Buró" decoding="async" /></a>
    <nav class="hidden items-center gap-6 text-sm font-semibold md:flex" aria-label="Principal">{#each links as link}<a class="nav-link" href={link[0]}>{link[1]}</a>{/each}<a class="nav-link" href="https://mejoraburo.com.mx/blog/" target="_blank" rel="noreferrer">Blog</a></nav>
    <div class="hidden items-center gap-3 sm:flex">
      <button class="theme-toggle focus-ring" type="button" role="switch" aria-checked={theme==='dark'} aria-label={theme==='light'?'Activar tema oscuro':'Activar tema claro'} onclick={toggleTheme}><span class="theme-toggle-icon" aria-hidden="true">{theme==='light'?'☀':'☾'}</span><span class="theme-toggle-label">{theme==='light'?'Claro':'Oscuro'}</span><span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-thumb"></span></span></button>
      <a class="btn-primary focus-ring font-bold" href="#formulario-captacion"><span class="button-label">Revisar mi caso</span></a>
    </div>
    <button class="focus-ring rounded-lg border p-2 md:hidden" style="border-color:var(--border)" onclick={() => open=!open} aria-expanded={open} aria-controls="menu-movil">Menú</button>
  </div>
  {#if open}<nav id="menu-movil" class="border-t px-4 py-4 md:hidden" style="border-color:var(--border);background:var(--surface-raised)" aria-label="Principal móvil"><div class="mx-auto flex max-w-7xl flex-col gap-2">{#each links as link}<a onclick={close} class="mobile-link rounded-lg px-3 py-3 font-semibold" href={link[0]}>{link[1]}</a>{/each}<a onclick={close} class="mobile-link rounded-lg px-3 py-3 font-semibold" href="https://mejoraburo.com.mx/blog/" target="_blank" rel="noreferrer">Blog ↗</a><button class="theme-toggle theme-toggle-mobile focus-ring" type="button" role="switch" aria-checked={theme==='dark'} onclick={() => {toggleTheme();close()}}><span class="theme-toggle-icon" aria-hidden="true">{theme==='light'?'☀':'☾'}</span><span>Cambiar a tema {theme==='light'?'oscuro':'claro'}</span><span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-thumb"></span></span></button><a onclick={close} class="btn-primary text-center font-bold" href="#formulario-captacion"><span class="button-label">Revisar mi caso</span></a></div></nav>{/if}
</header>
