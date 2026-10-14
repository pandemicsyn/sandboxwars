# Refinement pass

Approved reference style: E2B v2 and Modal v1. Prime Intellect intentionally keeps
its original unusual design and rendering, per the user's explicit request.

## Changes

- Docker v3: fewer noisy fabric marks, broader light/shadow shapes, same cyberpunk dockworker design.
- AWS v2: simplified face/fabric shading and a single relaxed idle stance instead of intermittent wrist gestures.
- Daytona v3: full redesign as a masked underground racer, replacing the generic cyan hoodie brawler. White vented respirator, amber goggles, cobalt sidecut, asymmetric shoulder/knee plates and a quiet glove-cuff idle.
- E2B/exe.dev: separate clean portraits remove bandages without altering their body atlases.
- Portraits: consistent eye line and eye-to-chin scale, with top clearance for hair/helmets. Prime keeps its original portrait transform. Headgear, masks and beards remain visibly different sizes by design.
- Idle source rectangles retain their pixels; foot-based render anchors reduce horizontal drift from changing hand/coat width. Prime's anchors and playback stay untouched.
- E2B: clean top-row frames played 0–1–2–1; lower-row torn-hem variants excluded from the live idle sequence.

## Continuity inspection

| Character | Outcome |
| --- | --- |
| Daytona | Redesigned six-frame glove-cuff stance; white mask, goggles and armor stay consistent. |
| E2B | Clean top-row loop selected; long coat/ponytail remain intentional movement. |
| Tensorlake | Mask, monocle, bag and limbs retain identity across idle. |
| Vercel | Cuff gesture, suit and tattoo remain consistent in idle. |
| Modal | Approved reference retained; small breathing motion and stable green equipment. |
| Cloudflare | Flame-hair sway intentional; both gauntlets and costume stay consistent. |
| Boxd | Same gloves, tattoo and shin guards; small guard motion. |
| Prime Intellect | Excluded from changes as requested. |
| Docker | Replacement six-frame wrist-wrap stance, stable gear and tattoo. |
| Boat | Small head/coat movement; same mechanical forearm and outfit. |
| AWS | Replacement single breathing stance, lifting glove stays on same side. |
| GCP | Prior v3 arm-continuity repair retained. |
| exe.dev | Helmet/jacket and limbs stable; clean portrait separated from aftermath artwork. |
| Custom Sandbox | Faceless identity and hood retained across poses. |

This is a visual continuity pass, not a claim of pixel-perfect production animation.
Jev blink registration, small generated edge artifacts and fine cloth/hair details
still need final sprite-production polish.
