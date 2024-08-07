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
  getIndoPakScriptOfAyah(query?: QuranQuery): Promise<QuranResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/code_v1?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v1';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getUthmaniTajweedScriptOfAyah(query?: QuranQuery): Promise<UthmaniTajweedResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/uthmani_tajweed?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani_tajweed';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getUthmaniScriptOfAyah(query?: QuranQuery): Promise<UthmaniScriptResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/uthmani?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getUthmaniSimpleScriptOfAyah(query?: QuranQuery): Promise<UthmaniSimpleScriptResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/uthmani_simple?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/uthmani_simple';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getImlaeiSimpleTextOfAyah(query?: QuranQuery): Promise<ImlaeiSimpleTextResponse | AxiosError | Error> {
    const uri = query ? `/quran/verses/imlaei?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/imlaei';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getASingleTranslation(translation_id: string, query?: TranslationQuery): Promise<SingleTranslationResponse | AxiosError | Error> {
    const uri = query ? `/quran/translations/${translation_id}?${new URLSearchParams(query as URLSearchParams)}` : `/quran/translations/${translation_id}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getSingleTafsir(tafsir_id: string, query?: TranslationQuery): Promise<SingleTafsirResponse | AxiosError | Error> {
    const uri = query ? `/quran/tafsirs/${tafsir_id}?${new URLSearchParams(query as URLSearchParams)}` : `/quran/tafsirs/${tafsir_id}`;
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getGlyphCodesOfAyahV1(query?: QuranQuery): Promise<GlyphCodesOfAyahV1Response | AxiosError | Error> {
    const uri = query ? `/quran/verses/code_v1?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v1';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
  getGlyphCodesOfAyahV2(query?: QuranQuery): Promise<GlyphCodesOfAyahV2Response | AxiosError | Error> {
    const uri = query ? `/quran/verses/code_v2?${new URLSearchParams(query as URLSearchParams)}` : '/quran/verses/code_v2';
    return new Promise((resolve, reject) => {
      api.get(uri)
        .then(handleResponse(resolve))
        .catch(handleError(reject));
    });
  },
};
