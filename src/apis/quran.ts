import {
  GlyphCodesOfAyahV1Response,
  GlyphCodesOfAyahV2Response,
  ImlaeiSimpleTextResponse,
  QuranApi,
  QuranQuery, QuranResponse,
  SingleTafsirResponse,
  SingleTranslationResponse,
  TranslationQuery,
  UthmaniScriptResponse,
  UthmaniSimpleScriptResponse,
  UthmaniTajweedResponse
} from "../interfaces";
import { apiWraper } from "../utils";

export const quran: QuranApi = {

  /**
   * Retrieves the Indo-Pak script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Indo-Pak script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-indopak}
   */
  async getIndoPakScriptOfAyah(query?: QuranQuery): Promise<QuranResponse> {
    const uri = query ? `/quran/verses/code_v1?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v1';
    return apiWraper<QuranResponse>(uri);
  },

  /**
   * Retrieves the Uthmani Tajweed script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Uthmani Tajweed script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani-tajweed}
   */
  async getUthmaniTajweedScriptOfAyah(query?: QuranQuery): Promise<UthmaniTajweedResponse> {
    const uri = query ? `/quran/verses/uthmani_tajweed?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani_tajweed';
    return await apiWraper<UthmaniTajweedResponse>(uri);
  },


  /**
   * Retrieves the Uthmani script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Uthmani script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani}
   */
  async getUthmaniScriptOfAyah(query?: QuranQuery): Promise<UthmaniScriptResponse> {
    const uri = query ? `/quran/verses/uthmani?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani';
    return await apiWraper<UthmaniScriptResponse>(uri);
  },

  /**
   * Retrieves the Uthmani simple script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Uthmani simple script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani-simple}
   */
  async getUthmaniSimpleScriptOfAyah(query?: QuranQuery): Promise<UthmaniSimpleScriptResponse> {
    const uri = query ? `/quran/verses/uthmani_simple?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani_simple';
    return await apiWraper<UthmaniSimpleScriptResponse>(uri);
  },

  /**
   * Retrieves the Imlaei simple text of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Imlaei simple text response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-imlaei}
   */
  async getImlaeiSimpleTextOfAyah(query?: QuranQuery): Promise<ImlaeiSimpleTextResponse> {
    const uri = query ? `/quran/verses/imlaei?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/imlaei';
    return await apiWraper<ImlaeiSimpleTextResponse>(uri);
  },

  /**
   * Retrieves a single translation of a verse.
   *
   * @param translation_id - The ID of the translation to retrieve.
   * @param query - Optional query parameters to filter the translation.
   * @returns A promise that resolves to the single translation response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/translation}
   */
  async getASingleTranslation(translation_id: string, query?: TranslationQuery): Promise<SingleTranslationResponse> {
    const uri = query ? `/quran/translations/${translation_id}?${new URLSearchParams(query as URLSearchParams)}` : `/quran/translations/${translation_id}`;
    return await apiWraper<SingleTranslationResponse>(uri);
  },

  /**
   * Retrieves a single tafsir of a verse.
   *
   * @param tafsir_id - The ID of the tafsir to retrieve.
   * @param query - Optional query parameters to filter the tafsir.
   * @returns A promise that resolves to the single tafsir response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/tafsir}
   */
  async getSingleTafsir(tafsir_id: string, query?: TranslationQuery): Promise<SingleTafsirResponse> {
    const uri = query ? `/quran/tafsirs/${tafsir_id}?${new URLSearchParams(query as URLSearchParams)}` : `/quran/tafsirs/${tafsir_id}`;
    return await apiWraper<SingleTafsirResponse>(uri);
  },

  /**
   * Retrieves a single tafsir of a verse.
   *
   * @param tafsir_id - The ID of the tafsir to retrieve.
   * @param query - Optional query parameters to filter the tafsir.
   * @returns A promise that resolves to the single tafsir response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-code-v-1}
   */
  async getGlyphCodesOfAyahV1(query?: QuranQuery): Promise<GlyphCodesOfAyahV1Response> {
    const uri = query ? `/quran/verses/code_v1?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v1';
    return await apiWraper<GlyphCodesOfAyahV1Response>(uri);
  },

  /**
   * Retrieves the glyph codes (version 2) of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the glyph codes response (version 2) or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-code-v-2}
   */
  async getGlyphCodesOfAyahV2(query?: QuranQuery): Promise<GlyphCodesOfAyahV2Response> {
    const uri = query ? `/quran/verses/code_v2?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v2';
    return await apiWraper<GlyphCodesOfAyahV2Response>(uri)
  },
};
