import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useNavigation = () => {
    const { events, push, isReady, asPath } = useRouter();
    const [forthCounter, setForthCounter] = useState<number>(0);
    const [backCounter, setBackCounter] = useState<number>(0);
    const [history, setHistory] = useState<string[]>([]);

    const hasBack = backCounter < forthCounter + history.length - 1;
    const hasForth = forthCounter < backCounter;

    useEffect(() => {
        if (!isReady || history.length > 0) {
            return;
        }

        setHistory([asPath]);
    }, [isReady, history]);

    useEffect(() => {
        const onRouteChange = (path: string) => {
            if (history[0] === path) {
                return;
            } else if (history[1] === path && hasBack) {
                setHistory(([path, ...rest]) => [...rest, path]);
                setBackCounter(counter => counter + 1);
            } else if (history[history.length - 1] === path && hasForth) {
                setHistory(prevHistory => [...prevHistory.slice(-1), ...prevHistory.slice(0, -1)]);
                setForthCounter(counter => counter + 1);
            } else {
                setHistory(prevHistory => [
                    path,
                    ...prevHistory.slice(
                        0,
                        backCounter ? forthCounter + backCounter * -1 : undefined
                    ),
                ]);

                setBackCounter(0);
                setForthCounter(0);
            }
        };

        events.on("routeChangeComplete", onRouteChange);
        return () => events.off("routeChangeComplete", onRouteChange);
    }, [events, history]);

    const navigateBack = async () => {
        if (!hasBack) {
            return;
        }

        return push(history[1]);
    };

    const navigateForth = () => {
        if (!hasForth) {
            return;
        }
        return push(history[history.length - 1]);
    };

    return {
        hasBack,
        hasForth,
        navigateBack,
        navigateForth,
    };
};
