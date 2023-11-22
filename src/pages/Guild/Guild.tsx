import { useParams } from "react-router-dom";
import GuildHeader from "../../components/Guild/GuildHeader";
import GuildMapCard from "../../components/Guild/GuildMapCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";
import { GuildAPIResponse, GuildAPIResponseSchema } from "../../types/api";

export default function Guild() {
  const { guildID } = useParams();
  if (!guildID) {
    return <p>Error</p>;
  }

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

  const getGuild = async (guildID: string): Promise<GuildAPIResponse> => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/guild/by-id/${guildID}`,
    );
    const payLoad = await res.json();
    const validationResponse = GuildAPIResponseSchema.safeParse(payLoad);
    if (!validationResponse.success) {
      console.error(validationResponse.error);
      return payLoad;
    } else {
      return validationResponse.data as GuildAPIResponse;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <>
        {guild && <GuildHeader guildData={guild} />}

        <div className="flow-content-2 md:flow-content-4">
          <h3 className="text-center text-h4 font-bold md:text-left">
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
