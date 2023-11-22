import { useEffect } from "react";

const useClickAway = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback]);
};

export default useClickAway;
