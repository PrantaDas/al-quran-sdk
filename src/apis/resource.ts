import { AxiosError } from "axios";
import Api from "../req";
import {
    ResourceApi, RecitaionInfo,
    TranslationInfo, TranslationResponse, TafsirsResponse,
    TafsirInfoResponse, RecitationStyleResponse, LanguageResponse,
    ChapterInfos, VerseMediaResponse, ALLOWED_LANGUAGES
} from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();


export const resources: ResourceApi = {

    /**
     * Retrieves information about a specific recitation.
     *
     * @param recitation_id - The ID of the recitation to retrieve information for.
     * @returns A promise that resolves to the recitation information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitation-info}
     */
    getRecitationInfo(recitation_id: string): Promise<RecitaionInfo | Error | AxiosError> {
        if (!recitation_id) return Promise.reject(new Error('Recitation ID is required'));
        return new Promise((resolve, reject) => {
            api.get(`/resources/recitations/${recitation_id}/info`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves information about a specific translation.
     *
     * @param translation_id - The ID of the translation to retrieve information for.
     * @returns A promise that resolves to the translation information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/translation-info}
     */
    getTranslationInfo(translation_id: string): Promise<TranslationInfo | Error | AxiosError> {
        if (!translation_id) return Promise.reject(new Error('Translation ID is required'));
        return new Promise((resolve, reject) => {
            api.get(`/resources/translations/${translation_id}/info`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
    * Retrieves a list of translations available in a specific language.
    *
    * @param language - The language code for the translations to retrieve. Defaults to 'en'.
    * @returns A promise that resolves to the translation response or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/translations}
    */
    getTranslations(language: string = 'en'): Promise<TranslationResponse | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/translations?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves a list of tafsirs available in a specific language.
     *
     * @param language - The language code for the tafsirs to retrieve. Defaults to 'en'.
     * @returns A promise that resolves to the tafsirs response or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/tafsirs}
     */
    getTafsirs(language: string = 'en'): Promise<TafsirsResponse | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/tafsirs?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves information about a specific tafsir.
     *
     * @param tafsir_id - The ID of the tafsir to retrieve information for.
     * @returns A promise that resolves to the tafsir information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/tafsir-info}
     */
    getTafsirInfo(tafsir_id: string): Promise<TafsirInfoResponse | Error | AxiosError> {
        if (!tafsir_id) return Promise.reject(new Error('Tafsir ID is required'));
        return new Promise((resolve, reject) => {
            api.get(`/resources/tafsirs/${tafsir_id}/info`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
    * Retrieves a list of available recitation styles.
    *
    * @returns A promise that resolves to the recitation style response or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitation-styles}
    */
    getRecitationStyles(): Promise<RecitationStyleResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get('/resources/recitation_styles')
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
     * Retrieves a list of supported languages.
     *
     * @returns A promise that resolves to the language response or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/languages}
     */
    getLanguages(): Promise<LanguageResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get('/resources/languages')
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves information about all chapters in the Quran.
     *
     * @returns A promise that resolves to the chapter information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-info}
     */
    getChapterInfos(): Promise<ChapterInfos | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get(`/resources/chapter_infos`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves media related to verses in the Quran.
     *
     * @returns A promise that resolves to the verse media response or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verse-media}
     */
    getVerseMedias(): Promise<VerseMediaResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get(`/resources/verse_media`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    }
};
