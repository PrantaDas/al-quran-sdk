export interface CustomHeaders {
    [key: string]: string;
};

export interface AxiosConfig {
    baseURL?: string;
    token?: string;
    customHeaders?: CustomHeaders;
};

export interface AudioQueryParams {
    fields?: string;
    chapter_number?: string;
    juz_number?: string;
    page_number?: string;
    hizb_number?: string;
    rub_el_hizb_number?: string;
    verse_key?: string;
};