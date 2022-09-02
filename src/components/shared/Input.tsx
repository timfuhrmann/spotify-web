import React from "react";
import styled from "styled-components";

const InputFrame = styled.input`
    display: block;
    appearance: none;
    width: 100%;
    padding: 1rem;
    background-color: ${p => p.theme.gray300};
    color: ${p => p.theme.gray900};
    border: none;
    border-radius: 0.4rem;

    &::placeholder {
        color: ${p => p.theme.gray600};
    }
`;

interface InputProps {
    name: string;
    placeholder: string;
    value: string;
    onInput: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ name, placeholder, value, onInput }) => {
    return (
        <InputFrame
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onInput={e => onInput((e.target as HTMLInputElement).value)}
        />
    );
};
