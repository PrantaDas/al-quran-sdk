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
    TranslationInfo, TranslationResponse,
    VerseMediaResponse
} from "../interfaces";
import { apiWraper } from "../utils";


export const resources: ResourceApi = {

    /**
     * Retrieves information about a specific recitation.
     *
     * @param recitation_id - The ID of the recitation to retrieve information for.
     * @returns A promise that resolves to the recitation information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitation-info}
     */
    async getRecitationInfo(recitation_id: string): Promise<RecitaionInfo> {
        if (!recitation_id) throw new ResourceError('Recitation ID is required');
        return await apiWraper<RecitaionInfo>(`/resources/recitations/${recitation_id}/info`);
    },

    /**
     * Retrieves information about a specific translation.
     *
     * @param translation_id - The ID of the translation to retrieve information for.
     * @returns A promise that resolves to the translation information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/translation-info}
     */
    async getTranslationInfo(translation_id: string): Promise<TranslationInfo> {
        if (!translation_id) throw new ResourceError('Translation ID is required');
        return await apiWraper<TranslationInfo>(`/resources/translations/${translation_id}/info`);
    },

    /**
    * Retrieves a list of translations available in a specific language.
    *
    * @param language - The language code for the translations to retrieve. Defaults to 'en'.
    * @returns A promise that resolves to the translation response or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/translations}
    */
    async getTranslations(language: string = 'en'): Promise<TranslationResponse> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) throw new LanguageValidationError("Provided language is not supported");
        return await apiWraper<TranslationResponse>(`/resources/translations?${new URLSearchParams({ language })}`);
    },

    /**
     * Retrieves a list of tafsirs available in a specific language.
     *
     * @param language - The language code for the tafsirs to retrieve. Defaults to 'en'.
     * @returns A promise that resolves to the tafsirs response or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/tafsirs}
     */
    async getTafsirs(language: string = 'en'): Promise<TafsirsResponse> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) throw new LanguageValidationError("Provided language is not supported");
        return await apiWraper<TafsirsResponse>(`/resources/tafsirs?${new URLSearchParams({ language })}`);
    },

    /**
     * Retrieves information about a specific tafsir.
     *
     * @param tafsir_id - The ID of the tafsir to retrieve information for.
     * @returns A promise that resolves to the tafsir information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/tafsir-info}
     */
    async getTafsirInfo(tafsir_id: string): Promise<TafsirInfoResponse> {
        if (!tafsir_id) throw new ResourceError('Tafsir ID is required');
        return await apiWraper<TafsirInfoResponse>(`/resources/tafsirs/${tafsir_id}/info`);
    },

    /**
    * Retrieves a list of available recitation styles.
    *
    * @returns A promise that resolves to the recitation style response or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitation-styles}
    */
    async getRecitationStyles(): Promise<RecitationStyleResponse> {
        return await apiWraper<RecitationStyleResponse>('/resources/recitation_styles');
    },


    /**
     * Retrieves a list of supported languages.
     *
     * @returns A promise that resolves to the language response or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/languages}
     */
    async getLanguages(): Promise<LanguageResponse> {
        return await apiWraper<LanguageResponse>('/resources/languages');
    },

    /**
     * Retrieves information about all chapters in the Quran.
     *
     * @returns A promise that resolves to the chapter information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-info}
     */
    async getChapterInfos(): Promise<ChapterInfos> {
        return await apiWraper<ChapterInfos>(`/resources/chapter_infos`);
    },

    /**
     * Retrieves media related to verses in the Quran.
     *
     * @returns A promise that resolves to the verse media response or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verse-media}
     */
    async getVerseMedias(): Promise<VerseMediaResponse> {
        return apiWraper<VerseMediaResponse>(`/resources/verse_media`);
    }
};
