import { readFile, readdir } from 'node:fs/promises';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FACT_FIELDS, validateProvider } from '../research/provider-contract.mjs';
const root = new URL('../', import.meta.url);
const url = value => { try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; } };
export function validateCapabilities(caps, schema) {
  const errors = [];
  if (!caps || typeof caps !== 'object' || Array.isArray(caps)) return ['capabilities must be an object'];
  for (const key of schema.required) if (!(key in caps)) errors.push(`capabilities.${key} is required`);
  for (const [key, entry] of Object.entries(caps)) {
    const prop = schema.properties[key];
    if (!prop) { errors.push(`Unknown capability ${key}`); continue; }
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) { errors.push(`Invalid capability ${key}`); continue; }
    if (Object.keys(entry).some(k => !['value', 'note', 'source_urls'].includes(k))) errors.push(`Unexpected keys in ${key}`);
    if (typeof entry.note !== 'string' || !entry.note.trim()) errors.push(`Missing note in ${key}`);
    const flag = prop.$ref.endsWith('/flag');
    const value = entry.value;
    if (flag ? ![true, false, 'partial', 'unknown'].includes(value) : !(value === null || (typeof value === 'number' && Number.isFinite(value) && value >= 0))) errors.push(`Invalid value in ${key}`);
    const established = flag ? value !== 'unknown' : value !== null;
    if (!Array.isArray(entry.source_urls) || entry.source_urls.some(u => typeof u !== 'string' || !url(u)) || (established && !entry.source_urls.length)) errors.push(`Invalid sources in ${key}`);
  }
  return errors;
}
export function validateDossier(d, schema, filename) {
  const errors = validateProvider(d).filter(x => x.severity === 'error').map(x => `${x.path}: ${x.message}`);
  if (!d || typeof d !== 'object' || Array.isArray(d)) return [...errors, 'Dossier must be an object'];
  const keys = ['id','name','product_name','website','docs_url','researched_at','facts','capabilities','pricing_summary','pricing','performance_claims','research_notes'];
  if (Object.keys(d).some(k => !keys.includes(k))) errors.push('Unexpected root field');
  if (typeof d.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.id) || (filename && basename(filename) !== `${d.id}.json`)) errors.push('ID must match dossier filename');
  for (const k of ['website', 'docs_url']) if (!url(d[k])) errors.push(`${k} must be an HTTP(S) URL`);
  if (typeof d.researched_at !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(d.researched_at) || Number.isNaN(Date.parse(d.researched_at)) || new Date(d.researched_at).toISOString().slice(0,10) !== d.researched_at) errors.push('Invalid research date');
  if (typeof d.pricing_summary !== 'string' || !d.pricing_summary.trim()) errors.push('Missing pricing summary');
  if (!Array.isArray(d.research_notes) || d.research_notes.some(n => typeof n !== 'string')) errors.push('Invalid research notes');
  return [...errors, ...validateCapabilities(d.capabilities, schema)];
}
async function main() {
  const schema = JSON.parse(await readFile(new URL('data/capabilities.schema.json', root)));
  const specified = process.argv.slice(2);
  const files = specified.length ? specified : (await readdir(new URL('data/providers/', root))).filter(f => f.endsWith('.json')).map(f => fileURLToPath(new URL(`data/providers/${f}`, root)));
  const errors = [];
  for (const file of files) {
    try { errors.push(...validateDossier(JSON.parse(await readFile(file, 'utf8')), schema, file).map(e => `${basename(file)}: ${e}`)); }
    catch (e) { errors.push(`${file}: ${e.message}`); }
  }
  const fighters = JSON.parse(await readFile(new URL('data/fighters.json', root)));
  const ids = new Set(fighters.map(f => f.evidenceId));
  if (ids.size !== fighters.length) errors.push('Duplicate fighter evidence IDs');
  // New dossiers require review; shipped fighter metadata is separate from research.
  if (!specified.length) for (const id of ids) if (!files.some(f => basename(f) === `${id}.json`)) errors.push(`Missing shipped fighter dossier: ${id}`);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`Validated ${files.length} dossiers (${FACT_FIELDS.length} factual fields each).`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
