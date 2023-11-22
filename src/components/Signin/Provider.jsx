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
      <button type="submit" className="btn bg-gray-800 btn-primary">
        {logo()}
        Sign up with {provider}
      </button>
    </form>
  );
}
