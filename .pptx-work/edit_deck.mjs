import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { FileBlob, PresentationFile } from '@oai/artifact-tool';

const SKILL_DIR = 'C:/Users/Amauri/.codex/plugins/cache/openai-primary-runtime/presentations/26.921.11914/skills/presentations';
const RUNTIME_PYTHON = 'C:/Users/Amauri/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
const workspaceDir = 'D:/t2o carpet especial/mejora-tu-buro/mejora-tu-buro';
const sourcePath = 'C:/Users/Amauri/Downloads/Copia de Mejora Buró _ Pitch sep 2026.pptx 22 de sep .pptx';
const finalPath = path.join(workspaceDir, '.pptx-output', 'Mejora_Buro_Pitch_UX.pptx');
const stagingDir = path.join(workspaceDir, '.pptx-work', 'staging');
await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));
const keep = new Set([2,3,4,6,8,9,10,11,13,14,15,16]);
for (let i = presentation.slides.items.length; i >= 1; i--) {
  if (!keep.has(i)) presentation.slides.getItem(i - 1).delete();
}
const candidatePath = path.join(stagingDir, 'candidate.pptx');
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, 'container_tools/artifact_tool_utils.mjs')).href);
const result = await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, 'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath: path.join(SKILL_DIR, 'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs: ['--expected-slide-size-emu', '9144000,5143500', '--validate-bullet-geometry', '--validate-heading-fit'],
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, 'Mejora_Buro_Pitch_UX.validation.json'),
});
console.log(JSON.stringify(result, null, 2));

const finalDeck = await PresentationFile.importPptx(await FileBlob.load(finalPath));
const outDir = path.join(workspaceDir, '.pptx-work', 'final-render');
await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, 'slide-count.txt'), String(finalDeck.slides.items.length));
for (let i = 0; i < finalDeck.slides.items.length; i++) {
  const blob = await finalDeck.slides.getItem(i).export({ format: 'png', scale: 1 });
  await fs.writeFile(path.join(outDir, `slide-${String(i + 1).padStart(2,'0')}.png`), new Uint8Array(await blob.arrayBuffer()));
}
const snapshot = await finalDeck.inspect({ kind: 'slide,textbox', include: 'id,title,textPreview', maxChars: 1000000 });
await fs.writeFile(path.join(outDir, 'inspect.ndjson'), snapshot.ndjson, 'utf8');
console.log(`Final slides: ${finalDeck.slides.items.length}; file: ${finalPath}`);
