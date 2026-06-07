import {
    GlyphCodesOfAyahV1Response,
    GlyphCodesOfAyahV2Response,
    ImlaeiSimpleTextResponse,
    QuranApi,
    QuranQuery,
    QuranResponse,
    SingleTafsirResponse,
    SingleTranslationResponse,
    TranslationQuery,
    UthmaniScriptResponse,
    UthmaniSimpleScriptResponse,
    UthmaniTajweedResponse,
} from "../interfaces";
import { apiWraper, buildUri } from "../utils";

/**
 * Quran scripts API.
 *
 * Exposes the `/quran/*` family of endpoints that render verse text in the
 * various scripts and glyph encodings supported by quran.com (Uthmani,
 * Uthmani Tajweed, Uthmani Simple, Indo-Pak, Imlaei, glyph codes v1/v2),
 * along with the single-translation and single-tafsir lookups.
 */
export const quran: QuranApi = {
    /**
     * Retrieves verses rendered in Indo-Pak script.
     *
     * @param query Optional verse filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-indopak
     */
    async getIndoPakScriptOfAyah(query?: QuranQuery): Promise<QuranResponse> {
        return apiWraper<QuranResponse>(buildUri('/quran/verses/code_v1', query));
    },

    /**
     * Retrieves verses rendered in Uthmani Tajweed script.
     *
     * @param query Optional verse filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani-tajweed
     */
    async getUthmaniTajweedScriptOfAyah(query?: QuranQuery): Promise<UthmaniTajweedResponse> {
        return apiWraper<UthmaniTajweedResponse>(buildUri('/quran/verses/uthmani_tajweed', query));
    },

    /**
     * Retrieves verses rendered in plain Uthmani script.
     *
     * @param query Optional verse filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani
     */
    async getUthmaniScriptOfAyah(query?: QuranQuery): Promise<UthmaniScriptResponse> {
        return apiWraper<UthmaniScriptResponse>(buildUri('/quran/verses/uthmani', query));
    },

    /**
     * Retrieves verses rendered in Uthmani Simple script.
     *
     * @param query Optional verse filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani-simple
     */
    async getUthmaniSimpleScriptOfAyah(query?: QuranQuery): Promise<UthmaniSimpleScriptResponse> {
        return apiWraper<UthmaniSimpleScriptResponse>(buildUri('/quran/verses/uthmani_simple', query));
    },

    /**
     * Retrieves verses rendered as Imlaei simple text.
     *
     * @param query Optional verse filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-imlaei
     */
    async getImlaeiSimpleTextOfAyah(query?: QuranQuery): Promise<ImlaeiSimpleTextResponse> {
        return apiWraper<ImlaeiSimpleTextResponse>(buildUri('/quran/verses/imlaei', query));
    },

    /**
     * Retrieves a single translation by ID, scoped by the optional query.
     *
     * @param translation_id Translation resource ID.
     * @param query          Optional filters (chapter, juz, verse_key, etc.).
     * @see https://api-docs.quran.com/docs/quran.com_versioned/translation
     */
    async getASingleTranslation(translation_id: string, query?: TranslationQuery): Promise<SingleTranslationResponse> {
        return apiWraper<SingleTranslationResponse>(buildUri(`/quran/translations/${translation_id}`, query));
    },

    /**
     * Retrieves a single tafsir by ID, scoped by the optional query.
     *
     * @param tafsir_id Tafsir resource ID.
     * @param query     Optional filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/tafsir
     */
    async getSingleTafsir(tafsir_id: string, query?: TranslationQuery): Promise<SingleTafsirResponse> {
        return apiWraper<SingleTafsirResponse>(buildUri(`/quran/tafsirs/${tafsir_id}`, query));
    },

    /**
     * Retrieves v1 glyph codes for the KFGQPC Uthmanic Hafs v1 font.
     *
     * @param query Optional verse filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-code-v-1
     */
    async getGlyphCodesOfAyahV1(query?: QuranQuery): Promise<GlyphCodesOfAyahV1Response> {
        return apiWraper<GlyphCodesOfAyahV1Response>(buildUri('/quran/verses/code_v1', query));
    },

    /**
     * Retrieves v2 glyph codes for the KFGQPC Uthmanic Hafs v2 font.
     *
     * @param query Optional verse filters.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-code-v-2
     */
    async getGlyphCodesOfAyahV2(query?: QuranQuery): Promise<GlyphCodesOfAyahV2Response> {
        return apiWraper<GlyphCodesOfAyahV2Response>(buildUri('/quran/verses/code_v2', query));
    },
};
