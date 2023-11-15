import { useParams } from "react-router-dom";
import "./Guild.scss";
import Header from "../../components/Guild/Header";
//import { useEffect, useState } from "react";
import Card from "../../components/Guild/Card";
import Map from "../../components/Guild/Map";
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
        <div className="guild">
            <>
                <Header guildData={guild} />

                <div className="main">
                    <Card
                        contentClass="maps"
                        title="Recent Ranked Map change"
                        color={guild.color}
                        style={{ flex: "4 1" }}
                    >
                        <Map />
                        <Map />
                        <Map />
                        <Map />
                    </Card>

                    <Card
                        contentClass="side"
                        title="Stats"
                        color={guild.color}
                        style={{ flex: "1 1" }}
                    />
                </div>
            </>
        </div>
    );
}
