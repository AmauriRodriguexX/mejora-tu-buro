import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errs=[];
const state = p => p.evaluate(()=>({scrollY:Math.round(scrollY), spot:document.getElementById('formulario-captacion')?.classList.contains('is-spotlight'), focus:document.activeElement?.id}));
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} }); p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await p.evaluate(()=>localStorage.setItem('mb-cookie-consent','rejected')); await p.reload({waitUntil:'networkidle'});
  if(n==='desktop'){ await p.getByRole('link',{name:'Revisar mi caso'}).first().click(); await p.waitForTimeout(200); console.log(n,'at top', JSON.stringify(await state(p))); }
  for (const y of [1200, 4000]) {
    await p.evaluate(y=>scrollTo(0,y), y); await p.waitForTimeout(400);
    const link = n==='desktop' ? p.getByRole('link',{name:'Revisar mi caso'}).first() : p.locator('.mobile-bottom-primary');
    await link.click();
    await p.waitForTimeout(150); const mid = await state(p);
    await p.waitForTimeout(1300); const end = await state(p);
    console.log(n,'from',y,'mid',JSON.stringify(mid),'end',JSON.stringify(end));
  }
  if(n==='mobile'){ await p.evaluate(()=>scrollTo(0,2000)); await p.waitForTimeout(400); await p.locator('.mobile-bottom-primary').click(); await p.waitForTimeout(1500); await p.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/spotlight-mobile.png'}); console.log('bottom nav visible at end:', await p.locator('.mobile-bottom-nav').count()); }
  await p.close();
}
// from another route
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://127.0.0.1:5173/como-funciona',{waitUntil:'networkidle'});
await p.evaluate(()=>scrollTo(0,600)); await p.waitForTimeout(300);
await p.getByRole('link',{name:'Revisar mi caso'}).first().click(); await p.waitForTimeout(1600);
console.log('from /como-funciona', JSON.stringify(await state(p)), p.url());
console.log('errors', JSON.stringify(errs)); await b.close();
