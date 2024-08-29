import Avatar from "@/components/Avatar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Guild } from "@/types/api/models/guild";
import { PlayerLeaderboardApiStruct } from "@/types/api/responses/leaderboard/playerLeaderBoardApiStruct";
import { formatCommasNumber, formatHMD } from "@/utils/format";
import clsx from "clsx";
import { Link } from "react-router-dom";

type GuildLeaderboardRowProps = {
  player: PlayerLeaderboardApiStruct;
  guild: Guild;
  rank: number;
  key: number;
};

const GuildLeaderboardRow = ({
  player,
  guild,
  rank,
  key,
}: GuildLeaderboardRowProps) => {
  const { session } = useAuthContext();

  return (
    <tr
      key={key}
      className={clsx(
        "text-btn-1 w-full gap-3 rounded px-2 py-1 text-center transition-colors hover:bg-zinc-500/10",
        {
          "outline outline-1 outline-secondary":
            player.player.userID === session?.player?.userID,
        },
      )}
    >
      <td>{`#${rank}`}</td>

      <td className="flex items-center justify-start gap-2 p-2 text-left">
        <Avatar
          src={player.player.user_AvatarUrl}
          name={player.player.name}
          className="h-7 min-w-7 rounded-full"
        />

        <Link
          className="min-w-64 max-w-64 truncate transition-colors hover:text-primary"
          title={player.player.name}
          to={`/player/${player.player.userID}?guild=${guild.id}`}
        >
          {player.player.name}
        </Link>
      </td>

      <td className="text-secondary">{`${formatCommasNumber(player.points)}`}</td>

      <td className="overflow-hidden" title={formatHMD(player?.player.hmd)}>
        <span className="inline-flex text-ellipsis">
          {formatHMD(player?.player.hmd)}
        </span>
      </td>
    </tr>
  );
};

export default GuildLeaderboardRow;
