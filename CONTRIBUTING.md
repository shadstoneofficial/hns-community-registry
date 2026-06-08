# Contributing to the HNS Community Registry

This registry is public community data for Handshake ecosystem applications, news sources, funding sources, and funding proposals.

Inclusion is not endorsement. The goal is to make useful public ecosystem data easier to find, verify, fork, mirror, and consume without turning maintainers into gatekeepers.

## What Belongs Here

Submissions are welcome when they are Handshake-related and fit one of the v0.1 registry files:

- `data/apps.json`: apps, tools, wallets, marketplaces, resolvers, browsers, explorers, infrastructure, education projects, and community systems.
- `data/news-sources.json`: blogs, feeds, release feeds, newsletters, podcasts, or update sources covering Handshake.
- `data/funding-sources.json`: places where Handshake-related proposals can be discovered.
- `data/funding-proposals.json`: public funding proposals or requests connected to Handshake.

Small, experimental, inactive, unverified, or niche projects can be included. Use labels and notes to describe their state instead of excluding them for subjective quality reasons.

## Public-Safe Data Rules

Only submit public information.

Do not include:

- Wallet seeds, keys, xpubs, balances, private addresses, or transaction notes.
- Local scan output, bridge tokens, API secrets, credentials, private logs, or private user data.
- Non-public business notes, private funding terms, or private maintainer contact details.
- Download links that are misleading, unsafe, or not clearly connected to the listed project.

## DNS and HNS URL Fields

Keep DNS and HNS-native URLs separate:

- `dnsUrl`: normal DNS/ICANN website URL, usually `https://...`.
- `hnsUrl`: Handshake-native website URL using a single-label HNS host, such as `http://example/`.
- `website`: preferred public URL for general users. This may match `dnsUrl` or `hnsUrl`.

Funding proposals use `projectDnsUrl`, `projectHnsUrl`, and `projectUrl` with the same meaning.

HNS-native websites are encouraged and should be visible to consumers, but an HNS site is not required for inclusion.

## Labels Are Descriptive

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

Signed entries are a future transparency feature, not a v0.1 requirement.

## Objective Acceptance Criteria

Maintainers should accept a submission when:

- It is plausibly Handshake-related.
- Required fields are present and pass `npm test`.
- Required public links are reachable or the entry clearly explains why a link is temporarily unavailable.
- DNS URLs and HNS URLs are separated correctly.
- The entry uses neutral, descriptive metadata instead of endorsement claims.
- The entry avoids private data and unsafe content.
- Duplicate entries update the existing record instead of creating a second ID.

Maintainers may request changes for unclear fields, missing links, disputed identity, duplicate IDs, malformed JSON, or labels that do not match the submitted evidence.

## Objective Rejection Criteria

Maintainers may reject or close a submission for:

- Spam or content unrelated to Handshake.
- Impersonation, misleading identity, or intentionally deceptive claims.
- Malware, phishing, unsafe download behavior, or instructions that harm users.
- Illegal content or content that is unsafe to display in public registry consumers.
- Private wallet data, credentials, API secrets, bridge tokens, local scan data, or other non-public data.
- Missing required fields after reasonable correction attempts.
- A duplicate entry where the existing entry should be updated instead.

Do not reject a submission because a project is small, experimental, unpolished, inactive, competitor-owned, unfunded, or not personally endorsed by maintainers. Represent those facts with labels, status fields, and notes.

## Flagged Entries

Flagging is a visibility and warning mechanism, not an automatic removal mechanism.

Flagged entries should remain visible by default with warnings unless they are unsafe to display. Unsafe entries include malware, phishing, illegal content, intentionally deceptive downloads, or content that puts users at immediate risk.

When possible, keep a minimal public record explaining why an entry was flagged or removed.

## Seed Entry Process

Seed entries help new consumers test the registry and help the community see the intended shape of the data. They should not become a maintainer-approved list of "official" Handshake projects.

Recommended process:

1. Open or maintain a public seed-entry issue for each category: apps, news sources, funding sources, and funding proposals.
2. Accept candidate suggestions from anyone, including maintainers, project owners, and registry consumers.
3. Add candidates in small pull requests grouped by category.
4. Start uncertain entries with conservative labels such as `community-submitted` and `unverified`.
5. Prefer public source links over copied claims.
6. Add `hns-site` only when an HNS-native URL is present and separated from the DNS URL.
7. Add `flagged`, `stale`, or `inactive` labels when useful instead of silently excluding projects.
8. Invite project maintainers to correct or self-declare metadata after seed entries land.
9. Revisit seed entries on a regular schedule and update labels rather than rewriting history.

Seed pull requests should describe their collection method, for example "projects found from public GitHub repos, existing Handshake ecosystem docs, and community issue suggestions." They should not claim that maintainers endorsed, ranked, audited, or approved the listed projects.

## How to Submit

You can submit an issue using the templates in `.github/ISSUE_TEMPLATE/`, or open a pull request that edits the relevant `data/*.json` file.

Before opening a pull request:

```bash
npm test
```

If you are unsure which labels to use, choose `community-submitted` and `unverified`, then explain the available source links in the pull request.
