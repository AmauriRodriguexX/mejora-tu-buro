import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport:{width:360,height:800} });
await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
const before = await p.evaluate(()=>document.querySelector('.hero-situations').offsetHeight);
for (const c of await p.locator('#formulario-captacion .situation-chip').all()) await c.click();
await p.waitForTimeout(300);
console.log('360 grid height before/after select', before, await p.evaluate(()=>document.querySelector('.hero-situations').offsetHeight));
await b.close();
