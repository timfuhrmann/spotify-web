import React, { PropsWithChildren } from "react";
import axios from "axios";
import { SessionContext } from "@lib/context/session/index";
import { getCurrentUser } from "@lib/api/user";
import { useQuery } from "react-query";

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { data: session } = useQuery("session", async () => {
        const { data } = await axios.get("/api/auth/session");

        if (!data || !data.access_token) {
            return;
        }

        if (data.user) {
            return { ...data.user, access_token: data.access_token };
        }

        const usersProfileResponse = await getCurrentUser(data.access_token);
        return { ...usersProfileResponse, access_token: data.access_token };
    });

    return (
        <SessionContext.Provider
            value={{ session, access_token: session ? session.access_token : null }}>
            {children}
        </SessionContext.Provider>
    );
};
