---
name: create-sandbox-fighter
description: Create, redesign, or repair Sandbox Wars cyberpunk pixel-art fighters and integrate their sprites into this repository's character preview. Use for provider characters, the custom challenger, and Judge Jev artwork.
---

# Create a Sandbox Wars fighter

Work from the repository root. The character study lives in `output/fighter-study/`,
as the source artwork and standalone contribution preview. A character request normally ends with saved art,
recorded prompts, roster metadata, and a verified local preview. Respect requests
for discussion or concepts only; those do not authorize image generation.

## Establish the design

Read the study's [art direction](../../../output/fighter-study/ART-DIRECTION.md),
[active roster notes](../../../output/fighter-study/README.md), and
[refinement notes](../../../output/fighter-study/REFINEMENT-NOTES.md).
Inspect the actual `e2b-v2.png` and `modal-v1.png` sheets: both are the approved
style references. Read `roster.json` for active versions; the largest filename
version is not necessarily approved.

For a new provider, inspect its official website if brand research is requested
or needed. Record the reference URL and distinguish verified colors/logo cues
from fictional character ideas. Translate those cues into a distinctive adult
human cyberpunk fighter: silhouette, hair/headgear, signature equipment, stance,
and personality. Avoid making everyone a hoodie boxer or merely changing colors.
Animal branding usually works as fitted masks, helmets, or clothing details;
do not default to a giant animal mascot. Masks are optional, not a roster rule.

Use mature stylized arcade/anime proportions, angular faces, selective pixel
outlines, broad readable shading, and restrained color ramps. Avoid photorealistic
tactical texture, soft painted rendering, and cute oversized heads. Preserve each
character's identity during repairs. Prime Intellect's unusual forest/portal
design is intentionally approved; leave it alone unless explicitly targeted.

## Generate and inspect

Use the available image-generation tool and its imagegen skill for raster art.
Pass the actual E2B and Modal files as style references, plus the current character
sheet for edits. Inspect local references before using them. If generation is
unavailable, report that limitation and retain a usable prompt; do not substitute
programmatically drawn art. Use [the atlas contract](references/atlas-contract.md)
to compose the prompt. Start from [the provider prompt template](references/provider-prompt-template.json); `output/fighter-study/prompt-daytona-v3.json` is a complete expanded example.

Create one transparent PNG with six clean idle frames, a battered defeat, a tired
victory, and a clean portrait. Quiet breathing is sufficient for the 3.5-second
demo. Preserve feet, anatomy, mask shape, equipment sides, and costume across the
idle loop. Damage belongs only in the two aftermath poses. Require generous
transparent gutters and no text, drawn checkerboard, floor, or cast ground shadow.

Save the next unused `<provider-id>-vN.png` without overwriting old sheets. Copy
the tool output into the repo, leaving its original in place. Save the exact
prompt, tool name, reference filenames, and any brand URLs in a corresponding
JSON file. Mark superseded/rejected art in the study README rather than silently
promoting it. Keep references portable; do not depend on a user's absolute paths.

Inspect the generated sheet before integration. Generation often ignores grid
padding or changes small details: verify all nine figures, true transparency,
clean portraits, complete limbs, readable silhouettes, and consistent gear.
Repair material errors with the image tool. Preserve accepted sheets when a
separate clean portrait can solve the problem. Do not claim pixel-perfect
animation just because nine cells were generated.

## Integrate and verify

Follow the source rectangles, optional portrait override, and anchor conventions
in [the atlas contract](references/atlas-contract.md). Update `roster.json`, the
study README and sheet links in `index.html`. The selectors and portrait gallery
are generated from the roster; update any hard-coded count prose when adding a
fighter. Keep approved characters unchanged unless the request includes them.

Website integration is performed by maintainers in a separate repository.
An art contribution updates this standalone preview, its prompts and metadata.
It does not automatically add a shipped provider. Run `npm run validate:art`.

Serve the study (reuse an existing server when available):

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory output/fighter-study
```

Inspect the new
fighter beside both E2B and Modal at the same display size. Check the whole idle
loop including the last-to-first transition, defeat, victory, mirrored right-side
rendering, portrait framing, and the countdown/aftermath cut. Look for stray pixels
from adjacent cells, changing limbs/gear, sliding feet, and new idle injuries.
Validate JSON, image dimensions, in-bounds frame rectangles, and JavaScript syntax
after integration. Document remaining art limitations honestly.

Deliver the updated preview and saved asset/prompt locations. Character generation
does not require deployment, provider research publication, or real Jev API calls.
The preview's selected outcomes are animation demonstrations, not evaluations.

## Judge Jev

For Jev requests, use the same style references but the separate `judge-jev.json`
and `judge-preview.js` pipeline. His sheet has eight waist-up poses: neutral,
studying scorecard, skeptical, impressed, deliberating, announcing verdict,
half-blink, closed blink. Keep the ninth cell empty. Preserve face, costume,
clipboard, camera, and scale. Align blink frames precisely before enabling their
animation; the current study selects them manually. Do not add Jev to the fighter
roster or fabricate scorecards to demonstrate an expression.
