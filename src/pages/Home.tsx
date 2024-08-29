import { useAuthContext } from "@/hooks/useAuthContext";
import Guilds from "@/pages/Guilds";
import Signin from "@/pages/Signin";

const Home = () => {
  const { session } = useAuthContext();
  return (
    <>
      {!session && <Signin />}
      {session && <Guilds />}
    </>
  );
};

export default Home;
