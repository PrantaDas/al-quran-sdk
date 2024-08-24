import { AxiosError } from "axios";
import Api from "../req";
import {
  QuranQuery, QuranResponse, UthmaniTajweedResponse,
  UthmaniScriptResponse,
  UthmaniSimpleScriptResponse, ImlaeiSimpleTextResponse,
  TranslationQuery, SingleTranslationResponse,
  SingleTafsirResponse,
  GlyphCodesOfAyahV1Response,
  GlyphCodesOfAyahV2Response,
  QuranApi
} from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();

export const quran: QuranApi = {

  /**
   * Retrieves the Indo-Pak script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Indo-Pak script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-indopak}
   */
  getIndoPakScriptOfAyah(query?: QuranQuery): Promise<QuranResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/code_v1?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v1';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves the Uthmani Tajweed script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Uthmani Tajweed script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani-tajweed}
   */
  getUthmaniTajweedScriptOfAyah(query?: QuranQuery): Promise<UthmaniTajweedResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/uthmani_tajweed?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani_tajweed';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },


  /**
   * Retrieves the Uthmani script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Uthmani script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani}
   */
  getUthmaniScriptOfAyah(query?: QuranQuery): Promise<UthmaniScriptResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/uthmani?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves the Uthmani simple script of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Uthmani simple script response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-uthmani-simple}
   */
  getUthmaniSimpleScriptOfAyah(query?: QuranQuery): Promise<UthmaniSimpleScriptResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/uthmani_simple?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani_simple';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves the Imlaei simple text of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the Imlaei simple text response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-imlaei}
   */
  getImlaeiSimpleTextOfAyah(query?: QuranQuery): Promise<ImlaeiSimpleTextResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/imlaei?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/imlaei';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves a single translation of a verse.
   *
   * @param translation_id - The ID of the translation to retrieve.
   * @param query - Optional query parameters to filter the translation.
   * @returns A promise that resolves to the single translation response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/translation}
   */
  getASingleTranslation(translation_id: string, query?: TranslationQuery): Promise<SingleTranslationResponse | AxiosError | Error> {
    const uri = query ? `/quran/translations/${translation_id}?${new URLSearchParams(query as URLSearchParams)}` : `/quran/translations/${translation_id}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves a single tafsir of a verse.
   *
   * @param tafsir_id - The ID of the tafsir to retrieve.
   * @param query - Optional query parameters to filter the tafsir.
   * @returns A promise that resolves to the single tafsir response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/tafsir}
   */
  getSingleTafsir(tafsir_id: string, query?: TranslationQuery): Promise<SingleTafsirResponse | AxiosError | Error> {
    const uri = query ? `/quran/tafsirs/${tafsir_id}?${new URLSearchParams(query as URLSearchParams)}` : `/quran/tafsirs/${tafsir_id}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves a single tafsir of a verse.
   *
   * @param tafsir_id - The ID of the tafsir to retrieve.
   * @param query - Optional query parameters to filter the tafsir.
   * @returns A promise that resolves to the single tafsir response or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-code-v-1}
   */
  getGlyphCodesOfAyahV1(query?: QuranQuery): Promise<GlyphCodesOfAyahV1Response | AxiosError | Error> {
    const uri = query ? `/quran/verses/code_v1?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v1';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves the glyph codes (version 2) of a verse.
   *
   * @param query - Optional query parameters to filter the verses.
   * @returns A promise that resolves to the glyph codes response (version 2) or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/quran-verses-code-v-2}
   */
  getGlyphCodesOfAyahV2(query?: QuranQuery): Promise<GlyphCodesOfAyahV2Response | AxiosError | Error> {
    const uri = query ? `/quran/verses/code_v2?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v2';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
};
