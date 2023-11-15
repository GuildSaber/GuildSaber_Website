import "./Collapse.scss";
import arrow from "../../../assets/arrow.svg";
import { useRef, useState } from "react";
import clsx from "clsx";
import useClickAway from "../../../hooks/useClickAway";

export default function Collapse({
    label,
    defaultvalue,
    options,
    multiple,
    selectedOptions,
    setSelectedOptions,
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
        <div ref={clickRef} className="collapse" {...otherProps}>
            <button onClick={handleToggle} className="common-text">
                {multiple ? label : displayLabel}
                <img
                    src={arrow}
                    onClick={handleToggle}
                    className={clsx({ arrow: true, open: isOpen })}
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
