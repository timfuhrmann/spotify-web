import React, { useMemo } from "react";
import styled from "styled-components";
import { fillParent, square } from "@css/helper";
import { useIntersection } from "next/dist/client/use-intersection";

const CoverWrapper = styled.div`
    position: relative;
    ${square("100%")};
    background-color: ${p => p.theme.gray200};
`;

const Image = styled.img`
    ${fillParent};
    object-fit: cover;
    object-position: center;
`;

const emptyDataURL =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

interface CoverImageProps {
    images: SpotifyApi.ImageObject[];
    alt?: string;
    sizes?: string;
}

export const CoverImage: React.FC<CoverImageProps> = ({ alt, sizes, images }) => {
    const [setIntersection, isIntersected] = useIntersection<HTMLImageElement>({
        rootMargin: "300px",
    });

    const srcSet = useMemo<string>(() => {
        return images
            .filter(image => image.width !== null)
            .map(image => `${image.url} ${image.width}w`)
            .join(",");
    }, [images]);

    let imgAttributes: {
        src: string;
        alt: string | undefined;
        srcSet: string | undefined;
        sizes: string | undefined;
    } = {
        src: emptyDataURL,
        alt: undefined,
        srcSet: undefined,
        sizes: undefined,
    };

    if (isIntersected) {
        imgAttributes = {
            alt,
            src: images[0].url,
            srcSet,
            sizes,
        };
    }

    return (
        <CoverWrapper>
            <Image decoding="async" ref={setIntersection} {...imgAttributes} />
        </CoverWrapper>
    );
};
