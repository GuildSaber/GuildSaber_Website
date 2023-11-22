import { useAuthContext } from "../../hooks/useAuthContext";
import Guilds from "../Guilds/Guilds";
import Signin from "../Signin/Signin";

export default function Home() {
  const { session } = useAuthContext();
  return (
    <>
      {!session && <Signin />}
      {session && <Guilds />}
    </>
  );
}
