import { AxiosError } from "axios";
import Api from "../api";
import { ResourceApi, RecitaionInfo, TranslationInfo, TranslationResponse, TafsirsResponse, TafsirInfoResponse, RecitationStyleResponse, LanguageResponse, ChapterInfos, VerseMediaResponse, ALLOWED_LANGUAGES } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();


const resources: ResourceApi = {
    getRecitationInfo(recitation_id: string): Promise<RecitaionInfo | Error | AxiosError> {
        if (!recitation_id) return Promise.reject(new Error('Recitation ID is required'));
        return new Promise((resolve, reject) => {
            api.get(`/resources/recitations/${recitation_id}/info`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getTranslationInfo(translation_id: string): Promise<TranslationInfo | Error | AxiosError> {
        if (!translation_id) return Promise.reject(new Error('Translation ID is required'));
        return new Promise((resolve, reject) => {
            api.get(`/resources/translations/${translation_id}/info`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getTranslations(language: string = 'en'): Promise<TranslationResponse | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/translations?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getTafsirs(language: string = 'en'): Promise<TafsirsResponse | Error | AxiosError> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/resources/tafsirs?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getTafsirInfo(tafsir_id: string): Promise<TafsirInfoResponse | Error | AxiosError> {
        if (!tafsir_id) return Promise.reject(new Error('Tafsir ID is required'));
        return new Promise((resolve, reject) => {
            api.get(`/resources/tafsirs/${tafsir_id}/info`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getRecitationStyles(): Promise<RecitationStyleResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get('/resources/recitation_styles')
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getLanguages(): Promise<LanguageResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get('/resources/languages')
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getChapterInfos(): Promise<ChapterInfos | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get(`/resources/chapter_infos`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getVerseMedias(): Promise<VerseMediaResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get(`/resources/verse_media`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    }
};

export default resources;