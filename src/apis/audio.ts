import url from "url";
import { AudioError, LanguageValidationError } from "../errors";
import {
    ALLOWED_LANGUAGES,
    AudioApi, AudioQueryParams,
    IAudio,
    IAyahRecitationSpecificAyah,
    IAyahRecitationSpecificHizb,
    IAyahRecitationSpecificJuz,
    IAyahRecitationSpecificMadaniMushafPage, IAyahRecitationSpecificRubelHizb,
    IAyahRecitationSpecificSurah,
    IListOfAllAudioOfAReciter, IRecitation,
    IReciters,
    ISingleRecitation
} from "../interfaces";
import { apiWraper } from "../utils";


export const audio: AudioApi = {

    /**
    * Retrieves audio recordings of a specific chapter by a particular reciter.
    *
    * @param id - The ID of the reciter.
    * @param chapter_number - The number of the chapter.
    * @returns A promise that resolves to the audio recordings or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciter-audio-file}
    */
    async getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio> {
        if (!id || !chapter_number)
            throw new AudioError('Reciter\'s ID and Chapter number is required');
        return await apiWraper<IAudio>(`/chapter_recitations/${id}/${chapter_number}`);
    },

    /**
     * Retrieves all audio recordings for a specific reciter.
     *
     * @param id - The ID of the reciter.
     * @returns A promise that resolves to the list of audio recordings or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciter-audio-files}
     */
    async getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter> {
        if (!id)
            throw new AudioError('Reciter\'s ID is required');
        return await apiWraper<IListOfAllAudioOfAReciter>(`/chapter_recitations/${id}`);
    },

    /**
     * Retrieves a list of recitations available in the specified language.
     *
     * @param language - The language code. Defaults to 'en'.
     * @returns A promise that resolves to the list of recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitations}
     */
    async getRecitations(language: string = 'en'): Promise<IRecitation> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) throw new LanguageValidationError("Provided language is not supported");
        return await apiWraper<IRecitation>(`/resources/languages?${new url.URLSearchParams({ language })}`);
    },


    /**
     * Retrieves all audio files for a specific recitation, optionally filtered by query parameters.
     *
     * @param recitation_id - The ID of the recitation.
     * @param query - Optional query parameters to filter the audio files.
     * @returns A promise that resolves to the list of audio files or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/recitation-autio-files}
     */
    async getAllAudioFilesofARecitation(recitation_id: number, query?: AudioQueryParams): Promise<ISingleRecitation> {
        if (!recitation_id) throw new AudioError('recitation_id is required');
        let uri = `/quran/recitations/${recitation_id}`;
        if (query && Object.values(query).length > 0)
            uri = `${uri}?${new URLSearchParams(query as URLSearchParams)}`;
        return await apiWraper<ISingleRecitation>(uri);
    },



    /**
     * Retrieves a list of chapter reciters available in the specified language.
     *
     * @param language - The language code. Defaults to 'en'.
     * @returns A promise that resolves to the list of chapter reciters or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciters}
     */
    async getListOfChapterReciters(language: string = 'en'): Promise<IReciters> {
        const isLanguageSupported = ALLOWED_LANGUAGES.has(language);
        if (!isLanguageSupported) throw new LanguageValidationError("Provided language is not supported");
        return await apiWraper<IReciters>(`/resources/chapter_reciters?${new URLSearchParams({ language })}`);
    },


    /**
    * Retrieves audio recitations for a specific chapter by a particular reciter.
    *
    * @param recitation_id - The ID of the reciter.
    * @param chapter_number - The number of the chapter.
    * @returns A promise that resolves to the audio recitations or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-surah-recitation}
    */
    async getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<IAyahRecitationSpecificSurah> {
        if (!recitation_id || !chapter_number)
            throw new AudioError('recitation_id and Chapter number is required');
        return await apiWraper(`/recitations/${recitation_id}/by_chapter/${chapter_number}`);
    },


    /**
     * Retrieves audio recitations for a specific Juz by a particular reciter.
     *
     * @param recitation_id - The ID of the reciter.
     * @param juz_number - The number of the Juz.
     * @returns A promise that resolves to the audio recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-juz-recitaiton}
     */
    async getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<IAyahRecitationSpecificJuz> {
        if (!recitation_id || !juz_number)
            throw new AudioError('recitation_id and juz_number is required');
        return await apiWraper<IAyahRecitationSpecificJuz>(`/recitations/${recitation_id}/by_juz/${juz_number}`)
    },


    /**
    * Retrieves audio recitations for a specific Madani Mushaf page by a particular reciter.
    *
    * @param recitation_id - The ID of the reciter.
    * @param page_number - The number of the Madani Mushaf page.
    * @returns A promise that resolves to the audio recitations or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-page-recitaiton}
    */
    async getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<IAyahRecitationSpecificMadaniMushafPage> {
        if (!recitation_id || !page_number)
            throw new AudioError('recitation_id and Page number is required');
        return await apiWraper<IAyahRecitationSpecificMadaniMushafPage>(`/recitations/${recitation_id}/by_page/${page_number}`);
    },


    /**
     * Retrieves audio recitations for a specific Rub El Hizb by a particular reciter.
     *
     * @param recitation_id - The ID of the reciter.
     * @param rub_el_hizb_number - The number of the Rub El Hizb.
     * @returns A promise that resolves to the audio recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-rub-el-hizb-recitaiton}
     */
    async getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<IAyahRecitationSpecificRubelHizb> {
        if (!recitation_id || !rub_el_hizb_number)
            throw new AudioError('recitation_id and rub_el_hizb_number is required');
        return await apiWraper<IAyahRecitationSpecificRubelHizb>(`/recitations/${recitation_id}/by_rub/${rub_el_hizb_number}`);
    },


    /**
    * Retrieves audio recitations for a specific Hizb by a particular reciter.
    *
    * @param recitation_id - The ID of the reciter.
    * @param hizb_number - The number of the Hizb.
    * @returns A promise that resolves to the audio recitations or rejects with an error.
    * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-hizb-recitaiton}
    */
    async getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<IAyahRecitationSpecificHizb> {
        if (!recitation_id || !hizb_number)
            throw new AudioError('recitation_id and hizb_number is required');
        return await apiWraper<IAyahRecitationSpecificHizb>(`/recitations/${recitation_id}/by_hizb/${hizb_number}`);
    },


    /**
     * Retrieves audio recitations for a specific Ayah by a particular reciter.
     *
     * @param recitation_id - The ID of the reciter.
     * @param ayah_key - The key of the Ayah.
     * @returns A promise that resolves to the audio recitations or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/list-ayah-recitaiton}
     */
    async getAyahRecitationForSpecificAyah(recitation_id: number, ayah_key: string): Promise<IAyahRecitationSpecificAyah> {
        if (!recitation_id || !ayah_key)
            throw new AudioError('recitation_id and ayah_key is required');
        return await apiWraper<IAyahRecitationSpecificAyah>(`/recitations/${recitation_id}/by_ayah/${ayah_key}`);
    }

};

