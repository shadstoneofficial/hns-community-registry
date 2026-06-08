# HNS Community Registry

Open community registry for Handshake applications, news sources, funding sources, and funding proposals.

This registry is public data. It is intended to be consumed by HNS Investments and other Handshake ecosystem tools.

## Principles

- Community submissions are welcome.
- Inclusion is not endorsement.
- HNS-native websites are encouraged, but not required.
- DNS/web URLs and HNS URLs are tracked separately so apps can render links correctly.
- Flagged entries stay visible with warnings unless unsafe to display.
- Private wallet data, bridge tokens, seeds, keys, balances, and local scan output do not belong here.

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

## Entry Labels

Registry labels describe source and review state. They are not quality scores.

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

## Submit an Entry

Open an issue or pull request.

Submission templates:

- Application: `.github/ISSUE_TEMPLATE/app-submission.md`
- News source: `.github/ISSUE_TEMPLATE/news-source-submission.md`
- Funding source: `.github/ISSUE_TEMPLATE/funding-source-submission.md`
- Funding proposal: `.github/ISSUE_TEMPLATE/funding-proposal-submission.md`

Objective rejection reasons:

- Spam or not Handshake-related.
- Broken required links.
- Impersonation or misleading identity.
- Malware, phishing, or unsafe download behavior.
- Illegal or harmful content.
- Missing required fields after reasonable correction attempts.
- Duplicate entry where an existing entry can be updated instead.

Subjective project quality is not a rejection reason. Small, experimental, inactive, or unverified projects should be represented with labels and metadata.

## Validate

This repo currently uses a dependency-free Node script for basic validation.

```bash
npm test
```

Or:

```bash
node scripts/validate-registry.js
```

## URL Fields

Use both DNS and HNS fields when available:

- `dnsUrl`: normal DNS website URL, usually `https://...`.
- `hnsUrl`: Handshake-native website URL, resolver-dependent and not always HTTPS.
- `website`: preferred primary URL for general users.

Funding proposals use:

- `projectDnsUrl`
- `projectHnsUrl`
- `projectUrl`

## Standard

Draft standard source:

`HNS Community Registry Standard v0.1`

This registry starts with schema version `0.1`.
