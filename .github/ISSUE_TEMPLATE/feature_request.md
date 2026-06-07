---
name: Feature request
about: Suggest a new endpoint, helper, or improvement for al-quran-sdk
title: "[Feature] <short description>"
labels: enhancement
assignees: ''
---

## Summary

A clear and concise description of the feature you'd like to see.

## Motivation

What problem does this solve? Who benefits, and how?

If the request maps to a specific upstream quran.com endpoint, link to its
documentation:

- Endpoint: `…`
- Upstream docs: https://api-docs.quran.com/docs/quran.com_versioned/…

## Proposed API

How should the feature look to callers? Sketch the method signature(s) and
the expected response shape:

```ts
// Example
import { audio } from 'al-quran-sdk';

const res = await audio.someNewMethod(/* args */);
// res: { ... }
```

## Alternatives Considered

Other approaches you thought about, and why they don't fit as well.

## Additional Context

Screenshots, links to related issues, prior art in other SDKs, etc.
