import { AxiosError } from "axios";
import Api from "../req";
import { JuzApi, JuzResponse } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();

export const juz: JuzApi = {
    getAllJuzs(): Promise<JuzResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get('/juzs')
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
};
