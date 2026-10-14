const $ = (id) => document.getElementById(id);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const slots = ['left', 'right'];
let roster, images, portraitImages;
let mode = 'idle', paused = reduced.matches, started = null, raf = 0;

function selected(slot) { return $(`${slot}-pick`).value; }
function draw(canvas, id, frame, mirror = false) {
  const character = roster[id], box = character.frames[frame];
  const ctx = canvas.getContext('2d');
  if (frame === 8 && character.portrait) {
    const p = character.portrait, source = p.box ?? box;
    const scale = Math.min(105 / (p.chinY - p.eyeY), 188 / (p.eyeY - source.y));
    ctx.clearRect(0, 0, 418, 418);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(portraitImages[id] ?? images[id], source.x, source.y, source.w, source.h,
      240 - (p.faceX - source.x) * scale, 200 - (p.eyeY - source.y) * scale,
      source.w * scale, source.h * scale);
    return;
  }
  // Keep a shared scale through idle and defeat, normalize the standing victory.
  const idleHeight = Math.max(...character.frames.slice(0, 6).map(f => f.h));
  const scale = frame === 8 ? Math.min(400 / box.w, 400 / box.h)
    : Math.min(376 / (frame === 7 ? box.h : idleHeight), 400 / box.w);
  const w = box.w * scale, h = box.h * scale;
  ctx.clearRect(0, 0, 418, 418);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  if (mirror) { ctx.translate(418, 0); ctx.scale(-1, 1); }
  const x = box.anchorX === undefined ? (418 - w) / 2 : 209 - box.anchorX * scale;
  ctx.drawImage(images[id], box.x, box.y, box.w, box.h, x, 399 - h, w, h);
  ctx.restore();
}
function frameFor(slot, frame) {
  draw($(slot).querySelector('canvas'), selected(slot), frame, slot === 'right');
}
function refreshNames() {
  for (const slot of slots) {
    const character = roster[selected(slot)];
    const name = $(slot).querySelector('.name');
    name.textContent = character.name.toUpperCase();
    name.style.color = character.color;
    $(slot).querySelector('canvas').setAttribute('aria-label', `${character.name} pixel fighter`);
    $(`winner`).querySelector(`[value="${slot}"]`).textContent = `${character.name} wins`;
    const other = selected(slot === 'left' ? 'right' : 'left');
    for (const option of $(`${slot}-pick`).options) option.disabled = option.value === other;
  }
}
function lock(active) {
  for (const id of ['play', 'swap', 'winner', 'pose', 'pause', 'left-pick', 'right-pick']) $(id).disabled = active;
  $('skip').hidden = !active;
}
function finish() {
  started = null; mode = 'result'; lock(false);
  $('pose').value = 'result'; $('pause').disabled = true;
  $('blackout').hidden = true; $('count').textContent = '';
  const winner = $('winner').value;
  for (const slot of slots) {
    frameFor(slot, winner === slot ? 7 : 6);
    $(slot).querySelector('.pose').textContent = winner === slot ? 'Battered victory' : 'Battered';
  }
  $('verdict').textContent = winner === 'draw' ? 'Demo decision: draw' : `Demo decision: ${roster[selected(winner)].name} wins`;
  $('result').hidden = false; $('play').textContent = 'Replay 3.5-second cut';
  $('status').textContent = 'Aftermath. Try another matchup or swap sides.';
}
function inspect() {
  started = null; mode = $('pose').value; lock(false);
  if (mode === 'result') return finish();
  $('pause').disabled = mode !== 'idle';
  $('blackout').hidden = true; $('count').textContent = 'VS'; $('result').hidden = true;
  for (const slot of slots) {
    frameFor(slot, mode === 'battered' ? 6 : mode === 'victory' ? 7 : 0);
    $(slot).querySelector('.pose').textContent = mode === 'idle' ? 'Idle' : mode === 'battered' ? 'Battered' : 'Battered victory';
  }
  $('status').textContent = `Ready. All ${Object.keys(roster).length} fighters loaded.`;
}
function render(t) {
  if (mode === 'idle') {
    for (const slot of slots) {
      const character = roster[selected(slot)], sequence = character.idleFrames ?? [0, 1, 2, 3, 4, 5];
      const frame = paused || reduced.matches ? sequence[0] : sequence[Math.floor(t / (character.idleFrameMs ?? 140)) % sequence.length];
      frameFor(slot, frame);
    }
  }
  if (started !== null) {
    const elapsed = t - started;
    $('count').textContent = String(Math.max(1, 3 - Math.floor(elapsed / 1000)));
    $('blackout').hidden = elapsed < 3000;
    if (elapsed >= 3500) finish();
  }
  raf = requestAnimationFrame(render);
}
async function init() {
  lock(true); $('skip').hidden = true;
  const response = await fetch('roster.json');
  if (!response.ok) throw new Error('Roster failed to load');
  roster = await response.json(); images = {}; portraitImages = {};
  await Promise.all(Object.entries(roster).map(async ([id, character]) => {
    const img = new Image(); img.src = character.file; await img.decode(); images[id] = img;
    if (character.portrait?.file) {
      const portrait = new Image(); portrait.src = character.portrait.file;
      await portrait.decode(); portraitImages[id] = portrait;
    }
  }));
  for (const slot of slots) {
    for (const [id, character] of Object.entries(roster)) $(`${slot}-pick`).add(new Option(character.name, id));
  }
  $('left-pick').value = 'daytona'; $('right-pick').value = 'e2b';
  for (const [id, character] of Object.entries(roster)) {
    const card = document.createElement('div'); card.className = 'portrait';
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 418;
    canvas.className = 'sprite'; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `${character.name} portrait`);
    card.append(canvas, document.createTextNode(character.name.toUpperCase()));
    $('portraits').append(card); draw(canvas, id, 8);
  }
  refreshNames(); inspect(); $('play').textContent = 'Play 3.5-second cut';
  $('play').onclick = () => {
    mode = 'idle'; $('pose').value = 'idle'; $('result').hidden = true;
    slots.forEach(slot => $(slot).querySelector('.pose').textContent = 'Idle');
    if (reduced.matches) return finish();
    paused = false; $('pause').textContent = 'Pause idle';
    started = performance.now(); $('count').textContent = '3'; lock(true);
    $('status').textContent = 'Three-second countdown, then the aftermath.';
  };
  $('skip').onclick = finish;
  $('swap').onclick = () => {
    const left = selected('left'); $('left-pick').value = selected('right'); $('right-pick').value = left;
    const winner = $('winner').value;
    if (winner !== 'draw') $('winner').value = winner === 'left' ? 'right' : 'left';
    refreshNames(); inspect();
  };
  for (const slot of slots) $(`${slot}-pick`).onchange = () => {
    refreshNames(); $('pose').value = 'idle'; inspect();
  };
  $('pose').onchange = inspect;
  $('winner').onchange = () => { if (mode === 'result') finish(); };
  $('pause').onclick = () => { paused = !paused; $('pause').textContent = paused ? 'Resume idle' : 'Pause idle'; };
  reduced.onchange = () => { paused = reduced.matches; $('pause').textContent = paused ? 'Resume idle' : 'Pause idle'; if (paused && started !== null) finish(); };
  if (paused) $('pause').textContent = 'Resume idle';
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); if (started !== null) finish(); }
    else raf = requestAnimationFrame(render);
  });
  raf = requestAnimationFrame(render);
}
init().catch(error => {
  $('status').textContent = 'Assets could not load. Serve this folder locally and reload.';
  console.error(error);
});
