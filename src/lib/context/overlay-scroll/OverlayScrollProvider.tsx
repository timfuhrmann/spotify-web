import OverlayScrollbars from "overlayscrollbars";
import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { OverlayScrollContext } from "@lib/context/overlay-scroll/index";

export const OverlayScrollProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { events } = useRouter();
    const instanceRef = useRef<OverlayScrollbars | null>(null);

    const initOverlayScrollbars = useCallback((ref: OverlayScrollbarsComponent | null) => {
        if (!ref) {
            return;
        }

        instanceRef.current = ref.osInstance();
    }, []);

    useEffect(() => {
        const onRouteChange = () => {
            document.body.style.setProperty("--scroll", "0");
        };

        events.on("routeChangeComplete", onRouteChange);
        return () => events.off("routeChangeComplete", onRouteChange);
    }, []);

    const stopScroll = () => {
        if (!instanceRef.current) {
            return;
        }

        instanceRef.current.options({ overflowBehavior: { y: "hidden" } });
    };

    const resumeScroll = () => {
        if (!instanceRef.current) {
            return;
        }

        instanceRef.current.options({ overflowBehavior: { y: "scroll" } });
    };

    const onScroll = (e: UIEvent | undefined) => {
        if (!e || !e.target) {
            return;
        }

        const target = e.target as HTMLElement;
        const scroll = target.scrollTop;

        const x = Math.max(0, Math.min(1, (scroll - 100) / 100));
        document.body.style.setProperty("--scroll", x.toString());
    };

    return (
        <OverlayScrollContext.Provider
            value={{ initOverlayScrollbars, stopScroll, resumeScroll, onScroll }}>
            {children}
        </OverlayScrollContext.Provider>
    );
};

export const withOverlayScroll = <T,>(WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithProvider = (props: T) => {
        return (
            <OverlayScrollProvider>
                <WrappedComponent {...props} />
            </OverlayScrollProvider>
        );
    };

    ComponentWithProvider.displayName = `withOverlayScroll(${displayName})`;

    return ComponentWithProvider;
};
