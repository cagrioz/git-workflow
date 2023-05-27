import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
    accessToken: null,
    setAccessToken: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);

    return <AuthContext.Provider value={{ accessToken, setAccessToken }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
