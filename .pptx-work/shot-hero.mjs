import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const [n,w,h] of [['desktop',1440,900],['mobile',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await p.waitForTimeout(600);
  await p.screenshot({ path:'C:/Users/Amauri/AppData/Local/Temp/claude/D--t2o-carpet-especial-mejora-tu-buro-mejora-tu-buro/07e66327-91f7-4a14-ba0e-0b6b83073b6e/scratchpad/'+n+'-hero.png' });
  const r = await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {y:Math.round(r.top),bottom:Math.round(r.bottom),h:Math.round(r.height),w:Math.round(r.width)}};return {card:q('.hero-intake-card'),cta:q('.hero-submit'),h1:q('#hero h1'),review:q('.hero-review'),cookie:q('.cookie-banner'),overflowX:document.documentElement.scrollWidth>innerWidth}});
  console.log(n, JSON.stringify(r));
}
await b.close();
