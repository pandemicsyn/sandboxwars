import { readdir, readFile, writeFile } from 'node:fs/promises';
const base = new URL('../', import.meta.url);
const cell = x => String(x ?? 'unknown').replaceAll('|','\\|').replaceAll('\n',' ');
const profiles = await Promise.all((await readdir(new URL('data/providers/',base))).filter(f=>f.endsWith('.json')).sort().map(async f=>JSON.parse(await readFile(new URL(`data/providers/${f}`,base)))));
const header = '# Provider features\n\nGenerated from provider dossiers; edit JSON and run `npm run research:generate`. Values are dated evidence, not rankings.\n\n| Provider | Field | Status | Value | Qualifications | Sources |\n| --- | --- | --- | --- | --- | --- |\n';
const features = header + profiles.flatMap(d=>d.facts.map(f=>`| ${[d.name,f.field,f.status,typeof f.value==='object'&&f.value!==null?JSON.stringify(f.value):f.value,f.notes,f.source_urls.join(' ')].map(cell).join(' | ')} |`)).join('\n')+'\n';
const pricing = '# Published pricing\n\nGenerated from provider dossiers. Published units and billing conditions are preserved.\n\n| Provider | Item | Plan | Published price | Conditions | Sources |\n| --- | --- | --- | --- | --- | --- |\n'+profiles.flatMap(d=>d.pricing.map(p=>`| ${[d.name,p.item,p.plan,p.published_price,p.conditions,p.source_urls.join(' ')].map(cell).join(' | ')} |`)).join('\n')+'\n';
const gaps = '# Unknowns and research notes\n\nGenerated from provider dossiers. See each dossier for source URLs and qualifications.\n\n'+profiles.map(d=>`## ${d.name} (${d.researched_at})\n\n`+d.facts.filter(f=>f.status==='unknown').map(f=>`- **${f.field}:** ${f.notes}`).concat(d.research_notes.map(n=>`- ${n}`)).join('\n')).join('\n\n')+'\n';
for (const [file,text] of Object.entries({'feature-matrix.md':features,'pricing-matrix.md':pricing,'gaps.md':gaps})) {
 const path=new URL(`research/${file}`,base);
 if (process.argv.includes('--check')) { if(await readFile(path,'utf8')!==text) throw Error(`Stale ${file}; run npm run research:generate`); }
 else await writeFile(path,text);
}
console.log(process.argv.includes('--check')?'Research tables match dossiers.':'Generated research tables.');
