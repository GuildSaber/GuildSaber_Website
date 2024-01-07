import { useAuthContext } from "@/hooks/useAuthContext";
import Guilds from "@/pages/Guilds/Guilds";
import Signin from "@/pages/Signin/Signin";

export default function Home() {
  const { session } = useAuthContext();
  return (
    <>
      {!session && <Signin />}
      {session && <Guilds />}
    </>
  );
}
