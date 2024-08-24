import { JuzApi, JuzResponse } from "../interfaces";
import { apiWraper, handleError, handleResponse } from "../utils";


export const juz: JuzApi = {

    /**
     * Retrieves a list of all Juzs (sections) of the Quran.
     *
     * @returns A promise that resolves to the list of Juzs or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/juzs}
     */

    async getAllJuzs(): Promise<JuzResponse> {
        return await apiWraper<JuzResponse>('/juzs');
    },
};
