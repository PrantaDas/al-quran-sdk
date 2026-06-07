import Api from "./req";

/**
 * Module-scoped Axios instance.
 *
 * All API modules in this package share the same instance so that they also
 * share the underlying keep-alive socket pool. Creating a fresh instance per
 * call would defeat connection reuse and waste sockets.
 */
const api = Api();

/**
 * Issues a GET request through the shared Axios instance.
 *
 * The response interceptor configured in {@link Api} already unwraps the
 * response body, so the returned promise resolves directly to the typed
 * payload `T`.
 *
 * @template T  Expected shape of the response body.
 * @param query Absolute path (relative to the configured base URL), including
 *              any query string. Must start with `/`.
 * @returns A promise resolving to the deserialised response body.
 */
export const apiWraper = async <T>(query: string): Promise<T> => {
    return await api.get<T, T>(query);
};

/**
 * Appends a query string to a path only when at least one parameter is set.
 *
 * Several endpoints accept the same request path with or without a query
 * string. Centralising the logic here keeps each endpoint method to a single,
 * readable line and prevents subtly different implementations from drifting
 * apart.
 *
 * The parameter type is intentionally `object` so the helper accepts any of
 * the typed query-parameter interfaces (e.g. `VerseQuery`, `AudioQueryParams`)
 * without forcing them to declare an index signature. `undefined`, `null` and
 * empty-string values are dropped so callers can hand over partial objects
 * directly.
 *
 * @param path   The base path, e.g. `/verses/by_chapter/1`.
 * @param params Optional query parameter object.
 * @returns The path, optionally suffixed with `?key=value&...`.
 */
export const buildUri = <T extends object>(path: string, params?: T): string => {
    if (!params) return path;

    const entries = Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
    ) as [string, string][];

    if (entries.length === 0) return path;

    const search = new URLSearchParams(entries).toString();
    return `${path}?${search}`;
};
