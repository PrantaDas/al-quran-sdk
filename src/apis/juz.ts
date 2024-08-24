import { AxiosError } from "axios";
import Api from "../req";
import { JuzApi, JuzResponse } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();

export const juz: JuzApi = {

    /**
     * Retrieves a list of all Juzs (sections) of the Quran.
     *
     * @returns A promise that resolves to the list of Juzs or rejects with an error.
     * @see {@link https://api-docs.quran.com/docs/quran.com_versioned/juzs}
     */

    getAllJuzs(): Promise<JuzResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get('/juzs')
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
};
