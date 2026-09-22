<script>
  let { selectedCreditors = $bindable([]), onCreditorChange = () => {} } = $props();

  let searchQuery = $state('');
  let activeTab = $state('todas');

  const catalog = [
    // Departamentales (66% de penetración según el research)
    { id: 'liverpool', name: 'Liverpool', cat: 'departamentales', icon: '🛍️' },
    { id: 'sears', name: 'Sears', cat: 'departamentales', icon: '🛍️' },
    { id: 'palacio', name: 'Palacio de Hierro', cat: 'departamentales', icon: '🛍️' },
    { id: 'suburbia', name: 'Suburbia', cat: 'departamentales', icon: '🛍️' },
    { id: 'bradescard', name: 'C&A / Bradescard', cat: 'departamentales', icon: '🛍️' },
    { id: 'falabella', name: 'Soriana / Falabella', cat: 'departamentales', icon: '🛍️' },
    { id: 'sanborns', name: 'Sanborns', cat: 'departamentales', icon: '🛍️' },

    // Bancos Tradicionales
    { id: 'bbva', name: 'BBVA Bancomer', cat: 'bancos', icon: '🏦' },
    { id: 'santander', name: 'Santander', cat: 'bancos', icon: '🏦' },
    { id: 'banorte', name: 'Banorte', cat: 'bancos', icon: '🏦' },
    { id: 'citibanamex', name: 'Citibanamex', cat: 'bancos', icon: '🏦' },
    { id: 'hsbc', name: 'HSBC', cat: 'bancos', icon: '🏦' },
    { id: 'scotiabank', name: 'Scotiabank', cat: 'bancos', icon: '🏦' },
    { id: 'inbursa', name: 'Inbursa', cat: 'bancos', icon: '🏦' },
    { id: 'amex', name: 'American Express', cat: 'bancos', icon: '🏦' },

    // Financieras & Fintechs
    { id: 'nu', name: 'NU México', cat: 'fintechs', icon: '📱' },
    { id: 'kueski', name: 'Kueski', cat: 'fintechs', icon: '📱' },
    { id: 'moneyman', name: 'Moneyman', cat: 'fintechs', icon: '📱' },
    { id: 'dineria', name: 'Dineria', cat: 'fintechs', icon: '📱' },
    { id: 'lendon', name: 'Lendon / Avafin', cat: 'fintechs', icon: '📱' },
    { id: 'kubo', name: 'Kubo Financiero', cat: 'fintechs', icon: '📱' },
    { id: 'apoyo', name: 'Apoyo Económico', cat: 'fintechs', icon: '📱' },
    { id: 'exitus', name: 'Exitus Credit', cat: 'fintechs', icon: '📱' },
    { id: 'dimex', name: 'DIMEX', cat: 'fintechs', icon: '📱' },

    // Compradoras de Cartera
    { id: 'finastrategy', name: 'Finastrategy', cat: 'cartera', icon: '📁' },
    { id: 'secorse', name: 'Secorse', cat: 'cartera', icon: '📁' },
    { id: 'ibkan', name: 'Ibkan Capital', cat: 'cartera', icon: '📁' },
    { id: 'zendere', name: 'Zendere', cat: 'cartera', icon: '📁' },

    // Restringidos / Con advertencia educativa
    { id: 'azteca', name: 'Banco Azteca / Elektra', cat: 'restringido', icon: '⚠️', isRestricted: true },
    { id: 'coppel', name: 'Coppel / Bancoppel', cat: 'restringido', icon: '⚠️', isRestricted: true }
  ];

  let filteredCatalog = $derived.by(() => {
    return catalog.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeTab === 'todas') return matchSearch;
      if (activeTab === 'restringido') return matchSearch && item.isRestricted;
      return matchSearch && item.cat === activeTab;
    });
  });

  let hasRestrictedSelected = $derived.by(() => {
    return selectedCreditors.some(id => id === 'azteca' || id === 'coppel');
  });

  function toggleCreditor(id) {
    if (selectedCreditors.includes(id)) {
      selectedCreditors = selectedCreditors.filter(item => item !== id);
    } else {
      selectedCreditors = [...selectedCreditors, id];
    }
    onCreditorChange(selectedCreditors);
  }
</script>

<div class="space-y-4">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h3 class="text-base font-bold text-white flex items-center gap-2">
        <span>Selecciona las instituciones con las que tienes compromisos</span>
        <span class="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#30afb8]/20 text-[#30afb8]">
          {selectedCreditors.length} seleccionados
        </span>
      </h3>
      <p class="text-xs text-slate-400">Puedes marcar varias entidades a la vez.</p>
    </div>

    <!-- Buscador en tiempo real para evitar scroll infinito -->
    <div class="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Buscar banco o tienda..."
        bind:value={searchQuery}
        class="w-full px-3.5 py-2 pl-9 rounded-xl glass-input text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#30afb8]"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      {#if searchQuery}
        <button
          type="button"
          onclick={() => searchQuery = ''}
          class="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
        >
          ✕
        </button>
      {/if}
    </div>
  </div>

  <!-- Pestañas de Filtrado Rápido -->
  <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
    <button
      type="button"
      onclick={() => activeTab = 'todas'}
      class="px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors {activeTab === 'todas' ? 'bg-[#30afb8] text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
    >
      Todas ({catalog.length})
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'departamentales'}
      class="px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors {activeTab === 'departamentales' ? 'bg-[#30afb8] text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
    >
      Departamentales
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'bancos'}
      class="px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors {activeTab === 'bancos' ? 'bg-[#30afb8] text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
    >
      Bancos
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'fintechs'}
      class="px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors {activeTab === 'fintechs' ? 'bg-[#30afb8] text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
    >
      Fintechs & Apps
    </button>
    <button
      type="button"
      onclick={() => activeTab = 'cartera'}
      class="px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors {activeTab === 'cartera' ? 'bg-[#30afb8] text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'}"
    >
      Cobranza / Cartera
    </button>
  </div>

  <!-- Grid de Checkboxes Homologados y Accesibles -->
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-1">
    {#each filteredCatalog as item}
      {@const isSelected = selectedCreditors.includes(item.id)}
      <button
        type="button"
        onclick={() => toggleCreditor(item.id)}
        class="flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-150 {isSelected ? 'bg-[#30afb8]/15 border-[#30afb8] shadow-sm shadow-[#30afb8]/20' : 'bg-slate-900/70 border-white/10 hover:border-white/20 hover:bg-slate-800/50'} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30afb8]"
      >
        <div class="flex items-center gap-2 min-w-0">
          <span class="text-sm shrink-0">{item.icon}</span>
          <span class="text-xs font-semibold text-slate-200 truncate">{item.name}</span>
        </div>

        <!-- Custom Checkbox Box -->
        <div class="w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors {isSelected ? 'bg-[#30afb8] border-[#30afb8] text-slate-950' : 'border-slate-600 bg-slate-950/40'}">
          {#if isSelected}
            <svg class="w-3 h-3 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          {/if}
        </div>
      </button>
    {/each}
  </div>

  <!-- Aviso Amable e Informativo si seleccionan Banco Azteca o Coppel (Filtrado del Research) -->
  {#if hasRestrictedSelected}
    <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-in fade-in duration-200">
      <span class="text-lg shrink-0">💡</span>
      <div class="space-y-1 text-xs">
        <p class="font-bold text-amber-300">
          Nota sobre Banco Azteca o Coppel:
        </p>
        <p class="text-amber-200/90 leading-relaxed">
          Estas instituciones no aceptan programas tradicionales de quita negociada por sus esquemas internos de crédito. Sin embargo, <strong>en tu asesoría inicial te explicaremos cómo proteger tu patrimonio</strong> y canalizar tus demás deudas elegibles para ahorrar.
        </p>
      </div>
    </div>
  {/if}
</div>
