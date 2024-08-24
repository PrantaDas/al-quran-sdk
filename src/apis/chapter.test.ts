import { ListChapters } from "../interfaces";
import { chapter } from "./chapter";

describe("Fetch all the chapter according to language", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all the chapter", async () => {
        const res = await chapter.listChapters() as ListChapters;
        expect(res).toHaveProperty('chapters');
    });

    it("Shoud Throw an error if invalid language code is provided", async () => {
        try {
            await chapter.listChapters("bla-bla");
        } catch (err: any) {
            expect(err.message).toEqual('Provided language is not supported');
        }
    });
});

describe("Fetch a specific chapter according to provided chapter id and language", () => {

    beforeEach(() => jest.clearAllMocks());

    it("Should fetch the chapter when a valid id and language is provided", async () => {
        const res: any = await chapter.getChapter(1, 'ha');
        expect(res).toHaveProperty('chapter');
        expect(res.chapter).toHaveProperty('id');
        expect(res.chapter).toHaveProperty('translated_name');
    });


    it("Should throw and error if invalid chapter id provided", async () => {
        try {
            const res: any = await chapter.getChapter(3434343, 'ha');
            expect(res).toHaveProperty('status');
            expect(res.status).toEqual(404);
            expect(res.error).toEqual('Surah number or slug is invalid. Please select valid slug or surah number from 1-114.');
        } catch (err: any) {
            console.log(err.response);
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});


describe("Fetching the chapter info", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch the chapter info according to the chapter id and language provided", async () => {
        const res: any = await chapter.getChapterInfo(1, 'ha');
        expect(res).toHaveProperty('chapter_info');
        expect(res.chapter_info).toHaveProperty('id');
        expect(res.chapter_info).toHaveProperty('text');
        expect(res.chapter_info.language_name).toEqual('english');
    });

    it("Should throw and error if invalid chapter id provided", async () => {
        try {
            const res: any = await chapter.getChapterInfo(3434343, 'ha');
            expect(res).toHaveProperty('status');
            expect(res.status).toEqual(404);
            expect(res.error).toEqual('Surah number or slug is invalid. Please select valid slug or surah number from 1-114.');
        } catch (err: any) {
            console.log(err.response);
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });

});