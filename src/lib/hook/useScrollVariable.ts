import { useRouter } from "next/router";
import { useEffect } from "react";

export const useScrollVariable = () => {
    const { events } = useRouter();

    useEffect(() => {
        const onRouteChange = () => {
            document.body.style.setProperty("--scroll", "0");
        };

        events.on("routeChangeComplete", onRouteChange);
        return () => events.off("routeChangeComplete", onRouteChange);
    }, []);

    return (e: UIEvent | undefined) => {
        if (!e || !e.target) {
            return;
        }

        const target = e.target as HTMLElement;
        const scroll = target.scrollTop;

        const x = Math.max(0, Math.min(1, (scroll - 100) / 100));
        document.body.style.setProperty("--scroll", x.toString());
    };
};
