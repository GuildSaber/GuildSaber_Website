import { useEffect } from "react";

export const useAlingBounding = (
  elementRef: React.RefObject<any>,
  isOpen: boolean,
) => {
  useEffect(() => {
    const dropdownElement = elementRef.current;

    if (dropdownElement) {
      const dropdownRect = dropdownElement.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - dropdownRect.right;
      const spaceOnLeft = dropdownRect.left;

      if (spaceOnRight < 0 && spaceOnLeft >= 0) {
        dropdownElement.style.left = "auto";
        dropdownElement.style.right = "0";
      }
    }
  }, [isOpen]);
};
