import Agent from "agentkeepalive";
import axios, { AxiosInstance } from "axios";
import config from "./config";
import { CustomHeaders } from "./types";



/**
 * Creates an Axios instance with custom configuration for making HTTP requests.
 *
 * @param baseURL - The base URL for the API requests. Defaults to `config.API_BASE_URL`.
 * @param token - An optional authorization token to be included in the headers of each request.
 * @param customHeaders - An object representing custom headers to be included in each request. Defaults to an empty object.
 * @returns An Axios instance configured with the specified parameters.
 */
const Api = (
    baseURL: string = config.API_BASE_URL,
    token?: string,
    customHeaders: CustomHeaders = {}
): AxiosInstance => {
    const keepAliveAgent = new Agent.HttpsAgent({
        maxSockets: 100,
        maxFreeSockets: 25,
        timeout: 60000,
        rejectUnauthorized: false,
    });

    const axiosInstance = axios.create({
        baseURL,
        timeout: 60000,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            ...customHeaders,
        },
        httpsAgent: keepAliveAgent,
        maxBodyLength: Infinity,
        validateStatus: (status) => {
            return status >= 200 && status < 500;
        }
    });

    axiosInstance.interceptors.request.use((config) => {
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error.toJSON()),
    );

    return axiosInstance;
};


export default Api;