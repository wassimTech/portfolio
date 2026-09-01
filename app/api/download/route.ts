import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    const filePath = path.join(process.cwd(), "public", target.filename);
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found on server", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": target.contentType,
        "Content-Disposition": `attachment; filename="${target.downloadName}"`,
        "Content-Length": fileBuffer.byteLength.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Download route error:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
