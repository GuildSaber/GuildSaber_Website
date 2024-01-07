import { useCallback, useEffect, useState, useRef } from "react";
import "./MultiRangeSilder.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickAway from "@/hooks/useClickAway";
import { formatMinSec } from "@/utils/format";

const MultiRangeSlider = ({
  min,
  max,
  icon,
  color = "#fff",
  minutes,
  onChange,
  className,
}: {
  min: number;
  max: number;
  icon: any;
  color?: string;
  className?: string;
  minutes?: boolean;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const clickRef = useRef<HTMLDivElement>(null);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLInputElement>(null);

  useClickAway(clickRef, () => {
    setIsOpen(false);
  });

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent, isOpen]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent, isOpen]);

  return (
    <div ref={clickRef} className="MultiRangeSlider relative select-none">
      <button
        className={clsx(
          "btn inline-flex justify-between !gap-4 !bg-gray-800",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon className="icon mr-2" fill={color} icon={icon} />
          {minutes
            ? `${formatMinSec(minVal)} - ${formatMinSec(maxVal)}`
            : `${minVal} - ${maxVal}`}
        </p>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 h-full transform overflow-hidden rounded border border-gray-700 bg-gray-800 p-5 pb-6 text-btn">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            ref={minValRef}
            onChange={(event) => {
              const value = Math.min(+event.target.value, maxVal - 1);
              setMinVal(value);
              event.target.value = value.toString();
            }}
            onMouseUp={() => onChange({ min: minVal, max: maxVal })}
            onTouchEnd={() => onChange({ min: minVal, max: maxVal })}
            className={clsx("thumb thumb--zindex-3", {
              "thumb--zindex-5": minVal > max - 100,
            })}
            style={{ "--color": color } as React.CSSProperties}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            ref={maxValRef}
            onChange={(event) => {
              const value = Math.max(+event.target.value, minVal + 1);
              setMaxVal(value);
              event.target.value = value.toString();
            }}
            onMouseUp={() => onChange({ min: minVal, max: maxVal })}
            onTouchEnd={() => onChange({ min: minVal, max: maxVal })}
            className="thumb thumb--zindex-4"
            style={{ "--color": color } as React.CSSProperties}
          />

          <div className="slider">
            <div className="slider__track" />
            <div
              ref={range}
              className="slider__range"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiRangeSlider;
