import React, {
    createContext,
    MutableRefObject,
    PropsWithChildren,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import { OpenerProps } from "./Opener";
import { useAudioPlayer } from "@lib/hook/useAudioPlayer";
import { SpotifyImage } from "@lib/image";

export interface SpotifyTrackObjectCustomized extends SpotifyApi.TrackObjectFull {
    artists: SpotifyApi.ArtistObjectFull[];
}

interface OpenerContextData {
    wrapperRef: MutableRefObject<HTMLDivElement | null>;
    active: number;
    track: SpotifyTrackObjectCustomized;
    tracks: SpotifyTrackObjectCustomized[];
    hovered: boolean;
    setHovered: (value: boolean) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    jumpToTrack: (index: number) => void;
    playing: boolean;
    toggleAudio: () => void;
}

const OpenerContext = createContext<OpenerContextData>({} as OpenerContextData);

const OpenerWrapper = styled.div``;

const InvisibleImages = styled.div`
    visibility: hidden;
    max-height: 0;
    overflow: hidden;
`;

export const OPENER_DELAY = 5000;

export const OpenerProvider: React.FC<PropsWithChildren<OpenerProps>> = ({ tracks, children }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const timeRef = useRef<number>(0);
    const remainingRef = useRef<number>(OPENER_DELAY);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [active, setActive] = useState<number>(0);
    const [hovered, setHovered] = useState<boolean>(false);

    const track = tracks[active];
    const upcomingTrack = tracks[active + 1];

    const { playing, toggleAudio, pauseAudio, playAudio } = useAudioPlayer(track);

    useEffect(() => {
        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                pauseTimer();
            } else {
                resumeTimer();
            }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }, []);

    useEffect(() => {
        timeRef.current = Date.now();
        remainingRef.current = OPENER_DELAY;
        timeoutRef.current = setTimeout(timerCallback, OPENER_DELAY);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [active]);

    useEffect(() => {
        if (hovered) {
            pauseTimer();
            setTimeout(playAudio);
        } else {
            resumeTimer();
            setTimeout(pauseAudio);
        }
    }, [hovered]);

    const timerCallback = () => {
        setActive(prevState => (prevState < tracks.length - 1 ? prevState + 1 : 0));
    };

    const pauseTimer = () => {
        if (!timeoutRef.current) {
            return;
        }

        remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - timeRef.current));

        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    };

    const resumeTimer = () => {
        if (timeoutRef.current) {
            return;
        }

        timeRef.current = Date.now();
        timeoutRef.current = setTimeout(timerCallback, remainingRef.current);
    };

    const nextTrack = () => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
        }

        setActive(prevState => (prevState < tracks.length - 1 ? prevState + 1 : 0));
    };

    const prevTrack = () => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
        }

        setActive(prevState => (prevState > 0 ? prevState - 1 : tracks.length - 1));
    };

    const jumpToTrack = (index: number) => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
        }

        setActive(index);
    };

    return (
        <OpenerContext.Provider
            value={{
                wrapperRef,
                active,
                track,
                tracks,
                hovered,
                setHovered,
                nextTrack,
                prevTrack,
                jumpToTrack,
                playing,
                toggleAudio,
            }}>
            {upcomingTrack && (
                <InvisibleImages>
                    <SpotifyImage images={upcomingTrack.artists[0].images} sizes="400px" eager />
                    <SpotifyImage images={upcomingTrack.album.images} sizes="200px" eager />
                </InvisibleImages>
            )}
            <OpenerWrapper ref={wrapperRef}>{children}</OpenerWrapper>
        </OpenerContext.Provider>
    );
};

export const useOpener = () => useContext(OpenerContext);
