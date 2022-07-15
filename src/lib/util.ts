export const getAppUrl = () => {
    const variable = process.env.NEXT_PUBLIC_APP_URL;

    if (!variable) {
        throw new Error("NEXT_PUBLIC_APP_URL is undefined");
    }

    return variable;
};

export const getImageUrlFromArtist = (artist: Pick<SpotifyApi.ArtistObjectFull, "images">) => {
    return artist.images[0].url;
};

export const getImageUrlFromAlbum = (album: Pick<SpotifyApi.AlbumObjectSimplified, "images">) => {
    return album.images[0].url;
};
