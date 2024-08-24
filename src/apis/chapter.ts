import { AxiosError } from "axios";
import Api from "../req";
import { ChapterApi, ListChapters, Chapter, ChapterInfo, ALLOWED_LANGUAGES } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();


export const chapter: ChapterApi = {

    /**
     * Retrieves a list of all chapters in the Quran.
     *
     * @param language - The language code for the chapter names. Defaults to 'en'.
     * @returns A promise that resolves to the list of chapters or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-chapters}
     */
    listChapters(language = 'en'): Promise<ListChapters | Error | AxiosError> {
        const isLanguageSupported = language && ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/chapters?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves information about a specific chapter.
     *
     * @param id - The ID of the chapter to retrieve.
     * @param language - The language code for the chapter information. Defaults to 'en'.
     * @returns A promise that resolves to the chapter details or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/get-chapter}
     */
    getChapter(id: number, language = 'en'): Promise<Chapter | Error | AxiosError> {
        if (language && !ALLOWED_LANGUAGES.has(language)) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/chapters/${id}?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },

    /**
     * Retrieves detailed information about a specific chapter.
     *
     * @param chapter_id - The ID of the chapter to retrieve information for.
     * @param language - The language code for the chapter information. Defaults to 'en'.
     * @returns A promise that resolves to the chapter information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/info}
     */
    getChapterInfo(chapter_id: number, language = 'en'): Promise<ChapterInfo | Error | AxiosError> {
        if (language && !ALLOWED_LANGUAGES.has(language)) return Promise.reject(new Error("Provided language is not supported"));
        return new Promise((resolve, reject) => {
            api.get(`/chapters/${chapter_id}/info?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    }
};

