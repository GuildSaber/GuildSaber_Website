import { PropsWithChildren } from "react";
import Button from "../Common/Button";

type SigninProviderProps = {
  provider: string;
  returnURL?: string;
  logo?: any;
  token?: string;
};

export default function SigninProvider({
  provider,
  returnURL = window.location.href,
  children,
  logo,
  token,
}: PropsWithChildren<SigninProviderProps>) {
  return (
    <form
      className={`provider ${provider}`}
      method="post"
      action="https://api-dev.guildsaber.com/signin"
    >
      <input type="hidden" name="Provider" value={provider} />
      <input type="hidden" name="ReturnUrl" value={returnURL} />

      {token && <input type="hidden" name="Bearer" value={token} />}

      <Button type="submit" className="btn-primary bg-gray-800" icon={logo}>
        {children}
        Sign up with {provider}
      </Button>
    </form>
  );
}
