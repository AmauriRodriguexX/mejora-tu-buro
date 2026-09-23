import { chromium } from 'playwright';
const S=process.argv[2];
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await p.evaluate(()=>localStorage.setItem('mb-cookie-consent','rejected')); await p.reload({waitUntil:'networkidle'});
  await p.locator('.situation-chip',{hasText:'Pagos atrasados'}).first().click();
  await p.locator('.situation-chip',{hasText:'Llamadas de cobranza'}).first().click();
  await p.mouse.move(5,5); await p.waitForTimeout(400);
  await p.locator('#formulario-captacion').screenshot({path:S+'/chips-'+n+'.png'});
}
await b.close();
