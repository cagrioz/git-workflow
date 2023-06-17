import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@app/contexts/AuthContext";
import SnackbarProvider from "react-simple-snackbar";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <SnackbarProvider>
                <Component {...pageProps} />
            </SnackbarProvider>
        </AuthProvider>
    );
}
