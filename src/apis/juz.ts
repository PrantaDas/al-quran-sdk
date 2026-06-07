import { JuzApi, JuzResponse } from "../interfaces";
import { apiWraper } from "../utils";

/**
 * Juz API.
 *
 * The Quran is traditionally split into 30 equal sections called *juz*.
 * Only one endpoint is exposed today; the namespace exists so additional
 * juz-related endpoints can be added without changing the public surface.
 */
export const juz: JuzApi = {
    /**
     * Lists every Juz in the Quran along with its boundary metadata.
     *
     * @returns The juz list.
     * @see https://api-docs.quran.com/docs/quran.com_versioned/juzs
     */
    async getAllJuzs(): Promise<JuzResponse> {
        return apiWraper<JuzResponse>('/juzs');
    },
};
