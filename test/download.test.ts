import { describe, it, expect, vi, beforeEach } from "vitest";
import { downloadBlobFile, getCvDownloadInfo } from "@/lib/download";

describe("getCvDownloadInfo", () => {
  it("returns French CV download info for French locale", () => {
    const info = getCvDownloadInfo("fr");
    expect(info.href).toBe("/api/download?file=cv-fr");
    expect(info.filename).toBe("CV-Wassim-AHMED-FR.pdf");
    expect(info.staticHref).toBe("/CV-Wassim-AHMED-FR.pdf");
  });

  it("returns English Resume download info for English locale", () => {
    const info = getCvDownloadInfo("en");
    expect(info.href).toBe("/api/download?file=cv-en");
    expect(info.filename).toBe("Resume-Wassim-AHMED-EN.pdf");
    expect(info.staticHref).toBe("/Resume-Wassim-AHMED-EN.pdf");
  });

  it("defaults to French CV for other locales like Arabic", () => {
    const info = getCvDownloadInfo("ar");
    expect(info.href).toBe("/api/download?file=cv-fr");
    expect(info.filename).toBe("CV-Wassim-AHMED-FR.pdf");
  });
});

describe("downloadBlobFile", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches file and triggers object URL download successfully", async () => {
    const mockBlob = new Blob(["mock pdf content"], {
      type: "application/pdf",
    });
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });

    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    globalThis.URL.createObjectURL = vi
      .fn()
      .mockReturnValue("blob:http://localhost/test-uuid");
    globalThis.URL.revokeObjectURL = vi.fn();

    const result = await downloadBlobFile(
      "/CV-Wassim-AHMED-FR.pdf",
      "CV-Wassim-AHMED-FR.pdf"
    );

    expect(result).toBe(true);
    expect(globalThis.fetch).toHaveBeenCalledWith("/CV-Wassim-AHMED-FR.pdf");
    expect(clickSpy).toHaveBeenCalled();
    expect(globalThis.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
  });

  it("falls back to direct anchor download if fetch fails", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    const result = await downloadBlobFile("/non-existent.pdf", "test.pdf");

    expect(result).toBe(false);
    expect(clickSpy).toHaveBeenCalled();
  });
});
