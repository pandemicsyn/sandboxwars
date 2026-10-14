# Sandbox Wars

Community provider research and fighter artwork for [Sandbox Wars](https://sandboxwars.dev).

This repository contains sourced provider dossiers for the 13 currently shipped
provider fighters, contribution skills, issue/PR templates, avatar-generation
prompts and an independent artwork preview. Application code and evaluation
implementation are maintained separately.

## Contribute

Use the [provider issue form](https://github.com/pandemicsyn/sandboxwars/issues/new?template=provider.yml)
to propose a provider, update facts or report an error. Read [CONTRIBUTING.md](CONTRIBUTING.md)
for research and artwork PRs. The current dataset covers the fighters in
[data/fighters.json](data/fighters.json); the broader research backlog is not included.

- [Provider dossiers](data/providers) and [research conventions](research/BRIEF.md)
- [Feature matrix](research/feature-matrix.md), [published prices](research/pricing-matrix.md), [gaps](research/gaps.md)
- [Provider research skill](.agents/skills/research-sandbox-provider/SKILL.md)
- [Avatar generation skill](.agents/skills/create-sandbox-fighter/SKILL.md)
- [Reusable provider avatar prompt](.agents/skills/create-sandbox-fighter/references/provider-prompt-template.json)
- [Exact example generation prompt](output/fighter-study/prompt-daytona-v3.json)
- [Art direction and references](output/fighter-study/ART-DIRECTION.md)

## Local checks

Node.js 22.12 or newer; no package dependencies or credentials required.

```sh
npm run validate
npm test
npm run research:generate  # after updating dossiers
```

For artwork preview, use Python 3:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory output/fighter-study
```

Open http://127.0.0.1:4174. Generate new artwork using the avatar skill,
`e2b-v2.png` and `modal-v1.png` style references, the atlas contract and saved
prompts. Artwork generation requires an image-generation tool; previewing does not.

Published prices and speed figures are dated vendor claims, not measured benchmarks.
Unknown is distinct from unsupported. A merged contribution does not automatically
deploy the website or add a new fighter.

## License

[MIT](LICENSE). Third-party names and trademarks remain their owners’ property.
