import { AxiosError } from "axios";
import Api from "../req";
import { ALLOWED_LANGUAGES, VerseApi, VerseQuery, VerseResponse } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();

export const verse: VerseApi = {

  /**
   * Retrieves verses from a specific chapter of the Quran.
   *
   * @param chapter_number - The number of the chapter to retrieve verses from.
   * @param query - Optional query parameters for the request, including language.
   * @returns A promise that resolves to the response containing the verses or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verses-by-chapter-number}
   */
  getVerseByChapter(chapter_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_chapter/${chapter_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_chapter/${chapter_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves verses from a specific page of the Quran.
   *
   * @param page_number - The number of the page to retrieve verses from.
   * @param query - Optional query parameters for the request, including language.
   * @returns A promise that resolves to the response containing the verses or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verses-by-page-number}
   */
  getVerseByPage(page_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_page/${page_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_page/${page_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves verses from a specific juz (section) of the Quran.
   *
   * @param juz_number - The number of the juz to retrieve verses from.
   * @param query - Optional query parameters for the request, including language.
   * @returns A promise that resolves to the response containing the verses or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verses-by-juz-number}
   */
  getVerseByJuz(juz_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_juz/${juz_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_juz/${juz_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves verses from a specific hizb (half of a juz) of the Quran.
   *
   * @param hizb_number - The number of the hizb to retrieve verses from.
   * @param query - Optional query parameters for the request, including language.
   * @returns A promise that resolves to the response containing the verses or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verses-by-hizb-number}
   */
  getVerseByHizbNumber(hizb_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_hizb/${hizb_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_hizb/${hizb_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves verses from a specific rub' el-hizb (quarter of a hizb) of the Quran.
   *
   * @param rub_el_hizb_number - The number of the rub' el-hizb to retrieve verses from.
   * @param query - Optional query parameters for the request, including language.
   * @returns A promise that resolves to the response containing the verses or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verses-by-rub-el-hizb-number}
   */
  getVerseByRubElHizbNumber(rub_el_hizb_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_rub/${rub_el_hizb_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_rub/${rub_el_hizb_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves a specific verse using a verse key.
   *
   * @param verse_key - The key of the verse to retrieve (usually in the format "chapter:verse").
   * @param query - Optional query parameters for the request, including language.
   * @returns A promise that resolves to the response containing the verse or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/verses-by-verse-key}
   */
  getSpecificVerseByVerseKey(verse_key: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_key/${verse_key}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_key/${verse_key}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },

  /**
   * Retrieves a random verse (ayah) from the Quran.
   *
   * @param query - Optional query parameters for the request, including language.
   * @returns A promise that resolves to the response containing a random verse or rejects with an error.
   * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/random-verse}
   */
  getRandomAyah(query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/random?${new URLSearchParams(query as URLSearchParams)}` : `/verses/random`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
};
