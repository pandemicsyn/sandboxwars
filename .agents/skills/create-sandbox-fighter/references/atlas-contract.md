# Fighter atlas and integration contract

Paths below are relative to the repository root. Art and preview files live in
`output/fighter-study/`. Read the current `preview.js` before changing rendering.

## Generation layout

Request a square true-alpha PNG, nominal 3 × 3 grid, row-major order:

| Index | Content |
| --- | --- |
| 0–5 | Same clean full-body idle stance, tiny breathing motion, planted feet |
| 6 | Battered defeat, typically seated or slumped |
| 7 | Battered victory, exhausted but triumphant, distinct from idle |
| 8 | Clean head-and-shoulders portrait |

Full-body figures face right in three-quarter view. The runtime mirrors them for
the right slot, so avoid readable text and essential left/right lettering. Keep
near/far equipment sides consistent within the source art. Aftermath damage must
match across frames 6 and 7. Request a common body scale and ground baseline,
roughly 10% clear padding inside each cell, and no pose extending across gutters.
Current sheets are 1254 × 1254; record actual output dimensions rather than
assuming the image tool will produce that resolution.

## Metadata

Each `roster.json` key is a stable lowercase provider ID. Its value contains:

- `name`: display name.
- `file`: atlas filename relative to the study directory.
- `color`: CSS accent color.
- `width`, `height`: actual atlas pixel dimensions.
- `frames`: exactly nine source rectangles `{x, y, w, h}` in the order above.
- Optional `frames[i].anchorX`: horizontal ground anchor, relative to that
  rectangle's left edge, not the atlas origin. Current idle anchors use the
  midpoint of the boots' alpha bounds in the bottom 11% of the figure.
- Optional `idleFrames`: playback indices within 0–5. E2B intentionally plays
  `[0, 1, 2, 1]` to exclude later cells that introduce torn clothing.
- Optional `idleFrameMs`: positive frame duration; default is 140 ms.
- Optional `portrait`: absolute source-space `faceX`, `eyeY`, `chinY` landmarks.
  Require `chinY > eyeY` and `eyeY > source.y`. A separate portrait adds `file`
  plus a source `box: {x, y, w, h}`; otherwise frame 8 of the atlas is used.

Measure actual alpha bounds rather than slicing equal thirds: generated cells
can be uneven, and a nominal grid can clip boots or import neighboring fragments.
Read-only image analysis can help locate components; visually confirm bounds,
including disconnected hair/straps. Browser canvas source cropping is the existing
rendering approach; do not modify source pixels merely to measure bounds.

The 418 × 418 stage canvas places feet at y=399. Idle and defeat share a scale
derived from maximum idle height; victory is normalized separately. Foot anchors
prevent changing coat or arm bounds from moving the body sideways. Portraits use
a shared eye line and eye-to-chin scale with top clearance for hair; larger masks
and headgear should retain their own proportions. Prime Intellect intentionally
uses its original metadata and framing without these overrides.

## QA and recordkeeping

Confirm every source rectangle is inside its PNG and has positive dimensions;
portrait overrides must reference an existing image and valid source box. Inspect
each displayed pose on the dark stage, because faint fragments can be invisible
in a transparent image viewer. Review continuity at runtime, not only as a sheet.
Do not fix a swapped arm by mirroring an individual frame: that swaps all other
asymmetric equipment too. Regenerate the affected art or select a coherent idle
subset where that preserves the intended motion.

Record active/superseded versions in the study README and material continuity
limitations in `REFINEMENT-NOTES.md`. Preserve exact prompts and reference paths
in JSON alongside assets so the next character can reproduce the design process.
