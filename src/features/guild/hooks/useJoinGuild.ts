import { EJoinState } from "@/enums/guild";
import { useAuthContext } from "@/hooks/useAuthContext";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { joinGuild } from "../utils/api";

const useJoinGuild = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();

  return useMutation({
    mutationFn: (guildID: number) => joinGuild(guildID),
    onSuccess: (data) => {
      console.log(data);
      if (!data) {
        toast.error("Failed to join guild");
        return;
      }

      switch (data.state) {
        case EJoinState.Joined:
          toast.success("Successfully joined");
          break;

        case EJoinState.Requested:
          toast.success("Successfully requested");
          break;
      }

      dispatch({ type: "GUILD_ADD", payload: data });
      queryClient.invalidateQueries({
        queryKey: ["guilds", ...queryKey],
      });
    },
    onError: () => {
      toast.error("Failed to join guild");
    },
  });
};
export default useJoinGuild;
