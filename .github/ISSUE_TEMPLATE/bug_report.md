---
name: Bug report
about: Report a defect in al-quran-sdk
title: "[Bug] <short description>"
labels: bug
assignees: ''
---

## Describe the bug

A clear and concise description of what the bug is.

## To Reproduce

Minimal steps to reproduce the behavior:

1. Install version `…`
2. Call `…` with arguments `…`
3. See error

If possible, include a minimal code snippet:

```ts
import { verse } from 'al-quran-sdk';

const res = await verse.getVerseByChapter('1');
// observed: …
// expected: …
```

## Expected behavior

What you expected to happen.

## Actual behavior

What actually happened. Include the full error message or stack trace if
applicable.

## Environment

- `al-quran-sdk` version: `…`
- Node.js version (`node -v`): `…`
- Operating system: `…`
- Package manager (npm / yarn / pnpm) and version: `…`

## Additional context

Add any other context about the problem here — request/response payloads,
network configuration (proxy, VPN), or links to related issues.
