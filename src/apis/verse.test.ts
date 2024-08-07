import { verse } from "./verse";

describe("Fetching verses by chapter number", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch verses by chapter number", async () => {
        const res: any = await verse.getVerseByChapter('1');
        expect(res).toHaveProperty('verses');
        expect(res).toHaveProperty('pagination');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await verse.getVerseByChapter('101839');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching verses by page number", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch verses by page number", async () => {
        const res: any = await verse.getVerseByPage('1');
        expect(res).toHaveProperty('verses');
        expect(res).toHaveProperty('pagination');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await verse.getVerseByPage('101839');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching verses by juz number", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch verses by juz number", async () => {
        const res: any = await verse.getVerseByJuz('1');
        expect(res).toHaveProperty('verses');
        expect(res).toHaveProperty('pagination');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await verse.getVerseByJuz('101839');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching verses by hizb number", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch verses by hizb number", async () => {
        const res: any = await verse.getVerseByHizbNumber('1');
        expect(res).toHaveProperty('verses');
        expect(res).toHaveProperty('pagination');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await verse.getVerseByHizbNumber('101839');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching verses by rub el hizb number", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch verses by rub el hizb number", async () => {
        const res: any = await verse.getVerseByRubElHizbNumber('1');
        expect(res).toHaveProperty('verses');
        expect(res).toHaveProperty('pagination');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await verse.getVerseByRubElHizbNumber('101839');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching a specific verse by verse key", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch a specific verse by verse key", async () => {
        const res: any = await verse.getSpecificVerseByVerseKey('1:1');
        expect(res).toHaveProperty('verse');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await verse.getSpecificVerseByVerseKey('101839:1');
        expect(res).toHaveProperty('status');
        expect(res.status).toEqual(404);
    });
});

describe("Fetching a random ayah", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch a random ayah", async () => {
        const res: any = await verse.getRandomAyah();
        expect(res).toHaveProperty('verse');
    });

    it("Should return a response with 404 status code", async () => {
        const res: any = await verse.getRandomAyah();
        expect(res).toHaveProperty('verse');
        expect(res.verse).toHaveProperty('id');
        expect(res.verse).toHaveProperty('verse_number');
    });
});
