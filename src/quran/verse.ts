import { AxiosError } from "axios";
import Api from "../api";
import { ALLOWED_LANGUAGES, VerseApi, VerseQuery, VerseResponse } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();

const verse: VerseApi = {
  getVerseByChapter(chapter_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_chapter/${chapter_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_chapter/${chapter_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getVerseByPage(page_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_page/${page_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_page/${page_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getVerseByJuz(juz_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_juz/${juz_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_juz/${juz_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getVerseByHizbNumber(hizb_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_hizb/${hizb_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_hizb/${hizb_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getVerseByRubElHizbNumber(rub_el_hizb_number: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_rub/${rub_el_hizb_number}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_rub/${rub_el_hizb_number}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getSpecificVerseByVerseKey(verse_key: string, query?: VerseQuery): Promise<VerseResponse | AxiosError | Error> {
    if (query?.language && !ALLOWED_LANGUAGES.has(query.language)) throw new Error('Provided query language is not allowed');
    const uri = query ? `/verses/by_key/${verse_key}?${new URLSearchParams(query as URLSearchParams)}` : `/verses/by_key/${verse_key}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
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

export default verse;