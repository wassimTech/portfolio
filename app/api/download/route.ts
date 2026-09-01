import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const fileMap: Record<
  string,
  { filename: string; downloadName: string; contentType: string }
> = {
  "cv-fr": {
    filename: "CV-Wassim-AHMED-FR.pdf",
    downloadName: "CV-Wassim-AHMED-FR.pdf",
    contentType: "application/pdf",
  },
  "cv-en": {
    filename: "Resume-Wassim-AHMED-EN.pdf",
    downloadName: "Resume-Wassim-AHMED-EN.pdf",
    contentType: "application/pdf",
  },
  "cv-md": {
    filename: "CV-Wassim-AHMED.md",
    downloadName: "CV-Wassim-AHMED.md",
    contentType: "text/markdown; charset=utf-8",
  },
  "CV-Wassim-AHMED-FR.pdf": {
    filename: "CV-Wassim-AHMED-FR.pdf",
    downloadName: "CV-Wassim-AHMED-FR.pdf",
    contentType: "application/pdf",
  },
  "Resume-Wassim-AHMED-EN.pdf": {
    filename: "Resume-Wassim-AHMED-EN.pdf",
    downloadName: "Resume-Wassim-AHMED-EN.pdf",
    contentType: "application/pdf",
  },
  "CV-Wassim-AHMED.md": {
    filename: "CV-Wassim-AHMED.md",
    downloadName: "CV-Wassim-AHMED.md",
    contentType: "text/markdown; charset=utf-8",
  },
  "CV-tech-Wassim-AHMED-.pdf": {
    filename: "CV-Wassim-AHMED-FR.pdf",
    downloadName: "CV-Wassim-AHMED-FR.pdf",
    contentType: "application/pdf",
  },
  "Resume-tech-Wassim-AHMED-EN.pdf": {
    filename: "Resume-Wassim-AHMED-EN.pdf",
    downloadName: "Resume-Wassim-AHMED-EN.pdf",
    contentType: "application/pdf",
  },
  "CV-tech-Wassim-AHMED-.md": {
    filename: "CV-Wassim-AHMED.md",
    downloadName: "CV-Wassim-AHMED.md",
    contentType: "text/markdown; charset=utf-8",
  },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileKey = searchParams.get("file") || "cv-fr";

    const target = fileMap[fileKey] || fileMap["cv-fr"];

    // Edge-compatible redirect to the static asset in public/
    const staticUrl = new URL(`/${target.filename}`, req.url);
    return NextResponse.redirect(staticUrl, 307);
  } catch (error) {
    console.error("Download route error:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
