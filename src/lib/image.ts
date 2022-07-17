export const getImageFromImageObject = (
    imageObject: SpotifyApi.ImageObject[],
    index: number = 0
) => {
    //@todo handle images properly
    const image = imageObject[index];

    if (!image) {
        return null;
    }

    return image.url;
};
