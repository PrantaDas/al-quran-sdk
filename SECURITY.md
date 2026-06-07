# Security Policy

## Supported Versions

Security fixes are issued for the latest minor release line only. Older
releases will not receive backports.

| Version  | Supported          |
| -------- | ------------------ |
| `1.1.x`  | :white_check_mark: |
| `1.0.x`  | :x:                |
| `< 1.0`  | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in `al-quran-sdk`, please report
it **privately** so we can fix it before the issue is publicly disclosed.

**Do not open a public GitHub issue for security reports.**

### How to Report

Email the maintainer at **prantodas043@gmail.com** with:

- A description of the vulnerability and its potential impact.
- Steps to reproduce, or a minimal proof-of-concept.
- The affected version(s) of `al-quran-sdk`.
- Any suggested mitigation, if you have one.

Alternatively, use GitHub's
[private vulnerability reporting](https://github.com/PrantaDas/al-quran-sdk/security/advisories/new)
form for this repository.

### What to Expect

- **Acknowledgement:** within 72 hours of your report.
- **Initial assessment:** within 7 days, including severity classification.
- **Fix timeline:** depends on severity; critical issues are prioritized
  for a same-week patch release.
- **Disclosure:** coordinated with you. Credit will be given in the release
  notes unless you request otherwise.

### Scope

In scope:

- The published `al-quran-sdk` npm package and its source under `src/`.
- Insecure default configuration in the HTTP transport layer (`src/req.ts`).

Out of scope:

- Vulnerabilities in upstream services (e.g. the quran.com API).
- Vulnerabilities in third-party dependencies that have already been
  reported and tracked upstream. Please report those to the dependency
  maintainers; we will update once a fix is available.
- Issues that require an attacker to have already compromised the host
  machine or the user's npm account.

Thank you for helping keep `al-quran-sdk` and its users safe.
