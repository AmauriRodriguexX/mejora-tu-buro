import { FileBlob, PresentationFile } from '@oai/artifact-tool';
const p=await PresentationFile.importPptx(await FileBlob.load('C:/Users/Amauri/Downloads/Copia de Mejora Buró _ Pitch sep 2026.pptx 22 de sep .pptx'));
console.log('slides keys',Object.keys(p.slides),'items',p.slides.items.length,Object.getOwnPropertyNames(Object.getPrototypeOf(p.slides)));
console.log('slide proto',Object.getOwnPropertyNames(Object.getPrototypeOf(p.slides.items[0])));
console.log(JSON.stringify(p.help('delete remove slide', {search:'slides remove delete',include:['index','examples','notes'],maxChars:5000}),null,2));
const proto=p.toProto(); console.log('proto keys',Object.keys(proto),'slide key',Object.keys(proto.slideList??{}),Array.isArray(proto.slides),proto.slides?.length);
for (const n of [4]) { const s=p.slides.getItem(n-1); console.log('SLIDE',n,'shapes',s.shapes.items.length); for (const sh of s.shapes.items) if(Object.keys(sh.data).some(k=>k.toLowerCase().includes('text'))) console.log(sh.id,JSON.stringify(sh.name),Object.keys(sh.data),JSON.stringify(sh.data).slice(0,1000)); }
const t=p.resolve('sh/zm58fu1o'); console.log('resolved',t?.constructor?.name,Object.keys(t??{}),Object.getOwnPropertyNames(Object.getPrototypeOf(t??{})),JSON.stringify(t?.text));
console.log('slide elements',p.slides.getItem(3).elements,Object.keys(p.slides.getItem(3).elements??{}));
