/**
 * Static configuration for the SDK.
 *
 * The base URL targets the public quran.com REST API (v4). It is exposed as a
 * mutable object on purpose so that consumers — or the {@link Api} factory —
 * can override it at runtime when needed (e.g. integration tests, regional
 * proxies, local mocks).
 *
 * @see https://api-docs.quran.com/docs/quran.com_versioned
 */
const config = {
    API_BASE_URL: "https://api.quran.com/api/v4",
} as const;

export default config;
