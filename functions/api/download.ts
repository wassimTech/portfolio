const fileMap: Record<string, string> = {
  "cv-fr": "/CV-Wassim-AHMED-FR.pdf",
  "cv-en": "/Resume-Wassim-AHMED-EN.pdf",
  "cv-md": "/CV-Wassim-AHMED.md",
  "CV-Wassim-AHMED-FR.pdf": "/CV-Wassim-AHMED-FR.pdf",
  "Resume-Wassim-AHMED-EN.pdf": "/Resume-Wassim-AHMED-EN.pdf",
  "CV-Wassim-AHMED.md": "/CV-Wassim-AHMED.md",
  "CV-tech-Wassim-AHMED-.pdf": "/CV-Wassim-AHMED-FR.pdf",
  "Resume-tech-Wassim-AHMED-EN.pdf": "/Resume-Wassim-AHMED-EN.pdf",
  "CV-tech-Wassim-AHMED-.md": "/CV-Wassim-AHMED.md",
};

export async function onRequestGet(context: {
  request: Request;
}): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const fileKey = url.searchParams.get("file") || "cv-fr";
    const targetFile = fileMap[fileKey] || "/CV-Wassim-AHMED-FR.pdf";

    const redirectUrl = new URL(targetFile, context.request.url);
    return Response.redirect(redirectUrl.toString(), 307);
  } catch (error) {
    console.error("Download function error:", error);
    return new Response("Error downloading file", { status: 500 });
  }
}
