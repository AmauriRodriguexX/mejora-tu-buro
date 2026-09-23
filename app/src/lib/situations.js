// Single catalog for the lead's situation: used by the hero chips, the modal fallback and the summary.
export const situations = [
  { id: 'atrasos', label: 'Pagos atrasados' },
  { id: 'minimos', label: 'Solo pago el mínimo' },
  { id: 'llamadas', label: 'Llamadas de cobranza' },
  { id: 'convenio', label: 'Carta convenio' },
  { id: 'otro', label: 'Otra situación' }
];

export function situationLabels(ids = []) {
  return situations.filter((item) => ids.includes(item.id)).map((item) => item.label).join(' · ');
}
