import React, { MutableRefObject, useMemo } from "react";
import Head from "next/head";
import styled from "styled-components";
import { fillParent } from "@css/helper";
import { useIntersection } from "next/dist/client/use-intersection";

const CoverWrapper = styled.div`
    ${fillParent};
`;

const Image = styled.img`
    ${fillParent};
    object-fit: cover;
    object-position: center;
`;

const emptyDataURL =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

interface CoverImageProps {
    images: SpotifyApi.ImageObject[] | Spotify.Image[];
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
    rootMargin?: string;
    rootRef?: MutableRefObject<HTMLDivElement | null>;
    alt?: string;
    sizes?: string;
    eager?: boolean;
    priority?: boolean;
}

export const SpotifyImage: React.FC<CoverImageProps> = ({
    images,
    alt,
    sizes,
    eager,
    priority,
    rootRef,
    rootMargin = "300px",
    onLoad,
}) => {
    const [setIntersection, isIntersected] = useIntersection<HTMLImageElement>({
        rootMargin,
        rootRef,
    });

    const isVisible = eager || priority || isIntersected;

    const srcSet = useMemo<string | undefined>(() => {
        return (
            images
                .filter(image => image.width !== null)
                .map(image => `${image.url} ${image.width}w`)
                .join(",") || undefined
        );
    }, [images]);

    if (!images[0]) {
        return null;
    }

    const imgAttributes = isVisible
        ? {
              src: images[0].url,
              srcSet,
              sizes,
          }
        : {
              src: emptyDataURL,
              srcSet: undefined,
              alt,
              sizes: undefined,
          };

    return (
        <CoverWrapper>
            <Image decoding="async" ref={setIntersection} {...imgAttributes} onLoad={onLoad} />
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
