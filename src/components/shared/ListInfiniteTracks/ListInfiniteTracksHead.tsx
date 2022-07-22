import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { getMainScrollStage } from "@lib/util";
import { Clock } from "@icon/Clock";
import { TrackGrid } from "@css/helper/track";

const HeadWrapper = styled.div<{ $stuck: boolean }>`
    position: sticky;
    z-index: 1;
    top: 0;
    padding: 0 3.2rem;
    margin: 0 -3.2rem 1.6rem;
    border-bottom: 0.1rem solid ${p => (p.$stuck ? p.theme.gray200 : "transparent")};
    background-color: ${p => p.$stuck && p.theme.gray50};
`;

const HeadInner = styled.div<{ $stuck: boolean }>`
    padding: 1.2rem 0;
    border-bottom: 0.1rem solid ${p => (p.$stuck ? "transparent" : p.theme.gray200)};
`;

const HeadFrame = styled(TrackGrid)`
    height: auto;
`;

const HeadColumn = styled.div`
    display: flex;
    align-items: center;
    ${text("textXs")};
    letter-spacing: 0.1rem;
    line-height: 1;
    color: ${p => p.theme.gray700};
    text-transform: uppercase;
`;

const HeadIndex = styled(HeadColumn)`
    justify-content: flex-end;
    font-size: 1.7rem;
`;

const HeadDuration = styled(HeadColumn)`
    justify-content: flex-end;
`;

interface TracksHeadProps {
    columns: 3 | 5;
}

export const ListInfiniteTracksHead: React.FC<TracksHeadProps> = ({ columns }) => {
    const headRef = useRef<HTMLDivElement | null>(null);
    const [stuck, setStuck] = useState<boolean>(false);

    useEffect(() => {
        const scrollStage = getMainScrollStage();

        if (!scrollStage || !headRef.current) {
            return;
        }

        const onScroll = () => {
            if (!headRef.current) {
                return;
            }

            const { top } = headRef.current.getBoundingClientRect();

            if (top <= 0 && !stuck) {
                setStuck(true);
            } else if (top > 0 && stuck) {
                setStuck(false);
            }
        };

        onScroll();

        scrollStage.addEventListener("scroll", onScroll, { passive: true });
        return () => scrollStage.removeEventListener("scroll", onScroll);
    }, [stuck]);

    return (
        <HeadWrapper ref={headRef} $stuck={stuck}>
            <HeadInner $stuck={stuck}>
                <HeadFrame>
                    <HeadIndex role="columnheader">#</HeadIndex>
                    <HeadColumn role="columnheader">Title</HeadColumn>
                    {columns === 5 && (
                        <React.Fragment>
                            <HeadColumn role="columnheader">Album</HeadColumn>
                            <HeadColumn role="columnheader">Date added</HeadColumn>
                        </React.Fragment>
                    )}
                    <HeadDuration role="columnheader" aria-label="Duration">
                        <Clock width="16" />
                    </HeadDuration>
                </HeadFrame>
            </HeadInner>
        </HeadWrapper>
    );
};
