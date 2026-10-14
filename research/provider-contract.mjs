/** Public provider evidence contract. No judging or scoring logic. */
export const FACT_FIELDS = ["hosted", "self_hosted", "byoc", "official_sdk_languages", "community_sdk_languages", "http_api", "cli", "executable_runtimes", "isolation", "operating_systems", "cpu_options", "memory_options", "disk_options", "gpu_availability", "custom_images", "package_installation", "root_sudo", "docker_support", "background_processes", "file_upload_download", "persistent_filesystem", "volumes", "pause_resume", "resume_preserves_process_memory", "snapshots", "cloning_forking", "outbound_internet", "outbound_restrictions", "inbound_ports", "preview_urls", "private_networking", "concurrency_limit", "max_session_duration", "idle_timeout", "api_rate_limits", "regions", "command_streaming", "logs", "terminal_pty", "secrets", "access_controls", "agent_integrations", "open_source_license"];
const diagnostic = (severity,code,path,message) => ({severity,code,path,message});
const validURL = u => {try {return ['http:','https:'].includes(new URL(u).protocol);} catch {return false;}};


export function validateProvider(profile) {
  const out=[];
  if (!profile || typeof profile !== 'object') return [diagnostic('error','invalid-provider','', 'Provider must be an object.')];
  for (const key of ['id','name','product_name']) if(typeof profile[key]!=='string'||!profile[key].trim()) out.push(diagnostic('error','required-field',key,`Missing ${key}.`));
  if (!Array.isArray(profile.facts)) return [...out, diagnostic('error','invalid-facts','facts','Facts must be an array.')];
  const seen=new Set();
  for(const [i,f] of profile.facts.entries()) {
    const path=`facts.${i}`;
    if(!f||typeof f!=='object') {out.push(diagnostic('error','invalid-fact',path,'Fact must be an object.'));continue;}
    if(seen.has(f.field)) out.push(diagnostic('error','duplicate-fact',`${path}.field`,`Duplicate fact ${f.field}.`));
    seen.add(f.field);
    if(!FACT_FIELDS.includes(f.field)) out.push(diagnostic('error','unknown-fact',`${path}.field`,'Unknown fact field.'));
    if(!['documented','unsupported','unknown'].includes(f.status)) out.push(diagnostic('error','invalid-status',`${path}.status`,'Invalid fact status.'));
    if(f.status==='unknown'&&f.value!==null) out.push(diagnostic('error','unknown-value',`${path}.value`,'Unknown facts must keep a null value.'));
    if(f.status!=='unknown'&&(f.value===null||f.value===undefined)) out.push(diagnostic('error','missing-value',`${path}.value`,'Established facts require a value.'));
    if(typeof f.notes!=='string') out.push(diagnostic('error','missing-notes',`${path}.notes`,'Qualifications must be retained.'));
    if(!Array.isArray(f.source_urls)||(f.status!=='unknown'&&!f.source_urls.length)||f.source_urls?.some(u=>!validURL(u))) out.push(diagnostic('error','invalid-sources',`${path}.source_urls`,'Established facts require valid source URLs.'));
  }
  for(const f of FACT_FIELDS) if(!seen.has(f)) out.push(diagnostic('error','missing-fact',`facts.${f}`,`Missing required fact ${f}.`));
  for(const key of ['pricing','performance_claims']) {
    if(!Array.isArray(profile[key])) {out.push(diagnostic('error','invalid-list',key,`${key} must be an array.`));continue;}
    for(const [i,item] of profile[key].entries()) {
      const required=key==='pricing'?['item','plan','published_price','conditions']:['metric','published_claim','conditions'];
      for(const field of required) if(typeof item?.[field]!=='string') out.push(diagnostic('error','invalid-entry',`${key}.${i}.${field}`,`Missing ${field}.`));
      if(!Array.isArray(item?.source_urls)||!item.source_urls.length||item.source_urls.some(u=>!validURL(u))) out.push(diagnostic('error','invalid-sources',`${key}.${i}.source_urls`,'Evidence requires valid source URLs.'));
    }
  }
  for(const [key,c] of Object.entries(profile.capabilities??{})) {
    if(typeof c?.value==='number'&&(!Number.isFinite(c.value)||c.value<0)) out.push(diagnostic('error','invalid-quantity',`capabilities.${key}.value`,'Quantity must be finite and nonnegative; unavailable is unknown, not unlimited.'));
  }
  return out;
}
