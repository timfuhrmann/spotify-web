import React, { PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";
import { Session, SessionContext } from "@lib/context/session/index";
import { getCurrentUser } from "@lib/api/user";

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        handleUserSession();
    }, []);

    const handleUserSession = async () => {
        const { data } = await axios.get("/api/auth/session");

        if (!data || !data.access_token) {
            return;
        }

        if (data.user) {
            setSession({ ...data.user, access_token: data.access_token });
            return;
        }

        const usersProfileResponse = await getCurrentUser(data.access_token);
        setSession({ ...usersProfileResponse, access_token: data.access_token });
    };

    return (
        <SessionContext.Provider
            value={{ session, access_token: session ? session.access_token : null }}>
            {children}
        </SessionContext.Provider>
    );
};
