import List from "@/components/List";
import ListBox from "@/components/ListBox/ListBox";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import { EJoinState } from "@/enums/api/models/joinState";
import { EPermission } from "@/enums/api/models/permission";
import { useGuildMember } from "@/features/guild/hooks/useGuildMember";
import {
  GUILD_JOIN_STATES,
  GUILD_MEMBER_PAGE_SIZE,
  GUILD_SORT_BY_JOIN_STATES,
} from "@/features/guild/utils/constants";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getFlagStrings } from "@/utils/flag";
import {
  faCheck,
  faCircleXmark,
  faEllipsis,
  faEraser,
  faGavel,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useSearchParamsState } from "react-use-search-params-state";
import { Fragment } from "react/jsx-runtime";
import { useDebounceValue } from "usehooks-ts";

const Member = () => {
  const { session } = useAuthContext();
  const { guildID } = useParams();
  const queryClient = useQueryClient();

  const [params, setParams] = useSearchParamsState({
    page: { type: "number", default: 1 },
    state: { type: "number", default: 0 },
  });

  const [search, setSearch] = useDebounceValue("", 500);

  if (!guildID) {
    return;
  }

  const {
    data: members,
    isLoading,
    isFetching,
  } = useGuildMember({
    guildID: parseInt(guildID, 10),
    page: params.page,
    pageSize: GUILD_MEMBER_PAGE_SIZE,
    search,
    state: params.state,
  });

  const updateState = ({
    userID,
    state,
  }: {
    userID: number;
    state: EJoinState;
  }) =>
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/members/set-state/${guildID}/${userID}?state=${state}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.error(data.detail);
          return;
        }

        if (state === EJoinState.Removed) {
          toast.success("Successfully removed member");
        } else {
          toast.success("Successfully updated member state");
        }

        queryClient.invalidateQueries({
          queryKey: ["guilds", parseInt(guildID), "member", params.page],
        });
      });

  useEffect(() => setParams({ page: 1 }), [search]);

  if (isLoading) {
    return <Loader />;
  }

  if (!members) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleXmark} className="mb-4 text-h1" />
        <h3 className="text-h3">Unauthorized</h3>
      </div>
    );
  }

  return (
    <List
      totalCount={members.totalCount}
      pageSize={GUILD_MEMBER_PAGE_SIZE}
      hasPreviousPage={members.hasPreviousPage}
      hasNextPage={members.hasNextPage}
      currentPage={params.page}
      setCurrentPage={(page) => {
        setParams({ page });
      }}
      isLoading={isFetching}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <ListBox
            options={GUILD_SORT_BY_JOIN_STATES}
            value={params.state}
            onChange={(option) => setParams({ state: option.value })}
          />
          <SearchBar
            className="ml-auto w-full sm:w-auto"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-fullgap-2 grid grid-cols-[6fr_4fr_10fr_2fr] gap-2 px-1 py-2 text-btn">
          <p>Name</p>
          <p>State</p>
          <p>Permissions</p>
          <p className="text-right">Action</p>
        </div>

        {members.data.map((member) => (
          <div
            key={member.userID}
            className="grid w-full grid-cols-[6fr_4fr_10fr_2fr] items-center gap-2 rounded bg-gray-800 p-1 text-btn"
          >
            <Link to={`/player/${member.userID}`}>
              <p>{member.username}</p>
            </Link>
            <p>
              {member.state === EJoinState.Joined
                ? "Accepted"
                : GUILD_JOIN_STATES[member.state]}
            </p>
            <p>
              {getFlagStrings(member.permissions, EPermission).join(", ") ||
                "None"}
            </p>
            <div className="text-right">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="aspect-square rounded-full px-2 hover:bg-black/80">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 grid w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-gray-800 px-1 shadow-lg ring-1 ring-gray-700 focus:outline-none">
                    {member.state === EJoinState.Requested && (
                      <div>
                        <Menu.Item>
                          <button
                            className="hover:blac group my-1 flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-primary"
                            onClick={() =>
                              updateState({
                                userID: member.userID,
                                state: EJoinState.Joined,
                              })
                            }
                          >
                            Accept
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="group my-1 flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-red-600"
                            onClick={() =>
                              updateState({
                                userID: member.userID,
                                state: EJoinState.Refused,
                              })
                            }
                          >
                            Refuse
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </Menu.Item>
                      </div>
                    )}
                    <div>
                      <Menu.Item>
                        <button
                          className="group my-1 flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-red-600"
                          onClick={() =>
                            updateState({
                              userID: member.userID,
                              state:
                                member.state === EJoinState.Banned
                                  ? EJoinState.Joined
                                  : EJoinState.Banned,
                            })
                          }
                        >
                          {member.state === EJoinState.Banned ? "Unban" : "Ban"}
                          <FontAwesomeIcon icon={faGavel} />
                        </button>
                      </Menu.Item>
                      {member.state !== EJoinState.Requested && (
                        <Menu.Item>
                          <button
                            className="group my-1 flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-red-600"
                            onClick={() =>
                              updateState({
                                userID: member.userID,
                                state: EJoinState.Removed,
                              })
                            }
                          >
                            Kick
                            <FontAwesomeIcon icon={faEraser} />
                          </button>
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        ))}
      </div>
    </List>
  );
};

export default Member;
