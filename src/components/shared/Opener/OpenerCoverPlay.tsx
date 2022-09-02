import React, { useEffect } from "react";
import styled from "styled-components";
import { square } from "@css/helper";
import { useOpener } from "./OpenerProvider";
import { useLottie } from "@lib/hook/useLottie";

const PlayWrapper = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    ${square("6rem")};
    background-color: ${p => p.theme.gray100};
    border-radius: 50%;
`;

const PlayFrame = styled.div`
    ${square("4rem")};
`;

export const OpenerCoverPlay: React.FC = () => {
    const { playing, toggleAudio, setHovered } = useOpener();
    const [ref, { currentFrame, playSegments }] = useLottie({
        path: "/lottie/play.json",
        autoplay: false,
        loop: false,
    });

    useEffect(() => {
        if (playing) {
            playSegments([5, 27], true);
        } else if (currentFrame > 0) {
            playSegments([20, 0]);
        }
    }, [playing]);

    const handleClick = () => {
        toggleAudio();
        setHovered(true);
    };

    return (
        <PlayWrapper type="button" onClick={handleClick}>
            <PlayFrame ref={ref} />
        </PlayWrapper>
    );
};
