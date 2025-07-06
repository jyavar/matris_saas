import { Download } from "lucide-react";
import React from "react";

export function DownloadButton() {
  const fileUrl = "http://cdn.badtz-ui.com/downloads/stripe-shader.zip";

  return (
    <a
      href={fileUrl}
      download
      className="h-9 px-2.5 rounded-md bg-sidebar/70 hover:bg-siderbar transition-colors text-foreground flex items-center gap-3 text-sm w-min whitespace-nowrap border border-sidebar mt-4"
    >
      <Download size={16} />
      stripe-gradient.zip
    </a>
  );
}
