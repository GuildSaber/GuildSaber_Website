import { EPassState } from "@/enums/api/models/passState";
import { GUILD_FILTER_PASS_STATE } from "@/features/guild/utils/constants";
import { useAlingBounding } from "@/hooks/useAlingBounding";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useAlingBounding(menuRef, isOpen);

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
    <div className="relative" onClick={() => setIsOpen((prev) => !prev)}>
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
            className="transition-all ui-open:rotate-180"
            icon={faChevronDown}
            size="sm"
          />
        </Listbox.Button>
        <Listbox.Options
          ref={menuRef}
          className="absolute z-10 mt-2 min-w-full transform overflow-hidden rounded border border-gray-700 bg-gray-800 text-btn"
        >
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
