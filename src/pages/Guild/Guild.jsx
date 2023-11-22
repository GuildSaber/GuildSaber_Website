import { useParams } from "react-router-dom";
import GuildHeader from "../../components/Guild/GuildHeader";
import GuildMapCard from "../../components/Guild/GuildMapCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";

export default function Guild() {
  let { guildID } = useParams();

  const {
    data: guild,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guilds", guildID],
    queryFn: () => getGuild(guildID),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });

  console.log(guild);

  const getGuild = (guildID) => {
    return fetch(
      `${import.meta.env.VITE_API_BASE_URL}/guild/by-id/${guildID}`,
    ).then((res) => res.json());
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <>
        <GuildHeader guildData={guild} />

        <div className="flow-content-2 md:flow-content-4">
          <h3 className="text-h4 font-bold text-center md:text-left">
            New Ranked Maps
          </h3>
          <GuildMapCard
            description={
              "Omagawd hey guuyyss. This is my first map pls enjoy.\nDon't dislike it. Oke bye uwu"
            }
            id={1}
          />
          <GuildMapCard
            description={
              "Omagawd hey guuyyss. This is my first map pls enjoy.\nDon't dislike it. Oke bye uwu"
            }
            id={2}
          />
        </div>
      </>
    </div>
  );
}
