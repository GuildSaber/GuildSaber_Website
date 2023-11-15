import "./Signin.scss";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSignin } from "../../hooks/useSignin";
import Main from "../../components/Main/Main";
import BLLogo from ".././../assets/BL-Logo.png";
import DiscordLogo from "../../assets/discord.svg";
import Provider from "../../components/Signin/Provider";
import { useAuthContext } from "../../hooks/useAuthContext";

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
        <div className="signin">
            <Main>
                <h1>Login</h1>

                <div className="providers">
                    <Provider provider="BeatLeader" logo={BLLogo} />
                    <Provider
                        provider="Discord"
                        logo={DiscordLogo}
                        token={token ? token : null}
                    />
                </div>
                <p>{error}</p>
            </Main>
        </div>
    );
}
