import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport:{width:390,height:844} });
await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
const ph=p.locator('#hero-phone');
await ph.click(); await p.keyboard.type('5512'); await p.locator('#hero-name').click();
await ph.click(); await p.keyboard.press('End'); await p.keyboard.type('345678');
console.log('append:', await ph.inputValue());
// edit in the middle: put caret after "55 1" and type 9
await ph.evaluate(e=>e.setSelectionRange(4,4)); await p.keyboard.type('9');
console.log('insert middle:', await ph.inputValue(), 'caret', await ph.evaluate(e=>e.selectionStart));
await ph.evaluate(e=>e.setSelectionRange(5,5)); await p.keyboard.press('Backspace');
console.log('backspace middle:', await ph.inputValue(), 'caret', await ph.evaluate(e=>e.selectionStart));
await ph.fill(''); await ph.evaluate(e=>{e.value='+52 (55) 1234-5678';e.dispatchEvent(new Event('input',{bubbles:true}))});
console.log('paste with +52:', await ph.inputValue());
for (const v of ['+52 1 55 1234 5678','5215512345678','55-1234-5678','551234567899']) { await ph.fill(''); await ph.evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},v); console.log('paste',v,'->',await ph.inputValue()); }
await ph.fill(''); await ph.click(); await p.keyboard.type('5512345678'); await ph.evaluate(e=>e.setSelectionRange(4,4)); await p.keyboard.type('9');
console.log('insert when full:', await ph.inputValue());
await b.close();
