import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import useClickAway from "@/hooks/useClickAway";

type BLReplayViewerType = {
  isOpen: boolean;
  scoreId: number;
  open: (scoreID: number) => void;
  close: () => void;
};

const BLReplayViewer = ({ settings }: { settings: BLReplayViewerType }) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const clickRef = useRef(null);

  useEffect(() => {
    setIframeSrc(`https://replay.beatleader.xyz/?scoreId=${settings.scoreId}`);
  }, [settings.scoreId]);

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
};

export default BLReplayViewer;
