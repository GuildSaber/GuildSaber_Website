import { useState } from "react";

export function useSignin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signin = async (
    status: number,
    message: string | null,
    token: string,
  ) => {
    setLoading(true);
    setError(null);

    if (status !== 200) {
      setLoading(false);
      setError(message);
    }

    if (status === 200) {
      localStorage.setItem("token", token);
      setLoading(false);
    }
  };

  return { signin, loading, error };
}
