# Provider evidence conventions

Research the exact sandbox product using current official documentation, pricing,
API/SDK references and product pages. Record dates and direct URLs beside claims.
Cover every field in `FACT_FIELDS` in `provider-contract.mjs` once. Use
`documented`, `unsupported` or `unknown`; unknown facts retain a null value.

Missing documentation is not a denial. A scoped inference of non-support requires
a sufficiently complete public interface or lifecycle contract; label the inference,
its date and limits. Preserve ambiguity, conflicting sources, preview/access gates,
plan restrictions and regional qualifications. SDKs and guest runtimes differ;
filesystem snapshots do not establish memory recovery or live resume.

Keep rates, currency, physical-core/vCPU and GB/GiB units exactly as published.
Include billing increments, minimums, allowances, subscriptions, storage, idle and
network conditions. Do not invent totals, benchmark results or rankings. Vendor
performance figures remain claims with their stated conditions.

Provider JSON is authoritative. Keep unresolved questions in `research_notes`.
GitHub validates PRs automatically; `npm run validate` is an optional local check.
For a typo, edit only the affected text. For a factual update, research only the
affected claims and keep related facts/capabilities consistent. Maintainers handle
backend import and regeneration. See the research skill for detailed examples.
