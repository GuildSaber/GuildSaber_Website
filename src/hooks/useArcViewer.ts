import { useState } from "react";

export type ArcViewerSettingsProps = {
  bsrCode: string;
  difficulty: number;
  mode: string;
};

const useArcViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsArcViewer, setSettingsArcViewer] = useState(
    {} as ArcViewerSettingsProps,
  );

  const open = (data: ArcViewerSettingsProps) => {
    setSettingsArcViewer({
      ...data,
    });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSettingsArcViewer({} as ArcViewerSettingsProps);
  };

  return {
    isOpen,
    data: settingsArcViewer,
    open,
    close,
  };
};

export default useArcViewer;
