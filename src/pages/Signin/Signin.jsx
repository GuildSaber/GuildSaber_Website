import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSignin } from "../../hooks/useSignin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Provider from "../../components/Signin/Provider";
import { useAuthContext } from "../../hooks/useAuthContext";
import BeatLeader from "../../components/Icons/BeatLeader";

export default function Signin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { signin, error } = useSignin();
  const { token } = useAuthContext();

  useEffect(() => {
    const token = searchParams.get("token");
    const statusCode = searchParams.get("status");
    const message = searchParams.get("message");

    if (!statusCode && !message) {
      return;
    }

    signin(parseInt(statusCode), message, token);

    searchParams.delete("token");
    searchParams.delete("status");
    searchParams.delete("message");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, signin]);

  return (
    <>
      <div className="text-center flow-content-4 mt-32">
        <h1 className="text-h1 font-bold">GuildSaber</h1>
        <p className="text-muted text-h5">
          Slash to the Rhythm, Unite in the Beat!
        </p>
        <div className="flex-center gap-4 pt-8">
          <Provider provider="BeatLeader" logo={BeatLeader} />
          <Provider
            provider="Discord"
            logo={() => <FontAwesomeIcon icon={faDiscord} />}
            token={token ? token : null}
          />
        </div>
        <p>{error}</p>
      </div>
    </>
  );
}
