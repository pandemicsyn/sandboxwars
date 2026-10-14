# Contributing

For corrections, identify the provider and field and link primary evidence.
For a new provider, open an issue with exact product, marketing, documentation
and pricing URLs. This repository starts with research for shipped fighters;
maintainers review proposed additions before extending that scope.

## Research

Use `.agents/skills/research-sandbox-provider/SKILL.md` or follow its conventions
manually. Edit `data/providers/<id>.json`; preserve IDs, source URLs, units, dates,
unknowns and product/plan/region qualifications. Include every FACT_FIELDS entry
exactly once. Missing documentation alone does not establish non-support.

Run `npm run research:generate`, `npm run validate` and `npm test`.
Use the provider PR template (`?template=provider.md` on the PR creation URL).
List changed status/value transitions and evidence; include regenerated tables.
Maintainers review evidence before merging. Production adoption happens separately.

## Provider avatars and artwork

Use `.agents/skills/create-sandbox-fighter/SKILL.md`. The reusable prompt contract
is in its `references/atlas-contract.md`; exact prompts are in
`output/fighter-study/prompt-*.json` and `prompts*.json`. Inspect the approved E2B
and Modal sheets before generation. Preserve existing versions, save the exact
prompt and reference filenames, update roster metadata and inspect the preview.
Run `npm run validate:art`; include a description of the preview checks in the PR.
New art does not automatically add a fighter to the shipped roster.

Keep secrets and confidential information out of issues, dossiers and prompts.
Only submit material you are entitled to contribute. Third-party names and marks
remain their owners' property.

Contributions are provided under this repository’s MIT license.
