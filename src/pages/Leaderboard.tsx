import GuildLeaderboard from "@/features/guild/components/GuildLeaderboard";
import { useGuildPoints } from "@/features/guild/hooks/useGuildPoints";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

export default function Leaderboard() {
  const { guildID } = useParams();

  if (!guildID) {
    return;
  }

  const { data: points, isError: isPointsError } = useGuildPoints(guildID);

  if (isPointsError || !points?.length) {
    return (
      <div className="w-full text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-h1" />
        <h3 className="text-h3">No guild found</h3>
      </div>
    );
  }

  return <GuildLeaderboard points={points} />;
}
