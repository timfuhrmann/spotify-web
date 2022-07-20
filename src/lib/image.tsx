import React, { useMemo } from "react";
import Head from "next/head";
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
    priority?: boolean;
}

export const SpotifyImage: React.FC<CoverImageProps> = ({ images, alt, sizes, priority }) => {
    const [setIntersection, isIntersected] = useIntersection<HTMLImageElement>({
        rootMargin: "300px",
    });

    const isVisible = priority || isIntersected;

    const srcSet = useMemo<string | undefined>(() => {
        return (
            images
                .filter(image => image.width !== null)
                .map(image => `${image.url} ${image.width}w`)
                .join(",") || undefined
        );
    }, [images]);

    const imgAttributes = isVisible
        ? {
              src: images[0].url,
              srcSet,
              alt,
              sizes,
          }
        : {
              src: emptyDataURL,
              srcSet: undefined,
              sizes: undefined,
          };

    return (
        <CoverWrapper>
            <Image decoding="async" ref={setIntersection} {...imgAttributes} />
            {priority && (
                <Head>
                    <link
                        key={
                            "__img-" +
                            imgAttributes.src +
                            imgAttributes.srcSet +
                            imgAttributes.sizes
                        }
                        rel="preload"
                        as="image"
                        href={imgAttributes.srcSet ? undefined : imgAttributes.src}
                        imageSrcSet={imgAttributes.srcSet}
                        imageSizes={imgAttributes.sizes}
                    />
                </Head>
            )}
        </CoverWrapper>
    );
};

export const getImageFromImageObject = (
    imageObject: SpotifyApi.ImageObject[],
    index: number = 0
) => {
    const image = imageObject[index];

    if (!image) {
        return null;
    }

    return image.url;
};
