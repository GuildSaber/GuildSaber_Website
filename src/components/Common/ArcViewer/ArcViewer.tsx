import { useState, useEffect } from "react";

export default function ArcViewer({
  bsrCode,
  difficulty,
  mode,
  onClose,
}: {
  bsrCode: string;
  difficulty: string;
  mode: string;
  onClose: () => void;
}) {
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    setIframeSrc(
      `https://allpoland.github.io/ArcViewer/?id=${bsrCode}&difficulty=${difficulty}&mode=${mode}`,
    );
  }, [bsrCode, difficulty, mode]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="flex-center fixed inset-0 z-20 min-h-screen select-none bg-[#000000b0] backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <iframe
        src={iframeSrc}
        allowFullScreen
        className="m-auto h-3/4 w-3/4 rounded"
      ></iframe>
    </div>
  );
}
