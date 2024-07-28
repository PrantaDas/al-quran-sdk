import resources from "./resource";

describe("Fetching the recitation by id", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch the recitation info of a specific recitaion", async () => {
        const res: any = await resources.getRecitationInfo('1');
        expect(res).toHaveProperty('info');
        expect(res.info).toHaveProperty('id');
        expect(res.info).toHaveProperty('info');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await resources.getRecitationInfo('101839');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching the translation info by translation_id", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch the translation info of a specific recitaion by translation_id", async () => {
        const res: any = await resources.getTranslationInfo('23');
        expect(res).toHaveProperty('info');
        expect(res.info).toHaveProperty('id');
        expect(res.info).toHaveProperty('info');
        expect(res.info.info).toBeNull();
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await resources.getTranslationInfo('101839');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching all translations info by language", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all translations info by language", async () => {
        const res: any = await resources.getTranslations('ha');
        expect(res).toHaveProperty('translations');
    });

    it("Should reject with a error if an invalid language iso code is provided", async () => {
        try {
            const res: any = await resources.getTranslations('abcd');
        } catch (err: any) {
            expect(err.message).toEqual('Provided language is not supported');
        }
    });
});

describe("Fetching all tafsirs info by language", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all tafsirs info by language", async () => {
        const res: any = await resources.getTafsirs('ha');
        expect(res).toHaveProperty('tafsirs');
    });

    it("Should reject with a error if an invalid language iso code is provided", async () => {
        try {
            const res: any = await resources.getTafsirs('abcd');
        } catch (err: any) {
            expect(err.message).toEqual('Provided language is not supported');
        }
    });
});

describe("Fetching tafsir info by tafsir_id", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch tafsir info by tafsir_id", async () => {
        const res: any = await resources.getTafsirInfo('381');
        expect(res).toHaveProperty('info');
        expect(res.info).toHaveProperty('id');
        expect(res.info.id).toBe(381);
        expect(res.info.info).toBe("");
    });

    it("Should reject with a error if an invalid tafsir_id is provided", async () => {
        const res: any = await resources.getTafsirInfo('1');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
        expect(res.error).toBe('Tafsir not found');
    });
});

describe("Fetching all recitation styles", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all recitation styles", async () => {
        const res: any = await resources.getRecitationStyles();
        expect(res).toHaveProperty('recitation_styles');
        expect(res.recitation_styles).toHaveProperty('mujawwad');
        expect(res.recitation_styles).toHaveProperty('murattal');
        expect(res.recitation_styles).toHaveProperty('muallim');
    });
});

describe("Fetching all languages", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all languages", async () => {
        const res: any = await resources.getLanguages();
        expect(res).toHaveProperty('languages');;
        expect(res.languages).toBeInstanceOf(Array);
    });
});

describe("Fetching all Chapter infos", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all Chapter infos", async () => {
        const res: any = await resources.getChapterInfos();
        expect(res).toHaveProperty('chapter_infos');;
        expect(res.chapter_infos).toBeInstanceOf(Array);
    });
});

describe("Fetching all Media verses", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all Media verses", async () => {
        const res: any = await resources.getVerseMedias();
        expect(res).toHaveProperty('verse_media');;
        expect(res.verse_media).toBeInstanceOf(Array);
    });
});