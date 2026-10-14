import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateDossier } from './validate-providers.mjs';
const schema=JSON.parse(await readFile(new URL('../data/capabilities.schema.json',import.meta.url)));
const fixture=JSON.parse(await readFile(new URL('../data/providers/modal.json',import.meta.url)));
test('research-only provider can validate without joining shipped roster',()=>{
 const d=structuredClone(fixture);d.id='new-provider';assert.deepEqual(validateDossier(d,schema,'new-provider.json'),[]);
});
test('reject invalid evidence, filenames and quantitative capabilities',()=>{
 const d=structuredClone(fixture);d.facts[0].source_urls=['javascript:alert(1)'];d.capabilities.max_vcpu.value=-1;
 const errors=validateDossier(d,schema,'another.json');
 assert.ok(errors.some(e=>/source/i.test(e)));assert.ok(errors.some(e=>e.includes('filename')));assert.ok(errors.some(e=>e.includes('max_vcpu')));
});
test('unknown facts require null and capability source URLs remain required',()=>{
 const d=structuredClone(fixture);d.facts[0].status='unknown';d.facts[0].value=true;d.capabilities.gpu={value:true,note:'Claim',source_urls:[]};
 const errors=validateDossier(d,schema,'modal.json');assert.ok(errors.some(e=>e.includes('null')));assert.ok(errors.some(e=>e.includes('gpu')));
});
test('every factual field appears exactly once',()=>{
 const d=structuredClone(fixture);d.facts[1]=structuredClone(d.facts[0]);const errors=validateDossier(d,schema,'modal.json');assert.ok(errors.some(e=>e.includes('Duplicate')));assert.ok(errors.some(e=>e.includes('Missing required fact')));
});
