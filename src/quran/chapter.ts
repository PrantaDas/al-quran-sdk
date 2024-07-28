import { AxiosError } from "axios";
import Api from "../api";
import { ChapterApi, ListChapters, Chapter, ChapterInfo } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();

const ALLOWED_LANGUAGES = new Set(['en', 'ur', 'bn', 'tr', 'es', 'fr', 'bs', 'ru', 'ml', 'id', 'uz', 'nl', 'de', 'tg', 'ta', 'ja', 'it', 'vi', 'zh', 'sq', 'fa', 'bg', 'bm', 'ha', 'pt', 'ro', 'hi', 'sw', 'kk', 'th', 'tl', 'km', 'as', 'ko', 'so', 'az', 'ku', 'dv', 'ms', 'prs', 'zgh', 'am', 'ce', 'cs', 'fi', 'gu', 'he', 'ka', 'kn', 'ks', 'lg', 'mk', 'mr', 'mrn', 'ne', 'no', 'om', 'pl', 'ps', 'rw', 'sd', 'se', 'si', 'sr', 'sv', 'te', 'tt', 'ug', 'uk', 'sq', 'yo']);


const chapter: ChapterApi = {
    listChapters(language = 'en'): Promise<ListChapters | Error | AxiosError> {
        const isLanguageSupported = language && ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/chapters?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getChapter(id: number, language = 'en'): Promise<Chapter | Error | AxiosError> {
        if (language && !ALLOWED_LANGUAGES.has(language)) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/chapters/${id}?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getChapterInfo(chapter_id: number, language = 'en'): Promise<ChapterInfo | Error | AxiosError> {
        if (language && !ALLOWED_LANGUAGES.has(language)) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/chapters/${chapter_id}/info?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    }
};

export default chapter;