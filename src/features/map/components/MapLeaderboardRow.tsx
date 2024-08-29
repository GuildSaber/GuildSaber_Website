import Avatar from "@/components/Avatar";
import BLReplayViewer from "@/components/BLReplayViewer";
import Button from "@/components/Button";
import { useAuthContext } from "@/hooks/useAuthContext";
import useBLReplayViewer from "@/hooks/useBLReplayViewer";
import { Player } from "@/types/api/models/player";
import { RankedScore } from "@/types/api/models/rankedTypes";
import { RankedMapResponse } from "@/types/api/responses/rankedMapApiStruct";
import {
  formatAccuracy,
  formatCommasNumber,
  formatHMD,
  formatModifiers,
} from "@/utils/format";
import { faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link } from "react-router-dom";

type MapLeaderboardRowProps = {
  map: RankedMapResponse["rankedMap"];
  player: Player;
  rankedScore: RankedScore;
  pageSense: string;
  animKey: number;
  key: number;
};

const MapLeaderboardRow = ({
  map,
  player,
  rankedScore,
  pageSense,
  animKey,
  key,
}: MapLeaderboardRowProps) => {
  const { session } = useAuthContext();
  const blReplay = useBLReplayViewer();
  const maxScore =
    map.rankedMapVersions![0]?.songDifficulty?.songDifficultyStats?.maxScore ||
    0;
  const blReplayId = rankedScore.score?.bL_ScoreID;

  const onPlayClick = () => {
    if (!blReplayId) {
      return;
    }

    blReplay.open(blReplayId);
  };

  return (
    <tr
      key={key}
      style={{
        animationDelay: `calc(40ms * ${animKey})`,
        animationName: pageSense === "next" ? "slide-in" : "slide-out",
      }}
      className={clsx(
        "anim-slide rounded transition-colors hover:bg-zinc-500/10",
        {
          "outline outline-1 outline-secondary":
            player.userID === session?.player?.userID,
        },
      )}
    >
      <td className="p-2 text-btn ">{`#${rankedScore.rank}`}</td>

      <td className="flex items-center justify-start gap-2 p-2 text-left">
        <Avatar
          src={player.user_AvatarUrl}
          name={player.name}
          className="h-7 min-w-7 rounded-full"
        />

        <Link
          className="min-w-64 max-w-64 truncate transition-colors hover:text-primary"
          title={player.name}
          to={`/player/${player.userID}`}
        >
          {player.name}
        </Link>
      </td>

      <td>
        <Button
          className={clsx("btn btn-tritary", {
            "pointer-events-none opacity-50": !blReplayId,
          })}
          icon={faPlay}
          onClick={onPlayClick}
        />
      </td>

      <td className="p-2 text-secondary">
        {`${rankedScore.rawPoints.toFixed(2)}`}
      </td>
      <td className="p-2">
        {rankedScore.score?.modifiers ? (
          formatModifiers(rankedScore.score.modifiers)
        ) : (
          <FontAwesomeIcon icon={faXmark} />
        )}
      </td>

      <td
        className="overflow-hidden whitespace-nowrap p-2"
        title={formatHMD(rankedScore.score?.hmd)}
      >
        <span className="inline-flex text-ellipsis">
          {formatHMD(rankedScore.score?.hmd)}
        </span>
      </td>

      <td className="p-2">
        {(!!rankedScore.score?.hasTrackers
          ? rankedScore.score.winTracker?.totalPauseDuration
          : "??") + "s"}
      </td>

      <td className="p-2">
        {formatAccuracy(rankedScore.score?.baseScore, maxScore)}
      </td>

      <td className="p-2">{formatCommasNumber(rankedScore.effectiveScore)}</td>

      <BLReplayViewer settings={blReplay} />
    </tr>
  );
};

export default MapLeaderboardRow;
