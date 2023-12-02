import useClickAway from "../../../hooks/useClickAway";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ArcViewer({
  bsrCode,
  difficulty,
  mode,
  onClose,
}: {
  bsrCode: string;
  difficulty: number;
  mode: string;
  onClose: () => void;
}) {
  const [iframeSrc, setIframeSrc] = useState("");
  const clickRef = useRef(null);

  useEffect(() => {
    setIframeSrc(
      `https://allpoland.github.io/ArcViewer/?id=${bsrCode}&difficulty=${difficulty}&mode=${mode}`,
    );
  }, [bsrCode, difficulty, mode]);

  useClickAway(clickRef, () => onClose());

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
