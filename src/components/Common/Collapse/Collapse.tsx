import { useRef, useState } from "react";
import clsx from "clsx";
import useClickAway from "../../../hooks/useClickAway";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Collapse({
  label,
  defaultvalue,
  options,
  multiple,
  selectedOptions,
  setSelectedOptions,
  className,
  ...otherProps
}: {
  label?: string;
  defaultvalue: string;
  options: { value: string; label: string }[];
  multiple: boolean;
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState(defaultvalue);
  const clickRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useClickAway(clickRef, () => {
    setIsOpen(false);
  });

  const handleOptionSelect = (optionValue: string, optionLabel: string) => {
    console.log(optionValue, optionLabel);
    if (multiple !== true) {
      setSelectedOptions([optionValue]);
      setIsOpen(false);
      setDisplayLabel(optionLabel);
      return;
    }

    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== optionValue),
      );
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
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
        <span>{multiple ? label : displayLabel}</span>
        <span>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            size="sm"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full transform overflow-hidden rounded bg-gray-800 text-btn">
          {options.map((option) => (
            <div
              className={clsx(
                "min-w-max cursor-pointer px-4 py-2 hover:bg-gray-700",
                {
                  "bg-primary": selectedOptions.includes(option.value),
                },
              )}
              key={option.value}
              onClick={() => handleOptionSelect(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
