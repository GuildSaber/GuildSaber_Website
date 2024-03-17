import { GUILD_FILTER_PASS_STATE } from "@/constants";
import { EPassState } from "@/enums/api/models/passState";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";

type MapPassStateProps = {
  selected?: {
    value: EPassState;
    label: string;
    color: string;
  };
  value: string | number;
  onChange: (value: any) => void;
};

export default function MapPassState({
  selected,
  value,
  onChange,
}: MapPassStateProps) {
  const [selectedOption, setSelectedOption] = useState(
    GUILD_FILTER_PASS_STATE[0],
  );

  useEffect(() => {
    let option = null;

    if (value) {
      option =
        GUILD_FILTER_PASS_STATE.find((o) => o.value === value) ||
        GUILD_FILTER_PASS_STATE[0];
    } else if (selected) {
      option = selected;
    } else {
      option = GUILD_FILTER_PASS_STATE[0];
    }

    setSelectedOption(option);
  }, [value]);

  return (
    <div className="relative">
      <Listbox value={selectedOption} onChange={onChange}>
        <Listbox.Button className="btn inline-flex justify-between !gap-4 !bg-gray-800">
          <div className="flex items-center gap-2">
            <div
              className="aspect-square h-4 rounded-full"
              style={{ backgroundColor: selectedOption?.color }}
            ></div>
            {selectedOption?.label}
          </div>

          <FontAwesomeIcon
            className="ui-open:rotate-180 transition-all"
            icon={faChevronDown}
            size="sm"
          />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-2 w-full transform overflow-hidden rounded border border-gray-700 bg-gray-800 text-btn sm:w-auto">
          {GUILD_FILTER_PASS_STATE.map((option) => (
            <Listbox.Option
              className="min-w-max cursor-pointer px-4 py-2 hover:bg-gray-700"
              key={option.label}
              value={option}
            >
              <div className="flex items-center gap-2">
                <div
                  className="aspect-square h-4 rounded-full"
                  style={{ backgroundColor: option.color }}
                ></div>
                {option.label}
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
