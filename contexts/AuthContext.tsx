import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    accessToken: string | null;
    userId: string | null;
    setAccessToken: (accessToken: string | null) => void;
    setUserId: (userId: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
    accessToken: null,
    setAccessToken: () => {},
    userId: null,
    setUserId: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedUserId = localStorage.getItem("id");
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }

        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, userId, setAccessToken, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
