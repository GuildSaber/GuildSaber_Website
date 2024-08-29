import { RankedMap } from "@/types/api/models/rankedTypes";
import { formatMapRequirements } from "../utils/format";

type MapRequirementsProps = {
  requirements: RankedMap["requirements"];
};

const MapRequirements = ({ requirements }: MapRequirementsProps) => {
  const parsedRequirements = formatMapRequirements(requirements);

  return (
    <div className="mb-8 mt-8 w-full overflow-hidden rounded bg-gray-800 p-8">
      <h3 className="mb-4 line-clamp-1 text-center text-h4 font-bold md:text-left">
        Requirements
      </h3>

      <div className="flex w-full flex-wrap justify-center gap-2 md:justify-start">
        {Object.entries(parsedRequirements).map(([key, value]) => (
          <span key={key} className="badge badge-split">
            <span>{key}</span>
            <span>{value}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MapRequirements;
