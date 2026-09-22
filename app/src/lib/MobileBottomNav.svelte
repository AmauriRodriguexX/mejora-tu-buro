<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = $state(false);

  onMount(() => {
    const updateVisibility = () => {
      visible = window.scrollY >= window.innerHeight;
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  });
</script>

{#if visible}
  <nav class="mobile-bottom-nav" aria-label="Accesos rápidos" transition:fly={{ y: 64, duration: 220 }}>
    <a class="mobile-bottom-link" href="#simulador">
      <span class="mobile-bottom-icon" aria-hidden="true">▤</span>
      <span>Calculadora</span>
    </a>
    <a class="mobile-bottom-link mobile-bottom-primary" href="#formulario-captacion">
      <span class="mobile-bottom-icon" aria-hidden="true">✓</span>
      <span>Revisar mi caso</span>
    </a>
  </nav>
{/if}
