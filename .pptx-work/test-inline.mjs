import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errs=[];
const box = (p,s) => p.evaluate(s=>{const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect(); return [Math.round(r.top),Math.round(r.bottom)]}, s);
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} }); p.on('pageerror',e=>errs.push(n+': '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push(n+' console: '+m.text()); });
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await p.evaluate(()=>localStorage.setItem('mb-cookie-consent','rejected')); await p.reload({waitUntil:'networkidle'});
  const card='#formulario-captacion';
  await p.locator('.situation-chip',{hasText:'Pagos atrasados'}).click();
  await p.locator('.situation-chip',{hasText:'Llamadas de cobranza'}).click();
  await p.locator('#hero-name').fill('Ana López');
  await p.locator('#hero-phone').click(); await p.keyboard.type('5512345678');
  await p.locator('#hero-privacy').check();
  await p.getByRole('button',{name:/Continuar con mi caso/}).click(); await p.waitForTimeout(450);
  console.log(n,'step2', JSON.stringify({dialog:await p.locator('[role=dialog]').count(), heading:await p.locator(card+' h2').innerText(), summary:(await p.locator('.hero-summary p').innerText()).replace(/\n/g,' | '), focus:await p.evaluate(()=>document.activeElement.id), card:await box(p,card), cta:await box(p,card+' .hero-step-actions'), scrollY:await p.evaluate(()=>scrollY)}));
  await p.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/step2-'+n+'.png'});
  // empty submit on step 2
  await p.getByRole('button',{name:'Enviar solicitud'}).click(); await p.waitForTimeout(150);
  console.log(n,'step2 errors', JSON.stringify(await p.locator(card+' .hero-field-error').allInnerTexts()), 'focus', await p.evaluate(()=>document.activeElement.id));
  if(n==='mobile') await p.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/step2-errors-mobile.png'});
  // Editar keeps data
  await p.getByRole('button',{name:'Editar'}).click(); await p.waitForTimeout(300);
  console.log(n,'back to step1 keeps', JSON.stringify({name:await p.locator('#hero-name').inputValue(), phone:await p.locator('#hero-phone').inputValue(), chips:await p.locator('.situation-chip input:checked').count(), privacy:await p.locator('#hero-privacy').isChecked()}));
  await p.getByRole('button',{name:/Continuar con mi caso/}).click(); await p.waitForTimeout(300);
  await p.locator('#hero-debt').selectOption('$41,000 - $99,000');
  await p.locator('#hero-institutions').click(); await p.waitForTimeout(150);
  await p.locator('.institution-picker-option',{hasText:'Coppel / Bancoppel'}).click();
  await p.locator('.institution-picker-option',{hasText:'BBVA Bancomer'}).click();
  if(n==='mobile') await p.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/step2-picker-mobile.png'});
  await p.getByRole('button',{name:'Seleccionar'}).click(); await p.waitForTimeout(150);
  console.log(n,'institutions summary:', await p.locator('#hero-institutions-value').innerText(), 'errors now:', JSON.stringify(await p.locator(card+' .hero-field-error').allInnerTexts()));
  await p.locator('#hero-email').fill('ana@'); await p.locator('#hero-debt').focus();
  console.log(n,'email blur error:', JSON.stringify(await p.locator(card+' .hero-field-error').allInnerTexts()));
  await p.locator('#hero-email').fill('ana@correo.com');
  await p.getByRole('button',{name:'Enviar solicitud'}).click(); await p.waitForTimeout(450);
  console.log(n,'done', JSON.stringify({title:await p.locator(card+' h2').innerText(), focus:await p.evaluate(()=>document.activeElement.id), card:await box(p,card)}));
  if(n==='desktop') await p.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/done-desktop.png'});
  await p.close();
}
// calculator path
const p = await b.newPage({ viewport:{width:1440,height:900} }); p.on('pageerror',e=>errs.push('calc: '+e.message));
await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
await p.evaluate(()=>localStorage.setItem('mb-cookie-consent','rejected')); await p.reload({waitUntil:'networkidle'});
const calcBtn = p.locator('#simulador button').filter({hasText:/plan|caso|revis|enviar|asesor/i}).last();
console.log('calc button text:', await calcBtn.innerText());
await calcBtn.scrollIntoViewIfNeeded(); await calcBtn.click(); await p.waitForTimeout(1600);
console.log('calc', JSON.stringify({scrollY:await p.evaluate(()=>scrollY), spot:await p.locator('#formulario-captacion').evaluate(e=>e.classList.contains('is-spotlight')), focus:await p.evaluate(()=>document.activeElement.id)}));
await p.locator('.situation-chip',{hasText:'Carta convenio'}).click(); await p.locator('#hero-name').fill('Luis'); await p.locator('#hero-phone').click(); await p.keyboard.type('5512345678'); await p.locator('#hero-privacy').check();
await p.getByRole('button',{name:/Continuar con mi caso/}).click(); await p.waitForTimeout(400);
console.log('calc step2', JSON.stringify({debt:await p.locator('#hero-debt').inputValue(), plan:await p.locator('.hero-plan-note').innerText().catch(()=>null), focus:await p.evaluate(()=>document.activeElement.id)}));
await p.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/step2-calc-desktop.png'});
console.log('errors', JSON.stringify(errs)); await b.close();
