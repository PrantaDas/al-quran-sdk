<div align="center">

# al-quran-sdk

**A modern, fully-typed TypeScript SDK for the [Quran.com](https://quran.com) API.**

Verses, chapters, recitations, translations, tafsirs, and scripts — all behind one strongly-typed, promise-based client.

[![npm version](https://img.shields.io/npm/v/al-quran-sdk.svg?style=flat-square)](https://www.npmjs.com/package/al-quran-sdk)
[![npm downloads](https://img.shields.io/npm/dm/al-quran-sdk.svg?style=flat-square)](https://www.npmjs.com/package/al-quran-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Quran.com API](https://img.shields.io/badge/API-quran.com%20v4-green.svg?style=flat-square)](https://api-docs.quran.com/)
[![Docs](https://img.shields.io/badge/docs-prantadas.dev-blue.svg?style=flat-square)](https://prantadas.dev/docs/al-quran-sdk)

📖 **Full documentation:** [prantadas.dev/docs/al-quran-sdk](https://prantadas.dev/docs/al-quran-sdk)

</div>

---

## Table of Contents

- [Documentation](#documentation)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Module Overview](#module-overview)
- [API Reference](#api-reference)
  - [`chapter`](#chapter-api)
  - [`verse`](#verse-api)
  - [`quran`](#quran-api)
  - [`juz`](#juz-api)
  - [`audio`](#audio-api)
  - [`resources`](#resources-api)
- [Query Parameters](#query-parameters)
- [Supported Languages](#supported-languages)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)
- [HTTP Client Internals](#http-client-internals)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Disclaimer](#disclaimer)

---

## Documentation

Full guides, API reference, and examples are hosted at:

**➜ [https://prantadas.dev/docs/al-quran-sdk](https://prantadas.dev/docs/al-quran-sdk)**

The sections below are a condensed reference; visit the docs site for the complete, searchable version.

---

## Features

- **First-class TypeScript** — every endpoint, query, and response is typed. Autocomplete, no `any` at the boundary.
- **Six focused modules** — `chapter`, `verse`, `quran`, `juz`, `audio`, `resources`. Import only what you need.
- **Promise-based** — async/await friendly. No callbacks, no event emitters.
- **Keep-alive HTTP** — connection pooling via [`agentkeepalive`](https://www.npmjs.com/package/agentkeepalive) for lower latency under load.
- **Custom error classes** — `LanguageValidationError`, `VerseError`, `AudioError`, `ChapterError`, `ResourceError` — catch precisely what you need.
- **Dual module support** — works in both **CommonJS** and **ESM** projects.
- **Zero configuration** — sensible defaults, ready to use after `npm install`.
- **Comprehensive coverage** — verses by chapter / page / juz / hizb / rub / key, all script variants (Uthmani, Indo-Pak, Imlaei, Tajweed, glyph codes v1/v2), full audio recitation tree, translations, tafsirs, and metadata.

---

## Installation

```bash
# npm
npm install al-quran-sdk

# yarn
yarn add al-quran-sdk

# pnpm
pnpm add al-quran-sdk

# bun
bun add al-quran-sdk
```

**Requirements:** Node.js 16+ recommended. Works in any environment that supports `fetch`/`https` (Node, Deno via npm specifier, modern bundlers).

---

## Quick Start

### ESM / TypeScript

```typescript
import { chapter, verse, audio } from 'al-quran-sdk';

// List all 114 chapters in English
const { chapters } = await chapter.listChapters('en');

// Fetch verse 1:1 (Al-Fatiha, ayah 1)
const { verses } = await verse.getSpecificVerseByVerseKey('1:1', {
  translations: '131',         // Sahih International
  fields: 'text_uthmani',
});

// Get Mishary Rashid Alafasy reciting Surah Al-Ikhlas
const recitation = await audio.getChaptersAudioOfAReciter(7, 112);
console.log(recitation.audio_url);
```

### CommonJS

```javascript
const { chapter, verse } = require('al-quran-sdk');

chapter.getChapter(1, 'en')
  .then((res) => console.log(res.name_simple)) // "Al-Fatihah"
  .catch(console.error);
```

---

## Module Overview

| Module       | Purpose                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `chapter`    | Chapter (Surah) metadata — list, single, and detailed info.             |
| `verse`      | Verses (Ayahs) by chapter, page, juz, hizb, rub, key, or random.        |
| `quran`      | Raw Quranic text in multiple scripts + single translation/tafsir.       |
| `juz`        | The 30 Juz divisions of the Quran.                                      |
| `audio`      | Recitations, reciters, and audio files at every granularity.            |
| `resources`  | Translations, tafsirs, languages, recitation styles, and media listings.|

Import individually:

```typescript
import { chapter, verse, quran, juz, audio, resources } from 'al-quran-sdk';
```

Or namespaced:

```typescript
import * as Quran from 'al-quran-sdk';

Quran.chapter.listChapters('en');
```

All response types are also exported for use in your own code:

```typescript
import type { Chapter, Verse, VerseResponse, IAudio } from 'al-quran-sdk';
```

---

## API Reference

### `chapter` API

Chapter (Surah) metadata.

#### `chapter.listChapters(language?: string): Promise<ListChapters>`

List all 114 chapters of the Quran.

```typescript
const { chapters } = await chapter.listChapters('en');
// chapters[0] => { id: 1, name_simple: 'Al-Fatihah', verses_count: 7, ... }
```

#### `chapter.getChapter(id: number, language?: string): Promise<Chapter>`

Fetch a single chapter by ID (1–114).

```typescript
const surah = await chapter.getChapter(2, 'en');
// surah.name_arabic => "البقرة"
```

#### `chapter.getChapterInfo(chapter_id: number, language?: string): Promise<ChapterInfo>`

Fetch the long-form descriptive information for a chapter.

```typescript
const info = await chapter.getChapterInfo(1, 'en');
// info.text => "Al-Fatihah is the opening chapter..."
```

---

### `verse` API

Fetch verses (Ayahs) by any of seven slicing strategies.

| Method                              | Path basis              |
| ----------------------------------- | ----------------------- |
| `getVerseByChapter(n, query?)`      | Surah number (1–114)    |
| `getVerseByPage(n, query?)`         | Mushaf page (1–604)     |
| `getVerseByJuz(n, query?)`          | Juz (1–30)              |
| `getVerseByHizbNumber(n, query?)`   | Hizb (1–60)             |
| `getVerseByRubElHizbNumber(n, q?)`  | Rub el-Hizb (1–240)     |
| `getSpecificVerseByVerseKey(k, q?)` | Verse key `"surah:ayah"`|
| `getRandomAyah(query?)`             | Random verse            |

All return `Promise<VerseResponse>` and accept an optional `VerseQuery` (see [Query Parameters](#query-parameters)).

```typescript
// Page 1 of the Mushaf with Uthmani text + Sahih International translation
const { verses, pagination } = await verse.getVerseByPage('1', {
  language: 'en',
  words: 'true',
  translations: '131',
  fields: 'text_uthmani',
});

// A random ayah, with Bengali translation
const random = await verse.getRandomAyah({
  language: 'bn',
  translations: '161',
});
```

---

### `quran` API

Raw Quranic text in multiple scripts, plus single-resource translation/tafsir lookups.

#### Script variants

```typescript
quran.getUthmaniScriptOfAyah(query?)         // Uthmani
quran.getUthmaniSimpleScriptOfAyah(query?)   // Uthmani (simple)
quran.getUthmaniTajweedScriptOfAyah(query?)  // Uthmani with tajweed colour markup
quran.getIndoPakScriptOfAyah(query?)         // Indo-Pak style
quran.getImlaeiSimpleTextOfAyah(query?)      // Imlaei (modern Arabic spelling)
```

Each accepts a `QuranQuery` to filter by `chapter_number`, `juz_number`, `page_number`, `hizb_number`, `rub_el_hizb_number`, or `verse_key`.

```typescript
const { verses } = await quran.getUthmaniScriptOfAyah({ chapter_number: '112' });
// verses[0].text_uthmani => "قُلْ هُوَ ٱللَّهُ أَحَدٌ"
```

#### Glyph codes (for QPC Hafs font rendering)

```typescript
quran.getGlyphCodesOfAyahV1(query?)
quran.getGlyphCodesOfAyahV2(query?)
```

#### Single translation / tafsir

```typescript
quran.getASingleTranslation(translation_id: string, query?: TranslationQuery)
quran.getSingleTafsir(tafsir_id: string, query?: TranslationQuery)
```

```typescript
// Sahih International (131) for Surah Al-Ikhlas
const translation = await quran.getASingleTranslation('131', {
  chapter_number: '112',
});
```

---

### `juz` API

#### `juz.getAllJuzs(): Promise<JuzResponse>`

List all 30 Juz of the Quran with their verse-range metadata.

```typescript
const { juzs } = await juz.getAllJuzs();
```

---

### `audio` API

Recitations, reciters, and audio file URLs at every granularity supported by Quran.com.

#### Whole-chapter recitations

```typescript
audio.getChaptersAudioOfAReciter(reciter_id, chapter_number) // one chapter
audio.getAllChaptersAudioOfAReciter(reciter_id)              // all 114
audio.getListOfChapterReciters(language?)                    // reciter directory
```

```typescript
// Mishary Rashid Alafasy (id 7) reciting Surah Yasin (36)
const { audio_url } = await audio.getChaptersAudioOfAReciter(7, 36);
```

#### Ayah-level recitations

```typescript
audio.getRecitations(language?)                                   // recitation list
audio.getAllAudioFilesofARecitation(recitation_id, query?)        // bulk audio
audio.getAyahRecitationsForSpecificSurah(recitation_id, chapter)  // by surah
audio.getAyahRecitationsForSpecificJuz(recitation_id, juz)        // by juz
audio.getAyahRecitationForSpecificMadaniMushafPage(rid, page)     // by page
audio.getAyahRecitationForSpecificRubelHizb(rid, rub)             // by rub
audio.getAyahRecitationForSpecificHizb(rid, hizb)                 // by hizb
audio.getAyahRecitationForSpecificAyah(rid, ayah_key)             // by ayah
```

```typescript
// All ayah-level audio files for recitation 7 in Surah Al-Fatiha
const { audio_files, pagination } = await audio.getAyahRecitationsForSpecificSurah(7, 1);
audio_files.forEach((file) => console.log(file.url, file.duration));
```

---

### `resources` API

Directory and metadata endpoints — list available translations, tafsirs, languages, and so on.

```typescript
resources.getTranslations(language?)            // translation directory
resources.getTranslationInfo(translation_id)    // single translation metadata
resources.getTafsirs(language?)                 // tafsir directory
resources.getTafsirInfo(tafsir_id)              // single tafsir metadata
resources.getRecitationInfo(recitation_id)      // reciter biography
resources.getRecitationStyles()                 // mujawwad / murattal / muallim
resources.getLanguages()                        // every supported language
resources.getChapterInfos()                     // all chapter descriptions
resources.getVerseMedias()                      // verse media listing
```

```typescript
const { translations } = await resources.getTranslations('en');
// pick the resource_id you want, then feed it to verse.* or quran.*
```

---

## Query Parameters

### `VerseQuery`

Used by every `verse.*` method.

| Field                 | Type     | Description                                                      |
| --------------------- | -------- | ---------------------------------------------------------------- |
| `language`            | `string` | ISO language code (see [Supported Languages](#supported-languages)). |
| `words`               | `string` | `"true"` to include word-by-word breakdown.                      |
| `translations`        | `string` | Comma-separated translation resource IDs (e.g. `"131,20"`).      |
| `audio`               | `string` | Reciter ID to embed audio URLs in the response.                  |
| `tafsirs`             | `string` | Comma-separated tafsir resource IDs.                             |
| `word_fields`         | `string` | Extra word-level fields to include.                              |
| `translation_fields`  | `string` | Extra translation-level fields to include.                       |
| `fields`              | `string` | Extra verse-level fields (e.g. `"text_uthmani"`).                |
| `page`                | `string` | Pagination — page number.                                        |
| `per_page`            | `string` | Pagination — page size.                                          |

### `QuranQuery`

Used by every `quran.*` script method.

| Field                 | Description                                  |
| --------------------- | -------------------------------------------- |
| `chapter_number`      | Filter by Surah.                             |
| `juz_number`          | Filter by Juz.                               |
| `page_number`         | Filter by Mushaf page.                       |
| `hizb_number`         | Filter by Hizb.                              |
| `rub_el_hizb_number`  | Filter by Rub el-Hizb.                       |
| `verse_key`           | Filter by single verse key (`"surah:ayah"`). |

### `AudioQueryParams`

Used by `audio.getAllAudioFilesofARecitation`. Same shape as `QuranQuery` plus an optional `fields`.

---

## Supported Languages

The SDK validates the `language` argument against the list supported by Quran.com. Pass any of the ISO codes below:

```
en, ur, bn, tr, es, fr, bs, ru, ml, id, uz, nl, de, tg, ta, ja, it, vi, zh,
sq, fa, bg, bm, ha, pt, ro, hi, sw, kk, th, tl, km, as, ko, so, az, ku, dv,
ms, prs, zgh, am, ce, cs, fi, gu, he, ka, kn, ks, lg, mk, mr, mrn, ne, no,
om, pl, ps, rw, sd, se, si, sr, sv, te, tt, ug, uk, yo
```

Passing an unsupported language throws `LanguageValidationError` synchronously, before any HTTP request is made.

---

## Error Handling

The SDK exports five domain-specific error classes:

| Class                       | Thrown when …                                                  |
| --------------------------- | -------------------------------------------------------------- |
| `LanguageValidationError`   | `language` is not in the supported list.                       |
| `VerseError`                | A verse-specific precondition fails.                           |
| `ChapterError`              | A chapter-specific precondition fails.                         |
| `AudioError`                | A required audio parameter (e.g. `recitation_id`) is missing.  |
| `ResourceError`             | A required resource ID is missing.                             |

```typescript
import { audio, AudioError, LanguageValidationError } from 'al-quran-sdk';

try {
  await audio.getChaptersAudioOfAReciter(7, 36);
} catch (err) {
  if (err instanceof AudioError) {
    // missing reciter id or chapter number
  } else if (err instanceof LanguageValidationError) {
    // bad language code
  } else {
    // network / HTTP error from axios
  }
}
```

Network errors propagate as Axios error objects (already serialised via `error.toJSON()`).

---

## TypeScript Support

The package ships with complete `.d.ts` declarations. All response shapes, query parameters, and API interfaces are exported.

```typescript
import type {
  Chapter,
  ListChapters,
  ChapterInfo,
  Verse,
  VerseResponse,
  VerseQuery,
  QuranQuery,
  IAudio,
  IRecitation,
  IReciters,
  ISingleRecitation,
  IAyahRecitationSpecificSurah,
  TranslationResponse,
  TafsirsResponse,
  LanguageResponse,
  // ...and many more
} from 'al-quran-sdk';
```

`strict` mode safe. No `any` leaks across the public boundary.

---

## HTTP Client Internals

Under the hood the SDK uses **axios** with an `agentkeepalive` HTTPS agent:

- Base URL: `https://api.quran.com/api/v4`
- Default timeout: **60 s**
- Connection pool: up to **100** sockets, **25** free sockets retained
- `Accept: application/json`, `Content-Type: application/json;charset=utf-8`
- Response interceptor returns `response.data` directly — your `await` resolves to the parsed payload, not an Axios wrapper

No additional configuration is required for typical usage. The client is created once at module load and reused across all calls.

---

## Testing

The repository uses **Jest** with **ts-jest**.

```bash
# run the full test suite
npm test

# build the distributable
npm run build
```

Test files live alongside their source modules (`src/apis/*.test.ts`).

---

## Contributing

Contributions, bug reports, and feature requests are very welcome.

1. **Fork** the repository.
2. Create a feature branch: `git checkout -b feat/my-improvement`.
3. Add tests for any new behaviour.
4. Run `npm test && npm run build` and make sure both pass.
5. Open a **pull request** describing the change and the motivation.

For larger changes, please open an [issue](https://github.com/PrantaDas/al-quran-sdk/issues) first so we can align on the approach.

---

## License

Released under the [MIT License](./LICENSE). © Pranta Das.

---

## Acknowledgements

- This SDK is a thin, typed wrapper around the excellent public API maintained by [**Quran.com**](https://quran.com) and documented at [api-docs.quran.com](https://api-docs.quran.com/). All Quranic data, translations, and audio recitations served by these endpoints are credited to their respective scholars, translators, reciters, and the Quran.com team.
- Built with [TypeScript](https://www.typescriptlang.org/), [axios](https://axios-http.com/), and [agentkeepalive](https://www.npmjs.com/package/agentkeepalive).

---

## Disclaimer

This SDK is provided for educational, research, and application-development purposes. It is an independent open-source project and is **not** officially affiliated with Quran.com. The Quran is a sacred text in Islam; this library aims to present its data accurately, respectfully, and accessibly. If you spot a translation or transliteration issue, it almost certainly originates upstream at Quran.com — please consider reporting it there as well.

<div align="center">

**[npm](https://www.npmjs.com/package/al-quran-sdk)** · **[GitHub](https://github.com/PrantaDas/al-quran-sdk)** · **[Issues](https://github.com/PrantaDas/al-quran-sdk/issues)** · **[Quran.com API Docs](https://api-docs.quran.com/)**

</div>
