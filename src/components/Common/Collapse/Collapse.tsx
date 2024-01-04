import { useRef, useState } from "react";
import clsx from "clsx";
import useClickAway from "../../../hooks/useClickAway";
import {
  faChevronDown,
  faChevronUp,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Collapse({
  label,
  image,
  defaultvalue,
  options,
  multiple,
  selectedOptions,
  setSelectedOptions,
  className,
  ...otherProps
}: {
  label?: string;
  image?: string;
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
        {image && <img src={image} />}
        <span>{multiple ? label : displayLabel}</span>
        <span>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            size="sm"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full transform overflow-hidden rounded border border-gray-700 bg-gray-800 text-btn sm:w-auto">
          {options.map((option) => (
            <div
              className={clsx(
                "min-w-max cursor-pointer px-4 py-2 hover:bg-gray-700",
                {
                  "text-primary":
                    !multiple && selectedOptions.includes(option.value),
                },
              )}
              key={option.value}
              onClick={() => handleOptionSelect(option.value, option.label)}
            >
              {multiple && (
                <FontAwesomeIcon
                  className={clsx("-translate-x-1 text-p", {
                    "text-primary": selectedOptions.includes(option.value),
                  })}
                  icon={
                    selectedOptions.includes(option.value)
                      ? faSquareCheck
                      : faSquare
                  }
                />
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
