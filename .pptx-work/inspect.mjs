import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, PresentationFile } from '@oai/artifact-tool';

const sourcePath = 'C:/Users/Amauri/Downloads/Copia de Mejora Buró _ Pitch sep 2026.pptx 22 de sep .pptx';
const outDir = path.resolve('.pptx-work/source-render');
await fs.mkdir(outDir, { recursive: true });
const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));
const snapshot = await presentation.inspect({
  kind: 'slide,textbox,shape,image,table,chart,notes,layout',
  include: 'id,slide,name,title,textPreview,textChars,textLines,bbox,bboxUnit,rows,cols,alt,chartType',
  maxChars: 1000000,
});
await fs.writeFile(path.join(outDir, 'inspect.ndjson'), snapshot.ndjson, 'utf8');
await fs.writeFile(path.join(outDir, 'slide-count.txt'), String(presentation.slides.items.length), 'utf8');
const montage = await presentation.export({ format: 'png', montage: true, scale: 0.35 });
await fs.writeFile(path.join(outDir, 'montage.png'), new Uint8Array(await montage.arrayBuffer()));
for (let i = 0; i < presentation.slides.items.length; i++) {
  const slide = presentation.slides.items[i];
  const preview = await slide.export({ format: 'png', scale: 1 });
  await fs.writeFile(path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`), new Uint8Array(await preview.arrayBuffer()));
}
console.log(`slides=${presentation.slides.items.length}`);
console.log(path.join(outDir, 'inspect.ndjson'));
