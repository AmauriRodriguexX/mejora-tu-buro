import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const w of [1024,1280,1440,1920,390]) {
  const p = await b.newPage({ viewport:{width:w,height:900} });
  await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  console.log(w, JSON.stringify(await p.evaluate(()=>{const a=document.querySelector('.calc-aside'); const col=document.querySelector('#simulador .grid > div:first-child').getBoundingClientRect(); const card=document.querySelector('#simulador .card').getBoundingClientRect(); const nat=card.height; return {asideVisible:getComputedStyle(a).display!=='none', leftContentBottom:Math.round(a.getBoundingClientRect().bottom-card.top), cardHeight:Math.round(card.height), overflowX:document.documentElement.scrollWidth>innerWidth}})));
  await p.close();
}
await b.close();
