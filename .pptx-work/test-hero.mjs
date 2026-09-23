import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errs=[];
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  p.on('pageerror',e=>errs.push(n+': '+e.message));
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'}); await p.waitForTimeout(500);
  await p.screenshot({ path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/'+n+'-after.png' });
  const m = await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]};
    const small=[...document.querySelectorAll('#formulario-captacion *')].filter(e=>e.childNodes.length&&[...e.childNodes].some(c=>c.nodeType===3&&c.textContent.trim())&&e.offsetParent).map(e=>[e.tagName+'.'+e.className,parseFloat(getComputedStyle(e).fontSize)]).filter(x=>x[1]<13);
    const inputs=[...document.querySelectorAll('#formulario-captacion input.field')].map(e=>getComputedStyle(e).fontSize);
    return {card:q('.hero-intake-card'),cta:q('.hero-submit'),review:q('.hero-review'),cookie:q('.cookie-banner'),overflowX:document.documentElement.scrollWidth>innerWidth,small,inputs}});
  console.log(n, JSON.stringify(m));
  await p.getByRole('button',{name:/Continuar con mi caso/}).click();
  const f = await p.evaluate(()=>({focus:document.activeElement?.id, alerts:[...document.querySelectorAll('#formulario-captacion [role=alert]')].map(e=>e.textContent)}));
  console.log(n,'empty submit', JSON.stringify(f));
  if(n==='mobile') await p.screenshot({ path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/mobile-errors.png' });
  await p.locator('#formulario-captacion .situation-chip', {hasText:'Pagos atrasados'}).click();
  await p.locator('#formulario-captacion .situation-chip', {hasText:'Llamadas de cobranza'}).click(); if(!(await p.locator('#hero-situation-2').isChecked())) throw new Error('chip click did not check');
  await p.locator('#hero-name').fill('Prueba UX');
  await p.locator('#hero-phone').fill('5512345678');
  await p.locator('#hero-privacy').check();
  await p.getByRole('button',{name:/Continuar con mi caso/}).click();
  await p.getByRole('dialog').waitFor();
  const d = await p.evaluate(()=>({focus:document.activeElement?.id, summary:document.querySelector('[role=dialog]').innerText.match(/Lo que te preocupa:[^\n]*/)?.[0], hasSituationQuestion:!!document.querySelector('[role=dialog] .situation-chip'), email:!!document.getElementById('lead-email')}));
  console.log(n,'modal', JSON.stringify(d));
  if(n==='mobile') await p.screenshot({ path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/mobile-step2-after.png' });
  await p.close();
}
// calculator path: modal without hero data
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
await p.evaluate(()=>document.dispatchEvent(new CustomEvent('open-form')));
await p.locator('#lead-name').fill('Calc'); await p.locator('#lead-phone').fill('5512345678');
await p.getByRole('dialog').getByRole('checkbox',{name:/Aviso de Privacidad/}).check();
await p.getByRole('dialog').getByRole('button',{name:'Continuar'}).click();
console.log('calc path chips in step 2:', await p.locator('[role=dialog] .situation-chip').count());
await p.getByRole('dialog').getByRole('button',{name:'Enviar solicitud'}).click();
console.log('calc path errors:', await p.locator('#lead-situation-error').textContent());
// keyboard: header CTA focuses first chip
await p.keyboard.press('Escape');
await p.getByRole('link',{name:'Revisar mi caso'}).first().click(); await p.waitForTimeout(400);
console.log('header CTA focus:', await p.evaluate(()=>document.activeElement?.id));
console.log('errors', JSON.stringify(errs));
await b.close();
