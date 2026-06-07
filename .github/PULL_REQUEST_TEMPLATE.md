<!--
Thanks for sending a pull request to al-quran-sdk.
Please fill out the sections below so reviewers have the context they need.
-->

## Summary

<!-- One or two sentences describing what this PR does and why. -->

## Type of Change

<!-- Tick all that apply. -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that changes the public API)
- [ ] Refactor (no behavior change)
- [ ] Documentation
- [ ] Build / tooling / CI

## Related Issue

<!-- Link the issue this PR addresses, e.g. "Closes #123". -->

Closes #

## Changes

<!-- Bullet list of the meaningful changes in this PR. -->

-
-

## Public API Impact

<!--
Does this PR add, remove, or change any exported symbol in
src/index.ts, src/apis/*, or src/interfaces.ts?
If yes, list them and note whether the change is backward compatible.
-->

- [ ] No public API changes.
- [ ] Public API additions (list below).
- [ ] Public API changes / removals (list below + version bump plan).

## How to Verify

<!-- Concrete steps a reviewer can follow to confirm the change works. -->

```bash
npm install
npm run build
npm test
```

## Checklist

- [ ] `npm run build` succeeds with no TypeScript errors.
- [ ] `npm test` passes locally.
- [ ] New or changed public methods have JSDoc with a `@see` link to the
      upstream endpoint.
- [ ] README updated if a new public method was added.
- [ ] Version in `package.json` bumped if this is a release-ready change.
- [ ] I have read and followed [CONTRIBUTING.md](../CONTRIBUTING.md).

## Screenshots / Logs

<!-- Optional: paste relevant output, screenshots, or request/response samples. -->
