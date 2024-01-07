export default function SigninProvider({
  provider,
  returnURL = window.location.href,
  logo,
  token,
}: {
  provider: string;
  returnURL?: string;
  logo: any;
  token?: string;
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
      <button type="submit" className="btn btn-primary bg-gray-800">
        {logo()}
        Sign up with {provider}
      </button>
    </form>
  );
}
