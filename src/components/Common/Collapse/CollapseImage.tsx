import { useRef, useState } from "react";
import clsx from "clsx";
import useClickAway from "@/hooks/useClickAway";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CollapseImageProps = {
  label?: string;
  defaultvalue: string | number;
  options: { value: number; label: string; image: string }[];
  selectedOption: number;
  setSelectedOption: (guildID: number) => void;
  className?: string;
};

export default function CollapseImage({
  label,
  defaultvalue,
  options,
  selectedOption,
  setSelectedOption,
  className,
  ...otherProps
}: CollapseImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useClickAway(clickRef, () => {
    setIsOpen(false);
  });

  const handleOptionSelect = (option: {
    value: number;
    label: string;
    image: string;
  }) => {
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={clickRef} className="relative select-none" {...otherProps}>
      <button
        className={clsx(
          "btn inline-flex justify-between !gap-4 !bg-gray-800",
          className,
        )}
        onClick={handleToggle}
      >
        <img
          src={options.find((option) => option.value === selectedOption)?.image}
          className="aspect-square h-6 rounded-full"
        />
        <span>
          {options.find((option) => option.value === selectedOption)?.label}
        </span>
        <span>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            size="sm"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-48 w-full transform overflow-hidden overflow-y-auto rounded border border-gray-700 bg-gray-800 text-btn sm:w-auto">
          {options.map((option) => (
            <div
              className={clsx(
                "flex min-w-max cursor-pointer gap-2 px-4 py-2 hover:bg-gray-700",
                {
                  "text-primary": selectedOption === option.value,
                },
              )}
              key={option.value}
              onClick={() => handleOptionSelect(option)}
            >
              <img
                src={option.image}
                className="aspect-square h-6 rounded-full"
              />

              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
