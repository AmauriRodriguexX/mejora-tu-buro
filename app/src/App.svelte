<script>
  import { onMount } from 'svelte';
  import Navbar from './lib/Navbar.svelte'; import Hero from './lib/Hero.svelte'; import Opiniones from './lib/Opiniones.svelte'; import TrustBanner from './lib/TrustBanner.svelte'; import Calculator from './lib/Calculator.svelte'; import HowItWorks from './lib/HowItWorks.svelte'; import Guarantees from './lib/Guarantees.svelte'; import StepWizard from './lib/StepWizard.svelte'; import Faq from './lib/Faq.svelte'; import BlogPreview from './lib/BlogPreview.svelte'; import Footer from './lib/Footer.svelte'; import RoutePage from './lib/RoutePage.svelte'; import CookieBanner from './lib/CookieBanner.svelte'; import MobileBottomNav from './lib/MobileBottomNav.svelte';
  let theme = $state('light'); let selectedSituation = $state(''); let savingPlan = $state(null);
  const routePaths = ['/como-funciona','/calculadora','/testimonios','/acerca-de','/entradas','/entradas/categoria','/entradas/categoria/titulo-del-post','/legal','/terminos-y-condiciones','/aviso-de-privacidad','/politica-de-cookies','/derechos-arco'];
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  let currentRoute = $state('/');
  function getRoute() { const path = window.location.pathname.replace(basePath, '') || '/'; return routePaths.includes(path) || path.startsWith('/entradas/categoria/') || /^\/entradas\/[^/]+\/[^/]+$/.test(path) ? path : '/'; }
  function startCase(situation = '') { selectedSituation = situation; document.dispatchEvent(new CustomEvent('open-form', { detail: { situation } })); }
  onMount(() => {
    currentRoute = getRoute();
    const onPopState = () => currentRoute = getRoute();
    window.addEventListener('popstate', onPopState);
    if (currentRoute !== '/') return () => window.removeEventListener('popstate', onPopState);
    document.getElementById('debt')?.setAttribute('inputmode','decimal');
    function updatePointer(event) {
      const button = event.target.closest?.('.btn-primary, .btn-secondary');
      if (!button) return;
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--x', `${event.clientX - rect.left}px`);
      button.style.setProperty('--y', `${event.clientY - rect.top}px`);
    }
    document.addEventListener('pointermove', updatePointer);
    function formatDebt(event) {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.id !== 'debt' || input.dataset.formatting === 'true') return;
      const raw = input.value.replace(/[^\d.]/g, '');
      const parts = raw.split('.');
      const integer = parts[0] || '';
      const decimals = (parts[1] || '').slice(0, 2);
      const next = integer ? `$${Number(integer).toLocaleString('en-US')}${raw.includes('.') ? `.${decimals}` : ''}` : '';
      if (input.value === next) return;
      input.dataset.formatting = 'true'; input.value = next;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      delete input.dataset.formatting;
    }
    function finalizeDebt(event) {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.id !== 'debt' || !input.value) return;
      const amount = Number(input.value.replace(/[$,\s]/g, ''));
      if (!Number.isNaN(amount)) { input.dataset.formatting = 'true'; input.value = `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; input.dispatchEvent(new Event('input', { bubbles: true })); delete input.dataset.formatting; }
    }
    document.addEventListener('input', formatDebt);
    document.addEventListener('blur', finalizeDebt, true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = [...document.querySelectorAll('main > section:not(:first-child)')];
    revealTargets.forEach((section, index) => { section.classList.add('scroll-reveal'); section.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`); });
    const revealObserver = reduce ? null : new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver?.unobserve(entry.target); } }), { threshold: .14, rootMargin: '0px 0px -8% 0px' });
    if (revealObserver) revealTargets.forEach((section) => revealObserver.observe(section)); else revealTargets.forEach((section) => section.classList.add('is-visible'));
    return () => { window.removeEventListener('popstate', onPopState); document.removeEventListener('pointermove', updatePointer); document.removeEventListener('input', formatDebt); document.removeEventListener('blur', finalizeDebt, true); revealObserver?.disconnect(); };
  });
</script>
{#if currentRoute === '/'}<div class:theme-dark={theme === 'dark'} class="site"><a class="skip-link" href="#contenido">Ir al contenido</a><Navbar bind:theme /><main id="contenido"><Hero onStart={startCase} onSelect={(situation) => selectedSituation=situation} /><Opiniones /><TrustBanner /><HowItWorks /><Calculator bind:savingPlan /><Guarantees /><StepWizard {selectedSituation} {savingPlan} /><Faq /><BlogPreview /></main><Footer /><MobileBottomNav /></div>{:else}<RoutePage route={currentRoute} />{/if}<CookieBanner />
