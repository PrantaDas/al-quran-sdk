import { juz } from "./juz";

describe("Fetch all the juzs", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should fetch all the juzs", async () => {
        const res = await juz.getAllJuzs();
        expect(res).toHaveProperty('juzs');
    });
});