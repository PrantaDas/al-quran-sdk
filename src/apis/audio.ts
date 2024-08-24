import { AxiosError } from "axios";
import url from "url";
import Api from "../req";
import {
    AudioApi, AudioQueryParams,
    IAudio, IListOfAllAudioOfAReciter, IRecitation,
    ISingleRecitation, IReciters, IAyahRecitationSpecificSurah, IAyahRecitationSpecificJuz,
    IAyahRecitationSpecificMadaniMushafPage, IAyahRecitationSpecificRubelHizb,
    IAyahRecitationSpecificHizb, IAyahRecitationSpecificAyah, ALLOWED_LANGUAGES
} from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();


export const audio: AudioApi = {

    /**
    * Retrieves audio recordings of a specific chapter by a particular reciter.
    *
    * @param id - The ID of the reciter.
    * @param chapter_number - The number of the chapter.
    * @returns A promise that resolves to the audio recordings or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciter-audio-file}
    */
    getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio | Error | AxiosError> {
        if (!id || !chapter_number)
            return Promise.reject(new Error('Reciter\'s ID and Chapter number is required'));

        return new Promise((resolve, reject) => {
            api.get(`/chapter_recitations/${id}/${chapter_number}`,)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves all audio recordings for a specific reciter.
     *
     * @param id - The ID of the reciter.
     * @returns A promise that resolves to the list of audio recordings or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciter-audio-files}
     */
    getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter | Error | AxiosError> {
        if (!id)
            return Promise.reject(new Error('Reciter\'s ID is required'));

        return new Promise((resolve, reject) => {
            api.get(`/chapter_recitations/${id}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves a list of recitations available in the specified language.
     *
     * @param language - The language code. Defaults to 'en'.
     * @returns A promise that resolves to the list of recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitations}
     */
    getRecitations(language: string = 'en'): Promise<IRecitation | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/languages?${new url.URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
     * Retrieves all audio files for a specific recitation, optionally filtered by query parameters.
     *
     * @param recitation_id - The ID of the recitation.
     * @param query - Optional query parameters to filter the audio files.
     * @returns A promise that resolves to the list of audio files or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitation-autio-files}
     */
    getAllAudioFilesofARecitation(recitation_id: number, query?: AudioQueryParams): Promise<ISingleRecitation | Error | AxiosError> {
        if (!recitation_id) return Promise.reject(new Error('recitation_id is required'));
        let uri = `/quran/recitations/${recitation_id}`;
        if (query && Object.values(query).length > 0)
            uri = `${uri}?${new URLSearchParams(query as URLSearchParams)}`;
        return new Promise((resolve, reject) => {
            api.get(uri)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },



    /**
     * Retrieves a list of chapter reciters available in the specified language.
     *
     * @param language - The language code. Defaults to 'en'.
     * @returns A promise that resolves to the list of chapter reciters or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciters}
     */
    getListOfChapterReciters(language: string = 'en'): Promise<IReciters | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/chapter_reciters?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
    * Retrieves audio recitations for a specific chapter by a particular reciter.
    *
    * @param recitation_id - The ID of the reciter.
    * @param chapter_number - The number of the chapter.
    * @returns A promise that resolves to the audio recitations or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-surah-recitation}
    */
    getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<IAyahRecitationSpecificSurah | Error | AxiosError> {
        if (!recitation_id || !chapter_number)
            return Promise.reject(new Error('recitation_id and Chapter number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_chapter/${chapter_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
     * Retrieves audio recitations for a specific Juz by a particular reciter.
     *
     * @param recitation_id - The ID of the reciter.
     * @param juz_number - The number of the Juz.
     * @returns A promise that resolves to the audio recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-juz-recitaiton}
     */
    getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<IAyahRecitationSpecificJuz | Error | AxiosError> {
        if (!recitation_id || !juz_number)
            return Promise.reject(new Error('recitation_id and juz_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_juz/${juz_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
    * Retrieves audio recitations for a specific Madani Mushaf page by a particular reciter.
    *
    * @param recitation_id - The ID of the reciter.
    * @param page_number - The number of the Madani Mushaf page.
    * @returns A promise that resolves to the audio recitations or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-page-recitaiton}
    */
    getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<IAyahRecitationSpecificMadaniMushafPage | Error | AxiosError> {
        if (!recitation_id || !page_number)
            return Promise.reject(new Error('recitation_id and Page number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_page/${page_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
     * Retrieves audio recitations for a specific Rub El Hizb by a particular reciter.
     *
     * @param recitation_id - The ID of the reciter.
     * @param rub_el_hizb_number - The number of the Rub El Hizb.
     * @returns A promise that resolves to the audio recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-rub-el-hizb-recitaiton}
     */
    getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<IAyahRecitationSpecificRubelHizb | Error | AxiosError> {
        if (!recitation_id || !rub_el_hizb_number)
            return Promise.reject(new Error('recitation_id and rub_el_hizb_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_rub/${rub_el_hizb_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
    * Retrieves audio recitations for a specific Hizb by a particular reciter.
    *
    * @param recitation_id - The ID of the reciter.
    * @param hizb_number - The number of the Hizb.
    * @returns A promise that resolves to the audio recitations or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-hizb-recitaiton}
    */
    getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<IAyahRecitationSpecificHizb | Error | AxiosError> {
        if (!recitation_id || !hizb_number)
            return Promise.reject(new Error('recitation_id and hizb_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_hizb/${hizb_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    /**
     * Retrieves audio recitations for a specific Ayah by a particular reciter.
     *
     * @param recitation_id - The ID of the reciter.
     * @param ayah_key - The key of the Ayah.
     * @returns A promise that resolves to the audio recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-ayah-recitaiton}
     */
    getAyahRecitationForSpecificAyah(recitation_id: number, ayah_key: string): Promise<IAyahRecitationSpecificAyah | Error | AxiosError> {
        if (!recitation_id || !ayah_key)
            return Promise.reject(new Error('recitation_id and ayah_key is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_ayah/${ayah_key}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    }

};

