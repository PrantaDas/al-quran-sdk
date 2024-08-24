
# al-quran-sdk

A TypeScript SDK for accessing various resources related to the Quran, including verses, chapters, audio recitations, translations, and more. This SDK provides a comprehensive set of APIs to interact with Quran data and resources efficiently.

## Table of Contents

- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [Verse API](#verse-api)
  - [Resources API](#resources-api)
  - [Quran API](#quran-api)
  - [Juz API](#juz-api)
  - [Chapter API](#chapter-api)
  - [Audio API](#audio-api)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the SDK, use npm or yarn or pnpm:

```bash
npm install Al-Quran-Js
# or
yarn add Al-Quran-Js
#  or
pnpm install Al-Quran-Js
```

## API Documentation

### Verse API

Provides methods to fetch verses based on various criteria.

#### `getVerseByChapter(chapter_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error>`

Fetches verses by chapter number.

#### `getVerseByPage(page_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error>`

Fetches verses by page number.

#### `getVerseByJuz(juz_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error>`

Fetches verses by Juz number.

#### `getVerseByHizbNumber(hizb_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error>`

Fetches verses by Hizb number.

#### `getVerseByRubElHizbNumber(rub_el_hizb_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error>`

Fetches verses by Rub el Hizb number.

#### `getSpecificVerseByVerseKey(verse_key: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error>`

Fetches a specific verse by its key.

#### `getRandomAyah(query?: VerseQuery): Promise<VerseResponse | AxiosError | Error>`

Fetches a random verse.

### Resources API

Provides methods to fetch resource information.

#### `getRecitationInfo(recitation_id: string): Promise<RecitationInfo | Error | AxiosError>`

Fetches information about a specific recitation.

#### `getTranslationInfo(translation_id: string): Promise<TranslationInfo | Error | AxiosError>`

Fetches information about a specific translation.

#### `getTranslations(language: string = 'en'): Promise<TranslationResponse | Error | AxiosError>`

Fetches translations based on language.

#### `getTafsirs(language: string = 'en'): Promise<TafsirsResponse | Error | AxiosError>`

Fetches Tafsirs based on language.

#### `getTafsirInfo(tafsir_id: string): Promise<TafsirInfoResponse | Error | AxiosError>`

Fetches information about a specific Tafsir.

#### `getRecitationStyles(): Promise<RecitationStyleResponse | Error | AxiosError>`

Fetches available recitation styles.

#### `getLanguages(): Promise<LanguageResponse | Error | AxiosError>`

Fetches available languages.

#### `getChapterInfos(): Promise<ChapterInfos | Error | AxiosError>`

Fetches information about chapters.

#### `getVerseMedias(): Promise<VerseMediaResponse | Error | AxiosError>`

Fetches media associated with verses.

### Quran API

Provides methods to fetch Quranic text in various scripts.

#### `getIndoPakScriptOfAyah(query?: QuranQuery): Promise<QuranResponse | AxiosError | Error>`

Fetches the Indo-Pak script of an Ayah.

#### `getUthmaniTajweedScriptOfAyah(query?: QuranQuery): Promise<UthmaniTajweedResponse | AxiosError | Error>`

Fetches the Uthmani Tajweed script of an Ayah.

#### `getUthmaniScriptOfAyah(query?: QuranQuery): Promise<UthmaniScriptResponse | AxiosError | Error>`

Fetches the Uthmani script of an Ayah.

#### `getUthmaniSimpleScriptOfAyah(query?: QuranQuery): Promise<UthmaniSimpleScriptResponse | AxiosError | Error>`

Fetches the Uthmani simple script of an Ayah.

#### `getImlaeiSimpleTextOfAyah(query?: QuranQuery): Promise<ImlaeiSimpleTextResponse | AxiosError | Error>`

Fetches the Imlaei simple text of an Ayah.

#### `getASingleTranslation(translation_id: string, query?: TranslationQuery): Promise<SingleTranslationResponse | AxiosError | Error>`

Fetches a single translation.

#### `getSingleTafsir(tafsir_id: string, query?: TranslationQuery): Promise<SingleTafsirResponse | AxiosError | Error>`

Fetches a single Tafsir.

#### `getGlyphCodesOfAyahV1(query?: QuranQuery): Promise<GlyphCodesOfAyahV1Response | AxiosError | Error>`

Fetches glyph codes of an Ayah (version 1).

#### `getGlyphCodesOfAyahV2(query?: QuranQuery): Promise<GlyphCodesOfAyahV2Response | AxiosError | Error>`

Fetches glyph codes of an Ayah (version 2).

### Juz API

Provides methods to fetch information about Juz.

#### `getAllJuzs(): Promise<JuzResponse | Error | AxiosError>`

Fetches all Juz.

### Chapter API

Provides methods to fetch chapter information.

#### `listChapters(language = 'en'): Promise<ListChapters | Error | AxiosError>`

Fetches a list of chapters based on language.

#### `getChapter(id: number, language = 'en'): Promise<Chapter | Error | AxiosError>`

Fetches information about a specific chapter.

#### `getChapterInfo(chapter_id: number, language = 'en'): Promise<ChapterInfo | Error | AxiosError>`

Fetches detailed information about a specific chapter.

### Audio API

Provides methods to fetch audio recitations and related data.

#### `getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio | Error | AxiosError>`

Fetches audio recordings of a specific chapter by a particular reciter.

#### `getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter | Error | AxiosError>`

Fetches all chapter recordings by a specific reciter.

#### `getRecitations(language: string = 'en'): Promise<IRecitation | Error | AxiosError>`

Fetches recitations based on language.

#### `getAllAudioFilesofARecitation(recitation_id: number, query?: AudioQueryParams): Promise<ISingleRecitation | Error | AxiosError>`

Fetches all audio files of a specific recitation.

#### `getListOfChapterReciters(language: string = 'en'): Promise<IReciters | Error | AxiosError>`

Fetches a list of chapter reciters based on language.

#### `getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<IAyahRecitationSpecificSurah | Error | AxiosError>`

Fetches Ayah recitations for a specific Surah.

#### `getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<IAyahRecitationSpecificJuz | Error | AxiosError>`

Fetches Ayah recitations for a specific Juz.

#### `getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<IAyahRecitationSpecificMadaniMushafPage | Error | AxiosError>`

Fetches Ayah recitations for a specific Madani Mushaf page.

#### `getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<IAyahRecitationSpecificRubelHizb | Error | AxiosError>`

Fetches Ayah recitations for a specific Rub el Hizb.

#### `getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<IAyahRecitationSpecificHizb | Error | AxiosError>`

Fetches Ayah recitations for a specific Hizb.

#### `getAyahRecitationForSpecificAyah(recitation_id: number, ayah_key: string): Promise<IAyahRecitationSpecificAyah | Error | AxiosError>`

Fetches Ayah recitations for a specific Ayah.

## Usage

Here's a basic example of how to use the SDK:

### Usage in a CommonJS Environment:

```typescript
const { chapter } = require("al-quran-sdk");

chapter.listChapters('en')
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
```

### ES6+ (ECMAScript Modules)

```typescript
import { chapter }  from "al-quran-sdk";

chapter.listChapters('en')
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
```

## Contributing

Contributions are welcome! Please follow the standard GitHub fork-and-pull request workflow. If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/PrantaDas/al-quran-sdk/blob/main/LICENSE) file for details.


## Inclusivity and Neutrality
This SDK aims to be inclusive and respectful of all religions and beliefs. The Quran is a central text in Islam, and this SDK is designed to provide access to Quranic data for educational and informational purposes. I strive to present facts and information neutrally and inclusively, and  welcome feedback to improve my approach.