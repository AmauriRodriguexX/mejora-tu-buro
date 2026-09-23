import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
await p.locator('.situation-chip',{hasText:'Pagos atrasados'}).first().click(); await p.mouse.move(5,5); await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const l=document.querySelector('.situation-chip');const c=getComputedStyle(l);return {bg:c.backgroundColor,color:c.color,opacity:c.opacity,filter:c.filter,anim:c.animationName, parentOpacity:getComputedStyle(l.parentElement).opacity}}));
await b.close();
