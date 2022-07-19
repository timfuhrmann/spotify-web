export const getAppUrl = () => {
    const variable = process.env.NEXT_PUBLIC_APP_URL;

    if (!variable) {
        throw new Error("NEXT_PUBLIC_APP_URL is undefined");
    }

    return variable;
};

export const formatNumber = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getMainScrollStage = (): HTMLElement | null => {
    if (typeof window === "undefined") {
        return null;
    }

    return document.querySelector(".main-scrollbar .os-viewport");
};
