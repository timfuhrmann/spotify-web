import React from "react";
import styled from "styled-components";
import { OpenerProvider, SpotifyTrackObjectCustomized } from "./OpenerProvider";
import { OpenerCover } from "./OpenerCover";
import { content } from "@css/helper/content";
import { columns } from "@css/helper/columns";
import { text } from "@css/helper/typography";
import { OpenerTrack } from "./OpenerTrack";
import { OpenerCarousel } from "./OpenerCarousel";
import { breakpoints } from "@css/helper/breakpoints";
import { OpenerReveal } from "./OpenerReveal";
import { Highlight } from "../Highlight";
import { OpenerButton } from "./OpenerButton";

const OpenerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: max(100vh, 80rem);
    padding: 6rem 0 15rem;

    ${breakpoints().min("m")} {
        padding: 12rem 0;
    }
`;

const OpenerInner = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2.4rem 6.2rem;
    ${content()};
    width: 100%;

    ${breakpoints().min("m")} {
        gap: 10rem 6.2rem;
    }
`;

const OpenerColumn = styled.div`
    ${columns({ m: 10, l: 9, xl: 6, xxl: 5 })};

    ${breakpoints().max("s")} {
        text-align: center;
    }
`;

const OpenerHeadline = styled.h1`
    ${text("displayXl", "bold")};
    margin-bottom: 2.4rem;

    ${breakpoints().min("l")} {
        margin-bottom: 3.2rem;
        ${text("display3Xl", "bold")};
    }
`;

const OpenerText = styled.p`
    ${text("displaySm", "light")};
    margin-bottom: 4.2rem;

    ${breakpoints().min("l")} {
        margin-bottom: 5.6rem;
        ${text("displayMd", "light")};
    }
`;

const OpenerFrame = styled.div`
    display: flex;
    flex: 1;
`;

const OpenerCoverWrapper = styled.div`
    margin-top: 5rem;
    width: 100%;

    ${breakpoints().min("s")} {
        width: auto;
        max-width: 100%;
    }
`;

const OpenerTrackWrapper = styled.div`
    margin-left: -5rem;

    ${breakpoints().max("m")} {
        display: none;
    }
`;

const OpenerCarouselWrapper = styled.div`
    margin-top: 1.2rem;
`;

export interface OpenerProps {
    tracks: SpotifyTrackObjectCustomized[];
}

export const Opener: React.FC<OpenerProps> = props => {
    return (
        <OpenerProvider {...props}>
            <OpenerWrapper>
                <OpenerInner>
                    <OpenerColumn>
                        <OpenerReveal>
                            <OpenerHeadline>
                                Login to <Highlight delay={0.1}>Spotify Web*</Highlight>
                            </OpenerHeadline>
                        </OpenerReveal>
                        <OpenerReveal delay={0.1}>
                            <OpenerText>
                                *Since this demo isn&apos;t public, you need a Spotify developer
                                account to be granted access.
                            </OpenerText>
                        </OpenerReveal>
                        <OpenerReveal delay={0.2}>
                            <OpenerButton />
                        </OpenerReveal>
                    </OpenerColumn>
                    <OpenerFrame>
                        <OpenerCoverWrapper>
                            <OpenerCover />
                            <OpenerCarouselWrapper>
                                <OpenerCarousel />
                            </OpenerCarouselWrapper>
                        </OpenerCoverWrapper>
                        <OpenerTrackWrapper>
                            <OpenerTrack />
                        </OpenerTrackWrapper>
                    </OpenerFrame>
                </OpenerInner>
            </OpenerWrapper>
        </OpenerProvider>
    );
};
