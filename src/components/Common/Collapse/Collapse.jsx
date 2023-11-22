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
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState(defaultvalue);
  const clickRef = useRef();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useClickAway(clickRef, () => {
    setIsOpen(false);
  });

  const handleOptionSelect = (optionValue, optionLabel) => {
    if (!multiple) {
      setSelectedOptions(optionValue);
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
    <div
      ref={clickRef}
      className={clsx(["relative select-none", className])}
      {...otherProps}
    >
      <button
        className="inline-flex !bg-gray-800 !gap-4 btn"
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
        <div className="transform left-1/2 -translate-x-1/2 absolute rounded text-btn z-10 bg-gray-800 overflow-hidden">
          {options.map((option) => (
            <div
              className={clsx(
                "px-4 py-2 hover:bg-gray-700 min-w-max cursor-pointer",
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
