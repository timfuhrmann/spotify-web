import { useDrag } from "@lib/hook/useDrag";
import { setDragging, setDraggingProgress } from "@lib/redux/reducer/player/progress";
import { useAppDispatch } from "@lib/redux";
import { usePlayer } from "@lib/player";
import { useTrackDraggingSelector } from "@lib/redux/reducer/player/hook/useTrackDraggingSelector";
import { useDurationSelector } from "@lib/redux/reducer/player/hook/useDurationSelector";

export const useTrackProgressBar = () => {
    const dispatch = useAppDispatch();
    const { player } = usePlayer();
    const dragging = useTrackDraggingSelector();
    const duration = useDurationSelector();

    const handleProgress = (position: number | null, seek?: boolean) => {
        if (!player || position === null) {
            return;
        }

        dispatch(setDraggingProgress(position * duration));

        if (seek) {
            player.seek(position * duration);
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
        [player, duration, dragging]
    );
};
