# HNS Community Registry Standard v0.1

Date: 2026-06-08
Status: draft

## Purpose

The HNS Community Registry is an open, public, lightweight standard for listing Handshake ecosystem applications, news sources, funding sources, and funding proposals.

The registry is designed for many consumers. HNS Investments may consume it, but the registry should remain independently useful to wallets, websites, newsletters, explorers, community tools, and forks.

## Principles

- Community submissions are welcome.
- Inclusion is not endorsement.
- Data should be public, forkable, mirrorable, and easy to validate.
- DNS URLs and HNS-native URLs should be separate fields.
- HNS-native websites should be encouraged and visible, but not required.
- Flagged entries should remain visible with warnings unless unsafe.
- Signed entries are reserved as a future transparency feature, not required in v0.1.
- Registry data must not include private wallet data, secrets, bridge tokens, balances, or local scan output.

## Files

```text
data/apps.json
data/news-sources.json
data/funding-sources.json
data/funding-proposals.json
schemas/apps.schema.json
schemas/news-sources.schema.json
schemas/funding-sources.schema.json
schemas/funding-proposals.schema.json
scripts/validate-registry.js
```

Each data file has this top-level shape:

```json
{
  "schemaVersion": "0.1",
  "entries": []
}
```

## URL Fields

General entries use:

- `dnsUrl`: normal DNS/ICANN website URL, usually `https://...`.
- `hnsUrl`: Handshake-native website URL using a single-label HNS host, such as `http://example/`.
- `website`: preferred public URL for general users. This may match `dnsUrl` or `hnsUrl`.

Funding proposals use:

- `projectDnsUrl`
- `projectHnsUrl`
- `projectUrl`

Consumers should display both DNS and HNS links when both are present. An HNS-native link may be shown with a neutral `HNS site` label.

## Entry Labels

Registry labels describe source and review state. They are not endorsements or quality rankings.

- `community-submitted`: added by community PR or issue.
- `self-declared`: metadata came from the project or maintainer.
- `maintainer-verified`: registry maintainer confirmed links and basic identity.
- `source-verified`: project publishes matching metadata from its own website or repo.
- `signed`: project metadata includes a supported maintainer signature.
- `unverified`: no identity/source verification yet.
- `stale`: entry has not been checked recently.
- `inactive`: project appears inactive or unavailable.
- `flagged`: entry needs review because links, identity, claims, or safety are disputed.
- `hns-site`: entry includes an HNS-native website URL.

`signed` is a transparency label, not an endorsement label. It does not mean the project is audited, safe, official, or approved.

## Applications

Application entries describe apps, tools, wallets, marketplaces, resolvers, browsers, explorers, infrastructure, education projects, and community systems.

Recommended `category` values:

- `wallet`
- `marketplace`
- `resolver`
- `browser`
- `registrar`
- `explorer`
- `developer-tool`
- `infrastructure`
- `education`
- `community`
- `other`

Required fields are defined in `schemas/apps.schema.json`.

## News Sources

News source entries describe blogs, feeds, release feeds, newsletters, podcasts, or update sources covering Handshake.

Recommended `topics` values:

- `protocol`
- `developers`
- `market`
- `funding`
- `governance`
- `applications`
- `education`
- `community`
- `events`
- `security`

Required fields are defined in `schemas/news-sources.schema.json`.

## Funding Sources

Funding source entries describe places where Handshake-related funding proposals can be discovered.

Recommended `sourceType` values:

- `github-issues`
- `github-discussions`
- `rss`
- `website`
- `form`
- `other`

Required fields are defined in `schemas/funding-sources.schema.json`.

## Funding Proposals

Funding proposal entries describe public funding proposals or requests connected to Handshake.

Recommended `status` values:

- `open`
- `funded`
- `partially-funded`
- `closed`
- `withdrawn`
- `unknown`

Pledge fields are optional strings in v0.1. Consumers should link to source platforms rather than calculating pledge totals unless a source exposes reliable public totals.

Required fields are defined in `schemas/funding-proposals.schema.json`.

## Project-Owned Metadata

Projects may publish their own metadata so the registry can reference and compare it.

Preferred website paths:

```text
/.well-known/hns-app.json
/.well-known/hns-news.json
/.well-known/hns-funding.json
```

Preferred repository paths:

```text
hns-app.json
hns-news.json
hns-funding.json
```

If project-owned metadata matches the registry entry, consumers may show `source-verified`.

Future signed metadata may use a `signature` object, but v0.1 consumers and submissions must not require signatures.

## Submission Procedure

1. A community member opens a GitHub issue or pull request.
2. The submitter provides required fields and public source links.
3. Automated checks validate JSON shape, duplicate IDs, URL format, labels, and required fields.
4. Maintainers review only objective acceptance and rejection criteria.
5. Accepted entries are labeled based on source state.
6. Consumers refresh from the registry and display source labels without implying endorsement.

Objective criteria are maintained in `CONTRIBUTING.md`.

## Consumer Guidance

Consumers should:

- Show registry labels clearly.
- Distinguish `community-submitted`, `self-declared`, `maintainer-verified`, `source-verified`, and `unverified`.
- Display warnings for `stale`, `inactive`, and `flagged` entries.
- Keep flagged entries visible unless unsafe.
- Prefer showing both DNS and HNS URLs when available.
- Keep registry data separate from private wallet or user data.

Consumers should not:

- Treat registry inclusion as financial advice, security approval, endorsement, or official status.
- Execute remote code from registry entries.
- Mix private wallet holdings, searched names, or local scan output into public registry data.

## Versioning

The current schema version is `0.1`.

Future versions should remain backward-aware and should document migration notes for consumers.
