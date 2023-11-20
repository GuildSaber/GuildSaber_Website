import "./Collapse.scss";
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
                selectedOptions.filter((value) => value !== optionValue)
            );
        } else {
            setSelectedOptions([...selectedOptions, optionValue]);
        }
    };

    return (
        <div
            ref={clickRef}
            className={clsx(["collapse", className])}
            {...otherProps}
        >
            <button onClick={handleToggle} className="common-text">
                {multiple ? label : displayLabel}
                <FontAwesomeIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                    size="sm"
                />
            </button>

            {isOpen && (
                <div className="menu common-text">
                    {options.map((option) => (
                        <div
                            className={clsx({
                                option: true,
                                active: selectedOptions.includes(option.value),
                            })}
                            key={option.value}
                            onClick={() =>
                                handleOptionSelect(option.value, option.label)
                            }
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
