import { LanguageValidationError } from "../errors";
import { ALLOWED_LANGUAGES, VerseApi, VerseQuery, VerseResponse } from "../interfaces";
import { apiWraper, buildUri } from "../utils";

/**
 * Guards the optional `language` query parameter against the whitelist.
 *
 * The check is a no-op when `query` is undefined or when it omits `language`,
 * which matches the original behaviour of accepting an entirely-optional
 * query object.
 *
 * @throws {LanguageValidationError} If `query.language` is present but not allowed.
 */
const assertQueryLanguage = (query?: VerseQuery): void => {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) {
        throw new LanguageValidationError('Provided query language is not allowed');
    }
};

/**
 * Verse API.
 *
 * Each method fetches a paginated list of verses scoped to a different
 * structural unit of the Quran (chapter, page, juz, hizb, rub el-hizb) and
 * also supports point-lookup by verse key or a random pick.
 */
export const verse: VerseApi = {
    /**
     * Retrieves verses from a specific chapter (surah).
     *
     * @param chapter_number Chapter number, 1–114.
     * @param query          Optional filters (language, translations, fields, etc.).
     * @returns Paginated verses for the chapter.
     * @throws {LanguageValidationError} If `query.language` is not allowed.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/verses-by-chapter-number
     */
    async getVerseByChapter(chapter_number: string, query?: VerseQuery): Promise<VerseResponse> {
        assertQueryLanguage(query);
        return apiWraper<VerseResponse>(buildUri(`/verses/by_chapter/${chapter_number}`, query));
    },

    /**
     * Retrieves verses on a specific Mushaf page.
     *
     * @param page_number Mushaf page number, 1–604.
     * @param query       Optional filters.
     * @returns Paginated verses for the page.
     * @throws {LanguageValidationError} If `query.language` is not allowed.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/verses-by-page-number
     */
    async getVerseByPage(page_number: string, query?: VerseQuery): Promise<VerseResponse> {
        assertQueryLanguage(query);
        return apiWraper<VerseResponse>(buildUri(`/verses/by_page/${page_number}`, query));
    },

    /**
     * Retrieves verses in a specific Juz.
     *
     * @param juz_number Juz number, 1–30.
     * @param query      Optional filters.
     * @returns Paginated verses for the juz.
     * @throws {LanguageValidationError} If `query.language` is not allowed.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/verses-by-juz-number
     */
    async getVerseByJuz(juz_number: string, query?: VerseQuery): Promise<VerseResponse> {
        assertQueryLanguage(query);
        return apiWraper<VerseResponse>(buildUri(`/verses/by_juz/${juz_number}`, query));
    },

    /**
     * Retrieves verses in a specific Hizb.
     *
     * @param hizb_number Hizb number, 1–60.
     * @param query       Optional filters.
     * @returns Paginated verses for the hizb.
     * @throws {LanguageValidationError} If `query.language` is not allowed.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/verses-by-hizb-number
     */
    async getVerseByHizbNumber(hizb_number: string, query?: VerseQuery): Promise<VerseResponse> {
        assertQueryLanguage(query);
        return apiWraper<VerseResponse>(buildUri(`/verses/by_hizb/${hizb_number}`, query));
    },

    /**
     * Retrieves verses in a specific Rub el-Hizb (quarter of a Hizb).
     *
     * @param rub_el_hizb_number Rub el-Hizb number, 1–240.
     * @param query              Optional filters.
     * @returns Paginated verses for the rub el-hizb.
     * @throws {LanguageValidationError} If `query.language` is not allowed.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/verses-by-rub-el-hizb-number
     */
    async getVerseByRubElHizbNumber(rub_el_hizb_number: string, query?: VerseQuery): Promise<VerseResponse> {
        assertQueryLanguage(query);
        return apiWraper<VerseResponse>(buildUri(`/verses/by_rub/${rub_el_hizb_number}`, query));
    },

    /**
     * Retrieves a single verse by its key.
     *
     * @param verse_key Verse key in `chapter:verse` form (e.g. `"2:255"`).
     * @param query     Optional filters.
     * @returns Response containing the requested verse.
     * @throws {LanguageValidationError} If `query.language` is not allowed.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/verses-by-verse-key
     */
    async getSpecificVerseByVerseKey(verse_key: string, query?: VerseQuery): Promise<VerseResponse> {
        assertQueryLanguage(query);
        return apiWraper<VerseResponse>(buildUri(`/verses/by_key/${verse_key}`, query));
    },

    /**
     * Retrieves a random verse from the Quran.
     *
     * @param query Optional filters.
     * @returns Response containing a single random verse.
     * @throws {LanguageValidationError} If `query.language` is not allowed.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/random-verse
     */
    async getRandomAyah(query?: VerseQuery): Promise<VerseResponse> {
        assertQueryLanguage(query);
        return apiWraper<VerseResponse>(buildUri('/verses/random', query));
    },
};
