import { readFile, access, readdir } from 'node:fs/promises';
const base = new URL('../output/fighter-study/', import.meta.url);
const roster = JSON.parse(await readFile(new URL('roster.json', base)));
const judge = JSON.parse(await readFile(new URL('judge-jev.json', base)));
const errors=[];
for (const [id, art] of [...Object.entries(roster), ['judge',judge]]) {
 const png=await readFile(new URL(art.file,base));
 if(png.subarray(0,8).toString('hex')!=='89504e470d0a1a0a') { errors.push(`${id}: invalid PNG`); continue; }
 const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
 if(art.width!==width||art.height!==height) errors.push(`${id}: dimensions disagree with PNG`);
 for(const f of art.frames) if(![f.x,f.y,f.w,f.h].every(Number.isFinite)||f.x<0||f.y<0||f.w<=0||f.h<=0||f.x+f.w>width||f.y+f.h>height) errors.push(`${id}: frame outside image`);
 if(art.portrait?.file) await access(new URL(art.portrait.file,base));
}
for(const name of await readdir(base)) if(name.endsWith('.json')) JSON.parse(await readFile(new URL(name,base)));
if(errors.length) { console.error(errors.join('\n'));process.exitCode=1; } else console.log(`Validated ${Object.keys(roster).length} fighter sheets, judge and prompt JSON.`);
