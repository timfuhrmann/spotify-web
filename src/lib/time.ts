export const msToMinutesAndSeconds = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = parseInt(((ms % 60000) / 1000).toFixed(0));

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const dateToTimeString = (date: string): string => {
    const objDate = new Date(date);
    return objDate.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
