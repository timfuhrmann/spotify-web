export const getAppUrl = () => {
    const variable = process.env.NEXT_PUBLIC_APP_URL;

    if (!variable) {
        throw new Error("NEXT_PUBLIC_APP_URL is undefined");
    }

    return variable;
};

export const getMainScrollStage = (): HTMLElement | null => {
    if (typeof window === "undefined") {
        return null;
    }

    return document.querySelector(".main-scrollbar .os-viewport");
};

export const getTotalSongsString = (totalSongs: number) => {
    if (totalSongs === 1) {
        return "1 song";
    }

    return `${totalSongs} songs`;
};
