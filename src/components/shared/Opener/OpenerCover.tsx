import React from "react";
import styled from "styled-components";
import { useOpener } from "./OpenerProvider";
import { aspectRatio, fillParent, hover, transition } from "@css/helper";
import { AnimatePresence, m } from "framer-motion";
import { OpenerCoverPlay } from "./OpenerCoverPlay";
import { text } from "@css/helper/typography";
import { OpenerCoverGenres } from "./OpenerCoverGenres";
import { DEFAULT_EASE } from "@lib/animate";
import { OpenerReveal } from "./OpenerReveal";
import { breakpoints } from "@css/helper/breakpoints";
import { SpotifyImage } from "@lib/image";
import { Logo } from "@icon/Logo";

const CoverWrapper = styled.div`
    position: relative;
    width: 100%;
    ${aspectRatio(1.3)};
    overflow: hidden;
    transform: translateZ(0);
    clip-path: inset(0 0 0 0 round 2rem);
    background-color: ${p => p.theme.gray800};

    ${breakpoints().min("s")} {
        width: 35rem;
        max-width: 100%;
    }

    ${breakpoints().min("xxl")} {
        width: 40rem;
    }
`;

const CoverControls = styled.div`
    position: absolute;
    right: 3rem;
    bottom: 3rem;
`;

const CoverFrame = styled(m.div)`
    ${fillParent};
    display: flex;
    align-items: flex-end;
    padding: 3rem;
    backface-visibility: hidden;
    clip-path: circle(2rem at calc(100% - 6rem) calc(100% - 6rem));
    will-change: clip-path;
`;

const CoverImage = styled(m.div)`
    ${fillParent};
    z-index: -1;
    backface-visibility: hidden;
    will-change: transform;

    &::before {
        content: "";
        ${fillParent};
        z-index: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%);
    }

    &::after {
        content: "";
        ${fillParent};
        z-index: 1;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
    }
`;

const CoverFooter = styled.div`
    width: 100%;
`;

const CoverName = styled(m.div)`
    ${text("displayXl", "bold")};
    margin-bottom: 1rem;
    will-change: transform;
`;

const CoverDescription = styled(m.div)`
    will-change: transform;
`;

const CoverAnchor = styled.a`
    position: absolute;
    z-index: 1;
    top: 3rem;
    left: 3rem;
    opacity: 0.5;
    ${transition("opacity", "0.1s")};

    ${hover`
        opacity: 1;
    `};

    &:active,
    &:focus-visible {
        opacity: 1;
    }
`;

export const OpenerCover: React.FC = () => {
    const { active, track, hovered, setHovered } = useOpener();

    const artist = track.artists[0];

    return (
        <OpenerReveal delay={0.2}>
            <CoverWrapper
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <CoverAnchor href={track.uri}>
                    <Logo width="24" />
                </CoverAnchor>
                <AnimatePresence initial={false}>
                    <CoverFrame
                        key={track.id}
                        whileHover="hover"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: {
                                clipPath: "circle(2rem at 100% 100%)",
                            },
                            animate: {
                                clipPath: "circle(100% at 50% 50%)",
                            },
                            exit: {
                                clipPath: "circle(100% at 50% 50%)",
                            },
                        }}
                        transition={{ duration: 1, ease: DEFAULT_EASE }}>
                        <CoverImage
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={{
                                initial: {
                                    scale: 2,
                                },
                                animate: {
                                    scale: hovered ? 1.15 : 1,
                                },
                                exit: {
                                    scale: 1,
                                },
                            }}
                            transition={{ duration: 1, ease: DEFAULT_EASE }}>
                            <SpotifyImage
                                images={artist.images}
                                alt={track.name}
                                priority={active === 0}
                                sizes="400px"
                            />
                        </CoverImage>
                        <CoverFooter>
                            <CoverName
                                initial={{ y: 150 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: DEFAULT_EASE }}>
                                {artist.name}
                            </CoverName>
                            <CoverDescription
                                initial={{ y: 150 }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: DEFAULT_EASE,
                                    delay: 0.1,
                                }}>
                                <OpenerCoverGenres genres={artist.genres} />
                            </CoverDescription>
                        </CoverFooter>
                    </CoverFrame>
                </AnimatePresence>
                <CoverControls>
                    <OpenerCoverPlay />
                </CoverControls>
            </CoverWrapper>
        </OpenerReveal>
    );
};
