import { chromium } from 'playwright';
const base = process.argv[2] || 'http://127.0.0.1:5173';
const tag = process.argv[3] || 'dev';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errs=[]; 
for (const [n,w,h,reduce] of [['desktop',1440,900,false],['mobile',390,844,false],['reduced',390,844,true]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, reducedMotion: reduce?'reduce':'no-preference' });
  const p = await ctx.newPage(); p.on('pageerror',e=>errs.push(n+': '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push(n+' console: '+m.text()); });
  const reqs=[]; p.on('request',r=>{ if(/wasm|lottie|dotlottie/.test(r.url())) reqs.push(r.url().split('/').pop().slice(0,40)); });
  let apiCalls=0; await p.route('**/api/**', r => { apiCalls++; r.abort(); });
  await p.goto(base+'/',{waitUntil:'networkidle'});
  await p.evaluate(()=>localStorage.setItem('mb-cookie-consent','rejected')); await p.reload({waitUntil:'networkidle'});
  const before = reqs.length;
  await p.locator('.situation-chip',{hasText:'Pagos atrasados'}).click();
  await p.locator('#hero-name').fill('Ana López'); await p.locator('#hero-phone').click(); await p.keyboard.type('5512345678'); await p.locator('#hero-privacy').check();
  await p.getByRole('button',{name:/Continuar con mi caso/}).click(); await p.waitForTimeout(300);
  await p.locator('#hero-debt').selectOption({index:2});
  await p.locator('#hero-institutions').click(); await p.locator('.institution-picker-option',{hasText:'Liverpool'}).click(); await p.getByRole('button',{name:'Seleccionar'}).click();
  await p.getByRole('button',{name:/Enviar solicitud/}).click();
  const card = p.locator('#formulario-captacion');
  for (const t of (n==='desktop'?[400,1200,2500,4500]:[4500])) { await p.waitForTimeout(t - (n==='desktop'&&t>400? [400,1200,2500,4500][[400,1200,2500,4500].indexOf(t)-1] : 0)); await card.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/lottie-'+tag+'-'+n+'-'+t+'.png'}); }
  console.log(tag,n, JSON.stringify({lottieReqsBeforeSubmit:before, lottieReqsAfter:reqs, ready: await p.locator('.hero-done-animation').evaluate(e=>e.classList.contains('is-ready')), title: await card.locator('h2').innerText(), demoTag: await card.locator('.hero-demo-tag').count(), apiCalls, card: await card.boundingBox().then(b=>[Math.round(b.y),Math.round(b.y+b.height)])}));
  await ctx.close();
}
console.log('errors', JSON.stringify(errs)); await b.close();
