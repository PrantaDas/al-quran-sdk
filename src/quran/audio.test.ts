import audio from "./audio";


describe("Fetch Chapters Audio of a Reciter", () => {

    beforeEach(() => jest.clearAllMocks());

    it("Should fetch the chapters and have a property name audio_file in the response object", async () => {
        const res = await audio.getChaptersAudioOfAReciter(2, 1);
        expect(res).toHaveProperty('audio_file');
    });

    it("Should reject with 404 error if invalid chapter_number is not correct", async () => {
        try {
            await audio.getChaptersAudioOfAReciter(2, 100000);
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});

describe("Fetch All Chapter Audio of a Reciter", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all chapters and have a property name audio_file in the response object", async () => {
        const res: any = await audio.getAllChaptersAudioOfAReciter(2);
        expect(res).toHaveProperty('audio_files');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should Reject with a 404 error if invalid id is provided", async () => {
        try {
            await audio.getAllChaptersAudioOfAReciter(2345);
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});


describe("Fetching All Recitations of a language", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch the Recitations in English if language iso code is provided as 'en'", async () => {
        const res: any = await audio.getRecitations('en');
        expect(res).toHaveProperty('languages');
        expect(res.languages).toBeInstanceOf(Array);
    });

    it("Should Reject with a error if invalid language is provided", async () => {
        try {
            await audio.getRecitations('bla-bla');
        } catch (err: any) {
            expect(err.message).toEqual("Provided language is not supported");
        }
    });
});

describe("Fetching all audio files of a recitation", () => {
    it("Should fetch all the audio files for id 2", async () => {
        const res: any = await audio.getAllAudioFilesofARecitation(2);
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('meta');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should fetch the audio files according to page number", async () => {
        const res: any = await audio.getAllAudioFilesofARecitation(2, { page_number: '10' });
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('meta');
        expect(res.audio_files).toBeInstanceOf(Array);
        expect(res.meta.filters.page_number).toEqual('10');
    });
});

describe("Fetching Ayah Recitation for specific surah", () => {
    it("Should fetch all the audio files for the specific surah", async () => {
        const res: any = await audio.getAyahRecitationsForSpecificSurah(1, 2);
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('pagination');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should reject with an error if invalid recitation_id or chapter_number is provided", async () => {
        try {
            await audio.getAyahRecitationsForSpecificSurah(12332, 100000);
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});

describe("Fetching Ayah Recitation for specific Juz", () => {
    it("Should fetch all the audio files for the specific surah", async () => {
        const res: any = await audio.getAyahRecitationsForSpecificJuz(1, 2);
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('pagination');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should reject with an error if invalid recitation_id or juz_number is provided", async () => {
        try {
            await audio.getAyahRecitationsForSpecificSurah(12332, 100000);
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});


describe("Fetching all the audio files for the specific Madani Mushaf Page", () => {
    it("Should fetch all the audio files for the specific madani mushaf page", async () => {
        const res: any = await audio.getAyahRecitationForSpecificMadaniMushafPage(1, 1);
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('pagination');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should reject with an error if invalid page_number is provided", async () => {
        try {
            await audio.getAyahRecitationForSpecificMadaniMushafPage(100000, 8907);
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});


describe("Fetching all the audio files for the specific Rubel Hizb", () => {
    it("Should fetch all the audio files for the specific specific Rubel Hizb", async () => {
        const res: any = await audio.getAyahRecitationForSpecificRubelHizb(1, 1);
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('pagination');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should reject with an error if invalid recitation_id or rub_el_hizb_number is provided", async () => {
        try {
            await audio.getAyahRecitationForSpecificRubelHizb(100000, 8907);
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});


describe("Fetching all the audio files for the specific  Hizb", () => {
    it("Should fetch all the audio files for the specific specific  Hizb", async () => {
        const res: any = await audio.getAyahRecitationForSpecificHizb(1, 1);
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('pagination');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should reject with an error if invalid recitation_id or hizb_number is provided", async () => {
        try {
            await audio.getAyahRecitationForSpecificHizb(100000, 8907);
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});

describe("Fetching all the audio files for the specific Ayah", () => {
    it("Should fetch all the audio files for the specific specific  Ayah", async () => {
        const res: any = await audio.getAyahRecitationForSpecificAyah(1, "1:2");
        expect(res).toHaveProperty('audio_files');
        expect(res).toHaveProperty('pagination');
        expect(res.audio_files).toBeInstanceOf(Array);
    });

    it("Should reject with an error if invalid recitation_id or ayah_key is provided", async () => {
        try {
            await audio.getAyahRecitationForSpecificAyah(100000, '1:300');
        } catch (err: any) {
            expect(err.message).toEqual('Request failed with status code 404');
        }
    });
});