const picker = document.getElementById('judge-pose');
const canvas = document.getElementById('judge-canvas');
const status = document.getElementById('judge-status');

async function initJudge() {
  const response = await fetch('judge-jev.json');
  if (!response.ok) throw new Error('Judge metadata failed to load');
  const judge = await response.json();
  const img = new Image();
  img.src = judge.file;
  await img.decode();
  const ctx = canvas.getContext('2d');
  // Shared scale across expressions; source sheets remain untouched.
  const scale = Math.min(396 / Math.max(...judge.frames.map(f => f.w)), 396 / Math.max(...judge.frames.map(f => f.h)));
  function render() {
    const index = Number(picker.value), box = judge.frames[index];
    const w = box.w * scale, h = box.h * scale;
    ctx.clearRect(0, 0, 418, 418);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, box.x, box.y, box.w, box.h, (418 - w) / 2, 407 - h, w, h);
    canvas.setAttribute('aria-label', `Judge Jev: ${judge.poses[index]}`);
    status.textContent = `${judge.poses[index]} · Pose ${index + 1} of ${judge.poses.length}. Draft blink frames need registration cleanup before animation.`;
  }
  picker.replaceChildren(...judge.poses.map((name, i) => new Option(name, String(i))));
  picker.disabled = false;
  picker.onchange = render;
  render();
}

initJudge().catch(error => {
  status.textContent = 'Judge poses could not load. Serve this folder locally and reload.';
  console.error(error);
});
