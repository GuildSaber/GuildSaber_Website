import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ArcViewerSettingsProps } from "@/hooks/useArcViewer";
import useClickAway from "@/hooks/useClickAway";
import { formatDifficulty } from "@/utils/format";

type ArcViewerProps = {
  isOpen: boolean;
  data: ArcViewerSettingsProps;
  open: (settings: ArcViewerSettingsProps) => void;
  close: () => void;
};

export default function ArcViewer({ settings }: { settings: ArcViewerProps }) {
  const [iframeSrc, setIframeSrc] = useState("");
  const clickRef = useRef(null);

  useEffect(() => {
    setIframeSrc(
      `https://allpoland.github.io/ArcViewer/?id=${
        settings.data.bsrCode
      }&difficulty=${formatDifficulty[settings.data.difficulty]}&mode=${
        settings.data.mode
      }`,
    );
  }, [settings.data.bsrCode, settings.data.difficulty, settings.data.mode]);

  useClickAway(clickRef, () => settings.close());

  if (!settings.isOpen) {
    return;
  }

  return createPortal(
    <div className="flex-center fixed inset-0 z-20 min-h-screen select-none bg-[#000000b0] backdrop-blur-md">
      <iframe
        ref={clickRef}
        src={iframeSrc}
        allowFullScreen
        className="m-auto h-3/4 w-3/4 rounded"
      ></iframe>
    </div>,
    document.body,
  );
}
