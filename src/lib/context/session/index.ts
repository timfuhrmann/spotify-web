import { createContext, useContext } from "react";

export interface Session {
    access_token: string;
}

interface SessionContextData {
    session: Session | null;
    access_token: string | null;
}

export const SessionContext = createContext<SessionContextData>({} as SessionContextData);

export const useSession = () => useContext(SessionContext);
