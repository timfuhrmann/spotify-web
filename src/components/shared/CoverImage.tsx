import React from "react";
import styled from "styled-components";
import { square } from "@css/helper";
import Image from "next/image";
import { getImageFromImageObject } from "@lib/image";

const CoverWrapper = styled.div`
    position: relative;
    ${square("100%")};
    background-color: ${p => p.theme.gray200};
`;

interface CoverImageProps {
    images: SpotifyApi.ImageObject[];
    onLoad?: (target: HTMLImageElement) => void;
    alt?: string;
}

export const CoverImage: React.FC<CoverImageProps> = ({ alt, images, onLoad }) => {
    const image = getImageFromImageObject(images);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
        const target = event.target as HTMLImageElement;

        if (onLoad && target.complete && target.style.visibility !== "hidden") {
            onLoad(target);
        }
    };

    return (
        <CoverWrapper>
            {image && (
                <Image
                    src={image}
                    alt={alt}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                    onLoad={handleLoad}
                />
            )}
        </CoverWrapper>
    );
};
