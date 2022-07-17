import React, { PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";
import { Session, SessionContext } from "@lib/context/session/index";

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        axios.get<Session>("/api/auth/session").then(res => {
            setSession(res.data);
        });
    }, []);

    return (
        <SessionContext.Provider
            value={{ session, access_token: session ? session.access_token : null }}>
            {children}
        </SessionContext.Provider>
    );
};
