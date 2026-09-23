import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const w of [360,375,390,414]) {
  const p = await b.newPage({ viewport:{width:w,height:844} });
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  for (const c of await p.locator('#formulario-captacion .situation-chip').all()) await c.click();
  await p.waitForTimeout(300);
  console.log(w, JSON.stringify(await p.evaluate(()=>({overflowX:document.documentElement.scrollWidth>innerWidth, chips:[...document.querySelectorAll('#formulario-captacion .situation-chip')].map(l=>l.scrollWidth>l.clientWidth+1?'OVERFLOW '+l.textContent:'ok')}))));
}
await b.close();
