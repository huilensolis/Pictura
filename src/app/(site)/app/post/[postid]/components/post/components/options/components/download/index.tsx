"use client";

import { PlainButton } from "@/components/ui/buttons/plain";
import { downloadImage } from "@/services/images/download";
import { Download } from "lucide-react";
import { useState } from "react";

export function DownloadPostImage({ image_url }: { image_url: string }) {
  const [loading, setLoading] = useState<boolean>(false);

  async function download() {
    setLoading(true);
    await downloadImage(image_url);
    setLoading(false);
  }

  return (
    <PlainButton
      onClick={download}
      isLoading={loading}
      className="px-2 py-2  dark:hover:brightness-125 hover:brightness-90 transition-all duration-75 bg-neutral-300 dark:bg-neutral-700"
    >
      <Download className="text-neutral-800 dark:text-neutral-300" />
    </PlainButton>
  );
}
