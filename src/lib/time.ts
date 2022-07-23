export const msToMinutesAndSeconds = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = parseInt(((ms % 60000) / 1000).toFixed(0));

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const dateToTimeString = (date: string): string => {
    const objDate = new Date(date);

    const diff = Date.now() - Date.parse(date);
    const diffInMinutes = Math.ceil(diff / 1000 / 60);
    const diffInHours = Math.ceil(diff / 1000 / 60 / 60);
    const diffInDays = Math.ceil(diff / 1000 / 60 / 60 / 24);

    if (diffInMinutes < 60) {
        return diffInMinutes > 1 ? `${diffInMinutes} minutes ago` : "1 minute ago";
    } else if (diffInHours < 24) {
        return diffInHours > 1 ? `${diffInHours} hours ago` : `${diffInHours} hour ago`;
    } else if (diffInDays < 31) {
        return diffInDays > 1 ? `${diffInDays} days ago` : `${diffInDays} day ago`;
    }

    return objDate.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
