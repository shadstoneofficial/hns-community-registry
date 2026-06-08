#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const todayPattern = /^\d{4}-\d{2}-\d{2}$/;
const idPattern = /^[a-z0-9][a-z0-9-]*$/;
const labels = new Set([
  'community-submitted',
  'self-declared',
  'maintainer-verified',
  'source-verified',
  'signed',
  'unverified',
  'stale',
  'inactive',
  'flagged',
  'hns-site'
]);

const appCategories = new Set([
  'wallet',
  'marketplace',
  'resolver',
  'browser',
  'registrar',
  'explorer',
  'developer-tool',
  'infrastructure',
  'education',
  'community',
  'other'
]);

const appStatuses = new Set(['active', 'inactive', 'stale', 'unknown']);
const fundingSourceTypes = new Set(['github-issues', 'github-discussions', 'rss', 'website', 'form', 'other']);
const proposalStatuses = new Set(['open', 'funded', 'partially-funded', 'closed', 'withdrawn', 'unknown']);
const newsTopics = new Set(['protocol', 'developers', 'market', 'funding', 'governance', 'applications', 'education', 'community', 'events', 'security']);

const files = [
  {
    file: 'data/apps.json',
    required: ['id', 'name', 'summary', 'category', 'dnsUrl', 'hnsUrl', 'website', 'repository', 'sourceMetadataUrl', 'openSource', 'platforms', 'tags', 'maintainers', 'status', 'registryLabels', 'lastVerified', 'notes'],
    validate(entry, fail) {
      enumValue(entry.category, appCategories, 'category', fail);
      enumValue(entry.status, appStatuses, 'status', fail);
      booleanValue(entry.openSource, 'openSource', fail);
      arrayValue(entry.platforms, 'platforms', fail);
      arrayValue(entry.tags, 'tags', fail);
      arrayValue(entry.maintainers, 'maintainers', fail);
      for (const maintainer of entry.maintainers || []) {
        requiredObjectFields(maintainer, ['name', 'url'], 'maintainers[]', fail);
        optionalUrl(maintainer.url, 'maintainers[].url', fail);
      }
      optionalUrl(entry.dnsUrl, 'dnsUrl', fail);
      optionalUrl(entry.hnsUrl, 'hnsUrl', fail, true);
      optionalUrl(entry.website, 'website', fail, true);
      optionalUrl(entry.repository, 'repository', fail);
      optionalUrl(entry.sourceMetadataUrl, 'sourceMetadataUrl', fail, true);
    }
  },
  {
    file: 'data/news-sources.json',
    required: ['id', 'name', 'dnsUrl', 'hnsUrl', 'website', 'feedUrl', 'sourceMetadataUrl', 'topics', 'language', 'registryLabels', 'lastVerified', 'notes'],
    validate(entry, fail) {
      optionalUrl(entry.dnsUrl, 'dnsUrl', fail);
      optionalUrl(entry.hnsUrl, 'hnsUrl', fail, true);
      optionalUrl(entry.website, 'website', fail, true);
      optionalUrl(entry.feedUrl, 'feedUrl', fail);
      optionalUrl(entry.sourceMetadataUrl, 'sourceMetadataUrl', fail, true);
      arrayValue(entry.topics, 'topics', fail);
      for (const topic of entry.topics || []) enumValue(topic, newsTopics, 'topics[]', fail);
    }
  },
  {
    file: 'data/funding-sources.json',
    required: ['id', 'name', 'dnsUrl', 'hnsUrl', 'website', 'sourceType', 'sourceUrl', 'topics', 'registryLabels', 'lastVerified', 'notes'],
    validate(entry, fail) {
      enumValue(entry.sourceType, fundingSourceTypes, 'sourceType', fail);
      optionalUrl(entry.dnsUrl, 'dnsUrl', fail);
      optionalUrl(entry.hnsUrl, 'hnsUrl', fail, true);
      optionalUrl(entry.website, 'website', fail, true);
      optionalUrl(entry.sourceUrl, 'sourceUrl', fail);
      arrayValue(entry.topics, 'topics', fail);
    }
  },
  {
    file: 'data/funding-proposals.json',
    required: ['id', 'title', 'summary', 'sourceUrl', 'projectDnsUrl', 'projectHnsUrl', 'projectUrl', 'requestedAmount', 'currency', 'pledgedAmount', 'pledgeSourceUrl', 'status', 'tags', 'proposer', 'registryLabels', 'lastVerified', 'notes'],
    validate(entry, fail) {
      enumValue(entry.status, proposalStatuses, 'status', fail);
      optionalUrl(entry.sourceUrl, 'sourceUrl', fail);
      optionalUrl(entry.projectDnsUrl, 'projectDnsUrl', fail, true);
      optionalUrl(entry.projectHnsUrl, 'projectHnsUrl', fail, true);
      optionalUrl(entry.projectUrl, 'projectUrl', fail, true);
      optionalUrl(entry.pledgeSourceUrl, 'pledgeSourceUrl', fail, true);
      arrayValue(entry.tags, 'tags', fail);
      requiredObjectFields(entry.proposer, ['name', 'url'], 'proposer', fail);
      optionalUrl(entry.proposer && entry.proposer.url, 'proposer.url', fail, true);
    }
  }
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function requiredObjectFields(value, required, prefix, fail) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(`${prefix} must be an object`);
    return;
  }
  for (const field of required) {
    if (!(field in value)) fail(`${prefix}.${field} is required`);
  }
}

function enumValue(value, allowed, field, fail) {
  if (!allowed.has(value)) fail(`${field} has unsupported value "${value}"`);
}

function booleanValue(value, field, fail) {
  if (typeof value !== 'boolean') fail(`${field} must be boolean`);
}

function arrayValue(value, field, fail) {
  if (!Array.isArray(value)) fail(`${field} must be an array`);
}

function optionalUrl(value, field, fail, allowHns = false) {
  if (!value) return;
  if (allowHns && /^https?:\/\/[^.\s/]+\/?/.test(value)) return;
  if (!/^https?:\/\/\S+/.test(value)) fail(`${field} must be http(s) URL when present`);
}

function validateRegistryFile(config) {
  const data = readJson(config.file);
  const errors = [];
  const ids = new Set();
  const fail = (message) => errors.push(`${config.file}: ${message}`);

  if (data.schemaVersion !== '0.1') fail('schemaVersion must be 0.1');
  if (!Array.isArray(data.entries)) fail('entries must be an array');

  for (const [index, entry] of (data.entries || []).entries()) {
    const item = `${entry.id || `entry-${index}`}`;
    const itemFail = (message) => fail(`${item}: ${message}`);

    for (const field of config.required) {
      if (!(field in entry)) itemFail(`${field} is required`);
    }

    if (!idPattern.test(entry.id || '')) itemFail('id must be lowercase kebab-case');
    if (ids.has(entry.id)) itemFail(`duplicate id "${entry.id}"`);
    ids.add(entry.id);

    if (!todayPattern.test(entry.lastVerified || '')) itemFail('lastVerified must be YYYY-MM-DD');
    arrayValue(entry.registryLabels, 'registryLabels', itemFail);
    for (const label of entry.registryLabels || []) {
      enumValue(label, labels, 'registryLabels[]', itemFail);
    }

    config.validate(entry, itemFail);
  }

  return errors;
}

const errors = files.flatMap(validateRegistryFile);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${files.length} registry files.`);
