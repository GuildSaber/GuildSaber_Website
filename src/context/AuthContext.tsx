import { ReactNode, createContext, useEffect, useReducer } from "react";
import { AuthState, MemberList } from "../types/api/auth";

type AuthAction =
  | { type: "LOGIN"; payload: AuthState["session"] }
  | { type: "LOGOUT" }
  | { type: "GUILD_SELECTED"; payload: string }
  | { type: "GUILD_ADD"; payload: MemberList };

export interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return { session: action.payload };
    case "LOGOUT":
      return { session: null };
    case "GUILD_SELECTED":
      return {
        session: { ...state.session, selectedGuild: action.payload },
      };
    case "GUILD_ADD": {
      const newMemberList = state.session?.memberList;

      if (!newMemberList) return state;

      return {
        session: {
          ...state.session,
          memberList: newMemberList.concat(action.payload),
        },
      };
    }
    default:
      return state;
  }
}

interface AuthContextProviderProps {
  children: ReactNode;
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    session: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/player/@me`, {
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
            localStorage.setItem("selectedGuild", "null");
          }

          selectedGuild = localStorage.getItem("selectedGuild");

          dispatch({
            type: "LOGIN",
            payload: {
              token: token,
              selectedGuild: selectedGuild == "null" ? null : selectedGuild,
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
