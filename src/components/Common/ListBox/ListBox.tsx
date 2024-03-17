import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";

type ListBoxProps = {
  options: { value: string | number; label: string | number; image?: string }[];
  selected?: { value: string | number; label: string | number; image?: string };
  value: string | number;
  onChange: (value: any) => void;
};

export default function ListBox({
  options,
  selected,
  value,
  onChange,
}: ListBoxProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    let option: any = null;

    if (value) {
      option = options.find((o) => o.value === value);
    } else if (selected) {
      option = selected;
    } else {
      option = options[0];
    }

    setSelectedOption(option);
  }, [value]);

  return (
    <div className="relative">
      <Listbox value={selectedOption} onChange={onChange}>
        <Listbox.Button className="btn inline-flex justify-between !gap-4 !bg-gray-800">
          <div className="flex items-center gap-2">
            {selectedOption?.image && (
              <img
                src={selectedOption?.image}
                className="aspect-square h-6 rounded-full"
              />
            )}

            {selectedOption?.label}
          </div>

          <FontAwesomeIcon
            className="ui-open:rotate-180 transition-all"
            icon={faChevronDown}
            size="sm"
          />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-2 w-full max-w-64 transform overflow-hidden rounded border border-gray-700 bg-gray-800 text-btn sm:w-auto">
          {options.map((option) => (
            <Listbox.Option
              className="min-w-max cursor-pointer overflow-hidden px-4 py-2 hover:bg-gray-700"
              key={option.label}
              value={option}
            >
              <div className="flex max-w-56 items-center gap-2">
                {option?.image && (
                  <img
                    src={option?.image}
                    className="aspect-square h-6 rounded-full"
                  />
                )}
                <p className="line-clamp-2">{option.label}</p>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
