import { AxiosError } from "axios";
import Api from "../api";
import { JuzApi, JuzResponse } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();

const juz: JuzApi = {
    getAllJuzs(): Promise<JuzResponse | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get('/juzs')
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
};

export default juz;