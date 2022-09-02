import React, { useMemo } from "react";
import styled from "styled-components";
import { useOpener } from "./OpenerProvider";
import { square } from "@css/helper";
import { motion } from "framer-motion";
import { DEFAULT_EASE } from "@lib/animate";
import { OpenerCarouselProgress } from "./OpenerCarouselProgress";
import { OpenerReveal } from "./OpenerReveal";
import { SpotifyImage } from "@lib/image";
import { ChevronRight } from "@icon/ChevronRight";

const CarouselWrapper = styled.div`
    position: relative;
`;

const CarouselBody = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0;
`;

const CarouselImage = styled(motion.button)`
    position: relative;
    ${square("5rem")};
    border-radius: 50%;
    overflow: hidden;
`;

const CarouselControl = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.5rem;
    ${square("4rem")};
    border-radius: 50%;
    color: ${props => props.theme.gray900};
    background-color: ${props => props.theme.gray100};
    border: 0.2rem solid ${props => props.theme.gray300};
`;

const CarouselPrev = styled(CarouselControl)`
    left: 0;
`;

const CarouselNext = styled(CarouselControl)`
    right: 0;
`;

const CarouselRight = styled(ChevronRight)`
    width: 2rem;
`;

const CarouselLeft = styled(CarouselRight)`
    transform: scaleX(-1);
`;

const CarouselProgress = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const OpenerCarousel: React.FC = () => {
    const { active, tracks, nextTrack, prevTrack, jumpToTrack } = useOpener();

    const tracksCarousel = useMemo(() => {
        const arr = [];

        for (let i = active - 2; i <= active + 2; i++) {
            if (i >= 0 && i < tracks.length) {
                arr.push({ track: tracks[i], originalIndex: i });
            } else if (i < 0) {
                const originalIndex = i + tracks.length;
                arr.push({ track: tracks[originalIndex], originalIndex });
            } else {
                const originalIndex = i - tracks.length;
                arr.push({ track: tracks[i - tracks.length], originalIndex });
            }
        }

        return arr;
    }, [active, tracks]);

    return (
        <OpenerReveal delay={0.4}>
            <CarouselWrapper>
                <CarouselBody>
                    {tracksCarousel.map(({ track, originalIndex }, index) => (
                        <React.Fragment key={track.id}>
                            <CarouselImage
                                type="button"
                                onClick={() => jumpToTrack(originalIndex)}
                                layoutId={track.id}
                                layout="position"
                                initial={{
                                    scale:
                                        index === 0 || index === tracksCarousel.length - 1
                                            ? 0.5
                                            : 1,
                                }}
                                animate={{
                                    scale:
                                        index === 0 || index === tracksCarousel.length - 1
                                            ? 0.5
                                            : 1,
                                }}
                                transition={{ duration: 0.6, ease: DEFAULT_EASE }}>
                                <SpotifyImage
                                    images={track.artists[0].images}
                                    alt={track.artists[0].name}
                                    sizes="50px"
                                />
                            </CarouselImage>
                            {index === 2 && (
                                <CarouselProgress>
                                    <OpenerCarouselProgress />
                                </CarouselProgress>
                            )}
                        </React.Fragment>
                    ))}
                </CarouselBody>
                <CarouselPrev type="button" onClick={prevTrack}>
                    <CarouselLeft />
                </CarouselPrev>
                <CarouselNext type="button" onClick={nextTrack}>
                    <CarouselRight />
                </CarouselNext>
            </CarouselWrapper>
        </OpenerReveal>
    );
};
