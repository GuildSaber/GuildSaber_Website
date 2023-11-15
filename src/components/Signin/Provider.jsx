import "./Provider.scss";

export default function Provider({
    provider,
    returnURL = window.location.href,
    logo,
    token,
}) {
    return (
        <form
            className={`provider ${provider}`}
            method="post"
            action="https://api-dev.guildsaber.com/signin"
        >
            <input type="hidden" name="Provider" value={provider} />
            <input type="hidden" name="ReturnUrl" value={returnURL} />
            {token && <input type="hidden" name="Bearer" value={token} />}
            <button type="submit" className="provider common-text">
                <div className="content">
                    <img src={logo} />
                    <p>
                        Connect with{" "}
                        <span style={{ textTransform: "capitalize" }}>
                            {provider}
                        </span>
                    </p>
                </div>
            </button>
        </form>
    );
}
