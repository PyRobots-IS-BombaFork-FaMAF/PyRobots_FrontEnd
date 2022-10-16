import { createContext, useState, Context, Dispatch, SetStateAction } from "react"

export type auth = { username?: string, password?: string, access_token?: string }

const AuthContext: Context<{ auth: auth, setAuth: Dispatch<SetStateAction<{}>> }>
    = createContext({ auth: {}, setAuth: (_) => { } });

export function AuthProvider({ children }: { children: JSX.Element }) {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;