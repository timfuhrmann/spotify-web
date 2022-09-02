import { useEffect, useState } from "react";

export const useAudioPlayer = (track: SpotifyApi.TrackObjectSimplified) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (!track.preview_url) {
            return;
        }

        const audioRef = new Audio(track.preview_url);
        setAudio(audioRef);

        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);

        audioRef.addEventListener("play", onPlay);
        audioRef.addEventListener("pause", onPause);
        return () => {
            audioRef.pause();
            setPlaying(false);
            audioRef.removeEventListener("play", onPlay);
            audioRef.removeEventListener("pause", onPause);
        };
    }, [track]);

    const toggleAudio = () => {
        if (!audio) {
            return;
        }

        return audio.paused ? audio.play() : audio.pause();
    };

    const playAudio = () => {
        if (!audio || !audio.paused) {
            return;
        }

        return audio.play();
    };

    const pauseAudio = () => {
        if (!audio || audio.paused) {
            return;
        }

        return audio.pause();
    };

    return {
        playing,
        toggleAudio,
        playAudio,
        pauseAudio,
    };
};
