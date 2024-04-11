import Loader from "@/components/Loader";
import {
  faCircleExclamation,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

import GuildHeader from "@/features/guild/components/GuildHeader";
import GuildLeaderboard from "@/features/guild/components/GuildLeaderboard";
import { GuildRankedMaps } from "@/features/guild/components/GuildRankedMaps";
import { useGuild } from "@/features/guild/hooks/useGuild";
import clsx from "clsx";

export default function Guild({ tab }: { tab?: string }) {
  const { guildID } = useParams();
  if (!guildID) {
    return <p>Error</p>;
  }

  const { data: guild, isLoading, isError } = useGuild(guildID);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || guild == null) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="text-h1" />
        <h3 className="text-h3">Guild not found</h3>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col">
      <GuildHeader guildData={guild} />

      <div className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-between">
        <h3 className="my-4 flex items-center gap-3 text-center text-h6 font-bold md:text-left md:text-h4">
          <FontAwesomeIcon icon={faCubes} className="h-5" />
          Categories
        </h3>
        <div className="inline-flex flex-wrap self-center overflow-hidden break-words rounded bg-gray-800 text-center md:mb-2 md:self-end">
          <Link
            className={clsx("px-4 py-2 hover:bg-gray-700", {
              "bg-primary hover:bg-primary/80": !tab || tab === "rankedMaps",
            })}
            to={`/guild/${guildID}`}
          >
            Ranked Maps
          </Link>

          <Link
            className={clsx("px-4 py-2 hover:bg-gray-700", {
              "bg-primary hover:bg-primary/80": tab === "leaderboard",
            })}
            to={`/guild/${guildID}/leaderboard`}
          >
            Leaderboard
          </Link>
        </div>
      </div>

      {tab === "leaderboard" && <GuildLeaderboard guild={guild} />}

      {!tab || (tab === "rankedMaps" && <GuildRankedMaps guild={guild} />)}
    </div>
  );
}

/*
<div className="mb-2 inline-flex self-center overflow-hidden rounded bg-gray-800">
        {tabsComponent.map((tab, index) => (
          <Link
            className={clsx("px-4 py-2 hover:bg-gray-700", {
              "bg-primary hover:bg-primary/80": tabID === index,
            })}
            to={tab.path}
            key={index}
          >
            {tab.label}
          </Link>
        ))}
      </div>
*/
