import { LanguageValidationError, ResourceError } from "../errors";
import {
    ALLOWED_LANGUAGES,
    ChapterInfos,
    LanguageResponse,
    RecitaionInfo,
    RecitationStyleResponse,
    ResourceApi,
    TafsirInfoResponse,
    TafsirsResponse,
    TranslationInfo,
    TranslationResponse,
    VerseMediaResponse,
} from "../interfaces";
import { apiWraper, buildUri } from "../utils";

/**
 * Asserts that a language code is in {@link ALLOWED_LANGUAGES}.
 *
 * @throws {LanguageValidationError} If `language` is not in the whitelist.
 */
const assertLanguage = (language: string): void => {
    if (!ALLOWED_LANGUAGES.has(language)) {
        throw new LanguageValidationError("Provided language is not supported");
    }
};

/**
 * Resources API.
 *
 * Exposes metadata catalogues — recitations, translations, tafsirs,
 * recitation styles, languages, chapter infos and verse media — that the
 * other APIs reference by ID.
 */
export const resources: ResourceApi = {
    /**
     * Retrieves descriptive info about a recitation resource.
     *
     * @param recitation_id Recitation resource ID.
     * @throws {ResourceError} If `recitation_id` is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/recitation-info
     */
    async getRecitationInfo(recitation_id: string): Promise<RecitaionInfo> {
        if (!recitation_id) throw new ResourceError('Recitation ID is required');
        return apiWraper<RecitaionInfo>(`/resources/recitations/${recitation_id}/info`);
    },

    /**
     * Retrieves descriptive info about a translation resource.
     *
     * @param translation_id Translation resource ID.
     * @throws {ResourceError} If `translation_id` is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/translation-info
     */
    async getTranslationInfo(translation_id: string): Promise<TranslationInfo> {
        if (!translation_id) throw new ResourceError('Translation ID is required');
        return apiWraper<TranslationInfo>(`/resources/translations/${translation_id}/info`);
    },

    /**
     * Lists translations available in the given language.
     *
     * @param language Two-letter ISO language code. Defaults to `'en'`.
     * @throws {LanguageValidationError} If `language` is not in {@link ALLOWED_LANGUAGES}.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/translations
     */
    async getTranslations(language: string = 'en'): Promise<TranslationResponse> {
        assertLanguage(language);
        return apiWraper<TranslationResponse>(buildUri('/resources/translations', { language }));
    },

    /**
     * Lists tafsirs available in the given language.
     *
     * @param language Two-letter ISO language code. Defaults to `'en'`.
     * @throws {LanguageValidationError} If `language` is not in {@link ALLOWED_LANGUAGES}.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/tafsirs
     */
    async getTafsirs(language: string = 'en'): Promise<TafsirsResponse> {
        assertLanguage(language);
        return apiWraper<TafsirsResponse>(buildUri('/resources/tafsirs', { language }));
    },

    /**
     * Retrieves descriptive info about a tafsir resource.
     *
     * @param tafsir_id Tafsir resource ID.
     * @throws {ResourceError} If `tafsir_id` is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/tafsir-info
     */
    async getTafsirInfo(tafsir_id: string): Promise<TafsirInfoResponse> {
        if (!tafsir_id) throw new ResourceError('Tafsir ID is required');
        return apiWraper<TafsirInfoResponse>(`/resources/tafsirs/${tafsir_id}/info`);
    },

    /**
     * Lists the available recitation styles (mujawwad, murattal, muallim).
     *
     * @see https://api-docs.quran.com/docs/quran.com_versioned/recitation-styles
     */
    async getRecitationStyles(): Promise<RecitationStyleResponse> {
        return apiWraper<RecitationStyleResponse>('/resources/recitation_styles');
    },

    /**
     * Lists every language supported by the Quran API.
     *
     * @see https://api-docs.quran.com/docs/quran.com_versioned/languages
     */
    async getLanguages(): Promise<LanguageResponse> {
        return apiWraper<LanguageResponse>('/resources/languages');
    },

    /**
     * Retrieves the descriptive info entries for all chapters.
     *
     * @see https://api-docs.quran.com/docs/quran.com_versioned/chapter-info
     */
    async getChapterInfos(): Promise<ChapterInfos> {
        return apiWraper<ChapterInfos>('/resources/chapter_infos');
    },

    /**
     * Retrieves the catalogue of verse-related media (e.g. videos).
     *
     * @see https://api-docs.quran.com/docs/quran.com_versioned/verse-media
     */
    async getVerseMedias(): Promise<VerseMediaResponse> {
        return apiWraper<VerseMediaResponse>('/resources/verse_media');
    },
};
