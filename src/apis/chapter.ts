import { LanguageValidationError } from "../errors";
import { ALLOWED_LANGUAGES, Chapter, ChapterApi, ChapterInfo, ListChapters } from "../interfaces";
import { apiWraper } from "../utils";


export const chapter: ChapterApi = {

    /**
     * Retrieves a list of all chapters in the Quran.
     *
     * @param language - The language code for the chapter names. Defaults to 'en'.
     * @returns A promise that resolves to the list of chapters or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-chapters}
     */
    async listChapters(language = 'en'): Promise<ListChapters> {
        const isLanguageSupported = language && ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) throw new LanguageValidationError("Provided language is not supported");
        return await apiWraper<ListChapters>(`/chapters?${new URLSearchParams({ language })}`);
    },

    /**
     * Retrieves information about a specific chapter.
     *
     * @param id - The ID of the chapter to retrieve.
     * @param language - The language code for the chapter information. Defaults to 'en'.
     * @returns A promise that resolves to the chapter details or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/get-chapter}
     */
    async getChapter(id: number, language = 'en'): Promise<Chapter> {
        if (language && !ALLOWED_LANGUAGES.has(language)) throw new LanguageValidationError("Provided language is not supported");
        return await apiWraper<Chapter>(`/chapters/${id}?${new URLSearchParams({ language })}`);
    },

    /**
     * Retrieves detailed information about a specific chapter.
     *
     * @param chapter_id - The ID of the chapter to retrieve information for.
     * @param language - The language code for the chapter information. Defaults to 'en'.
     * @returns A promise that resolves to the chapter information or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/info}
     */
    async getChapterInfo(chapter_id: number, language = 'en'): Promise<ChapterInfo> {
        if (language && !ALLOWED_LANGUAGES.has(language)) throw new LanguageValidationError("Provided language is not supported");
        return await apiWraper<ChapterInfo>(`/chapters/${chapter_id}/info?${new URLSearchParams({ language })}`);
    }
};

