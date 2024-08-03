import { useState } from "react";

export type BLReplayViewerProps = {
  scoreId: number;
};

const useBLReplayViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scoreId, setScoreId] = useState(0);

  const open = (scoreId: number) => {
    setScoreId(scoreId);
    setIsOpen(true);
  };

  const close = () => {
    setScoreId(0);
    setIsOpen(false);
  };

  return {
    isOpen,
    scoreId,
    open,
    close,
  };
};

export default useBLReplayViewer;
