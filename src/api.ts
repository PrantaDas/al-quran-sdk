import Agent from "agentkeepalive";
import axios, { AxiosInstance } from "axios";
import config from "./config";
import { CustomHeaders } from "./types";


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