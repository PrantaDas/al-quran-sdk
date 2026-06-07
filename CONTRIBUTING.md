# Contributing to `al-quran-sdk`

Thanks for your interest in improving `al-quran-sdk`. This document explains
how to get the project running locally, the conventions we follow, and the
expected workflow for opening pull requests.

By participating in this project you agree to abide by our
[Code of Conduct](./CODE_OF_CONDUCT.md).

## Project Overview

`al-quran-sdk` is a TypeScript wrapper around the public
[quran.com v4 REST API](https://api-docs.quran.com/docs/quran.com_versioned).
Each module under `src/apis/*` exposes a namespace object that maps 1:1 onto
a family of upstream endpoints.

## Prerequisites

- Node.js — version pinned in [`.nvmrc`](./.nvmrc). Use `nvm use` to switch.
- npm (bundled with Node).

## Getting Started

```bash
git clone https://github.com/PrantaDas/al-quran-sdk.git
cd al-quran-sdk
nvm use            # optional but recommended
npm install
npm run build      # type-check and emit ./dist
npm test           # run jest test suite
```

## Branching & Commit Style

- Branch from `main` using a descriptive name, e.g.
  `feat/add-recitation-cache` or `fix/verse-by-key-encoding`.
- Keep commits focused; squash trivial fix-ups before opening a PR.
- Prefer [Conventional Commit](https://www.conventionalcommits.org/) prefixes:
  `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.

## Coding Guidelines

- TypeScript strict mode is enabled — every public symbol must be typed.
- Public API surface (`src/index.ts`, the named exports of `src/apis/*`,
  and every interface in `src/interfaces.ts`) is **stable**. Renames or
  signature changes require a major-version bump.
- Prefer the shared helpers in `src/utils.ts` (`apiWraper`, `buildUri`) for
  HTTP and URL handling so the modules stay consistent.
- Throw the domain-specific error classes from `src/errors.ts` for argument
  validation; never throw raw `Error`.
- Add or update JSDoc for any new method, including a `@see` link to the
  upstream endpoint documentation.

## Tests

- Tests live alongside the modules under `src/apis/*.test.ts` and run against
  the real quran.com API.
- Run the full suite locally with `npm test` before opening a PR.
- When adding a new endpoint, include at least one happy-path test and one
  error-path test.

## Pull Request Checklist

Before requesting review, confirm that:

- [ ] `npm run build` completes with no TypeScript errors.
- [ ] `npm test` passes locally.
- [ ] New or changed public methods include JSDoc.
- [ ] The README is updated if you added a new public method.
- [ ] No unrelated formatting churn.

Open the PR against `main` using the
[pull request template](./.github/PULL_REQUEST_TEMPLATE.md) and describe
the motivation, the change, and how to verify it.

## Reporting Bugs / Requesting Features

Use the [issue templates](./.github/ISSUE_TEMPLATE/) under the *Issues* tab.
Include reproduction steps, expected vs actual behavior, and environment
details where relevant.

## Security

If you discover a security vulnerability, please follow the process
described in [`SECURITY.md`](./SECURITY.md) — do **not** open a public
issue.

## License

By contributing you agree that your contributions will be licensed under
the project's [MIT License](./LICENSE).
