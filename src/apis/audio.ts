import { AudioError, LanguageValidationError } from "../errors";
import {
    ALLOWED_LANGUAGES,
    AudioApi,
    AudioQueryParams,
    IAudio,
    IAyahRecitationSpecificAyah,
    IAyahRecitationSpecificHizb,
    IAyahRecitationSpecificJuz,
    IAyahRecitationSpecificMadaniMushafPage,
    IAyahRecitationSpecificRubelHizb,
    IAyahRecitationSpecificSurah,
    IListOfAllAudioOfAReciter,
    IRecitation,
    IReciters,
    ISingleRecitation,
} from "../interfaces";
import { apiWraper, buildUri } from "../utils";

/**
 * Asserts that a language code is in {@link ALLOWED_LANGUAGES}.
 *
 * Centralising the check keeps every endpoint's guard clause to one line and
 * makes the error message consistent across the audio module.
 *
 * @throws {LanguageValidationError} If `language` is not in the whitelist.
 */
const assertLanguage = (language: string): void => {
    if (!ALLOWED_LANGUAGES.has(language)) {
        throw new LanguageValidationError("Provided language is not supported");
    }
};

/**
 * Audio API — recitations, reciters, and ayah-level audio.
 *
 * Every method maps 1:1 onto a quran.com endpoint. See the `@see` link on
 * each method for the upstream documentation.
 */
export const audio: AudioApi = {
    /**
     * Retrieves the audio file for a specific chapter recited by a specific reciter.
     *
     * @param id             Reciter ID.
     * @param chapter_number Chapter (surah) number, 1–114.
     * @returns The chapter audio metadata.
     * @throws {AudioError} If `id` or `chapter_number` is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciter-audio-file
     */
    async getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio> {
        if (!id || !chapter_number) {
            throw new AudioError("Reciter's ID and Chapter number is required");
        }
        return apiWraper<IAudio>(`/chapter_recitations/${id}/${chapter_number}`);
    },

    /**
     * Retrieves every chapter audio file produced by a specific reciter.
     *
     * @param id Reciter ID.
     * @returns The full list of chapter audio files.
     * @throws {AudioError} If `id` is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciter-audio-files
     */
    async getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter> {
        if (!id) throw new AudioError("Reciter's ID is required");
        return apiWraper<IListOfAllAudioOfAReciter>(`/chapter_recitations/${id}`);
    },

    /**
     * Lists every recitation available in the given language.
     *
     * @param language Two-letter ISO language code. Defaults to `'en'`.
     * @returns The recitation list.
     * @throws {LanguageValidationError} If `language` is not in {@link ALLOWED_LANGUAGES}.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/recitations
     */
    async getRecitations(language: string = 'en'): Promise<IRecitation> {
        assertLanguage(language);
        return apiWraper<IRecitation>(buildUri('/resources/languages', { language }));
    },

    /**
     * Retrieves every audio file for one recitation, optionally filtered.
     *
     * @param recitation_id Recitation ID.
     * @param query         Optional filters (chapter, juz, page, hizb, etc.).
     * @returns The recitation's audio files plus reciter metadata.
     * @throws {AudioError} If `recitation_id` is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/recitation-autio-files
     */
    async getAllAudioFilesofARecitation(
        recitation_id: number,
        query?: AudioQueryParams,
    ): Promise<ISingleRecitation> {
        if (!recitation_id) throw new AudioError('recitation_id is required');
        return apiWraper<ISingleRecitation>(buildUri(`/quran/recitations/${recitation_id}`, query));
    },

    /**
     * Lists chapter-level reciters in the given language.
     *
     * @param language Two-letter ISO language code. Defaults to `'en'`.
     * @returns The reciter list.
     * @throws {LanguageValidationError} If `language` is not in {@link ALLOWED_LANGUAGES}.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/chapter-reciters
     */
    async getListOfChapterReciters(language: string = 'en'): Promise<IReciters> {
        assertLanguage(language);
        return apiWraper<IReciters>(buildUri('/resources/chapter_reciters', { language }));
    },

    /**
     * Retrieves ayah-level audio for one Surah by one reciter.
     *
     * @param recitation_id  Recitation ID.
     * @param chapter_number Surah number, 1–114.
     * @throws {AudioError} If either argument is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/list-surah-recitation
     */
    async getAyahRecitationsForSpecificSurah(
        recitation_id: number,
        chapter_number: number,
    ): Promise<IAyahRecitationSpecificSurah> {
        if (!recitation_id || !chapter_number) {
            throw new AudioError('recitation_id and Chapter number is required');
        }
        return apiWraper<IAyahRecitationSpecificSurah>(
            `/recitations/${recitation_id}/by_chapter/${chapter_number}`,
        );
    },

    /**
     * Retrieves ayah-level audio for one Juz by one reciter.
     *
     * @param recitation_id Recitation ID.
     * @param juz_number    Juz number, 1–30.
     * @throws {AudioError} If either argument is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/list-juz-recitaiton
     */
    async getAyahRecitationsForSpecificJuz(
        recitation_id: number,
        juz_number: number,
    ): Promise<IAyahRecitationSpecificJuz> {
        if (!recitation_id || !juz_number) {
            throw new AudioError('recitation_id and juz_number is required');
        }
        return apiWraper<IAyahRecitationSpecificJuz>(
            `/recitations/${recitation_id}/by_juz/${juz_number}`,
        );
    },

    /**
     * Retrieves ayah-level audio for one Madani Mushaf page by one reciter.
     *
     * @param recitation_id Recitation ID.
     * @param page_number   Mushaf page number, 1–604.
     * @throws {AudioError} If either argument is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/list-page-recitaiton
     */
    async getAyahRecitationForSpecificMadaniMushafPage(
        recitation_id: number,
        page_number: number,
    ): Promise<IAyahRecitationSpecificMadaniMushafPage> {
        if (!recitation_id || !page_number) {
            throw new AudioError('recitation_id and Page number is required');
        }
        return apiWraper<IAyahRecitationSpecificMadaniMushafPage>(
            `/recitations/${recitation_id}/by_page/${page_number}`,
        );
    },

    /**
     * Retrieves ayah-level audio for one Rub el-Hizb by one reciter.
     *
     * @param recitation_id      Recitation ID.
     * @param rub_el_hizb_number Rub el-Hizb number, 1–240.
     * @throws {AudioError} If either argument is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/list-rub-el-hizb-recitaiton
     */
    async getAyahRecitationForSpecificRubelHizb(
        recitation_id: number,
        rub_el_hizb_number: number,
    ): Promise<IAyahRecitationSpecificRubelHizb> {
        if (!recitation_id || !rub_el_hizb_number) {
            throw new AudioError('recitation_id and rub_el_hizb_number is required');
        }
        return apiWraper<IAyahRecitationSpecificRubelHizb>(
            `/recitations/${recitation_id}/by_rub/${rub_el_hizb_number}`,
        );
    },

    /**
     * Retrieves ayah-level audio for one Hizb by one reciter.
     *
     * @param recitation_id Recitation ID.
     * @param hizb_number   Hizb number, 1–60.
     * @throws {AudioError} If either argument is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/list-hizb-recitaiton
     */
    async getAyahRecitationForSpecificHizb(
        recitation_id: number,
        hizb_number: number,
    ): Promise<IAyahRecitationSpecificHizb> {
        if (!recitation_id || !hizb_number) {
            throw new AudioError('recitation_id and hizb_number is required');
        }
        return apiWraper<IAyahRecitationSpecificHizb>(
            `/recitations/${recitation_id}/by_hizb/${hizb_number}`,
        );
    },

    /**
     * Retrieves the audio of a single ayah for the given reciter.
     *
     * @param recitation_id Recitation ID.
     * @param ayah_key      Ayah key in `chapter:verse` form (e.g. `"2:255"`).
     * @throws {AudioError} If either argument is missing.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/list-ayah-recitaiton
     */
    async getAyahRecitationForSpecificAyah(
        recitation_id: number,
        ayah_key: string,
    ): Promise<IAyahRecitationSpecificAyah> {
        if (!recitation_id || !ayah_key) {
            throw new AudioError('recitation_id and ayah_key is required');
        }
        return apiWraper<IAyahRecitationSpecificAyah>(
            `/recitations/${recitation_id}/by_ayah/${ayah_key}`,
        );
    },
};
