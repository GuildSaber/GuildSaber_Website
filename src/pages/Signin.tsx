import BeatLeader from "@/components/Icons/BeatLeader";
import SigninProvider from "@/components/Signin/SigninProvider";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSignin } from "@/hooks/useSignin";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Signin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { signin, error } = useSignin();
  const { session } = useAuthContext();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const statusCode = searchParams.get("status");
  const message = searchParams.get("message");

  useEffect(() => {
    if (!statusCode || !token) {
      if (session) navigate("/");
      return;
    }

    signin(parseInt(statusCode), message, token);

    searchParams.delete("token");
    searchParams.delete("status");
    searchParams.delete("message");
    setSearchParams(searchParams);
  }, [searchParams]);

  return (
    <>
      <div className="flow-content-4 mt-32 text-center">
        <h1 className="text-h1 font-bold">GuildSaber</h1>
        <p className="text-h5 text-muted">
          Slash to the Rhythm, Unite in the Beat!
        </p>
        <div className="flex-center gap-4 pt-8">
          <SigninProvider provider="BeatLeader">
            <BeatLeader />
          </SigninProvider>
          <SigninProvider
            provider="Discord"
            logo={faDiscord}
            token={session?.token}
          />
        </div>
        {(error || message) && (
          <p className="font-bold text-error">
            <FontAwesomeIcon icon={faXmarkCircle} className="mr-1" />
            {error || message}
          </p>
        )}
      </div>
    </>
  );
}
