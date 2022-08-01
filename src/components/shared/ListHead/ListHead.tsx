import React from "react";
import styled from "styled-components";
import { square } from "@css/helper";
import { text } from "@css/helper/typography";
import { SpotifyImage } from "@lib/image";
import { HeaderSpacer } from "../../layout/HeaderSpacer";
import { content } from "@css/helper/content";
import { useDominantColor } from "@lib/hook/useDominantColor";

const HeadWrapper = styled.div`
    position: relative;
    padding-bottom: 2.4rem;
    background: var(--dominant-color, ${p => p.theme.gray100});
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.6) 0%,
        var(--dominant-color, ${p => p.theme.gray100}) 100%
    );
`;

const HeadInner = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 2.4rem;
    ${content()};
`;

const HeadCover = styled.div`
    position: relative;
    ${square("23.2rem")};
    box-shadow: 0 0.4rem 6rem rgba(0, 0, 0, 0.5);
    background-color: ${p => p.theme.gray100};
`;

const HeadGroup = styled.div`
    flex: 1 1 0;
    width: 0;
    min-width: 0;
`;

const HeadOverline = styled.div`
    ${text("textXs", "bold")};
    text-transform: uppercase;
`;

const HeadName = styled.h1`
    ${text("display3Xl", "black")};
    margin-bottom: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:last-child {
        margin-bottom: 0;
    }
`;

const HeadDescription = styled.div`
    margin-bottom: 0.6rem;
    ${text("textMd")};
    color: ${p => p.theme.gray700};

    &:last-child {
        margin-bottom: 0;
    }
`;

const HeadInfo = styled.div`
    ${text("textSm")};
`;

interface PlaylistHeadProps {
    overline: string;
    name: string;
    images: SpotifyApi.ImageObject[];
    description?: string | null;
    renderFooter?: React.ReactNode;
}

export const ListHead: React.FC<PlaylistHeadProps> = ({
    overline,
    name,
    images,
    description,
    renderFooter,
}) => {
    const { handleImageLoad } = useDominantColor();

    return (
        <HeadWrapper>
            <HeaderSpacer />
            <HeadInner>
                <HeadCover>
                    <SpotifyImage
                        images={images}
                        alt={name}
                        sizes="300px"
                        onLoad={handleImageLoad}
                        eager
                    />
                </HeadCover>
                <HeadGroup>
                    <HeadOverline>{overline}</HeadOverline>
                    <HeadName>{name}</HeadName>
                    {description && (
                        <HeadDescription dangerouslySetInnerHTML={{ __html: description }} />
                    )}
                    {renderFooter && <HeadInfo>{renderFooter}</HeadInfo>}
                </HeadGroup>
            </HeadInner>
        </HeadWrapper>
    );
};
