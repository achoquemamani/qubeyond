export { }
import exportCsv from "./exportCsv";

describe('ExportCsv.ts', () => {
  test('Test simple text', () => {
    const { wrapCsvValue } = exportCsv();
    expect(wrapCsvValue("Test content")).toBe("Test content");
  });

  test('Test text with special character', () => {
    const { wrapCsvValue } = exportCsv();
    expect(wrapCsvValue("Weateher, word")).toBe("Weateher - word");
  });

  test('Test get content', () => {
    const { getContent } = exportCsv();
    expect(getContent([{ label: "Name", field: "name" }], [{
      name: "Pedro"
    }])).toBe(`Name\r\nPedro`);
  });
})
