import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { getMainScrollStage } from "@lib/util";
import { Clock } from "@icon/Clock";

const HeadWrapper = styled.div<{ $stuck: boolean }>`
    position: sticky;
    z-index: 1;
    top: 0;
    padding: 0 3.2rem;
    margin-bottom: 1.6rem;
    border-bottom: 0.1rem solid ${p => (p.$stuck ? p.theme.gray200 : "transparent")};
    background-color: ${p => p.$stuck && p.theme.gray50};
`;

const HeadInner = styled.div<{ $stuck: boolean }>`
    padding: 1.2rem 1.6rem;
    border-bottom: 0.1rem solid ${p => (p.$stuck ? "transparent" : p.theme.gray200)};
`;

const HeadFrame = styled.div`
    display: grid;
    grid-gap: 1.8rem;
    grid-template-columns: [index] 1.6rem [title] 6fr [album] 4fr [time] 3fr [duration] minmax(
            12rem,
            1fr
        );
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
    font-size: 1.6rem;
`;

const HeadDuration = styled(HeadColumn)`
    justify-content: flex-end;
`;

export const PlaylistTracksHead: React.FC = () => {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [stuck, setStuck] = useState<boolean>(false);

    useEffect(() => {
        const scrollStage = getMainScrollStage();

        if (!scrollStage || !headerRef.current) {
            return;
        }

        const onScroll = () => {
            if (!headerRef.current) {
                return;
            }

            const { top } = headerRef.current.getBoundingClientRect();

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
        <HeadWrapper ref={headerRef} $stuck={stuck}>
            <HeadInner $stuck={stuck}>
                <HeadFrame>
                    <HeadIndex>#</HeadIndex>
                    <HeadColumn>Title</HeadColumn>
                    <HeadColumn>Album</HeadColumn>
                    <HeadColumn>Date added</HeadColumn>
                    <HeadDuration>
                        <Clock width="16" />
                    </HeadDuration>
                </HeadFrame>
            </HeadInner>
        </HeadWrapper>
    );
};
