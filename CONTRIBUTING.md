# Contributing

## Fix a typo or update an existing provider

1. Open the provider’s JSON file in `data/providers/` and click Edit in GitHub, or edit it locally.
2. Change the relevant text or value. For a factual change, include a supporting official URL and preserve relevant qualifications.
3. Open a pull request with a short description of the change.

A typo fix only needs the typo corrected. No issue, full research pass, artwork,
local tooling or generated files are required. GitHub runs validation automatically.
Maintainers import accepted changes and regenerate the backend dataset.

## Add a provider

Copy an existing dossier such as `data/providers/modal.json` into a new
`data/providers/<provider-id>.json`. Update its identity, facts, sources, dates,
capabilities, published prices and research notes for the exact product. Use
`unknown` where evidence is missing. Open a PR with the dossier; artwork is optional.
The initial research covers the 13 shipped provider fighters. A new dossier is a
proposal and does not automatically add a fighter to the website.

The [research skill](.agents/skills/research-sandbox-provider/SKILL.md) can help
prepare a dossier. See [research conventions](research/BRIEF.md) for evidence rules.
If you prefer to suggest a provider or report a problem without editing JSON,
[open an issue](https://github.com/pandemicsyn/sandboxwars/issues/new?template=provider.yml).

## Optional local validation

With Node.js 22.12 or newer, run `npm run validate`. No installation or credentials
are needed. To check only your dossier, run:

```sh
node scripts/validate-providers.mjs data/providers/<provider-id>.json
```

Unresolved questions belong in the dossier’s `research_notes`.

## Provider avatars and artwork

Use the [avatar skill](.agents/skills/create-sandbox-fighter/SKILL.md), its
[reusable prompt](.agents/skills/create-sandbox-fighter/references/provider-prompt-template.json)
and the approved E2B/Modal reference sheets. Save the expanded prompt and reference
filenames with your artwork, preserve existing versions, and update the preview
metadata. Inspect the standalone preview; `npm run validate:art` checks metadata.
Maintainers handle website integration separately.

Contributions are provided under this repository’s MIT license. Only submit
material you are entitled to contribute, and keep confidential information out of
files and discussions. Third-party names and marks remain their owners’ property.
