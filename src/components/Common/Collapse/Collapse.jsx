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
        className="btn inline-flex !gap-4 !bg-gray-800"
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
        <div className="absolute left-1/2 z-10 -translate-x-1/2 transform overflow-hidden rounded bg-gray-800 text-btn">
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
