import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { session: action.payload };
        case "LOGOUT":
            return { session: null };
        case "GUILD_SELECTED":
            return {
                session: { ...state.session, selectedGuild: action.payload },
            };
        default:
            return state;
    }
}

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        session: null,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/player/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("selectedGuild");
                        dispatch({ type: "LOGOUT" });
                        return;
                    }

                    let selectedGuild = localStorage.getItem("selectedGuild");

                    if (!selectedGuild) {
                        localStorage.setItem(
                            "selectedGuild",
                            data.memberList[0]
                                ? data.memberList[0].guildID
                                : null
                        );
                    }

                    selectedGuild = localStorage.getItem("selectedGuild");

                    dispatch({
                        type: "LOGIN",
                        payload: {
                            token: token,
                            selectedGuild:
                                selectedGuild == "null" ? null : selectedGuild,
                            ...data,
                        },
                    });
                });
        }
    }, []);

    console.log("AuthContext State:", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
