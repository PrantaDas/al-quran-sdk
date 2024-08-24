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
	getChaptersAudioOfAReciter(id: number, chapter_number: number): Promise<IAudio>;
	getAllChaptersAudioOfAReciter(id: number): Promise<IListOfAllAudioOfAReciter>;
	getRecitations(language: string): Promise<IRecitation>;
	getAllAudioFilesofARecitation(recitation_id: number, query?: AudioQueryParams): Promise<ISingleRecitation>;
	getListOfChapterReciters(language: string): Promise<IReciters>;
	getAyahRecitationsForSpecificSurah(recitation_id: number, chapter_number: number): Promise<IAyahRecitationSpecificSurah>;
	getAyahRecitationsForSpecificJuz(recitation_id: number, juz_number: number): Promise<IAyahRecitationSpecificJuz>;
	getAyahRecitationForSpecificMadaniMushafPage(recitation_id: number, page_number: number): Promise<IAyahRecitationSpecificMadaniMushafPage>;
	getAyahRecitationForSpecificRubelHizb(recitation_id: number, rub_el_hizb_number: number): Promise<IAyahRecitationSpecificRubelHizb>;
	getAyahRecitationForSpecificHizb(recitation_id: number, hizb_number: number): Promise<IAyahRecitationSpecificHizb>;
	getAyahRecitationForSpecificAyah(recitation_id: number, ayah_key: string): Promise<IAyahRecitationSpecificAyah>;
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
	listChapters: (language?: string) => Promise<ListChapters>;
	getChapter: (id: number, language?: string) => Promise<Chapter>;
	getChapterInfo: (chapter_id: number, language?: string) => Promise<ChapterInfo>;
};


export interface JuzResponse {
	juzs: any[];
};


export interface JuzApi {
	getAllJuzs: () => Promise<JuzResponse>;
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
	getRecitationInfo: (recitation_id: string) => Promise<RecitaionInfo>;
	getTranslationInfo: (translation_id: string) => Promise<TranslationInfo>;
	getTranslations: (language?: string) => Promise<TranslationResponse>;
	getTafsirs: (language?: string) => Promise<TafsirsResponse>;
	getTafsirInfo: (tafsir_id: string) => Promise<TafsirInfoResponse>;
	getRecitationStyles: () => Promise<RecitationStyleResponse>;
	getLanguages: () => Promise<LanguageResponse>;
	getChapterInfos: () => Promise<ChapterInfos>;
	getVerseMedias: () => Promise<VerseMediaResponse>;
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
	getVerseByChapter: (chapter_number: string, query?: VerseQuery) => Promise<VerseResponse>;
	getVerseByPage: (page_number: string, query?: VerseQuery) => Promise<VerseResponse>;
	getVerseByJuz: (juz_number: string, query?: VerseQuery) => Promise<VerseResponse>;
	getVerseByHizbNumber: (hizb_number: string, query?: VerseQuery) => Promise<VerseResponse>;
	getVerseByRubElHizbNumber: (rub_el_hizb_number: string, query?: VerseQuery) => Promise<VerseResponse>;
	getSpecificVerseByVerseKey: (verse_key: string, query?: VerseQuery) => Promise<VerseResponse>;
	getRandomAyah: (query?: VerseQuery) => Promise<VerseResponse>;
};

export interface QuranQuery {
	chapter_number?: string;
	juz_number?: string;
	page_number?: string;
	hizb_number?: string;
	rub_el_hizb_number?: string;
	verse_key?: string;
};

export interface QuranResponse {
	verses: IndoPakVerse[];
};

export interface IndoPakVerse {
	id: number;
	verse_key: string;
	text_indopak: string;
};

export interface UthmaniTajweedResponse {
	verses: UthManiVerse[];
};

export interface UthManiVerse {
	id: number;
	verse_key: string;
	text_uthmani_tajweed: string;
};

export interface UthmaniScriptResponse {
	verses: UthmaniScript[];
};

export interface UthmaniScript {
	id: number;
	verse_key: string;
	text_uthmani: string;
};

export interface UthmaniSimpleScriptResponse {
	verses: UthmaniSimpleScript[];
};

export interface UthmaniSimpleScript {
	id: number;
	verse_key: string;
	text_uthmani_simple: string;
};

export interface ImlaeiSimpleTextResponse {
	verses: ImlaeiSimpleText[];
};

export interface ImlaeiSimpleText {
	id: number;
	verse_key: string;
	text_imlaei: string;
};

export interface TranslationQuery {
	fields?: string;
	chapter_number?: string;
	juz_number?: string;
	page_number?: string;
	hizb_number?: string;
	rub_el_hizb_number?: string;
	verse_key?: string;
};

export interface SingleTranslationResponse {
	translations: Translation[];
	meta: TranslationMeta;
};

export interface VerseTranslation {
	resource_id: number;
	text: string;
};

export interface TranslationMeta {
	translation_name: string;
	author_name: string;
};

export interface SingleTafsirResponse {
	tafsirs: Tafsir[]
	meta: TafsirMeta;
};

export interface SingleTafsir {
	resource_id: number;
	text: string;
};

export interface TafsirMeta {
	tafsir_name: string;
	author_name: string;
};

export interface GlyphCodesOfAyahV1Response {
	verses: GlyphCodesOfAyahV1[];
};

export interface GlyphCodesOfAyahV1 {
	id: number;
	verse_key: string;
	code_v1: string;
	v1_page: number;
};


export interface GlyphCodesOfAyahV2Response {
	verses: GlyphCodesOfAyahV2[];
}

export interface GlyphCodesOfAyahV2 {
	id: number;
	verse_key: string;
	code_v2: string;
	v2_page: number;
};


export interface QuranApi {
	getIndoPakScriptOfAyah: (query?: QuranQuery) => Promise<QuranResponse>;
	getUthmaniTajweedScriptOfAyah: (query?: QuranQuery) => Promise<UthmaniTajweedResponse>;
	getUthmaniScriptOfAyah: (query?: QuranQuery) => Promise<UthmaniScriptResponse>;
	getUthmaniSimpleScriptOfAyah: (query?: QuranQuery) => Promise<UthmaniSimpleScriptResponse>;
	getImlaeiSimpleTextOfAyah: (query?: QuranQuery) => Promise<ImlaeiSimpleTextResponse>;
	getASingleTranslation: (translation_id: string, query?: TranslationQuery) => Promise<SingleTranslationResponse>;
	getSingleTafsir: (tafsir_id: string, query?: TranslationQuery) => Promise<SingleTafsirResponse>;
	getGlyphCodesOfAyahV1: (query?: QuranQuery) => Promise<GlyphCodesOfAyahV1Response>;
	getGlyphCodesOfAyahV2: (query?: QuranQuery) => Promise<GlyphCodesOfAyahV2Response>;
};