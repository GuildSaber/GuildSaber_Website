import { useState } from "react";

export function useSignin() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const signin = async (status, message, token) => {
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
