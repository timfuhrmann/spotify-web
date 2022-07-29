import { ParsedUrlQuery } from "querystring";

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

export const createArray = (length: number) => {
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(i);
    }

    return arr;
};
