import { cp, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, '..', 'dist');
const routes = ['como-funciona','calculadora','testimonios','acerca-de','entradas','entradas/categoria','entradas/categoria/convenios','entradas/categoria/deudas','entradas/categoria/cobranza','entradas/categoria/finanzas-personales','entradas/categoria/credito','entradas/categoria/buro-de-credito','entradas/categoria/titulo-del-post','entradas/categoria/carta-convenio-de-pago','entradas/categoria/como-negociar-una-quita-con-el-banco','entradas/categoria/un-despacho-de-cobranza-me-puede-embargar','entradas/categoria/como-manejar-el-estres-financiero','entradas/categoria/como-elegir-una-financiera-segura-en-mexico','entradas/convenios/carta-convenio-de-pago','entradas/deudas/como-negociar-una-quita-con-el-banco','entradas/cobranza/un-despacho-de-cobranza-me-puede-embargar','entradas/finanzas-personales/como-manejar-el-estres-financiero','entradas/credito/como-elegir-una-financiera-segura-en-mexico','entradas/buro-de-credito/buro-de-credito','legal','terminos-y-condiciones','aviso-de-privacidad','politica-de-cookies','derechos-arco'];
for (const route of routes) {
  const target = join(dist, route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await cp(join(dist, 'index.html'), target);
}
await cp(join(dist, 'index.html'), join(dist, '404.html'));
