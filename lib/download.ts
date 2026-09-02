/**
 * Utility for robust client-side file downloading and localized CV metadata.
 */

export interface CvDownloadInfo {
  href: string;
  filename: string;
  staticHref: string;
}

/**
 * Returns the exact CV download URL, target filename, and static preview URL according to the active locale.
 */
export function getCvDownloadInfo(locale: string): CvDownloadInfo {
  const isEn = locale === "en";
  return {
    href: isEn ? "/api/download?file=cv-en" : "/api/download?file=cv-fr",
    filename: isEn ? "Resume-Wassim-AHMED-EN.pdf" : "CV-Wassim-AHMED-FR.pdf",
    staticHref: isEn
      ? "/Resume-Wassim-AHMED-EN.pdf"
      : "/CV-Wassim-AHMED-FR.pdf",
  };
}

function triggerDirectAnchorDownload(url: string, filename: string): void {
  if (typeof document === "undefined") return;
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
  }, 500);
}

export async function downloadBlobFile(
  url: string,
  filename: string
): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch file: ${response.status} ${response.statusText}`
      );
    }
    const blob = await response.blob();
    if (!blob || blob.size === 0) {
      throw new Error("Received 0-byte blob");
    }

    if (
      typeof window !== "undefined" &&
      typeof window.URL?.createObjectURL === "function"
    ) {
      const blobUrl = URL.createObjectURL(blob);
      triggerDirectAnchorDownload(blobUrl, filename);
      setTimeout(() => {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch {
          // ignore
        }
      }, 1000);
      return true;
    }

    triggerDirectAnchorDownload(
      `/api/download?file=${encodeURIComponent(filename)}`,
      filename
    );
    return true;
  } catch (error) {
    console.warn("Download fallback to /api/download:", error);
    triggerDirectAnchorDownload(
      `/api/download?file=${encodeURIComponent(filename)}`,
      filename
    );
    return false;
  }
}
