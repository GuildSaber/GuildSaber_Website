import { useState } from "react";

export function useSignin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signin = async (
    status: number,
    message: string | null,
    token: string | null,
  ) => {
    setLoading(true);
    setError(null);

    if (status !== 200) {
      setLoading(false);
      if (message != null) setError(message);
    }

    if (token != null) {
      localStorage.setItem("token", token);
    }

    setLoading(false);
  };

  return { signin, loading, error };
}
