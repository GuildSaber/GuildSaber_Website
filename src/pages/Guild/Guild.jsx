import { useParams } from "react-router-dom";
import "./Guild.scss";
import Header from "../../components/Guild/GuildHeader";
//import { useEffect, useState } from "react";
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

    const getGuild = (guildID) => {
        return fetch(
            `${import.meta.env.VITE_API_BASE_URL}/guild/by-id/${guildID}`
        ).then((res) => res.json());
    };

    if (isLoading) {
        return <Loader className="page" />;
    }

    if (isError) {
        return <p>Error</p>;
    }

    return (
        <div className="guildPage">
            <>
                <Header guildData={guild} />

                <div className="main">
                    <h3>New Ranked Maps</h3>
                    <GuildMapCard />
                </div>
            </>
        </div>
    );
}
