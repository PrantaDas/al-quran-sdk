import { AxiosError } from "axios";

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

export interface IAudio {
    id: number;
    chapter_id: number;
    file_size: number;
    format: string;
    total_files: number;
    audio_url: string;
};

export interface IListOfAllAudioOfAReciter {
    audio_files: IAudio[];
};

export interface IRecitation {
    id: number;
    reciter_name: string;
    style: string;
    translated_name: ITranslatedName;
};

export interface ITranslatedName {
    name: string;
    language_name: string;
};

export interface ISingleRecitationAudio {
    url: string;
    duration: number;
    format: string;
    segments?: any[];
};

export interface IRecitationMeta {
    reciter_name: string;
    recitation_style?: string | null;
};

export interface ISingleRecitation {
    audio_files: ISingleRecitationAudio[];
    meta: IRecitationMeta;
};

export interface IReciter {
    id: number;
    name: string;
    arabic_name: string;
    relative_path: string;
    format: string;
    files_size: number;
};

export interface IReciters {
    reciters: IReciter[];
};

export interface IAudioPagination {
    per_page: number;
    current_page: number;
    next_page: number;
    total_pages: number;
    total_records: number;
};

export interface IAyahRecitationSpecificSurah {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
};

export interface IAyahRecitationSpecificJuz {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
};

export interface IAyahRecitationSpecificMadaniMushafPage {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
};

export interface IAyahRecitationSpecificRubelHizb {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
};

export interface IAyahRecitationSpecificHizb {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
};

export interface IAyahRecitationSpecificAyah {
    audio_files: ISingleRecitationAudio[];
    pagination: IAudioPagination;
};

export interface AudioApi {
    getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio | Error | AxiosError>;
    getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter | Error | AxiosError>;
    getRecitations(language: string): Promise<IRecitation | Error | AxiosError>;
    getAllAudioFilesofARecitation(recitation_id: number, query?: AudioQueryParams): Promise<ISingleRecitation | Error | AxiosError>;
    getListOfChapterReciters(language: string): Promise<IReciters | Error | AxiosError>;
    getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<IAyahRecitationSpecificSurah | Error | AxiosError>;
    getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<IAyahRecitationSpecificJuz | Error | AxiosError>;
    getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<IAyahRecitationSpecificMadaniMushafPage | Error | AxiosError>;
    getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<IAyahRecitationSpecificRubelHizb | Error | AxiosError>;
    getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<IAyahRecitationSpecificHizb | Error | AxiosError>;
    getAyahRecitationForSpecificAyah(recitation_id: number, ayah_key: string): Promise<IAyahRecitationSpecificAyah | Error | AxiosError>;
};