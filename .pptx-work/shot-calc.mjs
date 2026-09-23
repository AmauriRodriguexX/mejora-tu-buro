import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await p.evaluate(()=>localStorage.setItem('mb-cookie-consent','rejected')); await p.reload({waitUntil:'networkidle'});
  const s = p.locator('#simulador'); await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
  await s.screenshot({path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/calc-'+n+'.png'});
  console.log(n, JSON.stringify(await p.evaluate(()=>{const col=document.querySelector('#simulador .grid > div:first-child').getBoundingClientRect(); const card=document.querySelector('#simulador .card').getBoundingClientRect(); return {leftCol:[Math.round(col.top),Math.round(col.bottom)], card:[Math.round(card.top),Math.round(card.bottom)], gap:Math.round(card.bottom-col.bottom)}})));
}
await b.close();
