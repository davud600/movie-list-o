import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import MoviesProvider from "~/MoviesContext";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <MoviesProvider>
            <Component {...pageProps} />
        </MoviesProvider>
    );
};

export default api.withTRPC(MyApp);
