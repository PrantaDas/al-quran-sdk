import { AxiosError } from "axios";

export const ALLOWED_LANGUAGES = new Set(['en', 'ur', 'bn', 'tr', 'es', 'fr', 'bs', 'ru', 'ml', 'id', 'uz', 'nl', 'de', 'tg', 'ta', 'ja', 'it', 'vi', 'zh', 'sq', 'fa', 'bg', 'bm', 'ha', 'pt', 'ro', 'hi', 'sw', 'kk', 'th', 'tl', 'km', 'as', 'ko', 'so', 'az', 'ku', 'dv', 'ms', 'prs', 'zgh', 'am', 'ce', 'cs', 'fi', 'gu', 'he', 'ka', 'kn', 'ks', 'lg', 'mk', 'mr', 'mrn', 'ne', 'no', 'om', 'pl', 'ps', 'rw', 'sd', 'se', 'si', 'sr', 'sv', 'te', 'tt', 'ug', 'uk', 'sq', 'yo']);

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

export interface ChapterTranslate {
	language_name: string;
	name: string;
};


export interface Chapter {
	id: number;
	revelation_place: string;
	revelation_order: number;
	bismillah_pre: boolean;
	name_simple: string;
	name_complex: string;
	name_arabic: string;
	verses_count: number;
	pages: number[];
	translated_name: ChapterTranslate;
};

export interface ListChapters {
	chapters?: Chapter[];
};

export interface ChapterInfo {
	id: number;
	chapter_id: number;
	language_name: string;
	short_text: string;
	source: string;
	text: string;
};

export interface ChapterInfoResponse {
	chapter_info?: ChapterInfo;
};

export interface ChapterApi {
	listChapters: (language?: string) => Promise<ListChapters | Error | AxiosError>;
	getChapter: (id: number, language?: string) => Promise<Chapter | Error | AxiosError>;
	getChapterInfo: (chapter_id: number, language?: string) => Promise<ChapterInfo | Error | AxiosError>;
};


export interface JuzResponse {
	juzs: any[];
};


export interface JuzApi {
	getAllJuzs: () => Promise<JuzResponse | Error | AxiosError>;
};

export interface RecitaionInfo {
	info: Info;
}

export interface Info {
	id: number;
	info: any;
};


export interface TranslationInfo {
	info: Info;
};

export interface Root {
	translations: Translation[];
};

export interface Translation {
	id: number;
	name: string;
	author_name: string;
	slug: string;
	language_name: string;
	translated_name: TranslatedName;
};

export interface TranslationResponse {
	translations: Translation[];
};

export interface TafsirsResponse {
	tafsirs: Translation[];
};

export interface TafsirInfoResponse {
	id: number;
	info: string | null;
};

export interface RecitationStyle {
	mujawwad: string;
	murattal: string;
	muallim: string;
};

export interface RecitationStyleResponse {
	recitation_styles: RecitationStyle[];
};

export interface Languages {
	id: number;
	name: string;
	iso_code: string;
	native_name: string;
	direction: string;
	translations_count: number;
	translated_name: TranslatedName;
};

export interface LanguageResponse {
	languagess: Languages[];
};

export interface TranslatedName {
	name: string;
	language_name: string;
};

export interface ChapterInfos {
	chapter_infos: Translation[];
};

export interface VerseMedia {
	id: number;
	name: string;
	author_name: string;
	slug: string;
	language_name: string;
	translated_name: TranslatedName;
};

export interface VerseMediaResponse {
	verse_media: VerseMedia[];
};

export interface ResourceApi {
	getRecitationInfo: (recitation_id: string) => Promise<RecitaionInfo | Error | AxiosError>;
	getTranslationInfo: (translation_id: string) => Promise<TranslationInfo | Error | AxiosError>;
	getTranslations: (language?: string) => Promise<TranslationResponse | Error | AxiosError>;
	getTafsirs: (language?: string) => Promise<TafsirsResponse | Error | AxiosError>;
	getTafsirInfo: (tafsir_id: string) => Promise<TafsirInfoResponse | Error | AxiosError>;
	getRecitationStyles: () => Promise<RecitationStyleResponse | Error | AxiosError>;
	getLanguages: () => Promise<LanguageResponse | Error | AxiosError>;
	getChapterInfos: () => Promise<ChapterInfos | Error | AxiosError>;
	getVerseMedias: () => Promise<VerseMediaResponse | Error | AxiosError>;
};

export interface VerseResponse {
	verses: Verse[];
	pagination: Pagination;
};

export interface Verse {
	id: number;
	verse_number: number;
	page_number: number;
	verse_key: string;
	juz_number: number;
	hizb_number: number;
	rub_el_hizb_number: number;
	sajdah_type: any;
	sajdah_number: any;
	words: Word[];
	translations: Translation2[];
	tafsirs: Tafsir[];
};

export interface Word {
	id: number;
	position: number;
	audio_url: string;
	char_type_name: string;
	line_number: number;
	page_number: number;
	code_v1: string;
	translation: Translation;
	transliteration: Transliteration;
};

export interface Translation {
	text: string;
	language_name: string;
};

export interface Transliteration {
	text: string;
	language_name: string;
};

export interface Translation2 {
	resource_id: number;
	text: string;
};

export interface Tafsir {
	id: number;
	language_name: string;
	name: string;
	text: string;
};

export interface Pagination {
	per_page: number;
	current_page: number;
	next_page: number;
	total_pages: number;
	total_records: number;
};

export interface VerseQuery {
	language?: string;
	words?: string;
	translations?: string;
	audio?: string;
	tafsirs?: string;
	word_fields?: string;
	translation_fields?: string;
	fields?: string;
	page?: string;
	per_page?: string;
};


export interface VerseApi {
	getVerseByChapter: (chapter_number: string, query?: VerseQuery) => Promise<VerseResponse | AxiosError | Error>;
	getVerseByPage: (page_number: string, query?: VerseQuery) => Promise<VerseResponse | Error | AxiosError>;
	getVerseByJuz: (juz_number: string, query?: VerseQuery) => Promise<VerseResponse | Error | AxiosError>;
	getVerseByHizbNumber: (hizb_number: string, query?: VerseQuery) => Promise<VerseResponse | Error | AxiosError>;
	getVerseByRubElHizbNumber: (rub_el_hizb_number: string, query?: VerseQuery) => Promise<VerseResponse | Error | AxiosError>;
	getSpecificVerseByVerseKey: (verse_key: string, query?: VerseQuery) => Promise<VerseResponse | Error | AxiosError>;
	getRandomAyah: (query?: VerseQuery) => Promise<VerseResponse | Error | AxiosError>;
};