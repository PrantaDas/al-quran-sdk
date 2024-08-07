import quran from "./quran";

describe("Testing the Quran APIs", () => {

  beforeEach(() => jest.clearAllMocks());

  it("Shoud fetch Indo Pak Script of Ayah", async () => {
    const res: any = await quran.getIndoPakScriptOfAyah();
    expect(res).toHaveProperty('verses');
    expect(res.meta.filters).toBeDefined();
  });

  it("Should fetch Tajweed Script of Ayah", async () => {
    const res: any = await quran.getUthmaniTajweedScriptOfAyah({ page_number: "1" });
    expect(res).toHaveProperty('meta');
    expect(res).toHaveProperty('verses');
  });


  it("Should fetch Uthmani script of ayah", async () => {
    const res: any = await quran.getUthmaniScriptOfAyah({ page_number: "1" });
    expect(res).toHaveProperty('verses');
    expect(res).toHaveProperty('meta');
  });

  it("Should fetch simple script of ayah", async () => {
    const res: any = await quran.getUthmaniSimpleScriptOfAyah({ page_number: "1" });
    expect(res).toHaveProperty('verses');
    expect(res).toHaveProperty('meta');
  });

  it("Should fetch simple text of ayah", async () => {
    const res: any = await quran.getImlaeiSimpleTextOfAyah({ page_number: "1" });
    expect(res).toHaveProperty('verses');
    expect(res).toHaveProperty('meta');
  });

  it("Should fetch a single translation", async () => {
    const res: any = await quran.getASingleTranslation('85', { page_number: '1' });
    expect(res).toHaveProperty('translations');
    expect(res).toHaveProperty('meta');
  });

  it("Should fetch a single tafsir", async () => {
    const res: any = await quran.getSingleTafsir('381', { page_number: '1' });
    expect(res).toHaveProperty('tafsirs');
    expect(res).toHaveProperty('meta');
  });

  it("Should fetch glyph codes of ayah v1", async () => {
    const res: any = await quran.getGlyphCodesOfAyahV1({ page_number: '1' });
    expect(res).toHaveProperty('verses');
    expect(res).toHaveProperty('meta');
  });

  it("Should fetch glyph codes of ayah v2", async () => {
    const res: any = await quran.getGlyphCodesOfAyahV1({ page_number: '1' });
    expect(res).toHaveProperty('verses');
    expect(res).toHaveProperty('meta');
  });

});