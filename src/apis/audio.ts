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

    getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio | Error | AxiosError> {
        if (!id || !chapter_number)
            return Promise.reject(new Error('Reciter\'s ID and Chapter number is required'));

        return new Promise((resolve, reject) => {
            api.get(`/chapter_recitations/${id}/${chapter_number}`,)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter | Error | AxiosError> {
        if (!id)
            return Promise.reject(new Error('Reciter\'s ID is required'));

        return new Promise((resolve, reject) => {
            api.get(`/chapter_recitations/${id}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },


    getRecitations(language: string = 'en'): Promise<IRecitation | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/languages?${new url.URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

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


    getListOfChapterReciters(language: string = 'en'): Promise<IReciters | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/chapter_reciters?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<IAyahRecitationSpecificSurah | Error | AxiosError> {
        if (!recitation_id || !chapter_number)
            return Promise.reject(new Error('recitation_id and Chapter number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_chapter/${chapter_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<IAyahRecitationSpecificJuz | Error | AxiosError> {
        if (!recitation_id || !juz_number)
            return Promise.reject(new Error('recitation_id and juz_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_juz/${juz_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<IAyahRecitationSpecificMadaniMushafPage | Error | AxiosError> {
        if (!recitation_id || !page_number)
            return Promise.reject(new Error('recitation_id and Page number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_page/${page_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<IAyahRecitationSpecificRubelHizb | Error | AxiosError> {
        if (!recitation_id || !rub_el_hizb_number)
            return Promise.reject(new Error('recitation_id and rub_el_hizb_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_rub/${rub_el_hizb_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<IAyahRecitationSpecificHizb | Error | AxiosError> {
        if (!recitation_id || !hizb_number)
            return Promise.reject(new Error('recitation_id and hizb_number is required'));
        return new Promise((resolve, reject) => {
            api.get(`/recitations/${recitation_id}/by_hizb/${hizb_number}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

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

