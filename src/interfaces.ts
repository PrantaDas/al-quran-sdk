/**
 * Public type definitions for the SDK.
 *
 * The file is organised into logical sections — transport, audio, chapter,
 * juz, resource, verse, quran — mirroring the modules under `./apis`. Each
 * exported name is part of the package's public surface; renaming or
 * reshaping any of them is a breaking change.
 *
 * NOTE: A handful of interfaces (`Translation`, `TranslatedName`) are
 * declared more than once in this file on purpose. TypeScript performs
 * declaration merging on identically-named interfaces, and downstream
 * consumers already depend on the merged shapes. Do not consolidate them
 * without a major-version bump.
 */

// ---------------------------------------------------------------------------
// Language whitelist
// ---------------------------------------------------------------------------

/**
 * ISO-639 codes accepted by the Quran API's `language` query parameter.
 *
 * The list mirrors the languages currently surfaced by quran.com. It is
 * frozen at runtime to prevent accidental mutation by consumers.
 */
export const ALLOWED_LANGUAGES: ReadonlySet<string> = new Set([
    'en', 'ur', 'bn', 'tr', 'es', 'fr', 'bs', 'ru', 'ml', 'id', 'uz', 'nl',
    'de', 'tg', 'ta', 'ja', 'it', 'vi', 'zh', 'sq', 'fa', 'bg', 'bm', 'ha',
    'pt', 'ro', 'hi', 'sw', 'kk', 'th', 'tl', 'km', 'as', 'ko', 'so', 'az',
    'ku', 'dv', 'ms', 'prs', 'zgh', 'am', 'ce', 'cs', 'fi', 'gu', 'he', 'ka',
    'kn', 'ks', 'lg', 'mk', 'mr', 'mrn', 'ne', 'no', 'om', 'pl', 'ps', 'rw',
    'sd', 'se', 'si', 'sr', 'sv', 'te', 'tt', 'ug', 'uk', 'sq', 'yo',
]);

// ---------------------------------------------------------------------------
// Transport / HTTP
// ---------------------------------------------------------------------------

/** Free-form header bag forwarded with every outbound request. */
export interface CustomHeaders {
    [key: string]: string;
}

/** Configuration accepted by the Axios factory. */
export interface AxiosConfig {
    baseURL?: string;
    token?: string;
    customHeaders?: CustomHeaders;
}

// ---------------------------------------------------------------------------
// Audio — recitations, reciters, ayah-level audio
// ---------------------------------------------------------------------------

/** Optional filters accepted by the recitation-audio endpoints. */
export interface AudioQueryParams {
    fields?: string;
    chapter_number?: string;
    juz_number?: string;
    page_number?: string;
    hizb_number?: string;
    rub_el_hizb_number?: string;
    verse_key?: string;
}

/** A single chapter audio file produced by one reciter. */
export interface IAudio {
    id: number;
    chapter_id: number;
    file_size: number;
    format: string;
    total_files: number;
    audio_url: string;
}

/** All chapter audio files belonging to one reciter. */
export interface IListOfAllAudioOfAReciter {
    audio_files: IAudio[];
}

/** A recitation entry — the combination of reciter + style. */
export interface IRecitation {
    id: number;
    reciter_name: string;
    style: string;
    translated_name: ITranslatedName;
}

/** A name translated into a specific language. */
export interface ITranslatedName {
    name: string;
    language_name: string;
}

/** Metadata describing a single ayah/chapter audio asset. */
export interface ISingleRecitationAudio {
    url: string;
    duration: number;
    format: string;
    segments?: any[];
}

/** Lightweight metadata bundled with single-recitation responses. */
export interface IRecitationMeta {
    reciter_name: string;
    recitation_style?: string | null;
}

/** Wrapper for one recitation's audio asset list. */
export interface ISingleRecitation {
    audio_files: ISingleRecitationAudio[];
    meta: IRecitationMeta;
}

/** Public information about a chapter-level reciter. */
export interface IReciter {
    id: number;
    name: string;
    arabic_name: string;
    relative_path: string;
    format: string;
    files_size: number;
}

/** Container for a list of chapter reciters. */
export interface IReciters {
    reciters: IReciter[];
}

/** Standard pagination envelope returned by the audio endpoints. */
export interface IAudioPagination {
    per_page: number;
    current_page: number;
    next_page: number;
    total_pages: number;
    total_records: number;
}

/* Each of the following is intentionally structurally identical — the
 * distinction is semantic (which scope the audio belongs to) and the API
 * surfaces it through separate routes. Keeping separate aliases helps
 * documentation tools and IDE intellisense surface the correct endpoint. */

/** Ayah-level recitation list scoped to one Surah. */
export interface IAyahRecitationSpecificSurah {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
}

/** Ayah-level recitation list scoped to one Juz. */
export interface IAyahRecitationSpecificJuz {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
}

/** Ayah-level recitation list scoped to one Madani Mushaf page. */
export interface IAyahRecitationSpecificMadaniMushafPage {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
}

/** Ayah-level recitation list scoped to one Rub el-Hizb. */
export interface IAyahRecitationSpecificRubelHizb {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
}

/** Ayah-level recitation list scoped to one Hizb. */
export interface IAyahRecitationSpecificHizb {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
}

/** Ayah-level recitation list scoped to one Ayah. */
export interface IAyahRecitationSpecificAyah {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
}

/** Public contract of the `audio` API module. */
export interface AudioApi {
    getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio>;
    getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter>;
    getRecitations(language: string): Promise<IRecitation>;
    getAllAudioFilesofARecitation(recitation_id: number, query?: AudioQueryParams): Promise<ISingleRecitation>;
    getListOfChapterReciters(language: string): Promise<IReciters>;
    getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<IAyahRecitationSpecificSurah>;
    getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<IAyahRecitationSpecificJuz>;
    getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<IAyahRecitationSpecificMadaniMushafPage>;
    getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<IAyahRecitationSpecificRubelHizb>;
    getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<IAyahRecitationSpecificHizb>;
    getAyahRecitationForSpecificAyah(recitation_id: number, ayah_key: string): Promise<IAyahRecitationSpecificAyah>;
}

// ---------------------------------------------------------------------------
// Chapter (surah)
// ---------------------------------------------------------------------------

/** Translation of a chapter's name. */
export interface ChapterTranslate {
    language_name: string;
    name: string;
}

/** A single Quran chapter (surah). */
export interface Chapter {
    id: number;
    revelation_place: string;
    revelation_order: number;
    bismillah_pre: boolean;
    name_simple: string;
    name_complex: string;
    name_arabic: string;
    verses_count: number;
    pages: number[];
    translated_name: ChapterTranslate;
}

/** Container returned by the "list all chapters" endpoint. */
export interface ListChapters {
    chapters?: Chapter[];
}

/** Long-form descriptive information about a chapter. */
export interface ChapterInfo {
    id: number;
    chapter_id: number;
    language_name: string;
    short_text: string;
    source: string;
    text: string;
}

/** Wrapper used by the chapter-info endpoint. */
export interface ChapterInfoResponse {
    chapter_info?: ChapterInfo;
}

/** Public contract of the `chapter` API module. */
export interface ChapterApi {
    listChapters: (language?: string) => Promise<ListChapters>;
    getChapter: (id: number, language?: string) => Promise<Chapter>;
    getChapterInfo: (chapter_id: number, language?: string) => Promise<ChapterInfo>;
}

// ---------------------------------------------------------------------------
// Juz
// ---------------------------------------------------------------------------

/** Response envelope for the list-of-juzs endpoint. */
export interface JuzResponse {
    juzs: any[];
}

/** Public contract of the `juz` API module. */
export interface JuzApi {
    getAllJuzs: () => Promise<JuzResponse>;
}

// ---------------------------------------------------------------------------
// Resources — recitations, translations, tafsirs, languages, media
// ---------------------------------------------------------------------------

/** Wrapper for recitation metadata. */
export interface RecitaionInfo {
    info: Info;
}

/** Generic `{ id, info }` payload used by several resource endpoints. */
export interface Info {
    id: number;
    info: any;
}

/** Wrapper for translation metadata. */
export interface TranslationInfo {
    info: Info;
}

/** Generic root for translation collections. */
export interface Root {
    translations: Translation[];
}

/**
 * A translation resource.
 *
 * NOTE: This interface is declared a second time below. Both declarations are
 * merged by TypeScript and the merged shape is part of the public API.
 */
export interface Translation {
    id: number;
    name: string;
    author_name: string;
    slug: string;
    language_name: string;
    translated_name: TranslatedName;
}

/** Response envelope for a list of translations. */
export interface TranslationResponse {
    translations: Translation[];
}

/** Response envelope for a list of tafsirs. */
export interface TafsirsResponse {
    tafsirs: Translation[];
}

/** Response payload for a single tafsir's info endpoint. */
export interface TafsirInfoResponse {
    id: number;
    info: string | null;
}

/** Catalogue of available recitation styles. */
export interface RecitationStyle {
    mujawwad: string;
    murattal: string;
    muallim: string;
}

/** Wrapper for the recitation-styles endpoint. */
export interface RecitationStyleResponse {
    recitation_styles: RecitationStyle[];
}

/** A supported language returned by the resources/languages endpoint. */
export interface Languages {
    id: number;
    name: string;
    iso_code: string;
    native_name: string;
    direction: string;
    translations_count: number;
    translated_name: TranslatedName;
}

/**
 * Wrapper for the supported-languages endpoint.
 *
 * NOTE: The `languagess` typo (two s's) matches the upstream Quran API
 * response and must not be corrected here — doing so would break consumers
 * that already destructure the field.
 */
export interface LanguageResponse {
    languagess: Languages[];
}

/** A name translated to a specific language. */
export interface TranslatedName {
    name: string;
    language_name: string;
}

/** Wrapper for the chapter-infos endpoint. */
export interface ChapterInfos {
    chapter_infos: Translation[];
}

/** A media entry (e.g. video) associated with a verse. */
export interface VerseMedia {
    id: number;
    name: string;
    author_name: string;
    slug: string;
    language_name: string;
    translated_name: TranslatedName;
}

/** Wrapper for the verse-media endpoint. */
export interface VerseMediaResponse {
    verse_media: VerseMedia[];
}

/** Public contract of the `resources` API module. */
export interface ResourceApi {
    getRecitationInfo: (recitation_id: string) => Promise<RecitaionInfo>;
    getTranslationInfo: (translation_id: string) => Promise<TranslationInfo>;
    getTranslations: (language?: string) => Promise<TranslationResponse>;
    getTafsirs: (language?: string) => Promise<TafsirsResponse>;
    getTafsirInfo: (tafsir_id: string) => Promise<TafsirInfoResponse>;
    getRecitationStyles: () => Promise<RecitationStyleResponse>;
    getLanguages: () => Promise<LanguageResponse>;
    getChapterInfos: () => Promise<ChapterInfos>;
    getVerseMedias: () => Promise<VerseMediaResponse>;
}

// ---------------------------------------------------------------------------
// Verse
// ---------------------------------------------------------------------------

/** Standard verses-list response envelope. */
export interface VerseResponse {
    verses: Verse[];
    pagination: Pagination;
}

/** A single Quran verse with optional embedded translations/tafsirs/words. */
export interface Verse {
    id: number;
    verse_number: number;
    page_number: number;
    verse_key: string;
    juz_number: number;
    hizb_number: number;
    rub_el_hizb_number: number;
    sajdah_type: any;
    sajdah_number: any;
    words: Word[];
    translations: Translation2[];
    tafsirs: Tafsir[];
}

/** A single word within a verse. */
export interface Word {
    id: number;
    position: number;
    audio_url: string;
    char_type_name: string;
    line_number: number;
    page_number: number;
    code_v1: string;
    translation: Translation;
    transliteration: Transliteration;
}

/**
 * Word-level translation payload.
 *
 * NOTE: This is the second declaration of `Translation` in this file; see the
 * note on the first declaration. The two are merged by TypeScript.
 */
export interface Translation {
    text: string;
    language_name: string;
}

/** Word-level transliteration payload. */
export interface Transliteration {
    text: string;
    language_name: string;
}

/** Verse-level translation reference. */
export interface Translation2 {
    resource_id: number;
    text: string;
}

/** Verse-level tafsir reference. */
export interface Tafsir {
    id: number;
    language_name: string;
    name: string;
    text: string;
}

/** Generic pagination envelope returned by the verse endpoints. */
export interface Pagination {
    per_page: number;
    current_page: number;
    next_page: number;
    total_pages: number;
    total_records: number;
}

/** Optional filters accepted by the verses endpoints. */
export interface VerseQuery {
    language?: string;
    words?: string;
    translations?: string;
    audio?: string;
    tafsirs?: string;
    word_fields?: string;
    translation_fields?: string;
    fields?: string;
    page?: string;
    per_page?: string;
}

/** Public contract of the `verse` API module. */
export interface VerseApi {
    getVerseByChapter: (chapter_number: string, query?: VerseQuery) => Promise<VerseResponse>;
    getVerseByPage: (page_number: string, query?: VerseQuery) => Promise<VerseResponse>;
    getVerseByJuz: (juz_number: string, query?: VerseQuery) => Promise<VerseResponse>;
    getVerseByHizbNumber: (hizb_number: string, query?: VerseQuery) => Promise<VerseResponse>;
    getVerseByRubElHizbNumber: (rub_el_hizb_number: string, query?: VerseQuery) => Promise<VerseResponse>;
    getSpecificVerseByVerseKey: (verse_key: string, query?: VerseQuery) => Promise<VerseResponse>;
    getRandomAyah: (query?: VerseQuery) => Promise<VerseResponse>;
}

// ---------------------------------------------------------------------------
// Quran scripts (Uthmani, Indo-Pak, Imlaei, glyph codes)
// ---------------------------------------------------------------------------

/** Common filter set accepted by the `/quran/verses/*` endpoints. */
export interface QuranQuery {
    chapter_number?: string;
    juz_number?: string;
    page_number?: string;
    hizb_number?: string;
    rub_el_hizb_number?: string;
    verse_key?: string;
}

/** Indo-Pak script response. */
export interface QuranResponse {
    verses: IndoPakVerse[];
}

/** A verse expressed in Indo-Pak script. */
export interface IndoPakVerse {
    id: number;
    verse_key: string;
    text_indopak: string;
}

/** Uthmani Tajweed script response. */
export interface UthmaniTajweedResponse {
    verses: UthManiVerse[];
}

/** A verse expressed in Uthmani Tajweed script. */
export interface UthManiVerse {
    id: number;
    verse_key: string;
    text_uthmani_tajweed: string;
}

/** Uthmani script response. */
export interface UthmaniScriptResponse {
    verses: UthmaniScript[];
}

/** A verse expressed in plain Uthmani script. */
export interface UthmaniScript {
    id: number;
    verse_key: string;
    text_uthmani: string;
}

/** Uthmani Simple script response. */
export interface UthmaniSimpleScriptResponse {
    verses: UthmaniSimpleScript[];
}

/** A verse expressed in Uthmani Simple script. */
export interface UthmaniSimpleScript {
    id: number;
    verse_key: string;
    text_uthmani_simple: string;
}

/** Imlaei Simple text response. */
export interface ImlaeiSimpleTextResponse {
    verses: ImlaeiSimpleText[];
}

/** A verse expressed in Imlaei Simple text. */
export interface ImlaeiSimpleText {
    id: number;
    verse_key: string;
    text_imlaei: string;
}

/** Optional filters accepted by the single-translation / single-tafsir endpoints. */
export interface TranslationQuery {
    fields?: string;
    chapter_number?: string;
    juz_number?: string;
    page_number?: string;
    hizb_number?: string;
    rub_el_hizb_number?: string;
    verse_key?: string;
}

/** Single-translation endpoint response. */
export interface SingleTranslationResponse {
    translations: Translation[];
    meta: TranslationMeta;
}

/** Per-verse translation snippet. */
export interface VerseTranslation {
    resource_id: number;
    text: string;
}

/** Metadata describing a single translation resource. */
export interface TranslationMeta {
    translation_name: string;
    author_name: string;
}

/** Single-tafsir endpoint response. */
export interface SingleTafsirResponse {
    tafsirs: Tafsir[];
    meta: TafsirMeta;
}

/** Per-verse tafsir snippet. */
export interface SingleTafsir {
    resource_id: number;
    text: string;
}

/** Metadata describing a single tafsir resource. */
export interface TafsirMeta {
    tafsir_name: string;
    author_name: string;
}

/** Glyph-codes v1 response. */
export interface GlyphCodesOfAyahV1Response {
    verses: GlyphCodesOfAyahV1[];
}

/** A verse rendered with v1 glyph codes (for KFGQPC Uthmanic Hafs v1 font). */
export interface GlyphCodesOfAyahV1 {
    id: number;
    verse_key: string;
    code_v1: string;
    v1_page: number;
}

/** Glyph-codes v2 response. */
export interface GlyphCodesOfAyahV2Response {
    verses: GlyphCodesOfAyahV2[];
}

/** A verse rendered with v2 glyph codes (for KFGQPC Uthmanic Hafs v2 font). */
export interface GlyphCodesOfAyahV2 {
    id: number;
    verse_key: string;
    code_v2: string;
    v2_page: number;
}

/** Public contract of the `quran` API module. */
export interface QuranApi {
    getIndoPakScriptOfAyah: (query?: QuranQuery) => Promise<QuranResponse>;
    getUthmaniTajweedScriptOfAyah: (query?: QuranQuery) => Promise<UthmaniTajweedResponse>;
    getUthmaniScriptOfAyah: (query?: QuranQuery) => Promise<UthmaniScriptResponse>;
    getUthmaniSimpleScriptOfAyah: (query?: QuranQuery) => Promise<UthmaniSimpleScriptResponse>;
    getImlaeiSimpleTextOfAyah: (query?: QuranQuery) => Promise<ImlaeiSimpleTextResponse>;
    getASingleTranslation: (translation_id: string, query?: TranslationQuery) => Promise<SingleTranslationResponse>;
    getSingleTafsir: (tafsir_id: string, query?: TranslationQuery) => Promise<SingleTafsirResponse>;
    getGlyphCodesOfAyahV1: (query?: QuranQuery) => Promise<GlyphCodesOfAyahV1Response>;
    getGlyphCodesOfAyahV2: (query?: QuranQuery) => Promise<GlyphCodesOfAyahV2Response>;
}
