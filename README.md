# Sandbox Wars

Community provider research and fighter artwork for [Sandbox Wars](https://sandboxwars.dev).

This repository contains sourced provider dossiers for the 13 currently shipped
provider fighters, contribution skills, issue/PR templates, avatar-generation
prompts and an independent artwork preview. Application code and evaluation
implementation are maintained separately.

## Contribute

Fix a typo or update a fact by editing one file in [data/providers](data/providers)
and opening a pull request—even directly in GitHub. For a new provider, add a
dossier using the research skill, or [open an issue](https://github.com/pandemicsyn/sandboxwars/issues/new?template=provider.yml).
See [CONTRIBUTING.md](CONTRIBUTING.md) for details. The current dataset covers the fighters in
[data/fighters.json](data/fighters.json); the broader research backlog is not included.

- [Provider dossiers](data/providers) and [research conventions](research/BRIEF.md)
- [Provider research skill](.agents/skills/research-sandbox-provider/SKILL.md)
- [Avatar generation skill](.agents/skills/create-sandbox-fighter/SKILL.md)
- [Reusable provider avatar prompt](.agents/skills/create-sandbox-fighter/references/provider-prompt-template.json)
- [Exact example generation prompt](output/fighter-study/prompt-daytona-v3.json)
- [Art direction and references](output/fighter-study/ART-DIRECTION.md)

## Optional local checks

GitHub checks your PR automatically. Local checks are optional; they need Node.js
22.12 or newer, with no package dependencies or credentials. Maintainers import
accepted changes and regenerate the backend dataset.

```sh
npm run validate
npm test
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
