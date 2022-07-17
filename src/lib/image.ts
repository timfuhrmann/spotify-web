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
