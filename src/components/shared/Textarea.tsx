import React from "react";
import styled from "styled-components";

const TextareaFrame = styled.textarea`
    display: block;
    appearance: none;
    width: 100%;
    min-height: 10rem;
    padding: 1rem;
    background-color: ${p => p.theme.gray300};
    color: ${p => p.theme.gray900};
    border: none;
    border-radius: 0.4rem;
    resize: none;

    &::placeholder {
        color: ${p => p.theme.gray600};
    }
`;

interface TextareaProps {
    name: string;
    placeholder: string;
    value: string;
    onInput: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({ name, placeholder, value, onInput }) => {
    return (
        <TextareaFrame
            name={name}
            placeholder={placeholder}
            value={value}
            onInput={e => onInput((e.target as HTMLInputElement).value)}
        />
    );
};
