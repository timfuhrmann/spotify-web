import React from "react";
import styled from "styled-components";
import { aspectRatio, fillParent } from "@css/helper";
import { useOpener } from "./OpenerProvider";
import { AnimatePresence, m } from "framer-motion";
import { text } from "@css/helper/typography";
import { DEFAULT_EASE } from "@lib/animate";
import { OpenerReveal } from "./OpenerReveal";
import { SpotifyImage } from "@lib/image";

const TrackWrapper = styled.div`
    position: relative;
    z-index: 1;
    width: 20rem;
`;

const TrackFrame = styled.div`
    position: relative;
    ${aspectRatio(1)};
    overflow: hidden;
`;

const TrackImage = styled(m.div)`
    ${fillParent};
    will-change: transform;
`;

const TrackFooter = styled.div`
    padding: 2rem;
    background-color: ${p => p.theme.gray100};
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    overflow: hidden;
`;

const TrackTitle = styled(m.div)`
    ${text("textMd")};
    color: ${p => p.theme.gray700};
    will-change: transform;
`;

const TrackName = styled(m.div)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${text("textXl", "medium")};
    will-change: transform;
`;

export const OpenerTrack: React.FC = () => {
    const { track } = useOpener();

    const album = track.album;

    return (
        <OpenerReveal delay={0.3}>
            <TrackWrapper>
                <TrackFrame>
                    <AnimatePresence initial={false}>
                        <TrackImage
                            key={track.id}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={{
                                initial: {
                                    y: "100%",
                                },
                                animate: {
                                    y: 0,
                                },
                                exit: {
                                    y: "100%",
                                },
                            }}
                            transition={{ duration: 1, ease: DEFAULT_EASE }}>
                            <SpotifyImage images={album.images} alt={album.name} sizes="200px" />
                        </TrackImage>
                    </AnimatePresence>
                </TrackFrame>
                <TrackFooter>
                    <AnimatePresence initial={false} exitBeforeEnter>
                        <React.Fragment key={track.id}>
                            <TrackTitle
                                initial={{ y: 75, opacity: 1 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.8, ease: DEFAULT_EASE },
                                }}
                                exit={{
                                    y: 0,
                                    opacity: 0,
                                    transition: { duration: 0.2, ease: DEFAULT_EASE },
                                }}>
                                Active track
                            </TrackTitle>
                            <TrackName
                                initial={{ y: 75, opacity: 1 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.8,
                                        ease: DEFAULT_EASE,
                                        delay: 0.1,
                                    },
                                }}
                                exit={{
                                    y: 0,
                                    opacity: 0,
                                    transition: { duration: 0.2, ease: DEFAULT_EASE },
                                }}>
                                {track.name}
                            </TrackName>
                        </React.Fragment>
                    </AnimatePresence>
                </TrackFooter>
            </TrackWrapper>
        </OpenerReveal>
    );
};
