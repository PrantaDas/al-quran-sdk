import { AxiosError, AxiosResponse } from "axios";
import url from "url";
import Api from "../api";
import { AudioQueryParams } from "../types";

const api = Api();

const ALLOWED_LANGUAGES = new Set(['en', 'ur', 'bn', 'tr', 'es', 'fr', 'bs', 'ru', 'ml', 'id', 'uz', 'nl', 'de', 'tg', 'ta', 'ja', 'it', 'vi', 'zh', 'sq', 'fa', 'bg', 'bm', 'ha', 'pt', 'ro', 'hi', 'sw', 'kk', 'th', 'tl', 'km', 'as', 'ko', 'so', 'az', 'ku', 'dv', 'ms', 'prs', 'zgh', 'am', 'ce', 'cs', 'fi', 'gu', 'he', 'ka', 'kn', 'ks', 'lg', 'mk', 'mr', 'mrn', 'ne', 'no', 'om', 'pl', 'ps', 'rw', 'sd', 'se', 'si', 'sr', 'sv', 'te', 'tt', 'ug', 'uk', 'sq', 'yo']);

const audio = {

    getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<AxiosResponse | Error | AxiosError> {
        if (!id || !chapter_number)
            return Promise.reject(new Error('Reciter\'s ID and Chapter number is required'));

        return new Promise((resolve, reject) => {
            api.get(`/chapter_recitations/${id}/${chapter_number}`,)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAllChaptersAudioOfAReciter(id: number): Promise<AxiosResponse | Error | AxiosError> {
        if (!id)
            return Promise.reject(new Error('Reciter\'s ID is required'));

        return new Promise((resolve, reject) => {
            api.get(`/chapter_recitations/${id}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },


    getRecitations(language: string = 'en'): Promise<AxiosResponse | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/languages?${new url.URLSearchParams({ language })}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAllAudioFilesofARecitation(recitation_id: number, query?: AudioQueryParams): Promise<AxiosResponse | Error | AxiosError> {
        if (!recitation_id) return Promise.reject(new Error('recitation_id is required'));
        let uri = `/quran/recitations/${recitation_id}`;
        if (query && Object.values(query).length > 0)
            uri = `${uri}?${new URLSearchParams(query as URLSearchParams)}`;
        return new Promise((resolve, reject) => {
            api.get(uri)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },


    getListOfChapterReciters(language: string = 'en'): Promise<AxiosResponse | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/chapter_reciters?${new URLSearchParams({ language })}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<AxiosResponse | Error | AxiosError> {
        if (!recitation_id || !chapter_number)
            return Promise.reject(new Error('recitation_id and Chapter number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_chapter/${chapter_number}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<AxiosResponse | Error | AxiosError> {
        if (!recitation_id || !juz_number)
            return Promise.reject(new Error('recitation_id and juz_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_juz/${juz_number}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<AxiosResponse | Error | AxiosError> {
        if (!recitation_id || !page_number)
            return Promise.reject(new Error('recitation_id and Page number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_page/${page_number}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<AxiosResponse | Error | AxiosError> {
        if (!recitation_id || !rub_el_hizb_number)
            return Promise.reject(new Error('recitation_id and rub_el_hizb_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_rub/${rub_el_hizb_number}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<AxiosResponse | Error | AxiosError> {
        if (!recitation_id || !hizb_number)
            return Promise.reject(new Error('recitation_id and hizb_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_hizb/${hizb_number}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    },

    getAyahRecitationForSpecificAyah(recitation_id: number, ayah_key: string): Promise<AxiosResponse | Error | AxiosError> {
        if (!recitation_id || !ayah_key)
            return Promise.reject(new Error('recitation_id and ayah_key is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_ayah/${ayah_key}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

};


export default audio;