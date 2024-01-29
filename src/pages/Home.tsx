import { useAuthContext } from "@/hooks/useAuthContext";
import Guilds from "@/pages/Guilds";
import Signin from "@/pages/Signin";

export default function Home() {
  const { session } = useAuthContext();
  return (
    <>
      {!session && <Signin />}
      {session && <Guilds />}
    </>
  );
}
