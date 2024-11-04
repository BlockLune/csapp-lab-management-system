"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { downloadMaterial } from "@/scripts/api";

export default function DownloadMaterial({
  labId,
  fileName,
  showFileName = false,
}: {
  labId: string;
  fileName: string;
  showFileName?: boolean;
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await downloadMaterial(labId, fileName);
    setDownloading(false);
  };

  return (
    <Button
      variant="ghost"
      loading={downloading}
      style={{ cursor: downloading ? "not-allowed" : "pointer" }}
      disabled={downloading}
      onClick={handleDownload}
    >
      {downloading
        ? "Downloading..."
        : showFileName
        ? `Download ${fileName}`
        : "Download"}
    </Button>
  );
}
