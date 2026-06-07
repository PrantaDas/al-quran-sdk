import { LanguageValidationError } from "../errors";
import { ALLOWED_LANGUAGES, Chapter, ChapterApi, ChapterInfo, ListChapters } from "../interfaces";
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
 * Chapter (surah) API.
 *
 * Endpoints that read chapter-level metadata. The `language` parameter is
 * forwarded to the upstream API to control localised names and descriptions.
 */
export const chapter: ChapterApi = {
    /**
     * Lists all 114 chapters of the Quran.
     *
     * @param language Two-letter ISO language code for localised names. Defaults to `'en'`.
     * @returns The list of chapters.
     * @throws {LanguageValidationError} If `language` is not in {@link ALLOWED_LANGUAGES}.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/list-chapters
     */
    async listChapters(language: string = 'en'): Promise<ListChapters> {
        assertLanguage(language);
        return apiWraper<ListChapters>(buildUri('/chapters', { language }));
    },

    /**
     * Retrieves a single chapter by ID.
     *
     * @param id       Chapter ID, 1–114.
     * @param language Two-letter ISO language code for localised names. Defaults to `'en'`.
     * @returns The chapter metadata.
     * @throws {LanguageValidationError} If `language` is not in {@link ALLOWED_LANGUAGES}.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/get-chapter
     */
    async getChapter(id: number, language: string = 'en'): Promise<Chapter> {
        assertLanguage(language);
        return apiWraper<Chapter>(buildUri(`/chapters/${id}`, { language }));
    },

    /**
     * Retrieves long-form descriptive information about a chapter.
     *
     * @param chapter_id Chapter ID, 1–114.
     * @param language   Two-letter ISO language code. Defaults to `'en'`.
     * @returns The chapter info payload.
     * @throws {LanguageValidationError} If `language` is not in {@link ALLOWED_LANGUAGES}.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/info
     */
    async getChapterInfo(chapter_id: number, language: string = 'en'): Promise<ChapterInfo> {
        assertLanguage(language);
        return apiWraper<ChapterInfo>(buildUri(`/chapters/${chapter_id}/info`, { language }));
    },
};
