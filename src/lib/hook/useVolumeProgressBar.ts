import { useDrag } from "@lib/hook/useDrag";
import { useAppDispatch } from "@lib/redux";
import { usePlayer } from "@lib/player";
import { useVolumeDraggingSelector } from "@lib/redux/reducer/player/hook/useVolumeDraggingSelector";
import { setDragging, setMuted, setVolume } from "@lib/redux/reducer/player/volume";

export const useVolumeProgressBar = () => {
    const dispatch = useAppDispatch();
    const { player } = usePlayer();
    const dragging = useVolumeDraggingSelector();

    const handleProgress = (position: number | null, seek?: boolean) => {
        if (!player || position === null) {
            return;
        }

        dispatch(setVolume(position));
        dispatch(setMuted(false));

        if (seek) {
            player.setVolume(position);
        }
    };

    return useDrag(
        {
            onClick: position => handleProgress(position, true),
            onDragStart: () => dispatch(setDragging(true)),
            onDragStop: position => {
                if (dragging) {
                    handleProgress(position, true);
                }

                dispatch(setDragging(false));
            },
            onProgressChanged: position => {
                if (!dragging) {
                    return;
                }

                handleProgress(position);
            },
        },
        [player, dragging]
    );
};
