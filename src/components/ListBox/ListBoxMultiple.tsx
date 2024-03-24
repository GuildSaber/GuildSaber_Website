import { useAlingBounding } from "@/hooks/useAlingBounding";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type ListBoxMultipleProps = {
  label: string;
  options: {
    value: string | number;
    label: string | number;
    image?: string;
  }[];
  selected?: {
    value: string | number;
    label: string;
    image?: string;
  };
  values: (string | number)[];
  onChange: (value: any) => void;
};

export default function ListBoxMultiple({
  label,
  options,
  selected,
  values,
  onChange,
}: ListBoxMultipleProps) {
  const [selectedOption, setSelectedOption] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useAlingBounding(menuRef, isOpen);

  useEffect(() => {
    let option: any = null;

    if (values) {
      option = options.filter((obj) => values.includes(obj.value));
    } else if (selected) {
      option = selected;
    } else {
      option = [];
    }

    setSelectedOption(option);
  }, [values]);

  return (
    <div className="relative" onClick={() => setIsOpen((prev) => !prev)}>
      <Listbox value={selectedOption} onChange={onChange} multiple>
        <Listbox.Button className="btn inline-flex justify-between !gap-4 !bg-gray-800">
          <div className="flex items-center gap-2">{label}</div>

          <FontAwesomeIcon
            className="transition-all ui-open:rotate-180"
            icon={faChevronDown}
            size="sm"
          />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-2 w-full transform overflow-hidden rounded border border-gray-700 bg-gray-800 text-btn sm:w-auto">
          {options.map((option) => (
            <Listbox.Option
              className="min-w-max cursor-pointer px-4 py-2 hover:bg-gray-700"
              key={option.label}
              value={option}
            >
              {({ selected }) => (
                <div className="flex items-center gap-2">
                  <>
                    <FontAwesomeIcon
                      icon={selected ? faSquareCheck : faSquare}
                      className={clsx({ "text-primary": selected })}
                    />
                    {option.label}
                  </>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
