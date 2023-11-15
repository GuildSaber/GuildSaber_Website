import "./Guilds.scss";
import Main from "../../components/Main/Main";
import Card from "../../components/Guilds/Card";
import { useEffect, useState } from "react";
import List from "../../components/List/List";
import Filters from "../../components/List/Filters";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Loader from "../../components/Common/Loader/Loader";
import Collapse from "../../components/Common/Collapse/Collapse";

const PAGE_SIZE = 2;

const FILTER_GUILD_TYPES = [
    { value: 1, label: "Unverified" },
    { value: 2, label: "Verified" },
    { value: 4, label: "Featured" },
    { value: 8, label: "Private" },
];

const FILTER_SORT_BY_VALUES = [
    { value: "Popularity", label: "Popularity" },
    { value: "Name", label: "Name" },
    { value: "CreationDate", label: "Creation Date" },
    { value: "MapCount", label: "Map Count" },
    { value: "MemberCount", label: "Member Count" },
];

export default function Guilds() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({
        guildTypes: [0, 1, 2, 4],
        "sort-By": "Popularity",
        order: "Desc",
    });

    const getGuilds = async (page = 1, filter) => {
        const parsefilter = {
            ...filter,
            guildTypes: filter.guildTypes.reduce((acc, v) => acc + v, 0),
        };
        const URLParams = new URLSearchParams(parsefilter).toString();
        console.log(URLParams);
        return fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/guilds?page=${page}&pageSize=${PAGE_SIZE}&${URLParams}`
        ).then((res) => res.json());
    };

    const {
        data: guilds,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["guilds", currentPage, filter],
        queryFn: () => getGuilds(currentPage, filter),
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        console.log(filter.guildType);
    }, [filter.guildType]);

    if (isLoading) {
        return <Loader className="page" />;
    }

    if (isError) {
        return <p>Error</p>;
    }

    return (
        <Main>
            <List
                totalCount={guilds.totalCount}
                pageSize={PAGE_SIZE}
                hasPreviousPage={guilds.hasPreviousPage}
                hasNextPage={guilds.hasNextPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            >
                <Filters>
                    <Collapse
                        defaultvalue={FILTER_SORT_BY_VALUES[0].label}
                        options={FILTER_SORT_BY_VALUES}
                        style={{ width: "180px" }}
                        selectedOptions={filter["sort-By"]}
                        setSelectedOptions={(value) =>
                            setFilter({ ...filter, "sort-By": value })
                        }
                    />
                    <Collapse
                        label="Guild Type"
                        multiple
                        options={FILTER_GUILD_TYPES}
                        style={{ width: "180px" }}
                        selectedOptions={filter.guildTypes}
                        setSelectedOptions={(value) =>
                            setFilter({ ...filter, guildTypes: value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Search"
                        style={{ marginLeft: "auto", width: "180px" }}
                    />
                </Filters>

                {guilds?.data.map((guild, key) => (
                    <Card key={key} guildData={guild} />
                ))}
            </List>
        </Main>
    );
}
