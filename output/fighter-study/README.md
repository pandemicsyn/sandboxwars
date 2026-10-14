# Sandbox Wars fighter study

Generated with the built-in ImageGen tool. These are first-pass original,
unofficial character concepts, not provider-owned mascots. E2B v2 deliberately
replaces the earlier cyan/magenta palette-swap direction with a new silhouette.

- `daytona-v3.png`: masked underground racer with a white vented respirator, amber forehead goggles, swept-back cobalt sidecut and asymmetric black/cyan racing gear. Quiet glove-cuff idle, seated defeat and goggles-adjusting victory. V1/v2 retained.
- `prompt-daytona-v3.json`: exact built-in ImageGen redesign prompt using E2B/Modal style references.
- `e2b-v2.png`: silver-haired masked street samurai, long coat, upright idle, seated aftermath, peace-sign victory.
- `tensorlake-v2.png`: human acid-green tech courier with a reptile-inspired respirator, seated defeat, tired thumbs-up victory. Replaces the rejected fantasy-lizard v1 direction.
- `vercel-v1.png`: monochrome hired goon in a tailored suit, triangle neck tattoo, cuff-adjusting idle, kneeling defeat, tie-straightening victory.
- `modal-v1.png`: platinum geometric bob, translucent green modular gauntlets, composed posture, exhausted sitting pose and dismissive victory wave. Inspired by Modal's green-on-black site and translucent geometric imagery.
- `cloudflare-v1.png`: orange flame-shaped pompadour, industrial gauntlets and boiler-suit trousers; drooping hair after defeat, exhausted hair-fixing victory.
- `boxd-v1.png`: maroon-and-black Dutch kickboxer, compact high guard, gloves, circuit tattoos and cybernetic shin guards; seated defeat and gloves-together victory.
- `prime-intellect-v1.png`: copper-haired forest-rave cosplayer in fern-covered teal streetwear, headphones and a reflective portal visor; seated defeat examining the visor, weary victory fixing the shoulder fern. Based on the user's website screenshot.
- `prompt-prime-intellect-v1.json`: exact Prime Intellect generation prompt and reference details.
- `docker-v3.png`: cyberpunk dockworker with simplified fabric/skin shading, whale tattoo, cyan temple implant and steel shoulder plates; steady wrist-wrap idle, seated defeat and tired flex victory. V1/v2 retained.
- `prompt-docker-v2.json`: exact built-in ImageGen edit prompt using Docker v1 as the reference.
- `boat-v1.png`: lanky canal smuggler with a long navy-and-cream coat and mechanical winch forearm; lapel-holding idle, kneeling defeat and captain's salute victory.
- `prompts-roster-05.json`: exact Docker and Boat prompts, generated with the built-in ImageGen tool.
- `aws-v2.png`: dark navy warehouse heavyweight with cleaner shading, a quiet planted idle, consistent mechanical lifting glove and amber scanner; seated defeat and scanner-checking victory. V1 retained.
- `gcp-v3.png`: corporate scientist with adult proportions, small rectangular glasses and an industrial four-color mechanical arm. Repairs v2's duplicate/swapped mechanical hand and disconnected gestures with a restrained breathing idle. Mechanical arm stays on the same side in idle, seated defeat and tablet-holding victory; clean portrait has no bandage. Earlier versions retained outside the active roster.
- `prompt-gcp-v3.json`: exact built-in ImageGen continuity-repair prompt, with GCP v2 as target and E2B/Modal as style references.
- `exe-v2.png`: adult cyberpunk biker with a fitted cream/tan speckled helmet, short studs and a visible human face; seated defeat and folded-arms victory. Replaces the rejected oversized chibi pufferfish v1.
- `prompt-gcp-v2.json` and `prompt-exe-v2.json`: exact corrective generation prompts. Rejected v1 sheets remain saved but are excluded from the preview roster.
- `prompts-roster-06.json`: exact AWS, GCP and exe.dev prompts, including the visually inspected exe.dev website reference.
- `prompts.json`: exact creation and cleanup prompts.
- `prompts-roster-02.json` and `prompt-tensorlake-v2.json`: Vercel and Tensorlake generation prompts, including the superseded lizard concept.
- `prompts-roster-03.json`: exact Modal, Cloudflare and Boxd prompts and official website reference URLs. Modal and Boxd homepages were visually inspected for color and style; designs are creative interpretations, not official mascots.
- `roster.json`: source rectangles for nine frames per fighter, plus names and palettes.
- `custom-sandbox-v2.png`: anonymous hooded challenger redrawn using the approved E2B/Modal style references; opaque faceplate, simplified graphite clothing, amber status light, glove-adjusting idle, seated defeat and hood-adjusting victory. V1 retained as the superseded realistic study. Visual placeholder only; no input form or live judging added.
- `prompt-custom-sandbox-v1.json`: exact built-in ImageGen prompt for the faceless challenger.
- `judge-jev-v1.png`: original silver-haired ringside judge, plum collar and amber clipboard; six expressions plus two draft blink frames. `judge-jev.json` contains source rectangles and labels; `judge-preview.js` provides manual inspection without inventing evaluations.
- `ART-DIRECTION.md`: user-approved E2B v2 and Modal v1 visual baseline. Other existing characters have not all been harmonized yet.
- `prompts-style-lock-01.json`: exact built-in ImageGen prompts and reference filenames for Custom v2 and Judge Jev v1.
- `e2b-portrait-clean-v1.png` and `exe-portrait-clean-v1.png`: standalone clean portraits without bandages; original approved body sheets remain unchanged.
- `prompts-refinement-01.json`: exact built-in ImageGen prompts for the Docker/AWS/Daytona refinements and clean E2B/exe.dev portraits.
- `REFINEMENT-NOTES.md`: portrait framing and idle continuity audit. Prime Intellect's source sheet, frame metadata, framing and sequence are deliberately unchanged.
- `index.html`: standalone preview with a three-second countdown, half-second cut,
  fourteen-fighter selection (thirteen providers plus Custom Sandbox), both possible winners, draw, pose inspection, and left/right mirroring.

Each sheet is a 1254 × 1254 RGBA PNG arranged as a nominal 3 × 3 atlas.
Frames 0–5 are idle, 6 is battered, 7 is battered victory, 8 is portrait.
Generated rows are not perfectly uniform, so `preview.js` uses explicit source
rectangles from `roster.json` and a common ground anchor on a 418 × 418 canvas.
This is runtime sprite rendering; the PNG originals are unmodified. All originals
face right and are mirrored on the right side. No runtime generation or inference is needed.

Portrait framing uses source-space face centers, eye/chin landmarks, and a common
eye line; E2B and exe.dev use separate clean portrait files. Hair/headgear has a
top margin, shoulders can crop at canvas edges. Prime Intellect retains its prior
framing. Idle frames use per-frame foot anchors to avoid centering drift caused by
different coat/arm bounds. E2B plays a clean 0–1–2–1 loop, excluding the later
idle cells that introduce torn clothing.

Run from this directory:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Then open http://127.0.0.1:4174. The preview outcomes are manually selected and
do not represent Jev judgments or actual comparisons. This study is outside the
site's public assets and is not included in deployment.

Before production, do a final pixel-level edge and registration cleanup. The sheets
are suitable for judging the direction and sequence, not yet a locked art pipeline.
Jev's blink frames also need exact head/clipboard registration before animated use.
