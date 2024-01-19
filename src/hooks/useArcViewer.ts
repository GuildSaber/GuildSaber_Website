import { useState } from "react";

export type ArcViewe0SettingsrProps = {
  bsrCode: string;
  difficulty: number;
  mode: string;
};

const useArcViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsArcViewer, setSettingsArcViewer] = useState(
    {} as ArcViewe0SettingsrProps,
  );

  const open = (data: ArcViewe0SettingsrProps) => {
    setSettingsArcViewer({
      ...data,
    });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSettingsArcViewer({} as ArcViewe0SettingsrProps);
  };

  return {
    isOpen,
    data: settingsArcViewer,
    open,
    close,
  };
};

export default useArcViewer;
