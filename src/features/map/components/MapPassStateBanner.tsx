import { EModifiers } from "@/enums/api/models/modifiers";
import { EPassState } from "@/enums/api/models/passState";
import { GUILD_FILTER_PASS_STATE } from "@/features/guild/utils/constants";
import { RankedScore } from "@/types/api/models/rankedTypes";
import { hexToRGB } from "@/utils/color";
import { formatAccuracy, formatModifiers } from "@/utils/format";

type MapPassStateBannerProps = {
  rankedScore: RankedScore;
  maxScore: number;
};

export const MapPassStateBanner = ({
  rankedScore,
  maxScore,
}: MapPassStateBannerProps) => {
  const passStateColor = GUILD_FILTER_PASS_STATE.find(
    (passState) =>
      (passState.value & rankedScore!.state) !== 0 &&
      passState.value !== EPassState.All,
  )!.color;

  const passStateColorRGB = hexToRGB(passStateColor.split("#")[1]);

  return (
    <div
      className="flex items-center gap-2 rounded-b-md border-2 px-2 py-1"
      style={{
        backgroundColor: `rgba(${passStateColorRGB.toString()}, 0.30)`,
        borderColor: passStateColor,
      }}
    >
      <p className="text-btn">
        <span className="font-semibold">#{rankedScore.rank}</span>
        {" | "}
        {formatAccuracy(rankedScore.score?.baseScore, maxScore)}
        {(rankedScore.score?.modifiers as EModifiers) !== EModifiers.None &&
          " - " + formatModifiers(rankedScore.score?.modifiers!).toString()}
      </p>
    </div>
  );
};
