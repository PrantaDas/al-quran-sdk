import Agent from "agentkeepalive";
import axios, { AxiosInstance } from "axios";
import config from "./config";
import { CustomHeaders } from "./interfaces";

/**
 * Default socket-pool sizing for the keep-alive agent.
 *
 * These numbers were chosen for a typical server-side workload that fans out
 * many concurrent calls to the quran.com API. They are intentionally generous
 * because the public API is read-only and tolerant of bursty traffic.
 */
const KEEP_ALIVE_MAX_SOCKETS = 100;
const KEEP_ALIVE_MAX_FREE_SOCKETS = 25;

/** Request/socket timeout in milliseconds (60s). */
const REQUEST_TIMEOUT_MS = 60_000;

/**
 * Creates a pre-configured Axios instance for talking to the Quran API.
 *
 * The returned instance:
 *  - Reuses TCP/TLS connections via a keep-alive agent for lower latency.
 *  - Treats any `2xx`–`4xx` status as a *resolved* response so that callers can
 *    inspect 4xx payloads (e.g. validation errors) without `try/catch`. Only
 *    `5xx` and transport failures reject the promise.
 *  - Unwraps the response body in a response interceptor, meaning callers
 *    receive the JSON payload directly instead of an `AxiosResponse` envelope.
 *
 * @param baseURL       Base URL for every request. Defaults to {@link config.API_BASE_URL}.
 * @param token         Optional bearer token; when supplied it is attached to
 *                      every outgoing request as `Authorization: Bearer <token>`.
 * @param customHeaders Extra headers merged into the default header set.
 * @returns A ready-to-use {@link AxiosInstance}.
 */
const Api = (
    baseURL: string = config.API_BASE_URL,
    token?: string,
    customHeaders: CustomHeaders = {}
): AxiosInstance => {
    const keepAliveAgent = new Agent.HttpsAgent({
        maxSockets: KEEP_ALIVE_MAX_SOCKETS,
        maxFreeSockets: KEEP_ALIVE_MAX_FREE_SOCKETS,
        timeout: REQUEST_TIMEOUT_MS,
        // The quran.com API serves a valid certificate, but we keep this
        // permissive flag for environments behind corporate MITM proxies.
        rejectUnauthorized: false,
    });

    const axiosInstance = axios.create({
        baseURL,
        timeout: REQUEST_TIMEOUT_MS,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            ...customHeaders,
        },
        httpsAgent: keepAliveAgent,
        maxBodyLength: Infinity,
        // Resolve on anything < 500 so 4xx bodies are returned to the caller.
        validateStatus: (status) => status >= 200 && status < 500,
    });

    // Attach the bearer token lazily so future token rotations could be wired
    // in without recreating the Axios instance.
    axiosInstance.interceptors.request.use((requestConfig) => {
        if (token) {
            requestConfig.headers["Authorization"] = `Bearer ${token}`;
        }
        return requestConfig;
    });

    // Unwrap the body on success; serialise the error on failure so it is
    // safe to forward across process or worker boundaries (no circular refs).
    axiosInstance.interceptors.response.use(
        (response) => response.data,
        (error) => Promise.reject(error.toJSON())
    );

    return axiosInstance;
};

export default Api;
