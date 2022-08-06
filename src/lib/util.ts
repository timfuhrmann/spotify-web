import { ParsedUrlQuery } from "querystring";
import { RepeatMode } from "@lib/redux/reducer/player";

export const getAppUrl = () => {
    const variable = process.env.NEXT_PUBLIC_APP_URL;

    if (!variable) {
        throw new Error("NEXT_PUBLIC_APP_URL is undefined");
    }

    return variable;
};

export const getTotalSongsString = (totalSongs: number): string => {
    if (totalSongs === 1) {
        return "1 song";
    }

    return `${totalSongs} songs`;
};

export const getIdFromQuery = ({ id }: ParsedUrlQuery): string | undefined => {
    if (!id) {
        return;
    }
    if (typeof id !== "string") {
        throw new TypeError("Id must be a string");
    }

    return id;
};

export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
    return Object.keys(obj) as (keyof Obj)[];
};

export const createArray = (length: number) => {
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(i);
    }

    return arr;
};

export const pathnameFromAsPath = (asPath: string) => {
    return asPath.split(/[?#]/)[0] || asPath;
};

export const idFromUri = (uri: string): string => {
    return uri.split(":").slice(-1).join("");
};

export const repeatModeFromPlaybackSdk = (state: 0 | 1 | 2): RepeatMode => {
    switch (state) {
        case 0:
            return "off";
        case 1:
            return "context";
        case 2:
            return "track";
    }
};
